'use client';

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { WhatsApp } from '@/components/BrandIcons';
import { contact } from '@/content/site';
import { refreshOnImageLoad } from '@/lib/gsap';

const BOOKING_CONTROL = 'a[href^="https://wa.me/"], button[type="submit"]';
const INTERACTIVE = 'a, button, input, select, textarea, summary, [role="dialog"], [contenteditable="true"]';

/**
 * The scroll system.
 *
 * The document does not scroll. This `<main>` is the one scroll container,
 * `100dvh` tall with `scroll-snap-type: y mandatory`, and every `<Screen>`
 * inside it is a snap point (see globals.css for the rules and the
 * reduced-motion fallback). Native CSS snap was chosen over GSAP pinning or a
 * smooth-scroll library because it behaves the same on iOS Safari, Android
 * Chrome and desktop, runs nothing on the scroll path, and cannot jank.
 *
 * IntersectionObservers rooted on the container do three jobs when a screen
 * becomes the active one: mark it `.in` so its `[data-rv]` children reveal,
 * record it for the dots and the phone pill, and copy its `data-tone` onto
 * `<html>` so the fixed header can repaint itself for the ground it is over.
 * There are no scroll listeners anywhere.
 */
export function SnapShell({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [screens, setScreens] = useState<string[]>([]);
  const [active, setActive] = useState('');
  const [activeHasBooking, setActiveHasBooking] = useState(true);
  const [resizeTick, setResizeTick] = useState(0);

  /* The container persists across routes, so its scroll offset would carry
     into the next page. Reset it before paint, with the CSS smooth scroll
     switched off for the moment so it is a jump and not an animation up
     through every screen. A hash that names a screen wins over the reset,
     which is what keeps /#rooms and /contact#faq working. */
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    const hash = window.location.hash.slice(1);
    const target = hash ? root.querySelector<HTMLElement>(`section[data-screen]#${CSS.escape(hash)}`) : null;
    root.scrollTop = target
      ? target.getBoundingClientRect().top - root.getBoundingClientRect().top + root.scrollTop
      : 0;
    root.style.scrollBehavior = previous;
  }, [pathname]);

  /* Observe the screens of the current page. Re-run on every route change
     (the sections are new nodes then) and when the container is resized
     (thresholds depend on its height). */
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>('section[data-screen]'));
    setScreens(nodes.map((n) => n.id));

    const mark = (el: HTMLElement) => {
      el.classList.add('in');
      setActive(el.id);
      setActiveHasBooking(Boolean(el.querySelector(BOOKING_CONTROL)));
      document.documentElement.dataset.tone = el.dataset.tone ?? 'light';
      /* Published so CSS can move the corner controls clear of a screen that
         carries something along its bottom edge, such as the home hero's
         availability bar. */
      document.documentElement.dataset.screen = el.id;
    };

    /* The screen nearest the top of the container is active from the start,
       so a deep link or a back navigation paints the right header tone. */
    const rootTop = root.getBoundingClientRect().top;
    const first = nodes
      .map((n) => ({ n, d: Math.abs(n.getBoundingClientRect().top - rootTop) }))
      .sort((a, b) => a.d - b.d)[0]?.n;
    if (first) mark(first);

    /* A screen becomes active at 55 percent visible. A screen taller than
       the viewport (a gallery grid, an article, three stacked room cards on
       a phone) can never reach that, so its threshold is the share of itself
       that fills 60 percent of the viewport instead. It also loses
       `scroll-snap-stop: always`, so a fast scroll is not held on it. One
       observer per distinct threshold; an entry only counts when it is at
       or above its own threshold, never on the way out. */
    const observers = new Map<number, IntersectionObserver>();
    for (const node of nodes) {
      node.classList.toggle('screen-long', node.offsetHeight > root.clientHeight + 4);
      const threshold = Math.min(
        0.55,
        Math.max(0.05, (root.clientHeight * 0.6) / Math.max(node.offsetHeight, 1)),
      );
      const key = Math.round(threshold * 1000);
      let io = observers.get(key);
      if (!io) {
        io = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting || entry.intersectionRatio < threshold - 0.01) continue;
              mark(entry.target as HTMLElement);
            }
          },
          { root, threshold },
        );
        observers.set(key, io);
      }
      io.observe(node);
    }

    /* ScrollTrigger measured the page before the photographs landed, and
       every one of them changes the height of its screen, so re-measure once
       they are in. ScrollTrigger listens for resize itself; calling refresh
       from the observer below would be a loop, because a refresh writes
       styles that resize the container that triggers the observer. */
    const stopWatchingImages = refreshOnImageLoad();

    /* Re-run only when the container's own box actually changes size. A
       rounding wobble or a refresh's own writes must not restart the
       observers, or they never settle long enough to report. */
    let lastW = Math.round(root.clientWidth);
    let lastH = Math.round(root.clientHeight);
    let resizeTimer: number | undefined;
    const ro = new ResizeObserver(() => {
      const w = Math.round(root.clientWidth);
      const h = Math.round(root.clientHeight);
      if (Math.abs(w - lastW) < 2 && Math.abs(h - lastH) < 2) return;
      lastW = w;
      lastH = h;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => setResizeTick((t) => t + 1), 200);
    });
    ro.observe(root);

    return () => {
      observers.forEach((io) => io.disconnect());
      ro.disconnect();
      stopWatchingImages();
      window.clearTimeout(resizeTimer);
    };
  }, [pathname, resizeTick]);

  /* Arrow and page keys move exactly one screen, but only when the page
     itself has the keys: never from inside a control, a link, a summary or
     the gallery lightbox, and never with a modifier held. The scroll uses
     `auto` so the container's CSS decides between smooth and instant, which
     is how reduced motion is honoured. */
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    function onKey(event: KeyboardEvent) {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const target = event.target as HTMLElement | null;
      if (
        target &&
        target !== document.body &&
        target !== document.documentElement &&
        target !== root &&
        target.closest(INTERACTIVE)
      ) {
        return;
      }
      const el = root!;
      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        el.scrollBy({ top: el.clientHeight, behavior: 'auto' });
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        el.scrollBy({ top: -el.clientHeight, behavior: 'auto' });
      } else if (event.key === 'Home') {
        event.preventDefault();
        el.scrollTo({ top: 0, behavior: 'auto' });
      } else if (event.key === 'End') {
        event.preventDefault();
        el.scrollTo({ top: el.scrollHeight, behavior: 'auto' });
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  /* Same-page anchors (`#rooms`, the dots, "View rooms" in the hero) must
     scroll this container: the document cannot move. A link to the page the
     visitor is already on, such as the footer's Contact link on /contact,
     would otherwise do nothing, so it scrolls to the top instead. Delegated,
     so links rendered later still work; links to other routes are left to
     Next. */
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    function onClick(event: MouseEvent) {
      if (event.button !== 0 || event.metaKey || event.ctrlKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      /* Only same-page targets. Next's Link has already called
         preventDefault by the time this runs, so that flag cannot be the
         test; the URL is. */
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      const id = url.hash.slice(1);
      if (id) {
        const screen = root!.querySelector<HTMLElement>(`section[data-screen]#${CSS.escape(id)}`);
        if (!screen) return;
        event.preventDefault();
        screen.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }
      event.preventDefault();
      root!.scrollTo({ top: 0, behavior: 'auto' });
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return (
    <>
      <main ref={ref} id="snap" className="snap">
        {children}
      </main>

      {screens.length > 1 && (
        <nav aria-label="Screens" className="snap-dots">
          {screens.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-label={id.replace(/-/g, ' ')}
              aria-current={active === id ? 'true' : undefined}
              className={active === id ? 'on' : undefined}
            />
          ))}
        </nav>
      )}

      {/* The booking action that is never off screen on a phone. A plain
          wa.me anchor, so the site-wide conversion listener sees it. Hidden
          while the active screen already carries a booking control (the
          home hero's bar, a room screen's pill, the contact screen), so it
          never paints over one; hidden while the menu is open (globals.css). */}
      {active && !activeHasBooking && (
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
