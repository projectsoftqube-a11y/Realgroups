import type { Metadata } from "next";

import { BreadcrumbJsonLd, LocalBusinessJsonLd } from "@/components/JsonLd";
import { Container } from "@/components/Container";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  PhoneCallIcon,
} from "@/components/icons";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";

const description =
  "Get in touch with Real Group — Bapa Sitaram Chowk, Mavadi Rajkot – 360 004. Call 9586555564 or send us a message.";

export const metadata: Metadata = {
  title: "Contact Us",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact", title: "Contact Real Group, Rajkot", description },
};

const socials = [
  { label: "Facebook", Icon: FacebookIcon, href: site.social.facebook },
  { label: "Instagram", Icon: InstagramIcon, href: site.social.instagram },
  { label: "LinkedIn", Icon: LinkedinIcon, href: site.social.linkedin },
];

function LocationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
      <path d="M17.657 16.657 13.414 20.9a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      <LocalBusinessJsonLd />
      <BreadcrumbJsonLd trail={[{ name: "Contact Us", path: "/contact" }]} />

      <PageHero
        eyebrow={contact.eyebrow}
        title={contact.title}
        lead={contact.lead}
        image="/images/slide-4.jpg"
        imageAlt="Real Bungalows entrance gate at night"
      />

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Details */}
            <div className="lg:col-span-5">
              <h2 className="text-2xl font-medium uppercase tracking-[0.08em] text-neutral-900">
                {contact.address.label}
              </h2>
              <span className="mt-5 block h-px w-16 bg-brand-gold" />

              <ul className="mt-8 space-y-6">
                <li className="flex gap-4">
                  <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-brand-gold">
                    <LocationIcon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">
                      Office
                    </p>
                    <address className="mt-1 not-italic text-lg font-medium leading-relaxed text-neutral-900">
                      {contact.address.lines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                    </address>
                  </div>
                </li>

                <li className="flex gap-4">
                  <span className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-brand-gold">
                    <PhoneCallIcon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">
                      Telephone
                    </p>
                    <a
                      href={site.phoneHref}
                      className="mt-1 block text-lg font-medium text-neutral-900 transition-colors hover:text-brand-gold"
                    >
                      {site.phone}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-10">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500">
                  Follow us
                </p>
                <div className="mt-4 flex items-center gap-3">
                  {socials.map(({ label, Icon, href }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="flex size-11 items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-brand-gold hover:text-neutral-900"
                    >
                      <Icon className="size-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-neutral-50 p-6 ring-1 ring-neutral-200 sm:p-8 lg:p-10">
                <h2 className="text-2xl font-medium uppercase tracking-[0.08em] text-neutral-900">
                  {contact.formHeading}
                </h2>
                <span className="mb-8 mt-5 block h-px w-16 bg-brand-gold" />
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Map — embed carried over from the WordPress /studio/ page. */}
      <section className="bg-white pb-14 sm:pb-20 lg:pb-24">
        <Container>
          <h2 className="pb-6 text-2xl font-medium uppercase tracking-[0.08em] text-neutral-900">
            Find us
          </h2>

          <div className="relative h-[320px] w-full overflow-hidden rounded-2xl ring-1 ring-neutral-200 sm:h-[420px] lg:h-[480px]">
            <iframe
              src={contact.map.embedUrl}
              title={contact.map.title}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
            />
          </div>
        </Container>
      </section>
    </>
  );
}
