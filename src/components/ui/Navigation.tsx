"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "MEMBERS", href: "#members" },
  { label: "GUESTBOOK", href: "#guestbook" },
  { label: "CONTACT", href: "#contact" },
];

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
    <header className="fixed top-4 left-4 right-4 z-50">
      <div className="max-w-5xl mx-auto bg-background-deep/80 backdrop-blur-xl rounded-full border border-border/60 px-4 md:px-6 h-14 flex items-center justify-between shadow-lg shadow-black/20">
        <Link
          href="#top"
          className="text-sm tracking-[0.15em] font-black text-white"
        >
          告别宣言
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-white/10 rounded-full px-1.5 py-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-1.5 text-[11px] tracking-[0.05em] rounded-full transition-all duration-300 font-bold",
                  isActive
                    ? "text-background-deep bg-accent"
                    : "text-white/70 hover:text-white"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <button
          className="md:hidden w-9 h-9 rounded-full bg-background-soft flex items-center justify-center text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div
        className={cn(
          "md:hidden absolute top-16 left-0 right-0 bg-background-deep/95 backdrop-blur-xl rounded-2xl border border-border/60 overflow-hidden transition-all duration-300 mx-4 shadow-xl",
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="flex flex-col px-4 py-4 gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "text-sm tracking-[0.1em] py-3 px-4 rounded-xl font-bold transition-colors",
                  isActive
                    ? "text-background-deep bg-accent"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
