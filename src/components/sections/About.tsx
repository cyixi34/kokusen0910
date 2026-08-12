"use client";

import Image from "next/image";
import { band } from "@/content/band";
import { LilyIcon } from "@/components/ui/LilyIcon";
import { Music2, Heart } from "lucide-react";
import kokusen from "../../../public/kokusen.png";

export function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs tracking-[0.2em] font-bold">
            <LilyIcon size={16} />
            INTRODUCTION
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-4">
                关于
                <br />
                <span className="accent-gradient-text">告别宣言</span>
              </h2>
              <p className="text-sm text-muted-light tracking-wider">
                用音乐记录每一次未说出口的告别
              </p>
            </div>

            <div className="window-frame p-6 md:p-8 space-y-5">
              <p className="text-muted-light leading-relaxed">{band.description}</p>
              <p className="text-muted-light leading-relaxed">{band.story}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "成立", value: "2024", icon: "✦" },
                { label: "成员", value: "6 人", icon: "♪" },
                { label: "风格", value: "J-POP / 日摇", icon: "✈" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-background-soft/60 border border-border p-3 sm:p-4 text-center hover:border-accent/40 transition-colors"
                >
                  <div className="text-accent text-lg mb-1">{stat.icon}</div>
                  <p className="text-xl sm:text-2xl font-black text-foreground leading-tight break-words">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="window-frame aspect-[2/3] p-6 flex items-center justify-center relative overflow-visible">
              <div className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-accent/20 border border-accent/30 flex items-center justify-center text-accent rotate-12 animate-float">
                <Music2 size={32} />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-accent-2/20 border border-accent-2/30 flex items-center justify-center text-accent-2 -rotate-12 animate-float-delayed">
                <Heart size={24} />
              </div>

              <Image
                src={kokusen}
                alt="告别宣言乐队视觉"
                width={1742}
                height={2622}
                className="w-full h-full object-contain mix-blend-screen"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
