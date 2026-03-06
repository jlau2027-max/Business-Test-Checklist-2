import { useRef, useEffect } from "react";

/**
 * Animated Shiny Button — CSS-only shimmer border effect
 * Adapted from EldoraUI, converted to JSX with class-based dark/light theme detection.
 */
export default function AnimatedShinyButton({
  children,
  url,
  className = "",
  style = {},
  shimmerColor,
  background,
  borderRadius = "100px",
}) {
  const ref = useRef(null);

  // Inject @property + keyframes into <head> once
  useEffect(() => {
    if (document.getElementById("shiny-btn-styles")) return;
    const sheet = document.createElement("style");
    sheet.id = "shiny-btn-styles";
    sheet.textContent = `
      @property --shiny-btn-x {
        syntax: "<number>";
        inherits: true;
        initial-value: 0;
      }
      @property --shiny-btn-speed {
        syntax: "<number>";
        inherits: true;
        initial-value: 2;
      }

      @keyframes shiny-btn-spin {
        0%   { --shiny-btn-x: 0; }
        100% { --shiny-btn-x: 1; }
      }

      @keyframes shiny-btn-shimmer {
        0%   { opacity: 0; }
        10%  { opacity: 1; }
        50%  { opacity: 0.4; }
        100% { opacity: 0; }
      }

      @keyframes shiny-btn-breathing {
        0%, 100% { opacity: 0.22; }
        50%      { opacity: 0.36; }
      }

      .shiny-btn {
        --shiny-btn-x: 0;
        --shiny-btn-speed: 2;
        animation: shiny-btn-spin calc(var(--shiny-btn-speed) * 1s) infinite linear;
        position: relative;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        transition: scale 0.12s ease;
      }

      .shiny-btn:hover {
        scale: 1.025;
      }

      .shiny-btn:active {
        scale: 0.985;
      }
    `;
    document.head.appendChild(sheet);
  }, []);

  // Resolve colours from CSS variables or props
  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark");

  const resolvedShimmer = shimmerColor
    || (isDark ? "rgba(123, 163, 181, 0.35)" : "rgba(79, 124, 138, 0.5)");

  const resolvedBg = background
    || (isDark ? "var(--bg-card)" : "var(--bg-card)");

  // ─── Gradient layers ──────────────────────────────────────────
  const borderGradient = `
    conic-gradient(
      from calc(var(--shiny-btn-x) * 1turn),
      transparent 0%,
      ${resolvedShimmer} 5%,
      transparent 15%,
      transparent 85%,
      ${resolvedShimmer} 95%,
      transparent 100%
    )
  `.trim();

  const dotOverlay = `
    radial-gradient(${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"} 0.75px, transparent 0.75px)
  `.trim();

  const innerShimmer = `
    linear-gradient(
      90deg,
      transparent 20%,
      ${isDark ? "rgba(123,163,181,0.08)" : "rgba(79,124,138,0.08)"} 50%,
      transparent 80%
    )
  `.trim();

  // ─── Render ───────────────────────────────────────────────────
  const Tag = url ? "a" : "button";
  const linkProps = url ? { href: url } : { type: "button" };

  return (
    <Tag
      ref={ref}
      className={`shiny-btn ${className}`}
      {...linkProps}
      style={{
        borderRadius,
        padding: "1.5px",
        background: borderGradient,
        ...style,
      }}
    >
      {/* Inner container */}
      <span
        style={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          borderRadius: `calc(${borderRadius} - 1.5px)`,
          background: resolvedBg,
          overflow: "hidden",
          padding: "14px 32px",
        }}
      >
        {/* Dot overlay */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: "-200%",
            backgroundImage: dotOverlay,
            backgroundSize: "3px 3px",
            opacity: 0.5,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }}
        />

        {/* Inner shimmer sweep */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: innerShimmer,
            backgroundSize: "200% 100%",
            animation: "shiny-btn-shimmer 3s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* Breathing glow */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at center, ${resolvedShimmer}, transparent 70%)`,
            animation: "shiny-btn-breathing 4s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        {/* Content */}
        <span style={{ position: "relative", zIndex: 1 }}>
          {children}
        </span>
      </span>
    </Tag>
  );
}
