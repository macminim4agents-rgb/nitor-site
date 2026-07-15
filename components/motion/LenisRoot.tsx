"use client";

import { useEffect } from "react";
import { loadMotion, prefersReducedMotion, isMobil } from "./gsap";

/**
 * Smooth scroll global (Lenis), sincronizat cu ScrollTrigger.
 *
 * NU pornește deloc: la prefers-reduced-motion, și pe mobil (unde
 * sistemul are deja inerție nativă — vezi `isMobil`). Pe mobil, nici Lenis
 * nici GSAP nu se descarcă din acest component.
 */
export default function LenisRoot() {
  useEffect(() => {
    if (prefersReducedMotion() || isMobil()) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    Promise.all([loadMotion(), import("lenis")]).then(([{ gsap, ScrollTrigger }, L]) => {
      if (cancelled) return;
      const Lenis = L.default;
      const lenis = new Lenis({ lerp: 0.115, wheelMultiplier: 1 });
      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
