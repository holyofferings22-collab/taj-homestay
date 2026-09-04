import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Screen } from '@/components/Screen';
import { HeroScreen } from '@/components/HeroScreen';
import { ContactScreen } from '@/components/ContactScreen';
import { guides, guidesIndex } from '@/content/guides';

export const metadata: Metadata = {
  title: 'Guides',
  description: guidesIndex.lead,
};

export default function GuidesIndexPage() {
  return (
    <>
      <HeroScreen
        id="guides-intro"
        eyebrow={guidesIndex.eyebrow}
        heading={guidesIndex.heading}
        headingEmphasis={guidesIndex.headingEmphasis}
        lead={guidesIndex.lead}
        image={guidesIndex.heroImage}
      />

      <Screen
        id="articles"
        tone="light"
        labelledBy="articles-heading"
        className="content-center gap-8 bg-white px-[var(--gutter)] pb-[clamp(28px,5vh,56px)] pt-[var(--header-clear)]"
      >
        <h2 id="articles-heading" className="sr-only">
          All guides
        </h2>
        <ul className="m-0 grid list-none gap-[clamp(14px,2vw,28px)] p-0 md:grid-cols-3">
          {guides.map((guide) => (
            <li key={guide.slug} data-rv="">
              <Link href={`/guides/${guide.slug}`} className="grid content-start gap-3">
                <span className="photo photo-hover block aspect-[3/2] max-h-[36vh] rounded-[6px]">
                  <Image
                    src={guide.image.src}
                    alt={guide.image.alt}
                    fill
                    quality={72}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="photo-caption">Read the guide</span>
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-gold-deep">{guide.tag}</span>
                <h3 className="text-[length:var(--step-card)] font-medium leading-[1.2]">{guide.title}</h3>
                <p className="m-0 text-[length:var(--step-body)] leading-[1.6] text-slate">{guide.lead}</p>
                <time dateTime={guide.dateISO} className="text-[11px] uppercase tracking-[0.18em] text-slate">
                  {guide.date}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </Screen>

      <ContactScreen />
    </>
  );
}
