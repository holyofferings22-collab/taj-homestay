import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/components/CtaBand';
import { PhotoSlot } from '@/components/PhotoSlot';
import { Reveal } from '@/components/Reveal';
import { rooms } from '@/content/rooms';

export const metadata: Metadata = {
  title: 'Rooms',
  description: rooms.lead,
};

export default function RoomsPage() {
  return (
    <div className="font-body text-base font-light leading-[1.7] text-muted">
      <PageHero eyebrow={rooms.eyebrow} heading={rooms.heading} lead={rooms.lead} />

      <Reveal className="mx-auto max-w-[1240px] px-6 pt-[88px]">
        <div className="grid grid-cols-1 gap-6 min-[680px]:grid-cols-2 bar:grid-cols-3">
          {rooms.categories.map((room, i) => (
            <article
              key={i}
              className="overflow-hidden rounded-2xl border border-line bg-white transition-transform duration-[250ms] hover:-translate-y-[3px]"
            >
              <div className="h-[230px]">
                <PhotoSlot />
              </div>
              <div className="px-6 pb-7 pt-[26px]">
                <h2 className="m-0 mb-3.5 font-display text-[23px] font-normal text-ink">
                  {room.name}
                </h2>
                <div className="mb-4 flex flex-wrap gap-2">
                  {room.chips.map((chip, j) => (
                    <span key={j} className="rounded-full bg-sand px-3 py-1.5 text-xs">
                      {chip}
                    </span>
                  ))}
                </div>
                <p className="m-0 mb-5 text-[15px]">{room.description}</p>
                <div className="flex items-baseline justify-between gap-3 border-t border-line pt-[18px]">
                  <p className="m-0 font-display text-[20px] text-clay">
                    ₹{room.rate}
                    <span className="font-body text-[13px] text-muted"> / night</span>
                  </p>
                  <Link href="/contact" className="text-sm text-clay">
                    Enquire <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 pb-[104px] pt-[72px]">
        <CtaBand heading={rooms.cta.heading} body={rooms.cta.body} />
      </Reveal>
    </div>
  );
}
