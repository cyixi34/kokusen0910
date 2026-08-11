"use client";

import { useEffect, useRef } from "react";

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
      "200, 230, 255",
      "45, 212, 191",
      "56, 189, 248",
      "94, 234, 212",
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
          opacity: Math.random() * 0.4 + 0.1,
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

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[40] opacity-70"
      />

      {/* Soft vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[35]"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, transparent 0%, transparent 45%, rgba(7, 13, 24, 0.5) 100%)",
        }}
      />

      {/* Top/bottom soft bars */}
      <div className="fixed inset-x-0 top-0 h-20 bg-gradient-to-b from-background-deep/60 to-transparent pointer-events-none z-[36]" />
      <div className="fixed inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background-deep/60 to-transparent pointer-events-none z-[36]" />
    </>
  );
}
