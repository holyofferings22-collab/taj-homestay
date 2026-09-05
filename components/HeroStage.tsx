'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BookingBar } from '@/components/BookingBar';
import { gsap, prefersReducedMotion, scrollTriggerDefaults } from '@/lib/gsap';

export type Frame = { src: string; alt: string };

const control =
  'grid h-11 w-11 place-items-center rounded-full border border-white/45 bg-white/10 text-white backdrop-blur-[2px] transition-all duration-300 hover:border-white hover:bg-white hover:text-ink';

/**
 * The opening screen, built the way a hotel front page is built: the property
 * photographed at full bleed, its name set along the foot, a way into the
 * gallery, and the availability bar pinned across the bottom edge.
 *
 * The frames cross-fade on a slow timer and can be stepped through with the
 * arrows at either side. The whole stage drifts against the scroll, so the
 * next screen slides over a photograph that is still moving.
 *
 * Under `prefers-reduced-motion` nothing advances on its own, nothing drifts
 * and nothing parallaxes; the arrows still work by hand.
 */
export function HeroStage({
  frames,
  name,
  locality,
  seconds = 6,
}: {
  frames: readonly Frame[];
  name: string;
  locality: string;
  seconds?: number;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const scope = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  const step = (dir: number) => setActive((i) => (i + dir + frames.length) % frames.length);

  /* Autoplay, restarted whenever the frame changes so a click gives the new
     frame its full turn rather than the remainder of the old one. It skips
     to the next frame that has actually decoded, so a slow connection shows
     the same photograph for longer instead of fading to a grey box. */
  useEffect(() => {
    if (paused || frames.length < 2 || prefersReducedMotion()) return;
    const timer = window.setTimeout(() => {
      setActive((i) => {
        const imgs = scope.current?.querySelectorAll<HTMLImageElement>('[data-frame] img');
        for (let step = 1; step <= frames.length; step += 1) {
          const next = (i + step) % frames.length;
          if (!imgs || imgs[next]?.complete) return next;
        }
        return i;
      });
    }, Math.max(2500, seconds * 1000));
    return () => window.clearTimeout(timer);
  }, [active, paused, frames.length, seconds]);

  /* Pause while the tab is in the background: an unseen cross-fade is only
     battery. */
  useEffect(() => {
    const onVisibility = () => setPaused(document.visibilityState !== 'visible');
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useGSAP(
    () => {
      const el = stage.current;
      const trigger = scope.current;
      if (!el || !trigger || prefersReducedMotion()) return;
      gsap.fromTo(
        el,
        { yPercent: 0 },
        {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            ...scrollTriggerDefaults(),
            trigger,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { dependencies: [] },
  );

  return (
    <div ref={scope} className="absolute inset-0 bg-ash">
      {/* The photographs. */}
      <div ref={stage} className="absolute inset-[-5%_0] overflow-hidden">
        {frames.map((frame, i) => (
          <div
            key={frame.src}
            data-frame=""
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)]"
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i !== active}
          >
            {/* Every frame loads eagerly. Lazy loading looks like the right
                answer for four full-bleed photographs, but the timer
                cross-fades to the next one after six seconds and a lazy
                frame is not there yet, so the screen goes grey. The first
                frame is preloaded and high priority because it is the LCP;
                the rest are eager at low priority, so they arrive during the
                idle time after first paint without competing with it. */}
            <Image
              src={frame.src}
              alt={i === 0 ? frame.alt : ''}
              fill
              preload={i === 0}
              fetchPriority={i === 0 ? 'high' : 'low'}
              loading="eager"
              quality={72}
              sizes="100vw"
              className={`object-cover ${i === active ? 'kenburns' : ''}`}
            />
          </div>
        ))}
      </div>

      {/* Shade at the top so the header's type holds, and along the foot so
          the name and the bar do. Nothing across the middle. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,34,30,0.45)_0%,rgba(28,34,30,0)_24%,rgba(28,34,30,0)_52%,rgba(28,34,30,0.72)_100%)]"
      />

      {/* Step through the frames. */}
      {frames.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous photograph"
            className={`${control} absolute left-[clamp(12px,2vw,28px)] top-1/2 z-[3] -translate-y-1/2`}
          >
            <ChevronLeft aria-hidden="true" strokeWidth={1.5} className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next photograph"
            className={`${control} absolute right-[clamp(12px,2vw,28px)] top-1/2 z-[3] -translate-y-1/2`}
          >
            <ChevronRight aria-hidden="true" strokeWidth={1.5} className="h-5 w-5" />
          </button>
        </>
      )}

      {/* The foot of the screen: the name and the way into the gallery, and
          the availability card beneath them, in one stack anchored to the
          bottom. The name used to be pinned at its own height while the
          card stacked taller on a phone, and the card rose over the name;
          in one stack the card can be any height and the name sits above
          it. The availability card used to be welded to the bottom edge of
          the photograph, which made the hero look like it ended in a wall;
          floated clear of the foot it reads as sitting in front of the
          photograph rather than being built into it. */}
      <div className="absolute inset-x-0 bottom-[clamp(22px,5vh,54px)] z-[3] grid gap-[clamp(18px,3.5vh,40px)] px-[var(--gutter)]">
        {/* One row, never wrapped: the name at the left, the gallery button
            at the right on the same line, on a phone as on a desk. Below
            `sm` the button is the thumbnail alone, so the name keeps room to
            break into two lines beside it. From `md` the right padding keeps
            the button clear of the live-support launcher, which sits in the
            same corner; on a phone the launcher steps aside over the hero. */}
        <div className="flex items-end justify-between gap-4 md:gap-6 md:pr-[max(0px,calc(210px-var(--gutter)))]">
          <p className="m-0 flex min-w-0 items-center gap-[clamp(14px,2vw,28px)]">
            <span aria-hidden="true" className="h-px w-[clamp(28px,5vw,74px)] flex-none bg-gold" />
            <span className="font-display text-[clamp(23px,4.4vw,62px)] uppercase leading-[1.05] tracking-[0.02em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.4)]">
              {name}, {locality}
            </span>
          </p>

          <Link
            href="/gallery"
            aria-label="Gallery"
            className="group flex flex-none items-center gap-3 rounded-[4px] bg-white/95 p-1.5 text-ink transition-colors duration-300 hover:bg-white sm:pr-5"
          >
            <span className="relative block h-11 w-16 overflow-hidden rounded-[3px] bg-mist">
              <Image
                src={frames[(active + 1) % frames.length].src}
                alt=""
                fill
                quality={60}
                sizes="64px"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
              />
            </span>
            <span className="hidden text-[12px] font-semibold uppercase tracking-[0.16em] sm:inline">Gallery</span>
          </Link>
        </div>

        <BookingBar variant="hero" />
      </div>
    </div>
  );
}
