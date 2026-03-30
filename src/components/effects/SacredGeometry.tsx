interface SacredGeometryProps {
  className?: string;
  size?: number;
}

export function SacredGeometry({
  className = "",
  size = 500,
}: SacredGeometryProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.14;
  const petalOffsets = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * 60 * Math.PI) / 180;
    return { x: cx + r * Math.sin(angle), y: cy - r * Math.cos(angle) };
  });

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full"
        fill="none"
        stroke="currentColor"
      >
        <g className="animate-spin-slow origin-center">
          <circle cx={cx} cy={cy} r={r} strokeWidth="0.5" opacity="0.5" />
          {petalOffsets.map((p, i) => (
            <circle
              key={`petal-${i}`}
              cx={p.x}
              cy={p.y}
              r={r}
              strokeWidth="0.4"
              opacity="0.3"
            />
          ))}
          <circle
            cx={cx}
            cy={cy}
            r={r * 2.1}
            strokeWidth="0.3"
            opacity="0.2"
          />
        </g>

        <g className="animate-spin-slow-reverse origin-center">
          <circle
            cx={cx}
            cy={cy}
            r={r * 2.8}
            strokeWidth="0.3"
            strokeDasharray="4 8"
            opacity="0.15"
          />
          <circle
            cx={cx}
            cy={cy}
            r={r * 3.3}
            strokeWidth="0.2"
            strokeDasharray="2 12"
            opacity="0.1"
          />
        </g>

        <g className="animate-spin-slow origin-center" style={{ animationDuration: "120s" }}>
          <circle
            cx={cx}
            cy={cy}
            r={r * 2.5}
            strokeWidth="0.2"
            strokeDasharray="1 6"
            opacity="0.12"
          />
        </g>
      </svg>
    </div>
  );
}
