export default function ProgressBar({ value, color, trackColor = "#1E1E2A", height = "6px", animated = false }) {
  const pct = Math.max(0, Math.min(100, value || 0));
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ backgroundColor: trackColor, height }}>
      <div
        className={`h-full rounded-full transition-all duration-300${animated ? " animate-pulse" : ""}`}
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}
