import { ClerkProvider } from '@clerk/react';
import { useTheme, THEMES } from './ThemeContext.jsx';

export default function ClerkThemeWrapper({ publishableKey, afterSignOutUrl, children }) {
  const { theme } = useTheme();
  const vars = THEMES[theme] || THEMES.original;
  const appearance = {
    variables: {
      colorPrimary: vars['--accent'],
      colorBackground: vars['--bg-surface'],
      colorInputBackground: vars['--bg-elevated'],
      colorText: vars['--text-primary'],
      colorTextSecondary: vars['--text-secondary'],
      borderRadius: '0.5rem',
      fontFamily: "'Inter', sans-serif",
    },
  };

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      afterSignOutUrl={afterSignOutUrl}
      appearance={appearance}
    >
      {children}
    </ClerkProvider>
  );
}
