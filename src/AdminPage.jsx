import { useState, useEffect } from "react";
import {
  Container, Badge, Text, Group, Paper, Progress,
  Button, Box, Stack, Table,
} from "@mantine/core";
import { SignInButton } from "@clerk/react";
import { useAuth } from "./AuthContext.jsx";
import {
  getAllUsersStats,
  getUserAttempts,
  computeCategoryStats,
  computeOverallStats,
  getWrongAnswers,
  updateUserStatus,
} from "./firestoreService.js";
import LoginButton from "./LoginButton.jsx";

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

// ─── User Detail View ────────────────────────────────────────────────────────

function UserDetail({ uid, displayName, onBack }) {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUserAttempts(uid)
      .then(setAttempts)
      .catch(() => setAttempts([]))
      .finally(() => setLoading(false));
  }, [uid]);

  if (loading) {
    return <Text ta="center" c="#55556A" py="xl">Loading user data...</Text>;
  }

  const overall = computeOverallStats(attempts);
  const categoryStats = computeCategoryStats(attempts);
  const wrongAnswers = getWrongAnswers(attempts);

  return (
    <Stack gap="xl">
      <Group gap="sm">
        <Button
          onClick={onBack}
          radius="md"
          style={{
            backgroundColor: "transparent",
            color: "#8B8B9E",
            border: "1px solid #252533",
            padding: "4px 12px",
            minWidth: "auto",
            height: 32,
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          ← All Users
        </Button>
        <Text fz="lg" fw={700} c="#F0EEE8">{displayName}</Text>
      </Group>

      {attempts.length === 0 ? (
        <Paper bg="#12121A" radius="lg" p="xl" style={{ border: "1px solid #252533", textAlign: "center" }}>
          <Text fz="lg" fw={700} c="#F0EEE8" mb="xs">No data yet</Text>
          <Text fz="sm" c="#8B8B9E">This user hasn't answered any questions.</Text>
        </Paper>
      ) : (
        <>
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
                    </Group>
                    <Text fz={13} c="#B0ADA6" lh={1.5}>{a.questionId}</Text>
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
        </>
      )}
    </Stack>
  );
}

// ─── Admin Page ──────────────────────────────────────────────────────────────

export default function AdminPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getAllUsersStats()
      .then(setUsersData)
      .catch(() => setUsersData([]))
      .finally(() => setLoading(false));
  }, [isAdmin]);

  // Aggregate stats
  const totalUsers = usersData.length;
  const totalAttempts = usersData.reduce((s, u) => s + (u.totalAttempts || 0), 0);
  const totalMcqCorrect = usersData.reduce((s, u) => s + (u.mcqCorrect || 0), 0);
  const totalMcqTotal = usersData.reduce((s, u) => s + (u.mcqTotal || 0), 0);
  const totalWrittenScore = usersData.reduce((s, u) => s + (u.writtenScore || 0), 0);
  const totalWrittenMax = usersData.reduce((s, u) => s + (u.writtenMax || 0), 0);
  const overallMcqAcc = totalMcqTotal > 0 ? Math.round((totalMcqCorrect / totalMcqTotal) * 100) : null;
  const overallWrittenAvg = totalWrittenMax > 0 ? Math.round((totalWrittenScore / totalWrittenMax) * 100) : null;

  const handleStatusChange = async (uid, newStatus) => {
    try {
      await updateUserStatus(uid, newStatus);
      setUsersData((prev) =>
        prev.map((u) =>
          u.uid === uid ? { ...u, accountStatus: newStatus } : u
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  if (authLoading) return null;

  return (
    <Box mih="100vh" bg="#09090F" style={{ fontFamily: "'Inter', sans-serif", color: "#F0EEE8" }}>
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
              component="a"
              href="/"
              radius="md"
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: "transparent",
                color: "#8B8B9E",
                border: "1px solid #252533",
                padding: "4px 12px",
                minWidth: "auto",
                height: 32,
                fontSize: 12,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              ← Hub
            </Button>
            <Badge
              variant="light"
              size="sm"
              tt="uppercase"
              fw={700}
              ff="'JetBrains Mono', monospace"
              style={{ letterSpacing: 2, backgroundColor: "#F8717118", color: "#F87171", border: "none" }}
            >
              Admin
            </Badge>
            <LoginButton />
          </Group>
          <Text ta="center" fw={800} fz={{ base: 22, sm: 30 }} c="#F0EEE8" style={{ letterSpacing: -0.5 }}>
            Admin Dashboard
          </Text>
          <Text ta="center" fz="xs" c="#55556A" mb="sm">
            View all users' analytics and performance data
          </Text>
        </Container>
      </Box>

      <Container size="lg" py="xl" px="md">
        {!user ? (
          <Paper bg="#12121A" radius="lg" p="xl" style={{ border: "1px solid #252533", textAlign: "center" }}>
            <Text fz="lg" fw={700} c="#F0EEE8" mb="xs">Sign in required</Text>
            <Text fz="sm" c="#8B8B9E" mb="lg">You must be signed in as an admin to access this page.</Text>
            <SignInButton mode="modal">
              <Button radius="md" size="md" style={{ backgroundColor: "#7C6FFF" }}>Sign In</Button>
            </SignInButton>
          </Paper>
        ) : !isAdmin ? (
          <Paper bg="#12121A" radius="lg" p="xl" style={{ border: "1px solid #252533", textAlign: "center" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" style={{ marginBottom: 16 }}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <Text fz="lg" fw={700} c="#F0EEE8" mb="xs">Access Denied</Text>
            <Text fz="sm" c="#8B8B9E" mb="lg">You don't have admin privileges.</Text>
            <Button component="a" href="/" radius="md" style={{ backgroundColor: "#7C6FFF" }}>
              Go to Revision Hub
            </Button>
          </Paper>
        ) : loading ? (
          <Text ta="center" c="#55556A" py="xl">Loading admin data...</Text>
        ) : selectedUser ? (
          <UserDetail
            uid={selectedUser.uid}
            displayName={selectedUser.displayName || selectedUser.uid}
            onBack={() => setSelectedUser(null)}
          />
        ) : (
          <Stack gap="xl">
            {/* Aggregate Stats */}
            <Group gap="md" grow style={{ flexWrap: "wrap" }}>
              <StatCard label="TOTAL USERS" value={totalUsers} color="#F0EEE8" />
              <StatCard label="TOTAL ATTEMPTS" value={totalAttempts} color="#7C6FFF" />
              <StatCard
                label="OVERALL MCQ"
                value={overallMcqAcc != null ? `${overallMcqAcc}%` : "—"}
                sub={totalMcqTotal > 0 ? `${totalMcqTotal} questions` : ""}
                color={overallMcqAcc >= 75 ? "#34D399" : overallMcqAcc >= 40 ? "#FBBF24" : "#F87171"}
              />
              <StatCard
                label="OVERALL WRITTEN"
                value={overallWrittenAvg != null ? `${overallWrittenAvg}%` : "—"}
                sub={totalWrittenMax > 0 ? `${totalAttempts - totalMcqTotal} answers` : ""}
                color={overallWrittenAvg >= 75 ? "#34D399" : overallWrittenAvg >= 40 ? "#FBBF24" : "#F87171"}
              />
            </Group>

            {/* Users Table */}
            <Paper bg="#12121A" radius="lg" p="lg" style={{ border: "1px solid #252533", overflow: "auto" }}>
              <Text fz={11} ff="'JetBrains Mono', monospace" c="#55556A" lts={1} mb="md">
                ALL USERS ({totalUsers})
              </Text>
              {usersData.length === 0 ? (
                <Text ta="center" c="#55556A" py="md">No users found.</Text>
              ) : (
                <Table
                  highlightOnHover
                  styles={{
                    table: { color: "#F0EEE8" },
                    tr: { cursor: "pointer", borderBottom: "1px solid #1A1A24" },
                    th: { color: "#55556A", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, borderBottom: "1px solid #252533", padding: "8px 12px" },
                    td: { fontSize: 13, padding: "10px 12px", borderBottom: "1px solid #1A1A24" },
                  }}
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>NAME</Table.Th>
                      <Table.Th>USERNAME</Table.Th>
                      <Table.Th>EMAIL</Table.Th>
                      <Table.Th>STATUS</Table.Th>
                      <Table.Th style={{ textAlign: "right" }}>ATTEMPTS</Table.Th>
                      <Table.Th style={{ textAlign: "right" }}>MCQ %</Table.Th>
                      <Table.Th style={{ textAlign: "right" }}>WRITTEN %</Table.Th>
                      <Table.Th style={{ textAlign: "right" }}>TIME</Table.Th>
                      <Table.Th style={{ textAlign: "right" }}>LAST ACTIVE</Table.Th>
                      <Table.Th>ACTIONS</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {usersData.map((u) => {
                      const mcqAcc = u.mcqTotal > 0 ? Math.round((u.mcqCorrect / u.mcqTotal) * 100) : null;
                      const writtenAvg = u.writtenMax > 0 ? Math.round((u.writtenScore / u.writtenMax) * 100) : null;
                      const lastActive = u.lastActive ? new Date(u.lastActive).toLocaleDateString() : "—";

                      const statusColor =
                        (u.accountStatus || "active") === "active" ? "#34D399" :
                        u.accountStatus === "admin_deleted" ? "#F87171" : "#FBBF24";

                      return (
                        <Table.Tr key={u.uid} onClick={() => setSelectedUser(u)}>
                          <Table.Td>
                            <Text fw={600} c="#F0EEE8" fz={13}>{u.displayName || "Student"}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Text c="#8B8B9E" fz={12} ff="'JetBrains Mono', monospace">{u.username || "---"}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Text c="#8B8B9E" fz={12} truncate>{u.email || "—"}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Badge
                              size="xs"
                              ff="'JetBrains Mono', monospace"
                              style={{
                                backgroundColor: statusColor + "22",
                                color: statusColor,
                                border: "none",
                              }}
                            >
                              {u.accountStatus || "active"}
                            </Badge>
                          </Table.Td>
                          <Table.Td style={{ textAlign: "right" }}>
                            <Text ff="'JetBrains Mono', monospace" fz={13}>{u.totalAttempts}</Text>
                          </Table.Td>
                          <Table.Td style={{ textAlign: "right" }}>
                            <Text
                              ff="'JetBrains Mono', monospace"
                              fz={13}
                              c={mcqAcc == null ? "#55556A" : mcqAcc >= 75 ? "#34D399" : mcqAcc >= 40 ? "#FBBF24" : "#F87171"}
                            >
                              {mcqAcc != null ? `${mcqAcc}%` : "—"}
                            </Text>
                          </Table.Td>
                          <Table.Td style={{ textAlign: "right" }}>
                            <Text
                              ff="'JetBrains Mono', monospace"
                              fz={13}
                              c={writtenAvg == null ? "#55556A" : writtenAvg >= 75 ? "#34D399" : writtenAvg >= 40 ? "#FBBF24" : "#F87171"}
                            >
                              {writtenAvg != null ? `${writtenAvg}%` : "—"}
                            </Text>
                          </Table.Td>
                          <Table.Td style={{ textAlign: "right" }}>
                            <Text ff="'JetBrains Mono', monospace" fz={12} c="#8B8B9E">
                              {formatTime(u.totalTimeMs)}
                            </Text>
                          </Table.Td>
                          <Table.Td style={{ textAlign: "right" }}>
                            <Text ff="'JetBrains Mono', monospace" fz={12} c="#8B8B9E">{lastActive}</Text>
                          </Table.Td>
                          <Table.Td>
                            {(u.accountStatus || "active") !== "admin_deleted" ? (
                              <Button
                                size="compact-xs"
                                radius="md"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(u.uid, "admin_deleted");
                                }}
                                style={{
                                  backgroundColor: "#F8717122",
                                  color: "#F87171",
                                  border: "none",
                                  fontFamily: "'JetBrains Mono', monospace",
                                  fontSize: 10,
                                }}
                              >
                                Disable
                              </Button>
                            ) : (
                              <Button
                                size="compact-xs"
                                radius="md"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(u.uid, "active");
                                }}
                                style={{
                                  backgroundColor: "#34D39922",
                                  color: "#34D399",
                                  border: "none",
                                  fontFamily: "'JetBrains Mono', monospace",
                                  fontSize: 10,
                                }}
                              >
                                Reactivate
                              </Button>
                            )}
                          </Table.Td>
                        </Table.Tr>
                      );
                    })}
                  </Table.Tbody>
                </Table>
              )}
            </Paper>
          </Stack>
        )}
      </Container>
    </Box>
  );
}
