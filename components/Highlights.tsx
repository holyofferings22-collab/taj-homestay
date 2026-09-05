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

/* Fresh geometry each time: every card's start in scroll coordinates, the
   left padding (also the scroll padding, so a card is aligned when
   scrollLeft is its start less that), one card's step and one set. */
function measure(el: HTMLUListElement, count: number) {
  const cards = Array.from(el.querySelectorAll<HTMLLIElement>(':scope > li'));
  const origin = el.getBoundingClientRect().left - el.scrollLeft;
  const starts = cards.map((card) => card.getBoundingClientRect().left - origin);
  const pad = parseFloat(getComputedStyle(el).paddingLeft) || 0;
  return { cards, starts, pad, step: starts[1] - starts[0], set: starts[count] - starts[0] };
}

/** The card whose start is nearest the aligned edge. */
function nearest(starts: number[], edge: number) {
  let best = 0;
  starts.forEach((start, i) => {
    if (Math.abs(start - edge) < Math.abs(starts[best] - edge)) best = i;
  });
  return best;
}

/**
 * The highlights row: framed photographs with a caption under each, three
 * to a window from `lg`, one and a bit on a phone so the next card shows.
 *
 * It loops. The cards are laid out three times over and the track keeps
 * the card at its aligned edge inside the middle copy, so there is always
 * a full set to scroll into on either side. Whenever the scroll comes to
 * rest with that card outside the middle copy, the track is moved by
 * exactly one set's width, instantly, onto the identical card in the copy
 * alongside; nothing on screen changes, and the next swipe or arrow has
 * room again. The arrows do the same move before they scroll, so they
 * never reach the track's real ends either. Only the middle copy is in
 * the accessibility tree and the tab order; the other two are scenery.
 *
 * It is a native scroll-snap track, so a swipe or a trackpad works with no
 * script at all; each gesture stops at the next card (`snap-always`), and
 * the arrows only scroll to the neighbouring card.
 */
export function Highlights({ items }: { items: readonly Highlight[] }) {
  const track = useRef<HTMLUListElement>(null);
  /** The card an arrow is scrolling toward, while that scroll is in flight. */
  const pending = useRef<number | null>(null);
  /** When an arrow last moved the track a whole set, instantly. */
  const jumped = useRef(0);
  const count = items.length;

  useEffect(() => {
    const el = track.current;
    if (!el || count === 0) return;

    /* Back onto the middle copy once the scroll has settled: below the
       copy's first card, or past its last, move one set. Not from under a
       focused card that is on screen; a focused card the visitor has
       scrolled away from is not stranded by moving the view one set. */
    const recentre = () => {
      /* An arrow's instant one-set move raises its own scrollend a frame
         later, before the smooth scroll it precedes has begun; acting on
         that would move the track straight back. */
      if (performance.now() - jumped.current < 120) return;
      const { cards, set, step } = measure(el, count);
      if (!set) return;
      pending.current = null;
      const focused = cards.find((card) => card.contains(document.activeElement));
      if (focused) {
        const box = el.getBoundingClientRect();
        const r = focused.getBoundingClientRect();
        if (r.right > box.left && r.left < box.right) return;
      }
      if (el.scrollLeft < set - step / 2) el.scrollBy({ left: set, behavior: 'instant' });
      else if (el.scrollLeft > 2 * set - step / 2) el.scrollBy({ left: -set, behavior: 'instant' });
    };

    /* On mount this puts the track on the middle copy from wherever it is,
       so a swipe made before the script arrived is kept, not overridden. */
    recentre();

    /* `scrollend` where the browser has it; otherwise a scroll that has
       been quiet for a moment. And the moment focus leaves the track, in
       case a move was held back while a card had it. */
    let quiet: number | undefined;
    const onScroll = () => {
      window.clearTimeout(quiet);
      quiet = window.setTimeout(recentre, 160);
    };
    const onFocusOut = (event: FocusEvent) => {
      if (!el.contains(event.relatedTarget as Node | null)) recentre();
    };
    const hasScrollEnd = 'onscrollend' in window;
    if (hasScrollEnd) el.addEventListener('scrollend', recentre);
    else el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('focusout', onFocusOut);
    const sized = new ResizeObserver(recentre);
    sized.observe(el);
    return () => {
      window.clearTimeout(quiet);
      if (hasScrollEnd) el.removeEventListener('scrollend', recentre);
      else el.removeEventListener('scroll', onScroll);
      el.removeEventListener('focusout', onFocusOut);
      sized.disconnect();
    };
  }, [count]);

  /* To the neighbouring card. A second press while the first is still
     scrolling counts from the card being scrolled to, not from wherever
     the track happens to be, so quick presses do not lose a step. A target
     outside the middle copy is reached by first moving the track one set,
     instantly, onto the identical picture, so the arrows never run into
     the track's ends. */
  const page = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const { starts, pad, set } = measure(el, count);
    const from = pending.current ?? nearest(starts, el.scrollLeft + pad);
    let target = from + direction;
    if (target >= 2 * count) {
      jumped.current = performance.now();
      el.scrollBy({ left: -set, behavior: 'instant' });
      target -= count;
    } else if (target < count) {
      jumped.current = performance.now();
      el.scrollBy({ left: set, behavior: 'instant' });
      target += count;
    }
    pending.current = target;
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
        /* The scrollport clips ink at its padding edge, so the track keeps
           8px of padding (pulled back by the same margin, so nothing moves)
           for the cards' focus rings to paint in; the horizontal scroll
           padding matches, so a card still snaps to its own edge. The cross
           axis is hidden outright: cards rise 26px before their reveal, and
           an auto cross axis would let that catch a wheel or a finger. */
        className="m-0 -my-2 flex list-none gap-[var(--hl-gap)] overflow-x-auto overflow-y-hidden py-2 [--hl-gap:clamp(14px,2vw,28px)] [scrollbar-width:none] snap-x snap-mandatory -mx-[var(--gutter)] px-[var(--gutter)] scroll-px-[var(--gutter)] lg:-mx-2 lg:px-2 lg:scroll-px-2 [&::-webkit-scrollbar]:hidden"
      >
        {COPIES.map((copy) =>
          items.map((item, index) => {
            const real = copy === REAL;
            return (
              <li
                key={`${copy}-${item.title}`}
                data-rv=""
                aria-hidden={real ? undefined : true}
                /* The reveal's stagger is written against DOM order, which
                   would hand it to the first, hidden copy; the copy on
                   screen takes it by index instead. */
                style={{ transitionDelay: real ? `${index * 0.08}s` : '0s' }}
                className="w-[82%] flex-none snap-start snap-always sm:w-[calc((100%-var(--hl-gap))/2)] lg:w-[calc((100%-2*var(--hl-gap))/3)]"
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
          midline, or as near to centred as the gutter allows: below 1200px
          it is narrower than the arrow, so the shift is capped to keep the
          arrow 6px inside the window rather than widening the page. Below
          `lg` the pair sit under the track instead, at the left, clear of
          the fixed pills that own the right-hand corner; a swipe does the
          same job. Neither end is an end, so neither arrow ever disables. */}
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
          className={`${arrow} pointer-events-auto -translate-x-[min(calc(50%+var(--gutter)/2),calc(var(--gutter)-6px))]`}
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Next highlights"
          onClick={() => page(1)}
          className={`${arrow} pointer-events-auto translate-x-[min(calc(50%+var(--gutter)/2),calc(var(--gutter)-6px))]`}
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
