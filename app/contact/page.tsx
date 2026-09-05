import type { Metadata } from 'next';
import { Clock, Mail, MapPin } from 'lucide-react';
import { Screen } from '@/components/Screen';
import { HeroScreen } from '@/components/HeroScreen';
import { ContactScreen } from '@/components/ContactScreen';
import { ContactForm } from '@/components/ContactForm';
import { Faq } from '@/components/Faq';
import { WhatsApp } from '@/components/BrandIcons';
import { contactPage } from '@/content/contact';
import { media } from '@/content/media';
import { contact } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact and booking',
  description: contactPage.lead,
};

export default function ContactPage() {
  return (
    <>
      <HeroScreen
        id="contact-intro"
        eyebrow={contactPage.eyebrow}
        heading={contactPage.heading}
        headingEmphasis={contactPage.headingEmphasis}
        lead={contactPage.lead}
        image={media.frontDesk ?? contactPage.heroImage}
      >
        <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="pill pill-gold">
          <WhatsApp className="h-4 w-4" />
          Book now
        </a>
      </HeroScreen>

      {/* The enquiry form beside the ways to reach the desk. Taller than a
          phone screen, so it is a long snap area. */}
      <Screen
        id="enquiry"
        tone="light"
        auto
        labelledBy="enquiry-heading"
        className="content-center gap-10 bg-white px-[var(--gutter)] pb-[clamp(56px,7vh,88px)] pt-[clamp(84px,10vh,104px)] lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16"
      >
        <div className="grid gap-6">
          <div className="grid gap-3">
            <h2 id="enquiry-heading" data-rv="" className="text-[length:var(--step-section)] leading-[1.06]">
              {contactPage.formHeading}
            </h2>
            <p className="lede" data-rv="">
              {contactPage.formLead}
            </p>
          </div>
          <div data-rv="">
            <ContactForm />
          </div>
        </div>

        <div data-rv="" className="grid gap-5 lg:pt-0">
          <h3 className="text-[length:var(--step-card)] font-medium leading-tight">{contactPage.reachHeading}</h3>
          <dl className="reach m-0 grid grid-cols-[112px_1fr] gap-x-6 gap-y-4 text-[15px]">
            <div className="contents">
              <dt className="flex items-center gap-3 text-slate">
                <WhatsApp className="h-4 w-4 flex-none text-whatsapp" />
                WhatsApp
              </dt>
              <dd className="m-0">
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-ink underline decoration-gold/70 underline-offset-4"
                >
                  {contact.phone.display}
                </a>
              </dd>
            </div>
            <div className="contents">
              <dt className="flex items-center gap-3 text-slate">
                <Mail aria-hidden="true" strokeWidth={1.25} className="h-4 w-4 flex-none text-gold-deep" />
                Email
              </dt>
              <dd className="m-0">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex min-h-11 items-center text-ink underline decoration-gold/70 underline-offset-4"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
            <div className="contents">
              <dt className="flex items-center gap-3 text-slate">
                <Clock aria-hidden="true" strokeWidth={1.25} className="h-4 w-4 flex-none text-gold-deep" />
                Desk
              </dt>
              <dd className="m-0 text-ink">{contact.frontDesk}</dd>
            </div>
            <div className="contents">
              <dt className="flex items-start gap-3 text-slate">
                <MapPin aria-hidden="true" strokeWidth={1.25} className="mt-1 h-4 w-4 flex-none text-gold-deep" />
                Address
              </dt>
              <dd className="m-0 text-ink">
                {contact.address.lines[0]}
                <br />
                {contact.address.lines[1]}
              </dd>
            </div>
          </dl>
          <p className="m-0 text-[13px] leading-[1.6] text-slate">{contactPage.directNote}</p>
        </div>
      </Screen>

      {/* Questions guests ask. Eight answers run past a phone screen, so it
          is a long snap area too. */}
      <Screen
        id="faq"
        tone="light"
        auto
        labelledBy="faq-heading"
        className="content-center gap-8 bg-mist px-[var(--gutter)] pb-[clamp(56px,7vh,88px)] pt-[clamp(84px,10vh,104px)]"
      >
        <Faq />
      </Screen>

      <ContactScreen />
    </>
  );
}
