import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import LenisRoot from "@/components/motion/LenisRoot";

// Importate ca să obținem URL-urile cu hash pe care le generează bundlerul —
// exact aceleași pe care le cere @font-face din globals.css, deci preload-ul
// se potrivește și NU produce o a doua descărcare.
import frauncesLatin from "./fonts/fraunces-latin.woff2";
import frauncesLatinExt from "./fonts/fraunces-latin-ext.woff2";
import interLatin from "./fonts/inter-latin.woff2";
import interLatinExt from "./fonts/inter-latin-ext.woff2";

/**
 * Cele 4 fonturi sunt TOATE necesare deasupra pliului: hero-ul e Fraunces, iar
 * „Nu vă cerem…" conține ă (U+0103) — care e în latin-ext, nu în latin. La fel
 * textul de sub el, în Inter.
 *
 * De ce preload (măsurat pe staging, 2026-07-14): fonturile sunt 257 KB = 50%
 * din transfer, iar fără preload browserul le descoperă abia după ce parsează
 * CSS-ul (~350 ms) și le pune la coadă în spatele a 211 KB de JS. Cum
 * `font-display: swap` repictează textul când fontul sosește, LCP-ul E chiar
 * momentul sosirii — de aici LCP 3.6 s pe mobil. Preload-ul le mută în față,
 * pe prioritate mare; octeții rămân aceiași, dar ajung primii.
 *
 * Folosim `preload()` din react-dom, nu <link> scris de mână: React deduplică
 * pe URL, deci nu ajungem cu două etichete pentru același fișier.
 */
function preloadFonturi() {
  for (const href of [frauncesLatin, frauncesLatinExt, interLatin, interLatinExt]) {
    preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  }
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} — Agenție digitală: site-uri, SEO, conținut, automatizări · ${site.oras}`,
    template: `%s — ${site.brand}`,
  },
  description:
    "Agenție digitală completă. Nu vă cerem texte, poze sau timp: pregătim noi tot — site, conținut, programări online, social media, automatizări — iar dumneavoastră doar aprobați.",
  openGraph: {
    siteName: site.brand,
    locale: "ro_RO",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f3ec",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.brand,
  url: `${site.url}/`,
  logo: `${site.url}/apple-icon.png`,
  slogan: site.slogan,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.oras,
    addressCountry: "RO",
  },
  areaServed: "RO",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  preloadFonturi();
  return (
    <html lang="ro">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body>
        <Header />
        <main id="continut">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <LenisRoot />
      </body>
    </html>
  );
}
