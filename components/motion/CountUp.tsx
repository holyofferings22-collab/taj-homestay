'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion, scrollTriggerDefaults } from '@/lib/gsap';

/**
 * Counts up to a number the first time it scrolls into view.
 *
 * The finished value is rendered on the server, so it is in the HTML, it is
 * what a search engine and a screen reader read, and it is what shows under
 * reduced motion. The animation only rewrites the text of an `aria-hidden`
 * twin while it runs.
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const finished = `${prefix}${value.toFixed(decimals)}${suffix}`;

  useGSAP(
    () => {
      const host = ref.current;
      const el = host?.querySelector<HTMLElement>('[data-count]');
      if (!host || !el || prefersReducedMotion()) return;
      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = `${prefix}${counter.n.toFixed(decimals)}${suffix}`;
        },
        scrollTrigger: {
          ...scrollTriggerDefaults(),
          trigger: host,
          start: 'top 85%',
          once: true,
        },
      });
    },
    { dependencies: [value, decimals, prefix, suffix] },
  );

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{finished}</span>
      <span aria-hidden="true" data-count="">
        {finished}
      </span>
    </span>
  );
}
