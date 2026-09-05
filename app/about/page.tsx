import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Banknote, CarFront, ConciergeBell, Utensils, Wifi, Zap } from 'lucide-react';
import { Screen } from '@/components/Screen';
import { HeroScreen } from '@/components/HeroScreen';
import { ContactScreen } from '@/components/ContactScreen';
import { about } from '@/content/about';
import { amenities } from '@/content/home';
import { media } from '@/content/media';

export const metadata: Metadata = {
  title: 'About the guest house',
  description: about.lead,
};

const icons = { ConciergeBell, Wifi, CarFront, Utensils, Zap, Banknote };

export default function AboutPage() {
  return (
    <>
      <HeroScreen
        id="about-intro"
        eyebrow={about.eyebrow}
        heading={about.heading}
        headingEmphasis={about.headingEmphasis}
        lead={about.lead}
        image={media.exterior ?? about.heroImage}
      />

      {/* The story beside the three photographs. */}
      <Screen
        id="story"
        tone="light"
        auto
        labelledBy="story-heading"
        className="content-center gap-10 bg-white px-[var(--gutter)] pb-[clamp(56px,7vh,88px)] pt-[clamp(84px,10vh,104px)] lg:grid-cols-[1fr_1.1fr] lg:items-center"
      >
        <div className="grid max-w-[520px] gap-5">
          <h2 id="story-heading" data-rv="" className="text-[length:var(--step-section)] leading-[1.06]">
            {about.story.heading} <span className="display-italic">{about.story.headingEmphasis}</span>
          </h2>
          {about.paragraphs.map((text) => (
            <p key={text.slice(0, 24)} data-rv="" className="lede">
              {text}
            </p>
          ))}
        </div>
        <div data-rv="" className="grid grid-cols-2 gap-3 max-lg:hidden">
          <Link href="/gallery" className="photo photo-hover col-span-2 block h-[min(38vh,360px)] rounded-[6px]">
            <Image
              src={about.images.lead.src}
              alt={about.images.lead.alt}
              fill
              quality={72}
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
            <span className="photo-caption">See the gallery</span>
          </Link>
          {about.images.supporting.map((photo) => (
            <Link key={photo.src} href="/gallery" className="photo photo-hover block h-[min(24vh,220px)] rounded-[6px]">
              <Image src={photo.src} alt={photo.alt} fill quality={72} sizes="28vw" />
              <span className="photo-caption">See the gallery</span>
            </Link>
          ))}
        </div>
      </Screen>

      {/* Amenities, six on hairlines. */}
      <Screen
        id="amenities"
        tone="light"
        auto
        labelledBy="amenities-heading"
        className="content-center gap-8 bg-mist px-[var(--gutter)] pb-[clamp(56px,7vh,88px)] pt-[clamp(84px,10vh,104px)]"
      >
        <h2 id="amenities-heading" data-rv="" className="max-w-[760px] text-[length:var(--step-section)] leading-[1.06]">
          {about.amenitiesHeading.heading}{' '}
          <span className="display-italic">{about.amenitiesHeading.headingEmphasis}</span>
        </h2>
        <ul className="m-0 grid list-none gap-x-10 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li
                key={item.title}
                data-rv=""
                className="grid gap-2 border-t border-gold/60 py-5 transition-[padding] duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:pl-2"
              >
                <Icon aria-hidden="true" strokeWidth={1.25} className="h-6 w-6 text-gold-deep" />
                <h3 className="text-[length:var(--step-card)] font-medium leading-tight">{item.title}</h3>
                <p className="m-0 text-[length:var(--step-body)] leading-[1.6] text-slate">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </Screen>

      {/* The numbers. */}
      <Screen
        id="numbers"
        tone="light"
        auto
        labelledBy="numbers-heading"
        className="content-center bg-ash px-[var(--gutter)] pb-[clamp(56px,7vh,88px)] pt-[clamp(84px,10vh,104px)]"
      >
        <h2 id="numbers-heading" className="sr-only">
          Taj Home Stay in numbers
        </h2>
        <dl className="m-0 grid gap-x-8 gap-y-10 text-center sm:grid-cols-2 lg:grid-cols-4">
          {about.stats.map((stat) => (
            <div key={stat.label} data-rv="" className="grid gap-3">
              <dt className="order-2 text-[11px] uppercase tracking-[0.26em] text-slate">{stat.label}</dt>
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
