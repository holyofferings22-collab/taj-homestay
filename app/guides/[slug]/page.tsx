import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { HeroScreen } from '@/components/HeroScreen';
import { ContactScreen } from '@/components/ContactScreen';
import { AutoplayVideo } from '@/components/AutoplayVideo';
import { guides, getGuide } from '@/content/guides';

/**
 * One guide article. `params` is a Promise in this version of Next and must
 * be awaited in both the page and generateMetadata.
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

  return (
    <>
      <HeroScreen
        id="guide-intro"
        eyebrow={guide.tag}
        heading={guide.title}
        lead={guide.lead}
        image={guide.image}
      >
        <Link href="/guides" className="pill pill-ghost">
          All guides
        </Link>
      </HeroScreen>

      {/* The article: one long snap area that scrolls inside itself. */}
      <Screen
        id="article"
        tone="light"
        long
        labelledBy="article-heading"
        className="content-start bg-porcelain px-[var(--gutter)] pb-[clamp(40px,8vh,88px)] pt-[var(--header-clear)]"
      >
        <article className="mx-auto w-full max-w-[720px]">
          <h2 id="article-heading" className="sr-only">
            {guide.title}
          </h2>
          <p data-rv="" className="m-0 mb-10 text-[11px] uppercase tracking-[0.22em] text-stone">
            <time dateTime={guide.dateISO}>{guide.date}</time>
          </p>

          {guide.sections.map((section) => (
            <section key={section.heading} data-rv="" className="mb-12 last:mb-0">
              <h3 className="mb-4 text-[clamp(24px,2.4vw,32px)] font-medium leading-[1.15]">{section.heading}</h3>

              {section.figure && (
                <figure className="m-0 mb-6">
                  {/* Unoptimised: a route card, and the lossy pipeline softens
                      small type. Served as authored so it stays legible. */}
                  <Image
                    src={section.figure.src}
                    alt={section.figure.alt}
                    width={1024}
                    height={1024}
                    unoptimized
                    className="h-auto w-full rounded-[6px] border border-hairline"
                  />
                  {section.figure.caption && (
                    <figcaption className="m-0 mt-3 text-[13px] text-stone">{section.figure.caption}</figcaption>
                  )}
                </figure>
              )}

              {section.video && (
                <figure className="m-0 mb-6">
                  <AutoplayVideo
                    src={section.video.src}
                    ariaLabel={section.video.caption}
                    className="block h-auto w-full rounded-[6px] border border-hairline bg-linen"
                  />
                  {section.video.caption && (
                    <figcaption className="m-0 mt-3 text-[13px] text-stone">{section.video.caption}</figcaption>
                  )}
                </figure>
              )}

              {section.paragraphs?.map((text, i) => (
                <p key={i} className={`m-0 text-[16px] leading-[1.75] text-stone ${i > 0 ? 'mt-4' : ''}`}>
                  {text}
                </p>
              ))}

              {section.steps && (
                <ol className="m-0 mt-5 grid list-none gap-3.5 p-0">
                  {section.steps.map((step, i) => (
                    <li key={i} className="flex gap-4 text-[16px] leading-[1.7] text-stone">
                      <span className="mt-[3px] flex h-7 w-7 flex-none items-center justify-center rounded-full border border-gold font-display text-[15px] text-espresso">
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
      </Screen>

      {/* The other guides. */}
      <Screen
        id="more-guides"
        tone="light"
        labelledBy="more-heading"
        className="content-center gap-8 bg-linen px-[var(--gutter)] pb-[clamp(28px,5vh,56px)] pt-[var(--header-clear)]"
      >
        <h2 id="more-heading" data-rv="" className="text-[length:var(--step-section)] leading-[1.06]">
          More <span className="display-italic">from the desk.</span>
        </h2>
        <ul className="m-0 grid list-none gap-[clamp(14px,2vw,28px)] p-0 md:grid-cols-2">
          {others.map((other) => (
            <li key={other.slug} data-rv="">
              <Link href={`/guides/${other.slug}`} className="grid gap-3 sm:grid-cols-[180px_1fr] sm:items-center">
                <span className="photo photo-hover block aspect-[3/2] rounded-[6px]">
                  <Image src={other.image.src} alt={other.image.alt} fill quality={72} sizes="(max-width: 640px) 100vw, 180px" />
                  <span className="photo-caption">Read the guide</span>
                </span>
                <span className="grid gap-1.5">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-gold-deep">{other.tag}</span>
                  <span className="font-display text-[length:var(--step-card)] font-medium leading-[1.2] text-espresso">{other.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Screen>

      <ContactScreen />
    </>
  );
}
