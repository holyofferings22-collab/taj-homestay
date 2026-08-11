import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { PageHero, StatBand } from '@/components/PageHero';
import { Reveal } from '@/components/Reveal';
import { about } from '@/content/about';

export const metadata: Metadata = {
  title: 'About the guest house',
  description: about.lead,
};

export default function AboutPage() {
  return (
    <div className="font-body text-[15px] font-light leading-[1.62] text-muted sm:text-base sm:leading-[1.7]">
      <PageHero eyebrow={about.eyebrow} heading={about.heading} lead={about.lead} />

      <Reveal className="mx-auto max-w-[1240px] px-6 pt-[var(--rhythm-block)]">
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
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-clay px-7 py-[15px] text-[length:var(--step-body)] text-white transition-colors duration-[250ms] hover:bg-accent hover:text-ink"
              >
                See Our Rooms <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line px-6 py-[15px] text-[length:var(--step-body)] text-ink hover:border-accent"
              >
                Contact <span aria-hidden="true" className="text-clay">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="grid min-w-0 flex-[1_1_380px] gap-[22px]">
            <div className="relative h-[240px] overflow-hidden sm:h-[340px] rounded-2xl bg-stone">
              <Image
                src={about.images.lead.src}
                alt={about.images.lead.alt}
                fill
                priority
                sizes="(max-width: 1000px) 100vw, 560px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-wrap gap-[22px]">
              {about.images.supporting.map((photo) => (
                <div
                  key={photo.src}
                  className="relative h-[200px] flex-[1_1_200px] overflow-hidden rounded-2xl bg-stone"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 1000px) 50vw, 270px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 pb-[var(--rhythm-section)] pt-[var(--rhythm-block)]">
        <StatBand stats={about.stats} breakpoint="min-[900px]:grid-cols-4" />
      </Reveal>
    </div>
  );
}
