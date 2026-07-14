import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mulțumim — mesajul a fost trimis",
  description: "Mesajul dumneavoastră a fost trimis. Răspundem în cel mult o zi lucrătoare.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/multumim/" },
};

export default function Multumim() {
  return (
    <section className="page-hero center" style={{ minHeight: "60vh" }}>
      <div className="container">
        <span className="eyebrow">Mesaj trimis</span>
        <h1>Mulțumim.</h1>
        <p className="lead">
          Mesajul dumneavoastră a ajuns la noi. Răspundem în cel mult o zi
          lucrătoare — de obicei mai repede.
        </p>
        <div className="hero-ctas" style={{ justifyContent: "center" }}>
          <Link className="btn" href="/">
            <span>Înapoi la pagina principală</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
