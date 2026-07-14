import type { Metadata } from "next";
import Link from "next/link";
import { servicii, principii, procesPasi } from "@/content/ro";
import { site } from "@/lib/site";
import HeroIntro from "@/components/motion/HeroIntro";
import Assembly from "@/components/motion/Assembly";
import Reveal from "@/components/motion/Reveal";
import ServiceCard from "@/components/ServiceCard";
import CTABand from "@/components/CTABand";
import { IconArrow } from "@/components/Icons";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      {/* ============ HERO ============ */}
      <HeroIntro>
        <section className="hero" aria-labelledby="titlu-hero">
          <div className="hero-glow" aria-hidden="true" />
          <div className="container">
            <span className="eyebrow hero-eyebrow">
              Agenție digitală · {site.oras}
            </span>
            <h1 id="titlu-hero">
              <span className="line">Nu vă cerem texte.</span>
              <span className="line">Nu vă cerem poze.</span>
              <span className="line">
                Nu vă cerem <em className="accent lustre">timp</em>.
              </span>
            </h1>
            <p className="lead">
              Suntem o agenție digitală completă — de la site și SEO până la
              conținut, social media și automatizări. Diferența:{" "}
              <strong>nu vă dăm teme.</strong> Pregătim noi textele, imaginile
              și structura; dumneavoastră doar aprobați. În 7 zile de la acord,
              site-ul dumneavoastră e publicat, cu programare online inclusă.
            </p>
            <div className="hero-ctas">
              <Link className="btn" href="/contact">
                <span>Programați un apel de 15 minute</span>
                <IconArrow className="arr" />
              </Link>
              <Link className="btn btn-ghost" href="/proces">
                <span>Vedeți cum lucrăm</span>
              </Link>
            </div>
            <hr className="hero-rule" />
            <div className="trust">
              <div>
                <b>7 zile</b>
                <small>de la acordul dumneavoastră la site-ul publicat</small>
              </div>
              <div>
                <b>Zero materiale</b>
                <small>
                  cerute de la dumneavoastră — conținutul e responsabilitatea
                  noastră
                </small>
              </div>
              <div>
                <b>O aprobare</b>
                <small>a dumneavoastră, înainte de orice publicare</small>
              </div>
            </div>
          </div>
        </section>
      </HeroIntro>

      {/* ============ SECVENȚA „SE CONSTRUIEȘTE SINGUR” ============ */}
      <Assembly />

      {/* ============ PROBLEMA ============ */}
      <section className="section section-alt" aria-labelledby="titlu-problema">
        <div className="container">
          <span className="eyebrow">De ce durează, de obicei</span>
          <Reveal effect="lines" as="h2" id="titlu-problema">
            Proiectele digitale nu se blochează la tehnologie. Se blochează la
            „trimiteți-ne materialele”.
          </Reveal>
          <Reveal>
            <p className="lead">
              Texte despre servicii, poze, descrieri, logo — orice agenție le
              cere, și puțini clienți au timp să le facă. Săptămâni de așteptare
              vin de acolo, nu din construcție.
            </p>
            <p className="lead">
              Noi am întors procesul: venim noi cu conținutul, pregătit pentru
              firma dumneavoastră, iar dumneavoastră îl aprobați sau cereți
              modificări. Acesta este serviciul, în esență.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ SERVICII ============ */}
      <section className="section" aria-labelledby="titlu-servicii">
        <div className="container">
          <span className="eyebrow">Catalogul complet</span>
          <Reveal effect="lines" as="h2" id="titlu-servicii">
            Tot ce ține de prezența digitală, sub un singur acoperiș.
          </Reveal>
          <Reveal>
            <p className="lead">
              Același principiu peste tot: noi pregătim, dumneavoastră aprobați.
            </p>
          </Reveal>
          <Reveal className="grid cols-4" effect="children" stagger={0.07}>
            {servicii.map((s, i) => (
              <ServiceCard key={s.slug} s={s} i={i} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* ============ PROCES (scurt) ============ */}
      <section className="section section-alt" aria-labelledby="titlu-proces">
        <div className="container">
          <span className="eyebrow">Metoda de lucru</span>
          <Reveal effect="lines" as="h2" id="titlu-proces">
            Cinci pași. Unul singur este al dumneavoastră.
          </Reveal>
          <Reveal className="steps" effect="children" stagger={0.09}>
            {procesPasi.map((p) => (
              <div className="step" key={p.t}>
                <div>
                  <h3>
                    {p.t}
                    {p.alDvs && <span className="badge-dvs">al dumneavoastră</span>}
                  </h3>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal>
            <p style={{ marginTop: "1.6rem" }}>
              <Link className="btn btn-ghost" href="/proces">
                <span>Procesul, pas cu pas</span>
                <IconArrow className="arr" />
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ PRINCIPII ============ */}
      <section className="section" aria-labelledby="titlu-principii">
        <div className="container">
          <span className="eyebrow">Principiile noastre</span>
          <Reveal effect="lines" as="h2" id="titlu-principii">
            De ce să lucrați cu noi
          </Reveal>
          <Reveal className="grid cols-2" effect="children">
            {principii.map((p) => (
              <div className="svc-card" key={p.t}>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CTABand />
    </>
  );
}
