import type { Metadata } from 'next';
import Link from 'next/link';
import { Framed } from '@/components/Framed';
import { Screen } from '@/components/Screen';
import { HeroScreen } from '@/components/HeroScreen';
import { ContactScreen } from '@/components/ContactScreen';
import { WhatsApp } from '@/components/BrandIcons';
import { rooms } from '@/content/rooms';
import { whatsappLink } from '@/content/site';

export const metadata: Metadata = {
  title: 'Rooms',
  description: rooms.lead,
};

/**
 * One screen per category, the photograph on one side and the room's own
 * facts on the other, sides alternating down the page. Cheapest first, as
 * the content file orders them: the site sells a sensible price, not a suite.
 */
export default function RoomsPage() {
  return (
    <>
      <HeroScreen
        id="rooms-intro"
        eyebrow={rooms.eyebrow}
        heading={rooms.heading}
        headingEmphasis={rooms.headingEmphasis}
        lead={rooms.lead}
        image={rooms.heroImage}
      />

      {rooms.categories.map((room, i) => {
        const photoRight = i % 2 === 1;
        const headingId = `room-${i}-heading`;
        return (
          <Screen
            key={room.name}
            id={`room-${room.name.toLowerCase().replace(/\s+/g, '-')}`}
            tone="light"
            auto
            labelledBy={headingId}
            className="gap-8 bg-white px-[var(--gutter)] pb-[clamp(56px,7vh,88px)] pt-[clamp(84px,10vh,104px)] lg:grid-cols-2 lg:items-center lg:gap-14"
          >
            <Link href="/gallery" className={`block ${photoRight ? 'lg:order-2' : ''}`}>
              <Framed src={room.image.src} alt={room.image.alt}>
                <span className="photo-caption">See the gallery</span>
              </Framed>
            </Link>

            <div className="grid content-center gap-6 px-[var(--gutter)] pb-[clamp(56px,7vh,88px)] pt-[clamp(28px,5vh,56px)] lg:pt-[clamp(84px,10vh,104px)]">
              <h2 id={headingId} data-rv="" className="text-[length:var(--step-section)] leading-[1.06]">
                {room.name}
              </h2>
              <p data-rv="" className="m-0 font-display text-[clamp(24px,2.4vw,32px)] leading-none text-ink">
                ₹{room.rate}
                <span className="ml-2 font-body text-[11px] uppercase tracking-[0.18em] text-slate">
                  a night
                </span>
              </p>
              <ul data-rv="" className="m-0 flex list-none flex-wrap gap-2 p-0">
                {room.chips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-hairline px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] text-ink"
                  >
                    {chip}
                  </li>
                ))}
              </ul>
              <p className="lede" data-rv="">
                {room.description}
              </p>
              <div data-rv="" className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={whatsappLink(
                    `Hello Taj Home Stay, I would like to check availability for a ${room.name} room.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill pill-ink"
                >
                  <WhatsApp className="h-4 w-4" />
                  Check availability
                </a>
              </div>
              <p data-rv="" className="m-0 max-w-[52ch] text-[13px] leading-[1.6] text-slate">
                {rooms.rateNote}
              </p>
            </div>
          </Screen>
        );
      })}

      <ContactScreen />
    </>
  );
}
