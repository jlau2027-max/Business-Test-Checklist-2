import { useState, useRef, useEffect } from 'react';
import { useTheme, THEMES } from './ThemeContext.jsx';

const SWATCHES = {
  original: ['#09090F', '#7C6FFF', '#F0EEE8'],
  light:    ['#F2F2FA', '#6450EE', '#0D0D26'],
  bold:     ['#030008', '#E600FF', '#FFEEFF'],
};

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handle = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      <button
        onClick={() => setOpen(o => !o)}
        title="Change theme"
        style={{
          background: 'transparent',
          border: '1px solid var(--border-subtle)',
          borderRadius: 8,
          padding: '4px 8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          height: 32,
        }}
      >
        {/* Palette icon */}
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13.5" cy="6.5" r="1" fill="var(--text-secondary)" stroke="none"/>
          <circle cx="17.5" cy="10.5" r="1" fill="var(--text-secondary)" stroke="none"/>
          <circle cx="8.5" cy="7.5" r="1" fill="var(--text-secondary)" stroke="none"/>
          <circle cx="6.5" cy="12.5" r="1" fill="var(--text-secondary)" stroke="none"/>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
        </svg>
      </button>

      {open && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            zIndex: 9999,
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 10,
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minWidth: 148,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, padding: '2px 8px 4px', textTransform: 'uppercase' }}>
            APPEARANCE
          </span>
          {Object.entries(THEMES).map(([key, t]) => {
            const active = theme === key;
            return (
              <button
                key={key}
                onClick={() => { setTheme(key); setOpen(false); }}
                style={{
                  background: active ? 'var(--bg-overlay)' : 'transparent',
                  border: active ? '1px solid var(--border-active)' : '1px solid transparent',
                  borderRadius: 8,
                  padding: '7px 10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  textAlign: 'left',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--bg-overlay)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                {/* Colour swatches */}
                <div style={{ display: 'flex', gap: 3, flexShrink: 0 }}>
                  {SWATCHES[key].map((c, i) => (
                    <div
                      key={i}
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: c,
                        border: '1px solid rgba(255,255,255,0.15)',
                      }}
                    />
                  ))}
                </div>
                <span style={{
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontSize: 13,
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: active ? 600 : 400,
                  flex: 1,
                }}>
                  {t.name}
                </span>
                {active && (
                  <span style={{ color: '#34D399', fontSize: 12, fontWeight: 700 }}>✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
