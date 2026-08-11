/** The sand banner every inner page opens with. */
export function PageHero({
  eyebrow,
  heading,
  lead,
}: {
  eyebrow: string;
  heading: string;
  lead?: string;
}) {
  return (
    <section className="bg-sand py-[var(--rhythm-hero)]">
      <div className="mx-auto max-w-[1240px] px-6">
        <p className="m-0 mb-3.5 text-xs uppercase tracking-[0.14em] text-clay">{eyebrow}</p>
        <h1 className="m-0 max-w-[640px] font-display text-[length:var(--step-page)] font-normal leading-[1.2] text-ink [text-wrap:pretty]">
          {heading}
        </h1>
        {lead && <p className="mt-5 max-w-[520px]">{lead}</p>}
      </div>
    </section>
  );
}

/**
 * Shared stat band. `breakpoint` matches whichever width the source page used.
 *
 * Pairs on a phone rather than a single column — four two-word stats stacked
 * one per row ran the length of a screen, and a stat band only works if it
 * reads as a block. Keeps `app/page.tsx`'s `cols4` in step.
 */
export function StatBand({
  stats,
  breakpoint,
}: {
  stats: readonly { value: string; label: string }[];
  breakpoint: 'min-[800px]:grid-cols-4' | 'min-[900px]:grid-cols-4';
}) {
  return (
    <div
      className={`grid grid-cols-2 gap-x-5 gap-y-8 rounded-2xl bg-sand px-5 py-9 text-center sm:gap-x-8 sm:px-8 sm:py-[52px] ${breakpoint}`}
    >
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="m-0 font-display text-[length:var(--step-stat)] leading-none text-clay">
            {stat.value}
          </p>
          <p className="mt-2.5 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
