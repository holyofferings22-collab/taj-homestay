'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { WhatsApp } from '@/components/BrandIcons';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { whatsappLink } from '@/content/site';

export type SwitchableRoom = {
  name: string;
  rate: string;
  summary: string;
  chips: readonly string[];
  image: { src: string; alt: string };
};

/**
 * The rooms screen: one large photograph, and the three categories as a list
 * beside it. Choosing a category cross-fades the photograph and swaps the
 * facts, so the whole screen is one comparison rather than three cards a
 * guest has to hold in their head.
 *
 * Every photograph is rendered from the start and stacked; only opacity
 * moves, so there is no load flicker on a switch and no layout shift. The
 * list is a set of real buttons, so it works from the keyboard, and the
 * chosen one is marked `aria-current`.
 */
export function RoomSwitcher({ rooms, cta }: { rooms: readonly SwitchableRoom[]; cta: string }) {
  const [active, setActive] = useState(0);
  const scope = useRef<HTMLDivElement>(null);
  const room = rooms[active];

  /* The facts re-enter whenever the choice changes. Driven by a dependency
     rather than from the click handler, so the animation runs after React
     has painted the new text and never reads a ref during render. */
  useGSAP(
    () => {
      const facts = scope.current?.querySelectorAll<HTMLElement>('[data-room-fact]');
      if (!facts?.length || prefersReducedMotion()) return;
      gsap.from(facts, {
        opacity: 0,
        y: 14,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.05,
        overwrite: true,
      });
    },
    { dependencies: [active] },
  );

  return (
    <div ref={scope} className="grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      {/* The photographs, stacked. */}
      <div className="photo relative aspect-[4/3] max-h-[38vh] w-full overflow-hidden rounded-[6px] lg:aspect-auto lg:h-[min(52vh,520px)] lg:max-h-none">
        {rooms.map((r, i) => (
          <Image
            key={r.image.src}
            src={r.image.src}
            alt={i === active ? r.image.alt : ''}
            fill
            quality={72}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="absolute inset-0 object-cover transition-opacity duration-700 ease-[cubic-bezier(.16,1,.3,1)]"
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i !== active}
          />
        ))}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(0deg,rgba(28,34,30,0.55),transparent)] px-5 pb-4 pt-12 font-display text-[22px] text-white">
          {room.name}
        </span>
      </div>

      <div className="grid gap-6">
        {/* The chooser. */}
        <ul className="m-0 grid list-none p-0">
          {rooms.map((r, i) => (
            <li key={r.name}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={i === active ? 'true' : undefined}
                className={`group flex w-full items-baseline justify-between gap-4 border-b border-hairline py-4 text-left transition-[padding,border-color] duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:pl-2 ${
                  i === active ? 'border-gold pl-2' : ''
                }`}
              >
                <span
                  className={`font-display text-[length:var(--step-card)] leading-tight transition-colors ${
                    i === active ? 'text-ink' : 'text-slate group-hover:text-ink'
                  }`}
                >
                  {r.name}
                </span>
                <span
                  className={`font-display text-[19px] transition-colors ${
                    i === active ? 'text-gold-deep' : 'text-slate'
                  }`}
                >
                  ₹{r.rate}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* The chosen room's facts. */}
        <div className="grid gap-4">
          <ul data-room-fact="" className="m-0 flex list-none flex-wrap gap-2 p-0">
            {room.chips.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-hairline px-3.5 py-1.5 text-[11px] uppercase tracking-[0.14em] text-ink"
              >
                {chip}
              </li>
            ))}
          </ul>
          <p data-room-fact="" className="lede m-0">
            {room.summary}
          </p>
          <div data-room-fact="" className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={whatsappLink(
                `Hello Taj Home Stay, I would like to check availability for a ${room.name} room.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-ink"
            >
              <WhatsApp className="h-4 w-4" />
              {cta}
            </a>
            <Link href="/rooms" className="link-ul">
              All three rooms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
