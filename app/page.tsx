import Link from 'next/link';
import { Banknote, CarFront, Clock, ConciergeBell, Utensils, Wifi, Zap } from 'lucide-react';
import { HeroSlider } from '@/components/HeroSlider';
import { BookingForm } from '@/components/BookingForm';
import { Reveal } from '@/components/Reveal';
import { PhotoSlot } from '@/components/PhotoSlot';
import { Faq } from '@/components/Faq';
import { amenities, bookingNote, guides, hero, intro, stats } from '@/content/home';

const icons = { ConciergeBell, Wifi, CarFront, Utensils, Zap, Banknote };

/** cols3 in the original: 1 column, 2 from 680px, 3 from 1000px. */
const cols3 = 'grid grid-cols-1 gap-5 min-[680px]:grid-cols-2 bar:grid-cols-3';
/** cols4 in the original: 1 column, 2 from 560px, 4 from 800px. */
const cols4 = 'grid grid-cols-1 gap-8 min-[560px]:grid-cols-2 min-[800px]:grid-cols-4';

const heroMinHeight =
  'min-h-[max(500px,min(720px,78vh))] bar:min-h-[max(560px,min(1050px,92vh))]';

export default function HomePage() {
  return (
    <div className="font-body text-base font-light leading-[1.7] text-muted">
      <section className="mx-auto p-0">
        <div className={`relative overflow-hidden bg-stone ${heroMinHeight}`}>
          <HeroSlider slides={[...hero.slides]} />

          {/* Wash: horizontal on wide screens, vertical when the hero stacks */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hero-wash-stacked bar:hidden"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden hero-wash-wide bar:block"
          />

          <div
            className={`relative flex flex-wrap items-center gap-9 px-[clamp(24px,4vw,76px)] py-12 ${heroMinHeight}`}
          >
            <div aria-hidden="true" className="h-[210px] flex-[1_1_100%] bar:hidden" />

            <div className="min-w-0 max-w-[470px] flex-[1_1_320px]">
              <p className="m-0 mb-[18px] text-xs uppercase tracking-[0.14em] text-clay">
                {hero.eyebrow}
              </p>
              <h1 className="m-0 font-display text-[clamp(32px,4.4vw,56px)] font-normal leading-[1.22] tracking-[-0.01em] text-ink [text-wrap:pretty]">
                {hero.heading}
              </h1>
              <p className="mt-[22px] max-w-[380px] text-base">{hero.body}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/rooms"
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-blush px-[30px] py-4 text-[15px] text-ink transition-all duration-[250ms] hover:-translate-y-0.5 hover:bg-clay hover:text-white"
                >
                  See Our Rooms <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  href="/location"
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line bg-white/70 px-6 py-4 text-[15px] text-ink transition-all duration-[250ms] hover:-translate-y-0.5 hover:border-accent"
                >
                  Getting Here <span aria-hidden="true" className="text-clay">&rarr;</span>
                </Link>
              </div>
            </div>

            <BookingForm />
          </div>
        </div>

        <p className="mt-[18px] px-[clamp(24px,4vw,76px)] text-[13px]">{bookingNote}</p>
      </section>

      <Reveal className="mx-auto max-w-[1240px] px-6 py-24">
        <div className={`rounded-2xl bg-sand px-8 py-[52px] text-center ${cols4}`}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="m-0 font-display text-[44px] leading-none text-clay">{stat.value}</p>
              <p className="mt-2.5 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 pb-[104px]">
        <h2 className="mx-auto mb-12 max-w-[620px] text-center font-display text-[clamp(28px,3.4vw,42px)] font-normal text-ink [text-wrap:pretty]">
          {intro.heading}
        </h2>
        <div className="flex flex-wrap items-center gap-10">
          <div className="min-w-0 max-w-[440px] flex-[1_1_320px]">
            <p className="m-0 text-base">{intro.body}</p>
            <Link
              href="/about"
              className="mt-[26px] inline-flex items-center gap-[9px] border-b border-line pb-1.5 text-[15px]"
            >
              {intro.cta} <span aria-hidden="true" className="text-clay">&rarr;</span>
            </Link>
          </div>
          <div className="h-[340px] min-w-0 flex-[1_1_380px] overflow-hidden rounded-2xl">
            <PhotoSlot />
          </div>
        </div>
      </Reveal>

      <Reveal className="bg-sand py-[104px]">
        <div className="mx-auto max-w-[1240px] px-6">
          <h2 className="mb-12 text-center font-display text-[clamp(28px,3.4vw,42px)] font-normal text-ink">
            What you get
          </h2>
          <div className={cols3}>
            {amenities.map((item) => {
              const Icon = icons[item.icon];
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-line bg-white px-8 py-10 transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-accent"
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="mb-[22px] block h-7 w-7 text-accent"
                  />
                  <h3 className="m-0 mb-3 font-display text-[21px] font-normal text-ink">
                    {item.title}
                  </h3>
                  <p className="m-0 text-[15px]">{item.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 py-[104px]">
        <h2 className="mb-12 text-center font-display text-[clamp(28px,3.4vw,42px)] font-normal text-ink">
          {guides.heading}
        </h2>
        <div className={cols3}>
          {guides.items.map((guide) => (
            <Link
              key={guide.title}
              href={guide.href}
              className="relative block h-[340px] overflow-hidden rounded-2xl"
            >
              <PhotoSlot />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(28,26,24,0.72)_0%,rgba(28,26,24,0)_55%)]"
              />
              <div className="pointer-events-none absolute inset-x-5 bottom-5">
                <span className="inline-block rounded bg-white/90 px-2.5 py-[5px] text-[11px] uppercase tracking-[0.08em] text-ink">
                  {guide.tag}
                </span>
                <h3 className="mb-1.5 mt-3 font-display text-[19px] font-normal leading-[1.4] text-white">
                  {guide.title}
                </h3>
                <p className="m-0 flex items-center gap-[7px] text-xs text-white/90">
                  <Clock aria-hidden="true" strokeWidth={1.5} className="h-[13px] w-[13px] flex-none" />
                  {guide.date}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>

      <Reveal className="bg-sand py-[104px]">
        <div className="mx-auto max-w-[1240px] px-6">
          <Faq />
        </div>
      </Reveal>
    </div>
  );
}
