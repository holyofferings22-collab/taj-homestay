'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, prefersReducedMotion, scrollTriggerDefaults } from '@/lib/gsap';

/**
 * Moves its contents against the scroll, so a photograph drifts inside its
 * frame as the screen passes. The child should overflow the frame (a
 * `scale-110` on the image, or a taller wrapper) or the drift shows an edge.
 *
 * `strength` is the travel in percent of the element's own height across the
 * whole pass: 12 is a hint, 25 is cinematic.
 */
export function Parallax({
  children,
  strength = 12,
  className = '',
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      gsap.fromTo(
        el,
        { yPercent: -strength / 2 },
        {
          yPercent: strength / 2,
          ease: 'none',
          scrollTrigger: {
            ...scrollTriggerDefaults(),
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    },
    { dependencies: [strength] },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
