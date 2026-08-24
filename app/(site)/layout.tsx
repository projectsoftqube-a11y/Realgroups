import { SiteFooter } from "@/components/SiteFooter";

/**
 * Layout for every page except the home page.
 * Home sits at `app/page.tsx` outside this group, so it renders without a footer.
 *
 * No top padding here — inner pages open with <PageHero>, which carries its own
 * padding so its background runs full-bleed beneath the fixed chrome.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}
