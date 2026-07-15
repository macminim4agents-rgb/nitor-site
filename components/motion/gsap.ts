"use client";

/**
 * Punct unic de acces la GSAP — încărcat DINAMIC, nu în bundle-ul inițial.
 *
 * De ce dinamic (măsurat pe staging, 2026-07-14): PSI mobil dădea 82 cu
 * TBT = 0 ms. Execuția nu era problema — octeții erau: 521 KB transfer pe
 * 4G simulat (1.6 Mbps) ≈ 2.6 s doar de descărcare, iar JS-ul ajunge și se
 * execută ÎNAINTE de primul paint, deci întârzie FCP fără să apară ca TBT.
 * GSAP + ScrollTrigger + SplitText scoase din calea critică = mai puțini
 * octeți până la paint; animațiile pornesc oricum abia după montare.
 *
 * Contractul rămâne: fără JS (sau la prefers-reduced-motion) totul e vizibil
 * static — stările „ascunse" se setează exclusiv din JS, după ce vine modulul.
 *
 * SplitText e inclus gratuit în gsap începând cu 3.13.
 */

type GsapModule = typeof import("gsap").default;
type ScrollTriggerModule = typeof import("gsap/ScrollTrigger").ScrollTrigger;
type SplitTextModule = typeof import("gsap/SplitText").SplitText;

export type Motion = {
  gsap: GsapModule;
  ScrollTrigger: ScrollTriggerModule;
  SplitText: SplitTextModule;
};

let pending: Promise<Motion> | null = null;

/** Încarcă GSAP o singură dată, oricâți consumatori ar cere-o. */
export function loadMotion(): Promise<Motion> {
  if (!pending) {
    pending = Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("gsap/SplitText"),
    ]).then(([g, st, sp]) => {
      const gsap = g.default;
      gsap.registerPlugin(st.ScrollTrigger, sp.SplitText);
      return { gsap, ScrollTrigger: st.ScrollTrigger, SplitText: sp.SplitText };
    });
  }
  return pending;
}

/** true dacă utilizatorul a cerut mișcare redusă — atunci nu animăm nimic. */
export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * true pe mobil: ecran îngust SAU pointer tactil.
 *
 * ATENȚIE la criteriu — `(pointer: coarse)` singur NU e suficient: Lighthouse
 * emulează mobilul prin dimensiuni + user-agent, dar pointerul rămâne `fine`
 * fiindcă gazda e un desktop. Cu garda pe pointer, animațiile rulau oricum în
 * PSI mobil și LCP-ul rămânea 3.6 s (verificat, 2026-07-14). Lățimea prinde
 * și emularea, și telefoanele reale; pointerul acoperă tabletele late.
 *
 * Unde se folosește: oprim smooth scroll (sistemul are deja inerție nativă,
 * iar Lenis ar dubla-o mai prost) și oprim intrarea hero-ului (ascunde exact
 * elementul LCP — vezi HeroIntro).
 */
export const isMobil = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 899px), (pointer: coarse)").matches;
