import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// localStorage helpers (same as original)
function loadLS(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

function saveLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function useUserProgress() {
  const { isSignedIn, getToken, userId } = useAuth();
  const tokenRef = useRef(null);

  // Get fresh token for API calls
  const getAuthToken = useCallback(async () => {
    if (!isSignedIn) return null;
    try {
      const token = await getToken();
      tokenRef.current = token;
      return token;
    } catch {
      return null;
    }
  }, [isSignedIn, getToken]);

  // Save progress (to Supabase if logged in, localStorage otherwise)
  const saveProgress = useCallback(async (progressType, contentId, data) => {
    // Always save to localStorage as backup
    const lsKey = `${progressType}_${contentId}`;
    saveLS(lsKey, data);

    if (!isSignedIn || !isSupabaseConfigured()) return;

    try {
      const token = await getAuthToken();
      if (!token) return;

      await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ progress_type: progressType, content_id: contentId, data }),
      });
    } catch (err) {
      console.warn('Failed to sync progress to server:', err.message);
    }
  }, [isSignedIn, getAuthToken]);

  // Load progress
  const loadProgress = useCallback(async (progressType, contentId, fallback) => {
    const lsKey = `${progressType}_${contentId}`;
    const lsValue = loadLS(lsKey, fallback);

    if (!isSignedIn || !isSupabaseConfigured()) return lsValue;

    try {
      const token = await getAuthToken();
      if (!token) return lsValue;

      const res = await fetch(`/api/progress?type=${progressType}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!res.ok) return lsValue;

      const data = await res.json();
      const match = data.find(p => p.content_id === contentId);
      return match ? match.data : lsValue;
    } catch {
      return lsValue;
    }
  }, [isSignedIn, getAuthToken]);

  // Batch load all progress of a type
  const loadAllProgress = useCallback(async (progressType) => {
    if (!isSignedIn || !isSupabaseConfigured()) return {};

    try {
      const token = await getAuthToken();
      if (!token) return {};

      const res = await fetch(`/api/progress?type=${progressType}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!res.ok) return {};

      const data = await res.json();
      const result = {};
      data.forEach(p => { result[p.content_id] = p.data; });
      return result;
    } catch {
      return {};
    }
  }, [isSignedIn, getAuthToken]);

  return { saveProgress, loadProgress, loadAllProgress, isSignedIn, userId };
}

// Simple hook for checklist state (preserves existing localStorage behavior + sync)
export function useCheckedState(storageKey, defaultValue = {}) {
  const [checked, setChecked] = useState(() => loadLS(storageKey, defaultValue));
  const { isSignedIn, saveProgress, loadProgress } = useUserProgress();

  // Load from server on mount if signed in
  useEffect(() => {
    if (isSignedIn) {
      loadProgress('checklist_check', storageKey, checked).then(serverData => {
        if (serverData && Object.keys(serverData).length > 0) {
          setChecked(serverData);
        }
      });
    }
  }, [isSignedIn]);

  const toggle = useCallback((itemId) => {
    setChecked(prev => {
      const next = { ...prev, [itemId]: !prev[itemId] };
      saveLS(storageKey, next);
      if (isSignedIn) {
        saveProgress('checklist_check', storageKey, next);
      }
      return next;
    });
  }, [storageKey, isSignedIn, saveProgress]);

  return [checked, toggle];
}
