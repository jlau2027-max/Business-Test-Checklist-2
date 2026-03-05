const WORKER_URL = "https://ib-grading-hollen.c9tggsfst9.workers.dev";

// ─── Save a single attempt ─────────────────────────────────────────────────
export async function saveAttempt(uid, attemptData, userInfo = {}) {
  const res = await fetch(`${WORKER_URL}/api/attempts/${uid}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...attemptData,
      displayName: userInfo.displayName || "Student",
      email: userInfo.email || "",
    }),
  });
  if (!res.ok) throw new Error("Failed to save attempt");
}

// ─── Admin: get all users' stats ────────────────────────────────────────────
export async function getAllUsersStats() {
  const res = await fetch(`${WORKER_URL}/api/admin/users`);
  if (!res.ok) throw new Error("Failed to fetch admin data");
  return await res.json();
}

// ─── Get all attempts for a user ────────────────────────────────────────────
export async function getUserAttempts(uid) {
  const res = await fetch(`${WORKER_URL}/api/attempts/${uid}`);
  return await res.json();
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
