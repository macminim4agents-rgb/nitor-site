import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { servicii } from "@/content/ro";
import { site } from "@/lib/site";
import Reveal from "@/components/motion/Reveal";
import CTABand from "@/components/CTABand";
import { IconCheck, IconPlus, ServiceIcon } from "@/components/Icons";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return servicii.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const s = servicii.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: s.nume,
    description: s.meta,
    alternates: { canonical: `/servicii/${s.slug}/` },
  };
}

export default async function ServiciuPage({ params }: Params) {
  const { slug } = await params;
  const s = servicii.find((x) => x.slug === slug);
  if (!s) notFound();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: s.nume,
      description: s.meta,
      serviceType: s.nume,
      areaServed: "RO",
      provider: { "@type": "Organization", name: site.brand, url: `${site.url}/` },
      url: `${site.url}/servicii/${s.slug}/`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Acasă", item: `${site.url}/` },
        { "@type": "ListItem", position: 2, name: "Servicii", item: `${site.url}/servicii/` },
        { "@type": "ListItem", position: 3, name: s.nume, item: `${site.url}/servicii/${s.slug}/` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="page-hero">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Localizare">
            <Link href="/">Acasă</Link>
            <span className="sep">/</span>
            <Link href="/servicii">Servicii</Link>
            <span className="sep">/</span>
            {s.nume}
          </nav>
          <ServiceIcon name={s.icon} size={36} className="icon" />
          <Reveal effect="lines" as="h1">
            {s.titlu}
          </Reveal>
          <Reveal>
            <p className="lead">{s.lead}</p>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="t-primiti">
        <div className="container">
          <span className="eyebrow">Concret</span>
          <Reveal effect="lines" as="h2" id="t-primiti">
            Ce primiți
          </Reveal>
          <Reveal as="ul" className="check-list two-col" effect="children" stagger={0.05}>
            {s.primiti.map((p) => (
              <li key={p}>
                <IconCheck />
                <span>{p}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section" aria-labelledby="t-pasi">
        <div className="container">
          <span className="eyebrow">Cum decurge</span>
          <Reveal effect="lines" as="h2" id="t-pasi">
            Pas cu pas
          </Reveal>
          <Reveal className="steps" effect="children" stagger={0.08}>
            {s.pasi.map((p) => (
              <div className="step" key={p.t}>
                <div>
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal>
            <div className="onest" style={{ marginTop: "2.2rem" }}>
              <span className="onest-label">Pe șleau</span>
              <p>{s.onest}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="t-faq">
        <div className="container">
          <span className="eyebrow">Întrebări frecvente</span>
          <Reveal effect="lines" as="h2" id="t-faq">
            Probabil vă întrebați…
          </Reveal>
          <Reveal className="faq" effect="children" stagger={0.06}>
            {s.faq.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <span className="plus">
                    <IconPlus />
                  </span>
                </summary>
                <div className="faq-a">{f.a}</div>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      <CTABand
        titlu={`Vreți ${s.nume.toLowerCase()} fără nicio temă de casă?`}
        text="Programați un apel de 15 minute — vă spunem exact ce am face pentru firma dumneavoastră, în cât timp și cu ce preț."
      />
    </>
  );
}
