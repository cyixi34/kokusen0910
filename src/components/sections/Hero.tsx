"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { band, members } from "@/content/band";
import { SunflowerIcon } from "@/components/ui/SunflowerIcon";
import { Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 80, damping: 14 },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden"
    >
      {/* Dreamy background */}
      <div className="absolute inset-0 diagonal-line opacity-40" />
      <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-[100px] animate-float" />
      <div className="absolute bottom-32 right-10 w-80 h-80 bg-accent-2/10 rounded-full blur-[120px] animate-float-delayed" />

      {/* Floating stickers */}
          <div className="absolute top-32 right-[15%] animate-float hidden md:flex">
        <div className="sticker w-16 h-16 bg-accent/15 border border-accent/30 text-accent rotate-12">
          <SunflowerIcon size={26} />
        </div>
      </div>
      <div className="absolute bottom-40 left-[12%] animate-float-delayed hidden md:flex">
        <div className="sticker w-14 h-14 bg-accent-2/20 border border-accent-2/30 text-accent-2 -rotate-12">
          <Sparkles size={20} />
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center max-w-5xl mx-auto"
      >
        {/* Travel ticket badge */}
          <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-background-soft/80 border border-accent/30 text-accent text-xs tracking-[0.2em] font-bold mb-8 pop-shadow"
        >
          <SunflowerIcon size={16} />
          {band.englishName}
        </motion.div>

        {/* Main title window */}
        <motion.div
          variants={itemVariants}
          className="window-frame px-8 py-10 md:px-16 md:py-14 mb-8"
        >
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight will-change-transform"
          >
            <span className="accent-gradient-text inline-block text-glow">
              {band.name}
            </span>
          </h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-base md:text-xl text-muted-light/90 max-w-lg mb-12 leading-relaxed"
        >
          {band.tagline}
        </motion.p>

        {/* Character quick nav pills */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 max-w-2xl mb-10"
        >
          {["ABOUT", "MEMBERS", "GUESTBOOK", "CONTACT"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="px-5 py-2.5 text-xs tracking-wider font-bold text-foreground bg-background-soft/80 border border-border-light/60 rounded-full hover:bg-accent hover:text-background-deep hover:border-accent transition-all duration-300 pop-shadow"
            >
              {item}
            </a>
          ))}
        </motion.div>

        {/* Member mini avatars */}
        <motion.div
          variants={itemVariants}
          className="flex -space-x-3"
        >
          {members.map((member) => (
            <a
              key={member.id}
              href={`#${member.id}`}
              className="w-12 h-12 rounded-full border-2 border-background flex items-center justify-center text-sm font-black hover:scale-110 hover:z-10 transition-transform"
              style={{ backgroundColor: member.color, color: "#070d18" }}
            >
              {member.name[0]}
            </a>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-muted/60 text-xs tracking-[0.3em] font-bold">
        <span>SCROLL</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted/40 flex justify-center pt-2">
          <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
