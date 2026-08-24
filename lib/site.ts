/**
 * Single source of truth for site-wide content while the site is hardcoded.
 * When a CMS is introduced later, only this file needs to be swapped for a fetch.
 *
 * The five developments live in `lib/works.ts` — the nav below derives from
 * that list so the two can never drift apart.
 */
import { works } from "@/lib/works";

export const site = {
  name: "Real Groups",
  /** Canonical origin — no trailing slash. */
  url: "https://realgroups.in",
  legalName: "Real Group",
  tagline: "Premium residential and commercial developments in Rajkot",
  phone: "9586555564",
  phoneHref: "tel:9586555564",
  credit: {
    label: "Softqube Technologies LLC.",
    href: "https://www.softqubes.com/",
  },
  social: {
    // Placeholders on the live WordPress site too - all three point at "#".
    facebook: "#",
    instagram: "#",
    linkedin: "#",
  },
  address: {
    street: "Bapa Sitaram Chowk, Mavadi",
    locality: "Rajkot",
    region: "Gujarat",
    postalCode: "360004",
    country: "IN",
    // From the Google Maps embed carried over from the WordPress site.
    latitude: 22.259899,
    longitude: 70.780385,
  },
} as const;

/**
 * Social profile URLs for schema.org `sameAs`. Filtered because the live site
 * still has "#" placeholders — an empty array is correct until real URLs land.
 */
export const socialProfiles = Object.values(site.social).filter(
  (href) => href && href !== "#",
);

export type Brochure = {
  /** Matches the corresponding entry in `works`. */
  slug: string;
  title: string;
  file: string;
  image: string;
  alt: string;
  /** Megabytes, rounded - shown so people on mobile data know what they are opening. */
  sizeMb: number;
  published: string;
};

/**
 * Four brochures, ordered to match `works`.
 * Real Residency has no brochure of its own and is deliberately absent.
 */
export const brochures: Brochure[] = [
  {
    slug: "real-corner",
    title: "Real Corner",
    file: "/brochures/real-corner.pdf",
    image: "/images/brochure-real-corner.jpg",
    alt: "Real Corner entrance gate at night",
    sizeMb: 22.1,
    published: "October 14, 2023",
  },
  {
    slug: "real-classic",
    title: "Real Classic",
    file: "/brochures/real-classic.pdf",
    image: "/images/brochure-real-classic.jpg",
    alt: "Real Classic entrance gate at night",
    sizeMb: 11.9,
    published: "October 14, 2023",
  },
  {
    slug: "real-point",
    title: "Real Point",
    file: "/brochures/real-point.pdf",
    image: "/images/brochure-real-point.jpg",
    alt: "Real Point rear elevation",
    sizeMb: 14.9,
    published: "October 14, 2023",
  },
  {
    slug: "real-bunglows",
    title: "Real Bunglows",
    file: "/brochures/real-bunglows.pdf",
    image: "/images/brochure-real-bunglows.jpg",
    alt: "Real Bungalows entrance gate at night",
    sizeMb: 7.3,
    published: "October 14, 2023",
  },
];

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Projects",
    href: "/work",
    children: works.map((w) => ({
      label: w.title,
      href: `/work/${w.slug}`,
    })),
  },
  { label: "Brochures", href: "/brochure" },
  {
    label: "Reach Us",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export type Slide = {
  src: string;
  alt: string;
  /** Intrinsic pixel size - the hero sizes itself to this so nothing is cropped. */
  width: number;
  height: number;
};

/** Home hero carousel - same five images, same order, as the live slider. */
export const homeSlides: Slide[] = [
  {
    /* Reuses the full-resolution render from the Real Corner gallery. The
       original slide on WordPress was an 803x777 WhatsApp export of this exact
       image, which looked soft blown up to full width. */
    src: "/images/work/real-corner/13.jpg",
    alt: "Real Corner - corner view at dusk",
    width: 6000,
    height: 6000,
  },
  {
    src: "/images/slide-2.jpg",
    alt: "Real Classic - retail frontage at dusk",
    width: 9000,
    height: 9000,
  },
  {
    src: "/images/slide-3.jpg",
    alt: "Real Point - day view",
    width: 5500,
    height: 5500,
  },
  {
    src: "/images/slide-4.jpg",
    alt: "Real Bungalows - entrance gate, night view",
    width: 6500,
    height: 4063,
  },
  {
    src: "/images/slide-5.jpg",
    alt: "Real Bungalows - entrance gate, alternate night view",
    width: 6500,
    height: 6500,
  },
];
