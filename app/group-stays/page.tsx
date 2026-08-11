import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { CarFront, Check, ConciergeBell, MapPin } from 'lucide-react';
import { WhatsApp } from '@/components/BrandIcons';
import { PageHero, StatBand } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { groupStays } from '@/content/group-stays';
import { contact } from '@/content/site';

const icons = { MapPin, ConciergeBell, CarFront };

export const metadata: Metadata = {
  title: 'Group stays for teams and delegations',
  description: groupStays.lead,
};

export default function GroupStaysPage() {
  return (
    <div className="font-body text-[15px] font-light leading-[1.62] text-muted sm:text-base sm:leading-[1.7]">
      <PageHero
        eyebrow={groupStays.eyebrow}
        heading={groupStays.heading}
        lead={groupStays.lead}
      />

      <Reveal className="mx-auto max-w-[1240px] px-6 pt-[var(--rhythm-block)]">
        <div className="flex flex-wrap items-center gap-11">
          <div className="min-w-0 max-w-[460px] flex-[1_1_320px]">
            <h2 className="m-0 mb-[22px] font-display text-[clamp(20px,3.2vw,38px)] font-normal text-ink [text-wrap:pretty]">
              {groupStays.intro.heading}
            </h2>
            {groupStays.intro.paragraphs.map((text, i) => (
              <p key={i} className={i === 0 ? 'm-0' : 'mt-[18px]'}>
                {text}
              </p>
            ))}
            <div className="mt-[30px] flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-clay px-7 py-[15px] text-[length:var(--step-body)] text-white transition-colors duration-[250ms] hover:bg-accent hover:text-ink"
              >
                Enquire About Group Rates <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/location"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line px-6 py-[15px] text-[length:var(--step-body)] text-ink transition-colors duration-[250ms] hover:border-accent"
              >
                Getting Here <span aria-hidden="true" className="text-clay">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="relative h-[260px] sm:h-[400px] min-w-0 flex-[1_1_380px] overflow-hidden rounded-2xl">
            <Image
              src={groupStays.intro.image.src}
              alt={groupStays.intro.image.alt}
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 pt-[var(--rhythm-section)]">
        <h2 className="m-0 mb-9 text-center font-display text-[length:var(--step-section)] font-normal text-ink sm:mb-12">
          {groupStays.usps.heading}
        </h2>
        <div className="grid grid-cols-1 gap-5 min-[680px]:grid-cols-2 bar:grid-cols-3">
          {groupStays.usps.cards.map((card) => {
            const Icon = icons[card.icon];
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-line bg-white px-8 py-10 transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-accent"
              >
                <Icon aria-hidden="true" strokeWidth={1.5} className="h-7 w-7 text-accent" />
                <h3 className="mb-3 mt-[22px] font-display text-[length:var(--step-card)] font-normal text-ink">
                  {card.title}
                </h3>
                <p className="m-0 text-[length:var(--step-body)]">{card.body}</p>
              </div>
            );
          })}
        </div>
      </Reveal>

      <Reveal className="mt-[var(--rhythm-section)] bg-sand py-[var(--rhythm-section)]">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="flex flex-wrap items-center gap-11">
            <div className="relative h-[250px] sm:h-[380px] min-w-0 flex-[1_1_360px] overflow-hidden rounded-2xl">
              <Image
                src={groupStays.includes.image.src}
                alt={groupStays.includes.image.alt}
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-[1_1_380px]">
              <h2 className="m-0 mb-[26px] font-display text-[clamp(20px,3.2vw,38px)] font-normal text-ink [text-wrap:pretty]">
                {groupStays.includes.heading}
              </h2>
              <ul className="m-0 grid list-none grid-cols-1 gap-x-7 gap-y-3.5 p-0 min-[560px]:grid-cols-2">
                {groupStays.includes.items.map((item) => (
                  <li key={item} className="flex items-start gap-[11px] text-[length:var(--step-body)]">
                    <Check
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="mt-[5px] h-[17px] w-[17px] flex-none text-clay"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 pt-[var(--rhythm-section)]">
        <StatBand stats={groupStays.stats} breakpoint="min-[900px]:grid-cols-4" />
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 pb-[var(--rhythm-section)] pt-[var(--rhythm-section)]">
        <div className="rounded-2xl border border-line bg-white px-6 py-10 sm:px-10 sm:py-14 text-center">
          <h2 className="mx-auto mb-4 max-w-[620px] font-display text-[clamp(20px,3.2vw,38px)] font-normal text-ink [text-wrap:pretty]">
            {groupStays.closing.heading}
          </h2>
          <p className="mx-auto mb-8 max-w-[560px]">{groupStays.closing.body}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-clay px-[30px] py-4 text-[length:var(--step-body)] text-white transition-colors duration-[250ms] hover:bg-accent hover:text-ink sm:w-auto"
            >
              <WhatsApp className="h-[17px] w-[17px]" />
              {contact.phone.display}
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border border-line px-[26px] py-4 text-[length:var(--step-body)] text-ink transition-colors duration-[250ms] hover:border-accent sm:w-auto"
            >
              Send an Enquiry <span aria-hidden="true" className="text-clay">&rarr;</span>
            </Link>
            <Link
              href="/gallery"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border border-line px-[26px] py-4 text-[length:var(--step-body)] text-ink transition-colors duration-[250ms] hover:border-accent sm:w-auto"
            >
              See the Rooms <span aria-hidden="true" className="text-clay">&rarr;</span>
            </Link>
          </div>
          <p className="mt-[30px] text-sm">
            Questions before booking?{' '}
            <Link href="/location" className="border-b border-line text-clay">
              How to reach us
            </Link>{' '}
            covers the metro, airport and station routes for your group.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
