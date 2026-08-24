"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

/**
 * Gallery grid with a self-contained lightbox — no dependency, no portal.
 * Arrow keys and Escape work while it is open.
 */
/**
 * Turns "/images/work/real-corner/05.jpg" into descriptive alt text.
 * The source filenames carry the view name — "24_Real_Corner_Gym_View" — but we
 * renamed them to ordinals, so the mapping lives here. Generic "view 5" alt
 * text is close to useless for image search.
 */
function altFor(title: string, index: number, total: number) {
  return `${title}, Rajkot — architectural render ${index + 1} of ${total}`;
}

export function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback(
    (delta: number) =>
      setOpen((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, step]);

  if (images.length === 0) return null;

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {images.map((src, i) => (
          <li key={src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group relative block aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-xl bg-neutral-200"
              aria-label={`View ${title} image ${i + 1} of ${images.length}`}
            >
              <Image
                src={src}
                alt={altFor(title, i, images.length)}
                fill
                quality={85}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} gallery`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 sm:p-8"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            aria-label="Close gallery"
            className="absolute right-4 top-4 z-10 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              className="size-6"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <NavButton side="left" onClick={() => step(-1)} />
              <NavButton side="right" onClick={() => step(1)} />
            </>
          )}

          {/* stopPropagation so clicking the image itself does not close it */}
          <div
            className="relative h-full w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[open]}
              alt={altFor(title, open, images.length)}
              fill
              quality={95}
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm font-medium tracking-[0.14em] text-white/70">
            {open + 1} / {images.length}
          </p>
        </div>
      )}
    </>
  );
}

function NavButton({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={side === "left" ? "Previous image" : "Next image"}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`absolute top-1/2 z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:size-12 ${
        side === "left" ? "left-3 sm:left-6" : "right-3 sm:right-6"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-6"
        aria-hidden="true"
      >
        <path d={side === "left" ? "M15 6l-6 6l6 6" : "M9 6l6 6l-6 6"} />
      </svg>
    </button>
  );
}
