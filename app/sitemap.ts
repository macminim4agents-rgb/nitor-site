import type { MetadataRoute } from "next";
import { servicii } from "@/content/ro";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pagini = [
    "",
    "/servicii",
    ...servicii.map((s) => `/servicii/${s.slug}`),
    "/pachete",
    "/proces",
    "/contact",
    "/confidentialitate",
  ];
  return pagini.map((p) => ({
    url: `${site.url}${p}/`,
    lastModified,
    changeFrequency: p === "" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p.startsWith("/servicii") ? 0.8 : 0.6,
  }));
}
