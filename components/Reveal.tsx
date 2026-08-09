'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-in animation. The original checked getBoundingClientRect() on every
 * scroll event; IntersectionObserver does the same job off the main thread.
 * The 12% bottom margin reproduces the original's `innerHeight * 0.88` trigger.
 */
export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      data-reveal="1"
      data-revealed={revealed ? '1' : undefined}
      className={className}
    >
      {children}
    </section>
  );
}
