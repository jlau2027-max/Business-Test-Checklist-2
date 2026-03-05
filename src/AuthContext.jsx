import { createContext, useContext } from "react";
import { useUser, useClerk } from "@clerk/react";

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }) {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const { signOut } = useClerk();

  const user = isSignedIn && clerkUser ? {
    uid: clerkUser.id,
    email: clerkUser.primaryEmailAddress?.emailAddress || "",
    username: clerkUser.username || "",
    displayName: clerkUser.fullName || clerkUser.username || clerkUser.firstName || clerkUser.primaryEmailAddress?.emailAddress?.split("@")[0] || "Student",
  } : null;

  const ADMIN_ROLES = ["origin", "two", "admin", "viewer"];
  const role = (isSignedIn && clerkUser?.publicMetadata?.role) || null;
  const isAdmin = ADMIN_ROLES.includes(role);
  const loading = !isLoaded;
  const logOut = () => signOut();

  return (
    <AuthContext.Provider value={{ user, loading, logOut, isAdmin, role }}>
      {children}
    </AuthContext.Provider>
  );
}
