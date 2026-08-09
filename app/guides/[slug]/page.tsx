import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Clock } from 'lucide-react';
import { CtaBand } from '@/components/CtaBand';
import { Reveal } from '@/components/Reveal';
import { guides, getGuide } from '@/content/guides';

/**
 * One guide article.
 *
 * `params` is a Promise in this version of Next — it must be awaited in both
 * the page and generateMetadata, not destructured directly.
 */

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.lead,
    openGraph: {
      title: guide.title,
      description: guide.lead,
      type: 'article',
      publishedTime: guide.dateISO,
      images: [guide.image.src],
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const others = guides.filter((g) => g.slug !== guide.slug);

  /**
   * A square hero runs alongside the copy rather than above it — a full-bleed
   * 1:1 would be ~1200px tall and push the article off the first screen.
   */
  const isSquare = guide.image.aspect === 'square';

  const heroImage = (
    <Image
      src={guide.image.src}
      alt={guide.image.alt}
      fill
      priority
      sizes={isSquare ? '(max-width: 900px) 100vw, 420px' : '(max-width: 1240px) 100vw, 1192px'}
      className="object-cover"
    />
  );

  const body = (
    <article>
      {guide.sections.map((section) => (
        <section key={section.heading} className="mb-11 max-w-[720px] last:mb-0">
          <h2 className="m-0 mb-4 font-display text-[clamp(22px,2.4vw,28px)] font-normal text-ink">
            {section.heading}
          </h2>

          {/* Media leads the section, prose explains it underneath. */}
          {section.figure && (
            <figure className="m-0 mb-6">
              {/* Unoptimised: this is a route card, and Next's lossy pipeline
                  softens small type. Served as authored so it stays legible. */}
              <Image
                src={section.figure.src}
                alt={section.figure.alt}
                width={1024}
                height={1024}
                unoptimized
                className="h-auto w-full rounded-2xl border border-line"
              />
              {section.figure.caption && (
                <figcaption className="m-0 mt-3 text-[13px]">{section.figure.caption}</figcaption>
              )}
            </figure>
          )}

          {section.video && (
            <figure className="m-0 mb-6">
              {/* An animation, not something to operate — so no controls.
                  autoPlay is only honoured by browsers alongside muted. */}
              <video
                src={section.video.src}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                aria-label={section.video.caption}
                className="block h-auto w-full rounded-2xl border border-line bg-stone"
              />
              {section.video.caption && (
                <figcaption className="m-0 mt-3 text-[13px]">{section.video.caption}</figcaption>
              )}
            </figure>
          )}

          {section.paragraphs?.map((text, i) => (
            <p key={i} className={i === 0 ? 'm-0' : 'mt-[18px]'}>
              {text}
            </p>
          ))}

          {section.steps && (
            <ol className="m-0 mt-5 grid list-none gap-3.5 p-0">
              {section.steps.map((step, i) => (
                <li key={i} className="flex gap-3.5">
                  <span className="mt-[3px] flex h-[26px] w-[26px] flex-none items-center justify-center rounded-full bg-blush font-display text-[14px] text-ink">
                    {i + 1}
                  </span>
                  <span className="flex-auto">{step}</span>
                </li>
              ))}
            </ol>
          )}
        </section>
      ))}
    </article>
  );

  return (
    <div className="font-body text-base font-light leading-[1.7] text-muted">
      <section className="bg-sand pb-[62px] pt-[66px]">
        <div className="mx-auto max-w-[1240px] px-6">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-clay"
          >
            <span aria-hidden="true">&larr;</span> Guides &amp; Updates
          </Link>
          <h1 className="m-0 mt-3.5 max-w-[760px] font-display text-[clamp(30px,3.8vw,46px)] font-normal leading-[1.2] text-ink [text-wrap:pretty]">
            {guide.title}
          </h1>
          <p className="mt-5 max-w-[560px]">{guide.lead}</p>
          <p className="mt-6 flex items-center gap-2 text-[13px]">
            <span className="rounded bg-white/70 px-2.5 py-[5px] text-[11px] uppercase tracking-[0.08em] text-ink">
              {guide.tag}
            </span>
            <Clock aria-hidden="true" strokeWidth={1.5} className="h-[13px] w-[13px] flex-none" />
            <time dateTime={guide.dateISO}>{guide.date}</time>
          </p>
        </div>
      </section>

      {isSquare ? (
        /* Square hero: article left, image right, image sticky so it stays
           beside the copy on a long read. Stacks image-first on narrow screens. */
        <Reveal className="mx-auto max-w-[1240px] px-6 pt-[64px]">
          <div className="flex flex-wrap items-start gap-10">
            <div className="order-1 min-w-0 flex-[1_1_320px] min-[900px]:order-2">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone min-[900px]:sticky min-[900px]:top-[100px]">
                {heroImage}
              </div>
            </div>
            <div className="order-2 min-w-0 flex-[1_1_420px] min-[900px]:order-1">{body}</div>
          </div>
        </Reveal>
      ) : (
        <>
          <Reveal className="mx-auto max-w-[1240px] px-6 pt-[72px]">
            <div className="relative h-[clamp(220px,34vw,420px)] overflow-hidden rounded-2xl bg-stone">
              {heroImage}
            </div>
          </Reveal>

          <Reveal className="mx-auto max-w-[1240px] px-6 pt-[64px]">{body}</Reveal>
        </>
      )}

      <Reveal className="mx-auto max-w-[1240px] px-6 pt-[80px]">
        <h2 className="m-0 mb-7 font-display text-[clamp(22px,2.4vw,28px)] font-normal text-ink">
          More guides
        </h2>
        <div className="grid grid-cols-1 gap-5 min-[680px]:grid-cols-2">
          {others.map((other) => (
            <Link
              key={other.slug}
              href={`/guides/${other.slug}`}
              className="rounded-2xl border border-line bg-white px-7 py-8 transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-accent"
            >
              <span className="inline-block rounded bg-sand px-2.5 py-[5px] text-[11px] uppercase tracking-[0.08em] text-ink">
                {other.tag}
              </span>
              <h3 className="mb-0 mt-3.5 font-display text-[19px] font-normal leading-[1.4] text-ink">
                {other.title}
              </h3>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 pb-[104px] pt-[72px]">
        <CtaBand
          heading="Planning a stay around an event?"
          body="Send us your dates and we will tell you what is actually free. For anything urgent, the desk answers the phone at any hour."
        />
      </Reveal>
    </div>
  );
}
