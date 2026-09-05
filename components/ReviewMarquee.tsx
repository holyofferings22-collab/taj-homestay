'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import type { Review } from '@/content/reviews';

/** Google's four-colour G, so the cards are visibly Google reviews. */
function GoogleMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.4 5.4 0 0 1-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A11.99 11.99 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.29a12 12 0 0 0 0 10.76l3.98-3.09Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.7 0 3.99 2.47 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75Z"
      />
    </svg>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <span aria-hidden="true" className="text-[13px] tracking-[0.22em] text-gold-deep">
      {'★'.repeat(count)}
      <span className="text-ink/20">{'★'.repeat(5 - count)}</span>
    </span>
  );
}

function Card({ review }: { review: Review }) {
  return (
    <figure className="m-0 grid w-[min(78vw,340px)] flex-none content-start gap-3 rounded-[10px] border border-hairline bg-white p-6">
      <div className="flex items-center justify-between gap-3">
        <Stars count={review.stars} />
        <GoogleMark className="h-4 w-4 flex-none" />
      </div>
      <blockquote className="m-0 text-[15px] leading-[1.6] text-ink">“{review.quote}”</blockquote>
      <figcaption className="text-[11px] uppercase tracking-[0.18em] text-slate">
        {review.name}
        <span className="mx-2 text-ink/25">/</span>
        {review.when}
      </figcaption>
    </figure>
  );
}

/**
 * A continuous slideshow of Google reviews.
 *
 * The edge fades read `--marquee-fade`, so a screen sets that to its own
 * ground and the strip fades into it rather than into a grey it is not on.
 *
 * The list is rendered twice, end to end, and the whole track is moved left by
 * exactly half its width before looping. Because the second copy is identical
 * and starts where the first ends, the seam never shows and the strip reads as
 * endless rather than as a carousel that snaps back.
 *
 * It pauses on hover and on keyboard focus, so a reader can finish a review
 * and reach the link inside a card. Under `prefers-reduced-motion` it does not
 * move at all and scrolls by hand instead.
 */
export function ReviewMarquee({ reviews, seconds = 46 }: { reviews: readonly Review[]; seconds?: number }) {
  const track = useRef<HTMLDivElement>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  useGSAP(
    () => {
      const el = track.current;
      if (!el || prefersReducedMotion()) return;
      tween.current = gsap.to(el, {
        /* Half, because the track holds the list twice. */
        xPercent: -50,
        ease: 'none',
        duration: seconds,
        repeat: -1,
      });
    },
    { dependencies: [seconds, reviews.length] },
  );

  const pause = () => tween.current?.pause();
  const play = () => tween.current?.play();

  if (!reviews.length) return null;

  return (
    <div
      /* Out to the window's edges: the band's horizontal padding is the
         gutter, so pulling the strip back by that on each side spans the
         page exactly. A `100vw` strip would include the scrollbar's width
         on desktops that reserve one, and overrun the page by half of it. */
      className="relative mx-[calc(-1*var(--gutter))] w-[calc(100%+2*var(--gutter))] self-stretch overflow-hidden"
      onMouseEnter={pause}
      onMouseLeave={play}
      onFocusCapture={pause}
      onBlurCapture={play}
    >
      {/* The strip fades out at both edges rather than being cut, so it reads
          as continuing past the screen. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[clamp(24px,8vw,120px)] bg-[linear-gradient(90deg,var(--marquee-fade,var(--color-ash)),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-[clamp(24px,8vw,120px)] bg-[linear-gradient(270deg,var(--marquee-fade,var(--color-ash)),transparent)]"
      />
      <div ref={track} className="flex w-max gap-4 px-4">
        {reviews.map((review, i) => (
          <Card key={`a-${i}`} review={review} />
        ))}
        {/* The second copy is decoration: a screen reader has already read the
            first, and reading every review twice helps nobody. */}
        <div aria-hidden="true" className="flex gap-4">
          {reviews.map((review, i) => (
            <Card key={`b-${i}`} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
