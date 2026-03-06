import { useState, useEffect } from "react";
import {
  Badge, Text, Group, Paper, Progress, Box, Stack, TextInput, Select,
} from "@mantine/core";
import { Button, Table, Modal } from "@heroui/react";
import { useAuth } from "../AuthContext.jsx";
import {
  getAllUsersStats,
  getUserAttempts,
  computeCategoryStats,
  computeOverallStats,
  getWrongAnswers,
  banUser,
  unbanUser,
  forceSignOut,
  editUserProfile,
  changeUserRole,
} from "../userApi.js";

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
        <Button variant="outline" onPress={onBack} className="rounded-md border-[#252533] text-[#8B8B9E] bg-transparent min-w-[auto] h-8 px-3 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>← All Users</Button>
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

// ─── Role permission helpers ────────────────────────────────────────────────
// origin: all powers + change roles | two: ban/unban/signout/edit | admin: ban/unban/signout | viewer: read-only
const canBanUnban = (role) => ["origin", "two", "admin"].includes(role);
const canEdit = (role) => ["origin", "two"].includes(role);
const canChangeRole = (role) => role === "origin";

const ROLE_OPTIONS = [
  { value: "origin", label: "Origin — Full access + role management" },
  { value: "two", label: "Two — Ban/Unban/Sign Out/Edit" },
  { value: "admin", label: "Admin — Ban/Unban/Sign Out" },
  { value: "viewer", label: "Viewer — Read-only" },
  { value: "__none__", label: "None — Remove admin access" },
];

const ROLE_COLORS = {
  origin: "#F87171",
  two: "#FB923C",
  admin: "#7C6FFF",
  viewer: "#38BDF8",
};

export default function UsersAdmin() {
  const { user, isAdmin, role, loading: authLoading } = useAuth();
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ firstName: "", lastName: "", username: "" });
  const [roleModalOpened, setRoleModalOpened] = useState(false);
  const [roleTarget, setRoleTarget] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

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

  const handleBan = async (uid) => {
    try {
      await banUser(uid);
      setUsersData((prev) =>
        prev.map((u) => (u.uid === uid ? { ...u, accountStatus: "banned" } : u))
      );
    } catch (err) {
      console.error("Failed to ban user:", err);
    }
  };

  const handleUnban = async (uid) => {
    try {
      await unbanUser(uid);
      setUsersData((prev) =>
        prev.map((u) => (u.uid === uid ? { ...u, accountStatus: "active" } : u))
      );
    } catch (err) {
      console.error("Failed to unban user:", err);
    }
  };

  const handleForceSignOut = async (uid) => {
    try {
      const result = await forceSignOut(uid);
      console.log(`Revoked ${result.revoked} session(s)`);
    } catch (err) {
      console.error("Failed to sign out user:", err);
    }
  };

  const openEditFn = (u) => {
    setEditingUser(u);
    const parts = (u.displayName || "").split(" ");
    setEditForm({
      firstName: parts[0] || "",
      lastName: parts.slice(1).join(" ") || "",
      username: u.username || "",
    });
    setEditModalOpened(true);
  };

  const handleEditSubmit = async () => {
    if (!editingUser) return;
    try {
      const result = await editUserProfile(editingUser.uid, editForm);
      setUsersData((prev) =>
        prev.map((u) =>
          u.uid === editingUser.uid
            ? { ...u, displayName: result.displayName, email: result.email, username: result.username }
            : u
        )
      );
      setEditModalOpened(false);
      setEditingUser(null);
    } catch (err) {
      console.error("Failed to edit profile:", err);
    }
  };

  const openRoleChange = (u) => {
    setRoleTarget(u);
    setSelectedRole(null);
    setRoleModalOpened(true);
  };

  const handleRoleSubmit = async () => {
    if (!roleTarget || !selectedRole) return;
    try {
      const newRole = selectedRole === "__none__" ? null : selectedRole;
      await changeUserRole(roleTarget.uid, newRole);
      setRoleModalOpened(false);
      setRoleTarget(null);
    } catch (err) {
      console.error("Failed to change role:", err);
    }
  };

  if (authLoading || loading) {
    return <Text ta="center" c="#55556A" py="xl">Loading user data...</Text>;
  }

  if (selectedUser) {
    return (
      <UserDetail
        uid={selectedUser.uid}
        displayName={selectedUser.displayName || selectedUser.uid}
        onBack={() => setSelectedUser(null)}
      />
    );
  }

  return (
    <>
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
            <Table>
              <Table.ScrollContainer>
                <Table.Content aria-label="All users" className="min-w-[1100px]" style={{ borderCollapse: "collapse" }}>
                  <Table.Header>
                    <Table.Column isRowHeader className="text-[#55556A] text-[11px] tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace", padding: "8px 12px", borderBottom: "1px solid #252533", background: "transparent" }}>NAME</Table.Column>
                    <Table.Column className="text-[#55556A] text-[11px] tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace", padding: "8px 12px", borderBottom: "1px solid #252533", background: "transparent" }}>USERNAME</Table.Column>
                    <Table.Column className="text-[#55556A] text-[11px] tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace", padding: "8px 12px", borderBottom: "1px solid #252533", background: "transparent" }}>EMAIL</Table.Column>
                    <Table.Column className="text-[#55556A] text-[11px] tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace", padding: "8px 12px", borderBottom: "1px solid #252533", background: "transparent" }}>STATUS</Table.Column>
                    <Table.Column className="text-[#55556A] text-[11px] tracking-wider text-right" style={{ fontFamily: "'JetBrains Mono', monospace", padding: "8px 12px", borderBottom: "1px solid #252533", background: "transparent" }}>ATTEMPTS</Table.Column>
                    <Table.Column className="text-[#55556A] text-[11px] tracking-wider text-right" style={{ fontFamily: "'JetBrains Mono', monospace", padding: "8px 12px", borderBottom: "1px solid #252533", background: "transparent" }}>MCQ %</Table.Column>
                    <Table.Column className="text-[#55556A] text-[11px] tracking-wider text-right" style={{ fontFamily: "'JetBrains Mono', monospace", padding: "8px 12px", borderBottom: "1px solid #252533", background: "transparent" }}>WRITTEN %</Table.Column>
                    <Table.Column className="text-[#55556A] text-[11px] tracking-wider text-right" style={{ fontFamily: "'JetBrains Mono', monospace", padding: "8px 12px", borderBottom: "1px solid #252533", background: "transparent" }}>TIME</Table.Column>
                    <Table.Column className="text-[#55556A] text-[11px] tracking-wider text-right" style={{ fontFamily: "'JetBrains Mono', monospace", padding: "8px 12px", borderBottom: "1px solid #252533", background: "transparent" }}>LAST ACTIVE</Table.Column>
                    <Table.Column className="text-[#55556A] text-[11px] tracking-wider" style={{ fontFamily: "'JetBrains Mono', monospace", padding: "8px 12px", borderBottom: "1px solid #252533", background: "transparent" }}>ACTIONS</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {usersData.map((u) => {
                      const mcqAcc = u.mcqTotal > 0 ? Math.round((u.mcqCorrect / u.mcqTotal) * 100) : null;
                      const writtenAvg = u.writtenMax > 0 ? Math.round((u.writtenScore / u.writtenMax) * 100) : null;
                      const lastActive = u.lastActive ? new Date(u.lastActive).toLocaleDateString() : "—";

                      const statusColor =
                        (u.accountStatus || "active") === "active" ? "#34D399" :
                        u.accountStatus === "banned" ? "#F87171" :
                        u.accountStatus === "admin_deleted" ? "#F87171" : "#FBBF24";

                      const cellStyle = { padding: "10px 12px", borderBottom: "1px solid #1A1A24", cursor: "pointer" };
                      const selectUser = () => setSelectedUser(u);
                      return (
                        <Table.Row key={u.uid} className="hover:bg-[#1A1A24] transition-colors">
                          <Table.Cell style={cellStyle} onClick={selectUser}>
                            <Text fw={600} c="#F0EEE8" fz={13}>{u.displayName || "Student"}</Text>
                          </Table.Cell>
                          <Table.Cell style={cellStyle} onClick={selectUser}>
                            <Text c="#8B8B9E" fz={12} ff="'JetBrains Mono', monospace">{u.username || "---"}</Text>
                          </Table.Cell>
                          <Table.Cell style={cellStyle} onClick={selectUser}>
                            <Text c="#8B8B9E" fz={12} truncate>{u.email || "—"}</Text>
                          </Table.Cell>
                          <Table.Cell style={cellStyle} onClick={selectUser}>
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
                          </Table.Cell>
                          <Table.Cell style={{ ...cellStyle, textAlign: "right" }} onClick={selectUser}>
                            <Text ff="'JetBrains Mono', monospace" fz={13}>{u.totalAttempts}</Text>
                          </Table.Cell>
                          <Table.Cell style={{ ...cellStyle, textAlign: "right" }} onClick={selectUser}>
                            <Text
                              ff="'JetBrains Mono', monospace"
                              fz={13}
                              c={mcqAcc == null ? "#55556A" : mcqAcc >= 75 ? "#34D399" : mcqAcc >= 40 ? "#FBBF24" : "#F87171"}
                            >
                              {mcqAcc != null ? `${mcqAcc}%` : "—"}
                            </Text>
                          </Table.Cell>
                          <Table.Cell style={{ ...cellStyle, textAlign: "right" }} onClick={selectUser}>
                            <Text
                              ff="'JetBrains Mono', monospace"
                              fz={13}
                              c={writtenAvg == null ? "#55556A" : writtenAvg >= 75 ? "#34D399" : writtenAvg >= 40 ? "#FBBF24" : "#F87171"}
                            >
                              {writtenAvg != null ? `${writtenAvg}%` : "—"}
                            </Text>
                          </Table.Cell>
                          <Table.Cell style={{ ...cellStyle, textAlign: "right" }} onClick={selectUser}>
                            <Text ff="'JetBrains Mono', monospace" fz={12} c="#8B8B9E">
                              {formatTime(u.totalTimeMs)}
                            </Text>
                          </Table.Cell>
                          <Table.Cell style={{ ...cellStyle, textAlign: "right" }} onClick={selectUser}>
                            <Text ff="'JetBrains Mono', monospace" fz={12} c="#8B8B9E">{lastActive}</Text>
                          </Table.Cell>
                          <Table.Cell style={{ padding: "10px 12px", borderBottom: "1px solid #1A1A24" }}>
                            <div className="flex gap-1 flex-nowrap">
                              {canBanUnban(role) && (
                                <>
                                  {(u.accountStatus || "active") !== "banned" ? (
                                    <Button size="sm" className="rounded-md" onPress={() => handleBan(u.uid)} style={{backgroundColor: "#F8717122", color: "#F87171", border: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 10,}}>Ban</Button>
                                  ) : (
                                    <Button size="sm" className="rounded-md" onPress={() => handleUnban(u.uid)} style={{backgroundColor: "#34D39922", color: "#34D399", border: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 10,}}>Unban</Button>
                                  )}
                                  <Button size="sm" className="rounded-md" onPress={() => handleForceSignOut(u.uid)} style={{backgroundColor: "#FBBF2422", color: "#FBBF24", border: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 10,}}>Sign Out</Button>
                                </>
                              )}
                              {canEdit(role) && (
                                <Button size="sm" className="rounded-md" onPress={() => openEditFn(u)} style={{backgroundColor: "#7C6FFF22", color: "#7C6FFF", border: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 10,}}>Edit</Button>
                              )}
                              {canChangeRole(role) && (
                                <Button size="sm" className="rounded-md" onPress={() => openRoleChange(u)} style={{backgroundColor: "#FB923C22", color: "#FB923C", border: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 10,}}>Role</Button>
                              )}
                              {role === "viewer" && (
                                <Text fz={10} c="#55556A" ff="'JetBrains Mono', monospace">View only</Text>
                              )}
                            </div>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          )}
        </Paper>
      </Stack>

      {/* Edit Profile Modal */}
      <Modal.Backdrop
        variant="opaque"
        isKeyboardDismissDisabled={false}
        isOpen={editModalOpened}
        onOpenChange={setEditModalOpened}
      >
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-md" style={{ backgroundColor: "#12121A", border: "1px solid #252533" }}>
            <Modal.CloseTrigger />
            <Modal.Header style={{ borderBottom: "1px solid #252533" }}>
              <Modal.Heading style={{ color: "#F0EEE8", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace" }}>
                Edit User Profile
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Stack gap="md">
                <TextInput
                  label="First Name"
                  value={editForm.firstName}
                  onChange={(e) => setEditForm((f) => ({ ...f, firstName: e.target.value }))}
                  styles={{
                    label: { color: "#8B8B9E", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 4 },
                    input: { backgroundColor: "#1A1A24", border: "1px solid #252533", color: "#F0EEE8", fontFamily: "'JetBrains Mono', monospace" },
                  }}
                />
                <TextInput
                  label="Last Name"
                  value={editForm.lastName}
                  onChange={(e) => setEditForm((f) => ({ ...f, lastName: e.target.value }))}
                  styles={{
                    label: { color: "#8B8B9E", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 4 },
                    input: { backgroundColor: "#1A1A24", border: "1px solid #252533", color: "#F0EEE8", fontFamily: "'JetBrains Mono', monospace" },
                  }}
                />
                <TextInput
                  label="Username"
                  value={editForm.username}
                  onChange={(e) => setEditForm((f) => ({ ...f, username: e.target.value }))}
                  styles={{
                    label: { color: "#8B8B9E", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 4 },
                    input: { backgroundColor: "#1A1A24", border: "1px solid #252533", color: "#F0EEE8", fontFamily: "'JetBrains Mono', monospace" },
                  }}
                />
              </Stack>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" className="rounded-md border-[#252533] text-[#8B8B9E] bg-transparent" onPress={() => setEditModalOpened(false)} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>Cancel</Button>
              <Button className="rounded-md bg-[#7C6FFF] text-[#F0EEE8] border-none" onPress={handleEditSubmit} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>Save Changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>

      {/* Change Role Modal (origin only) */}
      <Modal.Backdrop
        variant="opaque"
        isKeyboardDismissDisabled={false}
        isOpen={roleModalOpened}
        onOpenChange={setRoleModalOpened}
      >
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-md" style={{ backgroundColor: "#12121A", border: "1px solid #252533" }}>
            <Modal.CloseTrigger />
            <Modal.Header style={{ borderBottom: "1px solid #252533" }}>
              <Modal.Heading style={{ color: "#F0EEE8", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>
                {`Change Role — ${roleTarget?.displayName || "User"}`}
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Stack gap="md">
                <Select
                  label="Select Role"
                  placeholder="Choose a role..."
                  data={ROLE_OPTIONS}
                  value={selectedRole}
                  onChange={setSelectedRole}
                  styles={{
                    label: { color: "#8B8B9E", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, marginBottom: 4 },
                    input: { backgroundColor: "#1A1A24", border: "1px solid #252533", color: "#F0EEE8", fontFamily: "'JetBrains Mono', monospace" },
                    dropdown: { backgroundColor: "#1A1A24", border: "1px solid #252533" },
                    option: { color: "#F0EEE8", fontFamily: "'JetBrains Mono', monospace", fontSize: 12 },
                  }}
                />
              </Stack>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" className="rounded-md border-[#252533] text-[#8B8B9E] bg-transparent" onPress={() => setRoleModalOpened(false)} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>Cancel</Button>
              <Button className="rounded-md border-none" onPress={handleRoleSubmit} isDisabled={!selectedRole}
                style={{
                  backgroundColor: selectedRole ? "#FB923C" : "#252533",
                  color: selectedRole ? "#F0EEE8" : "#55556A",
                  border: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                }}
              >
                Save Role
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </>
  );
}
