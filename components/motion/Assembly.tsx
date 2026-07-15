"use client";

import { useEffect, useRef } from "react";
import { loadMotion, prefersReducedMotion } from "./gsap";

const captions = [
  {
    idx: "Pasul 1 — fără nicio temă pentru dumneavoastră",
    t: "Structura — o facem noi.",
    d: "Paginile, secțiunile, ordinea corectă a informației. Schița site-ului dumneavoastră, gândită de noi.",
  },
  {
    idx: "Pasul 2 — nu vă cerem texte",
    t: "Textele — le scriem noi.",
    d: "Fiecare titlu și fiecare paragraf, scrise în tonul firmei dumneavoastră, cu informații verificate.",
  },
  {
    idx: "Pasul 3 — nu vă cerem poze",
    t: "Imaginile — le pregătim noi.",
    d: "Alese sau create de noi, consecvente cu identitatea firmei. Fără poze de stoc puse la întâmplare.",
  },
  {
    idx: "Pasul 4 — nu vă cerem timp",
    t: "Programările — le conectăm noi.",
    d: "Clienții își aleg singuri ora, direct pe site. Confirmările și reamintirile pleacă automat.",
  },
  {
    idx: "La final",
    t: "De la dumneavoastră: un singur „da”.",
    d: "Nimic nu devine public fără aprobarea dumneavoastră. După ea — site-ul e live, în a 7-a zi.",
  },
];

/**
 * Efectul pentru MOBIL — nu o portare a celui de desktop, ci unul potrivit:
 * fiecare legendă și macheta urcă discret și apar când intră în ecran.
 *
 * Reguli de siguranță (de-asta arată așa, nu altfel):
 *  - **Starea implicită din CSS = tot vizibil.** Efectul se activează abia când
 *    JS pune clasa `assembly-anim` pe secțiune, iar clasa `.va-aparea` pe
 *    fiecare element. Fără JS, la prefers-reduced-motion, sau dacă
 *    IntersectionObserver lipsește — nu se pune nimic și totul rămâne vizibil.
 *    Asta e exact greșeala reparată pe 2026-07-15: înainte, CSS-ul presupunea
 *    că vine JS să facă ordine, iar când nu venea, textele se suprapuneau.
 *  - Zero GSAP, zero pinning: doar IntersectionObserver + tranziții CSS.
 *  - Observer-ul se deconectează după ce fiecare element a apărut o dată
 *    (`unobserve`), deci nu rămâne nimic care să consume la scroll.
 *
 * Întoarce funcția de curățare, ca s-o poată returna useEffect direct.
 */
function mobilReveal(el: HTMLElement): (() => void) | undefined {
  if (typeof IntersectionObserver === "undefined") return;

  const tinte = [...el.querySelectorAll<HTMLElement>(".assembly-caption, .frame")];
  if (!tinte.length) return;

  // Din acest moment CSS-ul are voie să ascundă — JS e sigur activ.
  el.classList.add("assembly-anim");
  tinte.forEach((t) => t.classList.add("va-aparea"));

  const io = new IntersectionObserver(
    (intrari) => {
      for (const i of intrari) {
        if (!i.isIntersecting) continue;
        i.target.classList.add("aparut");
        io.unobserve(i.target); // apare o singură dată; nu re-animăm la scroll înapoi
      }
    },
    // pornim puțin înainte să intre complet, ca mișcarea să se termine în ecran
    { rootMargin: "0px 0px -12% 0px", threshold: 0.15 }
  );
  tinte.forEach((t) => io.observe(t));

  return () => {
    io.disconnect();
    el.classList.remove("assembly-anim");
    tinte.forEach((t) => t.classList.remove("va-aparea", "aparut"));
  };
}

/**
 * Piesa centrală a paginii de start: la scroll, o machetă de site se
 * construiește singură, pas cu pas, în timp ce legendele povestesc procesul.
 * Desktop (≥900px): secvență pinned cu GSAP. Mobil: efectul de mai sus.
 * Fără JS sau la prefers-reduced-motion: totul e vizibil, static.
 */
export default function Assembly() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    // Secvența pinned rulează doar pe ecrane late. Verificăm ÎNAINTE de
    // loadMotion: sub 900px nu descărcăm deloc GSAP din acest component
    // (Assembly e cel mai mare consumator, iar pe mobil n-ar anima nimic).
    // Pe mobil pornim în schimb efectul propriu, ieftin — vezi mobilReveal().
    if (!window.matchMedia("(min-width: 900px)").matches) return mobilReveal(el);

    let cancelled = false;
    let mm: ReturnType<typeof import("gsap").default.matchMedia> | undefined;

    loadMotion().then(({ gsap }) => {
      if (cancelled || !ref.current) return;
      mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const ctx = gsap.context(() => {
      el.classList.add("assembly-ready");
      const q = gsap.utils.selector(el);
      const caps = q(".assembly-caption");
      const frame = q(".frame")[0] as HTMLElement;

      // stările inițiale — doar din JS (fără JS, secțiunea e complet vizibilă)
      gsap.set(caps.slice(1), { autoAlpha: 0, y: 26 });
      gsap.set(q(".sk-head, .sk-line, .sk-cta"), { autoAlpha: 0, x: -16 });
      gsap.set(q(".sk-card"), { autoAlpha: 0, y: 16 });
      gsap.set(q(".sk-media"), { autoAlpha: 0, scale: 0.96 });
      gsap.set(q(".sk-cal"), { autoAlpha: 0 });
      gsap.set(q(".sk-cal i"), { scale: 0 });
      gsap.set(q(".frame-badge"), { autoAlpha: 0, scale: 0.5 });
      gsap.set(frame, { scale: 0.93, y: 26 });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=270%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      const swap = (i: number, at: number) => {
        tl.to(caps[i - 1], { autoAlpha: 0, y: -20, duration: 0.22 }, at);
        tl.to(caps[i], { autoAlpha: 1, y: 0, duration: 0.3 }, at + 0.12);
      };

      // 1 — structura: rama prinde contur, apar blocurile de layout
      tl.to(frame, { scale: 1, y: 0, duration: 0.5 }, 0);
      tl.to(q(".sk-head"), { autoAlpha: 1, x: 0, duration: 0.3 }, 0.25);
      tl.to(q(".sk-card"), { autoAlpha: 1, y: 0, stagger: 0.09, duration: 0.3 }, 0.4);

      // 2 — textele
      swap(1, 0.95);
      tl.to(q(".sk-line"), { autoAlpha: 1, x: 0, stagger: 0.12, duration: 0.3 }, 1.05);
      tl.to(q(".sk-cta"), { autoAlpha: 1, x: 0, duration: 0.28 }, 1.35);

      // 3 — imaginile (cu o trecere de lumină peste bloc)
      swap(2, 1.8);
      tl.to(q(".sk-media"), { autoAlpha: 1, scale: 1, duration: 0.4 }, 1.9);
      tl.call(() => frame.classList.add("shine"), undefined, 2.25);

      // 4 — programările: calendarul se umple
      swap(3, 2.65);
      tl.to(q(".sk-cal"), { autoAlpha: 1, duration: 0.2 }, 2.75);
      tl.to(
        q(".sk-cal i"),
        { scale: 1, stagger: { each: 0.012 }, duration: 0.22, ease: "back.out(2)" },
        2.8
      );

      // final — publicat
      swap(4, 3.45);
      tl.to(
        q(".frame-badge"),
        { autoAlpha: 1, scale: 1, duration: 0.32, ease: "back.out(1.8)" },
        3.55
      );
      tl.to({}, { duration: 0.45 }); // răgaz la final, înainte de unpin

      // bara de progres a secvenței
      tl.to(q(".assembly-progress"), { width: "100%", duration: tl.duration() - 0.001, ease: "none" }, 0);
        }, el);

        return () => {
          ctx.revert();
          el.classList.remove("assembly-ready");
        };
      });
    });

    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, []);

  const calCells = Array.from({ length: 21 }, (_, i) => (
    <i key={i} className={[3, 8, 11, 16, 19].includes(i) ? "on" : undefined} />
  ));

  return (
    <section className="assembly section-night" ref={ref} aria-labelledby="t-assembly">
      {/* Secțiunea n-are titlu vizibil prin design, dar are nevoie de unul: fără
          el, legendele h3 veneau direct după h1 (salt de nivel) și secțiunea era
          fără nume în navigarea pe headinguri. `aria-labelledby` îl refolosește
          ca etichetă, deci nu dublăm textul. */}
      <h2 id="t-assembly" className="doar-citit">
        Cum se construiește un site la noi
      </h2>
      <div className="assembly-stage">
        <div className="container assembly-grid">
          <div className="assembly-captions">
            {captions.map((c) => (
              <div className="assembly-caption" key={c.t}>
                <span className="idx">{c.idx}</span>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </div>
            ))}
          </div>
          <div style={{ position: "relative" }}>
            <div className="frame">
              <div className="frame-bar">
                <i />
                <i />
                <i />
                <div className="frame-url" />
              </div>
              <div className="frame-body">
                <div className="sk sk-head" />
                <div className="sk-row">
                  <div className="sk sk-card" />
                  <div className="sk sk-card" />
                  <div className="sk sk-card" />
                </div>
                <div className="sk sk-line w80" />
                <div className="sk sk-line w65" />
                <div className="sk sk-line w45" />
                <div className="sk sk-cta" />
                <div className="sk sk-media" />
                <div className="sk-cal" aria-hidden="true">
                  {calCells}
                </div>
              </div>
            </div>
            <div className="frame-badge">Publicat · ziua 7</div>
          </div>
        </div>
      </div>
      <div className="assembly-progress" aria-hidden="true" />
    </section>
  );
}
