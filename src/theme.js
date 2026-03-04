import { createTheme } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'violet',
  fontFamily: "'Inter', sans-serif",
  fontFamilyMonospace: "'JetBrains Mono', monospace",
  headings: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: '700',
  },
  colors: {
    dark: [
      '#C1C2C5',
      '#A6A7AB',
      '#909296',
      '#5C5F66',
      '#373A40',
      '#2C2E33',
      '#1A1A24',
      '#12121A',
      '#0D0D14',
      '#09090F',
    ],
    violet: [
      '#F3F0FF',
      '#E5DBFF',
      '#D0BFFF',
      '#B197FC',
      '#9775FA',
      '#845EF7',
      '#7C6FFF',
      '#7048E8',
      '#6741D9',
      '#5F3DC4',
    ],
  },
  other: {
    // Surface colors for manual use in styles
    bgBase: '#09090F',
    bgSurface: '#12121A',
    bgElevated: '#1A1A24',
    bgOverlay: '#1E1E2A',
    borderSubtle: '#252533',
    borderActive: '#35354A',
    textPrimary: '#F0EEE8',
    textSecondary: '#8B8B9E',
    textMuted: '#55556A',
    // Vibrant category colors
    catColors: {
      'Costs & Revenue': '#7C6FFF',
      'Cash Flow': '#38BDF8',
      'Final Accounts': '#34D399',
      'Ratio Analysis': '#FBBF24',
      'Ratio Analysis (HL)': '#FBBF24',
      'Investment Appraisal': '#A78BFA',
      'Budgets & Variance': '#F87171',
      'Breakeven': '#2DD4BF',
      'BMT Tools': '#F472B6',
      'Sources of Finance': '#FB923C',
    },
  },
});

export default theme;
