import type { Metadata } from "next";

import { HomeSlider } from "@/components/HomeSlider";
import { homeSlides } from "@/lib/site";

const description =
  "Real Group develops premium residential and commercial projects in Rajkot — Real Corner, Real Classic, Real Point, Real Bunglows and Real Residency.";

export const metadata: Metadata = {
  title: "Real Groups — Premium Homes & Commercial Spaces in Rajkot",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Real Groups — Premium Homes & Commercial Spaces in Rajkot",
    description,
  },
};

/** Home is intentionally footer-less — the hero fills the viewport. */
export default function HomePage() {
  return (
    <main className="flex-1">
      <HomeSlider slides={homeSlides} />
    </main>
  );
}
