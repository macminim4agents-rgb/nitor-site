import Link from "next/link";
import { site, anCurent } from "@/lib/site";
import { servicii } from "@/content/ro";
import { Mark } from "./Icons";

export default function Footer() {
  const psi = `https://pagespeed.web.dev/analysis?url=${encodeURIComponent(site.url + "/")}`;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <span className="brand">
              <Mark size={16} />
              {/* vezi Header.tsx: `{" "}` ține textContent = „Qarvenda Digital" */}
              <span className="brand-word">{site.brandShort}</span>{" "}
              <span className="brand-sub">Digital</span>
            </span>
            <p>
              Agenție digitală · {site.oras}, {site.tara}
              <br />
              {site.slogan}
            </p>
            <p style={{ maxWidth: "34em" }}>
              Acest site e construit cu exact procesul pe care vi-l propunem —{" "}
              <a href={psi} rel="noopener" target="_blank" className="link-line">
                măsurați-i viteza în Google PageSpeed
              </a>
              , instrumentul oficial Google, nu cifrele noastre.
            </p>
          </div>
          <div>
            <h3>Servicii</h3>
            <ul>
              {servicii.map((s) => (
                <li key={s.slug}>
                  <Link href={`/servicii/${s.slug}`}>{s.nume}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Companie</h3>
            <ul>
              <li>
                <Link href="/pachete">Pachete</Link>
              </li>
              <li>
                <Link href="/proces">Cum lucrăm</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/confidentialitate">Politica de confidențialitate</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-meta">
          <span>
            © {anCurent} {site.brand}. Toate drepturile rezervate.
          </span>
          <span>{site.oras} · {site.tara}</span>
        </div>
      </div>
    </footer>
  );
}
