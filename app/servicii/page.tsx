import type { Metadata } from "next";
import { servicii } from "@/content/ro";
import Reveal from "@/components/motion/Reveal";
import ServiceCard from "@/components/ServiceCard";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Servicii — site-uri, SEO, conținut, social media, automatizări",
  description:
    "Catalogul complet: site-uri, SEO tehnic, conținut, social media, video, automatizări, chatbot și programări online. Noi pregătim, dumneavoastră aprobați.",
  alternates: { canonical: "/servicii/" },
};

export default function Servicii() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Catalogul complet</span>
          <Reveal effect="lines" as="h1">
            Servicii
          </Reveal>
          <Reveal>
            <p className="lead">
              Tot ce ține de prezența digitală a unei firme, sub un singur
              acoperiș — cu același principiu peste tot:{" "}
              <strong>noi pregătim, dumneavoastră aprobați</strong>. Nu vă cerem
              texte, poze sau timp; vă cerem doar acordul, pe fiecare material.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="t-catalog">
        <div className="container">
          {/* Titlu doar pentru cititoarele de ecran — vezi .doar-citit din CSS. */}
          <h2 id="t-catalog" className="doar-citit">
            Catalogul de servicii
          </h2>
          <Reveal className="grid cols-4" effect="children" stagger={0.06}>
            {servicii.map((s, i) => (
              <ServiceCard key={s.slug} s={s} i={i} />
            ))}
          </Reveal>
        </div>
      </section>
      <CTABand
        titlu="Nu știți de unde să începeți? De la un apel."
        text="În 15 minute vă spunem ce are sens pentru firma dumneavoastră — și ce nu are. Da, vă spunem și ce NU merită să cumpărați."
      />
    </>
  );
}
