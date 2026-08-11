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
import { WhatsApp } from '@/components/BrandIcons';
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
    <div className="font-body text-[15px] font-light leading-[1.62] text-muted sm:text-base sm:leading-[1.7]">
      <PageHero eyebrow={location.eyebrow} heading={location.heading} lead={location.lead} />

      <Reveal className="mx-auto max-w-[1240px] px-6 pt-[var(--rhythm-block)]">
        <div className="flex flex-wrap items-stretch gap-8">
          <div className="min-h-[300px] sm:min-h-[420px] min-w-0 flex-[1_1_420px] overflow-hidden rounded-2xl border border-line">
            <iframe
              title="Map showing Taj Home Stay, Bharthal, Sector 26 Dwarka, New Delhi"
              src={contact.mapEmbedSrc}
              loading="lazy"
              className="block h-full min-h-[300px] sm:min-h-[420px] w-full border-0"
            />
          </div>

          <div className="min-w-0 flex-[1_1_340px]">
            <div className="rounded-2xl border border-line bg-white px-6 py-7 sm:px-7 sm:py-8">
              <h2 className="m-0 mb-5 font-display text-[clamp(18px,2.8vw,24px)] font-normal text-ink">Distances</h2>
              <div className="grid">
                {location.distances.map((row) => {
                  const Icon = icons[row.icon];
                  return (
                    /* Place and distance share a line on a wide card. On a
                       phone that leaves the place about 200px, enough to break
                       "Dwarka Sector 25 / Yashobhoomi metro, Airport Express"
                       across three lines with its distance stranded alongside
                       the first. Giving the value a full basis wraps it onto
                       its own line, indented past the icon to line up with the
                       place above it. */
                    <div
                      key={row.place}
                      className="flex flex-wrap items-baseline gap-x-3.5 border-t border-line-soft py-3.5"
                    >
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.5}
                        className="h-4 w-4 flex-none text-accent"
                      />
                      {/* flex-1 for its 0 basis, not for the grow. `flex-auto`
                          bases the place on its own text, so once wrapping was
                          on, a long one no longer fit the first line and went
                          under the icon at full width while short ones stayed
                          beside it. A 0 basis keeps every place on the icon's
                          line and wraps the text inside its own column. */}
                      <span className="min-w-0 flex-1 text-ink">{row.place}</span>
                      <span className="w-full flex-none pl-[30px] text-sm sm:w-auto sm:pl-0">
                        {row.value}
                      </span>
                    </div>
                  );
                })}
              </div>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-[26px] inline-flex min-h-12 items-center gap-2.5 rounded-full bg-clay px-[26px] py-[15px] text-[length:var(--step-body)] text-white transition-colors duration-[250ms] hover:bg-accent hover:text-ink"
              >
                <WhatsApp className="h-[17px] w-[17px]" />
                WhatsApp {contact.phone.display}
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 pt-[var(--rhythm-gap)]">
        <WalkRoute />
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 pb-[var(--rhythm-section)] pt-[var(--rhythm-gap)]">
        <h2 className="m-0 mb-8 font-display text-[clamp(20px,3vw,34px)] font-normal text-ink">
          {location.arriving.heading}
        </h2>
        <div className="grid grid-cols-1 gap-5 min-[680px]:grid-cols-2 bar:grid-cols-3">
          {location.arriving.cards.map((card) => {
            const Icon = icons[card.icon];
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-line bg-white px-6 py-7 sm:px-7 sm:py-8"
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="mb-[18px] block h-[26px] w-[26px] text-accent"
                />
                <h3 className="m-0 mb-2.5 font-display text-[clamp(16px,2.6vw,20px)] font-normal text-ink">
                  {card.title}
                </h3>
                <p className="m-0 text-[length:var(--step-body)]">{card.body}</p>
              </div>
            );
          })}
        </div>
      </Reveal>
    </div>
  );
}
