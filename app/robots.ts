import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/**
 * Served at /robots.txt. The WordPress version was `User-agent: * / Allow: /`
 * with no Sitemap line at all, so crawlers had to guess.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Nothing user-facing lives under /api.
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
