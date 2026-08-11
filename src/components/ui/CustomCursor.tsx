"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);

      gsap.to(dotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: "power2.out",
      });

      gsap.to(ringRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    const onElementHover = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const isSmall = target.dataset.cursor === "small";

      gsap.to(ringRef.current, {
        scale: isSmall ? 1.5 : 2.5,
        opacity: isSmall ? 0.5 : 0.8,
        duration: 0.25,
        ease: "back.out(1.7)",
      });

      gsap.to(dotRef.current, {
        scale: isSmall ? 0.6 : 1.4,
        duration: 0.25,
      });
    };

    const onElementLeave = () => {
      gsap.to(ringRef.current, {
        scale: 1,
        opacity: 0.4,
        duration: 0.25,
      });

      gsap.to(dotRef.current, {
        scale: 1,
        duration: 0.25,
      });
    };

    const interactiveSelectors = "a, button, [role='button'], input, textarea, select, [data-cursor]";

    const attachListeners = () => {
      const elements = document.querySelectorAll(interactiveSelectors);
      elements.forEach((el) => {
        el.addEventListener("mouseenter", onElementHover);
        el.addEventListener("mouseleave", onElementLeave);
      });
      return elements;
    };

    let interactiveElements = attachListeners();

    const observer = new MutationObserver(() => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onElementHover);
        el.removeEventListener("mouseleave", onElementLeave);
      });
      interactiveElements = attachListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", onElementHover);
        el.removeEventListener("mouseleave", onElementLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full bg-accent pointer-events-none z-[9998]"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: "translate(0px, 0px)",
          boxShadow: "0 0 10px rgba(45, 212, 191, 0.6)",
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 -ml-[18px] -mt-[18px] rounded-full border-2 border-accent/60 pointer-events-none z-[9997]"
        style={{
          opacity: isVisible ? 0.4 : 0,
          transform: "translate(0px, 0px) scale(1)",
        }}
      />
    </>
  );
}
