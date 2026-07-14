/**
 * CONFIGURAREA SITE-ULUI — singurul fișier pe care îl editezi pentru
 * brand, domeniu, Cal.com și WhatsApp. Restul site-ului citește de aici.
 *
 * ATENȚIE (verificare de marcă 2026-07-14): numele „Nitor” are conflicte —
 * nitor.com e ocupat din 1997 (Nitor Oy, consultanță digitală, Finlanda),
 * există marcă UE activă „Nitor Brilliance @ work” (cl. 9+42, Nitor Infotech).
 * Dacă owner-ul schimbă numele: editează `brand`, `brandShort`, `domeniu`
 * aici + rulează `npm run assets` (regenerează logo/favicon/og din nou).
 */
export const site = {
  brand: "Nitor Digital",
  brandShort: "Nitor",
  slogan: "Pregătim noi. Aprobați dumneavoastră.",
  oras: "București",
  tara: "România",

  /** URL-ul public al build-ului curent (staging sau producție). */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nitor.ro").replace(/\/$/, ""),

  /** Cine găzduiește build-ul curent — apare în pagina GDPR. */
  gazduire: process.env.NEXT_PUBLIC_HOSTING ?? "Vercel Inc.",

  /** Emailul care primește mesajele din formular (FormSubmit). */
  formEmail: "macminim4agents@proton.me",

  /**
   * Linkul Cal.com, ex. "nitor/apel-15-min". Gol = secțiunea de programare
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
