import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, StatBand } from '@/components/PageHero';
import { PhotoSlot } from '@/components/PhotoSlot';
import { Reveal } from '@/components/Reveal';
import { about } from '@/content/about';

export const metadata: Metadata = {
  title: 'About the guest house',
  description: about.lead,
};

export default function AboutPage() {
  return (
    <div className="font-body text-base font-light leading-[1.7] text-muted">
      <PageHero eyebrow={about.eyebrow} heading={about.heading} lead={about.lead} />

      <Reveal className="mx-auto max-w-[1240px] px-6 pt-[88px]">
        <div className="flex flex-wrap items-start gap-11">
          <div className="min-w-0 max-w-[440px] flex-[1_1_320px]">
            {about.paragraphs.map((text, i) => (
              <p key={i} className={i === 0 ? 'm-0' : 'mt-[18px]'}>
                {text}
              </p>
            ))}

            <div className="mt-[30px] flex flex-wrap gap-3">
              <Link
                href="/rooms"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-blush px-7 py-[15px] text-[15px] text-ink transition-colors duration-[250ms] hover:bg-clay hover:text-white"
              >
                See Our Rooms <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line px-6 py-[15px] text-[15px] text-ink hover:border-accent"
              >
                Contact <span aria-hidden="true" className="text-clay">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="grid min-w-0 flex-[1_1_380px] gap-[22px]">
            <div className="h-[340px] overflow-hidden rounded-2xl">
              <PhotoSlot />
            </div>
            <div className="flex flex-wrap gap-[22px]">
              <div className="h-[200px] flex-[1_1_200px] overflow-hidden rounded-2xl">
                <PhotoSlot />
              </div>
              <div className="h-[200px] flex-[1_1_200px] overflow-hidden rounded-2xl">
                <PhotoSlot />
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 pb-[104px] pt-[88px]">
        <StatBand stats={about.stats} breakpoint="min-[900px]:grid-cols-4" />
      </Reveal>
    </div>
  );
}
