import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { CtaBand } from '@/components/CtaBand';
import { Reveal } from '@/components/Reveal';
import { guides, guidesIndex } from '@/content/guides';

export const metadata: Metadata = {
  title: guidesIndex.heading,
  description: guidesIndex.lead,
};

export default function GuidesIndexPage() {
  return (
    <div className="font-body text-base font-light leading-[1.7] text-muted">
      <PageHero
        eyebrow={guidesIndex.eyebrow}
        heading={guidesIndex.heading}
        lead={guidesIndex.lead}
      />

      <Reveal className="mx-auto max-w-[1240px] px-6 pt-[88px]">
        <div className="grid grid-cols-1 gap-6 min-[680px]:grid-cols-2 bar:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="overflow-hidden rounded-2xl border border-line bg-white transition-transform duration-[250ms] hover:-translate-y-[3px]"
            >
              <div className="relative h-[210px] bg-stone">
                <Image
                  src={guide.image.src}
                  alt={guide.image.alt}
                  fill
                  sizes="(max-width: 680px) 100vw, (max-width: 1000px) 50vw, 400px"
                  className="object-cover"
                />
              </div>
              <div className="px-6 pb-7 pt-[22px]">
                <span className="inline-block rounded bg-sand px-2.5 py-[5px] text-[11px] uppercase tracking-[0.08em] text-ink">
                  {guide.tag}
                </span>
                <h2 className="mb-2.5 mt-3.5 font-display text-[21px] font-normal leading-[1.4] text-ink">
                  {guide.title}
                </h2>
                <p className="m-0 text-[15px]">{guide.lead}</p>
                <p className="m-0 mt-4 flex items-center gap-[7px] text-xs">
                  <Clock
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="h-[13px] w-[13px] flex-none"
                  />
                  <time dateTime={guide.dateISO}>{guide.date}</time>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 pb-[104px] pt-[72px]">
        <CtaBand
          heading="Something not covered here?"
          body="The desk answers all day and all night, and knows the area better than any guide does."
        />
      </Reveal>
    </div>
  );
}
