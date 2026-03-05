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

// ─── Admin: unban user via Clerk ────────────────────────────────────────────

async function handleAdminUnbanUser(request, env) {
  const { uid } = await request.json();
  if (!uid) return json({ error: "Missing uid" }, 400);

  try {
    await clerkAPI(env, "POST", `/users/${uid}/unban`);
    await env.DB.prepare(
      `UPDATE users SET account_status = 'active', updated_at = ?1 WHERE uid = ?2`
    ).bind(Date.now(), uid).run();
    return json({ ok: true });
  } catch (error) {
    return json({ error: "Failed to unban user", details: error.message }, 500);
  }
}

// ─── Admin: force sign out via Clerk ────────────────────────────────────────

async function handleAdminSignOut(request, env) {
  const { uid } = await request.json();
  if (!uid) return json({ error: "Missing uid" }, 400);

  try {
    const sessions = await clerkAPI(env, "GET", `/users/${uid}/sessions`);
    let revoked = 0;
    for (const session of sessions) {
      if (session.status === "active") {
        await clerkAPI(env, "POST", `/sessions/${session.id}/revoke`);
        revoked++;
      }
    }
    return json({ ok: true, revoked });
  } catch (error) {
    return json({ error: "Failed to sign out user", details: error.message }, 500);
  }
}

// ─── Admin: edit user profile via Clerk ─────────────────────────────────────

async function handleAdminEditProfile(request, env) {
  const { uid, firstName, lastName, username } = await request.json();
  if (!uid) return json({ error: "Missing uid" }, 400);

  // Build Clerk update payload with only provided fields
  const payload = {};
  if (firstName !== undefined && firstName !== null) payload.first_name = firstName;
  if (lastName !== undefined && lastName !== null) payload.last_name = lastName;
  if (username !== undefined && username !== null) payload.username = username;

  if (Object.keys(payload).length === 0) {
    return json({ error: "No fields to update" }, 400);
  }

  try {
    const updated = await clerkAPI(env, "PATCH", `/users/${uid}`, payload);

    // Sync changes to D1
    const newDisplayName =
      [updated.first_name, updated.last_name].filter(Boolean).join(" ") ||
      updated.username ||
      "Student";
    const newEmail =
      updated.email_addresses?.find((e) => e.id === updated.primary_email_address_id)
        ?.email_address || "";
    const newUsername = updated.username || "";

    await upsertUser(uid, newDisplayName, newEmail, newUsername, env);
    return json({ ok: true, displayName: newDisplayName, email: newEmail, username: newUsername });
  } catch (error) {
    return json({ error: "Failed to edit profile", details: error.message }, 500);
  }
}

// ─── Router ──────────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          ...CORS,
          "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, OPTIONS",
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

    return json({ error: "Not found" }, 404);
  },
};
