# Identitatea vizuală — Qarvenda Digital

> Numele a trecut verificarea completă pe 2026-07-14 (D25 în CLAUDE.md):
> qarvenda.ro + qarvenda.com libere, zero mărci exacte în TMview (EUIPO,
> OSIM, WIPO + naționale), zero conflict viu pe clasele 35/42, zero firme
> active, github.com/qarvenda liber. Dacă numele se schimbă totuși: editează
> `lib/site.ts` + `BRAND_MAIN` din `scripts/gen-assets.mjs`, înlocuiește
> textele de aici și rulează `npm run assets`.

## Premisa

**„Qarvenda" nu înseamnă nimic.** E inventat intenționat: fără rădăcină latină,
fără traducere, fără sens preexistent în vreo limbă. Consecința e importantă și
deliberată — **semnul e cel care poartă sensul, nu cuvântul.** Un nume gol e un
vas: identitatea vizuală îl umple. De aceea semnul nu e o decorație pusă lângă
literă, ci argumentul central al brandului.

## Semnul: cercul închis de coardă

Două elemente geometrice, fără nicio figurativitate:

- **Arcul** (300° din cerc, în ink) — lucrarea pe care o ducem noi până la
  capăt. E promisiunea din hero: *nu vă cerem texte, nu vă cerem poze, nu vă
  cerem timp.*
- **Coarda în alamă** care închide deschiderea — aprobarea omului. Ultimul
  segment, scurt, fără de care cercul nu e cerc. E principiul care ține tot
  proiectul: *pregătim noi, aprobați dumneavoastră.* Sistemul face 300 de
  grade; butonul rămâne al omului.

Rezultatul e un cerc cu o singură latură dreaptă, aurie — o formă care nu
seamănă cu nimic altceva și se reține.

**De ce NU e un Q.** Prima versiune a semnului era un inel cu o coadă pe 45° —
adică, inevitabil, litera Q. Randată lângă cuvânt, se bâlbâia: „Q Qarvenda",
ca o eroare de tipar (semnul geometric și Q-ul serif al Fraunces se citeau ca
două încercări la aceeași literă). Semnul actual e deliberat non-literal:
inițiala e treaba cuvântului, sensul e treaba semnului.

Geometria (normalizată la rază, identică în cele două surse):

| Parametru | Valoare |
|---|---|
| Grosimea liniei | `0.295 × r` |
| Capetele coardei | pe cerc, la `18°` și `78°` (dreapta-jos; 0° = ora 3, sensul acelor de ceas) |
| Arcul | restul de 300°, `large-arc-flag=1`, `sweep-flag=1` |
| Capetele | rotunde (`stroke-linecap: round`) |
| Arcul | `fg` (ink pe deschis / paper pe închis) |
| Coarda | `accent` (brass) — singurul element colorat |

Bbox-ul semnului e cel al cercului: `±(r + grosime/2)` = `±1.1475 × r` pe ambele
axe. Coarda nu iese din el — util la alinierea lockup-ului.

- Sursa: `components/Icons.tsx` (componenta `Mark`) și `scripts/gen-assets.mjs`
  (`markGeometry` / `markSvg`). **Se modifică în ambele sau în niciunul.**
- Fișiere: `brand/logo-mark.svg`, `app/icon.svg` (favicon), `app/apple-icon.png`.

Regula de contrast a semnului: coarda e MEREU alamă, pe orice fundal — `--brass`
(#a57b2a) e mid-tone, deci se vede și pe ivoriu, și pe night. Arcul își schimbă
culoarea cu fundalul, coarda nu.

## Lockup-ul (logo complet)

**[semn] Qarvenda DIGITAL** — „Qarvenda" în Fraunces (serif display, 560,
optical size mare), „DIGITAL" în Inter Medium, majuscule, tracking 0.34em, în
culoarea de accent. Semnul e optic centrat pe corpul cuvântului (nu pe linia de
bază). Generat cu text conturat (paths):

- `brand/logo-light.svg` — pentru fundal deschis (arc ink)
- `brand/logo-dark.svg` — pentru fundal închis (arc paper)

Regenerare: `npm run assets` (folosește fonturile din `brand/fonts-ttf/`).

## Paleta

| Token | Hex | Folosire |
|---|---|---|
| `--paper` | `#F6F3EC` | fundalul principal (ivoriu cald) |
| `--paper-2` | `#EFEADF` | secțiuni alternative |
| `--ink` | `#17171C` | text principal, butoane, inelul |
| `--ink-2` | `#4E4E58` | text secundar |
| `--brass` | `#A57B2A` | accent decorativ: linii, numerale, coada semnului |
| `--brass-text` | `#7A581C` | accent pe text (contrast AA pe paper) |
| `--night` | `#121216` | secțiuni închise, footer, og-image |
| `--paper-on-night` | `#F3EFE6` | text pe fundal închis |

Regula de folosire: alama e condiment, nu fel principal — linii de 1px,
numerale, coada semnului, un singur cuvânt accentuat în hero. Niciodată fundal
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
