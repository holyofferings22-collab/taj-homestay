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
    <section className="bg-sand pb-[62px] pt-[66px]">
      <div className="mx-auto max-w-[1240px] px-6">
        <p className="m-0 mb-3.5 text-xs uppercase tracking-[0.14em] text-clay">{eyebrow}</p>
        <h1 className="m-0 max-w-[640px] font-display text-[clamp(32px,4vw,50px)] font-normal leading-[1.2] text-ink [text-wrap:pretty]">
          {heading}
        </h1>
        {lead && <p className="mt-5 max-w-[520px]">{lead}</p>}
      </div>
    </section>
  );
}

/** Shared stat band. `breakpoint` matches whichever width the source page used. */
export function StatBand({
  stats,
  breakpoint,
}: {
  stats: readonly { value: string; label: string }[];
  breakpoint: 'min-[800px]:grid-cols-4' | 'min-[900px]:grid-cols-4';
}) {
  return (
    <div
      className={`grid grid-cols-1 gap-8 rounded-2xl bg-sand px-8 py-[52px] text-center min-[560px]:grid-cols-2 ${breakpoint}`}
    >
      {stats.map((stat) => (
        <div key={stat.label}>
          <p className="m-0 font-display text-[44px] leading-none text-clay">{stat.value}</p>
          <p className="mt-2.5 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
