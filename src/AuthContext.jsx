import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "./firebase.js";
import { migrateLocalStorageToFirestore } from "./firestoreService.js";
import { initStateSync, stopStateSync } from "./stateSync.js";

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        // Sync state from Firestore → localStorage before rendering
        await initStateSync(fbUser.uid);
        setUser(fbUser);
        setLoading(false);
        // Create/update user doc and migrate (background, non-blocking)
        const userRef = doc(db, "users", fbUser.uid);
        setDoc(
          userRef,
          {
            displayName: fbUser.displayName || fbUser.email?.split("@")[0] || "Student",
            email: fbUser.email || "",
            lastLogin: serverTimestamp(),
          },
          { merge: true }
        ).catch(() => {});
        migrateLocalStorageToFirestore(fbUser.uid).catch(() => {});
      } else {
        stopStateSync();
        setUser(null);
        setLoading(false);
      }
    });
    return unsub;
  }, []);

  const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

  const signInWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signUpWithEmail = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const logOut = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{ user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
