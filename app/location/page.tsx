import type { Metadata } from 'next';
import { Building2, CarFront, Footprints, MapPin, Plane, PlaneLanding, TrainFront, TrainTrack } from 'lucide-react';
import { Screen } from '@/components/Screen';
import { HeroScreen } from '@/components/HeroScreen';
import { ContactScreen } from '@/components/ContactScreen';
import { MapEmbed } from '@/components/MapEmbed';
import { location, walkRoute } from '@/content/location';
import { media } from '@/content/media';
import { contact } from '@/content/site';

export const metadata: Metadata = {
  title: 'Location and directions',
  description: `${location.heading} ${location.headingEmphasis} ${location.lead}`,
};

const distanceIcons = { MapPin, TrainFront, Plane, TrainTrack, Building2 };
const arrivingIcons = { PlaneLanding, Footprints, CarFront };

/**
 * The walking route is locked: origin and destination are baked into the
 * iframe URL, so a visitor can pan and zoom but not re-target either end.
 * This is the keyless `output=embed` form, so the site still needs no Maps
 * Platform key; the Maps URL API link hands off to the Maps app on phones.
 */
const from = `${walkRoute.origin.lat},${walkRoute.origin.lng}`;
const to = encodeURIComponent(walkRoute.destination.query);
const walkEmbedSrc = `https://maps.google.com/maps?saddr=${from}&daddr=${to}&dirflg=w&output=embed`;
const directionsHref = `https://www.google.com/maps/dir/?api=1&origin=${from}&destination=${to}&travelmode=walking`;

export default function LocationPage() {
  return (
    <>
      <HeroScreen
        id="location-intro"
        eyebrow={location.eyebrow}
        heading={location.heading}
        headingEmphasis={location.headingEmphasis}
        lead={location.lead}
        image={media.walk ?? location.heroImage}
      />

      {/* Distances beside the pinned map. */}
      <Screen
        id="distances"
        tone="dark"
        labelledBy="distances-heading"
        className="on-dark bg-forest text-porcelain max-lg:grid-rows-[auto_40vh] lg:grid-cols-[1fr_1fr]"
      >
        <div className="grid content-center gap-6 px-[var(--gutter)] pb-[clamp(28px,4vh,48px)] pt-[var(--header-clear)]">
          <h2 id="distances-heading" data-rv="" className="text-[length:var(--step-section)] leading-[1.06]">
            {location.distancesHeading.heading}{' '}
            <span className="display-italic">{location.distancesHeading.headingEmphasis}</span>
          </h2>
          <dl className="rows m-0 max-w-[560px] text-[length:var(--step-body)]" data-rv="">
            {location.distances.map((row) => {
              const Icon = distanceIcons[row.icon];
              return (
                <div key={row.place}>
                  <dt className="flex items-center gap-3 text-sage-ink">
                    <Icon aria-hidden="true" strokeWidth={1.25} className="h-4 w-4 flex-none text-gold-light" />
                    {row.place}
                  </dt>
                  <dd className="m-0 whitespace-nowrap font-medium text-gold-light">{row.value}</dd>
                </div>
              );
            })}
          </dl>
        </div>
        {/* Starts below the fixed header, so the map's own place card and
            controls are never hidden under it. */}
        <div data-rv="" className="bg-forest-2 lg:h-full lg:pt-[72px]">
          <MapEmbed
            title="Map showing Taj Home Stay, Bharthal, Sector 26 Dwarka, New Delhi"
            src={contact.mapEmbedSrc}
            className="h-full min-h-[40vh] opacity-90"
          />
        </div>
      </Screen>

      {/* Three ways in. */}
      <Screen
        id="arriving"
        tone="light"
        labelledBy="arriving-heading"
        className="content-center gap-8 bg-porcelain px-[var(--gutter)] pb-[clamp(28px,5vh,56px)] pt-[var(--header-clear)]"
      >
        <h2 id="arriving-heading" data-rv="" className="max-w-[760px] text-[length:var(--step-section)] leading-[1.06]">
          {location.arriving.heading}{' '}
          <span className="display-italic">{location.arriving.headingEmphasis}</span>
        </h2>
        <ul className="m-0 grid list-none gap-x-10 p-0 lg:grid-cols-3">
          {location.arriving.cards.map((card) => {
            const Icon = arrivingIcons[card.icon];
            return (
              <li
                key={card.title}
                data-rv=""
                className="grid content-start gap-3 border-t border-gold/60 py-6 transition-[padding] duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:pl-2"
              >
                <Icon aria-hidden="true" strokeWidth={1.25} className="h-6 w-6 text-gold-deep" />
                <h3 className="text-[length:var(--step-card)] font-medium leading-tight">{card.title}</h3>
                <p className="m-0 text-[length:var(--step-body)] leading-[1.65] text-stone">{card.body}</p>
              </li>
            );
          })}
        </ul>
      </Screen>

      {/* The walk from the metro, fixed on the map. */}
      <Screen
        id="walk"
        tone="light"
        labelledBy="walk-heading"
        className="content-center gap-8 bg-linen px-[var(--gutter)] pb-[clamp(28px,5vh,56px)] pt-[var(--header-clear)] lg:grid-cols-[1fr_1.4fr] lg:items-center"
      >
        <div className="grid gap-5">
          <h2 id="walk-heading" data-rv="" className="text-[length:var(--step-section)] leading-[1.06]">
            {walkRoute.heading}
          </h2>
          <p className="lede" data-rv="">
            {walkRoute.lead}
          </p>
          <dl className="rows m-0 max-w-[420px] text-[length:var(--step-body)]" data-rv="">
            <div>
              <dt className="text-stone">Start</dt>
              <dd className="m-0 text-right text-espresso">{walkRoute.origin.label}</dd>
            </div>
            <div>
              <dt className="text-stone">End</dt>
              <dd className="m-0 text-right text-espresso">{walkRoute.destination.label}</dd>
            </div>
            {walkRoute.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-stone">{fact.label}</dt>
                <dd className="m-0 text-espresso">{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div data-rv="">
            <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="pill pill-ink">
              {walkRoute.cta}
            </a>
          </div>
        </div>
        <div data-rv="" className="h-[min(56vh,520px)] overflow-hidden rounded-[6px] border border-hairline bg-porcelain">
          <MapEmbed
            title={`Walking route from ${walkRoute.origin.label} to ${walkRoute.destination.label}`}
            src={walkEmbedSrc}
            className="h-full"
          />
        </div>
      </Screen>

      <ContactScreen />
    </>
  );
}
