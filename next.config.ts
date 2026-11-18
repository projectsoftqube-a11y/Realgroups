import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve /public images as they are: Vercel image optimisation is a paid allowance on the Hobby plan
    // and answers 402 once it is used up, which leaves every next/image blank.
    unoptimized: true,
    // Sources are pre-resized to 2560px by scripts/optimize-images.mjs.
    qualities: [40, 75, 88, 90, 95],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
  },

  /**
   * 301s from the old WordPress URL structure.
   *
   * This is the most important SEO step in the migration: the WordPress site
   * has 35 indexed URLs, and without these every existing ranking and inbound
   * link would land on a 404. Keep this map in place permanently — old links
   * live on in emails, listings and directories for years.
   *
   * `statusCode: 301` rather than `permanent: true`: the latter emits 308,
   * which Google treats identically but which older SEO crawlers, directory
   * listings and link checkers still handle inconsistently.
   */
  async redirects() {
    return [
      // Project detail pages: /works/real-corner/ -> /work/real-corner
      { source: "/works/:slug", destination: "/work/:slug", statusCode: 301 },

      // The old listing lived at two URLs; both now point at /work.
      { source: "/all-work", destination: "/work", statusCode: 301 },

      // Brochures: listing and all four detail pages collapse to one page.
      { source: "/journal", destination: "/brochure", statusCode: 301 },
      { source: "/journals/:slug", destination: "/brochure", statusCode: 301 },

      // /studio/ carried About, Team and Contact as anchors — split into pages.
      { source: "/studio", destination: "/about", statusCode: 301 },

      // WordPress core endpoints that were publicly linked.
      { source: "/wp-sitemap.xml", destination: "/sitemap.xml", statusCode: 301 },
      { source: "/feed", destination: "/", statusCode: 301 },
    ];
  },
};

export default nextConfig;
