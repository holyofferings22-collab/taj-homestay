'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * GSAP, set up once for this site.
 *
 * The document scrolls, so ScrollTrigger watches the window and needs no
 * `scroller` at all. `scrollTriggerDefaults()` stays as the single place that
 * would change if that ever stopped being true, and so that call sites do not
 * have to be edited again.
 *
 * Nothing pins. A pin spacer rewrites the height of the page under whatever
 * else is measuring it, and every effect here is either a scrub tied to the
 * scroll position or a one-shot on entry, both of which read the scroll
 * position without changing the layout.
 *
 * `registerPlugin` is idempotent, so calling it at module scope is safe under
 * React strict mode and repeated imports.
 */
gsap.registerPlugin(ScrollTrigger);

/**
 * Spread into a ScrollTrigger config. Empty because the window is the
 * scroller; it stays so that every call site already has the hook if that
 * changes.
 */
export function scrollTriggerDefaults() {
  return {} as const;
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
