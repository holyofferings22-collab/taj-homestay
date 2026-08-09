'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

export type HeroSlide = { src: string };

/**
 * Cross-fading hero backdrop. Matches the original: 900ms opacity fade,
 * 5s autoplay, dot controls that restart the timer on manual selection.
 */
export function HeroSlider({
  slides,
  autoplay = true,
  intervalSeconds = 5,
}: {
  slides: HeroSlide[];
  autoplay?: boolean;
  intervalSeconds?: number;
}) {
  const [active, setActive] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!autoplay) return;
    const ms = Math.max(1500, intervalSeconds * 1000);
    const timer = setInterval(() => setActive((i) => (i + 1) % slides.length), ms);
    return () => clearInterval(timer);
  }, [autoplay, intervalSeconds, slides.length, tick]);

  // Selecting a dot restarts the autoplay interval, as the original did.
  const goTo = useCallback((i: number) => {
    setActive(i);
    setTick((t) => t + 1);
  }, []);

  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 bg-stone">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
            style={{ opacity: active === i ? 1 : 0 }}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-[26px] z-[2] flex w-full items-center gap-[9px] px-[clamp(24px,4vw,76px)]">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            aria-current={active === i}
            className="h-[3px] w-7 cursor-pointer rounded-sm border-0 p-0 transition-colors duration-300"
            style={{ background: active === i ? '#A2591F' : 'rgba(28,26,24,0.28)' }}
          />
        ))}
      </div>
    </>
  );
}
