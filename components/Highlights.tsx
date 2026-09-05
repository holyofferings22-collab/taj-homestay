'use client';

import { useEffect, useRef, useState } from 'react';
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

/**
 * The highlights row: framed photographs with a caption under each, three
 * to a window from `lg`, one and a bit on a phone so the next card shows.
 *
 * It is a native scroll-snap track, so a swipe or a trackpad works with no
 * script at all; the arrows only call `scrollBy`. Each arrow moves one card,
 * and the pair disable themselves at either end so a visitor can tell there
 * is no more. On phones the track runs out to the window's edges, which is
 * what lets the next card peek in.
 */
export function Highlights({ items }: { items: readonly Highlight[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => {
      setAtStart(el.scrollLeft <= 2);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    const sized = new ResizeObserver(update);
    sized.observe(el);
    return () => {
      el.removeEventListener('scroll', update);
      sized.disconnect();
    };
  }, []);

  const page = (direction: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('li');
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = card ? card.getBoundingClientRect().width + gap : el.clientWidth;
    el.scrollBy({ left: direction * step, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  const arrow =
    'grid h-12 w-12 place-items-center rounded-full border border-gold bg-white/85 text-gold-deep transition-[background-color,color,opacity] duration-300 hover:bg-gold hover:text-ink disabled:cursor-default disabled:opacity-30 disabled:hover:bg-white/85 disabled:hover:text-gold-deep';

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
        {items.map((item) => (
          <li
            key={item.title}
            data-rv=""
            className="w-[82%] flex-none snap-start sm:w-[calc((100%-var(--hl-gap))/2)] lg:w-[calc((100%-2*var(--hl-gap))/3)]"
          >
            <Link href={item.href} className="grid gap-4">
              <span className="photo photo-hover block aspect-[4/3] rounded-[6px]">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
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
        ))}
      </ul>

      {/* Side arrows from `lg`, centred in the gutters on the photographs'
          midline. Below `lg` the pair sit under the track instead, at the
          left, clear of the fixed pills that own the right-hand corner; a
          swipe does the same job. */}
      <div className="mt-6 flex justify-start gap-3 lg:hidden">
        <button type="button" aria-label="Previous highlights" onClick={() => page(-1)} disabled={atStart} className={arrow}>
          <ChevronLeft aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <button type="button" aria-label="Next highlights" onClick={() => page(1)} disabled={atEnd} className={arrow}>
          <ChevronRight aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-[33%] hidden -translate-y-1/2 justify-between lg:flex">
        <button
          type="button"
          aria-label="Previous highlights"
          onClick={() => page(-1)}
          disabled={atStart}
          className={`${arrow} pointer-events-auto -translate-x-[calc(50%+var(--gutter)/2)]`}
        >
          <ChevronLeft aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Next highlights"
          onClick={() => page(1)}
          disabled={atEnd}
          className={`${arrow} pointer-events-auto translate-x-[calc(50%+var(--gutter)/2)]`}
        >
          <ChevronRight aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
