import Image from 'next/image';
import { brand } from '@/content/site';

/**
 * The brand lockup: the property's logo set over its locality. Appears at two
 * sizes — 46px tall in the header, 42px in the footer.
 *
 * The artwork already reads "TAJ HOME STAY", so the name is not also set in
 * text beside it; the image carries it as the accessible name instead. The
 * locality line stays because the logo does not say Dwarka, and that is the
 * one thing a guest scanning the header needs it to say.
 *
 * The dimensions handed to next/image are the *rendered* ones, not the file's
 * 600×334. next/image builds its srcset from the `width` prop rather than from
 * the CSS box, so passing the intrinsic size made it fetch a 1200px file for an
 * 83px slot. Deriving the width from the artwork's own ratio keeps the box
 * reserved — the sticky header never jumps as the logo loads — while letting
 * Next serve a variant sized for the space it actually occupies.
 *
 * The height above is the widest case; phones render it smaller in CSS. The
 * props stay at the desktop figure on purpose, so the srcset is still built for
 * the largest box the logo is ever drawn into and a phone at 3× device pixels
 * has enough resolution to draw from.
 */
export function Wordmark({ size }: { size: 'header' | 'footer' }) {
  const header = size === 'header';
  const height = header ? 62 : 54;
  const width = Math.round((height * brand.logo.width) / brand.logo.height);

  return (
    <span className="inline-grid justify-items-start gap-[3px]">
      <Image
        src={brand.logo.src}
        alt={brand.name}
        width={width}
        height={height}
        priority={header}
        className={header ? 'h-[46px] w-auto sm:h-[62px]' : 'h-[44px] w-auto sm:h-[54px]'}
      />
      <span className="pl-px text-[10px] uppercase leading-none tracking-[0.22em] text-muted">
        {brand.locality}
      </span>
    </span>
  );
}
