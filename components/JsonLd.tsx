import { site, socialProfiles } from "@/lib/site";
import { works, coverFor } from "@/lib/works";

/**
 * Renders a JSON-LD block.
 *
 * Uses a <script> tag rather than next/script because structured data must be
 * present in the initial HTML for crawlers that do not execute JavaScript.
 */
function Ld({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Content is authored here, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: site.address.street,
  addressLocality: site.address.locality,
  addressRegion: site.address.region,
  postalCode: site.address.postalCode,
  addressCountry: site.address.country,
};

/** Site-wide identity. Rendered once, in the root layout. */
export function OrganizationJsonLd() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": `${site.url}/#organization`,
        name: site.legalName,
        alternateName: site.name,
        url: site.url,
        logo: `${site.url}/icon.png`,
        image: `${site.url}/opengraph-image`,
        description:
          "Real Group develops premium residential and commercial projects in Rajkot, Gujarat.",
        telephone: `+91${site.phone}`,
        address: postalAddress,
        areaServed: { "@type": "City", name: "Rajkot" },
        // Omitted entirely while the social links are still "#" placeholders.
        ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
      }}
    />
  );
}

/** Contact page: adds geo coordinates so the office can appear on maps. */
export function LocalBusinessJsonLd() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "RealEstateAgent",
        "@id": `${site.url}/#localbusiness`,
        name: site.legalName,
        url: `${site.url}/contact`,
        telephone: `+91${site.phone}`,
        address: postalAddress,
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.address.latitude,
          longitude: site.address.longitude,
        },
      }}
    />
  );
}

/** Breadcrumb trail — Google renders this above the URL in search results. */
export function BreadcrumbJsonLd({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [{ name: "Home", path: "/" }, ...trail].map(
          (item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: `${site.url}${item.path}`,
          }),
        ),
      }}
    />
  );
}

/** One development. */
export function ProjectJsonLd({ slug }: { slug: string }) {
  const work = works.find((w) => w.slug === slug);
  if (!work) return null;

  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": work.type === "Commercial" ? "Place" : "Residence",
        name: work.title,
        url: `${site.url}/work/${work.slug}`,
        image: `${site.url}${coverFor(work.slug)}`,
        description: work.summary,
        address: postalAddress,
        ...(work.offering.length
          ? { amenityFeature: work.offering.map((o) => ({ "@type": "LocationFeatureSpecification", name: o })) }
          : {}),
        provider: { "@id": `${site.url}/#organization` },
      }}
    />
  );
}

/** The /work listing, as an ordered list of projects. */
export function ProjectListJsonLd() {
  return (
    <Ld
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Real Group projects",
        itemListElement: works.map((w, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: w.title,
          url: `${site.url}/work/${w.slug}`,
        })),
      }}
    />
  );
}
