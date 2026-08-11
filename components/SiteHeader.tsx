'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { Instagram, Facebook, WhatsApp } from '@/components/BrandIcons';
import { Wordmark } from '@/components/Wordmark';
import { contact, nav, social } from '@/content/site';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-body font-light text-muted">
      {/* Top contact bar.

          Phone and email side by side need ~350px, more than a 375px phone has
          once the social icons are in the row, so all three used to wrap onto
          separate lines — 126px of strip above a 104px header, a quarter of the
          screen before the page began. The email address is the long one and
          the least useful to a thumb, so below 640px it drops out and the bar
          holds one line: tap-to-WhatsApp on the left, profiles on the right.
          The address itself is still on the footer and the contact page. */}
      <div className="bg-sand">
        <div className="flex flex-wrap items-center justify-between gap-x-7 gap-y-2 px-[clamp(20px,3vw,48px)] py-[11px] text-sm">
          <div className="flex flex-wrap items-center gap-x-7 gap-y-1.5">
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-9 items-center gap-[9px] font-semibold text-black sm:min-h-[30px]"
            >
              <WhatsApp className="h-5 w-5 text-whatsapp" />
              {contact.phone.display}
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="hidden min-h-[30px] items-center gap-[9px] font-semibold text-black sm:flex"
            >
              <Mail aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 text-accent" />
              {contact.email}
            </a>
          </div>
          <div className="flex items-center gap-2.5">
            {social.whatsapp && (
              <a
                href={social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="inline-flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-70 sm:h-[30px] sm:w-[30px]"
              >
                <WhatsApp className="h-5 w-5 text-whatsapp" />
              </a>
            )}
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-70 sm:h-[30px] sm:w-[30px]"
              >
                <Instagram className="h-5 w-5 text-instagram" />
              </a>
            )}
            {social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center transition-opacity hover:opacity-70 sm:h-[30px] sm:w-[30px]"
              >
                <Facebook className="h-5 w-5 text-facebook" />
              </a>
            )}
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-30 border-b border-line bg-cream/90 backdrop-blur-[14px]">
        <div className="flex items-center gap-4 px-[clamp(20px,3vw,48px)] py-2.5 sm:gap-6 sm:py-3.5">
          <div className="flex min-w-0 flex-1 justify-start">
            <Link href="/" className="flex-none">
              <Wordmark size="header" />
            </Link>
          </div>

          <nav
            aria-label="Primary"
            className="hidden flex-none items-center gap-[22px] whitespace-nowrap text-[length:var(--step-body)] nav:flex"
          >
            {nav.map((item) => (
              <Link key={item.href} href={item.href} className="py-1.5 text-ink">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex min-w-0 flex-1 justify-end">
            <Link
              href="/contact"
              className="hidden min-h-[44px] flex-none items-center gap-[9px] rounded-full bg-clay px-6 py-[13px] text-[length:var(--step-body)] text-white transition-colors duration-[250ms] hover:bg-accent hover:text-ink nav:inline-flex"
            >
              Book Now <span aria-hidden="true">&rarr;</span>
            </Link>

            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex h-[46px] w-[46px] flex-none cursor-pointer flex-col items-center justify-center gap-[5px] rounded-xl border border-line bg-white nav:hidden"
            >
              <span aria-hidden="true" className="block h-[1.5px] w-[18px] bg-ink" />
              <span aria-hidden="true" className="block h-[1.5px] w-[18px] bg-ink" />
              <span aria-hidden="true" className="block h-[1.5px] w-[18px] bg-ink" />
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            aria-label="Primary"
            className="grid gap-0.5 border-t border-line bg-cream px-[clamp(20px,3vw,48px)] pb-5 pt-2 text-base nav:hidden"
          >
            {nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`min-h-[44px] py-[13px] text-ink ${i > 0 ? 'border-t border-line-soft' : ''}`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2.5 inline-flex min-h-12 items-center justify-center gap-[9px] rounded-full bg-clay p-[15px] text-white"
            >
              Book Now <span aria-hidden="true">&rarr;</span>
            </Link>
          </nav>
        )}
      </header>
    </div>
  );
}
