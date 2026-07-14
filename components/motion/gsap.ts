"use client";

/**
 * Punct unic de import pentru GSAP — pluginurile se înregistrează o singură dată.
 * SplitText e inclus gratuit în gsap începând cu 3.13.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/** true dacă utilizatorul a cerut mișcare redusă — atunci nu animăm nimic. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export { gsap, ScrollTrigger, SplitText };
