interface LilyIconProps {
  size?: number;
  className?: string;
}

export function LilyIcon({ size = 24, className }: LilyIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Stem */}
      <path
        d="M24 28 C24 28 22 36 20 42"
        stroke="#34d399"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M24 28 C24 28 26 34 28 38"
        stroke="#34d399"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Leaves */}
      <ellipse cx="22" cy="36" rx="4" ry="2" fill="#34d399" transform="rotate(-30 22 36)" />
      <ellipse cx="26" cy="33" rx="3" ry="1.5" fill="#34d399" transform="rotate(30 26 33)" />
      {/* Petals - 6 lily petals */}
      {[...Array(6)].map((_, i) => (
        <ellipse
          key={i}
          cx="24"
          cy="12"
          rx="5"
          ry="14"
          fill="#7dd3fc"
          transform={`rotate(${i * 60} 24 24)`}
          opacity="0.9"
        />
      ))}
      {/* Inner petals */}
      {[...Array(6)].map((_, i) => (
        <ellipse
          key={`inner-${i}`}
          cx="24"
          cy="16"
          rx="3"
          ry="9"
          fill="#a5f3fc"
          transform={`rotate(${i * 60 + 30} 24 24)`}
          opacity="0.85"
        />
      ))}
      {/* Center */}
      <circle cx="24" cy="24" r="5" fill="#fbbf24" />
      <circle cx="24" cy="24" r="3" fill="#f59e0b" />
      {/* Stamens */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * Math.PI) / 3;
        const x1 = 24 + Math.cos(angle) * 2;
        const y1 = 24 + Math.sin(angle) * 2;
        const x2 = 24 + Math.cos(angle) * 4.5;
        const y2 = 24 + Math.sin(angle) * 4.5;
        return (
          <g key={`stamen-${i}`}>
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#92400e"
              strokeWidth="0.8"
            />
            <circle cx={x2} cy={y2} r="0.8" fill="#78350f" />
          </g>
        );
      })}
    </svg>
  );
}
