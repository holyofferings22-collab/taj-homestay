import Link from 'next/link';
import Image from 'next/image';
import { Banknote, CarFront, Clock, ConciergeBell, Utensils, Wifi, Zap } from 'lucide-react';
import { HeroSlider } from '@/components/HeroSlider';
import { BookingForm } from '@/components/BookingForm';
import { Reveal } from '@/components/Reveal';
import { Faq } from '@/components/Faq';
import { amenities, guides, hero, intro, stats } from '@/content/home';
import { guides as guideArticles } from '@/content/guides';

const icons = { ConciergeBell, Wifi, CarFront, Utensils, Zap, Banknote };

/** cols3 in the original: 1 column, 2 from 680px, 3 from 1000px. */
const cols3 = 'grid grid-cols-1 gap-5 min-[680px]:grid-cols-2 bar:grid-cols-3';
/**
 * cols4: pairs on a phone, 4 across from 800px.
 *
 * The original started at 1 column, which put four two-word stats in a single
 * file 700px long — a whole phone screen to say four short things. They are
 * short enough to sit two-up at 375px, and reading as a block is the point of
 * a stat band.
 */
const cols4 = 'grid grid-cols-2 gap-x-5 gap-y-8 min-[800px]:grid-cols-4 sm:gap-x-8';
/** Amenities: two across on a phone, then `cols3`'s widths from 640px up. */
const amenityGrid = 'grid grid-cols-2 gap-2.5 sm:gap-5 bar:grid-cols-3';
/**
 * Guides on the home page and on `/guides`: a bordered list of thumbnail rows
 * on a phone, the photo cards above 640px. One markup, two shapes — the image
 * box goes from a 56px square to `absolute inset-0`, and the caption from a
 * flex column beside it to an overlay pinned to the bottom of the photo.
 */
const guideList = 'grid border-t border-line sm:grid-cols-2 sm:gap-5 sm:border-0 bar:grid-cols-3';
const guideRow =
  'flex items-center gap-3 border-b border-line py-3 sm:relative sm:block sm:h-[340px] sm:overflow-hidden sm:rounded-2xl sm:border-0 sm:py-0';
const guideThumb =
  'relative h-14 w-14 flex-none overflow-hidden rounded-lg bg-stone sm:absolute sm:inset-0 sm:h-auto sm:w-auto sm:rounded-none';

/**
 * Only from 640px up. Below that the hero is a 16:9 photo followed by the copy,
 * both in normal flow, so its height is whatever those come to — a floor would
 * only add dead cream under the availability block.
 */
const heroMinHeight =
  'sm:min-h-[max(500px,min(720px,78vh))] bar:min-h-[max(560px,min(1050px,92vh))]';

export default function HomePage() {
  return (
    <div className="font-body text-[15px] font-light leading-[1.62] text-muted sm:text-base sm:leading-[1.7]">
      <section className="mx-auto p-0">
        <div className={`relative overflow-hidden bg-stone ${heroMinHeight}`}>
          <HeroSlider slides={[...hero.slides]} />

          {/* Wash: horizontal on wide screens, vertical when the hero stacks.
              Neither applies below 640px — there the copy sits under the photo
              on cream, so there is nothing to wash. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden hero-wash-stacked sm:block bar:hidden"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden hero-wash-wide bar:block"
          />

          <div
            className={`relative flex flex-wrap items-center gap-6 px-6 pb-9 pt-6 sm:gap-9 sm:px-[clamp(24px,4vw,76px)] sm:py-12 ${heroMinHeight}`}
          >
            {/* Holds the copy clear of the photo while the hero is stacked and
                overlaid, which is 640px and up only. Its height plus this
                container's `sm:py-12` and the `sm:gap-9` after it have to land
                the eyebrow past where `.hero-wash-stacked` goes solid, or the
                eyebrow sets clay type on open photo. Below 640px the photo is
                a block of its own and none of this applies. */}
            <div
              aria-hidden="true"
              className="hidden flex-[1_1_100%] sm:block sm:h-[210px] bar:hidden"
            />

            <div className="min-w-0 max-w-[470px] flex-[1_1_320px]">
              <p className="m-0 mb-3 text-[11px] uppercase tracking-[0.12em] text-clay sm:mb-[18px] sm:text-xs sm:tracking-[0.14em]">
                {hero.eyebrow}
              </p>
              <h1 className="m-0 font-display text-[length:var(--step-hero)] font-normal leading-[1.22] tracking-[-0.01em] text-ink [text-wrap:pretty]">
                {hero.heading}
              </h1>
              <p className="mt-3.5 max-w-[380px] sm:mt-[22px] sm:text-base">{hero.body}</p>

              {/* The pair splits the row evenly on a phone rather than sitting
                  at its natural widths, where two different-length pills
                  stacked into a ragged left-aligned column. */}
              <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
                <Link
                  href="/rooms"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-full bg-clay px-4 py-4 text-[length:var(--step-body)] text-white transition-all duration-[250ms] hover:-translate-y-0.5 hover:bg-accent hover:text-ink sm:flex-none sm:justify-start sm:px-[30px]"
                >
                  See Our Rooms <span aria-hidden="true">&rarr;</span>
                </Link>
                <Link
                  href="/location"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2.5 rounded-full border border-line bg-white/70 px-4 py-4 text-[length:var(--step-body)] text-ink transition-all duration-[250ms] hover:-translate-y-0.5 hover:border-accent sm:flex-none sm:justify-start sm:px-6"
                >
                  Getting Here <span aria-hidden="true" className="text-clay">&rarr;</span>
                </Link>
              </div>
            </div>

            <BookingForm />
          </div>
        </div>

      </section>

      <Reveal className="mx-auto max-w-[1240px] px-6 py-[var(--rhythm-section)]">
        <div
          className={`rounded-2xl bg-sand px-5 py-9 text-center sm:px-8 sm:py-[52px] ${cols4}`}
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
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 pb-[var(--rhythm-section)]">
        <h2 className="mx-auto mb-9 max-w-[620px] text-center font-display text-[length:var(--step-section)] font-normal text-ink [text-wrap:pretty] sm:mb-12">
          {intro.heading}
        </h2>
        <div className="flex flex-wrap items-center gap-10">
          {/* Set a step above body copy: this is the one paragraph on the page
              that explains who the place is for, and it was reading at the
              same size as an amenity card's caption. */}
          <div className="min-w-0 max-w-[460px] flex-[1_1_320px]">
            <p className="m-0 text-[17px] leading-[1.65] sm:text-[19px] sm:leading-[1.7]">
              {intro.body}
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-[9px] border-b border-line pb-1.5 text-[15px] sm:mt-[26px] sm:text-[17px]"
            >
              {intro.cta} <span aria-hidden="true" className="text-clay">&rarr;</span>
            </Link>
          </div>
          <div className="relative h-[240px] min-w-0 flex-[1_1_380px] overflow-hidden rounded-2xl bg-stone sm:h-[340px]">
            <Image
              src={intro.image.src}
              alt={intro.image.alt}
              fill
              sizes="(max-width: 1000px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </Reveal>

      <Reveal className="bg-sand py-[var(--rhythm-section)]">
        <div className="mx-auto max-w-[1240px] px-6">
          <h2 className="mb-9 text-center font-display text-[length:var(--step-section)] font-normal text-ink sm:mb-12">
            What you get
          </h2>
          {/* Two across on a phone. Six of these one per row ran to about
              1,100px — a screen and a half to list the amenities. Paired, the
              same six with the same copy come to roughly 600px, and the set
              reads as a set rather than as six separate announcements. */}
          <div className={amenityGrid}>
            {amenities.map((item) => {
              const Icon = icons[item.icon];
              return (
                <div
                  key={item.title}
                  className="rounded-xl border border-line bg-white px-3.5 py-4 transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-accent sm:rounded-2xl sm:px-8 sm:py-10"
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="mb-2.5 block h-5 w-5 text-accent sm:mb-[22px] sm:h-7 sm:w-7"
                  />
                  <h3 className="m-0 mb-1.5 font-display text-[14px] font-normal leading-[1.3] text-ink sm:mb-3 sm:text-[length:var(--step-card)] sm:leading-normal">
                    {item.title}
                  </h3>
                  <p className="m-0 text-[13px] leading-[1.5] sm:text-[length:var(--step-body)] sm:leading-[1.7]">
                    {item.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-[1240px] px-6 py-[var(--rhythm-section)]">
        <h2 className="mb-9 text-center font-display text-[length:var(--step-section)] font-normal text-ink sm:mb-12">
          {guides.heading}
        </h2>
        <div className={guideList}>
          {guideArticles.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className={guideRow}>
              <div className={guideThumb}>
                <Image
                  src={guide.image.src}
                  alt={guide.image.alt}
                  fill
                  sizes="(max-width: 640px) 56px, (max-width: 1000px) 50vw, 400px"
                  className="object-cover"
                />
              </div>
              {/* The scrim only exists to hold white type off the photo, and
                  below 640px the type is not on the photo. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(0deg,rgba(28,26,24,0.72)_0%,rgba(28,26,24,0)_55%)] sm:block"
              />
              <div className="min-w-0 flex-1 sm:pointer-events-none sm:absolute sm:inset-x-5 sm:bottom-5">
                <span className="inline-block rounded bg-sand px-2 py-[3px] text-[10px] uppercase tracking-[0.08em] text-ink sm:bg-white/90 sm:px-2.5 sm:py-[5px] sm:text-[11px]">
                  {guide.tag}
                </span>
                <h3 className="mb-0.5 mt-1.5 font-display text-[13px] font-normal leading-[1.35] text-ink sm:mb-1.5 sm:mt-3 sm:text-[clamp(15px,2.4vw,19px)] sm:leading-[1.4] sm:text-white">
                  {guide.title}
                </h3>
                <p className="m-0 flex items-center gap-[6px] text-[11px] text-muted sm:gap-[7px] sm:text-xs sm:text-white/90">
                  <Clock aria-hidden="true" strokeWidth={1.5} className="h-3 w-3 flex-none sm:h-[13px] sm:w-[13px]" />
                  <time dateTime={guide.dateISO}>{guide.date}</time>
                </p>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-center sm:mt-9">
          <Link
            href="/guides"
            className="inline-flex items-center gap-[9px] border-b border-line pb-1.5 text-[length:var(--step-body)]"
          >
            {guides.cta} <span aria-hidden="true" className="text-clay">&rarr;</span>
          </Link>
        </p>
      </Reveal>

      <Reveal className="bg-sand py-[var(--rhythm-section)]">
        <div className="mx-auto max-w-[1240px] px-6">
          <Faq />
        </div>
      </Reveal>
    </div>
  );
}
