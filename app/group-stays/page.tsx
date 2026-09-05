import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CarFront, ConciergeBell, MapPin } from 'lucide-react';
import { Screen } from '@/components/Screen';
import { HeroScreen } from '@/components/HeroScreen';
import { ContactScreen } from '@/components/ContactScreen';
import { WhatsApp } from '@/components/BrandIcons';
import { groupStays } from '@/content/group-stays';
import { media } from '@/content/media';
import { whatsappLink } from '@/content/site';

export const metadata: Metadata = {
  title: 'Group stays',
  description: groupStays.lead,
};

const icons = { MapPin, ConciergeBell, CarFront };

const groupEnquiry = whatsappLink(
  'Hello Taj Home Stay, I would like to enquire about a group booking. Dates and room count to follow.',
);

export default function GroupStaysPage() {
  return (
    <>
      <HeroScreen
        id="groups-intro"
        eyebrow={groupStays.eyebrow}
        heading={groupStays.heading}
        headingEmphasis={groupStays.headingEmphasis}
        lead={groupStays.lead}
        image={media.corridor ?? groupStays.intro.heroImage}
      >
        <a href={groupEnquiry} target="_blank" rel="noopener noreferrer" className="pill pill-gold">
          <WhatsApp className="h-4 w-4" />
          Book now
        </a>
      </HeroScreen>

      {/* How a block works, beside a room. */}
      <Screen
        id="how-it-works"
        tone="light"
        auto
        labelledBy="how-heading"
        className="content-center gap-10 bg-white px-[var(--gutter)] pb-[clamp(56px,7vh,88px)] pt-[clamp(84px,10vh,104px)] lg:grid-cols-[1.05fr_1fr] lg:items-center"
      >
        <div className="grid max-w-[540px] gap-5">
          <h2 id="how-heading" data-rv="" className="text-[length:var(--step-section)] leading-[1.06]">
            {groupStays.intro.heading}{' '}
            <span className="display-italic">{groupStays.intro.headingEmphasis}</span>
          </h2>
          {groupStays.intro.paragraphs.map((text) => (
            <p key={text.slice(0, 24)} data-rv="" className="lede">
              {text}
            </p>
          ))}
        </div>
        <Link href="/gallery" data-rv="" className="photo photo-hover block h-[min(56vh,520px)] rounded-[6px] max-lg:hidden">
          <Image
            src={groupStays.intro.image.src}
            alt={groupStays.intro.image.alt}
            fill
            quality={72}
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <span className="photo-caption">See the gallery</span>
        </Link>
      </Screen>

      {/* Three reasons, on hairlines. */}
      <Screen
        id="why"
        tone="light"
        auto
        labelledBy="why-heading"
        className="content-center gap-8 bg-ash px-[var(--gutter)] pb-[clamp(56px,7vh,88px)] pt-[clamp(84px,10vh,104px)]"
      >
        <h2 id="why-heading" data-rv="" className="max-w-[760px] text-[length:var(--step-section)] leading-[1.06]">
          {groupStays.usps.heading} <span className="display-italic">{groupStays.usps.headingEmphasis}</span>
        </h2>
        <ul className="m-0 grid list-none gap-x-10 p-0 lg:grid-cols-3">
          {groupStays.usps.cards.map((card) => {
            const Icon = icons[card.icon];
            return (
              <li
                key={card.title}
                data-rv=""
                className="grid content-start gap-3 border-t border-gold/50 py-6 transition-[padding] duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:pl-2"
              >
                <Icon aria-hidden="true" strokeWidth={1.25} className="h-6 w-6 text-gold" />
                <h3 className="text-[length:var(--step-card)] font-medium leading-tight">{card.title}</h3>
                <p className="m-0 text-[length:var(--step-body)] leading-[1.65] text-slate">{card.body}</p>
              </li>
            );
          })}
        </ul>
      </Screen>

      {/* What the block includes, beside a room. */}
      <Screen
        id="includes"
        tone="light"
        auto
        labelledBy="includes-heading"
        className="content-center gap-10 bg-mist px-[var(--gutter)] pb-[clamp(56px,7vh,88px)] pt-[clamp(84px,10vh,104px)] lg:grid-cols-[1fr_1.05fr] lg:items-center"
      >
        <Link href="/gallery" data-rv="" className="photo photo-hover block h-[min(56vh,520px)] rounded-[6px] max-lg:hidden lg:order-1">
          <Image
            src={groupStays.includes.image.src}
            alt={groupStays.includes.image.alt}
            fill
            quality={72}
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
          <span className="photo-caption">See the gallery</span>
        </Link>
        <div className="grid gap-6 lg:order-2">
          <h2 id="includes-heading" data-rv="" className="text-[length:var(--step-section)] leading-[1.06]">
            {groupStays.includes.heading}{' '}
            <span className="display-italic">{groupStays.includes.headingEmphasis}</span>
          </h2>
          <ul data-rv="" className="rows m-0 list-none p-0 text-[15px] sm:grid-cols-2 sm:gap-x-8">
            {groupStays.includes.items.map((item) => (
              <li key={item} className="text-ink">
                {item}
              </li>
            ))}
          </ul>
          <div data-rv="">
            <a href={groupEnquiry} target="_blank" rel="noopener noreferrer" className="pill pill-ink">
              <WhatsApp className="h-4 w-4" />
              Book now
            </a>
          </div>
        </div>
      </Screen>

      {/* The numbers. */}
      <Screen
        id="group-numbers"
        tone="light"
        auto
        labelledBy="group-numbers-heading"
        className="content-center bg-ash px-[var(--gutter)] pb-[clamp(56px,7vh,88px)] pt-[clamp(84px,10vh,104px)]"
      >
        <h2 id="group-numbers-heading" className="sr-only">
          Group stays in numbers
        </h2>
        <dl className="m-0 grid gap-x-8 gap-y-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          {groupStays.stats.map((stat) => (
            <div key={stat.label} data-rv="" className="grid gap-3">
              <dt className="order-2 mx-auto max-w-[22ch] text-[11px] uppercase tracking-[0.26em] text-slate">
                {stat.label}
              </dt>
              <dd className="order-1 m-0 font-display text-[length:var(--step-stat)] leading-none text-gold-deep">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Screen>

      <ContactScreen />
    </>
  );
}
