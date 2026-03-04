const CORS = { "Access-Control-Allow-Origin": "*" };

function json(data, status = 200) {
  return Response.json(data, { status, headers: CORS });
}

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

// ─── State endpoints (KV) ─────────────────────────────────────────────────

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

// ─── Attempts endpoints (KV) ──────────────────────────────────────────────

async function handleGetAttempts(uid, env) {
  const data = await env.USER_DATA.get(`attempts:${uid}`, "json");
  return json(data || []);
}

async function handlePostAttempt(uid, request, env) {
  const attempt = await request.json();
  attempt.timestamp = Date.now();
  attempt.id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const existing = (await env.USER_DATA.get(`attempts:${uid}`, "json")) || [];
  existing.unshift(attempt);
  await env.USER_DATA.put(`attempts:${uid}`, JSON.stringify(existing));
  return json({ ok: true, id: attempt.id });
}

// ─── Router ───────────────────────────────────────────────────────────────

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

    // State: GET/PUT /api/state/:uid
    const stateMatch = path.match(/^\/api\/state\/([^/]+)$/);
    if (stateMatch) {
      const uid = stateMatch[1];
      if (request.method === "GET") return handleGetState(uid, env);
      if (request.method === "PUT") return handlePutState(uid, request, env);
      return json({ error: "Method not allowed" }, 405);
    }

    // Attempts: GET/POST /api/attempts/:uid
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
