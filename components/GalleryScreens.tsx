'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Screen } from '@/components/Screen';

export type Photo = { src: string; alt: string };
export type GallerySection = {
  id: string;
  heading: string;
  count: string;
  photos: readonly Photo[];
};

const overlayButton =
  'absolute flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-[rgba(20,23,29,0.55)] font-body text-xl leading-none text-white backdrop-blur-[2px] transition-colors hover:bg-[rgba(20,23,29,0.85)]';

/**
 * One section per gallery group, each sized by its own photographs, with a
 * single lightbox whose arrow keys walk the whole gallery rather than
 * stopping at a section boundary.
 */
export function GalleryScreens({ sections }: { sections: readonly GallerySection[] }) {
  const all: Photo[] = sections.flatMap((section) => [...section.photos]);
  const [index, setIndex] = useState(-1);
  const open = index >= 0;

  const close = useCallback(() => setIndex(-1), []);
  const step = useCallback(
    (dir: number) => setIndex((i) => (i + dir + all.length) % all.length),
    [all.length],
  );

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    /* Focus moves into the dialog and comes back to the photograph that
       opened it when the dialog closes. Tab cycles inside the dialog. */
    const opener = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLButtonElement>('button[aria-label="Close"]')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button'));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey, true);
    /* Hold the page still behind the overlay, and hold its place: taking the
       scrollbar away would otherwise shift the layout sideways. */
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPad = body.style.paddingRight;
    const barWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (barWidth > 0) body.style.paddingRight = `${barWidth}px`;
    return () => {
      document.removeEventListener('keydown', onKey, true);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPad;
      opener?.focus();
    };
  }, [open, close, step]);

  const offsets = sections.reduce<number[]>((acc, section, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + sections[i - 1].photos.length);
    return acc;
  }, []);

  return (
    <>
      {sections.map((section, s) => (
        <Screen
          key={section.id}
          id={section.id}
          tone="light"
          auto
          labelledBy={`${section.id}-heading`}
          className={`content-start gap-7 px-[var(--gutter)] pb-[clamp(28px,5vh,56px)] pt-[var(--header-clear)] ${
            s % 2 === 0 ? 'bg-white' : 'bg-mist'
          }`}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 id={`${section.id}-heading`} data-rv="" className="text-[length:var(--step-section)] leading-[1.06]">
              {section.heading}
            </h2>
            <p data-rv="" className="m-0 text-[11px] uppercase tracking-[0.22em] text-slate">
              {section.count}
            </p>
          </div>
          <ul data-rv="" className="m-0 grid list-none grid-cols-2 gap-2.5 p-0 sm:gap-4 lg:grid-cols-3">
            {section.photos.map((photo, i) => (
              <li key={photo.src}>
                <button
                  type="button"
                  onClick={() => setIndex(offsets[s] + i)}
                  aria-label={`View photo: ${photo.alt}`}
                  className="photo photo-hover block aspect-[4/3] w-full cursor-zoom-in rounded-[6px] border-0 p-0"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    quality={72}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="photo-caption">View</span>
                </button>
              </li>
            ))}
          </ul>
        </Screen>
      ))}

      {open && (
        <div
          ref={dialogRef}
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={all[index].alt}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[rgba(20,23,29,0.94)] px-3 py-16 sm:px-5 sm:py-10"
        >
          <Image
            src={all[index].src}
            alt={all[index].alt}
            width={2400}
            height={1800}
            quality={75}
            sizes="100vw"
            className="max-h-full w-auto max-w-full rounded-[6px] object-contain"
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
          <p className="absolute inset-x-0 bottom-5 m-0 text-center font-body text-[11px] uppercase tracking-[0.22em] text-white/60">
            {index + 1} of {all.length}
          </p>
        </div>
      )}
    </>
  );
}
