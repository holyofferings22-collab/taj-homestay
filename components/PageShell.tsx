'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { WhatsApp } from '@/components/BrandIcons';
import { contact } from '@/content/site';
import { refreshOnImageLoad } from '@/lib/gsap';

const BOOKING_CONTROL = 'a[href^="https://wa.me/"], button[type="submit"]';
/** The fixed header's height; the tone is read from whatever sits just under it. */
const HEADER = 72;

/**
 * The page shell.
 *
 * The document scrolls. No scroll container, no snap, no key handlers,
 * nothing that intercepts a wheel or a swipe. Sections size to their own
 * content and the scroll runs free.
 *
 * Two observers against the viewport, neither on the scroll path:
 *
 * - Reveal marks a section `.in` the first time it arrives, then releases it,
 *   so scrolling back up never replays the page.
 * - Tone tells the header what it is over. It cannot trust the entries it is
 *   handed, because an observer only reports targets whose intersection
 *   changed, and the section already sitting under the header is often not
 *   among them. So whenever anything crosses the band below the header, it
 *   re-derives the answer from every section's box: the one that straddles
 *   the header's bottom edge wins. That is eight rectangles, and it runs only
 *   when a boundary moves, not per frame.
 */
export function PageShell({ children }: { children: ReactNode }) {
  const [tone, setTone] = useState('');
  const [activeHasBooking, setActiveHasBooking] = useState(true);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-screen]'));
    if (!sections.length) return;

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

    const underHeader = () => {
      const y = HEADER + 1;
      const hit =
        sections.find((s) => {
          const r = s.getBoundingClientRect();
          return r.top <= y && r.bottom > y;
        }) ?? sections[0];
      setTone(hit.dataset.tone ?? 'light');
      setActiveHasBooking(Boolean(hit.querySelector(BOOKING_CONTROL)));
    };
    underHeader();

    /* The band runs from the header's bottom edge to a fifth of the way
       down the viewport; any section edge entering or leaving it is a moment
       the answer could have changed. */
    const tones = new IntersectionObserver(underHeader, {
      rootMargin: `-${HEADER}px 0px -80% 0px`,
      threshold: [0, 1],
    });
    sections.forEach((s) => tones.observe(s));

    window.addEventListener('resize', underHeader);
    const stopWatchingImages = refreshOnImageLoad();
    return () => {
      reveal.disconnect();
      tones.disconnect();
      window.removeEventListener('resize', underHeader);
      stopWatchingImages();
    };
  }, []);

  useEffect(() => {
    document.documentElement.dataset.tone = tone || 'light';
  }, [tone]);

  return (
    <>
      <main id="page">{children}</main>

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
