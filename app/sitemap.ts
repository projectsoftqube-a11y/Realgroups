import type { MetadataRoute } from "next";

import { site } from "@/lib/site";
import { works } from "@/lib/works";

/**
 * Served at /sitemap.xml and referenced from robots.txt.
 * Replaces the WordPress core sitemap, which also listed demo team profiles,
 * empty taxonomy archives and the author archive.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/brochure`, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/about`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${site.url}/team`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${site.url}/contact`, changeFrequency: "yearly", priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = works.map((w) => ({
    url: `${site.url}/work/${w.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes].map((entry) => ({
    ...entry,
    lastModified,
  }));
}
