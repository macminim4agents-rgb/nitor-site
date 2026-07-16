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

  /**
   * Emailul care primește mesajele din formular (FormSubmit).
   * DE ÎNLOCUIT după activarea FormSubmit cu aliasul lor („el/xxxxx"):
   * adresa scrisă aici ajunge în bundle-ul public, unde o culeg roboții
   * de spam; aliasul o ascunde. Vezi site/README.md.
   */
  formEmail: "contact@qarvenda.ro",

  /**
   * Contul Cal — DOAR slug-ul, nu URL-ul întreg. Gol = secțiunea de programare
   * arată mesajul de rezervă și trimite vizitatorii la formular.
   * Scriptul Cal se încarcă DOAR la click — pagina rămâne rapidă.
   *
   * Ținta e evenimentul de 15 min, nu profilul „qarvenda": profilul oferă și
   * „30 min meeting", iar TOT textul site-ului promite un apel de 15 minute.
   * Slug verificat pe cal.eu 2026-07-15.
   */
  calLink: "qarvenda/15min",

  /**
   * Instanța Cal care găzduiește contul. `https://cal.eu` = instanța oficială
   * Cal.com cu date în UE („The Cal.com Experience, Now Hosted in Europe" —
   * verificat 2026-07-15); pe un cont cal.com clasic ar fi `https://cal.com`.
   * Contează pentru pagina GDPR: datele de programare rămân în UE.
   */
  calOrigin: "https://cal.eu",

  /** Scriptul de embed al instanței de mai sus (app.cal.eu ≠ app.cal.com). */
  calEmbedScript: "https://app.cal.eu/embed/embed.js",

  /**
   * Numărul de WhatsApp pe care CLIENȚII ne scriu NOUĂ — format internațional,
   * doar cifre, fără „+" (wa.me îl refuză). Gol = butoanele rămân ascunse.
   * E doar un link wa.me — NICIO automatizare de trimitere (decizia D21).
   */
  whatsapp: "40758414190",
};

/** Anul din footer — fix la build; site static, se reconstruiește oricum. */
export const anCurent = new Date().getFullYear();
