import { createContext, useContext } from "react";
import { useUser, useClerk } from "@clerk/react";

const AuthContext = createContext(null);

const EDIT_ROLES = ['origin', 'two', 'admin', 'editor'];
const DELETE_ROLES = ['origin', 'two', 'admin'];
const ADMIN_ROLES = ['origin', 'two', 'admin', 'editor', 'viewer'];

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }) {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const { signOut } = useClerk();
  // #region agent log
  try {
    fetch('http://127.0.0.1:7756/ingest/fda1bef3-c489-4aa0-8808-23f7b31bfe3e', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '19536b' }, body: JSON.stringify({ sessionId: '19536b', location: 'AuthContext.jsx:AuthProvider', message: 'Clerk auth state', data: { isLoaded, isSignedIn, hasUser: !!clerkUser }, hypothesisId: 'A', timestamp: Date.now() }) }).catch(() => {});
  } catch (_) {}
  // #endregion

  const user = isSignedIn && clerkUser ? {
    uid: clerkUser.id,
    email: clerkUser.primaryEmailAddress?.emailAddress || "",
    username: clerkUser.username || "",
    displayName: clerkUser.fullName || clerkUser.username || clerkUser.firstName || clerkUser.primaryEmailAddress?.emailAddress?.split("@")[0] || "Student",
  } : null;

  const role = (isSignedIn && clerkUser?.publicMetadata?.role) || null;

  const loading = !isLoaded;
  const logOut = () => signOut();

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      logOut,
      role,
      isAdmin: ADMIN_ROLES.includes(role),
      canEditContent: EDIT_ROLES.includes(role),
      canDeleteContent: DELETE_ROLES.includes(role),
    }}>
      {children}
    </AuthContext.Provider>
  );
}
