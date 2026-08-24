"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronDownIcon } from "@/components/icons";
import { primaryNav } from "@/lib/site";

type NavProps = {
  open: boolean;
  onToggle: () => void;
  expanded: string | null;
  onExpand: (label: string | null) => void;
};

/**
 * Lower row of the header's right-hand column: desktop navigation plus the
 * mobile toggle. The mobile drawer is rendered as a sibling pinned to the
 * bottom of the fixed chrome so it can span the full viewport width.
 */
export function SiteHeader({ open, onToggle, expanded, onExpand }: NavProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div className="flex items-center justify-end">
        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-10">
            {primaryNav.map((item, i) => {
              /* The last item sits flush with the container edge, so a centred
                 panel would spill past it. Anchor that one to the right. */
              const alignRight = i === primaryNav.length - 1;

              return (
                <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 border-b-2 py-1 text-[15px] font-semibold uppercase leading-[22px] tracking-[0.1em] text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)] transition-colors group-hover:text-brand-gold ${
                    isActive(item.href) ? "border-white" : "border-transparent"
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDownIcon className="size-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {item.children && (
                  <div
                    className={`invisible absolute top-full z-10 w-[248px] translate-y-2 pt-4 opacity-0 transition-all duration-300 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 ${
                      alignRight ? "right-0" : "left-1/2 -translate-x-1/2"
                    }`}
                  >
                    {/* Caret tying the panel back to its trigger. */}
                    <span
                      className={`absolute top-[9px] size-3 rotate-45 rounded-[3px] border-l border-t border-white/10 bg-neutral-950 ${
                        alignRight ? "right-9" : "left-1/2 -translate-x-1/2"
                      }`}
                    />

                    <ul className="relative overflow-hidden rounded-xl border border-white/10 bg-neutral-950/95 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                      {item.children.map((child) => (
                        <li
                          key={child.href}
                          className="border-b border-white/[0.06] last:border-b-0"
                        >
                          <Link
                            href={child.href}
                            className="group/item flex items-center gap-3 px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white/80 transition-colors hover:bg-white/[0.06] hover:text-brand-gold"
                          >
                            {/* Gold rule that grows in on hover. */}
                            <span className="h-4 w-[2px] shrink-0 origin-center scale-y-0 rounded-full bg-brand-gold transition-transform duration-200 group-hover/item:scale-y-100" />
                            <span className="transition-transform duration-200 group-hover/item:translate-x-1">
                              {child.label}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="relative z-50 flex size-10 cursor-pointer flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer — pinned to the bottom edge of the fixed chrome. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[70svh] overflow-y-auto border-t border-white/10 bg-neutral-950/95 backdrop-blur-lg lg:hidden"
      >
        <ul className="mx-auto w-[92%] max-w-7xl py-2">
          {primaryNav.map((item) => (
            <li key={item.label} className="border-b border-white/10 last:border-b-0">
              <div className="flex items-center justify-between">
                <Link
                  href={item.href}
                  className="flex-1 py-4 text-[15px] font-semibold uppercase tracking-[0.1em] text-white"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    type="button"
                    onClick={() =>
                      onExpand(expanded === item.label ? null : item.label)
                    }
                    aria-expanded={expanded === item.label}
                    className="cursor-pointer p-3 text-white"
                  >
                    <span className="sr-only">Toggle {item.label} submenu</span>
                    <ChevronDownIcon
                      className={`size-5 transition-transform ${
                        expanded === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>

              {item.children && expanded === item.label && (
                <ul className="pb-2">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="flex items-center gap-3 py-2.5 pl-1 text-sm font-semibold uppercase tracking-wide text-white/75 transition-colors hover:text-brand-gold"
                      >
                        <span className="h-3.5 w-[2px] shrink-0 rounded-full bg-brand-gold/70" />
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
