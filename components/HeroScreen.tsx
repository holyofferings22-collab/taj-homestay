import Image from 'next/image';
import type { ReactNode } from 'react';
import { Screen } from '@/components/Screen';

/**
 * The photograph screen every inner page opens with: the page's own image
 * full bleed under a night scrim, eyebrow, headline and lead at the foot.
 * The header is transparent over it (tone "photo"). Rendered revealed, so
 * the copy is in the initial HTML.
 */
export function HeroScreen({
  id,
  eyebrow,
  heading,
  headingEmphasis,
  lead,
  image,
  children,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  /** Rendered in italic after `heading`, on the same line where it fits. */
  headingEmphasis?: string;
  lead?: string;
  image: { src: string; alt: string };
  /** Optional actions rendered under the lead. */
  children?: ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <Screen id={id} tone="photo" revealed labelledBy={headingId} className="on-photo items-end overflow-hidden text-white">
      <div className="absolute inset-0 overflow-hidden bg-ash" aria-hidden="true">
        <Image
          src={image.src}
          alt=""
          fill
          preload
          fetchPriority="high"
          quality={72}
          sizes="100vw"
          className="kenburns object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,23,29,0.35)_0%,rgba(20,23,29,0.1)_40%,rgba(20,23,29,0.8)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,23,29,0.75)_0%,rgba(20,23,29,0.5)_38%,rgba(20,23,29,0)_62%)]" />
      </div>
      <div className="relative z-[2] grid max-w-[900px] gap-5 px-[var(--gutter)] pb-[clamp(40px,8vh,88px)] pt-[var(--header-clear)]">
        <p className="eyebrow" data-rv="">
          {eyebrow}
        </p>
        <h1
          id={headingId}
          data-rv=""
          className="text-[length:var(--step-page)] leading-[1.02] [text-shadow:0_2px_30px_rgba(0,0,0,0.35)]"
        >
          {heading}
          {headingEmphasis && (
            <>
              {' '}
              <span className="display-italic">{headingEmphasis}</span>
            </>
          )}
        </h1>
        {lead && (
          <p className="lede" data-rv="">
            {lead}
          </p>
        )}
        {children && (
          <div className="flex flex-wrap gap-3" data-rv="">
            {children}
          </div>
        )}
      </div>
    </Screen>
  );
}
