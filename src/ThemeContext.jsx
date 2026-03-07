import { createContext, useContext, useState, useEffect } from 'react';

export const THEMES = {
  original: {
    name: 'Original',
    '--bg-base': '#09090F',
    '--bg-surface': '#12121A',
    '--bg-elevated': '#1A1A24',
    '--bg-overlay': '#1E1E2A',
    '--border-subtle': '#252533',
    '--border-active': '#35354A',
    '--text-primary': '#F0EEE8',
    '--text-secondary': '#8B8B9E',
    '--text-muted': '#55556A',
    '--text-dimmed': '#C8C4BC',
    '--header-bg': 'rgba(9, 9, 15, 0.85)',
    '--header-border': 'rgba(255,255,255,0.04)',
    '--accent': '#7C6FFF',
    '--accent-soft': '#A78BFA',
    // Mantine dark scale
    '--mantine-color-dark-9': '#09090F',
    '--mantine-color-dark-8': '#12121A',
    '--mantine-color-dark-7': '#1A1A24',
    '--mantine-color-dark-6': '#1E1E2A',
    '--mantine-color-dark-5': '#252533',
    '--mantine-color-dark-4': '#35354A',
    '--mantine-color-dark-3': '#55556A',
    '--mantine-color-dark-2': '#8B8B9E',
    '--mantine-color-dark-1': '#C8C4BC',
    '--mantine-color-dark-0': '#F0EEE8',
  },
  light: {
    name: 'Light',
    '--bg-base': '#F2F2FA',
    '--bg-surface': '#FFFFFF',
    '--bg-elevated': '#E9E9F5',
    '--bg-overlay': '#DCDCF0',
    '--border-subtle': '#C4C4DE',
    '--border-active': '#AAAACC',
    '--text-primary': '#0D0D26',
    '--text-secondary': '#44446A',
    '--text-muted': '#76769A',
    '--text-dimmed': '#2E2E52',
    '--header-bg': 'rgba(242, 242, 250, 0.92)',
    '--header-border': 'rgba(0,0,0,0.08)',
    '--accent': '#6450EE',
    '--accent-soft': '#8470EE',
    // Mantine dark scale (inverted for light mode)
    '--mantine-color-dark-9': '#F2F2FA',
    '--mantine-color-dark-8': '#FFFFFF',
    '--mantine-color-dark-7': '#E9E9F5',
    '--mantine-color-dark-6': '#DCDCF0',
    '--mantine-color-dark-5': '#C4C4DE',
    '--mantine-color-dark-4': '#AAAACC',
    '--mantine-color-dark-3': '#76769A',
    '--mantine-color-dark-2': '#44446A',
    '--mantine-color-dark-1': '#2E2E52',
    '--mantine-color-dark-0': '#0D0D26',
  },
  bold: {
    name: 'Bold',
    '--bg-base': '#030008',
    '--bg-surface': '#0A0018',
    '--bg-elevated': '#120028',
    '--bg-overlay': '#1A0038',
    '--border-subtle': '#3D0066',
    '--border-active': '#6B00B3',
    '--text-primary': '#FFEEFF',
    '--text-secondary': '#E066FF',
    '--text-muted': '#B84DD9',
    '--text-dimmed': '#F0B3FF',
    '--header-bg': 'rgba(3, 0, 8, 0.95)',
    '--header-border': 'rgba(255,255,255,0.06)',
    '--accent': '#E600FF',
    '--accent-soft': '#D633FF',
    // Mantine dark scale (deep purple, bolder)
    '--mantine-color-dark-9': '#030008',
    '--mantine-color-dark-8': '#0A0018',
    '--mantine-color-dark-7': '#120028',
    '--mantine-color-dark-6': '#1A0038',
    '--mantine-color-dark-5': '#3D0066',
    '--mantine-color-dark-4': '#6B00B3',
    '--mantine-color-dark-3': '#B84DD9',
    '--mantine-color-dark-2': '#E066FF',
    '--mantine-color-dark-1': '#F0B3FF',
    '--mantine-color-dark-0': '#FFEEFF',
  },
};

const ThemeCtx = createContext({
  theme: 'original',
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try { return localStorage.getItem('ib_theme') || 'original'; }
    catch { return 'original'; }
  });

  const setTheme = (t) => {
    setThemeState(t);
    try { localStorage.setItem('ib_theme', t); } catch {}
  };

  useEffect(() => {
    const vars = THEMES[theme] || THEMES.original;
    const root = document.documentElement;
    Object.entries(vars).forEach(([key, val]) => {
      if (key.startsWith('--')) root.style.setProperty(key, val);
    });
    root.setAttribute('data-theme', theme);
    root.classList.remove('theme-original', 'theme-light', 'theme-bold');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
