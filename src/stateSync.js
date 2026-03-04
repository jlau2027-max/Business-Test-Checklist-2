import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase.js";

let currentUid = null;
let pendingWrites = {};
let debounceTimer = null;

const DEBOUNCE_MS = 2000;

function isSyncableKey(key) {
  return (
    key.startsWith("written_") ||
    key.startsWith("spec_") ||
    key.startsWith("hist_") ||
    key.startsWith("p3_") ||
    key.startsWith("checklist_") ||
    key === "revision_tab" ||
    key === "fc_cat" ||
    key === "hist_paper_tab"
  );
}

function flush() {
  if (!currentUid || Object.keys(pendingWrites).length === 0) return;
  const uid = currentUid;
  const data = { ...pendingWrites };
  pendingWrites = {};
  const stateRef = doc(db, "users", uid, "state", "app");
  setDoc(stateRef, data, { merge: true }).catch((err) =>
    console.error("State sync write failed:", err)
  );
}

// Queue a Firestore write (called from each page's saveLS function)
export function syncToCloud(key, value) {
  if (!currentUid || !isSyncableKey(key)) return;
  pendingWrites[key] = value;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(flush, DEBOUNCE_MS);
}

// Load Firestore state → localStorage on login, upload local-only state
export async function initStateSync(uid) {
  currentUid = uid;
  const stateRef = doc(db, "users", uid, "state", "app");

  try {
    const snap = await getDoc(stateRef);
    const cloudData = snap.exists() ? snap.data() : {};

    // Cloud wins: overwrite localStorage with Firestore values
    for (const [key, value] of Object.entries(cloudData)) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {}
    }

    // Upload any local-only syncable keys to Firestore (preserves pre-login work)
    const toUpload = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key || !isSyncableKey(key)) continue;
      if (!(key in cloudData)) {
        try {
          toUpload[key] = JSON.parse(localStorage.getItem(key));
        } catch {}
      }
    }

    if (Object.keys(toUpload).length > 0) {
      await setDoc(stateRef, toUpload, { merge: true });
    }
  } catch (err) {
    console.error("State sync init failed:", err);
  }
}

// Flush pending writes on logout
export function stopStateSync() {
  flush();
  currentUid = null;
}

// Best-effort flush on page unload
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", flush);
}
