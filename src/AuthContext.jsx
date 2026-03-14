import { createContext, useContext } from "react";
import { useUser, useClerk } from "@clerk/react";

const AuthContext = createContext(null);

const EDIT_ROLES = ['origin', 'two', 'admin'];
const DELETE_ROLES = ['origin', 'two', 'admin'];
const ADMIN_ROLES = ['origin', 'two', 'admin'];

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
