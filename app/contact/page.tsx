import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { ContactForm } from '@/components/ContactForm';
import { Reveal } from '@/components/Reveal';
import { contactPage } from '@/content/contact';
import { contact } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact & booking',
  description: contactPage.lead,
};

export default function ContactPage() {
  return (
    <div className="font-body text-base font-light leading-[1.7] text-muted">
      <PageHero
        eyebrow={contactPage.eyebrow}
        heading={contactPage.heading}
        lead={contactPage.lead}
      />

      <Reveal className="mx-auto max-w-[1240px] px-6 pb-[104px] pt-[88px]">
        <div className="flex flex-wrap items-start gap-10">
          <div className="min-w-0 flex-[1_1_340px]">
            <h2 className="m-0 mb-[22px] font-display text-[26px] font-normal text-ink">
              {contactPage.formHeading}
            </h2>
            <ContactForm />
          </div>

          <div className="min-w-0 max-w-[420px] flex-[1_1_300px]">
            <div className="rounded-2xl border border-line bg-white px-7 py-8">
              <h2 className="m-0 mb-5 font-display text-2xl font-normal text-ink">
                {contactPage.reachHeading}
              </h2>

              <div className="grid gap-4 text-[15px]">
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
                  className="flex min-h-[34px] items-center gap-3 text-ink"
                >
                  <Phone aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 flex-none text-accent" />
                  {contact.phone.display}
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex min-h-[34px] items-center gap-3 text-clay"
                >
                  <Mail aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 flex-none text-accent" />
                  {contact.email}
                </a>
                <p className="m-0 flex gap-3">
                  <Clock
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="mt-1 h-4 w-4 flex-none text-accent"
                  />
                  {contact.frontDesk}
                </p>
              </div>

              <a
                href={`tel:${contact.phone.dial}`}
                className="mt-[26px] inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-clay px-[26px] py-4 text-[15px] text-white hover:text-white"
              >
                {contactPage.callCta} <span aria-hidden="true">&rarr;</span>
              </a>

              <p className="mt-[18px] text-[13px]">{contactPage.bookingSites}</p>
            </div>

            <div className="mt-6 h-[260px] overflow-hidden rounded-2xl border border-line">
              <iframe
                title="Map showing Taj Home Stay, Bharthal, Sector 26 Dwarka, New Delhi"
                src={contact.mapEmbedSrc}
                loading="lazy"
                className="block h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
