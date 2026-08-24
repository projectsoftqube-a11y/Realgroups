"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import type { Slide } from "@/lib/site";

const AUTOPLAY_MS = 4000;

export function HomeSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  /* Tracked separately from `reduceMotion` — a single `paused` flag let the
     media-query listener clobber the hover state and vice versa. */
  const [hovering, setHovering] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => setIndex((next + slides.length) % slides.length),
    [slides.length],
  );

  // Autoplay, matching the 4s cadence of the original slick carousel.
  useEffect(() => {
    if (hovering || reduceMotion || slides.length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % slides.length),
      AUTOPLAY_MS,
    );
    return () => window.clearInterval(id);
  }, [hovering, reduceMotion, slides.length]);

  // Respect users who ask for reduced motion by holding on the first slide.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const active = slides[index];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured Real Groups projects"
      /* Full width at each render's own aspect ratio, so nothing is cropped.
         The renders are square, so on a widescreen viewport the hero is taller
         than the screen and the page scrolls — the top of a square render is
         mostly sky, so the first screenful looks sparse until you scroll.
         `min-h` covers the opposite case: at 320px wide a square render is only
         320px tall, which would leave the rest of the viewport blank and give
         the sticky indicator rail no room to centre itself. */
      style={{ aspectRatio: `${active.width} / ${active.height}` }}
      className="relative min-h-[100svh] w-full bg-neutral-950 transition-[aspect-ratio] duration-700 ease-in-out"
      /* Deliberately no hover pause on the section itself: the hero fills the
         viewport, so the pointer is over it almost permanently and autoplay
         would never advance. Pausing lives on the indicator rail instead. */
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const start = touchStartX.current;
        if (start === null) return;
        const delta = e.changedTouches[0].clientX - start;
        if (Math.abs(delta) > 50) go(index + (delta < 0 ? 1 : -1));
        touchStartX.current = null;
      }}
    >
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${slides.length}`}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            quality={95}
            sizes="100vw"
            /* `contain` so nothing is clipped, including mid-transition when
               two slides of different ratios overlap. Because the container
               already carries the active slide's ratio, the active image fills
               it edge to edge with no visible letterboxing. */
            className="object-contain"
          />
        </div>
      ))}

      {/* Indicators sit on the right edge, vertically centred in the viewport.
          `sticky top-[50svh]` keeps them centred as you scroll the taller
          square renders; the translate centres the rail on that line. */}
      <div className="pointer-events-none sticky top-[50svh] z-10 flex -translate-y-1/2 justify-end pr-3 sm:pr-6">
        <div
          className="pointer-events-auto flex flex-col items-center gap-4 rounded-full bg-black/45 px-2.5 py-4 backdrop-blur-sm"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className="group grid h-6 w-4 cursor-pointer place-items-center"
            >
              <span
                className={`block w-2.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "h-6 bg-brand-gold"
                    : "h-2.5 bg-white/70 group-hover:bg-white"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
