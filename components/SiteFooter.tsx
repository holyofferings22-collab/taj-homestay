import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';
import { Instagram, Facebook } from '@/components/BrandIcons';
import { Wordmark } from '@/components/Wordmark';
import { NewsletterForm } from '@/components/NewsletterForm';
import { brand, contact, copyright, footerNav, newsletter, social } from '@/content/site';

export function SiteFooter() {
  return (
    <div className="font-body text-base font-light leading-[1.7] text-muted">
      <footer className="border-t border-line bg-cream">
        <div className="mx-auto flex max-w-[1240px] flex-wrap gap-12 px-6 py-20">
          <div className="min-w-0 flex-[1_1_280px]">
            <Wordmark size="footer" />
            <p className="mt-[22px] max-w-[300px] text-[15px]">{brand.blurb}</p>
          </div>

          <div className="min-w-0 flex-[1_1_280px]">
            <h3 className="m-0 mb-2.5 font-display text-[22px] font-normal text-ink">
              {newsletter.heading}
            </h3>
            <p className="m-0 mb-5 text-[15px]">{newsletter.blurb}</p>
            <NewsletterForm />
          </div>

          <div className="min-w-0 flex-[1_1_260px]">
            <h3 className="m-0 mb-5 font-display text-[22px] font-normal text-ink">Our Info</h3>
            <div className="grid gap-3.5 text-[15px]">
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
                href={`tel:${contact.phone.dial}`}
                className="flex min-h-[30px] items-center gap-3 text-muted"
              >
                <Phone aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 flex-none text-accent" />
                {contact.phone.display}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex min-h-[30px] items-center gap-3 text-clay"
              >
                <Mail aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 flex-none text-accent" />
                {contact.email}
              </a>
            </div>

            <h3 className="mb-3.5 mt-[30px] font-display text-[20px] font-normal text-ink">
              Social Share
            </h3>
            <div className="flex gap-2.5">
              <a
                href={social.instagram}
                aria-label="Instagram"
                className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-line hover:border-accent"
              >
                <Instagram className="h-[18px] w-[18px] text-accent" />
              </a>
              <a
                href={social.facebook}
                aria-label="Facebook"
                className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-full border border-line hover:border-accent"
              >
                <Facebook className="h-[18px] w-[18px] text-accent" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-line">
          <div className="mx-auto flex max-w-[1240px] flex-wrap gap-8 px-6 py-[34px] text-sm">
            {footerNav.map((column, i) => (
              <div key={i} className="grid flex-[0_1_160px] gap-2.5">
                {column.map((item) => (
                  <Link key={item.href} href={item.href} className="text-muted">
                    {item.label}
                  </Link>
                ))}
              </div>
            ))}
            <p className="m-0 flex-[1_1_260px] text-right text-muted">{copyright}</p>
          </div>
        </div>
      </footer>

      {/* Fixed call bar, shown below 1000px exactly as the original did */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2.5 border-t border-line bg-cream/95 px-4 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-[12px] bar:hidden">
        <a
          href={`tel:${contact.phone.dial}`}
          className="inline-flex min-h-[50px] flex-auto items-center justify-center gap-2.5 rounded-full bg-clay text-base text-white hover:text-white"
        >
          Call to Book <span aria-hidden="true">&rarr;</span>
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
