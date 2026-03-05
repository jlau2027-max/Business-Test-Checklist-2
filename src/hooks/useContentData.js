import { useState, useEffect, useCallback } from "react";
import * as api from "../api/contentApi.js";

// ---------------------------------------------------------------------------
// Module-level cache (persists across component re-renders)
// ---------------------------------------------------------------------------
const cache = {};

// ---------------------------------------------------------------------------
// Map of content type -> fetch function
// ---------------------------------------------------------------------------
const fetchers = {
  flashcardTopics: () => api.fetchFlashcardTopics(),
  mcq: () => api.fetchMcqQuestions(),
  written: () => api.fetchWrittenQuestions(),
  history: () => api.fetchHistoryQuestions(),
  checklist: () => api.fetchChecklist(),
  colors: () => api.fetchCategoryColors(),
};

// ---------------------------------------------------------------------------
// useContentData - generic hook for cacheable content types
// ---------------------------------------------------------------------------
export function useContentData(contentType) {
  const [data, setData] = useState(cache[contentType] ?? null);
  const [loading, setLoading] = useState(!cache[contentType]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    const fetcher = fetchers[contentType];
    if (!fetcher) {
      setError(new Error(`Unknown content type: ${contentType}`));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetcher();
      cache[contentType] = result;
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [contentType]);

  useEffect(() => {
    if (cache[contentType]) {
      setData(cache[contentType]);
      setLoading(false);
      return;
    }
    fetchData();
  }, [contentType, fetchData]);

  const refetch = useCallback(() => {
    delete cache[contentType];
    return fetchData();
  }, [contentType, fetchData]);

  return { data, loading, error, refetch };
}

// ---------------------------------------------------------------------------
// useFlashcards - hook for flashcards that requires a topicId parameter
// ---------------------------------------------------------------------------
export function useFlashcards(topicId) {
  const cacheKey = `flashcards:${topicId}`;

  const [data, setData] = useState(cache[cacheKey] ?? null);
  const [loading, setLoading] = useState(!cache[cacheKey]);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!topicId) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await api.fetchFlashcards(topicId);
      cache[cacheKey] = result;
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [topicId, cacheKey]);

  useEffect(() => {
    if (!topicId) {
      setData(null);
      setLoading(false);
      return;
    }

    if (cache[cacheKey]) {
      setData(cache[cacheKey]);
      setLoading(false);
      return;
    }

    fetchData();
  }, [topicId, cacheKey, fetchData]);

  const refetch = useCallback(() => {
    delete cache[cacheKey];
    return fetchData();
  }, [cacheKey, fetchData]);

  return { data, loading, error, refetch };
}
