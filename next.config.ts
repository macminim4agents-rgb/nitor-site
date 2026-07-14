import type { NextConfig } from "next";

/**
 * Config pentru două medii:
 *  - Producție (Vercel + domeniu propriu): fără variabile — totul pe rădăcină.
 *  - Staging (GitHub Pages, sub /<repo>/): setează NEXT_PUBLIC_BASE_PATH=/<repo>
 *    și NEXT_PUBLIC_SITE_URL=https://<user>.github.io/<repo> la build.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",          // site static pur — merge pe Vercel ȘI pe GitHub Pages
  trailingSlash: true,       // /servicii/ -> servicii/index.html (necesar pe hosting static)
  basePath,
  images: { unoptimized: true }, // nu folosim optimizatorul (site static, asset-uri SVG mici)
};

export default nextConfig;
