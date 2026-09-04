'use client';

import { useRef, type ElementType, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion, scrollTriggerDefaults } from '@/lib/gsap';

/**
 * A heading whose words rise into place one after another when its screen
 * arrives.
 *
 * The words are split on the server, so the heading is real text in the HTML
 * with no client-side re-layout; GSAP only animates the spans that are
 * already there. Words are wrapped in an overflow-hidden line box, so each
 * one wipes up from behind its own edge rather than fading in place. An
 * `italic` word keeps its own emphasis.
 */
export function SplitHeading({
  as: Tag = 'h2',
  text,
  emphasis,
  id,
  className = '',
  delay = 0,
}: {
  as?: ElementType;
  text: string;
  /** Rendered in italic after `text`, still split into words. */
  emphasis?: string;
  id?: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const host = ref.current;
      const words = host?.querySelectorAll<HTMLElement>('[data-word] > span');
      if (!host || !words?.length || prefersReducedMotion()) return;
      /* `from`, not `fromTo`: the words are in place in the HTML and GSAP
         animates them out and back. If GSAP never runs, the heading simply
         reads, rather than staying invisible. */
      gsap.from(words, {
          yPercent: 110,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.055,
          delay,
          scrollTrigger: {
            ...scrollTriggerDefaults(),
            trigger: host,
            start: 'top 88%',
            once: true,
          },
      });
    },
    { dependencies: [text, emphasis, delay] },
  );

  const word = (w: string, i: number, italic: boolean) => (
    <span
      key={`${italic ? 'e' : 'w'}-${i}-${w}`}
      data-word=""
      className="inline-block overflow-hidden align-bottom pb-[0.12em]"
    >
      <span className={`inline-block ${italic ? 'display-italic' : ''}`}>{w}</span>
      {' '}
    </span>
  );

  return (
    <Tag ref={ref} id={id} className={className}>
      {text.split(' ').map((w, i) => word(w, i, false))}
      {emphasis ? emphasis.split(' ').map((w, i) => word(w, i, true)) : null}
    </Tag>
  );
}

/** A plain block that rises in on arrival, for anything that is not a heading. */
export function RiseIn({
  children,
  className = '',
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      /* `from` for the same reason: the block is visible in the HTML and
         GSAP animates it in from below. A failed GSAP leaves it readable. */
      gsap.from(el, {
          opacity: 0,
          y,
          duration: 0.9,
          ease: 'power3.out',
          delay,
          scrollTrigger: {
            ...scrollTriggerDefaults(),
            trigger: el,
            start: 'top 90%',
            once: true,
          },
      });
    },
    { dependencies: [delay, y] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
