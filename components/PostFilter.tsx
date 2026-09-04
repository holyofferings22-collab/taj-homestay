'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { Flip } from 'gsap/Flip';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import type { Post } from '@/content/blog';

gsap.registerPlugin(Flip);

/**
 * The journal index, filterable by subject.
 *
 * Filtering hides cards rather than unmounting them. The click records where
 * every card sits before the change; the effect that runs after React has
 * repainted hands that record to GSAP's Flip, which animates each card from
 * where it was to where it landed, so the grid closes up instead of jumping.
 *
 * Under reduced motion the filter still works and nothing moves.
 */
export function PostFilter({ posts, tags }: { posts: readonly Post[]; tags: readonly string[] }) {
  const [tag, setTag] = useState<string | null>(null);
  const scope = useRef<HTMLDivElement>(null);
  const before = useRef<Flip.FlipState | null>(null);

  useGSAP(
    () => {
      const state = before.current;
      before.current = null;
      if (!state || prefersReducedMotion()) return;
      Flip.from(state, {
        duration: 0.55,
        ease: 'power2.inOut',
        scale: true,
        absolute: true,
        onEnter: (els) =>
          gsap.fromTo(els, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.4 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.94, duration: 0.3 }),
      });
    },
    { dependencies: [tag] },
  );

  function choose(next: string | null) {
    if (next === tag) return;
    const cards = scope.current?.querySelectorAll<HTMLElement>('[data-post]');
    if (cards?.length && !prefersReducedMotion()) before.current = Flip.getState(cards);
    setTag(next);
  }

  const shown = posts.filter((post) => !tag || post.tag === tag);

  const chip = (label: string, value: string | null) => (
    <button
      key={label}
      type="button"
      onClick={() => choose(value)}
      aria-pressed={tag === value}
      className={`rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors duration-300 ${
        tag === value
          ? 'border-gold bg-gold text-ink'
          : 'border-hairline text-slate hover:border-gold hover:text-ink'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div ref={scope} className="grid gap-7">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter the journal by subject">
        {chip('Everything', null)}
        {tags.map((name) => chip(name, name))}
      </div>

      <ul className="m-0 grid list-none gap-[clamp(16px,2vw,28px)] p-0 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug} data-post="" hidden={Boolean(tag) && post.tag !== tag}>
            <Link href={`/blog/${post.slug}`} className="grid content-start gap-3">
              <span className="photo photo-hover block aspect-[3/2] rounded-[6px]">
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  quality={72}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="photo-caption">Read it</span>
              </span>
              <span className="text-[11px] uppercase tracking-[0.22em] text-gold-deep">{post.tag}</span>
              <h3 className="text-[length:var(--step-card)] font-medium leading-[1.2]">{post.title}</h3>
              <p className="m-0 text-[length:var(--step-body)] leading-[1.6] text-slate">{post.lead}</p>
              <time dateTime={post.dateISO} className="text-[11px] uppercase tracking-[0.18em] text-slate">
                {post.date}
              </time>
            </Link>
          </li>
        ))}
      </ul>

      <p aria-live="polite" className="m-0 text-[11px] uppercase tracking-[0.22em] text-slate">
        {shown.length} {shown.length === 1 ? 'note' : 'notes'}
        {tag ? ` on ${tag.toLowerCase()}` : ''}
      </p>
    </div>
  );
}
