'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { WhatsApp } from '@/components/BrandIcons';
import { contact } from '@/content/site';
import { refreshOnImageLoad } from '@/lib/gsap';

const BOOKING_CONTROL = 'a[href^="https://wa.me/"], button[type="submit"]';

/**
 * The page shell.
 *
 * The document scrolls. That is the whole design: no scroll container, no
 * `scroll-snap-type`, no key handlers, nothing that intercepts a wheel or a
 * swipe. An earlier version made `<main>` a `100dvh` scroller with mandatory
 * snap, which forced every gesture to land on a section boundary and read as
 * the page catching rather than gliding. Sections now size to their own
 * content and the scroll runs free.
 *
 * One IntersectionObserver against the viewport still does two jobs when a
 * section crosses into view: it marks the section `.in` so its `[data-rv]`
 * children reveal, and it copies the section's `data-tone` onto `<html>` so
 * the fixed header can repaint itself for whatever it is over. Observers do
 * not run on the scroll path, so this costs nothing per frame.
 */
export function PageShell({ children }: { children: ReactNode }) {
  const [tone, setTone] = useState('');
  const [activeHasBooking, setActiveHasBooking] = useState(true);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('section[data-screen]'));
    if (!sections.length) return;

    /* Reveal on entry, and never take it back: a section that has been read
       stays read, so scrolling up does not replay the page. */
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

    /* The header paints for whichever section owns the band directly beneath
       it. A narrow root margin pinned to the top of the viewport means the
       answer is always the section under the header, not whichever section
       happens to be largest. */
    const header = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).at(-1);
        if (!hit) return;
        const el = hit.target as HTMLElement;
        setTone(el.dataset.tone ?? 'light');
        setActiveHasBooking(Boolean(el.querySelector(BOOKING_CONTROL)));
      },
      { rootMargin: '-72px 0px -100% 0px', threshold: 0 },
    );
    sections.forEach((s) => header.observe(s));

    const stopWatchingImages = refreshOnImageLoad();
    return () => {
      reveal.disconnect();
      header.disconnect();
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
