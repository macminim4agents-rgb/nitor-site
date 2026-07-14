"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, prefersReducedMotion } from "./gsap";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** rise = urcă și apare · lines = textul se dezvăluie pe linii ·
      children = copiii apar în cascadă · fade = doar opacitate */
  effect?: "rise" | "lines" | "children" | "fade";
  delay?: number;
  stagger?: number;
  /** poziția de declanșare ScrollTrigger */
  start?: string;
  id?: string;
};

/**
 * Înveliș de animație la scroll. Regulă de siguranță: stările „ascunse” se
 * setează DOAR din JS (gsap.from) — fără JavaScript, conținutul e complet
 * vizibil, iar la prefers-reduced-motion nu se animă nimic.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  effect = "rise",
  delay = 0,
  stagger = 0.08,
  start = "top 86%",
  id,
}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);

  useEffect(() => {
    const el = ref.current as HTMLElement | null;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      if (effect === "lines") {
        // Split după încărcarea fonturilor, ca liniile să fie cele finale.
        document.fonts.ready.then(() => {
          if (!ref.current) return;
          const split = SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
          });
          gsap.from(split.lines, {
            yPercent: 115,
            duration: 0.85,
            ease: "power4.out",
            stagger: 0.09,
            delay,
            scrollTrigger: { trigger: el, start },
          });
        });
      } else if (effect === "children") {
        gsap.from(el.children, {
          y: 26,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger,
          delay,
          scrollTrigger: { trigger: el, start },
        });
      } else if (effect === "fade") {
        gsap.from(el, {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          delay,
          scrollTrigger: { trigger: el, start },
        });
      } else {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.85,
          ease: "power3.out",
          delay,
          scrollTrigger: { trigger: el, start },
        });
      }
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={ref} className={className} id={id}>
      {children}
    </Tag>
  );
}
