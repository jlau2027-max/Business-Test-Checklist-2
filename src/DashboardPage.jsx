import { useState, useEffect } from "react";
import {
  Container, Badge, Text, Group, Paper, Progress,
  Button, Box, Stack, Alert,
} from "@mantine/core";
import { SignInButton } from "@clerk/react";
import { useAuth } from "./AuthContext.jsx";
import LoginButton from "./LoginButton.jsx";
import Sidebar from "./Sidebar.jsx";
import {
  getUserAttempts,
  computeCategoryStats,
  computeOverallStats,
  getWrongAnswers,
} from "./firestoreService.js";

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
  "Migrated": "#8B8B9E",
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
    <Paper bg="#12121A" radius="lg" p="lg" style={{ border: "1px solid #252533", flex: 1, minWidth: 160 }}>
      <Text fz={11} ff="'JetBrains Mono', monospace" c="#55556A" lts={1} mb={4}>
        {label}
      </Text>
      <Text fz={28} fw={800} c={color} ff="'JetBrains Mono', monospace">
        {value}
      </Text>
      {sub && (
        <Text fz={12} c="#8B8B9E" mt={2}>
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
    <Box mih="100vh" bg="#09090F" style={{ fontFamily: "'Inter', sans-serif", color: "#F0EEE8" }}>
      <Sidebar activeSubject="dashboard" sidebarOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <Box
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(9, 9, 15, 0.85)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <Container size="lg" py="sm">
          <Group justify="center" mb={4} style={{ position: "relative" }}>
            <Button
              onClick={() => setSidebarOpen(o => !o)}
              radius="md"
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "transparent",
                color: "#8B8B9E",
                border: "1px solid #252533",
                padding: "4px 10px",
                minWidth: "auto",
                height: 32,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </Button>
            <Badge
              variant="light"
              size="sm"
              tt="uppercase"
              fw={700}
              ff="'JetBrains Mono', monospace"
              style={{ letterSpacing: 2, backgroundColor: "#7C6FFF18", color: "#A78BFA", border: "none" }}
            >
              Analytics
            </Badge>
            <LoginButton />
          </Group>
          <Text ta="center" fw={800} fz={{ base: 22, sm: 30 }} c="#F0EEE8" style={{ letterSpacing: -0.5 }}>
            Your Dashboard
          </Text>
          <Text ta="center" fz="xs" c="#55556A" mb="sm">
            Track your revision progress and performance
          </Text>
        </Container>
      </Box>

      <Container size="lg" py="xl" px="md">
        {!user ? (
          /* Guest prompt */
          <Paper bg="#12121A" radius="lg" p="xl" style={{ border: "1px solid #252533", textAlign: "center" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#55556A" strokeWidth="1.5" strokeLinecap="round" style={{ marginBottom: 16 }}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            <Text fz="lg" fw={700} c="#F0EEE8" mb="xs">
              Sign in to view your analytics
            </Text>
            <Text fz="sm" c="#8B8B9E" mb="lg" maw={400} mx="auto">
              Track your accuracy per topic, review wrong answers, and see time spent on each question.
            </Text>
            <SignInButton mode="modal">
              <Button
                radius="md"
                size="md"
                style={{ backgroundColor: "#7C6FFF" }}
              >
                Sign In
              </Button>
            </SignInButton>
          </Paper>
        ) : loading ? (
          <Text ta="center" c="#55556A" py="xl">Loading your analytics...</Text>
        ) : attempts.length === 0 ? (
          <Paper bg="#12121A" radius="lg" p="xl" style={{ border: "1px solid #252533", textAlign: "center" }}>
            <Text fz="lg" fw={700} c="#F0EEE8" mb="xs">
              No data yet
            </Text>
            <Text fz="sm" c="#8B8B9E" mb="lg">
              Start answering questions on the Revision Hub to see your analytics here.
            </Text>
            <Button component="a" href="/business/checklist" radius="md" style={{ backgroundColor: "#7C6FFF" }}>
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
                color="#F0EEE8"
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
            </Group>

            {/* Category Breakdown */}
            <Paper bg="#12121A" radius="lg" p="lg" style={{ border: "1px solid #252533" }}>
              <Text fz={11} ff="'JetBrains Mono', monospace" c="#55556A" lts={1} mb="md">
                PERFORMANCE BY TOPIC
              </Text>
              <Stack gap="md">
                {categoryStats
                  .sort((a, b) => b.totalAttempts - a.totalAttempts)
                  .map((cat) => {
                    const color = CAT_COLORS[cat.category] || "#7C6FFF";
                    const pct = cat.mcqAccuracy ?? cat.writtenAvg ?? 0;
                    return (
                      <Box key={cat.category}>
                        <Group justify="space-between" mb={4}>
                          <Group gap={8}>
                            <Box style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: color }} />
                            <Text fz={13} c="#F0EEE8" fw={600}>{cat.category}</Text>
                          </Group>
                          <Group gap="xs">
                            {cat.mcqAccuracy != null && (
                              <Badge size="xs" ff="'JetBrains Mono', monospace" style={{ backgroundColor: color + "22", color, border: "none" }}>
                                MCQ: {cat.mcqAccuracy}%
                              </Badge>
                            )}
                            {cat.writtenAvg != null && (
                              <Badge size="xs" ff="'JetBrains Mono', monospace" style={{ backgroundColor: color + "22", color, border: "none" }}>
                                Written: {cat.writtenAvg}%
                              </Badge>
                            )}
                            <Text fz={11} c="#55556A" ff="'JetBrains Mono', monospace">
                              {cat.totalAttempts} attempt{cat.totalAttempts !== 1 ? "s" : ""} · avg {formatTime(cat.avgTimeMs)}
                            </Text>
                          </Group>
                        </Group>
                        <Progress
                          value={pct}
                          color={pct >= 75 ? "green" : pct >= 40 ? "yellow" : "red"}
                          size="sm"
                          radius="xl"
                          styles={{ root: { background: "#1E1E2A" } }}
                        />
                      </Box>
                    );
                  })}
              </Stack>
            </Paper>

            {/* Wrong Answers */}
            {wrongAnswers.length > 0 && (
              <Paper bg="#12121A" radius="lg" p="lg" style={{ border: "1px solid #252533" }}>
                <Text fz={11} ff="'JetBrains Mono', monospace" c="#55556A" lts={1} mb="md">
                  QUESTIONS TO REVIEW ({wrongAnswers.length})
                </Text>
                <Stack gap="sm">
                  {wrongAnswers.slice(0, 20).map((a, i) => (
                    <Paper key={a.id || i} bg="#1A1A24" radius="md" p="sm" style={{ border: "1px solid #252533" }}>
                      <Group gap={8} mb={4} style={{ flexWrap: "wrap" }}>
                        <Badge
                          size="xs"
                          ff="'JetBrains Mono', monospace"
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
                          ff="'JetBrains Mono', monospace"
                          style={{
                            backgroundColor: (CAT_COLORS[a.category] || "#7C6FFF") + "22",
                            color: CAT_COLORS[a.category] || "#7C6FFF",
                            border: "none",
                          }}
                        >
                          {a.category}
                        </Badge>
                        {a.timeSpentMs > 0 && (
                          <Text fz={10} c="#55556A" ff="'JetBrains Mono', monospace" ml="auto">
                            {formatTime(a.timeSpentMs)}
                          </Text>
                        )}
                      </Group>
                      <Text fz={13} c="#B0ADA6" lh={1.5}>
                        {a.questionId}
                      </Text>
                    </Paper>
                  ))}
                </Stack>
              </Paper>
            )}

            {/* Recent Activity */}
            <Paper bg="#12121A" radius="lg" p="lg" style={{ border: "1px solid #252533" }}>
              <Text fz={11} ff="'JetBrains Mono', monospace" c="#55556A" lts={1} mb="md">
                RECENT ACTIVITY
              </Text>
              <Stack gap="xs">
                {attempts.slice(0, 20).map((a, i) => {
                  const color = CAT_COLORS[a.category] || "#7C6FFF";
                  const isGood = a.questionType === "mcq"
                    ? a.isCorrect
                    : a.score != null && a.maxMarks != null && a.score / a.maxMarks >= 0.5;

                  return (
                    <Group key={a.id || i} gap="sm" py={4} style={{ borderBottom: "1px solid #1A1A24" }}>
                      <Box style={{
                        width: 8, height: 8, borderRadius: "50%",
                        backgroundColor: isGood ? "#34D399" : "#F87171",
                        flexShrink: 0,
                      }} />
                      <Badge size="xs" ff="'JetBrains Mono', monospace" style={{ backgroundColor: color + "22", color, border: "none", flexShrink: 0 }}>
                        {a.questionType.toUpperCase()}
                      </Badge>
                      <Text fz={12} c="#8B8B9E" style={{ flex: 1 }} truncate>
                        {a.category} — {a.questionId}
                      </Text>
                      <Text fz={11} c="#55556A" ff="'JetBrains Mono', monospace" style={{ flexShrink: 0 }}>
                        {a.questionType === "mcq"
                          ? (a.isCorrect ? "Correct" : "Wrong")
                          : (a.score != null ? `${a.score}/${a.maxMarks}` : "—")}
                      </Text>
                      {a.timeSpentMs > 0 && (
                        <Text fz={10} c="#55556A" ff="'JetBrains Mono', monospace" style={{ flexShrink: 0 }}>
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
    </Box>
  );
}
