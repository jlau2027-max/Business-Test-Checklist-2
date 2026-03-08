const WORKER_URL = "https://ib-grading-hollen.c9tggsfst9.workers.dev";

// ---------------------------------------------------------------------------
// Helper: authenticated fetch for admin endpoints
// ---------------------------------------------------------------------------
async function adminFetch(path, method = "GET", body = undefined) {
  const token = await window.Clerk?.session?.getToken();
  if (!token) {
    throw new Error("Not authenticated - no Clerk session token available");
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const res = await fetch(`${WORKER_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`Admin API error ${res.status}: ${text}`);
  }

  return res.json();
}

// ---------------------------------------------------------------------------
// Public endpoints (no auth required)
// ---------------------------------------------------------------------------

export async function fetchFlashcardTopics() {
  const res = await fetch(`${WORKER_URL}/api/content/flashcard-topics`);
  if (!res.ok) throw new Error(`Failed to fetch flashcard topics: ${res.status}`);
  return res.json();
}

export async function fetchFlashcards(topicId) {
  const res = await fetch(`${WORKER_URL}/api/content/flashcards/${topicId}`);
  if (!res.ok) throw new Error(`Failed to fetch flashcards: ${res.status}`);
  return res.json();
}

export async function fetchMcqQuestions(filters = {}) {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.difficulty) params.set("difficulty", filters.difficulty);
  const qs = params.toString();
  const res = await fetch(`${WORKER_URL}/api/content/mcq${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch MCQ questions: ${res.status}`);
  return res.json();
}

export async function fetchWrittenQuestions(filters = {}) {
  const params = new URLSearchParams();
  if (filters.type) params.set("type", filters.type);
  if (filters.category) params.set("category", filters.category);
  if (filters.difficulty) params.set("difficulty", filters.difficulty);
  const qs = params.toString();
  const res = await fetch(`${WORKER_URL}/api/content/written${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch written questions: ${res.status}`);
  return res.json();
}

export async function fetchHistoryQuestions(paper) {
  const params = new URLSearchParams();
  if (paper) params.set("paper", paper);
  const qs = params.toString();
  const res = await fetch(`${WORKER_URL}/api/content/history${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch history questions: ${res.status}`);
  return res.json();
}

export async function fetchChecklist() {
  const res = await fetch(`${WORKER_URL}/api/content/checklist`);
  if (!res.ok) throw new Error(`Failed to fetch checklist: ${res.status}`);
  return res.json();
}

export async function fetchCategoryColors() {
  const res = await fetch(`${WORKER_URL}/api/content/colors`);
  if (!res.ok) throw new Error(`Failed to fetch category colors: ${res.status}`);
  return res.json();
}

// ---------------------------------------------------------------------------
// Admin endpoints - Flashcard Topics
// ---------------------------------------------------------------------------

export async function createFlashcardTopic(data) {
  return adminFetch("/api/admin/flashcard-topics", "POST", data);
}

export async function updateFlashcardTopic(id, data) {
  return adminFetch(`/api/admin/flashcard-topics/${id}`, "PUT", data);
}

export async function deleteFlashcardTopic(id) {
  return adminFetch(`/api/admin/flashcard-topics/${id}`, "DELETE");
}

// ---------------------------------------------------------------------------
// Admin endpoints - Flashcards
// ---------------------------------------------------------------------------

export async function createFlashcard(data) {
  return adminFetch("/api/admin/flashcards", "POST", data);
}

export async function updateFlashcard(id, data) {
  return adminFetch(`/api/admin/flashcards/${id}`, "PUT", data);
}

export async function deleteFlashcard(id) {
  return adminFetch(`/api/admin/flashcards/${id}`, "DELETE");
}

// ---------------------------------------------------------------------------
// Admin endpoints - MCQ
// ---------------------------------------------------------------------------

export async function createMcqQuestion(data) {
  return adminFetch("/api/admin/mcq", "POST", data);
}

export async function updateMcqQuestion(id, data) {
  return adminFetch(`/api/admin/mcq/${id}`, "PUT", data);
}

export async function deleteMcqQuestion(id) {
  return adminFetch(`/api/admin/mcq/${id}`, "DELETE");
}

// ---------------------------------------------------------------------------
// Admin endpoints - Written
// ---------------------------------------------------------------------------

export async function createWrittenQuestion(data) {
  return adminFetch("/api/admin/written", "POST", data);
}

export async function updateWrittenQuestion(id, data) {
  return adminFetch(`/api/admin/written/${id}`, "PUT", data);
}

export async function deleteWrittenQuestion(id) {
  return adminFetch(`/api/admin/written/${id}`, "DELETE");
}

// ---------------------------------------------------------------------------
// Admin endpoints - History
// ---------------------------------------------------------------------------

export async function createHistoryQuestion(data) {
  return adminFetch("/api/admin/history", "POST", data);
}

export async function updateHistoryQuestion(id, data) {
  return adminFetch(`/api/admin/history/${id}`, "PUT", data);
}

export async function deleteHistoryQuestion(id) {
  return adminFetch(`/api/admin/history/${id}`, "DELETE");
}

// ---------------------------------------------------------------------------
// Public endpoints - Biology
// ---------------------------------------------------------------------------

export async function fetchBiologyQuestions(paper) {
  const params = new URLSearchParams();
  if (paper) params.set("paper", paper);
  const qs = params.toString();
  const res = await fetch(`${WORKER_URL}/api/content/biology${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch biology questions: ${res.status}`);
  return res.json();
}

// ---------------------------------------------------------------------------
// Admin endpoints - Biology
// ---------------------------------------------------------------------------

export async function createBiologyQuestion(data) {
  return adminFetch("/api/admin/biology", "POST", data);
}

export async function updateBiologyQuestion(id, data) {
  return adminFetch(`/api/admin/biology/${id}`, "PUT", data);
}

export async function deleteBiologyQuestion(id) {
  return adminFetch(`/api/admin/biology/${id}`, "DELETE");
}

// ---------------------------------------------------------------------------
// Admin endpoints - Checklist Sections
// ---------------------------------------------------------------------------

export async function createChecklistSection(data) {
  return adminFetch("/api/admin/checklist-sections", "POST", data);
}

export async function updateChecklistSection(id, data) {
  return adminFetch(`/api/admin/checklist-sections/${id}`, "PUT", data);
}

export async function deleteChecklistSection(id) {
  return adminFetch(`/api/admin/checklist-sections/${id}`, "DELETE");
}

// ---------------------------------------------------------------------------
// Admin endpoints - Checklist Items
// ---------------------------------------------------------------------------

export async function createChecklistItem(data) {
  return adminFetch("/api/admin/checklist-items", "POST", data);
}

export async function updateChecklistItem(id, data) {
  return adminFetch(`/api/admin/checklist-items/${id}`, "PUT", data);
}

export async function deleteChecklistItem(id) {
  return adminFetch(`/api/admin/checklist-items/${id}`, "DELETE");
}

// ---------------------------------------------------------------------------
// Admin endpoints - Reorder
// ---------------------------------------------------------------------------

export async function reorderContent(table, items) {
  return adminFetch(`/api/admin/reorder/${table}`, "PUT", items);
}

// ---------------------------------------------------------------------------
// Admin endpoints - Colors
// ---------------------------------------------------------------------------

export async function updateCategoryColor(category, color) {
  return adminFetch("/api/admin/colors", "PUT", { category, color });
}
