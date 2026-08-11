import { Footprints } from 'lucide-react';
import { walkRoute } from '@/content/location';

/**
 * Locked walking route from the metro to the door.
 *
 * The route is locked in the sense that matters: origin and destination are
 * baked into the iframe URL, so a visitor can pan and zoom but cannot
 * re-target either end. Everyone arriving sees the same walk.
 *
 * This uses the keyless `maps.google.com/maps?...&output=embed` form already
 * used for the map above it, so the site still needs no Maps Platform key.
 * That form is legacy; if Google retires it, the replacement is Embed API
 * `directions` mode (https://www.google.com/maps/embed/v1/directions), which
 * takes the same origin/destination but requires a billed API key.
 */
export function WalkRoute() {
  const from = `${walkRoute.origin.lat},${walkRoute.origin.lng}`;
  const to = encodeURIComponent(walkRoute.destination.query);

  const embedSrc = `https://maps.google.com/maps?saddr=${from}&daddr=${to}&dirflg=w&output=embed`;

  // Maps URL API — officially supported, and hands off to the Maps app on phones,
  // which is where someone standing at Gate 3 will actually open it.
  const directionsHref = `https://www.google.com/maps/dir/?api=1&origin=${from}&destination=${to}&travelmode=walking`;

  return (
    <>
      <h2 className="m-0 mb-3 font-display text-[clamp(20px,3vw,34px)] font-normal text-ink">
        {walkRoute.heading}
      </h2>
      <p className="m-0 mb-8 max-w-[560px]">{walkRoute.lead}</p>

      <div className="flex flex-wrap items-stretch gap-8">
        <div className="min-h-[300px] sm:min-h-[420px] min-w-0 flex-[1_1_420px] overflow-hidden rounded-2xl border border-line">
          <iframe
            title={`Walking route from ${walkRoute.origin.label} to ${walkRoute.destination.label}`}
            src={embedSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-full min-h-[300px] sm:min-h-[420px] w-full border-0"
          />
        </div>

        <div className="min-w-0 flex-[1_1_340px]">
          <div className="rounded-2xl border border-line bg-white px-6 py-7 sm:px-7 sm:py-8">
            <Footprints
              aria-hidden="true"
              strokeWidth={1.5}
              className="mb-[18px] block h-[26px] w-[26px] text-accent"
            />

            <p className="m-0 text-xs uppercase tracking-[0.14em] text-clay">Start</p>
            <p className="m-0 mt-1.5 text-ink">{walkRoute.origin.label}</p>

            <p className="m-0 mt-6 text-xs uppercase tracking-[0.14em] text-clay">End</p>
            <p className="m-0 mt-1.5 text-ink">{walkRoute.destination.label}</p>

            <div className="mt-7 grid">
              {walkRoute.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline gap-3.5 border-t border-line-soft py-3.5"
                >
                  <span className="flex-auto text-ink">{fact.label}</span>
                  <span className="flex-none text-sm">{fact.value}</span>
                </div>
              ))}
            </div>

            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[26px] inline-flex min-h-12 items-center gap-2.5 rounded-full bg-clay px-[26px] py-[15px] text-[length:var(--step-body)] text-white transition-colors duration-[250ms] hover:bg-accent hover:text-ink"
            >
              {walkRoute.cta} <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
