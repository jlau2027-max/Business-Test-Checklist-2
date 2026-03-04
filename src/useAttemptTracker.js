import { useRef, useEffect, useCallback } from "react";
import { useAuth } from "./AuthContext.jsx";
import { saveAttempt } from "./firestoreService.js";

export function useAttemptTracker(questionId, questionType, category, subject = "business", difficulty = null) {
  const { user } = useAuth();
  const startTimeRef = useRef(Date.now());

  // Reset timer when question changes
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [questionId]);

  const recordAttempt = useCallback(
    async (result) => {
      // result: { userAnswer, isCorrect?, score?, maxMarks? }
      if (!user) return;

      const timeSpentMs = Date.now() - startTimeRef.current;

      try {
        await saveAttempt(user.uid, {
          questionId,
          questionType,
          category: category || "Uncategorized",
          subject,
          difficulty,
          timeSpentMs,
          userAnswer: result.userAnswer ?? "",
          isCorrect: result.isCorrect ?? null,
          score: result.score ?? null,
          maxMarks: result.maxMarks ?? null,
        });
      } catch (err) {
        console.error("Failed to save attempt:", err);
      }
    },
    [user, questionId, questionType, category, subject, difficulty]
  );

  const resetTimer = useCallback(() => {
    startTimeRef.current = Date.now();
  }, []);

  return { recordAttempt, resetTimer };
}
