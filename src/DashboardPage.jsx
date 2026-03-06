import { useState, useEffect } from "react";
import { Button, Surface } from "@heroui/react";
import { SignInButton } from "@clerk/react";
import { useAuth } from "./AuthContext.jsx";
import LoginButton from "./LoginButton.jsx";
import Sidebar from "./Sidebar.jsx";
import ProgressBar from "./components/ProgressBar.jsx";
import {
  getUserAttempts,
  computeCategoryStats,
  computeOverallStats,
  getWrongAnswers,
} from "./userApi.js";

const CAT_COLORS = {
  "Costs & Revenue": "#7C6FFF",
  "Cash Flow": "#38BDF8",
  "Final Accounts": "#34D399",
  "Ratio Analysis": "#FBBF24",
  "Ratio Analysis (HL)": "#FBBF24",
  "Investment Appraisal": "#A78BFA",
  "Budgets & Variance": "#F87171",
  "Breakeven": "#2DD4BF",
  "BMT Tools": "#F472B6",
  "Sources of Finance": "#FB923C",
  "Specimen Exam": "#2DD4BF",
  "Migrated": "var(--text-secondary)",
};

function formatTime(ms) {
  if (!ms) return "0s";
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  if (minutes < 60) return `${minutes}m ${remaining}s`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${minutes % 60}m`;
}

function StatCard({ label, value, sub, color = "#7C6FFF" }) {
  return (
    <Surface className="rounded-2xl p-4" style={{ flex: 1, minWidth: 160 }}>
      <span className="block text-[var(--text-muted)] mb-1" style={{ fontSize: 11, fontFamily: "'JSans', sans-serif", letterSpacing: 1 }}>
        {label}
      </span>
      <span className="block font-extrabold" style={{ fontSize: 28, color, fontFamily: "'JSans', sans-serif" }}>
        {value}
      </span>
      {sub && (
        <span className="block text-[var(--text-secondary)] mt-0.5" style={{ fontSize: 12 }}>
          {sub}
        </span>
      )}
    </Surface>
  );
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setAttempts([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    getUserAttempts(user.uid)
      .then(setAttempts)
      .catch(() => setAttempts([]))
      .finally(() => setLoading(false));
  }, [user]);

  const overall = computeOverallStats(attempts);
  const categoryStats = computeCategoryStats(attempts);
  const wrongAnswers = getWrongAnswers(attempts);

  if (authLoading) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-base)", fontFamily: "'JSans', sans-serif", color: "var(--text-primary)" }}>
      <Sidebar activeSubject="dashboard" sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "var(--bg-header)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border-header)",
        }}
      >
        <div className="max-w-4xl mx-auto py-2 px-4">
          <div className="flex items-center justify-center mb-1" style={{ position: "relative" }}>
            <Button
              isIconOnly
              variant="outline"
              onPress={() => setSidebarOpen(o => !o)}
              className="rounded-full bg-transparent text-[var(--text-secondary)] border-[var(--border)] min-w-[auto] h-8 px-[10px]"
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </Button>
            <span
              className="text-xs px-2 py-0.5 rounded-full uppercase font-bold"
              style={{ letterSpacing: 2, backgroundColor: "#7C6FFF18", color: "#A78BFA", border: "none", fontFamily: "'JSans', sans-serif" }}
            >
              Analytics
            </span>
            <LoginButton />
          </div>
          <span
            className="text-center block font-extrabold text-[var(--text-primary)]"
            style={{ fontSize: "clamp(22px, 4vw, 30px)", letterSpacing: -0.5 }}
          >
            Your Dashboard
          </span>
          <span className="text-center block text-xs text-[var(--text-muted)] mb-2">
            Track your revision progress and performance
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-6 px-3">
        {!user ? (
          /* Guest prompt */
          <Surface className="rounded-3xl p-6 text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" style={{ marginBottom: 16 }}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <span className="font-bold text-lg text-[var(--text-primary)] block mb-1">
              Sign in to view your analytics
            </span>
            <span className="text-sm text-[var(--text-secondary)] block mb-4 mx-auto" style={{ maxWidth: 400 }}>
              Track your accuracy per topic, review wrong answers, and see time spent on each question.
            </span>
            <SignInButton mode="modal">
              <Button
                render={(props) => <button {...props} />}
                size="md"
                className="rounded-full bg-[#7C6FFF] text-white border-none font-semibold"
              >
                Sign In
              </Button>
            </SignInButton>
          </Surface>
        ) : loading ? (
          <span className="text-center block text-[var(--text-muted)] py-6">Loading your analytics...</span>
        ) : attempts.length === 0 ? (
          <Surface className="rounded-3xl p-6 text-center">
            <span className="font-bold text-lg text-[var(--text-primary)] block mb-1">
              No data yet
            </span>
            <span className="text-sm text-[var(--text-secondary)] block mb-4">
              Start answering questions on the Revision Hub to see your analytics here.
            </span>
            <a href="/business/checklist" style={{ textDecoration: "none" }}>
              <Button className="rounded-full bg-[#7C6FFF] text-white border-none font-semibold">
                Go to Revision Hub
              </Button>
            </a>
          </Surface>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Overview Cards */}
            <div className="flex gap-4 grow flex-wrap">
              <StatCard
                label="TOTAL ATTEMPTS"
                value={overall.totalAttempts}
                sub={`${overall.mcqTotal} MCQ + ${overall.totalAttempts - overall.mcqTotal} written`}
                color="var(--text-primary)"
              />
              <StatCard
                label="MCQ ACCURACY"
                value={overall.mcqAccuracy != null ? `${overall.mcqAccuracy}%` : "—"}
                sub={overall.mcqTotal > 0 ? `${overall.mcqTotal} questions` : "No MCQs yet"}
                color={overall.mcqAccuracy >= 75 ? "#34D399" : overall.mcqAccuracy >= 40 ? "#FBBF24" : "#F87171"}
              />
              <StatCard
                label="WRITTEN AVG"
                value={overall.writtenAvg != null ? `${overall.writtenAvg}%` : "—"}
                sub={overall.totalAttempts - overall.mcqTotal > 0 ? `${overall.totalAttempts - overall.mcqTotal} answers` : "No written yet"}
                color={overall.writtenAvg >= 75 ? "#34D399" : overall.writtenAvg >= 40 ? "#FBBF24" : "#F87171"}
              />
              <StatCard
                label="TOTAL TIME"
                value={formatTime(overall.totalTimeMs)}
                sub="across all questions"
                color="#A78BFA"
              />
            </div>

            {/* Category Breakdown */}
            <Surface className="rounded-2xl p-4">
              <span className="block text-[var(--text-muted)] mb-4" style={{ fontSize: 11, fontFamily: "'JSans', sans-serif", letterSpacing: 1 }}>
                PERFORMANCE BY TOPIC
              </span>
              <div className="flex flex-col gap-4">
                {categoryStats
                  .sort((a, b) => b.totalAttempts - a.totalAttempts)
                  .map((cat) => {
                    const color = CAT_COLORS[cat.category] || "#7C6FFF";
                    const pct = cat.mcqAccuracy ?? cat.writtenAvg ?? 0;
                    return (
                      <div key={cat.category}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: color }} />
                            <span className="text-[var(--text-primary)] font-semibold" style={{ fontSize: 13 }}>{cat.category}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {cat.mcqAccuracy != null && (
                              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: color + "22", color, border: "none", fontFamily: "'JSans', sans-serif" }}>
                                MCQ: {cat.mcqAccuracy}%
                              </span>
                            )}
                            {cat.writtenAvg != null && (
                              <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: color + "22", color, border: "none", fontFamily: "'JSans', sans-serif" }}>
                                Written: {cat.writtenAvg}%
                              </span>
                            )}
                            <span className="text-[var(--text-muted)]" style={{ fontSize: 11, fontFamily: "'JSans', sans-serif" }}>
                              {cat.totalAttempts} attempt{cat.totalAttempts !== 1 ? "s" : ""} · avg {formatTime(cat.avgTimeMs)}
                            </span>
                          </div>
                        </div>
                        <ProgressBar
                          value={pct}
                          color={pct >= 75 ? "#34D399" : pct >= 40 ? "#FBBF24" : "#F87171"}
                        />
                      </div>
                    );
                  })}
              </div>
            </Surface>

            {/* Wrong Answers */}
            {wrongAnswers.length > 0 && (
              <Surface className="rounded-2xl p-4">
                <span className="block text-[var(--text-muted)] mb-4" style={{ fontSize: 11, fontFamily: "'JSans', sans-serif", letterSpacing: 1 }}>
                  QUESTIONS TO REVIEW ({wrongAnswers.length})
                </span>
                <div className="flex flex-col gap-2">
                  {wrongAnswers.slice(0, 20).map((a, i) => (
                    <Surface key={a.id || i} variant="secondary" className="rounded-2xl p-2">
                      <div className="flex gap-2 flex-wrap mb-1">
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: a.isCorrect === false ? "#F8717122" : "#FBBF2422",
                            color: a.isCorrect === false ? "#F87171" : "#FBBF24",
                            border: "none",
                            fontFamily: "'JSans', sans-serif",
                          }}
                        >
                          {a.questionType === "mcq" ? "MCQ — Wrong" : `${a.score}/${a.maxMarks}`}
                        </span>
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: (CAT_COLORS[a.category] || "#7C6FFF") + "22",
                            color: CAT_COLORS[a.category] || "#7C6FFF",
                            border: "none",
                            fontFamily: "'JSans', sans-serif",
                          }}
                        >
                          {a.category}
                        </span>
                        {a.timeSpentMs > 0 && (
                          <span className="text-[var(--text-muted)] ml-auto" style={{ fontSize: 10, fontFamily: "'JSans', sans-serif" }}>
                            {formatTime(a.timeSpentMs)}
                          </span>
                        )}
                      </div>
                      <span className="text-[#B0ADA6]" style={{ fontSize: 13, lineHeight: 1.5 }}>
                        {a.questionId}
                      </span>
                    </Surface>
                  ))}
                </div>
              </Surface>
            )}

            {/* Recent Activity */}
            <Surface className="rounded-2xl p-4">
              <span className="block text-[var(--text-muted)] mb-4" style={{ fontSize: 11, fontFamily: "'JSans', sans-serif", letterSpacing: 1 }}>
                RECENT ACTIVITY
              </span>
              <div className="flex flex-col gap-1">
                {attempts.slice(0, 20).map((a, i) => {
                  const color = CAT_COLORS[a.category] || "#7C6FFF";
                  const isGood = a.questionType === "mcq"
                    ? a.isCorrect
                    : a.score != null && a.maxMarks != null && a.score / a.maxMarks >= 0.5;

                  return (
                    <div key={a.id || i} className="flex items-center gap-2 py-1" style={{ borderBottom: "1px solid var(--bg-input)" }}>
                      <div style={{
                        width: 8, height: 8, borderRadius: "50%",
                        backgroundColor: isGood ? "#34D399" : "#F87171",
                        flexShrink: 0,
                      }} />
                      <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: color + "22", color, border: "none", fontFamily: "'JSans', sans-serif", flexShrink: 0 }}>
                        {a.questionType.toUpperCase()}
                      </span>
                      <span className="text-[var(--text-secondary)] truncate" style={{ fontSize: 12, flex: 1 }}>
                        {a.category} — {a.questionId}
                      </span>
                      <span className="text-[var(--text-muted)]" style={{ fontSize: 11, fontFamily: "'JSans', sans-serif", flexShrink: 0 }}>
                        {a.questionType === "mcq"
                          ? (a.isCorrect ? "Correct" : "Wrong")
                          : (a.score != null ? `${a.score}/${a.maxMarks}` : "—")}
                      </span>
                      {a.timeSpentMs > 0 && (
                        <span className="text-[var(--text-muted)]" style={{ fontSize: 10, fontFamily: "'JSans', sans-serif", flexShrink: 0 }}>
                          {formatTime(a.timeSpentMs)}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </Surface>
          </div>
        )}
      </div>

      {/* Floating support button */}
      <a
        href="https://donate.stripe.com/aFa7sN64kbjBdj8ayH4ow01"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 999,
          width: 48,
          height: 48,
          borderRadius: "50%",
          backgroundColor: "#7C6FFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 14px rgba(124,111,255,0.4)",
          border: "none",
          cursor: "pointer",
          textDecoration: "none",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        title="Support us"
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(124,111,255,0.6)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(124,111,255,0.4)"; }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" style={{ transition: "fill 0.25s ease" }} />
        </svg>
      </a>
    </div>
  );
}
