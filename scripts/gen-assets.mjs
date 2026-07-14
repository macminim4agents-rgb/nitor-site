/**
 * Generează identitatea vizuală din surse vectoriale reale:
 *  - brand/logo-light.svg / logo-dark.svg  (lockup complet, text conturat — nu depinde de fonturi)
 *  - brand/logo-mark.svg                   (doar semnul „scânteie")
 *  - app/apple-icon.png (180×180)          (din app/icon.svg)
 *  - public/og.png (1200×630)              (imagine de share)
 *
 * Rulare: npm run assets
 * Dacă se schimbă numele brandului: editează lib/site.ts, apoi rulează din nou.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const BRAND_MAIN = "Qarvenda"; // cuvântul mare, în Fraunces
const BRAND_SUB = "DIGITAL"; // subtitlul letterspaced, în Inter
const INK = "#17171c";
const PAPER = "#f3efe6";
const BRASS = "#a57b2a";
const BRASS_LIGHT = "#c9a45c";
const NIGHT = "#121216";

const fraunces = opentype.loadSync(join(root, "brand/fonts-ttf/fraunces-display.ttf"));
const inter = opentype.loadSync(join(root, "brand/fonts-ttf/inter-medium.ttf"));

/** Conturul unui text, cu tracking opțional (în unități de fontSize). */
function textPath(font, text, x, y, fontSize, tracking = 0) {
  let cursor = x;
  const parts = [];
  for (const ch of text) {
    const glyph = font.charToGlyph(ch);
    const p = glyph.getPath(cursor, y, fontSize);
    parts.push(p.toPathData(2));
    cursor += (glyph.advanceWidth / font.unitsPerEm) * fontSize + tracking * fontSize;
  }
  return { d: parts.join(" "), width: cursor - x - tracking * fontSize };
}

/**
 * Semnul casei — cercul închis de coardă. Arcul (300°) = lucrarea dusă de noi
 * până la capăt; coarda în alamă care închide deschiderea = aprobarea omului,
 * ultimul segment fără de care cercul nu e cerc.
 *
 * Proporțiile sunt normalizate la rază (aceleași ca în components/Icons.tsx,
 * unde r=7.3 pe grila 24): grosime 0.295r, coarda între 18° și 78°.
 * Deliberat NU seamănă cu o literă — cuvântul începe deja cu Q.
 */
const MARK_A1 = 18;
const MARK_A2 = 78;

function markGeometry(cx, cy, r) {
  const v = (n) => Math.round(n * 100) / 100;
  const at = (deg) => {
    const t = (deg * Math.PI) / 180;
    return `${v(cx + r * Math.cos(t))} ${v(cy + r * Math.sin(t))}`;
  };
  const p1 = at(MARK_A1);
  const p2 = at(MARK_A2);
  return {
    width: 0.295 * r,
    // arcul lung (300°), de la capătul de jos al coardei la cel de sus
    arc: `M ${p2} A ${r} ${r} 0 1 1 ${p1}`,
    chord: `M ${p1} L ${p2}`,
  };
}

/** Semnul ca grup SVG: arc în `fg`, coarda în `accent`. */
function markSvg(cx, cy, r, fg, accent) {
  const m = markGeometry(cx, cy, r);
  return `<path d="${m.arc}" fill="none" stroke="${fg}" stroke-width="${m.width}" stroke-linecap="round"/>
  <path d="${m.chord}" fill="none" stroke="${accent}" stroke-width="${m.width}" stroke-linecap="round"/>`;
}

/** Lockup-ul complet: [semn] Qarvenda DIGITAL */
function buildLockup(fg, accent) {
  const size = 100;
  const baseline = 100;
  const markR = 30;
  // Semnul e un cerc: bbox-ul lui e ±(r + w/2) = ±1.1475r în ambele axe.
  const markHalf = 1.1475 * markR;
  const markCx = markHalf + 4;
  const markCy = 62; // centrat optic pe corpul cuvântului
  const textX = markCx + markHalf + 20;

  const main = textPath(fraunces, BRAND_MAIN, textX, baseline, size);
  const subSize = 27;
  const subTracking = 0.34;
  const sub = textPath(inter, BRAND_SUB, textX + main.width + 22, baseline, subSize, subTracking);

  const totalW = Math.ceil(textX + main.width + 22 + sub.width + 8);
  const totalH = 132;

  const mark = markSvg(markCx, markCy, markR, fg, accent);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}" role="img" aria-label="${BRAND_MAIN} ${BRAND_SUB}">
  ${mark}
  <path d="${main.d}" fill="${fg}"/>
  <path d="${sub.d}" fill="${accent}"/>
</svg>`;
  return { svg, totalW, totalH, mainD: main.d, subD: sub.d, mark };
}

mkdirSync(join(root, "brand"), { recursive: true });
mkdirSync(join(root, "public"), { recursive: true });

// 1) Logo-uri SVG (text conturat — se deschid identic oriunde)
const light = buildLockup(INK, BRASS);
const dark = buildLockup(PAPER, BRASS_LIGHT);
writeFileSync(join(root, "brand/logo-light.svg"), light.svg);
writeFileSync(join(root, "brand/logo-dark.svg"), dark.svg);
// Inelul (nu coada) dictează bbox-ul: ±(r + w/2) = ±45.9 pentru r=40 → centru 50.
writeFileSync(
  join(root, "brand/logo-mark.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  ${markSvg(50, 50, 40, INK, BRASS)}
</svg>`
);

// 2) apple-icon.png din favicon-ul SVG
const iconSvg = readFileSync(join(root, "app/icon.svg"));
await sharp(iconSvg, { density: 300 })
  .resize(180, 180)
  .png()
  .toFile(join(root, "app/apple-icon.png"));

// 3) og.png — 1200×630, fundal „night", lockup + mesajul-ancoră
{
  const W = 1200, H = 630;
  const lock = buildLockup(PAPER, BRASS_LIGHT);
  const lockScale = 0.9;
  const lockW = lock.totalW * lockScale;

  const lines = ["Nu vă cerem texte.", "Nu vă cerem poze.", "Nu vă cerem timp."];
  const lineSize = 64;
  const lineGap = 82;
  const startY = 330;
  const linePaths = lines
    .map((l, i) => {
      const p = textPath(fraunces, l, 96, startY + i * lineGap, lineSize);
      const fill = i === 2 ? BRASS_LIGHT : PAPER;
      return `<path d="${p.d}" fill="${fill}"/>`;
    })
    .join("\n  ");

  const subP = textPath(inter, "AGENȚIE DIGITALĂ · BUCUREȘTI", 96, 580, 22, 0.3);

  const og = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${NIGHT}"/>
  <radialGradient id="g" cx="82%" cy="10%" r="75%">
    <stop offset="0%" stop-color="${BRASS}" stop-opacity="0.28"/>
    <stop offset="60%" stop-color="${BRASS}" stop-opacity="0"/>
  </radialGradient>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <g transform="translate(88,72) scale(${lockScale})">
    ${lock.mark}
    <path d="${lock.mainD}" fill="${PAPER}"/>
    <path d="${lock.subD}" fill="${BRASS_LIGHT}"/>
  </g>
  ${linePaths}
  <path d="${subP.d}" fill="#b9b4a6"/>
  <rect x="96" y="606" width="${lockW}" height="0" fill="none"/>
</svg>`;
  await sharp(Buffer.from(og)).png().toFile(join(root, "public/og.png"));
}

console.log("OK: brand/logo-light.svg, brand/logo-dark.svg, brand/logo-mark.svg, app/apple-icon.png, public/og.png");
