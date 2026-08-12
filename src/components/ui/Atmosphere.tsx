"use client";

import { useEffect, useRef } from "react";
import { Music, Music2, Sparkles } from "lucide-react";
import { SunflowerIcon } from "@/components/ui/SunflowerIcon";

export function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const colors = [
      "45, 140, 240",
      "96, 180, 255",
      "130, 205, 255",
      "30, 110, 210",
    ];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles.length = 0;
      const count = Math.min(35, Math.floor(window.innerWidth / 50));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2.5 + 0.5,
          speedY: Math.random() * -0.25 - 0.05,
          speedX: (Math.random() - 0.5) * 0.15,
          opacity: Math.random() * 0.2 + 0.04,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
    };

    const drawStar = (
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number,
      color: string
    ) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
        ctx.lineTo(
          Math.cos((i * Math.PI) / 2 + Math.PI / 4) * size * 0.4,
          Math.sin((i * Math.PI) / 2 + Math.PI / 4) * size * 0.4
        );
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(${color}, ${opacity})`;
      ctx.fill();
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        drawStar(p.x, p.y, p.size, p.rotation, p.opacity, p.color);

        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y < -15) {
          p.y = canvas.height + 15;
          p.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();

    const handleResize = () => {
      resize();
      createParticles();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const clouds = [
    { top: "6%", left: "6%", width: 230, height: 82, opacity: 0.55, dur: 38, delay: -15 },
    { top: "13%", left: "52%", width: 300, height: 105, opacity: 0.5, dur: 52, delay: -38 },
    { top: "22%", left: "76%", width: 250, height: 88, opacity: 0.46, dur: 44, delay: -28 },
    { top: "34%", left: "14%", width: 270, height: 92, opacity: 0.45, dur: 48, delay: -30 },
    { top: "46%", left: "62%", width: 210, height: 74, opacity: 0.5, dur: 34, delay: -18 },
    { top: "58%", left: "30%", width: 290, height: 100, opacity: 0.42, dur: 56, delay: -40 },
    { top: "70%", left: "8%", width: 240, height: 84, opacity: 0.4, dur: 42, delay: -22 },
    { top: "80%", left: "55%", width: 260, height: 90, opacity: 0.38, dur: 46, delay: -30 },
  ];

  type DecorationKind = "sunflower" | "music" | "music2" | "sparkle";

  const decorations: Array<{
    kind: DecorationKind;
    top: string;
    left?: string;
    right?: string;
    box: number;
    size: number;
    delay: string;
  }> = [
    { kind: "sunflower", top: "9%", left: "3%", box: 56, size: 26, delay: "0s" },
    { kind: "music", top: "16%", right: "5%", box: 44, size: 22, delay: "1.4s" },
    { kind: "sparkle", top: "25%", left: "12%", box: 36, size: 16, delay: "0.8s" },
    { kind: "music2", top: "34%", left: "2%", box: 40, size: 18, delay: "2s" },
    { kind: "sunflower", top: "42%", right: "3%", box: 48, size: 22, delay: "0.6s" },
    { kind: "music", top: "58%", left: "4%", box: 52, size: 24, delay: "1.8s" },
    { kind: "sparkle", top: "66%", right: "4%", box: 40, size: 18, delay: "0.2s" },
    { kind: "music2", top: "80%", left: "2%", box: 40, size: 18, delay: "2.4s" },
    { kind: "sunflower", top: "86%", right: "6%", box: 56, size: 26, delay: "1s" },
  ];

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[40] opacity-60"
      />

      {/* Clouds — continuous linear drift across the screen, behind content */}
      {clouds.map((cloud, i) => (
        <div
          key={i}
          className="cloud-drift fixed pointer-events-none -z-10"
          style={{
            top: cloud.top,
            left: cloud.left,
            opacity: cloud.opacity,
            animationDuration: `${cloud.dur}s`,
            animationDelay: `${cloud.delay}s`,
          }}
        >
          <div className="relative" style={{ width: cloud.width, height: cloud.height }}>
            <div className="absolute left-0 bottom-0 w-[70%] h-[60%] rounded-full bg-white blur-xl" />
            <div className="absolute left-[35%] bottom-[10%] w-[55%] h-[80%] rounded-full bg-white blur-xl" />
            <div className="absolute left-[62%] bottom-0 w-[48%] h-[55%] rounded-full bg-white blur-xl" />
          </div>
        </div>
      ))}

      {/* Floating sunflower / music-note / sparkle stickers along the page edges */}
      {decorations.map((d, i) => {
        const Icon =
          d.kind === "music"
            ? Music
            : d.kind === "music2"
              ? Music2
              : d.kind === "sparkle"
                ? Sparkles
                : null;
        return (
          <div
            key={i}
            className={`sticker fixed pointer-events-none hidden md:flex ${i % 2 ? "animate-float-delayed" : "animate-float"}`}
            style={{
              top: d.top,
              left: d.left,
              right: d.right,
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
              <SunflowerIcon size={d.size} />
            ) : Icon ? (
              <Icon size={d.size} strokeWidth={2.2} />
            ) : null}
          </div>
        );
      })}

      {/* Soft vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[35]"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, transparent 0%, transparent 45%, rgba(29, 127, 232, 0.05) 100%)",
        }}
      />

      {/* Top/bottom soft bars */}
      <div className="fixed inset-x-0 top-0 h-20 bg-gradient-to-b from-white/60 to-transparent pointer-events-none z-[36]" />
      <div className="fixed inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/60 to-transparent pointer-events-none z-[36]" />
    </>
  );
}
