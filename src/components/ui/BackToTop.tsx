"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggle = () => {
      setVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", toggle, { passive: true });
    toggle();

    return () => window.removeEventListener("scroll", toggle);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full border border-border bg-background-soft backdrop-blur-md flex items-center justify-center text-accent hover:bg-accent hover:text-background-deep hover:border-accent transition-all duration-300 shadow-lg shadow-black/20",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
      aria-label="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
