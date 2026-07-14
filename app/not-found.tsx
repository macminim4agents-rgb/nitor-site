import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero center" style={{ minHeight: "60vh" }}>
      <div className="container">
        <span className="eyebrow">Eroare 404</span>
        <h1>Pagina asta nu există.</h1>
        <p className="lead">
          Linkul e greșit sau pagina a fost mutată. Nimic grav — totul e la un
          click distanță.
        </p>
        <div className="hero-ctas" style={{ justifyContent: "center" }}>
          <Link className="btn" href="/">
            <span>Pagina principală</span>
          </Link>
          <Link className="btn btn-ghost" href="/servicii">
            <span>Serviciile noastre</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
