"use client";

import { useState } from "react";
import { band } from "@/content/band";
import { motion } from "framer-motion";
import { Mail, Copy, Check } from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(band.contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 md:py-32 px-6 flex items-center">
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 14 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs tracking-[0.2em] font-bold mb-6">
            <Mail size={14} />
            CONTACT
          </span>

          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
            联系方式
          </h2>

          <p className="text-muted-light leading-relaxed max-w-xl mx-auto mb-12">
            无论是演出邀约、媒体合作，还是单纯想和我们聊聊音乐，都可以通过邮箱联系我们。
          </p>

          <button
            onClick={handleCopy}
            className="group window-frame w-full max-w-md sm:max-w-none sm:w-fit px-5 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 hover:border-accent/40 transition-all duration-300 mb-10 mx-auto text-left"
            aria-label="复制邮箱地址"
          >
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 rounded-2xl accent-gradient flex items-center justify-center text-background-deep shadow-lg group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="text-xs tracking-[0.2em] text-muted font-bold">EMAIL</p>
                <p className="text-base sm:text-lg text-foreground group-hover:text-accent transition-colors break-all leading-snug">
                  {band.contact.email}
                </p>
              </div>
            </div>
            <span
              className={`shrink-0 self-start sm:self-auto inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-all duration-300 ${
                copied
                  ? "bg-accent/20 text-accent"
                  : "bg-background-soft text-muted group-hover:text-accent"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  已复制
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  复制
                </>
              )}
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
