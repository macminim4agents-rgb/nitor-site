/**
 * Generează kitul de logo pentru rețele sociale și uz general.
 *
 * Rulare:  npm run kit            (scrie în ~/Desktop/Qarvenda-Logo-Kit)
 *          node scripts/gen-kit.mjs /alta/cale
 *
 * DECIZII DE DESIGN (ca să nu fie rescrise din greșeală):
 *  - **Pozele de profil = DOAR semnul, fără cuvânt.** În lista de chat de pe
 *    WhatsApp avatarul are ~40 px; un cuvânt de 8 litere e ilizibil acolo, iar
 *    un logo ilizibil arată ca o pată. Semnul singur rămâne recognoscibil.
 *  - **Decupare circulară.** WhatsApp, Facebook, Instagram și LinkedIn taie
 *    avatarul în cerc. Cercul înscris într-un pătrat are raza 50% din latură,
 *    deci tot ce e dincolo de 50% de la centru DISPARE. Semnul e desenat la
 *    rază 30% (marginea exterioară ajunge la ~34%), deci are aer și nu-l taie
 *    nimic. Fundalul e „full bleed" — după decupare nu rămân colțuri goale.
 *  - **Fundal închis implicit.** Semnul are contrast mare pe night și se vede
 *    și pe temele deschise, și pe cele întunecate ale aplicațiilor.
 */
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import sharp from "sharp";
import { C, markSvg, lockup, textPath, textWidth, fraunces, inter, MARK_HALF } from "./brand-core.mjs";

const DEST = process.argv[2] ?? join(homedir(), "Desktop", "Qarvenda-Logo-Kit");

const svg = (w, h, body, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${
    bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : ""
  }${body}</svg>`;

const scrie = async (cale, sursa, { png = true } = {}) => {
  mkdirSync(join(DEST, cale.split("/").slice(0, -1).join("/")), { recursive: true });
  const p = join(DEST, cale);
  if (png) await sharp(Buffer.from(sursa), { density: 400 }).png({ compressionLevel: 9 }).toFile(p);
  else writeFileSync(p, sursa);
  return cale;
};

const facute = [];
const log = (c) => { facute.push(c); console.log("  " + c); };

// ─────────────────────────────────────────────────────────────────────────────
// 1. AVATAR — semnul singur, sigur la decupare circulară
// ─────────────────────────────────────────────────────────────────────────────
function avatar(px, bg, fg, accent) {
  const r = px * 0.3; // marginea exterioară ajunge la ~34% < 50% (cercul înscris)
  return svg(px, px, markSvg(px / 2, px / 2, r, fg, accent), bg);
}
const avatarNoapte = (px) => avatar(px, C.night, C.paperOnNight, C.brassLight);
const avatarIvoriu = (px) => avatar(px, C.paper, C.ink, C.brass);

// ─────────────────────────────────────────────────────────────────────────────
// 2. PÂNZE cu lockup centrat (postări, covere)
// ─────────────────────────────────────────────────────────────────────────────
/** Lockup centrat pe o pânză, la o lățime-țintă (procent din pânză). */
function panzaLockup(w, h, { bg, fg, accent, latimeLockup = 0.62, subtitlu, subColor, sus = 0.5 }) {
  const l = lockup({ size: 100, fg, accent });
  const scala = (w * latimeLockup) / l.width;
  const lw = l.width * scala;
  const lh = l.height * scala;
  const x = (w - lw) / 2;
  const y = h * sus - lh / 2;

  let extra = "";
  if (subtitlu) {
    const s = Math.round(w * 0.021);
    const tw = textWidth(inter, subtitlu, s, 0.3);
    const t = textPath(inter, subtitlu, (w - tw) / 2, y + lh + s * 2.6, s, 0.3);
    extra = `<path d="${t.d}" fill="${subColor ?? C.mutedOnNight}"/>`;
  }
  return svg(
    w,
    h,
    `<g transform="translate(${x},${y}) scale(${scala})">${l.body}</g>${extra}`,
    bg
  );
}

/** Postare/story cu mesajul-ancoră pe trei rânduri. */
function panzaMesaj(w, h, { bg = C.night } = {}) {
  const l = lockup({ size: 100, fg: C.paperOnNight, accent: C.brassLight });
  const scala = (w * 0.5) / l.width;
  const marg = w * 0.09;

  const linii = ["Nu vă cerem texte.", "Nu vă cerem poze.", "Nu vă cerem timp."];
  const ls = Math.round(w * 0.082);
  const gap = ls * 1.34;
  const startY = h * 0.5 - gap;
  const cai = linii
    .map((t, i) => {
      const p = textPath(fraunces, t, marg, startY + i * gap, ls);
      return `<path d="${p.d}" fill="${i === 2 ? C.brassLight : C.paperOnNight}"/>`;
    })
    .join("\n  ");

  const ss = Math.round(w * 0.022);
  const sub = textPath(inter, "AGENȚIE DIGITALĂ · BUCUREȘTI", marg, h - marg, ss, 0.3);

  return svg(
    w,
    h,
    `<radialGradient id="g" cx="82%" cy="8%" r="70%">
      <stop offset="0%" stop-color="${C.brass}" stop-opacity="0.3"/>
      <stop offset="60%" stop-color="${C.brass}" stop-opacity="0"/>
    </radialGradient>
    <rect width="${w}" height="${h}" fill="url(#g)"/>
    <g transform="translate(${marg},${marg}) scale(${scala})">${l.body}</g>
    ${cai}
    <path d="${sub.d}" fill="${C.mutedOnNight}"/>`,
    bg
  );
}

// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  rmSync(DEST, { recursive: true, force: true });
  mkdirSync(DEST, { recursive: true });
  console.log("Generez kitul în:", DEST, "\n");

  console.log("WhatsApp:");
  await scrie("WhatsApp/whatsapp-poza-profil-640.png", avatarNoapte(640)).then(log);
  await scrie("WhatsApp/whatsapp-poza-profil-1024.png", avatarNoapte(1024)).then(log);

  console.log("\nFacebook:");
  await scrie("Facebook/facebook-poza-profil-1024.png", avatarNoapte(1024)).then(log);
  await scrie("Facebook/facebook-cover-1640x664.png",
    panzaLockup(1640, 664, { bg: C.night, fg: C.paperOnNight, accent: C.brassLight, latimeLockup: 0.44, subtitlu: "PREGĂTIM NOI. APROBAȚI DUMNEAVOASTRĂ.", sus: 0.46 })).then(log);
  await scrie("Facebook/facebook-imagine-partajare-1200x630.png", panzaMesaj(1200, 630)).then(log);

  console.log("\nInstagram:");
  await scrie("Instagram/instagram-poza-profil-1024.png", avatarNoapte(1024)).then(log);
  await scrie("Instagram/instagram-postare-1080x1080.png", panzaMesaj(1080, 1080)).then(log);
  await scrie("Instagram/instagram-story-1080x1920.png", panzaMesaj(1080, 1920)).then(log);

  console.log("\nLinkedIn:");
  await scrie("LinkedIn/linkedin-logo-400.png", avatarNoapte(400)).then(log);
  await scrie("LinkedIn/linkedin-cover-1128x191.png",
    panzaLockup(1128, 191, { bg: C.night, fg: C.paperOnNight, accent: C.brassLight, latimeLockup: 0.34, sus: 0.5 })).then(log);

  console.log("\nLogo — SVG (vector, pentru tipar și agenții):");
  const lLight = lockup({ size: 100, fg: C.ink, accent: C.brass });
  const lDark = lockup({ size: 100, fg: C.paperOnNight, accent: C.brassLight });
  await scrie("Logo/SVG-vector/qarvenda-logo-fundal-deschis.svg",
    svg(Math.ceil(lLight.width), Math.ceil(lLight.height), lLight.body), { png: false }).then(log);
  await scrie("Logo/SVG-vector/qarvenda-logo-fundal-inchis.svg",
    svg(Math.ceil(lDark.width), Math.ceil(lDark.height), lDark.body), { png: false }).then(log);
  await scrie("Logo/SVG-vector/qarvenda-semn.svg",
    svg(100, 100, markSvg(50, 50, 40, C.ink, C.brass)), { png: false }).then(log);
  await scrie("Logo/SVG-vector/qarvenda-semn-fundal-inchis.svg",
    svg(100, 100, markSvg(50, 50, 40, C.paperOnNight, C.brassLight)), { png: false }).then(log);

  console.log("\nLogo — PNG cu fundal TRANSPARENT (documente, semnătură email):");
  for (const px of [500, 1000, 2000]) {
    const s = px / lLight.width;
    await scrie(`Logo/PNG-transparent/qarvenda-logo-inchis-la-culoare-${px}.png`,
      svg(Math.ceil(lLight.width * s), Math.ceil(lLight.height * s), `<g transform="scale(${s})">${lLight.body}</g>`)).then(log);
    await scrie(`Logo/PNG-transparent/qarvenda-logo-alb-${px}.png`,
      svg(Math.ceil(lDark.width * s), Math.ceil(lDark.height * s), `<g transform="scale(${s})">${lDark.body}</g>`)).then(log);
  }

  console.log("\nSemn singur — PNG transparent:");
  for (const px of [256, 512, 1024]) {
    await scrie(`Logo/Semn-transparent/qarvenda-semn-inchis-${px}.png`,
      svg(px, px, markSvg(px / 2, px / 2, px * 0.435, C.ink, C.brass))).then(log);
    await scrie(`Logo/Semn-transparent/qarvenda-semn-alb-${px}.png`,
      svg(px, px, markSvg(px / 2, px / 2, px * 0.435, C.paperOnNight, C.brassLight))).then(log);
  }

  console.log("\nAvatar pe fundal ivoriu (variantă):");
  await scrie("Logo/Avatar-ivoriu/qarvenda-avatar-ivoriu-1024.png", avatarIvoriu(1024)).then(log);

  console.log("\nCulori:");
  await scrie("Culori-si-fonturi/paleta.png", paleta()).then(log);

  writeFileSync(join(DEST, "CITEȘTE-MĂ.md"), readme());
  log("CITEȘTE-MĂ.md");
  console.log(`\n${facute.length} fișiere. Kit gata: ${DEST}`);
}

/** Fișă vizuală cu paleta + hex-urile. */
function paleta() {
  const w = 1400, h = 620;
  const culori = [
    ["Ink", C.ink, "text principal, semnul pe fundal deschis"],
    ["Night", C.night, "fundaluri închise, avatar"],
    ["Paper", C.paper, "fundal deschis"],
    ["Brass", C.brass, "accent — coarda semnului"],
    ["Brass deschis", C.brassLight, "accent pe fundal închis"],
  ];
  const cw = 240, ch = 240, gap = 26;
  const x0 = 60, y0 = 190;
  const t = textPath(fraunces, "Culorile Qarvenda", x0, 110, 54);
  let body = `<path d="${t.d}" fill="${C.ink}"/>`;
  culori.forEach(([nume, hex, uz], i) => {
    const x = x0 + i * (cw + gap);
    const n = textPath(inter, nume, x, y0 + ch + 42, 24);
    const hx = textPath(inter, hex.toUpperCase(), x, y0 + ch + 74, 22, 0.06);
    const u = textPath(inter, uz.length > 26 ? uz.slice(0, 25) + "…" : uz, x, y0 + ch + 104, 16);
    body += `<rect x="${x}" y="${y0}" width="${cw}" height="${ch}" rx="10" fill="${hex}" stroke="${C.ink}" stroke-opacity="0.12"/>
      <path d="${n.d}" fill="${C.ink}"/><path d="${hx.d}" fill="${C.brass}"/><path d="${u.d}" fill="${C.ink}" fill-opacity="0.6"/>`;
  });
  return svg(w, h, body, C.paper);
}

function readme() {
  return `# Qarvenda Digital — kit de logo

Generat automat din sursele de identitate ale site-ului
(\`qarvenda-site/scripts/gen-kit.mjs\`). Dacă se schimbă logo-ul, se regenerează
cu \`npm run kit\` — nu edita fișierele de aici manual, se pierd.

## Ce pui, unde

| Unde | Fișier |
|---|---|
| **WhatsApp Business** — poză de profil | \`WhatsApp/whatsapp-poza-profil-640.png\` |
| **Facebook** — poză de profil pagină | \`Facebook/facebook-poza-profil-1024.png\` |
| **Facebook** — cover pagină | \`Facebook/facebook-cover-1640x664.png\` |
| **Facebook** — imagine la partajare link | \`Facebook/facebook-imagine-partajare-1200x630.png\` |
| **Instagram** — poză de profil | \`Instagram/instagram-poza-profil-1024.png\` |
| **Instagram** — postare (pătrat) | \`Instagram/instagram-postare-1080x1080.png\` |
| **Instagram** — story / reel | \`Instagram/instagram-story-1080x1920.png\` |
| **LinkedIn** — logo firmă | \`LinkedIn/linkedin-logo-400.png\` |
| **LinkedIn** — cover pagină | \`LinkedIn/linkedin-cover-1128x191.png\` |
| **Documente, semnătură email, facturi** | \`Logo/PNG-transparent/\` |
| **Tipar, plăcuțe, agenții de print** | \`Logo/SVG-vector/\` — vectorial, se scalează oricât fără pixeli |

## De ce avatarul e doar semnul, fără cuvânt

În lista de chat de pe WhatsApp, poza de profil are ~40 px. Un cuvânt de opt
litere acolo e o pată gri, nu un logo. Semnul singur rămâne recognoscibil de la
16 px în sus. Cuvântul apare oriunde ai spațiu: cover, postări, documente.

## Decuparea circulară — de ce e important

WhatsApp, Facebook, Instagram și LinkedIn taie poza de profil **în cerc**. Tot
ce e în colțuri dispare. Avatarele din kit sunt deja desenate pentru asta:
semnul e centrat, cu aer în jur, iar fundalul acoperă toată suprafața — după
decupare nu rămân colțuri goale. **Nu le decupa și nu le încadra tu** — pierzi
marginea de siguranță.

## Reguli scurte

- **Nu întinde logo-ul.** Scalează proporțional, mereu.
- **Nu-i schimba culorile.** Coarda e MEREU alamă — pe orice fundal.
- **Nu-l pune pe fundaluri agitate.** Fotografie sub logo = ilizibil. Folosește
  ivoriu (#F6F3EC) sau night (#121216).
- **Spațiu liber în jur:** cel puțin cât diametrul semnului, pe toate laturile.
- **Dimensiune minimă pentru lockup** (semn + cuvânt): 120 px lățime. Sub atât,
  folosește doar semnul.
- Fundal deschis → varianta „inchis-la-culoare". Fundal închis → varianta „alb".

## Culori

| Nume | Hex | Unde |
|---|---|---|
| Ink | \`#17171C\` | text principal, semnul pe fundal deschis |
| Night | \`#121216\` | fundaluri închise, avatar |
| Paper | \`#F6F3EC\` | fundal deschis |
| Brass | \`#A57B2A\` | accent — coarda semnului, pe fundal deschis |
| Brass deschis | \`#C9A45C\` | accent — coarda semnului, pe fundal închis |

Fișă vizuală: \`Culori-si-fonturi/paleta.png\`

## Fonturi

- **Fraunces** — titluri, cuvântul „Qarvenda". Licență SIL OFL (gratuită,
  inclusiv comercial). https://fonts.google.com/specimen/Fraunces
- **Inter** — text, „DIGITAL". Licență SIL OFL.
  https://fonts.google.com/specimen/Inter

Logo-urile din kit au textul **conturat** (transformat în forme), deci se deschid
identic oriunde, chiar dacă fonturile nu-s instalate.

## Notă onestă despre dimensiuni

Platformele își schimbă specificațiile des. Fișierele de aici sunt la rezoluție
generoasă și se redimensionează singure la încărcare — nu trebuie să potrivești
tu pixelii. Dacă vreo platformă refuză un fișier, spune-mi dimensiunea cerută și
regenerez.
`;
}

main();
