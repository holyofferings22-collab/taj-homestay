'use client';

import { useState } from 'react';

/**
 * A Google Maps embed that does not steal the swipe on phones.
 *
 * An iframe takes every touch that lands on it, and a map a third of the
 * screen tall would pan the map instead of moving to the next screen. Below
 * the `md` breakpoint the map sits under a plain cover until it is tapped;
 * after that it works as a map until focus leaves it. On wider screens,
 * where a mouse wheel is not a swipe, the cover never appears.
 */
export function MapEmbed({ src, title, className = '' }: { src: string; title: string; className?: string }) {
  const [live, setLive] = useState(false);

  return (
    <div className={`relative ${className}`} onBlur={() => setLive(false)}>
      <iframe
        title={title}
        src={src}
        loading="lazy"
        className={`block h-full w-full border-0 ${live ? '' : 'max-md:pointer-events-none'}`}
      />
      {!live && (
        <button
          type="button"
          onClick={() => setLive(true)}
          className="absolute inset-0 grid cursor-pointer place-items-end bg-transparent p-3 text-left md:hidden"
        >
          <span className="pill pill-ink text-[11px]">Tap to use the map</span>
        </button>
      )}
    </div>
  );
}
