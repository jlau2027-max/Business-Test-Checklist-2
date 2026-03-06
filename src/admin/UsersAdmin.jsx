import { useState, useEffect } from "react";
import { Button, Table, Modal, TextField, Input, Label, Select, ListBox } from "@heroui/react";
import { useAuth } from "../AuthContext.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
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
    <div className="bg-[#12121A] rounded-lg p-6 border border-[#252533] flex-1 min-w-[160px]">
      <span className="text-[11px] text-[#55556A] tracking-wider block mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
        {label}
      </span>
      <span className="text-[28px] font-extrabold block" style={{ color, fontFamily: "'JetBrains Mono', monospace" }}>
        {value}
      </span>
      {sub && (
        <span className="text-xs text-[#8B8B9E] block mt-0.5">
          {sub}
        </span>
      )}
    </div>
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
    return <span className="block text-center text-[#55556A] py-8">Loading user data...</span>;
  }

  const overall = computeOverallStats(attempts);
  const categoryStats = computeCategoryStats(attempts);
  const wrongAnswers = getWrongAnswers(attempts);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" onPress={onBack} className="rounded-full border-[#252533] text-[#8B8B9E] bg-transparent min-w-[auto] h-8 px-3 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>← All Users</Button>
        <span className="text-lg font-bold text-[#F0EEE8]">{displayName}</span>
      </div>

      {attempts.length === 0 ? (
        <div className="bg-[#12121A] rounded-lg p-8 border border-[#252533] text-center">
          <span className="text-lg font-bold text-[#F0EEE8] block mb-1">No data yet</span>
          <span className="text-sm text-[#8B8B9E]">This user hasn't answered any questions.</span>
        </div>
      ) : (
        <>
          {/* Overview Cards */}
          <div className="flex flex-wrap gap-4 grow">
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
          </div>

          {/* Category Breakdown */}
          <div className="bg-[#12121A] rounded-lg p-6 border border-[#252533]">
            <span className="text-[11px] text-[#55556A] tracking-wider block mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
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
                          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
                          <span className="text-[13px] text-[#F0EEE8] font-semibold">{cat.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {cat.mcqAccuracy != null && (
                            <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: color + "22", color, fontFamily: "'JetBrains Mono', monospace" }}>
                              MCQ: {cat.mcqAccuracy}%
                            </span>
                          )}
                          {cat.writtenAvg != null && (
                            <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: color + "22", color, fontFamily: "'JetBrains Mono', monospace" }}>
                              Written: {cat.writtenAvg}%
                            </span>
                          )}
                          <span className="text-[11px] text-[#55556A]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
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
          </div>

          {/* Wrong Answers */}
          {wrongAnswers.length > 0 && (
            <div className="bg-[#12121A] rounded-lg p-6 border border-[#252533]">
              <span className="text-[11px] text-[#55556A] tracking-wider block mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                QUESTIONS TO REVIEW ({wrongAnswers.length})
              </span>
              <div className="flex flex-col gap-2">
                {wrongAnswers.slice(0, 20).map((a, i) => (
                  <div key={a.id || i} className="bg-[#1A1A24] rounded-2xl p-3 border border-[#252533]">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: a.isCorrect === false ? "#F8717122" : "#FBBF2422",
                          color: a.isCorrect === false ? "#F87171" : "#FBBF24",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {a.questionType === "mcq" ? "MCQ — Wrong" : `${a.score}/${a.maxMarks}`}
                      </span>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: (CAT_COLORS[a.category] || "#7C6FFF") + "22",
                          color: CAT_COLORS[a.category] || "#7C6FFF",
                          fontFamily: "'JetBrains Mono', monospace",
                        }}
                      >
                        {a.category}
                      </span>
                    </div>
                    <span className="text-[13px] text-[#B0ADA6] leading-relaxed">{a.questionId}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="bg-[#12121A] rounded-lg p-6 border border-[#252533]">
            <span className="text-[11px] text-[#55556A] tracking-wider block mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              RECENT ACTIVITY
            </span>
            <div className="flex flex-col gap-1">
              {attempts.slice(0, 20).map((a, i) => {
                const color = CAT_COLORS[a.category] || "#7C6FFF";
                const isGood = a.questionType === "mcq"
                  ? a.isCorrect
                  : a.score != null && a.maxMarks != null && a.score / a.maxMarks >= 0.5;

                return (
                  <div key={a.id || i} className="flex items-center gap-2 py-1" style={{ borderBottom: "1px solid #1A1A24" }}>
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: isGood ? "#34D399" : "#F87171" }}
                    />
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full shrink-0"
                      style={{ backgroundColor: color + "22", color, fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {a.questionType.toUpperCase()}
                    </span>
                    <span className="text-xs text-[#8B8B9E] flex-1 truncate">
                      {a.category} — {a.questionId}
                    </span>
                    <span className="text-[11px] text-[#55556A] shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {a.questionType === "mcq"
                        ? (a.isCorrect ? "Correct" : "Wrong")
                        : (a.score != null ? `${a.score}/${a.maxMarks}` : "—")}
                    </span>
                    {a.timeSpentMs > 0 && (
                      <span className="text-[10px] text-[#55556A] shrink-0" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {formatTime(a.timeSpentMs)}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
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
    return <span className="block text-center text-[#55556A] py-8">Loading user data...</span>;
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
      <div className="flex flex-col gap-8">
        {/* Aggregate Stats */}
        <div className="flex flex-wrap gap-4 grow">
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
        </div>

        {/* Users Table */}
        <div className="bg-[#12121A] rounded-lg p-6 border border-[#252533] overflow-auto">
          <span className="text-[11px] text-[#55556A] tracking-wider block mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            ALL USERS ({totalUsers})
          </span>
          {usersData.length === 0 ? (
            <span className="block text-center text-[#55556A] py-4">No users found.</span>
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
                            <span className="font-semibold text-[#F0EEE8] text-[13px]">{u.displayName || "Student"}</span>
                          </Table.Cell>
                          <Table.Cell style={cellStyle} onClick={selectUser}>
                            <span className="text-[#8B8B9E] text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{u.username || "---"}</span>
                          </Table.Cell>
                          <Table.Cell style={cellStyle} onClick={selectUser}>
                            <span className="text-[#8B8B9E] text-xs truncate">{u.email || "—"}</span>
                          </Table.Cell>
                          <Table.Cell style={cellStyle} onClick={selectUser}>
                            <span
                              className="text-xs px-1.5 py-0.5 rounded-full"
                              style={{
                                backgroundColor: statusColor + "22",
                                color: statusColor,
                                fontFamily: "'JetBrains Mono', monospace",
                              }}
                            >
                              {u.accountStatus || "active"}
                            </span>
                          </Table.Cell>
                          <Table.Cell style={{ ...cellStyle, textAlign: "right" }} onClick={selectUser}>
                            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{u.totalAttempts}</span>
                          </Table.Cell>
                          <Table.Cell style={{ ...cellStyle, textAlign: "right" }} onClick={selectUser}>
                            <span
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 13,
                                color: mcqAcc == null ? "#55556A" : mcqAcc >= 75 ? "#34D399" : mcqAcc >= 40 ? "#FBBF24" : "#F87171",
                              }}
                            >
                              {mcqAcc != null ? `${mcqAcc}%` : "—"}
                            </span>
                          </Table.Cell>
                          <Table.Cell style={{ ...cellStyle, textAlign: "right" }} onClick={selectUser}>
                            <span
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: 13,
                                color: writtenAvg == null ? "#55556A" : writtenAvg >= 75 ? "#34D399" : writtenAvg >= 40 ? "#FBBF24" : "#F87171",
                              }}
                            >
                              {writtenAvg != null ? `${writtenAvg}%` : "—"}
                            </span>
                          </Table.Cell>
                          <Table.Cell style={{ ...cellStyle, textAlign: "right" }} onClick={selectUser}>
                            <span className="text-[#8B8B9E] text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                              {formatTime(u.totalTimeMs)}
                            </span>
                          </Table.Cell>
                          <Table.Cell style={{ ...cellStyle, textAlign: "right" }} onClick={selectUser}>
                            <span className="text-[#8B8B9E] text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{lastActive}</span>
                          </Table.Cell>
                          <Table.Cell style={{ padding: "10px 12px", borderBottom: "1px solid #1A1A24" }}>
                            <div className="flex gap-1 flex-nowrap">
                              {canBanUnban(role) && (
                                <>
                                  {(u.accountStatus || "active") !== "banned" ? (
                                    <Button size="sm" className="rounded-full" onPress={() => handleBan(u.uid)} style={{backgroundColor: "#F8717122", color: "#F87171", border: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 10,}}>Ban</Button>
                                  ) : (
                                    <Button size="sm" className="rounded-full" onPress={() => handleUnban(u.uid)} style={{backgroundColor: "#34D39922", color: "#34D399", border: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 10,}}>Unban</Button>
                                  )}
                                  <Button size="sm" className="rounded-full" onPress={() => handleForceSignOut(u.uid)} style={{backgroundColor: "#FBBF2422", color: "#FBBF24", border: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 10,}}>Sign Out</Button>
                                </>
                              )}
                              {canEdit(role) && (
                                <Button size="sm" className="rounded-full" onPress={() => openEditFn(u)} style={{backgroundColor: "#7C6FFF22", color: "#7C6FFF", border: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 10,}}>Edit</Button>
                              )}
                              {canChangeRole(role) && (
                                <Button size="sm" className="rounded-full" onPress={() => openRoleChange(u)} style={{backgroundColor: "#FB923C22", color: "#FB923C", border: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: 10,}}>Role</Button>
                              )}
                              {role === "viewer" && (
                                <span className="text-[10px] text-[#55556A]" style={{ fontFamily: "'JetBrains Mono', monospace" }}>View only</span>
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
        </div>
      </div>

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
              <div className="flex flex-col gap-4">
                <TextField className="w-full" name="firstName" onChange={(val) => setEditForm((f) => ({ ...f, firstName: val }))}>
                  <Label className="text-[#8B8B9E] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>First Name</Label>
                  <Input value={editForm.firstName} className="bg-[#1A1A24] border border-[#252533] text-[#F0EEE8] rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }} />
                </TextField>
                <TextField className="w-full" name="lastName" onChange={(val) => setEditForm((f) => ({ ...f, lastName: val }))}>
                  <Label className="text-[#8B8B9E] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Last Name</Label>
                  <Input value={editForm.lastName} className="bg-[#1A1A24] border border-[#252533] text-[#F0EEE8] rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }} />
                </TextField>
                <TextField className="w-full" name="username" onChange={(val) => setEditForm((f) => ({ ...f, username: val }))}>
                  <Label className="text-[#8B8B9E] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Username</Label>
                  <Input value={editForm.username} className="bg-[#1A1A24] border border-[#252533] text-[#F0EEE8] rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }} />
                </TextField>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" className="rounded-full border-[#252533] text-[#8B8B9E] bg-transparent" onPress={() => setEditModalOpened(false)} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>Cancel</Button>
              <Button className="rounded-full bg-[#7C6FFF] text-[#F0EEE8] border-none" onPress={handleEditSubmit} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>Save Changes</Button>
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
              <Select
                className="w-full"
                placeholder="Choose a role..."
                value={selectedRole}
                onChange={(val) => setSelectedRole(val)}
              >
                <Label className="text-[#8B8B9E] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Select Role</Label>
                <Select.Trigger className="bg-[#1A1A24] border border-[#252533] text-[#F0EEE8] rounded-full" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-[#1A1A24] border border-[#252533]">
                  <ListBox>
                    {ROLE_OPTIONS.map((opt) => (
                      <ListBox.Item key={opt.value} id={opt.value} textValue={opt.label} className="text-[#F0EEE8] text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        {opt.label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" className="rounded-full border-[#252533] text-[#8B8B9E] bg-transparent" onPress={() => setRoleModalOpened(false)} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>Cancel</Button>
              <Button className="rounded-full border-none" onPress={handleRoleSubmit} isDisabled={!selectedRole}
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
