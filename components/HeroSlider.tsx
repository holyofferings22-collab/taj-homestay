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
      {/* Two different jobs at two widths, so two positioning modes.

          From 640px up the photo is the hero: it fills the box and the copy
          sits on it behind a gradient wash. Below that it is a 16:9 block in
          normal flow with the copy underneath on cream — no wash, no overlay.
          That is not only tidier to read; it is the only way the crop comes
          out right. These are 4:3 photos, and in a 375×633 box `object-cover`
          scales them to fill the *height* and overflows sideways, cropping
          nothing vertically — so the strip left visible above the wash was the
          top third of the frame, which on the lead photo is ceiling and a fan.
          At 16:9 the same rule crops the other way and fits the room in.

          This wrapper is the positioning context for both the slides and the
          dots, so the dots stay on the photo at every width. They cannot go
          inside the slide layer below it: that is aria-hidden, and they are
          real controls. */}
      <div className="relative h-[56vw] max-h-[260px] sm:absolute sm:inset-0 sm:h-auto sm:max-h-none">
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

        <div className="absolute inset-x-0 bottom-3 z-[2] flex w-full items-center gap-[9px] px-6 sm:bottom-[26px] sm:px-[clamp(24px,4vw,76px)]">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
            aria-current={active === i}
            /* The bar stays 4px; the button around it is 24px so a thumb can
               actually land on it. `bg-clip-content` keeps the fill inside the
               content box, so the padding is target and not paint. */
            className="h-6 w-7 cursor-pointer rounded-sm border-0 bg-clip-content px-0 py-[10px] transition-colors duration-300"
            /* backgroundColor, not the `background` shorthand: the shorthand
               resets every background longhand it omits, which would put
               background-clip back to border-box and paint the whole target. */
            style={{ backgroundColor: active === i ? '#B08D57' : 'rgba(18,16,12,0.22)' }}
          />
        ))}
        </div>
      </div>
    </>
  );
}
