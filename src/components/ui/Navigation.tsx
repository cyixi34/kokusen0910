"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SunflowerIcon } from "@/components/ui/SunflowerIcon";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "MEMBERS", href: "#members" },
  { label: "GUESTBOOK", href: "#guestbook" },
  { label: "CONTACT", href: "#contact" },
];

const mobileListVariants = {
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};

const mobileItemVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -14 },
};

export function Navigation() {
  const [activeSection, setActiveSection] = useState("top");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.replace("#", ""));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("top");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setActiveSection(href.replace("#", ""));
  };

  return (
    <motion.header
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 20, delay: 0.25 }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      <div className="nav-bob relative max-w-5xl mx-auto">
        <div className="relative nav-ticket overflow-hidden bg-background-deep/80 backdrop-blur-xl px-4 md:px-6 h-14 flex items-center justify-between shadow-lg shadow-black/20">
          <span aria-hidden className="nav-ring" />

          <Link href="#top" className="group relative z-10 flex items-center gap-2">
            <SunflowerIcon
              size={18}
              className="animate-spin-slow text-accent-2 transition-transform duration-300 group-hover:scale-125"
            />
            <span className="inline-block text-sm tracking-[0.15em] font-black text-white transition-all duration-300 group-hover:text-accent-2 group-hover:-rotate-2">
              告别宣言
            </span>
          </Link>

          <nav className="relative z-10 hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  whileHover={{ y: -2, scale: 1.07 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                  className="group relative px-4 py-1.5 text-[11px] tracking-[0.05em] font-bold"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-accent pop-glow"
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 transition-colors duration-300",
                      isActive
                        ? "text-background-deep"
                        : "text-white/70 group-hover:text-white"
                    )}
                  >
                    {item.label}
                  </span>
                  <span
                    className={cn(
                      "absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-accent-2 transition-all duration-300",
                      isActive
                        ? "scale-0 opacity-0"
                        : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"
                    )}
                  />
                </motion.a>
              );
            })}
          </nav>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="relative z-10 md:hidden w-9 h-9 rounded-full bg-background-soft flex items-center justify-center text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </div>

      <div
        className={cn(
          "md:hidden absolute top-16 left-0 right-0 mx-4 rounded-2xl border border-border/60 overflow-hidden bg-background-deep/95 backdrop-blur-xl shadow-xl transition-all duration-300",
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <motion.nav
          className="flex flex-col gap-2 px-4 py-4"
          variants={mobileListVariants}
          initial="closed"
          animate={mobileOpen ? "open" : "closed"}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                variants={mobileItemVariants}
                className={cn(
                  "text-sm tracking-[0.1em] py-3 px-4 rounded-xl font-bold transition-colors",
                  isActive
                    ? "text-background-deep bg-accent"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {item.label}
              </motion.a>
            );
          })}
        </motion.nav>
      </div>
    </motion.header>
  );
}
