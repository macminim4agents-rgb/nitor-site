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

const BRAND_MAIN = "Nitor"; // cuvântul mare, în Fraunces
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

/** Semnul „scânteie" (nitor, lat. = strălucire) — patru vârfuri concave.
    Coeficienții vin din forma originală (Icons.tsx / Gleam), normalizată. */
function gleamPath(cx, cy, r) {
  const a = 0.087 * r; // cât de aproape de axă e primul punct de control
  const b = 0.385 * r; // cât de departe de vârf e curbura
  const f = (x, y) => `${Math.round(x * 100) / 100} ${Math.round(y * 100) / 100}`;
  return [
    `M ${f(cx, cy - r)}`,
    `C ${f(cx + a, cy - b)} ${f(cx + b, cy - a)} ${f(cx + r, cy)}`,
    `C ${f(cx + b, cy + a)} ${f(cx + a, cy + b)} ${f(cx, cy + r)}`,
    `C ${f(cx - a, cy + b)} ${f(cx - b, cy + a)} ${f(cx - r, cy)}`,
    `C ${f(cx - b, cy - a)} ${f(cx - a, cy - b)} ${f(cx, cy - r)}`,
    "Z",
  ].join(" ");
}

/** Lockup-ul complet: [scânteie] Nitor DIGITAL */
function buildLockup(fg, accent) {
  const size = 100;
  const baseline = 100;
  const gleamR = 34;
  const gleamCx = gleamR + 4;
  const gleamCy = baseline - 36; // centrat pe înălțimea literelor mici+
  const textX = gleamCx + gleamR + 18;

  const main = textPath(fraunces, BRAND_MAIN, textX, baseline, size);
  const subSize = 27;
  const subTracking = 0.34;
  const sub = textPath(inter, BRAND_SUB, textX + main.width + 22, baseline, subSize, subTracking);

  const totalW = Math.ceil(textX + main.width + 22 + sub.width + 8);
  const totalH = 132;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalW} ${totalH}" role="img" aria-label="${BRAND_MAIN} ${BRAND_SUB}">
  <path d="${gleamPath(gleamCx, gleamCy, gleamR)}" fill="${accent}"/>
  <path d="${main.d}" fill="${fg}"/>
  <path d="${sub.d}" fill="${accent}"/>
</svg>`;
  return { svg, totalW, totalH, mainD: main.d, subD: sub.d, gleam: gleamPath(gleamCx, gleamCy, gleamR) };
}

mkdirSync(join(root, "brand"), { recursive: true });
mkdirSync(join(root, "public"), { recursive: true });

// 1) Logo-uri SVG (text conturat — se deschid identic oriunde)
const light = buildLockup(INK, BRASS);
const dark = buildLockup(PAPER, BRASS_LIGHT);
writeFileSync(join(root, "brand/logo-light.svg"), light.svg);
writeFileSync(join(root, "brand/logo-dark.svg"), dark.svg);
writeFileSync(
  join(root, "brand/logo-mark.svg"),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><path d="${gleamPath(50, 50, 46)}" fill="${BRASS}"/></svg>`
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
    <path d="${lock.gleam}" fill="${BRASS_LIGHT}"/>
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
