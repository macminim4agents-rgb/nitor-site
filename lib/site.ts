/**
 * CONFIGURAREA SITE-ULUI — singurul fișier pe care îl editezi pentru
 * brand, domeniu, Cal.com și WhatsApp. Restul site-ului citește de aici.
 *
 * Numele „Qarvenda” a trecut verificarea completă pe 2026-07-14 (vezi D25 în
 * CLAUDE.md): qarvenda.ro + qarvenda.com LIBERE (ROTLD; RDAP Verisign 404 +
 * whois „No match”), ZERO mărci exacte (TMview: qarvenda/karvenda/carvenda/
 * qarvendo/garvenda), zero conflict viu pe cl. 35/42 (singura vecinătate,
 * MARVENDA DE, e expirată din 2008), zero firme active, github.com/qarvenda
 * liber. Numele nu are semnificație — sensul îl poartă semnul (brand/IDENTITY.md).
 *
 * Dacă owner-ul schimbă numele: editează `brand`, `brandShort`, `url` aici +
 * `BRAND_MAIN` în scripts/gen-assets.mjs, apoi rulează `npm run assets`.
 */
export const site = {
  brand: "Qarvenda Digital",
  brandShort: "Qarvenda",
  slogan: "Pregătim noi. Aprobați dumneavoastră.",
  oras: "București",
  tara: "România",

  /** URL-ul public al build-ului curent (staging sau producție). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://qarvenda.ro").replace(/\/$/, ""),

  /** Cine găzduiește build-ul curent — apare în pagina GDPR. */
  gazduire: process.env.NEXT_PUBLIC_HOSTING ?? "Vercel Inc.",

  /** Emailul care primește mesajele din formular (FormSubmit). */
  formEmail: "macminim4agents@proton.me",

  /**
   * Linkul Cal.com, ex. "qarvenda/apel-15-min". Gol = secțiunea de programare
   * arată mesajul de rezervă și trimite vizitatorii la formular.
   * Scriptul Cal.com se încarcă DOAR la click — pagina rămâne rapidă.
   */
  calLink: "",

  /**
   * Numărul de WhatsApp pe care CLIENȚII ne scriu NOUĂ — format internațional,
   * doar cifre (ex. "40712345678"). Gol = butoanele WhatsApp rămân ascunse.
   * E doar un link wa.me — NICIO automatizare de trimitere (decizia D21).
   */
  whatsapp: "",
};

/** Anul din footer — fix la build; site static, se reconstruiește oricum. */
export const anCurent = new Date().getFullYear();
