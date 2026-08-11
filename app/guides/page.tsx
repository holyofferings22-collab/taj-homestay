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
    <div className="font-body text-[15px] font-light leading-[1.62] text-muted sm:text-base sm:leading-[1.7]">
      <PageHero
        eyebrow={guidesIndex.eyebrow}
        heading={guidesIndex.heading}
        lead={guidesIndex.lead}
      />

      <Reveal className="mx-auto max-w-[1240px] px-6 pt-[var(--rhythm-block)]">
        {/* Same treatment as the home page teasers: rows with a thumbnail
            below 640px, the photo cards above it. Tag, title, lead and date
            all stay — only the arrangement changes. */}
        <div className="grid border-t border-line sm:grid-cols-1 sm:gap-6 sm:border-0 min-[680px]:grid-cols-2 bar:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="flex gap-3.5 border-b border-line py-3.5 sm:block sm:overflow-hidden sm:rounded-2xl sm:border sm:border-line sm:bg-white sm:py-0 sm:transition-transform sm:duration-[250ms] sm:hover:-translate-y-[3px]"
            >
              <div className="relative h-20 w-20 flex-none overflow-hidden rounded-lg bg-stone sm:h-[210px] sm:w-auto sm:rounded-none">
                <Image
                  src={guide.image.src}
                  alt={guide.image.alt}
                  fill
                  sizes="(max-width: 640px) 80px, (max-width: 1000px) 50vw, 400px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1 sm:px-6 sm:pb-7 sm:pt-[22px]">
                <span className="inline-block rounded bg-sand px-2 py-[3px] text-[10px] uppercase tracking-[0.08em] text-ink sm:px-2.5 sm:py-[5px] sm:text-[11px]">
                  {guide.tag}
                </span>
                <h2 className="mb-1 mt-1.5 font-display text-[14px] font-normal leading-[1.35] text-ink sm:mb-2.5 sm:mt-3.5 sm:text-[length:var(--step-card)] sm:leading-[1.4]">
                  {guide.title}
                </h2>
                <p className="m-0 text-[12px] leading-[1.5] sm:text-[length:var(--step-body)] sm:leading-[1.7]">
                  {guide.lead}
                </p>
                <p className="m-0 mt-1.5 flex items-center gap-[6px] text-[11px] sm:mt-4 sm:gap-[7px] sm:text-xs">
                  <Clock
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="h-3 w-3 flex-none sm:h-[13px] sm:w-[13px]"
                  />
                  <time dateTime={guide.dateISO}>{guide.date}</time>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 pb-[var(--rhythm-section)] pt-[var(--rhythm-gap)]">
        <CtaBand
          heading="Something not covered here?"
          body="The desk answers all day and all night, and knows the area better than any guide does."
        />
      </Reveal>
    </div>
  );
}
