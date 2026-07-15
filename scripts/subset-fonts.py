#!/usr/bin/env python3
"""
Subsetează fonturile: brand/fonts-src/*.woff2 (surse, de la Google) -> app/fonts/*.woff2.

DE CE există scriptul (măsurat, 2026-07-15):
  Fonturile erau 257 KB = 50% din transferul paginii, iar LCP-ul pe mobil (3.6 s)
  era exact momentul în care sosea Fraunces și textul se repicta. Fișierele
  „latin-ext" de la Google cară TOT setul est-european: inter-latin-ext avea 733
  de glife, fraunces-latin-ext 289. Site-ul, în schimb, folosește din gama aceea
  exact PATRU caractere: ă Ș ș ț. (Verificat extrăgând textul din out/**/*.html;
  â și î sunt U+00E2/U+00EE, deci în gama „latin", nu în ext. Punctuația — „ " …
  intră tot în latin, prin U+2000-206F.)

CE FACE:
  - latin      : păstrat INTACT (toate glifele). Acoperă ASCII + vest-europeană,
                 deci un nume străin scris în formular tot se randează corect.
  - latin-ext  : redus la strictul necesar limbii române, inclusiv variantele
                 istorice cu sedilă (ş/ţ) — apar în text vechi copiat, iar 4
                 glife în plus sunt mai ieftine decât o literă în alt font.

DUPĂ RULARE: actualizează și `unicode-range` din app/globals.css dacă schimbi
RO_EXT — altfel browserul cere fișierul ext pentru caractere pe care nu le mai
conține (nu strică nimic, dar e o descărcare degeaba).

Rulare:  npm run fonts     (sau: python3 scripts/subset-fonts.py)
"""
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "brand", "fonts-src")
DST = os.path.join(ROOT, "app", "fonts")

# Glifele din gama latin-ext de care are nevoie româna.
RO_EXT = [
    (0x0102, "Ă"), (0x0103, "ă"),   # a cu breve
    (0x0218, "Ș"), (0x0219, "ș"),   # s cu virgulă (corect)
    (0x021A, "Ț"), (0x021B, "ț"),   # t cu virgulă (corect)
    (0x015E, "Ş"), (0x015F, "ş"),   # s cu sedilă (istoric/Windows vechi)
    (0x0162, "Ţ"), (0x0163, "ţ"),   # t cu sedilă (istoric)
]


def kb(path):
    return os.path.getsize(path) / 1024


def subset(nume, args):
    src = os.path.join(SRC, nume)
    dst = os.path.join(DST, nume)
    inainte = kb(src)
    cmd = [
        sys.executable, "-m", "fontTools.subset", src,
        f"--output-file={dst}",
        "--flavor=woff2",
        "--layout-features=*",       # păstrăm kerning/ligaturi
        "--drop-tables+=DSIG",
        "--no-hinting",
        "--desubroutinize",
        *args,
    ]
    subprocess.run(cmd, check=True, capture_output=True)
    dupa = kb(dst)
    taiat = inainte - dupa
    print(f"  {nume:<30} {inainte:6.1f} KB -> {dupa:5.1f} KB   (-{taiat:5.1f} KB, -{100*taiat/inainte:4.1f}%)")
    return inainte, dupa


def main():
    os.makedirs(DST, exist_ok=True)
    if not os.path.isdir(SRC) or not os.listdir(SRC):
        sys.exit(f"Lipsesc sursele din {SRC}. Nu suprascriu app/fonts fără ele.")

    unicodes = ",".join(f"U+{cp:04X}" for cp, _ in RO_EXT)
    print("Subsetare fonturi\n")
    print(f"  latin-ext se reduce la: {' '.join(ch for _, ch in RO_EXT)}\n")

    total_in = total_out = 0
    for nume in sorted(os.listdir(SRC)):
        if not nume.endswith(".woff2"):
            continue
        if "-ext" in nume:
            args = [f"--unicodes={unicodes}"]
        else:
            # latin rămâne intact: luăm toate codepoint-urile pe care le are deja
            args = ["--unicodes=*"]
        i, o = subset(nume, args)
        total_in += i
        total_out += o

    print(f"\n  {'TOTAL':<30} {total_in:6.1f} KB -> {total_out:5.1f} KB   "
          f"(-{total_in-total_out:.1f} KB, -{100*(total_in-total_out)/total_in:.1f}%)")


if __name__ == "__main__":
    main()
