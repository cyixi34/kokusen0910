"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { members } from "@/content/band";
import { TiltCard } from "@/components/ui/TiltCard";
import { ArrowUpRight } from "lucide-react";

export function MembersSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring" as const, stiffness: 90, damping: 13 },
    },
  };

  return (
    <section id="members" className="relative min-h-screen py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-2/10 border border-accent-2/30 text-accent-2 text-xs tracking-[0.2em] font-bold mb-6">
            ✦ CHARACTER
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground">
            成员介绍
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {members.map((member) => (
            <motion.div key={member.id} variants={cardVariants}>
              <TiltCard glowColor={`${member.color}25`} className="h-full">
                <Link
                  href={`/members/${member.id}`}
                  className="group block h-full window-frame p-6 md:p-8 flex flex-col min-h-[360px] hover:border-accent/40 transition-all duration-300"
                >
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
                    <div
                      className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted group-hover:text-accent group-hover:border-accent transition-colors"
                    >
                      <ArrowUpRight size={16} />
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

                  <div className="mt-6 pt-5 border-t border-border/60 flex items-center justify-between">
                    <span className="text-xs tracking-[0.15em] text-muted font-bold group-hover:text-accent transition-colors">
                      VIEW PROFILE
                    </span>
                    <span className="text-xs text-muted">→</span>
                  </div>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
