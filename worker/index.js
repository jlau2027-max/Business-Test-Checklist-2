const CORS = {
  "Access-Control-Allow-Origin": "*",
};

function json(data, status = 200) {
  return Response.json(data, { status, headers: CORS });
}

function jsonCached(data, status = 200) {
  return Response.json(data, {
    status,
    headers: { ...CORS, "Cache-Control": "public, max-age=300" },
  });
}

// ─── Grading endpoint (Claude API) ──────────────────────────────────────────

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

async function upsertUser(uid, displayName, email, username, env) {
  await env.DB.prepare(
    `INSERT INTO users (uid, display_name, email, username, created_at, updated_at)
     VALUES (?1, ?2, ?3, ?4, ?5, ?5)
     ON CONFLICT(uid) DO UPDATE SET
       display_name = ?2,
       email = ?3,
       username = ?4,
       updated_at = ?5`
  )
    .bind(uid, displayName || "Student", email || "", username || "", Date.now())
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
  await upsertUser(uid, body.displayName, body.email, body.username, env);

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
       u.username,
       u.email,
       u.account_status AS accountStatus,
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

// ─── Svix webhook signature verification (Web Crypto API) ───────────────────

async function verifyWebhookSignature(request, secret) {
  const svixId = request.headers.get("svix-id");
  const svixTimestamp = request.headers.get("svix-timestamp");
  const svixSignature = request.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return { valid: false, error: "Missing svix headers" };
  }

  // Replay protection: reject timestamps older than 5 minutes
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(svixTimestamp, 10)) > 300) {
    return { valid: false, error: "Timestamp too old or too new" };
  }

  const rawBody = await request.text();

  // Decode signing secret (strip "whsec_" prefix, base64-decode)
  const secretBytes = Uint8Array.from(
    atob(secret.replace(/^whsec_/, "")),
    (c) => c.charCodeAt(0)
  );

  const key = await crypto.subtle.importKey(
    "raw",
    secretBytes,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const message = new TextEncoder().encode(
    `${svixId}.${svixTimestamp}.${rawBody}`
  );
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, message);

  const computedSig = btoa(
    String.fromCharCode(...new Uint8Array(signatureBuffer))
  );

  // Compare against each signature in header (space-separated "v1,<base64>" format)
  const isValid = svixSignature.split(" ").some((sig) => {
    const parts = sig.split(",");
    return parts.length === 2 && parts[1] === computedSig;
  });

  return isValid
    ? { valid: true, body: JSON.parse(rawBody) }
    : { valid: false, error: "Signature mismatch" };
}

// ─── Clerk webhook handler ──────────────────────────────────────────────────

async function handleClerkWebhook(request, env) {
  const secret = env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    return json({ error: "Webhook secret not configured" }, 500);
  }

  const result = await verifyWebhookSignature(request, secret);
  if (!result.valid) {
    return json({ error: result.error }, 401);
  }

  const event = result.body;
  const data = event.data;

  switch (event.type) {
    case "user.created":
    case "user.updated": {
      const uid = data.id;
      const email =
        data.email_addresses?.find((e) => e.id === data.primary_email_address_id)
          ?.email_address || "";
      const username = data.username || "";
      const displayName =
        [data.first_name, data.last_name].filter(Boolean).join(" ") ||
        data.username ||
        email.split("@")[0] ||
        "Student";

      await upsertUser(uid, displayName, email, username, env);
      return json({ ok: true, event: event.type });
    }

    case "user.deleted": {
      const uid = data.id;
      if (uid) {
        await env.DB.prepare(
          `UPDATE users SET account_status = 'user_deleted', updated_at = ?1 WHERE uid = ?2`
        ).bind(Date.now(), uid).run();
      }
      return json({ ok: true, event: event.type });
    }

    default:
      return json({ ok: true, event: event.type, ignored: true });
  }
}

// ─── Admin: update user status ──────────────────────────────────────────────

async function handleAdminUpdateStatus(request, env) {
  const { uid, status } = await request.json();

  const validStatuses = ["active", "user_deleted", "admin_deleted", "banned"];
  if (!uid || !validStatuses.includes(status)) {
    return json({ error: "Invalid uid or status" }, 400);
  }

  await env.DB.prepare(
    `UPDATE users SET account_status = ?1, updated_at = ?2 WHERE uid = ?3`
  ).bind(status, Date.now(), uid).run();

  return json({ ok: true });
}

// ─── Clerk Backend API helper ───────────────────────────────────────────────

async function clerkAPI(env, method, path, body = null) {
  const opts = {
    method,
    headers: {
      Authorization: `Bearer ${env.CLERK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(`https://api.clerk.com/v1${path}`, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.errors?.[0]?.message || `Clerk API ${res.status}`);
  }
  return res.json();
}

// ─── Admin: ban user via Clerk ──────────────────────────────────────────────

async function handleAdminBanUser(request, env) {
  const { uid } = await request.json();
  if (!uid) return json({ error: "Missing uid" }, 400);

  try {
    await clerkAPI(env, "POST", `/users/${uid}/ban`);
    await env.DB.prepare(
      `UPDATE users SET account_status = 'banned', updated_at = ?1 WHERE uid = ?2`
    ).bind(Date.now(), uid).run();
    return json({ ok: true });
  } catch (error) {
    return json({ error: "Failed to ban user", details: error.message }, 500);
  }
}

// ─── Auth / Clerk JWT verification ────────────────────────────────────────

const EDIT_ROLES = ["origin", "two", "admin", "editor"];
const DELETE_ROLES = ["origin", "two", "admin"];
const ADMIN_ROLES = ["origin", "two", "admin", "editor", "viewer"];

let cachedJwks = null;
let jwksCachedAt = 0;
const JWKS_CACHE_TTL = 3600_000; // 1 hour

async function fetchJwks(env) {
  const now = Date.now();
  if (cachedJwks && now - jwksCachedAt < JWKS_CACHE_TTL) {
    return cachedJwks;
  }
  const res = await fetch(env.CLERK_JWKS_URL);
  const data = await res.json();
  cachedJwks = data.keys;
  jwksCachedAt = now;
  return cachedJwks;
}

function base64UrlDecode(str) {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

function decodeJwtPart(part) {
  return JSON.parse(new TextDecoder().decode(base64UrlDecode(part)));
}

async function verifyClerkJwt(request, env) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Missing or invalid Authorization header", status: 401 };
  }

  const token = authHeader.slice(7);
  const parts = token.split(".");
  if (parts.length !== 3) {
    return { error: "Malformed JWT", status: 401 };
  }

  try {
    const header = decodeJwtPart(parts[0]);
    const payload = decodeJwtPart(parts[1]);

    // Check expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return { error: "Token expired", status: 401 };
    }

    // Check issuer
    if (env.CLERK_ISSUER && payload.iss !== env.CLERK_ISSUER) {
      return { error: "Invalid token issuer", status: 401 };
    }

    // Fetch JWKS and find matching key
    const keys = await fetchJwks(env);
    const jwk = keys.find((k) => k.kid === header.kid);
    if (!jwk) {
      // Bust cache and retry once
      cachedJwks = null;
      const freshKeys = await fetchJwks(env);
      const freshJwk = freshKeys.find((k) => k.kid === header.kid);
      if (!freshJwk) {
        return { error: "No matching signing key found", status: 401 };
      }
      return await verifySignature(token, parts, freshJwk, payload);
    }

    return await verifySignature(token, parts, jwk, payload);
  } catch (err) {
    return { error: "JWT verification failed: " + err.message, status: 401 };
  }
}

async function verifySignature(token, parts, jwk, payload) {
  const cryptoKey = await crypto.subtle.importKey(
    "jwk",
    { kty: jwk.kty, n: jwk.n, e: jwk.e, alg: "RS256", ext: true },
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );

  const signatureBytes = base64UrlDecode(parts[2]);
  const dataBytes = new TextEncoder().encode(parts[0] + "." + parts[1]);

  const valid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    signatureBytes,
    dataBytes
  );

  if (!valid) {
    return { error: "Invalid JWT signature", status: 401 };
  }

  return { payload };
}

function getUserRole(payload) {
  return payload?.publicMetadata?.role || payload?.public_metadata?.role || null;
}

async function requireAuth(request, env, allowedRoles) {
  const result = await verifyClerkJwt(request, env);
  if (result.error) {
    return { response: json({ error: result.error }, result.status) };
  }

  const role = getUserRole(result.payload);
  if (!role || !allowedRoles.includes(role)) {
    return { response: json({ error: "Forbidden: insufficient role" }, 403) };
  }

  return { payload: result.payload, role };
}

// ─── Public Content API (D1) ──────────────────────────────────────────────

async function handleGetFlashcardTopics(env) {
  const { results } = await env.CONTENT_DB.prepare(
    `SELECT ft.*, COUNT(f.id) as card_count
     FROM flashcard_topics ft
     LEFT JOIN flashcards f ON f.topic_id = ft.id
     GROUP BY ft.id
     ORDER BY ft.sort_order`
  ).all();
  return jsonCached(results);
}

async function handleGetFlashcards(topicId, env) {
  const { results } = await env.CONTENT_DB.prepare(
    `SELECT * FROM flashcards WHERE topic_id = ? ORDER BY sort_order`
  ).bind(topicId).all();
  return jsonCached(results);
}

async function handleGetMcq(url, env) {
  let sql = `SELECT * FROM mcq_questions WHERE 1=1`;
  const bindings = [];
  const category = url.searchParams.get("category");
  const difficulty = url.searchParams.get("difficulty");
  if (category) { sql += ` AND category = ?`; bindings.push(category); }
  if (difficulty) { sql += ` AND difficulty = ?`; bindings.push(difficulty); }
  sql += ` ORDER BY sort_order`;
  const { results } = await env.CONTENT_DB.prepare(sql).bind(...bindings).all();
  return jsonCached(results);
}

async function handleGetWritten(url, env) {
  let sql = `SELECT * FROM written_questions WHERE 1=1`;
  const bindings = [];
  const type = url.searchParams.get("type");
  const category = url.searchParams.get("category");
  const difficulty = url.searchParams.get("difficulty");
  if (type) { sql += ` AND question_type = ?`; bindings.push(type); }
  if (category) { sql += ` AND category = ?`; bindings.push(category); }
  if (difficulty) { sql += ` AND difficulty = ?`; bindings.push(difficulty); }
  sql += ` ORDER BY sort_order`;
  const { results } = await env.CONTENT_DB.prepare(sql).bind(...bindings).all();
  return jsonCached(results);
}

async function handleGetHistory(url, env) {
  let sql = `SELECT * FROM history_questions WHERE 1=1`;
  const bindings = [];
  const paper = url.searchParams.get("paper");
  if (paper) { sql += ` AND paper = ?`; bindings.push(paper); }
  sql += ` ORDER BY sort_order`;
  const { results } = await env.CONTENT_DB.prepare(sql).bind(...bindings).all();
  return jsonCached(results);
}

async function handleGetChecklist(env) {
  const { results: sections } = await env.CONTENT_DB.prepare(
    `SELECT * FROM checklist_sections ORDER BY sort_order`
  ).all();
  const { results: items } = await env.CONTENT_DB.prepare(
    `SELECT * FROM checklist_items ORDER BY sort_order`
  ).all();
  const sectionsWithItems = sections.map((s) => ({
    ...s,
    items: items.filter((i) => i.section_id === s.id),
  }));
  return jsonCached(sectionsWithItems);
}

async function handleGetColors(env) {
  const { results } = await env.CONTENT_DB.prepare(
    `SELECT * FROM category_colors`
  ).all();
  return jsonCached(results);
}

// ─── Admin CRUD helpers ───────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function getNextId(env, table, prefix) {
  const row = await env.CONTENT_DB.prepare(
    `SELECT id FROM ${table} ORDER BY id DESC LIMIT 1`
  ).first();
  if (!row) return `${prefix}1`;
  const match = row.id.match(/(\d+)$/);
  const num = match ? parseInt(match[1], 10) + 1 : 1;
  return `${prefix}${num}`;
}

async function getNextSortOrder(env, table, whereClause = "", bindings = []) {
  const sql = `SELECT MAX(sort_order) as max_sort FROM ${table}${whereClause ? " WHERE " + whereClause : ""}`;
  const row = await env.CONTENT_DB.prepare(sql).bind(...bindings).first();
  return (row?.max_sort ?? -1) + 1;
}

// ─── Admin CRUD: Flashcard Topics ─────────────────────────────────────────

async function handleAdminFlashcardTopicsPost(request, env) {
  const body = await request.json();
  const id = body.id || slugify(body.label || body.title || "topic");
  const sort_order = body.sort_order ?? await getNextSortOrder(env, "flashcard_topics");
  await env.CONTENT_DB.prepare(
    `INSERT INTO flashcard_topics (id, label, color, sort_order) VALUES (?, ?, ?, ?)`
  ).bind(id, body.label, body.color || '#7C6FFF', sort_order).run();
  return json({ ok: true, id }, 201);
}

async function handleAdminFlashcardTopicsPut(id, request, env) {
  const body = await request.json();
  const fields = [];
  const values = [];
  for (const [key, val] of Object.entries(body)) {
    if (key === "id") continue;
    fields.push(`${key} = ?`);
    values.push(val);
  }
  if (fields.length === 0) return json({ error: "No fields to update" }, 400);
  values.push(id);
  await env.CONTENT_DB.prepare(
    `UPDATE flashcard_topics SET ${fields.join(", ")} WHERE id = ?`
  ).bind(...values).run();
  return json({ ok: true });
}

async function handleAdminFlashcardTopicsDelete(id, env) {
  await env.CONTENT_DB.prepare(`DELETE FROM flashcard_topics WHERE id = ?`).bind(id).run();
  return json({ ok: true });
}

// ─── Admin CRUD: Flashcards ───────────────────────────────────────────────

async function handleAdminFlashcardsPost(request, env) {
  const body = await request.json();
  const id = body.id || crypto.randomUUID();
  const sort_order = body.sort_order ?? await getNextSortOrder(env, "flashcards", "topic_id = ?", [body.topic_id]);
  await env.CONTENT_DB.prepare(
    `INSERT INTO flashcards (id, topic_id, term, definition, formula, sort_order) VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(id, body.topic_id, body.term, body.definition, body.formula || null, sort_order).run();
  return json({ ok: true, id }, 201);
}

async function handleAdminFlashcardsPut(id, request, env) {
  const body = await request.json();
  const fields = [];
  const values = [];
  for (const [key, val] of Object.entries(body)) {
    if (key === "id") continue;
    fields.push(`${key} = ?`);
    values.push(val);
  }
  if (fields.length === 0) return json({ error: "No fields to update" }, 400);
  values.push(id);
  await env.CONTENT_DB.prepare(
    `UPDATE flashcards SET ${fields.join(", ")} WHERE id = ?`
  ).bind(...values).run();
  return json({ ok: true });
}

async function handleAdminFlashcardsDelete(id, env) {
  await env.CONTENT_DB.prepare(`DELETE FROM flashcards WHERE id = ?`).bind(id).run();
  return json({ ok: true });
}

// ─── Admin CRUD: MCQ ──────────────────────────────────────────────────────

async function handleAdminMcqPost(request, env) {
  const body = await request.json();
  const id = body.id || await getNextId(env, "mcq_questions", "mcq");
  const sort_order = body.sort_order ?? await getNextSortOrder(env, "mcq_questions");
  await env.CONTENT_DB.prepare(
    `INSERT INTO mcq_questions (id, category, difficulty, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id, body.category || null, body.difficulty || null, body.question_text,
    body.option_a, body.option_b, body.option_c, body.option_d,
    body.correct_option, body.explanation || null, sort_order
  ).run();
  return json({ ok: true, id }, 201);
}

async function handleAdminMcqPut(id, request, env) {
  const body = await request.json();
  const fields = [];
  const values = [];
  for (const [key, val] of Object.entries(body)) {
    if (key === "id") continue;
    fields.push(`${key} = ?`);
    values.push(val);
  }
  if (fields.length === 0) return json({ error: "No fields to update" }, 400);
  values.push(id);
  await env.CONTENT_DB.prepare(
    `UPDATE mcq_questions SET ${fields.join(", ")} WHERE id = ?`
  ).bind(...values).run();
  return json({ ok: true });
}

async function handleAdminMcqDelete(id, env) {
  await env.CONTENT_DB.prepare(`DELETE FROM mcq_questions WHERE id = ?`).bind(id).run();
  return json({ ok: true });
}

// ─── Admin CRUD: Written Questions ────────────────────────────────────────

async function handleAdminWrittenPost(request, env) {
  const body = await request.json();
  const prefix = body.question_type === "specimen" ? "spec" : body.question_type === "ten_marker" ? "tm" : "wr";
  const id = body.id || await getNextId(env, "written_questions", prefix);
  const sort_order = body.sort_order ?? await getNextSortOrder(env, "written_questions");
  await env.CONTENT_DB.prepare(
    `INSERT INTO written_questions (id, category, difficulty, question_type, marks, question_text, mark_scheme, label, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id, body.category || null, body.difficulty || null, body.question_type || 'short_answer',
    body.marks || null, body.question_text, body.mark_scheme || null, body.label || null, sort_order
  ).run();
  return json({ ok: true, id }, 201);
}

async function handleAdminWrittenPut(id, request, env) {
  const body = await request.json();
  const fields = [];
  const values = [];
  for (const [key, val] of Object.entries(body)) {
    if (key === "id") continue;
    fields.push(`${key} = ?`);
    values.push(val);
  }
  if (fields.length === 0) return json({ error: "No fields to update" }, 400);
  values.push(id);
  await env.CONTENT_DB.prepare(
    `UPDATE written_questions SET ${fields.join(", ")} WHERE id = ?`
  ).bind(...values).run();
  return json({ ok: true });
}

async function handleAdminWrittenDelete(id, env) {
  await env.CONTENT_DB.prepare(`DELETE FROM written_questions WHERE id = ?`).bind(id).run();
  return json({ ok: true });
}

// ─── Admin CRUD: History Questions ────────────────────────────────────────

async function handleAdminHistoryPost(request, env) {
  const body = await request.json();
  const prefix = body.paper === "paper3" ? "p3q" : "hist";
  const id = body.id || await getNextId(env, "history_questions", prefix);
  const sort_order = body.sort_order ?? await getNextSortOrder(env, "history_questions");
  await env.CONTENT_DB.prepare(
    `INSERT INTO history_questions (id, paper, topic, question_number, question_text, marks, mark_scheme, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    id, body.paper || null, body.topic || null, body.question_number || null,
    body.question_text, body.marks || 15, body.mark_scheme || null, sort_order
  ).run();
  return json({ ok: true, id }, 201);
}

async function handleAdminHistoryPut(id, request, env) {
  const body = await request.json();
  const fields = [];
  const values = [];
  for (const [key, val] of Object.entries(body)) {
    if (key === "id") continue;
    fields.push(`${key} = ?`);
    values.push(val);
  }
  if (fields.length === 0) return json({ error: "No fields to update" }, 400);
  values.push(id);
  await env.CONTENT_DB.prepare(
    `UPDATE history_questions SET ${fields.join(", ")} WHERE id = ?`
  ).bind(...values).run();
  return json({ ok: true });
}

async function handleAdminHistoryDelete(id, env) {
  await env.CONTENT_DB.prepare(`DELETE FROM history_questions WHERE id = ?`).bind(id).run();
  return json({ ok: true });
}

// ─── Admin CRUD: Checklist Sections ───────────────────────────────────────

async function handleAdminChecklistSectionsPost(request, env) {
  const body = await request.json();
  const id = body.id || crypto.randomUUID();
  const sort_order = body.sort_order ?? await getNextSortOrder(env, "checklist_sections");
  await env.CONTENT_DB.prepare(
    `INSERT INTO checklist_sections (id, title, color, sort_order) VALUES (?, ?, ?, ?)`
  ).bind(id, body.title, body.color || '#7C6FFF', sort_order).run();
  return json({ ok: true, id }, 201);
}

async function handleAdminChecklistSectionsPut(id, request, env) {
  const body = await request.json();
  const fields = [];
  const values = [];
  for (const [key, val] of Object.entries(body)) {
    if (key === "id") continue;
    fields.push(`${key} = ?`);
    values.push(val);
  }
  if (fields.length === 0) return json({ error: "No fields to update" }, 400);
  values.push(id);
  await env.CONTENT_DB.prepare(
    `UPDATE checklist_sections SET ${fields.join(", ")} WHERE id = ?`
  ).bind(...values).run();
  return json({ ok: true });
}

async function handleAdminChecklistSectionsDelete(id, env) {
  await env.CONTENT_DB.prepare(`DELETE FROM checklist_sections WHERE id = ?`).bind(id).run();
  return json({ ok: true });
}

// ─── Admin CRUD: Checklist Items ──────────────────────────────────────────

async function handleAdminChecklistItemsPost(request, env) {
  const body = await request.json();
  const id = body.id || crypto.randomUUID();
  const sort_order = body.sort_order ?? await getNextSortOrder(env, "checklist_items", "section_id = ?", [body.section_id]);
  await env.CONTENT_DB.prepare(
    `INSERT INTO checklist_items (id, section_id, text, sort_order) VALUES (?, ?, ?, ?)`
  ).bind(id, body.section_id, body.text, sort_order).run();
  return json({ ok: true, id }, 201);
}

async function handleAdminChecklistItemsPut(id, request, env) {
  const body = await request.json();
  const fields = [];
  const values = [];
  for (const [key, val] of Object.entries(body)) {
    if (key === "id") continue;
    fields.push(`${key} = ?`);
    values.push(val);
  }
  if (fields.length === 0) return json({ error: "No fields to update" }, 400);
  values.push(id);
  await env.CONTENT_DB.prepare(
    `UPDATE checklist_items SET ${fields.join(", ")} WHERE id = ?`
  ).bind(...values).run();
  return json({ ok: true });
}

async function handleAdminChecklistItemsDelete(id, env) {
  await env.CONTENT_DB.prepare(`DELETE FROM checklist_items WHERE id = ?`).bind(id).run();
  return json({ ok: true });
}

// ─── Admin: Reorder ───────────────────────────────────────────────────────

const REORDER_TABLES = [
  "flashcard_topics", "flashcards", "mcq_questions", "written_questions",
  "history_questions", "checklist_sections", "checklist_items", "category_colors",
];

async function handleAdminReorder(table, request, env) {
  if (!REORDER_TABLES.includes(table)) {
    return json({ error: `Invalid table: ${table}` }, 400);
  }
  const items = await request.json();
  if (!Array.isArray(items)) {
    return json({ error: "Expected array of {id, sort_order}" }, 400);
  }
  const stmt = env.CONTENT_DB.prepare(
    `UPDATE ${table} SET sort_order = ? WHERE id = ?`
  );
  const batch = items.map((item) => stmt.bind(item.sort_order, item.id));
  await env.CONTENT_DB.batch(batch);
  return json({ ok: true });
}

// ─── Admin: Colors ────────────────────────────────────────────────────────

async function handleAdminColorsPut(request, env) {
  const body = await request.json();
  // Upsert: category is PRIMARY KEY in migration schema
  const existing = await env.CONTENT_DB.prepare(
    `SELECT category FROM category_colors WHERE category = ?`
  ).bind(body.category).first();
  if (existing) {
    await env.CONTENT_DB.prepare(
      `UPDATE category_colors SET color = ? WHERE category = ?`
    ).bind(body.color, body.category).run();
  } else {
    await env.CONTENT_DB.prepare(
      `INSERT INTO category_colors (category, color) VALUES (?, ?)`
    ).bind(body.category, body.color).run();
  }
  return json({ ok: true });
}

// ─── Router ───────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          ...CORS,
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // ── Existing routes (unchanged) ─────────────────────────────────────

    // Admin: GET /api/admin/users
    if (path === "/api/admin/users" && request.method === "GET") {
      return handleAdminUsers(env);
    }

    // Admin: PUT /api/admin/users/status
    if (path === "/api/admin/users/status" && request.method === "PUT") {
      return handleAdminUpdateStatus(request, env);
    }

    // Admin: POST /api/admin/users/ban
    if (path === "/api/admin/users/ban" && request.method === "POST") {
      return handleAdminBanUser(request, env);
    }

    // Admin: POST /api/admin/users/unban
    if (path === "/api/admin/users/unban" && request.method === "POST") {
      return handleAdminUnbanUser(request, env);
    }

    // Admin: POST /api/admin/users/signout
    if (path === "/api/admin/users/signout" && request.method === "POST") {
      return handleAdminSignOut(request, env);
    }

    // Admin: PATCH /api/admin/users/profile
    if (path === "/api/admin/users/profile" && request.method === "PATCH") {
      return handleAdminEditProfile(request, env);
    }

    // Admin: PUT /api/admin/users/role
    if (path === "/api/admin/users/role" && request.method === "PUT") {
      return handleAdminChangeRole(request, env);
    }

    // Clerk webhook: POST /api/webhooks/clerk
    if (path === "/api/webhooks/clerk" && request.method === "POST") {
      return handleClerkWebhook(request, env);
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

    // ── Public Content API (no auth) ────────────────────────────────────

    if (method === "GET" && path === "/api/content/flashcard-topics") {
      return handleGetFlashcardTopics(env);
    }

    const flashcardsMatch = path.match(/^\/api\/content\/flashcards\/([^/]+)$/);
    if (method === "GET" && flashcardsMatch) {
      return handleGetFlashcards(flashcardsMatch[1], env);
    }

    if (method === "GET" && path === "/api/content/mcq") {
      return handleGetMcq(url, env);
    }

    if (method === "GET" && path === "/api/content/written") {
      return handleGetWritten(url, env);
    }

    if (method === "GET" && path === "/api/content/history") {
      return handleGetHistory(url, env);
    }

    if (method === "GET" && path === "/api/content/checklist") {
      return handleGetChecklist(env);
    }

    if (method === "GET" && path === "/api/content/colors") {
      return handleGetColors(env);
    }

    // ── Admin CRUD routes (auth required) ───────────────────────────────

    if (path.startsWith("/api/admin/")) {
      // --- Reorder ---
      const reorderMatch = path.match(/^\/api\/admin\/reorder\/([^/]+)$/);
      if (reorderMatch && method === "PUT") {
        const auth = await requireAuth(request, env, EDIT_ROLES);
        if (auth.response) return auth.response;
        return handleAdminReorder(reorderMatch[1], request, env);
      }

      // --- Colors ---
      if (path === "/api/admin/colors" && method === "PUT") {
        const auth = await requireAuth(request, env, EDIT_ROLES);
        if (auth.response) return auth.response;
        return handleAdminColorsPut(request, env);
      }

      // --- Flashcard Topics ---
      if (path === "/api/admin/flashcard-topics" && method === "POST") {
        const auth = await requireAuth(request, env, EDIT_ROLES);
        if (auth.response) return auth.response;
        return handleAdminFlashcardTopicsPost(request, env);
      }
      const ftPutMatch = path.match(/^\/api\/admin\/flashcard-topics\/([^/]+)$/);
      if (ftPutMatch && method === "PUT") {
        const auth = await requireAuth(request, env, EDIT_ROLES);
        if (auth.response) return auth.response;
        return handleAdminFlashcardTopicsPut(ftPutMatch[1], request, env);
      }
      const ftDelMatch = path.match(/^\/api\/admin\/flashcard-topics\/([^/]+)$/);
      if (ftDelMatch && method === "DELETE") {
        const auth = await requireAuth(request, env, DELETE_ROLES);
        if (auth.response) return auth.response;
        return handleAdminFlashcardTopicsDelete(ftDelMatch[1], env);
      }

      // --- Flashcards ---
      if (path === "/api/admin/flashcards" && method === "POST") {
        const auth = await requireAuth(request, env, EDIT_ROLES);
        if (auth.response) return auth.response;
        return handleAdminFlashcardsPost(request, env);
      }
      const fcPutMatch = path.match(/^\/api\/admin\/flashcards\/([^/]+)$/);
      if (fcPutMatch && method === "PUT") {
        const auth = await requireAuth(request, env, EDIT_ROLES);
        if (auth.response) return auth.response;
        return handleAdminFlashcardsPut(fcPutMatch[1], request, env);
      }
      const fcDelMatch = path.match(/^\/api\/admin\/flashcards\/([^/]+)$/);
      if (fcDelMatch && method === "DELETE") {
        const auth = await requireAuth(request, env, DELETE_ROLES);
        if (auth.response) return auth.response;
        return handleAdminFlashcardsDelete(fcDelMatch[1], env);
      }

      // --- MCQ ---
      if (path === "/api/admin/mcq" && method === "POST") {
        const auth = await requireAuth(request, env, EDIT_ROLES);
        if (auth.response) return auth.response;
        return handleAdminMcqPost(request, env);
      }
      const mcqPutMatch = path.match(/^\/api\/admin\/mcq\/([^/]+)$/);
      if (mcqPutMatch && method === "PUT") {
        const auth = await requireAuth(request, env, EDIT_ROLES);
        if (auth.response) return auth.response;
        return handleAdminMcqPut(mcqPutMatch[1], request, env);
      }
      const mcqDelMatch = path.match(/^\/api\/admin\/mcq\/([^/]+)$/);
      if (mcqDelMatch && method === "DELETE") {
        const auth = await requireAuth(request, env, DELETE_ROLES);
        if (auth.response) return auth.response;
        return handleAdminMcqDelete(mcqDelMatch[1], env);
      }

      // --- Written ---
      if (path === "/api/admin/written" && method === "POST") {
        const auth = await requireAuth(request, env, EDIT_ROLES);
        if (auth.response) return auth.response;
        return handleAdminWrittenPost(request, env);
      }
      const wrPutMatch = path.match(/^\/api\/admin\/written\/([^/]+)$/);
      if (wrPutMatch && method === "PUT") {
        const auth = await requireAuth(request, env, EDIT_ROLES);
        if (auth.response) return auth.response;
        return handleAdminWrittenPut(wrPutMatch[1], request, env);
      }
      const wrDelMatch = path.match(/^\/api\/admin\/written\/([^/]+)$/);
      if (wrDelMatch && method === "DELETE") {
        const auth = await requireAuth(request, env, DELETE_ROLES);
        if (auth.response) return auth.response;
        return handleAdminWrittenDelete(wrDelMatch[1], env);
      }

      // --- History ---
      if (path === "/api/admin/history" && method === "POST") {
        const auth = await requireAuth(request, env, EDIT_ROLES);
        if (auth.response) return auth.response;
        return handleAdminHistoryPost(request, env);
      }
      const hiPutMatch = path.match(/^\/api\/admin\/history\/([^/]+)$/);
      if (hiPutMatch && method === "PUT") {
        const auth = await requireAuth(request, env, EDIT_ROLES);
        if (auth.response) return auth.response;
        return handleAdminHistoryPut(hiPutMatch[1], request, env);
      }
      const hiDelMatch = path.match(/^\/api\/admin\/history\/([^/]+)$/);
      if (hiDelMatch && method === "DELETE") {
        const auth = await requireAuth(request, env, DELETE_ROLES);
        if (auth.response) return auth.response;
        return handleAdminHistoryDelete(hiDelMatch[1], env);
      }

      // --- Checklist Sections ---
      if (path === "/api/admin/checklist-sections" && method === "POST") {
        const auth = await requireAuth(request, env, EDIT_ROLES);
        if (auth.response) return auth.response;
        return handleAdminChecklistSectionsPost(request, env);
      }
      const csPutMatch = path.match(/^\/api\/admin\/checklist-sections\/([^/]+)$/);
      if (csPutMatch && method === "PUT") {
        const auth = await requireAuth(request, env, EDIT_ROLES);
        if (auth.response) return auth.response;
        return handleAdminChecklistSectionsPut(csPutMatch[1], request, env);
      }
      const csDelMatch = path.match(/^\/api\/admin\/checklist-sections\/([^/]+)$/);
      if (csDelMatch && method === "DELETE") {
        const auth = await requireAuth(request, env, DELETE_ROLES);
        if (auth.response) return auth.response;
        return handleAdminChecklistSectionsDelete(csDelMatch[1], env);
      }

      // --- Checklist Items ---
      if (path === "/api/admin/checklist-items" && method === "POST") {
        const auth = await requireAuth(request, env, EDIT_ROLES);
        if (auth.response) return auth.response;
        return handleAdminChecklistItemsPost(request, env);
      }
      const ciPutMatch = path.match(/^\/api\/admin\/checklist-items\/([^/]+)$/);
      if (ciPutMatch && method === "PUT") {
        const auth = await requireAuth(request, env, EDIT_ROLES);
        if (auth.response) return auth.response;
        return handleAdminChecklistItemsPut(ciPutMatch[1], request, env);
      }
      const ciDelMatch = path.match(/^\/api\/admin\/checklist-items\/([^/]+)$/);
      if (ciDelMatch && method === "DELETE") {
        const auth = await requireAuth(request, env, DELETE_ROLES);
        if (auth.response) return auth.response;
        return handleAdminChecklistItemsDelete(ciDelMatch[1], env);
      }

      return json({ error: "Not found" }, 404);
    }

    return json({ error: "Not found" }, 404);
  },
};
