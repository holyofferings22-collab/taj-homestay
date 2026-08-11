import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/components/CtaBand';
import { Reveal } from '@/components/Reveal';
import { rooms } from '@/content/rooms';

export const metadata: Metadata = {
  title: 'Rooms',
  description: rooms.lead,
};

export default function RoomsPage() {
  return (
    <div className="font-body text-[15px] font-light leading-[1.62] text-muted sm:text-base sm:leading-[1.7]">
      <PageHero eyebrow={rooms.eyebrow} heading={rooms.heading} lead={rooms.lead} />

      <Reveal className="mx-auto max-w-[1240px] px-6 pt-[var(--rhythm-block)]">
        {/* A photo card is 430px tall, so one room filled two thirds of a
            phone screen and comparing two meant scrolling between them —
            which is the whole job of this page. Below 640px each becomes a
            row with an 80px thumbnail: name, chips, description and rate all
            still there, about 130px, four visible at once. */}
        <div className="grid border-t border-line sm:grid-cols-1 sm:gap-6 sm:border-0 min-[680px]:grid-cols-2 bar:grid-cols-3">
          {rooms.categories.map((room, i) => (
            <article
              key={i}
              className="flex gap-3.5 border-b border-line py-3.5 sm:block sm:overflow-hidden sm:rounded-2xl sm:border sm:border-line sm:bg-white sm:py-0 sm:transition-transform sm:duration-[250ms] sm:hover:-translate-y-[3px]"
            >
              <div className="relative h-20 w-20 flex-none overflow-hidden rounded-lg bg-stone sm:h-[230px] sm:w-auto sm:rounded-none">
                <Image
                  src={room.image.src}
                  alt={room.image.alt}
                  fill
                  sizes="(max-width: 640px) 80px, (max-width: 1000px) 50vw, 400px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1 sm:px-6 sm:pb-7 sm:pt-[26px]">
                <h2 className="m-0 mb-1.5 font-display text-[15px] font-normal leading-[1.3] text-ink sm:mb-3.5 sm:text-[clamp(16px,2.6vw,23px)] sm:leading-normal">
                  {room.name}
                </h2>
                <div className="mb-1.5 flex flex-wrap gap-1.5 sm:mb-4 sm:gap-2">
                  {room.chips.map((chip, j) => (
                    <span
                      key={j}
                      className="rounded-full bg-sand px-2 py-0.5 text-[10px] sm:px-3 sm:py-1.5 sm:text-xs"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <p className="m-0 mb-2 text-[12px] leading-[1.5] sm:mb-5 sm:text-[length:var(--step-body)] sm:leading-[1.7]">
                  {room.description}
                </p>
                <div className="flex items-baseline justify-between gap-3 sm:border-t sm:border-line sm:pt-[18px]">
                  <p className="m-0 font-display text-[15px] text-clay sm:text-[clamp(16px,2.6vw,20px)]">
                    ₹{room.rate}
                    <span className="font-body text-[11px] text-muted sm:text-[13px]"> / night</span>
                  </p>
                  <Link href="/contact" className="text-[12px] text-clay sm:text-sm">
                    Enquire <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="m-0 mt-5 text-[12px] sm:mt-7 sm:text-[13px]">{rooms.rateNote}</p>
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 pb-[var(--rhythm-section)] pt-[var(--rhythm-gap)]">
        <CtaBand heading={rooms.cta.heading} body={rooms.cta.body} />
      </Reveal>
    </div>
  );
}
