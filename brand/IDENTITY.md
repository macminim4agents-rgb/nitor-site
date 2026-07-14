# Identitatea vizuală — Nitor Digital

> ATENȚIE: numele „Nitor" are conflicte cunoscute (verificare 2026-07-14):
> nitor.com e al Nitor Oy (consultanță digitală, Finlanda, din 1997); există
> marcă UE activă „Nitor Brilliance @ work" (Nitor Infotech, cl. 9+42,
> valabilă și în RO). Dacă numele se schimbă: editează `lib/site.ts`,
> înlocuiește textele din acest fișier și rulează `npm run assets`.

## Semnul: scânteia (gleam)

„Nitor" în latină = strălucire, lustru. Semnul e o scânteie cu patru vârfuri
și laturi concave — reflexul de lumină de pe o suprafață lustruită. Simplu,
geometric, lizibil la 16 px (favicon) și elegant la orice dimensiune.

- Sursa geometriei: `components/Icons.tsx` (componenta `Gleam`) și
  `scripts/gen-assets.mjs` (funcția `gleamPath`).
- Fișiere: `brand/logo-mark.svg`, `app/icon.svg` (favicon), `app/apple-icon.png`.

## Lockup-ul (logo complet)

**[scânteie] Nitor DIGITAL** — „Nitor" în Fraunces (serif display, 560,
optical size mare), „DIGITAL" în Inter Medium, majuscule, tracking 0.34em,
în culoarea de accent. Generat cu text conturat (paths) în:

- `brand/logo-light.svg` — pentru fundal deschis (text ink)
- `brand/logo-dark.svg` — pentru fundal închis (text paper)

Regenerare: `npm run assets` (folosește fonturile din `brand/fonts-ttf/`).

## Paleta

| Token | Hex | Folosire |
|---|---|---|
| `--paper` | `#F6F3EC` | fundalul principal (ivoriu cald) |
| `--paper-2` | `#EFEADF` | secțiuni alternative |
| `--ink` | `#17171C` | text principal, butoane |
| `--ink-2` | `#4E4E58` | text secundar |
| `--brass` | `#A57B2A` | accent decorativ: linii, numerale, semn |
| `--brass-text` | `#7A581C` | accent pe text (contrast AA pe paper) |
| `--night` | `#121216` | secțiuni închise, footer, og-image |
| `--paper-on-night` | `#F3EFE6` | text pe fundal închis |

Regula de folosire: alama (brass) e condiment, nu fel principal — linii de
1px, numerale, semnul, un singur cuvânt accentuat în hero. Niciodată fundal
pe suprafețe mari, niciodată text lung.

## Tipografia

- **Fraunces** (variabilă, opsz 9–144, wght 300–700) — titluri, cifre mari.
  Optical size mare (144) pentru hero = contrast fin, aer de „editorial".
  Italic doar pentru un cuvânt-accent.
- **Inter** (variabilă, wght 100–900) — corp de text, UI, eyebrow-uri.
- Ambele: self-hosted (woff2 în `app/fonts/`, subseturi latin + latin-ext
  pentru diacriticele românești), licență SIL OFL.
- Fallback-uri cu metrici ajustate („Inter Fallback" = Arial ajustat,
  „Fraunces Fallback" = Georgia ajustată) — text instant, fără salt de layout.

## Mișcarea

- Ease-ul casei: `cubic-bezier(0.22, 1, 0.36, 1)` (power4-ish out).
- Textele mari se dezvăluie pe linii (SplitText cu mască); conținutul urcă
  20–30px cu fade; niciodată bounce, niciodată rotații.
- Piesa semnătură: secvența pinned de pe prima pagină în care macheta de
  site „se construiește singură" pas cu pas (GSAP ScrollTrigger, doar desktop).
- `prefers-reduced-motion: reduce` oprește TOT (inclusiv smooth scroll) —
  site-ul rămâne complet funcțional static.
