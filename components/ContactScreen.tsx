import Link from 'next/link';
import { Screen } from '@/components/Screen';
import { Facebook, WhatsApp } from '@/components/BrandIcons';
import { MapEmbed } from '@/components/MapEmbed';
import { contact, copyright, nav, social, whatsappLink } from '@/content/site';

const messageDesk = whatsappLink('Hello Taj Home Stay, I have a question about a stay.');

/**
 * The last screen of every page: how to reach the desk, the map, and the
 * footer strip. It replaces the old footer, so there is exactly one place
 * that says where the property is and how to talk to it.
 */
export function ContactScreen() {
  return (
    <Screen id="contact" tone="dark" labelledBy="contact-heading" className="on-dark bg-forest text-porcelain">
      <div className="grid grid-rows-[1fr_auto]">
        <div className="grid items-center gap-7 px-[var(--gutter)] pb-6 pt-[var(--header-clear)] lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pb-10">
          <div className="grid gap-6">
            <p className="eyebrow" data-rv="">
              Contact
            </p>
            <h2 id="contact-heading" data-rv="" className="text-[length:var(--step-section)] leading-[1.06]">
              The desk is <span className="display-italic">always</span> on.
            </h2>
            <p data-rv="" className="m-0 text-[15px] leading-[1.7] text-sage-ink">
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="block min-h-11 font-display text-[30px] font-medium leading-tight text-porcelain"
              >
                {contact.phone.display}
              </a>
              WhatsApp is quickest, especially in Yashobhoomi event weeks.
            </p>
            <p data-rv="" className="m-0 text-[15px] leading-[1.7] text-sage-ink">
              {contact.address.lines[0]}
              <br />
              {contact.address.lines[1]}
            </p>
            <div data-rv="">
              <a href={messageDesk} target="_blank" rel="noopener noreferrer" className="pill pill-gold">
                <WhatsApp className="h-4 w-4" />
                Message the desk
              </a>
            </div>
          </div>

          <div data-rv="" className="h-[200px] overflow-hidden rounded-[6px] border border-hairline-dark bg-forest-2 lg:h-[360px]">
            <MapEmbed
              title="Map showing Taj Home Stay, Bharthal, Sector 26 Dwarka, New Delhi"
              src={contact.mapEmbedSrc}
              className="h-full opacity-90"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-hairline-dark px-[var(--gutter)] py-3 text-[11px] uppercase tracking-[0.16em] text-sage-ink">
          <span className="flex items-center gap-4">
            {copyright}
            {social.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Taj Home Stay on Facebook"
                className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-full border border-hairline-dark transition-colors hover:border-gold-light hover:text-gold-light"
              >
                <Facebook className="h-3.5 w-3.5" />
              </a>
            )}
          </span>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {nav
              .filter((item) => item.href !== '/')
              .map((item) => (
                <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center transition-colors hover:text-gold-light">
                  {item.label}
                </Link>
              ))}
            <Link href="/guides" className="inline-flex min-h-11 items-center transition-colors hover:text-gold-light">
              Guides
            </Link>
          </nav>
        </div>
      </div>
    </Screen>
  );
}
