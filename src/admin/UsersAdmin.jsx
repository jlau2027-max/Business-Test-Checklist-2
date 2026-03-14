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
  "Costs & Revenue": "var(--cat-costs)",
  "Cash Flow": "var(--cat-cashflow)",
  "Final Accounts": "var(--cat-accounts)",
  "Ratio Analysis": "var(--cat-ratios)",
  "Ratio Analysis (HL)": "var(--cat-ratios)",
  "Investment Appraisal": "var(--cat-investment)",
  "Budgets & Variance": "var(--cat-budgets)",
  "Breakeven": "var(--cat-breakeven)",
  "BMT Tools": "var(--cat-bmt)",
  "Sources of Finance": "var(--accent-tertiary)",
  "Specimen Exam": "var(--cat-breakeven)",
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

function StatCard({ label, value, sub, color = "var(--accent)" }) {
  return (
    <div className="bg-[var(--bg-card)] rounded-lg p-6 border border-[var(--border)] flex-1 min-w-[160px]">
      <span className="text-[11px] text-[var(--text-muted)] tracking-wider block mb-1" style={{ fontFamily: "'JSans', sans-serif" }}>
        {label}
      </span>
      <span className="text-[28px] font-extrabold block" style={{ color, fontFamily: "'JSans', sans-serif" }}>
        {value}
      </span>
      {sub && (
        <span className="text-xs text-[var(--text-secondary)] block mt-0.5">
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
    return <span className="block text-center text-[var(--text-muted)] py-8">Loading user data...</span>;
  }

  const overall = computeOverallStats(attempts);
  const categoryStats = computeCategoryStats(attempts);
  const wrongAnswers = getWrongAnswers(attempts);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" onPress={onBack} className="rounded-full border-[var(--border)] text-[var(--text-secondary)] bg-transparent min-w-[auto] h-8 px-3 text-xs" style={{ fontFamily: "'JSans', sans-serif" }}>← All Users</Button>
        <span className="text-lg font-bold text-[var(--text-primary)]">{displayName}</span>
      </div>

      {attempts.length === 0 ? (
        <div className="bg-[var(--bg-card)] rounded-lg p-8 border border-[var(--border)] text-center">
          <span className="text-lg font-bold text-[var(--text-primary)] block mb-1">No data yet</span>
          <span className="text-sm text-[var(--text-secondary)]">This user hasn't answered any questions.</span>
        </div>
      ) : (
        <>
          {/* Overview Cards */}
          <div className="flex flex-wrap gap-4 grow">
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
              color={overall.mcqAccuracy >= 75 ? "var(--color-success)" : overall.mcqAccuracy >= 40 ? "var(--color-warning)" : "var(--color-danger)"}
            />
            <StatCard
              label="WRITTEN AVG"
              value={overall.writtenAvg != null ? `${overall.writtenAvg}%` : "—"}
              sub={overall.totalAttempts - overall.mcqTotal > 0 ? `${overall.totalAttempts - overall.mcqTotal} answers` : "No written yet"}
              color={overall.writtenAvg >= 75 ? "var(--color-success)" : overall.writtenAvg >= 40 ? "var(--color-warning)" : "var(--color-danger)"}
            />
            <StatCard
              label="TOTAL TIME"
              value={formatTime(overall.totalTimeMs)}
              sub="across all questions"
              color="var(--accent)"
            />
          </div>

          {/* Category Breakdown */}
          <div className="bg-[var(--bg-card)] rounded-lg p-6 border border-[var(--border)]">
            <span className="text-[11px] text-[var(--text-muted)] tracking-wider block mb-4" style={{ fontFamily: "'JSans', sans-serif" }}>
              PERFORMANCE BY TOPIC
            </span>
            <div className="flex flex-col gap-4">
              {categoryStats
                .sort((a, b) => b.totalAttempts - a.totalAttempts)
                .map((cat) => {
                  const color = CAT_COLORS[cat.category] || "var(--accent)";
                  const pct = cat.mcqAccuracy ?? cat.writtenAvg ?? 0;
                  return (
                    <div key={cat.category}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
                          <span className="text-[13px] text-[var(--text-primary)] font-semibold">{cat.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {cat.mcqAccuracy != null && (
                            <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: color + "22", color, fontFamily: "'JSans', sans-serif" }}>
                              MCQ: {cat.mcqAccuracy}%
                            </span>
                          )}
                          {cat.writtenAvg != null && (
                            <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: color + "22", color, fontFamily: "'JSans', sans-serif" }}>
                              Written: {cat.writtenAvg}%
                            </span>
                          )}
                          <span className="text-[11px] text-[var(--text-muted)]" style={{ fontFamily: "'JSans', sans-serif" }}>
                            {cat.totalAttempts} attempt{cat.totalAttempts !== 1 ? "s" : ""} · avg {formatTime(cat.avgTimeMs)}
                          </span>
                        </div>
                      </div>
                      <ProgressBar
                        value={pct}
                        color={pct >= 75 ? "var(--color-success)" : pct >= 40 ? "var(--color-warning)" : "var(--color-danger)"}
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Wrong Answers */}
          {wrongAnswers.length > 0 && (
            <div className="bg-[var(--bg-card)] rounded-lg p-6 border border-[var(--border)]">
              <span className="text-[11px] text-[var(--text-muted)] tracking-wider block mb-4" style={{ fontFamily: "'JSans', sans-serif" }}>
                QUESTIONS TO REVIEW ({wrongAnswers.length})
              </span>
              <div className="flex flex-col gap-2">
                {wrongAnswers.slice(0, 20).map((a, i) => (
                  <div key={a.id || i} className="bg-[var(--bg-input)] rounded-2xl p-3 border border-[var(--border)]">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: a.isCorrect === false ? "var(--color-danger-soft)" : "var(--color-warning-soft)",
                          color: a.isCorrect === false ? "var(--color-danger)" : "var(--color-warning)",
                          fontFamily: "'JSans', sans-serif",
                        }}
                      >
                        {a.questionType === "mcq" ? "MCQ — Wrong" : `${a.score}/${a.maxMarks}`}
                      </span>
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: (CAT_COLORS[a.category] || "var(--accent)") + "22",
                          color: CAT_COLORS[a.category] || "var(--accent)",
                          fontFamily: "'JSans', sans-serif",
                        }}
                      >
                        {a.category}
                      </span>
                    </div>
                    <span className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{a.questionId}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="bg-[var(--bg-card)] rounded-lg p-6 border border-[var(--border)]">
            <span className="text-[11px] text-[var(--text-muted)] tracking-wider block mb-4" style={{ fontFamily: "'JSans', sans-serif" }}>
              RECENT ACTIVITY
            </span>
            <div className="flex flex-col gap-1">
              {attempts.slice(0, 20).map((a, i) => {
                const color = CAT_COLORS[a.category] || "var(--accent)";
                const isGood = a.questionType === "mcq"
                  ? a.isCorrect
                  : a.score != null && a.maxMarks != null && a.score / a.maxMarks >= 0.5;

                return (
                  <div key={a.id || i} className="flex items-center gap-2 py-1" style={{ borderBottom: "1px solid var(--bg-input)" }}>
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: isGood ? "var(--color-success)" : "var(--color-danger)" }}
                    />
                    <span
                      className="text-xs px-1.5 py-0.5 rounded-full shrink-0"
                      style={{ backgroundColor: color + "22", color, fontFamily: "'JSans', sans-serif" }}
                    >
                      {a.questionType.toUpperCase()}
                    </span>
                    <span className="text-xs text-[var(--text-secondary)] flex-1 truncate">
                      {a.category} — {a.questionId}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)] shrink-0" style={{ fontFamily: "'JSans', sans-serif" }}>
                      {a.questionType === "mcq"
                        ? (a.isCorrect ? "Correct" : "Wrong")
                        : (a.score != null ? `${a.score}/${a.maxMarks}` : "—")}
                    </span>
                    {a.timeSpentMs > 0 && (
                      <span className="text-[10px] text-[var(--text-muted)] shrink-0" style={{ fontFamily: "'JSans', sans-serif" }}>
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
  origin: "var(--color-danger)",
  two: "var(--accent-tertiary)",
  admin: "var(--accent)",
  viewer: "var(--cat-cashflow)",
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
    return <span className="block text-center text-[var(--text-muted)] py-8">Loading user data...</span>;
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
          <StatCard label="TOTAL USERS" value={totalUsers} color="var(--text-primary)" />
          <StatCard label="TOTAL ATTEMPTS" value={totalAttempts} color="var(--accent)" />
          <StatCard
            label="OVERALL MCQ"
            value={overallMcqAcc != null ? `${overallMcqAcc}%` : "—"}
            sub={totalMcqTotal > 0 ? `${totalMcqTotal} questions` : ""}
            color={overallMcqAcc >= 75 ? "var(--color-success)" : overallMcqAcc >= 40 ? "var(--color-warning)" : "var(--color-danger)"}
          />
          <StatCard
            label="OVERALL WRITTEN"
            value={overallWrittenAvg != null ? `${overallWrittenAvg}%` : "—"}
            sub={totalWrittenMax > 0 ? `${totalAttempts - totalMcqTotal} answers` : ""}
            color={overallWrittenAvg >= 75 ? "var(--color-success)" : overallWrittenAvg >= 40 ? "var(--color-warning)" : "var(--color-danger)"}
          />
        </div>

        {/* Users Table */}
        <div className="bg-[var(--bg-card)] rounded-lg p-6 border border-[var(--border)] overflow-auto">
          <span className="text-[11px] text-[var(--text-muted)] tracking-wider block mb-4" style={{ fontFamily: "'JSans', sans-serif" }}>
            ALL USERS ({totalUsers})
          </span>
          {usersData.length === 0 ? (
            <span className="block text-center text-[var(--text-muted)] py-4">No users found.</span>
          ) : (
            <Table>
              <Table.ScrollContainer>
                <Table.Content aria-label="All users" className="min-w-[1100px]" style={{ borderCollapse: "collapse" }}>
                  <Table.Header>
                    <Table.Column isRowHeader className="text-[var(--text-muted)] text-[11px] tracking-wider" style={{ fontFamily: "'JSans', sans-serif", padding: "8px 12px", borderBottom: "1px solid var(--border)", background: "transparent" }}>NAME</Table.Column>
                    <Table.Column className="text-[var(--text-muted)] text-[11px] tracking-wider" style={{ fontFamily: "'JSans', sans-serif", padding: "8px 12px", borderBottom: "1px solid var(--border)", background: "transparent" }}>USERNAME</Table.Column>
                    <Table.Column className="text-[var(--text-muted)] text-[11px] tracking-wider" style={{ fontFamily: "'JSans', sans-serif", padding: "8px 12px", borderBottom: "1px solid var(--border)", background: "transparent" }}>EMAIL</Table.Column>
                    <Table.Column className="text-[var(--text-muted)] text-[11px] tracking-wider" style={{ fontFamily: "'JSans', sans-serif", padding: "8px 12px", borderBottom: "1px solid var(--border)", background: "transparent" }}>STATUS</Table.Column>
                    <Table.Column className="text-[var(--text-muted)] text-[11px] tracking-wider text-right" style={{ fontFamily: "'JSans', sans-serif", padding: "8px 12px", borderBottom: "1px solid var(--border)", background: "transparent" }}>ATTEMPTS</Table.Column>
                    <Table.Column className="text-[var(--text-muted)] text-[11px] tracking-wider text-right" style={{ fontFamily: "'JSans', sans-serif", padding: "8px 12px", borderBottom: "1px solid var(--border)", background: "transparent" }}>MCQ %</Table.Column>
                    <Table.Column className="text-[var(--text-muted)] text-[11px] tracking-wider text-right" style={{ fontFamily: "'JSans', sans-serif", padding: "8px 12px", borderBottom: "1px solid var(--border)", background: "transparent" }}>WRITTEN %</Table.Column>
                    <Table.Column className="text-[var(--text-muted)] text-[11px] tracking-wider text-right" style={{ fontFamily: "'JSans', sans-serif", padding: "8px 12px", borderBottom: "1px solid var(--border)", background: "transparent" }}>TIME</Table.Column>
                    <Table.Column className="text-[var(--text-muted)] text-[11px] tracking-wider text-right" style={{ fontFamily: "'JSans', sans-serif", padding: "8px 12px", borderBottom: "1px solid var(--border)", background: "transparent" }}>LAST ACTIVE</Table.Column>
                    <Table.Column className="text-[var(--text-muted)] text-[11px] tracking-wider" style={{ fontFamily: "'JSans', sans-serif", padding: "8px 12px", borderBottom: "1px solid var(--border)", background: "transparent" }}>ACTIONS</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {usersData.map((u) => {
                      const mcqAcc = u.mcqTotal > 0 ? Math.round((u.mcqCorrect / u.mcqTotal) * 100) : null;
                      const writtenAvg = u.writtenMax > 0 ? Math.round((u.writtenScore / u.writtenMax) * 100) : null;
                      const lastActive = u.lastActive ? new Date(u.lastActive).toLocaleDateString() : "—";

                      const statusColor =
                        (u.accountStatus || "active") === "active" ? "var(--color-success)" :
                        u.accountStatus === "banned" ? "var(--color-danger)" :
                        u.accountStatus === "admin_deleted" ? "var(--color-danger)" : "var(--color-warning)";

                      const cellStyle = { padding: "10px 12px", borderBottom: "1px solid var(--bg-input)", cursor: "pointer" };
                      const selectUser = () => setSelectedUser(u);
                      return (
                        <Table.Row key={u.uid} className="hover:bg-[var(--bg-input)] transition-colors">
                          <Table.Cell style={cellStyle} onClick={selectUser}>
                            <span className="font-semibold text-[var(--text-primary)] text-[13px]">{u.displayName || "Student"}</span>
                          </Table.Cell>
                          <Table.Cell style={cellStyle} onClick={selectUser}>
                            <span className="text-[var(--text-secondary)] text-xs" style={{ fontFamily: "'JSans', sans-serif" }}>{u.username || "---"}</span>
                          </Table.Cell>
                          <Table.Cell style={cellStyle} onClick={selectUser}>
                            <span className="text-[var(--text-secondary)] text-xs truncate">{u.email || "—"}</span>
                          </Table.Cell>
                          <Table.Cell style={cellStyle} onClick={selectUser}>
                            <span
                              className="text-xs px-1.5 py-0.5 rounded-full"
                              style={{
                                backgroundColor: statusColor + "22",
                                color: statusColor,
                                fontFamily: "'JSans', sans-serif",
                              }}
                            >
                              {u.accountStatus || "active"}
                            </span>
                          </Table.Cell>
                          <Table.Cell style={{ ...cellStyle, textAlign: "right" }} onClick={selectUser}>
                            <span style={{ fontFamily: "'JSans', sans-serif", fontSize: 13 }}>{u.totalAttempts}</span>
                          </Table.Cell>
                          <Table.Cell style={{ ...cellStyle, textAlign: "right" }} onClick={selectUser}>
                            <span
                              style={{
                                fontFamily: "'JSans', sans-serif",
                                fontSize: 13,
                                color: mcqAcc == null ? "var(--text-muted)" : mcqAcc >= 75 ? "var(--color-success)" : mcqAcc >= 40 ? "var(--color-warning)" : "var(--color-danger)",
                              }}
                            >
                              {mcqAcc != null ? `${mcqAcc}%` : "—"}
                            </span>
                          </Table.Cell>
                          <Table.Cell style={{ ...cellStyle, textAlign: "right" }} onClick={selectUser}>
                            <span
                              style={{
                                fontFamily: "'JSans', sans-serif",
                                fontSize: 13,
                                color: writtenAvg == null ? "var(--text-muted)" : writtenAvg >= 75 ? "var(--color-success)" : writtenAvg >= 40 ? "var(--color-warning)" : "var(--color-danger)",
                              }}
                            >
                              {writtenAvg != null ? `${writtenAvg}%` : "—"}
                            </span>
                          </Table.Cell>
                          <Table.Cell style={{ ...cellStyle, textAlign: "right" }} onClick={selectUser}>
                            <span className="text-[var(--text-secondary)] text-xs" style={{ fontFamily: "'JSans', sans-serif" }}>
                              {formatTime(u.totalTimeMs)}
                            </span>
                          </Table.Cell>
                          <Table.Cell style={{ ...cellStyle, textAlign: "right" }} onClick={selectUser}>
                            <span className="text-[var(--text-secondary)] text-xs" style={{ fontFamily: "'JSans', sans-serif" }}>{lastActive}</span>
                          </Table.Cell>
                          <Table.Cell style={{ padding: "10px 12px", borderBottom: "1px solid var(--bg-input)" }}>
                            <div className="flex gap-1 flex-nowrap">
                              {canBanUnban(role) && (
                                <>
                                  {(u.accountStatus || "active") !== "banned" ? (
                                    <Button size="sm" className="rounded-full" onPress={() => handleBan(u.uid)} style={{backgroundColor: "var(--color-danger)", color: "#fff", border: "none", fontFamily: "'JSans', sans-serif", fontSize: 10,}}>Ban</Button>
                                  ) : (
                                    <Button size="sm" className="rounded-full" onPress={() => handleUnban(u.uid)} style={{backgroundColor: "var(--color-success)", color: "#fff", border: "none", fontFamily: "'JSans', sans-serif", fontSize: 10,}}>Unban</Button>
                                  )}
                                  <Button size="sm" className="rounded-full" onPress={() => handleForceSignOut(u.uid)} style={{backgroundColor: "var(--color-warning)", color: "#000", border: "none", fontFamily: "'JSans', sans-serif", fontSize: 10,}}>Sign Out</Button>
                                </>
                              )}
                              {canEdit(role) && (
                                <Button size="sm" className="rounded-full" onPress={() => openEditFn(u)} style={{backgroundColor: "var(--accent)", color: "#fff", border: "none", fontFamily: "'JSans', sans-serif", fontSize: 10,}}>Edit</Button>
                              )}
                              {canChangeRole(role) && (
                                <Button size="sm" className="rounded-full" onPress={() => openRoleChange(u)} style={{backgroundColor: "var(--accent-tertiary)", color: "#fff", border: "none", fontFamily: "'JSans', sans-serif", fontSize: 10,}}>Role</Button>
                              )}
                              {role === "viewer" && (
                                <span className="text-[10px] text-[var(--text-muted)]" style={{ fontFamily: "'JSans', sans-serif" }}>View only</span>
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
          <Modal.Dialog className="sm:max-w-md" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <Modal.CloseTrigger />
            <Modal.Header style={{ borderBottom: "1px solid var(--border)" }}>
              <Modal.Heading style={{ color: "var(--text-primary)", fontWeight: 700, fontFamily: "'JSans', sans-serif" }}>
                Edit User Profile
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="flex flex-col gap-4">
                <TextField className="w-full" name="firstName" onChange={(val) => setEditForm((f) => ({ ...f, firstName: val }))}>
                  <Label className="text-[var(--text-secondary)] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JSans', sans-serif" }}>First Name</Label>
                  <Input value={editForm.firstName} className="bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] rounded-full" style={{ fontFamily: "'JSans', sans-serif" }} />
                </TextField>
                <TextField className="w-full" name="lastName" onChange={(val) => setEditForm((f) => ({ ...f, lastName: val }))}>
                  <Label className="text-[var(--text-secondary)] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JSans', sans-serif" }}>Last Name</Label>
                  <Input value={editForm.lastName} className="bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] rounded-full" style={{ fontFamily: "'JSans', sans-serif" }} />
                </TextField>
                <TextField className="w-full" name="username" onChange={(val) => setEditForm((f) => ({ ...f, username: val }))}>
                  <Label className="text-[var(--text-secondary)] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JSans', sans-serif" }}>Username</Label>
                  <Input value={editForm.username} className="bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] rounded-full" style={{ fontFamily: "'JSans', sans-serif" }} />
                </TextField>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" className="rounded-full border-[var(--border)] text-[var(--text-secondary)] bg-transparent" onPress={() => setEditModalOpened(false)} style={{ fontFamily: "'JSans', sans-serif", fontSize: 12 }}>Cancel</Button>
              <button type="button" onClick={handleEditSubmit} className="rounded-full px-4 py-2 text-xs font-semibold" style={{ fontFamily: "'JSans', sans-serif", backgroundColor: "var(--accent)", color: "var(--text-primary)", border: "none", cursor: "pointer" }}>Save Changes</button>
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
          <Modal.Dialog className="sm:max-w-md" style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}>
            <Modal.CloseTrigger />
            <Modal.Header style={{ borderBottom: "1px solid var(--border)" }}>
              <Modal.Heading style={{ color: "var(--text-primary)", fontWeight: 700, fontFamily: "'JSans', sans-serif", fontSize: 14 }}>
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
                <Label className="text-[var(--text-secondary)] text-[11px] tracking-wider mb-1" style={{ fontFamily: "'JSans', sans-serif" }}>Select Role</Label>
                <Select.Trigger className="bg-[var(--bg-input)] border border-[var(--border)] text-[var(--text-primary)] rounded-full" style={{ fontFamily: "'JSans', sans-serif" }}>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-[var(--bg-input)] border border-[var(--border)]">
                  <ListBox>
                    {ROLE_OPTIONS.map((opt) => (
                      <ListBox.Item key={opt.value} id={opt.value} textValue={opt.label} className="text-[var(--text-primary)] text-xs" style={{ fontFamily: "'JSans', sans-serif" }}>
                        {opt.label}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" className="rounded-full border-[var(--border)] text-[var(--text-secondary)] bg-transparent" onPress={() => setRoleModalOpened(false)} style={{ fontFamily: "'JSans', sans-serif", fontSize: 12 }}>Cancel</Button>
              <button type="button" onClick={handleRoleSubmit} disabled={!selectedRole} className="rounded-full px-4 py-2 text-xs font-semibold" style={{ fontFamily: "'JSans', sans-serif", backgroundColor: selectedRole ? "var(--accent-tertiary)" : "var(--border)", color: selectedRole ? "var(--text-primary)" : "var(--text-muted)", border: "none", cursor: selectedRole ? "pointer" : "not-allowed" }}>Save Role</button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </>
  );
}
