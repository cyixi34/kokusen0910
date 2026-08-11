"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { members } from "@/content/band";
import { TiltCard } from "@/components/ui/TiltCard";

const memberIds = members.map((m) => m.id);

export function MembersSection() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startLeft = useRef(0);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id || !memberIds.includes(id)) return;
      const scroller = scrollerRef.current;
      const card = document.getElementById(id);
      if (!scroller || !card) return;
      const left = card.offsetLeft - (scroller.clientWidth - card.offsetWidth) / 2;
      scroller.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  const scrollByCard = (dir: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const cardWidth = scroller.querySelector("[data-member-card]")?.clientWidth ?? scroller.clientWidth;
    scroller.scrollBy({ left: dir * (cardWidth + 20), behavior: "smooth" });
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    isDragging.current = true;
    startX.current = e.clientX;
    startLeft.current = scrollerRef.current?.scrollLeft ?? 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollerRef.current) return;
    scrollerRef.current.scrollLeft = startLeft.current - (e.clientX - startX.current);
  };

  const handlePointerEnd = () => {
    isDragging.current = false;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 48, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 90, damping: 14 },
    },
  };

  return (
    <section id="members" className="relative min-h-screen py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-8 md:mb-12">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-2/10 border border-accent-2/30 text-accent-2 text-xs tracking-[0.2em] font-bold mb-4">
              ✦ CHARACTER
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-foreground">
              成员介绍
            </h2>
            <p className="md:hidden text-xs text-muted mt-4 flex items-center justify-center gap-1.5">
              <ChevronLeft size={14} />
              左右滑动查看
              <ChevronRight size={14} />
            </p>
          </div>
          <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 gap-2">
            <button
              onClick={() => scrollByCard(-1)}
              aria-label="上一个成员"
              className="w-11 h-11 rounded-full bg-background-soft border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-background-deep hover:border-accent transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scrollByCard(1)}
              aria-label="下一个成员"
              className="w-11 h-11 rounded-full bg-background-soft border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-background-deep hover:border-accent transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          id="members-scroller"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerLeave={handlePointerEnd}
          className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 -mx-6 px-6 sm:mx-auto sm:px-0 sm:max-w-[480px] no-scrollbar cursor-grab active:cursor-grabbing select-none"
        >
          {members.map((member) => (
            <motion.div
              key={member.id}
              id={member.id}
              data-member-card
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.55 }}
              className="snap-center shrink-0 w-full"
            >
              <TiltCard glowColor={`${member.color}25`} className="h-full">
                <div className="group block h-full window-frame p-6 md:p-8 flex flex-col min-h-[360px]">
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        backgroundColor: member.color,
                        color: "#070d18",
                        boxShadow: `0 8px 30px ${member.color}50`,
                      }}
                    >
                      {member.name[0]}
                    </div>
                  </div>

                  <div className="mb-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[10px] tracking-wider font-bold mb-2"
                      style={{
                        backgroundColor: `${member.color}20`,
                        color: member.color,
                      }}
                    >
                      {member.role}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-foreground">
                      {member.name}
                    </h3>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-light flex-1">
                    {member.description}
                  </p>

                  <div className="mt-6 pt-5 border-t border-border/60">
                    <div
                      className="h-1 w-16 rounded-full"
                      style={{ backgroundColor: member.color }}
                    />
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
