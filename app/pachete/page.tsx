import type { Metadata } from "next";
import Link from "next/link";
import { pachete } from "@/content/ro";
import Reveal from "@/components/motion/Reveal";
import CTABand from "@/components/CTABand";
import { IconCheck } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Pachete — Lansare, Lansare + Programări, Prezență continuă",
  description:
    "Trei pachete clare: Lansare (site complet în 7 zile), Lansare + Programări (site cu programări online) și Prezență continuă (abonament lunar). Preț la ofertă, în apelul de 15 minute.",
  alternates: { canonical: "/pachete/" },
};

export default function Pachete() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Cum se cumpără</span>
          <Reveal effect="lines" as="h1">
            Pachete
          </Reveal>
          <Reveal>
            <p className="lead">
              Prețul exact depinde de specificul firmei — îl aflați în apelul de
              15 minute, fără nicio obligație. Ce vă putem promite de pe acum:
              prețul spus la început e prețul de la final, iar tot conținutul e
              inclus — nu există „extra” pentru texte sau imagini.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "1rem" }}>
        <div className="container">
          <Reveal className="grid cols-3" effect="children" stagger={0.09}>
            {pachete.map((p) => (
              <div className={`pack ${p.recomandat ? "featured" : ""}`} key={p.nume}>
                {p.recomandat && <span className="tag">Recomandat</span>}
                <h3>{p.nume}</h3>
                <p className="pack-desc">{p.descriere}</p>
                <ul>
                  {p.include.map((x) => (
                    <li key={x}>
                      <IconCheck />
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <p className="price">Preț la ofertă</p>
                <Link
                  className={`btn ${p.recomandat ? "btn-light" : "btn-ghost"}`}
                  href={`/contact?pachet=${encodeURIComponent(p.nume)}`}
                >
                  <span>Cereți ofertă</span>
                </Link>
              </div>
            ))}
          </Reveal>
          <Reveal>
            <p className="lead" style={{ marginTop: "2rem" }}>
              Video, automatizări și chatbot se pot adăuga oricărui pachet — sau
              se pot contracta separat.{" "}
              <Link href="/contact" className="link-line">
                Întrebați-ne
              </Link>
              .
            </p>
          </Reveal>
          <Reveal>
            <div className="onest">
              <span className="onest-label">Pe șleau</span>
              <p>
                De ce nu afișăm prețuri? Pentru că un site de 5 pagini pentru un
                cabinet nu costă cât unul de 15 pagini cu programări pentru o
                clinică — iar un preț „de la…” care se dublează pe parcurs e
                exact genul de practică pe care nu o facem. În apel primiți o
                cifră exactă, care nu se mai mișcă.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        titlu="Aflați prețul exact în 15 minute."
        text="Fără obligații, fără presiune de vânzare. Dacă nu suntem potriviți pentru firma dumneavoastră, v-o spunem noi primii."
      />
    </>
  );
}
