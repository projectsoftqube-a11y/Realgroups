import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  PhoneCallIcon,
} from "@/components/icons";
import { site } from "@/lib/site";

const socials = [
  { key: "facebook", label: "Facebook", Icon: FacebookIcon, href: site.social.facebook },
  { key: "instagram", label: "Instagram", Icon: InstagramIcon, href: site.social.instagram },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedinIcon, href: site.social.linkedin },
];

/**
 * Utility row: phone, a gap, then social icons.
 * Rendered as the upper row of the header's right-hand column, so it carries no
 * width or vertical rhythm of its own.
 */
export function TopBar({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center justify-end gap-4 sm:gap-9">
      <a
        href={site.phoneHref}
        className={`group flex items-center gap-2.5 rounded-full bg-black/65 text-white ring-1 ring-white/15 backdrop-blur-sm transition-all duration-300 hover:bg-black/80 ${
          compact ? "px-3.5 py-1.5" : "px-4 py-2 sm:px-5"
        }`}
      >
        <PhoneCallIcon className="size-5 shrink-0 transition-colors group-hover:text-brand-gold" />
        <span className="text-sm font-medium tracking-wide transition-colors group-hover:text-brand-gold sm:text-base">
          {site.phone}
        </span>
      </a>

      {/* Hidden under 640px: the logo, phone pill and three icons cannot all
          fit on a 320px row. The phone is the priority on mobile, and the icons
          are still reachable on the contact page. */}
      <div className="hidden items-center gap-2 sm:flex">
        {socials.map(({ key, label, Icon, href }) => (
          <a
            key={key}
            href={href}
            aria-label={label}
            className={`flex items-center justify-center rounded-full bg-black/65 text-white ring-1 ring-white/15 backdrop-blur-sm transition-all duration-300 hover:bg-black/80 hover:text-brand-gold ${
              compact ? "size-8" : "size-9"
            }`}
          >
            <Icon className="size-[19px]" />
          </a>
        ))}
      </div>
    </div>
  );
}
