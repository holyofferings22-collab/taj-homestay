'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
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
 *   among them. So whenever a section edge crosses the top of the window or
 *   the header's bottom edge, it re-derives the answer from every section's
 *   box. The header paints white the moment a light band is under any part
 *   of it and goes transparent only once a photograph fills the whole strip:
 *   a white bar over the last inches of a photograph reads as intended,
 *   white type over a light band does not. That is a handful of rectangles,
 *   and it runs only when a boundary moves, not per frame.
 *
 * The shell lives in the layout, so it does not remount when the route
 * changes; both observers are rebuilt on every pathname instead. Without
 * that, a page reached through a link kept its sections unrevealed and the
 * header painted for the page before.
 */
export function PageShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [tone, setTone] = useState('');
  const [screen, setScreen] = useState('');
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

    const sectionAt = (y: number) =>
      sections.find((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= y && r.bottom > y;
      });
    const underHeader = () => {
      const top = sectionAt(1) ?? sections[0];
      const bottom = sectionAt(HEADER + 1) ?? top;
      const hit = top.dataset.tone === 'light' ? top : bottom;
      setTone(hit.dataset.tone ?? 'light');
      setScreen(hit.id);
      setActiveHasBooking(Boolean(hit.querySelector(BOOKING_CONTROL)));
    };
    underHeader();

    /* Two bands, one from the top of the window and one from the header's
       bottom edge, each reaching a fifth of the way down the viewport. A
       section edge entering or leaving either is a moment the answer could
       have changed. */
    const bands = ['0px 0px -80% 0px', `-${HEADER}px 0px -80% 0px`].map(
      (rootMargin) => new IntersectionObserver(underHeader, { rootMargin, threshold: [0, 1] }),
    );
    sections.forEach((s) => bands.forEach((band) => band.observe(s)));

    window.addEventListener('resize', underHeader);
    const stopWatchingImages = refreshOnImageLoad();
    return () => {
      reveal.disconnect();
      bands.forEach((band) => band.disconnect());
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
