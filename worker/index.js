const CORS = { "Access-Control-Allow-Origin": "*" };

function json(data, status = 200) {
  return Response.json(data, { status, headers: CORS });
}

// ─── Grading (unchanged) ─────────────────────────────────────────────────────

async function handleGrade(request, env) {
  const { question, studentAnswer, expectedAnswer, marks } = await request.json();
  const maxMarks = marks || 5;

  if (!env.ANTHROPIC_API_KEY) {
    return json({ error: "API key not configured", details: "ANTHROPIC_API_KEY secret is not set" }, 500);
  }

  const prompt = `You are an expert educator grading a short answer question for IB Business Management.

Question: ${question}

Mark Scheme / Model Answer: ${expectedAnswer}

Student's Answer: ${studentAnswer}

This question is worth ${maxMarks} marks. Use the mark scheme above to award marks. Each mark point in the mark scheme (often shown as [1]) corresponds to one mark.

Provide a score from 0 to ${maxMarks} and specific constructive feedback explaining which mark points were awarded and which were missed.

Format your response ONLY as valid JSON (no markdown, no code blocks):
{
  "score": <number 0-${maxMarks}>,
  "maxMarks": ${maxMarks},
  "feedback": "<constructive feedback referencing the mark scheme points>"
}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 500,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return json({ error: "API Error", details: data.error.message }, 500);
    }

    const result = JSON.parse(data.content[0].text);
    return json({
      score: Math.min(Math.max(result.score, 0), maxMarks),
      maxMarks,
      feedback: result.feedback,
    });
  } catch (error) {
    return json({ error: "Failed to grade answer", details: error.message }, 500);
  }
}

// ─── State endpoints (KV — unchanged) ────────────────────────────────────────

async function handleGetState(uid, env) {
  const data = await env.USER_DATA.get(`state:${uid}`, "json");
  return json(data || {});
}

async function handlePutState(uid, request, env) {
  const body = await request.json();
  const existing = (await env.USER_DATA.get(`state:${uid}`, "json")) || {};
  const merged = { ...existing, ...body };
  await env.USER_DATA.put(`state:${uid}`, JSON.stringify(merged));
  return json({ ok: true });
}

// ─── User upsert (D1) ───────────────────────────────────────────────────────

async function upsertUser(uid, displayName, email, env) {
  await env.DB.prepare(
    `INSERT INTO users (uid, display_name, email, created_at, updated_at)
     VALUES (?1, ?2, ?3, ?4, ?4)
     ON CONFLICT(uid) DO UPDATE SET
       display_name = ?2,
       email = ?3,
       updated_at = ?4`
  )
    .bind(uid, displayName || "Student", email || "", Date.now())
    .run();
}

// ─── Attempts endpoints (D1) ─────────────────────────────────────────────────

async function handleGetAttempts(uid, env) {
  const { results } = await env.DB.prepare(
    `SELECT id, question_id AS questionId, question_type AS questionType,
            category, subject, difficulty, time_spent_ms AS timeSpentMs,
            user_answer AS userAnswer, is_correct AS isCorrect,
            score, max_marks AS maxMarks, timestamp
     FROM attempts
     WHERE uid = ?1
     ORDER BY timestamp DESC`
  )
    .bind(uid)
    .all();

  // Convert SQLite integer booleans back to JS booleans
  const attempts = results.map((row) => ({
    ...row,
    isCorrect: row.isCorrect === null ? null : row.isCorrect === 1,
  }));

  return json(attempts);
}

async function handlePostAttempt(uid, request, env) {
  const body = await request.json();
  const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const timestamp = Date.now();

  // Upsert user profile
  await upsertUser(uid, body.displayName, body.email, env);

  // Insert the attempt
  await env.DB.prepare(
    `INSERT INTO attempts (id, uid, question_id, question_type, category, subject,
                           difficulty, time_spent_ms, user_answer, is_correct,
                           score, max_marks, timestamp)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13)`
  )
    .bind(
      id,
      uid,
      body.questionId || null,
      body.questionType || null,
      body.category || "Uncategorized",
      body.subject || "business",
      body.difficulty || null,
      body.timeSpentMs || 0,
      body.userAnswer ?? "",
      body.isCorrect === null || body.isCorrect === undefined
        ? null
        : body.isCorrect ? 1 : 0,
      body.score ?? null,
      body.maxMarks ?? null,
      timestamp
    )
    .run();

  return json({ ok: true, id });
}

// ─── Admin endpoint (D1) ────────────────────────────────────────────────────

async function handleAdminUsers(env) {
  const { results } = await env.DB.prepare(
    `SELECT
       u.uid,
       u.display_name AS displayName,
       u.email,
       COUNT(a.id) AS totalAttempts,
       SUM(CASE WHEN a.question_type = 'mcq' AND a.is_correct = 1 THEN 1 ELSE 0 END) AS mcqCorrect,
       SUM(CASE WHEN a.question_type = 'mcq' THEN 1 ELSE 0 END) AS mcqTotal,
       SUM(CASE WHEN a.question_type != 'mcq' AND a.score IS NOT NULL THEN a.score ELSE 0 END) AS writtenScore,
       SUM(CASE WHEN a.question_type != 'mcq' AND a.max_marks IS NOT NULL THEN a.max_marks ELSE 0 END) AS writtenMax,
       SUM(a.time_spent_ms) AS totalTimeMs,
       MAX(a.timestamp) AS lastActive
     FROM users u
     LEFT JOIN attempts a ON u.uid = a.uid
     GROUP BY u.uid
     ORDER BY lastActive DESC`
  ).all();

  return json(results);
}

// ─── Router ──────────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          ...CORS,
          "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // Admin: GET /api/admin/users
    if (path === "/api/admin/users" && request.method === "GET") {
      return handleAdminUsers(env);
    }

    // State: GET/PUT /api/state/:uid (KV)
    const stateMatch = path.match(/^\/api\/state\/([^/]+)$/);
    if (stateMatch) {
      const uid = stateMatch[1];
      if (request.method === "GET") return handleGetState(uid, env);
      if (request.method === "PUT") return handlePutState(uid, request, env);
      return json({ error: "Method not allowed" }, 405);
    }

    // Attempts: GET/POST /api/attempts/:uid (D1)
    const attemptsMatch = path.match(/^\/api\/attempts\/([^/]+)$/);
    if (attemptsMatch) {
      const uid = attemptsMatch[1];
      if (request.method === "GET") return handleGetAttempts(uid, env);
      if (request.method === "POST") return handlePostAttempt(uid, request, env);
      return json({ error: "Method not allowed" }, 405);
    }

    // Grading: POST / or POST /grade
    if (request.method === "POST" && (path === "/" || path === "/grade")) {
      return handleGrade(request, env);
    }

    return json({ error: "Not found" }, 404);
  },
};
