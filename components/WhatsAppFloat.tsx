import { site } from "@/lib/site";
import { IconWhatsApp } from "./Icons";

/**
 * Buton flotant WhatsApp — DOAR un link wa.me către noi (decizia D21,
 * nicio automatizare). Nu se randează deloc cât timp numărul nu e configurat.
 */
export default function WhatsAppFloat() {
  if (!site.whatsapp) return null;
  return (
    <a
      className="wa-float"
      href={`https://wa.me/${site.whatsapp}`}
      rel="noopener"
      target="_blank"
      aria-label="Scrieți-ne pe WhatsApp"
    >
      <IconWhatsApp />
    </a>
  );
}
