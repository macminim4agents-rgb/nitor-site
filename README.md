# Site-ul agenției — Qarvenda Digital (Next.js)

Site static (Next.js, `output: "export"`) cu animații GSAP + Lenis.
**Un singur fișier de configurare:** [`lib/site.ts`](lib/site.ts) — brand,
Cal.com, WhatsApp, email formular. Conținutul: [`content/ro.ts`](content/ro.ts).
Identitatea vizuală: [`brand/IDENTITY.md`](brand/IDENTITY.md).

> **Repo-ul se numește încă `nitor-site`** — „Nitor" a fost un brand de lucru
> respins la verificarea de marcă (D22). Brandul curent, „Qarvenda", a trecut
> verificarea completă pe 2026-07-14 (D25). Numele repo-ului nu apare nicăieri
> pe site; redenumirea lui (`gh repo rename qarvenda-site` + directorul local)
> schimbă URL-ul de staging, deci se face deliberat, nu în treacăt.

## Comenzi

```bash
npm install        # o singură dată
npm run dev        # dezvoltare (http://localhost:3000)
npm run build      # export static în out/
npm run assets     # regenerează logo/favicon/og.png (după schimbare de brand)
```

## Medii

| | Staging (GitHub Pages) | Producție (Vercel + domeniu) |
|---|---|---|
| URL | https://macminim4agents-rgb.github.io/nitor-site | https://qarvenda.ro (după cumpărare) |
| Build env | `NEXT_PUBLIC_BASE_PATH=/nitor-site`<br>`NEXT_PUBLIC_SITE_URL=<url staging>`<br>`NEXT_PUBLIC_HOSTING="GitHub Pages (GitHub, Inc.)"` | fără variabile (default-uri corecte) |
| Deploy | `scripts/deploy-staging.sh` | push pe `main` → Vercel |

## Structura

- `app/` — paginile (App Router): `/`, `/servicii` + 8 pagini de serviciu,
  `/pachete`, `/proces`, `/contact`, `/confidentialitate`, `/multumim`, 404,
  `sitemap.ts`, `robots.ts`, favicon.
- `components/` — Header, Footer, carduri, formular, Cal, WhatsApp;
  `components/motion/` — LenisRoot (smooth scroll), Reveal (animații la
  scroll), HeroIntro, Assembly (secvența pinned de pe home).
- `content/ro.ts` — TOT textul. Faza 2 (EN): se adaugă `content/en.ts` cu
  aceeași structură + rute `/en/...` care refolosesc aceleași componente.
- `scripts/gen-assets.mjs` — generarea identității (logo, favicon, og.png).

## Reguli moștenite din proiect

- Zero terți la încărcare: fonturi self-hosted, fără analytics, fără
  cookie-uri (⇒ fără banner GDPR). Cal.com se încarcă DOAR la click.
- WhatsApp = doar link `wa.me` către noi (decizia D21) — nicio automatizare.
- Formularul merge prin FormSubmit către emailul din `lib/site.ts`
  (prima trimitere cere activare prin click în emailul primit).
- Nicio afirmație neverificabilă în conținut (Regula #3): fără testimoniale
  inventate, fără cifre fără sursă; scorul PageSpeed e link live, nu text.
