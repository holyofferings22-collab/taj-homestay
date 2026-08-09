import { brand } from '@/content/site';

/**
 * The monogram + name lockup. Appears at two sizes: 40px in the header,
 * 38px in the footer.
 */
export function Wordmark({ size }: { size: 'header' | 'footer' }) {
  const box = size === 'header' ? 'h-10 w-10 text-[18px]' : 'h-[38px] w-[38px] text-[17px]';
  const name = size === 'header' ? 'text-[19px]' : 'text-[18px]';

  return (
    <span className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className={`inline-flex flex-none items-center justify-center rounded-xl bg-blush font-display text-clay ${box}`}
      >
        {brand.monogram}
      </span>
      <span className="grid gap-px">
        <span className={`whitespace-nowrap font-display leading-[1.15] text-ink ${name}`}>
          {brand.name}
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-muted">{brand.locality}</span>
      </span>
    </span>
  );
}
