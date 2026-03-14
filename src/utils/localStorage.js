import { syncToCloud } from "../stateSync.js";

/**
 * Read a JSON value from localStorage with a fallback.
 * @param {string} key
 * @param {*} fallback
 */
export function loadLS(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v !== null ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Write a JSON value to localStorage and sync to the cloud.
 * @param {string} key
 * @param {*} value
 */
export function saveLS(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
  syncToCloud(key, value);
}
