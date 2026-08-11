interface SunflowerIconProps {
  size?: number;
  className?: string;
}

export function SunflowerIcon({ size = 24, className }: SunflowerIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Petals - blue/cyan gradient */}
      {[...Array(12)].map((_, i) => (
        <ellipse
          key={i}
          cx="24"
          cy="8"
          rx="4"
          ry="9"
          fill="#38bdf8"
          transform={`rotate(${i * 30} 24 24)`}
        />
      ))}
      {/* Center - deep teal */}
      <circle cx="24" cy="24" r="11" fill="#0e7490" />
      <circle cx="24" cy="24" r="9" fill="#0891b2" />
      {/* Seeds dots */}
      {[...Array(7)].map((_, ring) => {
        const count = (ring + 1) * 6;
        const radius = (ring + 1) * 2.2;
        return [...Array(count)].map((_, i) => {
          const angle = (i / count) * Math.PI * 2;
          const x = 24 + Math.cos(angle) * radius;
          const y = 24 + Math.sin(angle) * radius;
          return (
            <circle
              key={`${ring}-${i}`}
              cx={x}
              cy={y}
              r="1"
              fill="#164e63"
            />
          );
        });
      })}
      <circle cx="24" cy="24" r="1.5" fill="#164e63" />
    </svg>
  );
}
