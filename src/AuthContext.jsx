import { createContext, useContext } from "react";

let useUser, useClerk;
try {
  const clerk = await import("@clerk/react");
  useUser = clerk.useUser;
  useClerk = clerk.useClerk;
} catch {}

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }) {
  let user = null;
  let loading = false;
  let logOut = () => {};

  if (useUser && useClerk) {
    try {
      const { isLoaded, isSignedIn, user: clerkUser } = useUser();
      const { signOut } = useClerk();

      user = isSignedIn && clerkUser ? {
        uid: clerkUser.id,
        email: clerkUser.primaryEmailAddress?.emailAddress || "",
        displayName: clerkUser.fullName || clerkUser.firstName || clerkUser.primaryEmailAddress?.emailAddress?.split("@")[0] || "Student",
      } : null;

      loading = !isLoaded;
      logOut = () => signOut();
    } catch {
      // Clerk not initialized (no key), app runs without auth
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
