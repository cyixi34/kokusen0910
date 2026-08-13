"use client";

const PETAL_COLORS = [
  "#4db4ff",
  "#1d7fe8",
  "#7fd0ff",
  "#ffb3d4",
  "#ffd6a8",
  "#ffffff",
];

export type PetalSpec = {
  tx: number;
  ty: number;
  spin: number;
  size: number;
  color: string;
  dur: number;
  delay: number;
};

export type Burst = {
  id: number;
  x: number;
  y: number;
  petals: PetalSpec[];
};

export function createBurst(id: number, x: number, y: number): Burst {
  const count = 14;
  const petals: PetalSpec[] = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
    const distance = 55 + Math.random() * 70;
    return {
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance * 0.8,
      spin: (Math.random() - 0.5) * 360,
      size: 10 + Math.random() * 10,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      dur: 0.7 + Math.random() * 0.5,
      delay: Math.random() * 0.15,
    };
  });

  return { id, x, y, petals };
}

function PetalShape() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C17 7 19 12 15 17c-1.6 2.1-3 3-3 3s-1.4-.9-3-3C5 12 7 7 12 2z" />
    </svg>
  );
}

export function PetalBurst({ burst }: { burst: Burst }) {
  return (
    <>
      <span
        className="burst-flash"
        style={{ left: burst.x, top: burst.y, width: 90, height: 90 }}
      />
      {burst.petals.map((petal, i) => (
        <span
          key={i}
          className="petal-bloom"
          style={
            {
              left: burst.x,
              top: burst.y,
              width: petal.size,
              height: petal.size,
              color: petal.color,
              "--tx": `${petal.tx}px`,
              "--ty": `${petal.ty}px`,
              "--spin": `${petal.spin}deg`,
              "--dur": `${petal.dur}s`,
              "--delay": `${petal.delay}s`,
            } as React.CSSProperties
          }
        >
          <PetalShape />
        </span>
      ))}
    </>
  );
}
