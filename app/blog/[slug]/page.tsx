import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Screen } from '@/components/Screen';
import { HeroScreen } from '@/components/HeroScreen';
import { ContactScreen } from '@/components/ContactScreen';
import { JsonLd } from '@/components/JsonLd';
import { RiseIn } from '@/components/motion/SplitHeading';
import { posts, getPost } from '@/content/blog';
import { brand } from '@/content/site';

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.lead,
    openGraph: {
      title: post.title,
      description: post.lead,
      type: 'article',
      publishedTime: post.dateISO,
      images: [post.image.src],
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.lead,
    datePublished: post.dateISO,
    image: post.image.src,
    author: { '@type': 'Organization', name: brand.name },
    publisher: { '@type': 'Organization', name: brand.name },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />

      <HeroScreen
        id="post-intro"
        eyebrow={post.tag}
        heading={post.title}
        lead={post.lead}
        image={post.image}
      >
        <Link href="/blog" className="pill pill-ghost">
          The journal
        </Link>
      </HeroScreen>

      {/* The note itself: one long snap area that scrolls inside itself. */}
      <Screen
        id="note"
        tone="light"
        long
        labelledBy="note-heading"
        className="content-start bg-porcelain px-[var(--gutter)] pb-[clamp(40px,8vh,88px)] pt-[var(--header-clear)]"
      >
        <article className="mx-auto w-full max-w-[720px]">
          <h2 id="note-heading" className="sr-only">
            {post.title}
          </h2>
          <p className="m-0 mb-10 text-[11px] uppercase tracking-[0.22em] text-stone">
            <time dateTime={post.dateISO}>{post.date}</time>
          </p>

          {post.sections.map((section) => (
            <RiseIn key={section.heading} className="mb-12 last:mb-0">
              <section>
                <h3 className="mb-4 text-[clamp(24px,2.4vw,32px)] font-medium leading-[1.15]">
                  {section.heading}
                </h3>
                {section.paragraphs.map((text, i) => (
                  <p key={i} className={`m-0 text-[16px] leading-[1.75] text-stone ${i > 0 ? 'mt-4' : ''}`}>
                    {text}
                  </p>
                ))}
              </section>
            </RiseIn>
          ))}
        </article>
      </Screen>

      {/* What to read next. */}
      <Screen
        id="more-notes"
        tone="light"
        labelledBy="more-notes-heading"
        className="content-center gap-8 bg-linen px-[var(--gutter)] pb-[clamp(28px,5vh,56px)] pt-[var(--header-clear)]"
      >
        <h2 id="more-notes-heading" data-rv="" className="text-[length:var(--step-section)] leading-[1.06]">
          More <span className="display-italic">from the desk.</span>
        </h2>
        <ul className="m-0 grid list-none gap-[clamp(14px,2vw,28px)] p-0 md:grid-cols-2">
          {others.map((other) => (
            <li key={other.slug} data-rv="">
              <Link href={`/blog/${other.slug}`} className="grid gap-3 sm:grid-cols-[180px_1fr] sm:items-center">
                <span className="photo photo-hover block aspect-[3/2] rounded-[6px]">
                  <Image
                    src={other.image.src}
                    alt={other.image.alt}
                    fill
                    quality={72}
                    sizes="(max-width: 640px) 100vw, 180px"
                  />
                  <span className="photo-caption">Read it</span>
                </span>
                <span className="grid gap-1.5">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-gold-deep">{other.tag}</span>
                  <span className="font-display text-[length:var(--step-card)] font-medium leading-[1.2] text-espresso">
                    {other.title}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div data-rv="">
          <Link href="/guides" className="link-ul">
            Step by step guides
          </Link>
        </div>
      </Screen>

      <ContactScreen />
    </>
  );
}
