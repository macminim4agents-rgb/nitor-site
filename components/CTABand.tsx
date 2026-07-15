import Link from "next/link";
import Reveal from "./motion/Reveal";

export default function CTABand({
  titlu = "Un apel de 15 minute. Restul e treaba noastră.",
  text = "Ne spuneți ce face firma dumneavoastră. Vă spunem exact ce am construi și în cât timp; prețul exact vine după apel, în aceeași zi lucrătoare — fără nicio obligație.",
}: {
  titlu?: string;
  text?: string;
}) {
  return (
    <section className="section section-night cta-band">
      <div className="container center">
        <Reveal effect="lines" as="h2">
          {titlu}
        </Reveal>
        <Reveal>
          <p className="lead">{text}</p>
          <div className="hero-ctas">
            <Link className="btn btn-light" href="/contact">
              <span>Programați apelul</span>
            </Link>
            <Link className="btn btn-ghost" href="/proces">
              <span>Vedeți cum lucrăm</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
