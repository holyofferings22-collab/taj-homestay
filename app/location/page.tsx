import type { Metadata } from 'next';
import {
  Building2,
  CarFront,
  Footprints,
  MapPin,
  Plane,
  PlaneLanding,
  TrainFront,
  TrainTrack,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { WalkRoute } from '@/components/WalkRoute';
import { location } from '@/content/location';
import { contact } from '@/content/site';

const icons = {
  MapPin,
  TrainFront,
  Plane,
  TrainTrack,
  Building2,
  PlaneLanding,
  Footprints,
  CarFront,
};

export const metadata: Metadata = {
  title: 'Getting here',
  description: location.lead,
};

export default function LocationPage() {
  return (
    <div className="font-body text-base font-light leading-[1.7] text-muted">
      <PageHero eyebrow={location.eyebrow} heading={location.heading} lead={location.lead} />

      <Reveal className="mx-auto max-w-[1240px] px-6 pt-[88px]">
        <div className="flex flex-wrap items-stretch gap-8">
          <div className="min-h-[420px] min-w-0 flex-[1_1_420px] overflow-hidden rounded-2xl border border-line">
            <iframe
              title="Map showing Taj Home Stay, Bharthal, Sector 26 Dwarka, New Delhi"
              src={contact.mapEmbedSrc}
              loading="lazy"
              className="block h-full min-h-[420px] w-full border-0"
            />
          </div>

          <div className="min-w-0 flex-[1_1_340px]">
            <div className="rounded-2xl border border-line bg-white px-7 py-8">
              <h2 className="m-0 mb-5 font-display text-2xl font-normal text-ink">Distances</h2>
              <div className="grid">
                {location.distances.map((row) => {
                  const Icon = icons[row.icon];
                  return (
                    <div
                      key={row.place}
                      className="flex items-baseline gap-3.5 border-t border-line-soft py-3.5"
                    >
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className="h-4 w-4 flex-none text-accent"
                      />
                      <span className="flex-auto text-ink">{row.place}</span>
                      <span className="flex-none text-sm">{row.value}</span>
                    </div>
                  );
                })}
              </div>
              <a
                href={`tel:${contact.phone.dial}`}
                className="mt-[26px] inline-flex min-h-12 items-center gap-2.5 rounded-full bg-blush px-[26px] py-[15px] text-[15px] text-ink transition-colors duration-[250ms] hover:bg-clay hover:text-white"
              >
                Call {contact.phone.display} <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 pt-[72px]">
        <WalkRoute />
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 pb-[104px] pt-[72px]">
        <h2 className="m-0 mb-8 font-display text-[clamp(26px,3vw,34px)] font-normal text-ink">
          {location.arriving.heading}
        </h2>
        <div className="grid grid-cols-1 gap-5 min-[680px]:grid-cols-2 bar:grid-cols-3">
          {location.arriving.cards.map((card) => {
            const Icon = icons[card.icon];
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-line bg-white px-7 py-8"
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="mb-[18px] block h-[26px] w-[26px] text-accent"
                />
                <h3 className="m-0 mb-2.5 font-display text-[20px] font-normal text-ink">
                  {card.title}
                </h3>
                <p className="m-0 text-[15px]">{card.body}</p>
              </div>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
}
