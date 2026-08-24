import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-brand-ink p-5 text-center text-white">
      <p className="text-base font-medium leading-[26px]">
        Website Design &amp; Developed by{" "}
        <a
          href={site.credit.href}
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline transition-colors hover:text-brand-gold"
        >
          {site.credit.label}
        </a>
      </p>
    </footer>
  );
}
