import Link from 'next/link';
import { MapPin, Mail } from 'lucide-react';
import { Instagram, Facebook, WhatsApp } from '@/components/BrandIcons';
import { Wordmark } from '@/components/Wordmark';
import { NewsletterForm } from '@/components/NewsletterForm';
import { brand, contact, copyright, footerNav, newsletter, social } from '@/content/site';

export function SiteFooter() {
  return (
    <div className="font-body text-[15px] font-light leading-[1.62] text-muted sm:text-base sm:leading-[1.7]">
      <footer className="border-t border-line bg-cream">
        <div className="mx-auto flex max-w-[1240px] flex-wrap gap-9 px-6 py-[var(--rhythm-block)] sm:gap-12">
          <div className="min-w-0 flex-[1_1_280px]">
            <Wordmark size="footer" />
            <p className="mt-[22px] max-w-[300px] text-[length:var(--step-body)]">{brand.blurb}</p>
          </div>

          <div className="min-w-0 flex-[1_1_280px]">
            <h3 className="m-0 mb-2.5 font-display text-[clamp(17px,2.8vw,22px)] font-normal text-ink">
              {newsletter.heading}
            </h3>
            <p className="m-0 mb-5 text-[length:var(--step-body)]">{newsletter.blurb}</p>
            <NewsletterForm />
          </div>

          <div className="min-w-0 flex-[1_1_260px]">
            <h3 className="m-0 mb-5 font-display text-[clamp(17px,2.8vw,22px)] font-normal text-ink">Our Info</h3>
            <div className="grid gap-3.5 text-[length:var(--step-body)]">
              <p className="m-0 flex gap-3">
                <MapPin
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="mt-1 h-4 w-4 flex-none text-accent"
                />
                <span>
                  {contact.address.lines[0]}
                  <br />
                  {contact.address.lines[1]}
                </span>
              </p>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-10 items-center gap-3 text-muted sm:min-h-[30px]"
              >
                <WhatsApp className="h-4 w-4 flex-none text-whatsapp" />
                {contact.phone.display}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex min-h-10 items-center gap-3 text-clay sm:min-h-[30px]"
              >
                <Mail aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 flex-none text-accent" />
                {contact.email}
              </a>
            </div>

            <h3 className="mb-3.5 mt-[30px] font-display text-[clamp(16px,2.6vw,20px)] font-normal text-ink">
              Social Share
            </h3>
            <div className="flex gap-2.5">
              {social.whatsapp && (
                <a
                  href={social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex h-[38px] w-[38px] items-center justify-center transition-opacity hover:opacity-70"
                >
                  <WhatsApp className="h-[22px] w-[22px] text-whatsapp" />
                </a>
              )}
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex h-[38px] w-[38px] items-center justify-center transition-opacity hover:opacity-70"
                >
                  <Instagram className="h-[22px] w-[22px] text-instagram" />
                </a>
              )}
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex h-[38px] w-[38px] items-center justify-center transition-opacity hover:opacity-70"
                >
                  <Facebook className="h-[22px] w-[22px] text-facebook" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-line">
          <div className="mx-auto flex max-w-[1240px] flex-wrap gap-8 px-6 py-[34px] text-sm">
            {/* On a pointer these are 20px lines 10px apart, which is fine to
                click and too small to tap — the whole footer nav sat under the
                24px minimum. Below 640px each link claims a 40px row instead,
                and the column gap closes to keep the block the same height. */}
            {footerNav.map((column, i) => (
              <div key={i} className="grid flex-[0_1_160px] gap-0.5 sm:gap-2.5">
                {column.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex min-h-10 items-center text-muted sm:min-h-0"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
            {/* Right-aligned only once it shares a row with the link columns.
                On a phone it wraps onto its own line, where right alignment
                reads as a stray indent against everything above it. */}
            <p className="m-0 flex-[1_1_260px] text-muted sm:text-right">{copyright}</p>
          </div>
        </div>
      </footer>

      {/* Fixed contact bar, shown below 1000px exactly as the original did */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-line bg-cream/95 px-4 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-[12px] bar:hidden">
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[50px] flex-auto items-center justify-center gap-2.5 rounded-full bg-clay text-base text-white hover:text-white"
        >
          <WhatsApp className="h-[18px] w-[18px]" />
          WhatsApp to Book
        </a>
        <Link
          href="/contact"
          className="inline-flex min-h-[50px] flex-none items-center justify-center rounded-full border border-line bg-white px-[22px] text-base text-ink"
        >
          Enquire
        </Link>
      </div>
      <div aria-hidden="true" className="h-[78px] bar:hidden" />
    </div>
  );
}
