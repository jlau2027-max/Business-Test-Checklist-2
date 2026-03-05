import { createContext, useContext } from "react";
import { useUser, useClerk } from "@clerk/react";

const AuthContext = createContext({ user: null, loading: false, logOut: () => {} });

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  let user = null;
  let loading = false;
  let logOut = () => {};

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
    // Clerk not available — auth features gracefully disabled
  }

  return (
    <AuthContext.Provider value={{ user, loading, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}
