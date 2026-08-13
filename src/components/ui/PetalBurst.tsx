"use client";

import { createPortal } from "react-dom";

export type BurstKind = "flower" | "music" | "sparkle";

export type ParticleSpec = {
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
  kind: BurstKind;
  particles: ParticleSpec[];
};

const KIND_CONFIG = {
  flower: {
    count: 14,
    colors: ["#4db4ff", "#1d7fe8", "#7fd0ff", "#ffb3d4", "#ffd6a8", "#ffffff"],
    minDist: 55,
    maxDist: 125,
    minSize: 10,
    maxSize: 20,
  },
  music: {
    count: 10,
    colors: ["#1d7fe8", "#4db4ff", "#5ac8fa", "#7fd0ff", "#2f6fb8"],
    minDist: 60,
    maxDist: 130,
    minSize: 14,
    maxSize: 22,
  },
  sparkle: {
    count: 12,
    colors: ["#ffd166", "#ffe9a8", "#ffb84d", "#ffffff", "#f7c948"],
    minDist: 40,
    maxDist: 110,
    minSize: 8,
    maxSize: 16,
  },
} as const;

export function createBurst(
  kind: BurstKind,
  id: number,
  x: number,
  y: number
): Burst {
  const cfg = KIND_CONFIG[kind];
  const particles: ParticleSpec[] = Array.from({ length: cfg.count }, (_, i) => {
    const angle = (i / cfg.count) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
    const distance = cfg.minDist + Math.random() * (cfg.maxDist - cfg.minDist);
    return {
      tx: Math.cos(angle) * distance,
      ty: Math.sin(angle) * distance * 0.8,
      spin: (Math.random() - 0.5) * 360,
      size: cfg.minSize + Math.random() * (cfg.maxSize - cfg.minSize),
      color: cfg.colors[Math.floor(Math.random() * cfg.colors.length)],
      dur: 0.7 + Math.random() * 0.5,
      delay: Math.random() * 0.15,
    };
  });

  return { id, x, y, kind, particles };
}

function FlowerShape() {
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

function MusicShape() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9 18a3 3 0 1 1-2-2.83V4l11-2v11.17a3 3 0 1 1-2-2.83V6.3L9 8.2V18z" />
    </svg>
  );
}

function SparkleShape() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2c.7 4.8 2.2 6.3 7 7-4.8.7-6.3 2.2-7 7-.7-4.8-2.2-6.3-7-7 4.8-.7 6.3-2.2 7-7z" />
    </svg>
  );
}

function ShapeFor({ kind }: { kind: BurstKind }) {
  if (kind === "music") return <MusicShape />;
  if (kind === "sparkle") return <SparkleShape />;
  return <FlowerShape />;
}

export function PetalBurst({ burst }: { burst: Burst }) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      <span
        className="burst-flash"
        style={{ left: burst.x, top: burst.y, width: 90, height: 90 }}
      />
      {burst.particles.map((particle, i) => (
        <span
          key={i}
          className="petal-bloom"
          style={
            {
              left: burst.x,
              top: burst.y,
              width: particle.size,
              height: particle.size,
              color: particle.color,
              "--tx": `${particle.tx}px`,
              "--ty": `${particle.ty}px`,
              "--spin": `${particle.spin}deg`,
              "--dur": `${particle.dur}s`,
              "--delay": `${particle.delay}s`,
            } as React.CSSProperties
          }
        >
          <ShapeFor kind={burst.kind} />
        </span>
      ))}
    </>,
    document.body
  );
}
