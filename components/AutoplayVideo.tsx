'use client';

import { useEffect, useRef } from 'react';

/**
 * A muted, inline video that plays on its own only when the visitor has not
 * asked for reduced motion. Under `prefers-reduced-motion: reduce` it shows
 * its poster (or first frame) and offers the browser's controls instead.
 */
export function AutoplayVideo({
  src,
  poster,
  loop = false,
  className = '',
  ariaLabel,
}: {
  src: string;
  poster?: string;
  loop?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      if (reduce.matches) {
        video.pause();
        video.controls = true;
      } else {
        video.controls = false;
        video.play().catch(() => {
          /* Autoplay can be refused; the poster stays, which is fine. */
        });
      }
    };
    apply();
    reduce.addEventListener('change', apply);
    return () => reduce.removeEventListener('change', apply);
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      playsInline
      loop={loop}
      preload="metadata"
      aria-label={ariaLabel}
      className={className}
    />
  );
}
