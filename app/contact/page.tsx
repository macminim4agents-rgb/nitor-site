import type { Metadata } from "next";
import { Suspense } from "react";
import { site } from "@/lib/site";
import Reveal from "@/components/motion/Reveal";
import ContactForm from "@/components/ContactForm";
import CalBooking from "@/components/CalBooking";

export const metadata: Metadata = {
  title: "Contact — programați un apel de 15 minute",
  description:
    "Programați un apel gratuit de 15 minute sau scrieți-ne prin formular. Răspundem în cel mult o zi lucrătoare. București, România.",
  alternates: { canonical: "/contact/" },
};

export default function Contact() {
  return (
    <>
      <section className="page-hero center">
        <div className="container">
          <span className="eyebrow">Primul pas</span>
          <Reveal effect="lines" as="h1">
            Programați un apel de 15 minute
          </Reveal>
          <Reveal>
            <p className="lead">
              Ne spuneți ce face firma dumneavoastră; vă spunem exact ce am
              construi, în cât timp și cu ce preț. Gratuit, fără obligații —
              folosim exact sistemul de programări pe care îl instalăm
              clienților noștri.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-label="Programare online">
        <div className="container">
          <CalBooking />
        </div>
      </section>

      <section className="section section-alt" id="formular" aria-labelledby="t-contact">
        <div className="container">
          <div className="center">
            <span className="eyebrow">Sau în scris</span>
            <Reveal effect="lines" as="h2" id="t-contact">
              Scrieți-ne
            </Reveal>
            <Reveal>
              <p className="lead">Răspundem în cel mult o zi lucrătoare.</p>
            </Reveal>
          </div>
          <Reveal>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </Reveal>
          {site.whatsapp && (
            <p className="alt-contact">
              Preferați WhatsApp?{" "}
              <a href={`https://wa.me/${site.whatsapp}`} rel="noopener" target="_blank">
                Scrieți-ne direct
              </a>{" "}
              — același timp de răspuns.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
