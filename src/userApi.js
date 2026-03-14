const WORKER_URL = "https://ib-grading-hollen.c9tggsfst9.workers.dev";

// ─── Authenticated fetch for admin endpoints ────────────────────────────────
async function adminFetch(path, method = "GET", body = undefined) {
  const token = await window.Clerk?.session?.getToken();
  if (!token) throw new Error("Not authenticated - no Clerk session token available");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const res = await fetch(`${WORKER_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`Admin API error ${res.status}: ${text}`);
  }
  return res.json();
}

// ─── Authenticated fetch helper ─────────────────────────────────────────────
async function authFetch(path, method = "GET", body = undefined) {
  const token = await window.Clerk?.session?.getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${WORKER_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

// ─── Save a single attempt ─────────────────────────────────────────────────
export async function saveAttempt(uid, attemptData, userInfo = {}) {
  return authFetch(`/api/attempts/${uid}`, "POST", {
    ...attemptData,
    displayName: userInfo.displayName || "Student",
    email: userInfo.email || "",
    username: userInfo.username || "",
  });
}

// ─── Admin: get all users' stats ────────────────────────────────────────────
export async function getAllUsersStats() {
  return adminFetch("/api/admin/users");
}

// ─── Admin: update user account status ──────────────────────────────────────
export async function updateUserStatus(uid, status) {
  return adminFetch("/api/admin/users/status", "PUT", { uid, status });
}

// ─── Admin: ban user via Clerk ──────────────────────────────────────────────
export async function banUser(uid) {
  return adminFetch("/api/admin/users/ban", "POST", { uid });
}

// ─── Admin: unban user via Clerk ────────────────────────────────────────────
export async function unbanUser(uid) {
  return adminFetch("/api/admin/users/unban", "POST", { uid });
}

// ─── Admin: force sign out via Clerk ────────────────────────────────────────
export async function forceSignOut(uid) {
  return adminFetch("/api/admin/users/signout", "POST", { uid });
}

// ─── Admin: edit user profile via Clerk ─────────────────────────────────────
export async function editUserProfile(uid, { firstName, lastName, username }) {
  return adminFetch("/api/admin/users/profile", "PATCH", { uid, firstName, lastName, username });
}

// ─── Admin: change user role via Clerk ──────────────────────────────────────
export async function changeUserRole(uid, role) {
  return adminFetch("/api/admin/users/role", "PUT", { uid, role });
}

// ─── Get all attempts for a user ────────────────────────────────────────────
export async function getUserAttempts(uid) {
  const data = await authFetch(`/api/attempts/${uid}`);
  return Array.isArray(data) ? data : [];
}

// ─── Compute stats grouped by category ──────────────────────────────────────
export function computeCategoryStats(attempts) {
  const cats = {};

  for (const a of attempts) {
    const cat = a.category || "Uncategorized";
    if (!cats[cat]) {
      cats[cat] = { mcqCorrect: 0, mcqTotal: 0, writtenScore: 0, writtenMax: 0, totalTime: 0, count: 0 };
    }
    const c = cats[cat];
    c.count++;
    c.totalTime += a.timeSpentMs || 0;

    if (a.questionType === "mcq") {
      c.mcqTotal++;
      if (a.isCorrect) c.mcqCorrect++;
    } else if (a.score != null && a.maxMarks != null) {
      c.writtenScore += a.score;
      c.writtenMax += a.maxMarks;
    }
  }

  return Object.entries(cats).map(([category, c]) => ({
    category,
    mcqAccuracy: c.mcqTotal > 0 ? Math.round((c.mcqCorrect / c.mcqTotal) * 100) : null,
    mcqTotal: c.mcqTotal,
    writtenAvg: c.writtenMax > 0 ? Math.round((c.writtenScore / c.writtenMax) * 100) : null,
    writtenTotal: c.count - c.mcqTotal,
    avgTimeMs: c.count > 0 ? Math.round(c.totalTime / c.count) : 0,
    totalAttempts: c.count,
  }));
}

// ─── Get wrong/low-scoring answers ──────────────────────────────────────────
export function getWrongAnswers(attempts) {
  return attempts.filter((a) => {
    if (a.questionType === "mcq") return a.isCorrect === false;
    if (a.score != null && a.maxMarks != null && a.maxMarks > 0) {
      return a.score / a.maxMarks < 0.5;
    }
    return false;
  });
}

// ─── Compute overall stats ──────────────────────────────────────────────────
export function computeOverallStats(attempts) {
  let mcqCorrect = 0, mcqTotal = 0;
  let writtenScore = 0, writtenMax = 0;
  let totalTime = 0;

  for (const a of attempts) {
    totalTime += a.timeSpentMs || 0;
    if (a.questionType === "mcq") {
      mcqTotal++;
      if (a.isCorrect) mcqCorrect++;
    } else if (a.score != null && a.maxMarks != null) {
      writtenScore += a.score;
      writtenMax += a.maxMarks;
    }
  }

  return {
    totalAttempts: attempts.length,
    mcqAccuracy: mcqTotal > 0 ? Math.round((mcqCorrect / mcqTotal) * 100) : null,
    mcqTotal,
    writtenAvg: writtenMax > 0 ? Math.round((writtenScore / writtenMax) * 100) : null,
    totalTimeMs: totalTime,
  };
}
