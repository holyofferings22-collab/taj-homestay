'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

export type Photo = { src: string; alt: string };
export type GallerySection = {
  id: string;
  heading: string;
  count: string;
  photos: readonly Photo[];
};

/**
 * Lightbox controls.
 *
 * They sit over the photo, and a hairline border on a transparent fill
 * disappears entirely against a pale one — which most of these are. On a
 * desktop there is dark surround to either side of the image and the problem
 * never shows; on a phone the photo fills the frame and the arrows landed on
 * it. The dark fill is what makes them findable, so it is not decoration.
 */
const overlayButton =
  'absolute flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-[rgba(20,17,14,0.55)] font-body text-xl leading-none text-cream backdrop-blur-[2px] hover:bg-[rgba(20,17,14,0.85)]';

/**
 * Masonry photo grid with lightbox.
 *
 * The lightbox indexes across every section, so the arrow keys walk the whole
 * gallery rather than stopping at a section boundary — matching the original.
 */
export function GalleryGrid({ sections }: { sections: readonly GallerySection[] }) {
  const all: Photo[] = sections.flatMap((section) => [...section.photos]);
  const [index, setIndex] = useState(-1);
  const open = index >= 0;

  const close = useCallback(() => setIndex(-1), []);
  const step = useCallback(
    (dir: number) => setIndex((i) => (i + dir + all.length) % all.length),
    [all.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    // Stop the page scrolling behind the overlay
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, close, step]);

  let offset = 0;

  return (
    <>
      {sections.map((section) => {
        const base = offset;
        offset += section.photos.length;

        return (
          <section
            key={section.id}
            id={section.id}
            className="mx-auto max-w-[1240px] scroll-mt-24 px-6 pt-[var(--rhythm-gap)]"
          >
            <div className="mb-7 flex flex-wrap items-baseline justify-between gap-4">
              <h2 className="m-0 font-display text-[clamp(19px,2.8vw,32px)] font-normal text-ink">
                {section.heading}
              </h2>
              <p className="m-0 text-sm">{section.count}</p>
            </div>

            {/* Two columns on a phone. At one column each photo was 375px
                wide and a portrait one ran to 500px, so a 12-photo section
                was six screens of scrolling. Paired, the masonry reads as a
                contact sheet, which is what someone skimming a gallery
                wants — and the lightbox is still one tap away. */}
            <div className="columns-2 gap-2 min-[700px]:gap-5 min-[1080px]:columns-3">
              {section.photos.map((photo, i) => (
                <figure
                  key={photo.src}
                  onClick={() => setIndex(base + i)}
                  className="mb-2 block cursor-zoom-in overflow-hidden rounded-lg bg-stone [break-inside:avoid] min-[700px]:mb-5 min-[700px]:rounded-[14px]"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={1200}
                    height={900}
                    sizes="(max-width: 700px) 50vw, (max-width: 1080px) 50vw, 33vw"
                    className="block h-auto w-full"
                  />
                </figure>
              ))}
            </div>
          </section>
        );
      })}

      {open && (
        <div
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={all[index].alt}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(20,17,14,0.94)] px-3 py-16 sm:px-5 sm:py-10"
        >
          <Image
            src={all[index].src}
            alt={all[index].alt}
            width={2400}
            height={1800}
            sizes="100vw"
            className="max-h-full w-auto max-w-full rounded-md object-contain"
          />

          <button onClick={close} aria-label="Close" className={`${overlayButton} right-[22px] top-5`}>
            ×
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
            className={`${overlayButton} left-[22px] top-1/2 -translate-y-1/2 text-lg`}
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
            className={`${overlayButton} right-[22px] top-1/2 -translate-y-1/2 text-lg`}
          >
            ›
          </button>

          <p className="absolute inset-x-0 bottom-5 m-0 text-center font-body text-[13px] tracking-[0.1em] text-cream/60">
            {index + 1} / {all.length}
          </p>
        </div>
      )}
    </>
  );
}
