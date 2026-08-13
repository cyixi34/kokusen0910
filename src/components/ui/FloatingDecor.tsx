"use client";

import { useCallback, useRef, useState } from "react";
import { Music, Music2, Music3, Sparkles } from "lucide-react";
import { PetalBurst, createBurst, type Burst, type BurstKind } from "@/components/ui/PetalBurst";

type DecorKind = "sunflower" | "music" | "music2" | "music3" | "sparkle";

type Decor = {
  kind: DecorKind;
  top: string;
  side: "left" | "right";
  offset: string;
  box: number;
  icon: number;
  delay: string;
};

const decorations: Decor[] = [
  { kind: "sunflower", top: "8%", side: "left", offset: "4%", box: 52, icon: 22, delay: "0s" },
  { kind: "music", top: "17%", side: "right", offset: "5%", box: 44, icon: 20, delay: "1.2s" },
  { kind: "sparkle", top: "27%", side: "left", offset: "12%", box: 36, icon: 16, delay: "0.6s" },
  { kind: "music2", top: "37%", side: "right", offset: "3%", box: 40, icon: 18, delay: "2s" },
  { kind: "music3", top: "49%", side: "left", offset: "3%", box: 46, icon: 20, delay: "1.5s" },
  { kind: "sunflower", top: "59%", side: "right", offset: "5%", box: 48, icon: 20, delay: "0.3s" },
  { kind: "sparkle", top: "69%", side: "left", offset: "10%", box: 36, icon: 16, delay: "1.8s" },
  { kind: "music", top: "79%", side: "right", offset: "4%", box: 44, icon: 20, delay: "0.9s" },
  { kind: "sunflower", top: "89%", side: "left", offset: "4%", box: 52, icon: 22, delay: "2.4s" },
];

const burstKindFor = (kind: DecorKind): BurstKind =>
  kind === "sunflower" ? "flower" : kind === "sparkle" ? "sparkle" : "music";

function SunflowerStroke({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {[...Array(8)].map((_, i) => (
        <ellipse
          key={i}
          cx="24"
          cy="11"
          rx="3.5"
          ry="8"
          transform={`rotate(${i * 45} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="7" />
    </svg>
  );
}

export function FloatingDecor() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const nextId = useRef(0);
  const orbRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleClick = useCallback((index: number) => {
    const orb = orbRefs.current[index];
    if (!orb) return;

    const rect = orb.getBoundingClientRect();
    const burst = createBurst(
      burstKindFor(decorations[index].kind),
      nextId.current++,
      rect.left + rect.width / 2,
      rect.top + rect.height / 2
    );

    setBursts((prev) => [...prev, burst]);
    window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== burst.id));
    }, 1600);
  }, []);

  return (
    <>
      {decorations.map((d, i) => {
        const Icon =
          d.kind === "music"
            ? Music
            : d.kind === "music2"
              ? Music2
              : d.kind === "music3"
                ? Music3
                : d.kind === "sparkle"
                  ? Sparkles
                  : null;
        return (
          <button
            key={i}
            ref={(el) => {
              orbRefs.current[i] = el;
            }}
            type="button"
            aria-label="点击绽放花瓣"
            onClick={() => handleClick(i)}
            className={`sticker absolute z-30 cursor-pointer p-0 transition-all duration-300 hover:scale-110 active:scale-90 focus:outline-none ${i % 2 ? "animate-float-delayed" : "animate-float"}`}
            style={{
              top: d.top,
              left: d.side === "left" ? d.offset : "auto",
              right: d.side === "right" ? d.offset : "auto",
              width: d.box,
              height: d.box,
              backgroundColor: "rgba(255, 255, 255, 0.55)",
              border: "1px solid rgba(29, 127, 232, 0.25)",
              color: "#1d7fe8",
              boxShadow: "0 8px 24px rgba(20, 68, 126, 0.1)",
              animationDelay: d.delay,
            }}
          >
            {d.kind === "sunflower" ? (
              <SunflowerStroke size={d.icon} />
            ) : Icon ? (
              <Icon size={d.icon} strokeWidth={2.2} />
            ) : null}
          </button>
        );
      })}

      {bursts.map((burst) => (
        <PetalBurst key={burst.id} burst={burst} />
      ))}
    </>
  );
}
