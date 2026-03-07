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
    '--bg-base': '#06000F',
    '--bg-surface': '#0E0020',
    '--bg-elevated': '#160030',
    '--bg-overlay': '#1E003F',
    '--border-subtle': '#320058',
    '--border-active': '#520090',
    '--text-primary': '#F5E8FF',
    '--text-secondary': '#CC88FF',
    '--text-muted': '#9955BB',
    '--text-dimmed': '#DDBBFF',
    '--header-bg': 'rgba(6, 0, 15, 0.92)',
    '--accent': '#CC00FF',
    '--accent-soft': '#9900EE',
    // Mantine dark scale (deep purple)
    '--mantine-color-dark-9': '#06000F',
    '--mantine-color-dark-8': '#0E0020',
    '--mantine-color-dark-7': '#160030',
    '--mantine-color-dark-6': '#1E003F',
    '--mantine-color-dark-5': '#320058',
    '--mantine-color-dark-4': '#520090',
    '--mantine-color-dark-3': '#9955BB',
    '--mantine-color-dark-2': '#CC88FF',
    '--mantine-color-dark-1': '#DDBBFF',
    '--mantine-color-dark-0': '#F5E8FF',
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
  }, [theme]);

  // Apply on first mount
  useEffect(() => {
    const vars = THEMES[theme] || THEMES.original;
    const root = document.documentElement;
    Object.entries(vars).forEach(([key, val]) => {
      if (key.startsWith('--')) root.style.setProperty(key, val);
    });
    root.setAttribute('data-theme', theme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
