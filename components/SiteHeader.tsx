'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { WhatsApp } from '@/components/BrandIcons';
import { brand, contact, nav } from '@/content/site';

/**
 * Fixed header. It repaints itself for whatever sits under it: transparent
 * over a photograph, white over a light ground. The tone arrives as
 * `data-tone` on <html>, set by PageShell from an IntersectionObserver, so
 * nothing here re-renders on scroll.
 *
 * The menu's open state remembers which route it was opened on, so a route
 * change (a menu link, or back and forward) closes it without an effect.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const close = () => setOpenOn(null);

  useEffect(() => {
    /* The phone pill hides while the menu is open (globals.css reads this). */
    document.documentElement.dataset.menu = open ? 'open' : '';
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpenOn(null);
    }
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.documentElement.dataset.menu = '';
    };
  }, [open]);

  return (
    <>
      <header className={`site-header ${open ? 'menu-open' : ''}`}>
        {/* No aria-label: the visible name and locality are the accessible
            name, and a label that differs from the visible text fails the
            label-in-name check. */}
        <Link href="/" className="brand">
          <Image
            src={brand.logo.src}
            alt=""
            width={brand.logo.width}
            height={brand.logo.height}
            sizes="130px"
            loading="eager"
            className="brand-mark"
            /* The intrinsic size goes in the props and the display size in
               the style, so next/image sees both dimensions change together
               and knows the ratio is kept. Height first, width follows. */
            style={{ height: 34, width: 'auto' }}
          />
          <span className="brand-name">
            {brand.name}
            <small>Dwarka · New Delhi</small>
          </span>
        </Link>

        <nav aria-label="Primary" className="site-nav">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="site-actions">
          {/* Below 640px only the WhatsApp mark shows, as a 44px circle. */}
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Check availability on WhatsApp"
            className="pill pill-gold header-pill"
          >
            <WhatsApp className="h-4 w-4 flex-none" />
            <span className="header-pill-label">Check availability</span>
          </a>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpenOn(open ? null : pathname)}
            className="menu-button"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Full-screen menu for phones and narrow windows. Always in the tree
          so its links can fade and rise in; inert while closed so nothing in
          it can take focus. */}
      <div id="site-menu" className="site-menu" data-open={open} inert={!open} aria-hidden={!open}>
        <nav aria-label="Primary">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : '0ms' }}
              aria-current={pathname === item.href ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="site-menu-foot">
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="pill pill-gold">
            <WhatsApp className="h-4 w-4" />
            Check availability
          </a>
          <p>
            {contact.phone.display}
            <br />
            {contact.frontDesk}
          </p>
        </div>
      </div>
    </>
  );
}
