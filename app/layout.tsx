import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import LenisRoot from "@/components/motion/LenisRoot";

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
