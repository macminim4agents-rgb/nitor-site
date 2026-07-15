/**
 * Sursa unică pentru geometria mărcii și pentru desenarea textului conturat.
 * O folosesc `gen-assets.mjs` (identitatea site-ului) și `gen-kit.mjs` (kitul
 * pentru rețele sociale). A treia copie a geometriei trăiește în
 * `components/Icons.tsx` (componenta React) — dacă schimbi forma, schimbi în
 * ambele locuri. Vezi brand/IDENTITY.md.
 */
import opentype from "opentype.js";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/** Paleta — trebuie să rămână sincronă cu app/globals.css și IDENTITY.md. */
export const C = {
  ink: "#17171c",
  paper: "#f6f3ec",
  paperOnNight: "#f3efe6",
  night: "#121216",
  brass: "#a57b2a",
  brassLight: "#c9a45c",
  mutedOnNight: "#b9b4a6",
};

export const fraunces = opentype.loadSync(join(ROOT, "brand/fonts-ttf/fraunces-display.ttf"));
export const inter = opentype.loadSync(join(ROOT, "brand/fonts-ttf/inter-medium.ttf"));

/** Conturul unui text, cu tracking opțional (în unități de fontSize). */
export function textPath(font, text, x, y, fontSize, tracking = 0) {
  let cursor = x;
  const parts = [];
  for (const ch of text) {
    const glyph = font.charToGlyph(ch);
    parts.push(glyph.getPath(cursor, y, fontSize).toPathData(2));
    cursor += (glyph.advanceWidth / font.unitsPerEm) * fontSize + tracking * fontSize;
  }
  return { d: parts.join(" "), width: cursor - x - tracking * fontSize };
}

/** Lățimea unui text, fără să-l desenăm. */
export function textWidth(font, text, fontSize, tracking = 0) {
  let w = 0;
  for (const ch of text) {
    w += (font.charToGlyph(ch).advanceWidth / font.unitsPerEm) * fontSize + tracking * fontSize;
  }
  return w - tracking * fontSize;
}

/**
 * Semnul: cercul închis de coardă. Arcul de 300° = lucrarea dusă până la capăt;
 * coarda în alamă = aprobarea omului. Proporții normalizate la rază — identice
 * cu components/Icons.tsx (r=7.3 pe grila 24) și cu IDENTITY.md.
 */
export const MARK_A1 = 18;
export const MARK_A2 = 78;
/** Bbox-ul semnului e cel al cercului: ±(r + grosime/2) = ±1.1475·r. */
export const MARK_HALF = 1.1475;

export function markGeometry(cx, cy, r) {
  const v = (n) => Math.round(n * 100) / 100;
  const at = (deg) => {
    const t = (deg * Math.PI) / 180;
    return `${v(cx + r * Math.cos(t))} ${v(cy + r * Math.sin(t))}`;
  };
  const p1 = at(MARK_A1);
  const p2 = at(MARK_A2);
  return {
    width: 0.295 * r,
    arc: `M ${p2} A ${r} ${r} 0 1 1 ${p1}`,
    chord: `M ${p1} L ${p2}`,
  };
}

/** Semnul ca grup SVG: arc în `fg`, coarda în `accent`. */
export function markSvg(cx, cy, r, fg, accent) {
  const m = markGeometry(cx, cy, r);
  return `<path d="${m.arc}" fill="none" stroke="${fg}" stroke-width="${m.width}" stroke-linecap="round"/>
  <path d="${m.chord}" fill="none" stroke="${accent}" stroke-width="${m.width}" stroke-linecap="round"/>`;
}

/**
 * Lockup-ul [semn] Qarvenda DIGITAL, desenat de la (0,0), scalabil prin `size`.
 * Întoarce SVG-ul interior + dimensiunile, ca să-l poți așeza oriunde.
 */
export function lockup({ size = 100, fg, accent, brandMain = "Qarvenda", brandSub = "DIGITAL" } = {}) {
  const baseline = size;
  const markR = size * 0.3;
  const markHalf = MARK_HALF * markR;
  const markCx = markHalf;
  const markCy = size * 0.62;
  const textX = markCx + markHalf + size * 0.2;

  const main = textPath(fraunces, brandMain, textX, baseline, size);
  const subSize = size * 0.27;
  const subTracking = 0.34;
  const sub = textPath(inter, brandSub, textX + main.width + size * 0.22, baseline, subSize, subTracking);

  const w = textX + main.width + size * 0.22 + sub.width;
  const h = size * 1.32;
  const body = `${markSvg(markCx, markCy, markR, fg, accent)}
  <path d="${main.d}" fill="${fg}"/>
  <path d="${sub.d}" fill="${accent}"/>`;
  return { body, width: w, height: h, markCy };
}
