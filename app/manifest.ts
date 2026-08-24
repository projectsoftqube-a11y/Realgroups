import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description:
      "Real Group develops premium residential and commercial projects in Rajkot — Real Corner, Real Classic, Real Point, Real Bunglows and Real Residency.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#d7b56d",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
