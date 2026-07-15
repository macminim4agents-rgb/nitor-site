/**
 * Importul unui font returnează URL-ul final, cu hash, generat de bundler.
 * Îl folosim în app/layout.tsx ca să emitem <link rel="preload"> către exact
 * fișierul pe care îl cere și @font-face din globals.css (altfel preload-ul
 * n-ar corespunde și fontul s-ar descărca de două ori).
 */
declare module "*.woff2" {
  const src: string;
  export default src;
}
