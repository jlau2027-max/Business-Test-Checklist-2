import { useState, useEffect } from "react";
import {
  Container, Badge, Text, Group, Paper, Progress,
  Button, Box, Stack, Alert,
} from "@mantine/core";
import { SignInButton } from "@clerk/react";
import { useAuth } from "./AuthContext.jsx";
import {
  getUserAttempts,
  computeCategoryStats,
  computeOverallStats,
  getWrongAnswers,
} from "./firestoreService.js";

const CAT_COLORS = {
  "Costs & Revenue": "#0070F3",
  "Cash Flow": "#00B4D8",
  "Final Accounts": "#00CC88",
  "Ratio Analysis": "#F5A623",
  "Ratio Analysis (HL)": "#F5A623",
  "Investment Appraisal": "#7928CA",
  "Budgets & Variance": "#EE0000",
  "Breakeven": "#00CC88",
  "BMT Tools": "#FF0080",
  "Sources of Finance": "#F5A623",
  "Specimen Exam": "#00CC88",
  "Migrated": "#A1A1A1",
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

function StatCard({ label, value, sub, color = "#0070F3" }) {
  return (
    <Paper bg="#0A0A0A" radius="lg" p="lg" style={{ border: "1px solid #1F1F1F", flex: 1, minWidth: 160 }}>
      <Text fz={11} ff="'Geist Mono', monospace" c="#666666" lts={1} mb={4}>
        {label}
      </Text>
      <Text fz={28} fw={800} c={color} ff="'Geist Mono', monospace">
        {value}
      </Text>
      {sub && (
        <Text fz={12} c="#A1A1A1" mt={2}>
          {sub}
        </Text>
      )}
    </Paper>
  );
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <Box mih="100vh" bg="#000000" style={{ fontFamily: "'Geist', sans-serif", color: "#EDEDED" }}>
      {/* Header */}
      <Box
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <Container size="lg" py="sm">
          <Group justify="center" mb={4} style={{ position: "relative" }}>
            <Button
              component="a"
              href="/"
              radius="md"
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "transparent",
                color: "#A1A1A1",
                border: "1px solid #1F1F1F",
                padding: "4px 12px",
                minWidth: "auto",
                height: 32,
                fontSize: 12,
                fontFamily: "'Geist Mono', monospace",
              }}
            >
              ← Hub
            </Button>
            <Badge
              variant="light"
              size="sm"
              tt="uppercase"
              fw={700}
              ff="'Geist Mono', monospace"
              style={{ letterSpacing: 2, backgroundColor: "#0070F318", color: "#3291FF", border: "none" }}
            >
              Analytics
            </Badge>
          </Group>
          <Text ta="center" fw={800} fz={{ base: 22, sm: 30 }} c="#EDEDED" style={{ letterSpacing: -0.5 }}>
            Your Dashboard
          </Text>
          <Text ta="center" fz="xs" c="#666666" mb="sm">
            Track your revision progress and performance
          </Text>
        </Container>
      </Box>

      <Container size="lg" py="xl" px="md">
        {!user ? (
          /* Guest prompt */
          <Paper bg="#0A0A0A" radius="lg" p="xl" style={{ border: "1px solid #1F1F1F", textAlign: "center" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" style={{ marginBottom: 16 }}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <Text fz="lg" fw={700} c="#EDEDED" mb="xs">
              Sign in to view your analytics
            </Text>
            <Text fz="sm" c="#A1A1A1" mb="lg" maw={400} mx="auto">
              Track your accuracy per topic, review wrong answers, and see time spent on each question.
            </Text>
            <SignInButton mode="modal">
              <Button
                radius="md"
                size="md"
                style={{ backgroundColor: "#0070F3" }}
              >
                Sign In
              </Button>
            </SignInButton>
          </Paper>
        ) : loading ? (
          <Text ta="center" c="#666666" py="xl">Loading your analytics...</Text>
        ) : attempts.length === 0 ? (
          <Paper bg="#0A0A0A" radius="lg" p="xl" style={{ border: "1px solid #1F1F1F", textAlign: "center" }}>
            <Text fz="lg" fw={700} c="#EDEDED" mb="xs">
              No data yet
            </Text>
            <Text fz="sm" c="#A1A1A1" mb="lg">
              Start answering questions on the Revision Hub to see your analytics here.
            </Text>
            <Button component="a" href="/" radius="md" style={{ backgroundColor: "#0070F3" }}>
              Go to Revision Hub
            </Button>
          </Paper>
        ) : (
          <Stack gap="xl">
            {/* Overview Cards */}
            <Group gap="md" grow style={{ flexWrap: "wrap" }}>
              <StatCard
                label="TOTAL ATTEMPTS"
                value={overall.totalAttempts}
                sub={`${overall.mcqTotal} MCQ + ${overall.totalAttempts - overall.mcqTotal} written`}
                color="#EDEDED"
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
                color="#3291FF"
              />
            </Group>

            {/* Category Breakdown */}
            <Paper bg="#0A0A0A" radius="lg" p="lg" style={{ border: "1px solid #1F1F1F" }}>
              <Text fz={11} ff="'Geist Mono', monospace" c="#666666" lts={1} mb="md">
                PERFORMANCE BY TOPIC
              </Text>
              <Stack gap="md">
                {categoryStats
                  .sort((a, b) => b.totalAttempts - a.totalAttempts)
                  .map((cat) => {
                    const color = CAT_COLORS[cat.category] || "#0070F3";
                    const pct = cat.mcqAccuracy ?? cat.writtenAvg ?? 0;
                    return (
                      <Box key={cat.category}>
                        <Group justify="space-between" mb={4}>
                          <Group gap={8}>
                            <Box style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: color }} />
                            <Text fz={13} c="#EDEDED" fw={600}>{cat.category}</Text>
                          </Group>
                          <Group gap="xs">
                            {cat.mcqAccuracy != null && (
                              <Badge size="xs" ff="'Geist Mono', monospace" style={{ backgroundColor: color + "22", color, border: "none" }}>
                                MCQ: {cat.mcqAccuracy}%
                              </Badge>
                            )}
                            {cat.writtenAvg != null && (
                              <Badge size="xs" ff="'Geist Mono', monospace" style={{ backgroundColor: color + "22", color, border: "none" }}>
                                Written: {cat.writtenAvg}%
                              </Badge>
                            )}
                            <Text fz={11} c="#666666" ff="'Geist Mono', monospace">
                              {cat.totalAttempts} attempt{cat.totalAttempts !== 1 ? "s" : ""} · avg {formatTime(cat.avgTimeMs)}
                            </Text>
                          </Group>
                        </Group>
                        <Progress
                          value={pct}
                          color={pct >= 75 ? "green" : pct >= 40 ? "yellow" : "red"}
                          size="sm"
                          radius="xl"
                          styles={{ root: { background: "#171717" } }}
                        />
                      </Box>
                    );
                  })}
              </Stack>
            </Paper>

            {/* Wrong Answers */}
            {wrongAnswers.length > 0 && (
              <Paper bg="#0A0A0A" radius="lg" p="lg" style={{ border: "1px solid #1F1F1F" }}>
                <Text fz={11} ff="'Geist Mono', monospace" c="#666666" lts={1} mb="md">
                  QUESTIONS TO REVIEW ({wrongAnswers.length})
                </Text>
                <Stack gap="sm">
                  {wrongAnswers.slice(0, 20).map((a, i) => (
                    <Paper key={a.id || i} bg="#111111" radius="md" p="sm" style={{ border: "1px solid #1F1F1F" }}>
                      <Group gap={8} mb={4} style={{ flexWrap: "wrap" }}>
                        <Badge
                          size="xs"
                          ff="'Geist Mono', monospace"
                          style={{
                            backgroundColor: a.isCorrect === false ? "#F8717122" : "#FBBF2422",
                            color: a.isCorrect === false ? "#F87171" : "#FBBF24",
                            border: "none",
                          }}
                        >
                          {a.questionType === "mcq" ? "MCQ — Wrong" : `${a.score}/${a.maxMarks}`}
                        </Badge>
                        <Badge
                          size="xs"
                          ff="'Geist Mono', monospace"
                          style={{
                            backgroundColor: (CAT_COLORS[a.category] || "#0070F3") + "22",
                            color: CAT_COLORS[a.category] || "#0070F3",
                            border: "none",
                          }}
                        >
                          {a.category}
                        </Badge>
                        {a.timeSpentMs > 0 && (
                          <Text fz={10} c="#666666" ff="'Geist Mono', monospace" ml="auto">
                            {formatTime(a.timeSpentMs)}
                          </Text>
                        )}
                      </Group>
                      <Text fz={13} c="#A3A3A3" lh={1.5}>
                        {a.questionId}
                      </Text>
                    </Paper>
                  ))}
                </Stack>
              </Paper>
            )}

            {/* Recent Activity */}
            <Paper bg="#0A0A0A" radius="lg" p="lg" style={{ border: "1px solid #1F1F1F" }}>
              <Text fz={11} ff="'Geist Mono', monospace" c="#666666" lts={1} mb="md">
                RECENT ACTIVITY
              </Text>
              <Stack gap="xs">
                {attempts.slice(0, 20).map((a, i) => {
                  const color = CAT_COLORS[a.category] || "#0070F3";
                  const isGood = a.questionType === "mcq"
                    ? a.isCorrect
                    : a.score != null && a.maxMarks != null && a.score / a.maxMarks >= 0.5;

                  return (
                    <Group key={a.id || i} gap="sm" py={4} style={{ borderBottom: "1px solid #111111" }}>
                      <Box style={{
                        width: 8, height: 8, borderRadius: "50%",
                        backgroundColor: isGood ? "#34D399" : "#F87171",
                        flexShrink: 0,
                      }} />
                      <Badge size="xs" ff="'Geist Mono', monospace" style={{ backgroundColor: color + "22", color, border: "none", flexShrink: 0 }}>
                        {a.questionType.toUpperCase()}
                      </Badge>
                      <Text fz={12} c="#A1A1A1" style={{ flex: 1 }} truncate>
                        {a.category} — {a.questionId}
                      </Text>
                      <Text fz={11} c="#666666" ff="'Geist Mono', monospace" style={{ flexShrink: 0 }}>
                        {a.questionType === "mcq"
                          ? (a.isCorrect ? "Correct" : "Wrong")
                          : (a.score != null ? `${a.score}/${a.maxMarks}` : "—")}
                      </Text>
                      {a.timeSpentMs > 0 && (
                        <Text fz={10} c="#666666" ff="'Geist Mono', monospace" style={{ flexShrink: 0 }}>
                          {formatTime(a.timeSpentMs)}
                        </Text>
                      )}
                    </Group>
                  );
                })}
              </Stack>
            </Paper>
          </Stack>
        )}
      </Container>

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
          backgroundColor: "#0070F3",
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
    </Box>
  );
}
