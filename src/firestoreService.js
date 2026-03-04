import {
  collection, addDoc, getDocs, query, orderBy,
  serverTimestamp, writeBatch, doc,
} from "firebase/firestore";
import { db } from "./firebase.js";

// ─── Save a single attempt ─────────────────────────────────────────────────
export async function saveAttempt(uid, attemptData) {
  const attemptsRef = collection(db, "users", uid, "attempts");
  await addDoc(attemptsRef, {
    ...attemptData,
    timestamp: serverTimestamp(),
  });
}

// ─── Get all attempts for a user ────────────────────────────────────────────
export async function getUserAttempts(uid) {
  const attemptsRef = collection(db, "users", uid, "attempts");
  const q = query(attemptsRef, orderBy("timestamp", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
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

// ─── Migrate localStorage data to Firestore ─────────────────────────────────
export async function migrateLocalStorageToFirestore(uid) {
  const flag = `migrated_${uid}`;
  if (localStorage.getItem(flag)) return;

  const attempts = [];

  // Scan for written grades (App.jsx pattern)
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;

    let questionType = null;
    let questionId = null;
    let subject = "business";

    if (key.startsWith("written_grade_")) {
      questionType = "written";
      questionId = key.replace("written_grade_", "");
    } else if (key.startsWith("spec_grade_")) {
      questionType = "specimen";
      questionId = key.replace("spec_grade_", "");
    } else if (key.startsWith("hist_grade_") || key.startsWith("p3_grade_")) {
      questionType = "history";
      questionId = key.replace("hist_grade_", "").replace("p3_grade_", "");
      subject = "history";
    } else {
      continue;
    }

    try {
      const grade = JSON.parse(localStorage.getItem(key));
      if (!grade || grade.score == null) continue;

      const ansKey = key.replace("_grade_", "_ans_");
      const userAnswer = localStorage.getItem(ansKey) || "";

      attempts.push({
        questionId,
        questionType,
        category: "Migrated",
        subject,
        userAnswer: userAnswer ? JSON.parse(userAnswer) : "",
        isCorrect: null,
        score: grade.score,
        maxMarks: grade.maxMarks || grade.max || 5,
        difficulty: null,
        timeSpentMs: 0,
      });
    } catch {
      continue;
    }
  }

  if (attempts.length === 0) {
    localStorage.setItem(flag, "true");
    return;
  }

  // Batch write (max 500 per batch)
  const batchSize = 400;
  for (let i = 0; i < attempts.length; i += batchSize) {
    const batch = writeBatch(db);
    const chunk = attempts.slice(i, i + batchSize);
    for (const a of chunk) {
      const ref = doc(collection(db, "users", uid, "attempts"));
      batch.set(ref, { ...a, timestamp: serverTimestamp() });
    }
    await batch.commit();
  }

  localStorage.setItem(flag, "true");
}
