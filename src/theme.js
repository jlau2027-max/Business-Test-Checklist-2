import { createTheme } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'geist',
  fontFamily: "'Geist', sans-serif",
  fontFamilyMonospace: "'Geist Mono', monospace",
  headings: {
    fontFamily: "'Geist', sans-serif",
    fontWeight: '700',
  },
  colors: {
    dark: [
      '#C4C4C4',
      '#A1A1A1',
      '#888888',
      '#666666',
      '#444444',
      '#333333',
      '#1A1A1A',
      '#111111',
      '#0A0A0A',
      '#000000',
    ],
    geist: [
      '#F5F5F5',
      '#E5E5E5',
      '#D4D4D4',
      '#A3A3A3',
      '#737373',
      '#525252',
      '#404040',
      '#262626',
      '#171717',
      '#0A0A0A',
    ],
  },
  other: {
    // Geist design system surface colors
    bgBase: '#000000',
    bgSurface: '#0A0A0A',
    bgElevated: '#111111',
    bgOverlay: '#171717',
    borderSubtle: '#1F1F1F',
    borderActive: '#333333',
    textPrimary: '#EDEDED',
    textSecondary: '#A1A1A1',
    textMuted: '#666666',
    // Accent color (Vercel blue)
    accent: '#0070F3',
    accentLight: '#3291FF',
    success: '#0070F3',
    warning: '#F5A623',
    error: '#EE0000',
    // Vibrant category colors (toned down for Geist)
    catColors: {
      'Costs & Revenue': '#0070F3',
      'Cash Flow': '#00B4D8',
      'Final Accounts': '#00CC88',
      'Ratio Analysis': '#F5A623',
      'Ratio Analysis (HL)': '#F5A623',
      'Investment Appraisal': '#7928CA',
      'Budgets & Variance': '#EE0000',
      'Breakeven': '#00CC88',
      'BMT Tools': '#FF0080',
      'Sources of Finance': '#F5A623',
    },
  },
});

export default theme;
