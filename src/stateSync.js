const WORKER_URL = "https://ib-grading-hollen.c9tggsfst9.workers.dev";

let currentUid = null;
let pendingWrites = {};
let debounceTimer = null;

const DEBOUNCE_MS = 2000;

async function getAuthHeaders() {
  const token = await window.Clerk?.session?.getToken();
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

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
  getAuthHeaders().then(headers => {
    fetch(`${WORKER_URL}/api/state/${uid}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    }).catch((err) => console.error("State sync write failed:", err));
  });
}

// Queue a cloud write (called from each page's saveLS function)
export function syncToCloud(key, value) {
  if (!currentUid || !isSyncableKey(key)) return;
  pendingWrites[key] = value;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(flush, DEBOUNCE_MS);
}

// Load cloud state → localStorage on login, upload local-only state
export async function initStateSync(uid) {
  currentUid = uid;

  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${WORKER_URL}/api/state/${uid}`, { headers });
    if (!res.ok) throw new Error(`State fetch failed: ${res.status}`);
    const cloudData = await res.json();

    // Cloud wins: overwrite localStorage with cloud values
    for (const [key, value] of Object.entries(cloudData)) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch {}
    }

    // Upload any local-only syncable keys to cloud (preserves pre-login work)
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
      await fetch(`${WORKER_URL}/api/state/${uid}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(toUpload),
      });
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
