"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";

/**
 * Smooth scroll global (Lenis), sincronizat cu ScrollTrigger.
 * Se dezactivează complet la prefers-reduced-motion.
 */
export default function LenisRoot() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.115, wheelMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
