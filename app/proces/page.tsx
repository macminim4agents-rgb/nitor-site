import type { Metadata } from "next";
import { procesPasi, principii } from "@/content/ro";
import Reveal from "@/components/motion/Reveal";
import CTABand from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Cum lucrăm — cinci pași, unul singur al dumneavoastră",
  description:
    "Procesul nostru: un apel de 15 minute, noi pregătim tot, previzualizare privată, aprobarea dumneavoastră, publicare în ziua a 7-a. Fără teme de casă.",
  alternates: { canonical: "/proces/" },
};

export default function Proces() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Metoda de lucru</span>
          <Reveal effect="lines" as="h1">
            Cinci pași. Unul singur este al dumneavoastră.
          </Reveal>
          <Reveal>
            <p className="lead">
              Majoritatea proiectelor digitale mor în căsuța de email, la
              „trimiteți-ne materialele”. Procesul nostru e construit ca să nu
              existe acel moment: noi venim cu tot, dumneavoastră veniți cu
              decizia.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <Reveal className="steps" effect="children" stagger={0.09}>
            {procesPasi.map((p) => (
              <div className="step" key={p.t}>
                <div>
                  <h3>
                    {p.t}
                    {p.alDvs && <span className="badge-dvs">al dumneavoastră</span>}
                  </h3>
                  <p>{p.d}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="eyebrow">Garanțiile procesului</span>
          <Reveal effect="lines" as="h2">
            Ce rămâne valabil, orice am construi
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

      <CTABand titlu="Pasul 1 durează 15 minute. Începeți-l azi." />
    </>
  );
}
