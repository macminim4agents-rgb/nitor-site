"use client";

import { useEffect, useRef } from "react";

/**
 * Tranziția între pagini: conținutul nou intră cu un fade + ridicare scurtă.
 * IMPORTANT: după animație scoatem animația de pe element — altfel
 * transform-ul rezidual (fill-mode) ar strica `position: fixed` din
 * secțiunile pinned (ScrollTrigger). Folosim getAnimations()+finished ca să
 * funcționeze și când animația se termină înaintea hidratării.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const done = () => {
      el.style.animation = "none";
    };
    const anims = el.getAnimations();
    if (anims.length === 0) {
      done();
      return;
    }
    Promise.all(anims.map((a) => a.finished.catch(() => {}))).then(done);
  }, []);

  return (
    <div ref={ref} className="page-enter">
      {children}
    </div>
  );
}
