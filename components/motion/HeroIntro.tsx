"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Coregrafia de intrare a hero-ului (la încărcare, nu la scroll).
 * Primește markup-ul randat pe server și îl animă după montare —
 * fără JS, hero-ul e pur și simplu vizibil.
 */
export default function HeroIntro({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(el.querySelectorAll("h1 .line"), {
        yPercent: 55,
        opacity: 0,
        duration: 1.05,
        stagger: 0.13,
      })
        .from(
          el.querySelectorAll(".hero-eyebrow"),
          { y: -14, opacity: 0, duration: 0.6 },
          0.1
        )
        .from(
          el.querySelectorAll(".lead, .hero-ctas"),
          { y: 26, opacity: 0, duration: 0.85, stagger: 0.12 },
          "-=0.65"
        )
        .from(
          el.querySelectorAll(".hero-rule"),
          { scaleX: 0, transformOrigin: "left center", duration: 0.9 },
          "-=0.5"
        )
        .from(
          el.querySelectorAll(".trust > div"),
          { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 },
          "-=0.6"
        );
    }, el);

    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}
