'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { WhatsApp } from '@/components/BrandIcons';
import { contact } from '@/content/site';
import { refreshOnImageLoad } from '@/lib/gsap';

const BOOKING_CONTROL = 'a[href^="https://wa.me/"], button[type="submit"]';
/** The fixed header's height; the section under it is read just below that. */
const HEADER = 72;
/** How far the page may move before the header stops being transparent. */
const AT_TOP = 24;

/**
 * The page shell.
 *
 * The document scrolls. No scroll container, no snap, no key handlers,
 * nothing that intercepts a wheel or a swipe. Sections size to their own
 * content and the scroll runs free.
 *
 * Three observers against the viewport, none on the scroll path:
 *
 * - Reveal marks a section `.in` the first time it arrives, then releases it,
 *   so scrolling back up never replays the page.
 * - Tone tells the header what to be. It is transparent only while the page
 *   sits at the very top, over a hero photograph, and solid white from the
 *   first scroll, wherever the page has got to, photographs included: the
 *   owner asked that a moving page never carry a see-through header. A
 *   sentinel pinned to the top of the page reports whether it is still in
 *   view; that is the whole test.
 * - Under-header names the section beneath the header, for the phone
 *   launcher and the phone booking pill. It cannot trust the entries it is
 *   handed, because an observer only reports targets whose intersection
 *   changed, so whenever a section edge crosses the band below the header
 *   it re-derives the answer from every section's box.
 *
 * The shell lives in the layout, so it does not remount when the route
 * changes; everything is rebuilt on every pathname instead.
 */
export function PageShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const sentinel = useRef<HTMLDivElement>(null);
  const [tone, setTone] = useState('');
  const [screen, setScreen] = useState('');
  const [activeHasBooking, setActiveHasBooking] = useState(true);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-screen]'));
    const top = sentinel.current;
    if (!sections.length || !top) return;

    const reveal = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('in');
          reveal.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    sections.forEach((s) => reveal.observe(s));

    /* Transparent only over the first section, and only while the page has
       not moved. Any other tone, and any scroll at all, paints it white. */
    const atTop = new IntersectionObserver(([entry]) => {
      setTone(entry.isIntersecting ? (sections[0].dataset.tone ?? 'light') : 'light');
    });
    atTop.observe(top);

    const underHeader = () => {
      const y = HEADER + 1;
      const hit =
        sections.find((s) => {
          const r = s.getBoundingClientRect();
          return r.top <= y && r.bottom > y;
        }) ?? sections[0];
      setScreen(hit.id);
      setActiveHasBooking(Boolean(hit.querySelector(BOOKING_CONTROL)));
    };
    underHeader();

    /* The band runs from the header's bottom edge to a fifth of the way
       down the viewport; any section edge entering or leaving it is a moment
       the answer could have changed. */
    const under = new IntersectionObserver(underHeader, {
      rootMargin: `-${HEADER}px 0px -80% 0px`,
      threshold: [0, 1],
    });
    sections.forEach((s) => under.observe(s));

    window.addEventListener('resize', underHeader);
    const stopWatchingImages = refreshOnImageLoad();
    return () => {
      reveal.disconnect();
      atTop.disconnect();
      under.disconnect();
      window.removeEventListener('resize', underHeader);
      stopWatchingImages();
    };
  }, [pathname]);

  /* `data-tone` paints the header; `data-screen` names the section under it,
     which globals.css reads to keep the phone launcher off the hero's card. */
  useEffect(() => {
    document.documentElement.dataset.tone = tone || 'light';
    document.documentElement.dataset.screen = screen;
  }, [tone, screen]);

  return (
    <>
      <main id="page" className="relative">
        {/* The top-of-page sentinel: while any of it is in view, the page
            has not scrolled. Out of flow, so the hero keeps its height. */}
        <div
          ref={sentinel}
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0"
          style={{ height: AT_TOP }}
        />
        {children}
      </main>

      {/* The booking action that is never off screen on a phone. A plain
          wa.me anchor, so the site-wide conversion listener sees it. It hides
          while the section under the header already carries a booking
          control, so it never lands on top of one. */}
      {!activeHasBooking && (
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="pill pill-gold snap-fab"
        >
          <WhatsApp className="h-4 w-4" />
          Check availability
        </a>
      )}
    </>
  );
}
