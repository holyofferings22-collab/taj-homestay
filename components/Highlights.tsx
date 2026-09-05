'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { prefersReducedMotion } from '@/lib/gsap';

export type Highlight = {
  title: string;
  detail: string;
  href: string;
  /** The line that appears over the photograph on hover. */
  cta: string;
  image: { src: string; alt: string };
};

/** The set is laid three times over; the middle copy is the one that counts. */
const COPIES = [0, 1, 2] as const;
const REAL = 1;

/**
 * The highlights row: framed photographs with a caption under each, three
 * to a window from `lg`, one and a bit on a phone so the next card shows.
 *
 * It loops. The cards are laid out three times over and the track starts
 * on the middle copy, so there is always a full set to scroll into on
 * either side. Whenever the scroll comes to rest outside the middle
 * stretch, the track is moved by exactly one set's width, instantly, onto
 * the identical card in the copy alongside; nothing on screen changes, and
 * the next swipe or arrow has room again. Only the middle copy is in the
 * accessibility tree and the tab order; the other two are scenery.
 *
 * It is a native scroll-snap track, so a swipe or a trackpad works with no
 * script at all; the arrows only scroll to the neighbouring card.
 */
export function Highlights({ items }: { items: readonly Highlight[] }) {
  const track = useRef<HTMLUListElement>(null);
  const count = items.length;

  useEffect(() => {
    const el = track.current;
    if (!el || count === 0) return;

    /* Fresh geometry each time: where every card starts in the track's
       scroll coordinates, and the width of one whole set. */
    const setWidth = () => {
      const cards = el.querySelectorAll<HTMLLIElement>(':scope > li');
      return cards[count].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
    };

    /* Start on the middle copy. The first copy is identical, so the jump
       from the server-rendered position is invisible. */
    el.scrollTo({ left: setWidth(), behavior: 'instant' });

    /* Back onto the middle stretch once the scroll has settled. Never while
       a card in the track has focus: moving the view from under a focused
       link would strand it off screen. */
    const recentre = () => {
      if (el.contains(document.activeElement)) return;
      const set = setWidth();
      if (!set) return;
      if (el.scrollLeft < set * 0.25) el.scrollBy({ left: set, behavior: 'instant' });
      else if (el.scrollLeft > set * 1.75) el.scrollBy({ left: -set, behavior: 'instant' });
    };

    /* `scrollend` where the browser has it; otherwise a scroll that has
       been quiet for a moment. */
    let quiet: number | undefined;
    const onScroll = () => {
      window.clearTimeout(quiet);
      quiet = window.setTimeout(recentre, 160);
    };
    const hasScrollEnd = 'onscrollend' in window;
    if (hasScrollEnd) el.addEventListener('scrollend', recentre);
    else el.addEventListener('scroll', onScroll, { passive: true });
    const sized = new ResizeObserver(recentre);
    sized.observe(el);
    return () => {
      window.clearTimeout(quiet);
      if (hasScrollEnd) el.removeEventListener('scrollend', recentre);
      else el.removeEventListener('scroll', onScroll);
      sized.disconnect();
    };
  }, [count]);

  /* To the neighbouring card: find the card nearest the track's aligned
     edge, then scroll so its neighbour sits there. */
  const page = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLLIElement>(':scope > li'));
    const origin = el.getBoundingClientRect().left - el.scrollLeft;
    const starts = cards.map((card) => card.getBoundingClientRect().left - origin);
    /* The padding is also the scroll padding, so a card is aligned when
       scrollLeft is its start less that. */
    const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
    const here = el.scrollLeft + pad;
    let nearest = 0;
    starts.forEach((start, i) => {
      if (Math.abs(start - here) < Math.abs(starts[nearest] - here)) nearest = i;
    });
    const target = Math.min(cards.length - 1, Math.max(0, nearest + direction));
    el.scrollTo({ left: starts[target] - pad, behavior: prefersReducedMotion() ? 'instant' : 'smooth' });
  };

  const arrow =
    'grid h-12 w-12 place-items-center rounded-full border border-gold bg-white/85 text-gold-deep transition-[background-color,color] duration-300 hover:bg-gold hover:text-ink';

  return (
    /* `min-w-0`: this sits in a grid track, and a grid item's minimum width
       is otherwise its min-content, which for a no-wrap flex track is the
       sum of every card's min-content. Without it the track widens the
       whole page on a phone. */
    <div className="relative min-w-0">
      <ul
        ref={track}
        role="list"
        className="m-0 flex list-none gap-[var(--hl-gap)] overflow-x-auto p-0 [--hl-gap:clamp(14px,2vw,28px)] [scrollbar-width:none] snap-x snap-mandatory -mx-[var(--gutter)] px-[var(--gutter)] scroll-px-[var(--gutter)] lg:mx-0 lg:px-0 lg:scroll-px-0 [&::-webkit-scrollbar]:hidden"
      >
        {COPIES.map((copy) =>
          items.map((item) => {
            const real = copy === REAL;
            return (
              <li
                key={`${copy}-${item.title}`}
                data-rv=""
                aria-hidden={real ? undefined : true}
                className="w-[82%] flex-none snap-start sm:w-[calc((100%-var(--hl-gap))/2)] lg:w-[calc((100%-2*var(--hl-gap))/3)]"
              >
                <Link href={item.href} tabIndex={real ? undefined : -1} className="grid gap-4">
                  <span className="photo photo-hover block aspect-[4/3] rounded-[6px]">
                    <Image
                      src={item.image.src}
                      alt={real ? item.image.alt : ''}
                      fill
                      quality={72}
                      sizes="(max-width: 640px) 82vw, (max-width: 1024px) 46vw, 30vw"
                    />
                    <span className="photo-caption">{item.cta}</span>
                  </span>
                  <span className="grid gap-2">
                    <span className="font-display text-[clamp(18px,1.4vw,22px)] font-medium uppercase leading-[1.25] tracking-[0.05em] text-ink">
                      {item.title}
                    </span>
                    <span className="text-[length:var(--step-body)] leading-[1.6] text-slate">{item.detail}</span>
                  </span>
                </Link>
              </li>
            );
          }),
        )}
      </ul>

      {/* Side arrows from `lg`, centred in the gutters on the photographs'
          midline. Below `lg` the pair sit under the track instead, at the
          left, clear of the fixed pills that own the right-hand corner; a
          swipe does the same job. Neither end is an end, so neither arrow
          ever disables. */}
      <div className="mt-6 flex justify-start gap-3 lg:hidden">
        <button type="button" aria-label="Previous highlights" onClick={() => page(-1)} className={arrow}>
          <ChevronLeft aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <button type="button" aria-label="Next highlights" onClick={() => page(1)} className={arrow}>
          <ChevronRight aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-[33%] hidden -translate-y-1/2 justify-between lg:flex">
        <button
          type="button"
          aria-label="Previous highlights"
          onClick={() => page(-1)}
          className={`${arrow} pointer-events-auto -translate-x-[calc(50%+var(--gutter)/2)]`}
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Next highlights"
          onClick={() => page(1)}
          className={`${arrow} pointer-events-auto translate-x-[calc(50%+var(--gutter)/2)]`}
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
