'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * GSAP, set up once for this site.
 *
 * The window does not scroll here: `main#snap` does (see SnapShell), so every
 * ScrollTrigger has to be told which element to watch.
 *
 * The scroller is passed as an ELEMENT rather than as the selector `'#snap'`,
 * and that is not a detail. `useGSAP`'s `scope` option makes gsap.context
 * resolve every selector string against descendants of the scoped element,
 * and `#snap` is an ancestor of every animated component, so as a string it
 * resolved to undefined and ScrollTrigger threw reading `_gsap` on it. As an
 * element it cannot be re-scoped, so `scope` is safe to use anywhere.
 *
 * Nothing pins. The container is `scroll-snap-type: y mandatory`, and a pin
 * spacer makes its section taller than the viewport, which under the CSS
 * Scroll Snap oversized-area rule turns that screen into a free-scrolling
 * region and shifts every later snap point. Every animation here is either a
 * scrub tied to the scroll position or a one-shot on entry, both of which
 * read the scroll position without changing the layout.
 *
 * `registerPlugin` is idempotent, so calling it at module scope is safe under
 * React strict mode and repeated imports.
 */
gsap.registerPlugin(ScrollTrigger);

export const SCROLLER_ID = 'snap';

/** The scroll container, or undefined during SSR and before it mounts. */
export function scroller(): HTMLElement | undefined {
  if (typeof document === 'undefined') return undefined;
  return document.getElementById(SCROLLER_ID) ?? undefined;
}

/**
 * Spread into a ScrollTrigger config. Call it at animation time, never at
 * module scope, so the element exists by the time it is read.
 */
export function scrollTriggerDefaults() {
  return { scroller: scroller() } as const;
}

/** True when the visitor has asked for less motion. */
export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * ScrollTrigger measures the page once and caches it. Photographs land after
 * that, and every one of them changes the height of the screen it sits in, so
 * the triggers have to be re-measured. Called once per page from SnapShell.
 */
export function refreshOnImageLoad() {
  if (typeof document === 'undefined') return () => {};
  const images = Array.from(document.images).filter((img) => !img.complete);
  if (!images.length) {
    ScrollTrigger.refresh();
    return () => {};
  }
  let left = images.length;
  const done = () => {
    left -= 1;
    if (left <= 0) ScrollTrigger.refresh();
  };
  images.forEach((img) => {
    img.addEventListener('load', done, { once: true });
    img.addEventListener('error', done, { once: true });
  });
  return () => images.forEach((img) => {
    img.removeEventListener('load', done);
    img.removeEventListener('error', done);
  });
}

export { gsap, ScrollTrigger };
