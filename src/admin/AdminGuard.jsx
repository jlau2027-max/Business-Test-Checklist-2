import { Button } from "@heroui/react";
import { useAuth } from "../AuthContext.jsx";

export default function AdminGuard({ children }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <div className="max-w-lg mx-auto py-[120px] px-4">
        <div className="bg-[var(--bg-card)] rounded-lg p-8 border border-[var(--border)] text-center">
          <div className="flex flex-col items-center gap-4">
            <span className="text-5xl">🔒</span>
            <span className="text-xl font-bold text-[var(--text-primary)]">Sign In Required</span>
            <span className="text-sm text-[var(--text-secondary)]">You need to sign in to access the admin panel.</span>
            <a href="/business/checklist" style={{ textDecoration: "none" }}>
              <Button className="rounded-full bg-[#7C6FFF] text-white border-none">Go Home</Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-lg mx-auto py-[120px] px-4">
        <div className="bg-[var(--bg-card)] rounded-lg p-8 border border-[var(--border)] text-center">
          <div className="flex flex-col items-center gap-4">
            <span className="text-5xl">🚫</span>
            <span className="text-xl font-bold text-[var(--text-primary)]">Access Denied</span>
            <span className="text-sm text-[var(--text-secondary)]">You don't have permission to access the admin panel.</span>
            <a href="/business/checklist" style={{ textDecoration: "none" }}>
              <Button className="rounded-full bg-[#7C6FFF] text-white border-none">Go Home</Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
