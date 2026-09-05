import Link from 'next/link';
import Image from 'next/image';
import { Screen } from '@/components/Screen';
import { HeroStage } from '@/components/HeroStage';
import { RoomSwitcher } from '@/components/RoomSwitcher';
import { ContactScreen } from '@/components/ContactScreen';
import { ReviewMarquee } from '@/components/ReviewMarquee';
import { Parallax } from '@/components/motion/Parallax';
import { CountUp } from '@/components/motion/CountUp';
import { SplitHeading, RiseIn } from '@/components/motion/SplitHeading';
import { hero, statement, screens } from '@/content/home';
import { rooms } from '@/content/rooms';
import { location } from '@/content/location';
import { reviews } from '@/content/reviews';
import { posts } from '@/content/blog';
import { guides } from '@/content/guides';
import { brand } from '@/content/site';

export default function HomePage() {
  /* Two notes and a guide, flattened to one shape so the card markup does
     not have to know which stream an entry came from. */
  const journal = [
    { href: `/blog/${posts[0].slug}`, ...posts[0] },
    { href: `/guides/${guides[0].slug}`, ...guides[0] },
    { href: `/blog/${posts[1].slug}`, ...posts[1] },
  ];

  return (
    <>
      {/* 1. The property, photographed. No words on this screen. */}
      <Screen
        id="welcome"
        tone="photo"
        full
        revealed
        labelledBy="welcome-heading"
        className="on-photo"
      >
        <h1 id="welcome-heading" className="sr-only">
          {brand.name}, {brand.locality}
        </h1>
        <HeroStage frames={hero.frames} name={brand.name} locality={brand.locality} />
      </Screen>

      {/* 2. What the place is. The hero says nothing, so this screen carries
          the introduction: the claim on the left against the room the claim
          is about on the right, with the three facts the rest of the site
          stands behind along the foot. */}
      <Screen
        id="stay"
        tone="light"
        labelledBy="stay-heading"
        className="bg-white max-lg:grid-rows-[1fr_29vh] lg:grid-cols-[1.05fr_1fr]"
      >
        <div className="grid content-center gap-[clamp(18px,3vh,28px)] px-[var(--gutter)] pb-[clamp(18px,3vh,44px)] pt-[var(--header-clear)]">
          <div className="grid max-w-[620px] gap-5">
            <p className="eyebrow" data-rv="">
              {statement.eyebrow}
            </p>
            <SplitHeading
              as="h2"
              id="stay-heading"
              text={statement.heading}
              emphasis={statement.headingEmphasis}
              className="text-[length:var(--step-section)] leading-[1.06]"
            />
            <RiseIn delay={0.25}>
              <p className="lede">{statement.body}</p>
            </RiseIn>
          </div>

          <RiseIn delay={0.35}>
            <dl className="m-0 grid max-w-[620px] grid-cols-3 gap-x-4 gap-y-4 border-t border-hairline pt-5 sm:gap-x-8">
              {statement.facts.map((fact) => (
                <div key={fact.label} className="grid gap-1">
                  <dt className="font-display text-[clamp(19px,2vw,28px)] leading-none text-ink">
                    {fact.value}
                  </dt>
                  <dd className="m-0 text-[12px] leading-[1.45] text-slate sm:text-[13px]">{fact.label}</dd>
                </div>
              ))}
            </dl>
          </RiseIn>
        </div>

        <div className="photo photo-hover group relative h-full overflow-hidden">
          <Parallax strength={12} className="absolute inset-[-7%_0]">
            <Image
              src={statement.image.src}
              alt={statement.image.alt}
              fill
              quality={72}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Parallax>
        </div>
      </Screen>

      {/* 3. Rooms, as one comparison rather than three cards. */}
      <Screen
        id="rooms"
        tone="light"
        labelledBy="rooms-heading"
        className="content-center gap-[clamp(12px,2vh,24px)] bg-mist px-[var(--gutter)] pb-[clamp(20px,3vh,40px)] pt-[var(--header-clear)]"
      >
        <div className="grid max-w-[760px] gap-2.5">
          <SplitHeading
            as="h2"
            id="rooms-heading"
            text={screens.rooms.heading}
            emphasis={screens.rooms.headingEmphasis}
            className="text-[length:var(--step-section)] leading-[1.06]"
          />
          <RiseIn delay={0.2}>
            <p className="lede">{screens.rooms.lede}</p>
          </RiseIn>
        </div>
        <RoomSwitcher rooms={rooms.categories} cta={screens.rooms.cta} />
      </Screen>

      {/* 4. Where it is. */}
      <Screen
        id="location"
        tone="light"
        labelledBy="location-heading"
        className="bg-white max-lg:grid-rows-[auto_40vh] lg:grid-cols-2"
      >
        <div className="grid content-center gap-6 px-[var(--gutter)] pb-[clamp(28px,4vh,48px)] pt-[var(--header-clear)]">
          <h2
            id="location-heading"
            data-rv=""
            className="font-display text-[length:var(--step-stat)] leading-[0.9] text-gold"
          >
            <CountUp value={500} suffix=" m" />
            <span className="mt-5 block font-body text-[12px] uppercase tracking-[0.26em] text-slate">
              {screens.location.bigLabel}
            </span>
          </h2>
          <dl className="rows m-0 max-w-[520px] text-[length:var(--step-body)]" data-rv="">
            {location.distances.slice(1).map((row) => (
              <div key={row.place}>
                <dt className="text-slate">{row.place}</dt>
                <dd className="m-0 whitespace-nowrap font-medium text-gold-deep">{row.value}</dd>
              </div>
            ))}
          </dl>
          <div data-rv="">
            <Link href="/location" className="pill pill-gold">
              {screens.location.cta}
            </Link>
          </div>
        </div>
        <Link href="/location" className="photo photo-hover group block h-full overflow-hidden">
          <Parallax strength={14} className="absolute inset-[-8%_0]">
            <Image
              src={screens.location.image.src}
              alt={screens.location.image.alt}
              fill
              quality={72}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </Parallax>
          <span className="photo-caption">Yashobhoomi, from the walk</span>
        </Link>
      </Screen>

      {/* 5. What guests say. A photograph carries it rather than a grey
          field: the only review content that can honestly go here is the
          aggregate, and three centred lines of it left 74 percent of the
          screen empty. The marquee appears under the rating the moment
          content/reviews.ts has real quotes in it. */}
      <Screen
        id="guests"
        tone="photo"
        full
        labelledBy="guests-heading"
        className="on-photo items-center overflow-hidden text-white [--marquee-fade:transparent]"
      >
        <div className="absolute inset-0 overflow-hidden bg-ash" aria-hidden="true">
          <Parallax strength={10} className="absolute inset-[-6%_0]">
            <Image
              src={reviews.image.src}
              alt=""
              fill
              quality={72}
              sizes="100vw"
              className="object-cover"
            />
          </Parallax>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,28,26,0.62)_0%,rgba(26,28,26,0.72)_100%)]" />
        </div>

        <div className="relative z-[2] grid w-full justify-items-center gap-7 px-[var(--gutter)] py-[var(--header-clear)] text-center">
          <SplitHeading
            as="h2"
            id="guests-heading"
            text={reviews.heading}
            emphasis={reviews.headingEmphasis}
            className="text-[length:var(--step-section)] leading-[1.06]"
          />

          <RiseIn delay={0.2}>
            <p className="m-0 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
              <span className="font-display text-[clamp(56px,7vw,104px)] leading-none text-white">
                <CountUp value={reviews.rating} decimals={1} />
              </span>
              <span className="grid gap-1.5 text-left">
                <span
                  role="img"
                  aria-label={`Rated ${reviews.rating} out of 5`}
                  className="relative inline-block text-[20px] leading-none tracking-[0.28em]"
                >
                  <span aria-hidden="true" className="text-white/35">
                    ★★★★★
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-gold-bright"
                    style={{ width: `${(reviews.rating / 5) * 100}%` }}
                  >
                    ★★★★★
                  </span>
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-white/80">
                  <CountUp value={reviews.count} /> reviews on Google
                </span>
              </span>
            </p>
          </RiseIn>

          <ReviewMarquee reviews={reviews.quotes} />

          <RiseIn delay={0.3}>
            <a href={reviews.listing} target="_blank" rel="noopener noreferrer" className="pill pill-gold">
              {reviews.cta}
            </a>
          </RiseIn>
        </div>
      </Screen>

      {/* 6. Group stays. */}
      <Screen id="groups" tone="photo" full labelledBy="groups-heading" className="on-photo items-center overflow-hidden text-white">
        <div className="absolute inset-0 overflow-hidden bg-ash" aria-hidden="true">
          <Parallax strength={12} className="absolute inset-[-7%_0]">
            <Image
              src={screens.groups.image.src}
              alt=""
              fill
              quality={72}
              sizes="100vw"
              className="object-cover"
            />
          </Parallax>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,38,32,0.88)_0%,rgba(28,38,32,0.6)_50%,rgba(28,38,32,0.15)_100%)]" />
        </div>
        <div className="relative z-[2] grid max-w-[640px] gap-5 px-[var(--gutter)] py-[var(--header-clear)]">
          <SplitHeading
            as="h2"
            id="groups-heading"
            text={screens.groups.heading}
            emphasis={screens.groups.headingEmphasis}
            className="text-[length:var(--step-section)] leading-[1.06]"
          />
          <RiseIn delay={0.2}>
            <p className="lede">{screens.groups.lede}</p>
          </RiseIn>
          <RiseIn delay={0.3}>
            <ul className="m-0 grid list-none gap-2.5 p-0 text-[length:var(--step-body)]">
              {screens.groups.points.map((point) => (
                <li key={point} className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="h-px w-[18px] flex-none -translate-y-1 bg-gold" />
                  {point}
                </li>
              ))}
            </ul>
          </RiseIn>
          <RiseIn delay={0.4}>
            <Link href="/group-stays" className="pill pill-gold">
              {screens.groups.cta}
            </Link>
          </RiseIn>
        </div>
      </Screen>

      {/* 7. The journal: the newest writing from the desk. */}
      <Screen
        id="journal"
        tone="light"
        labelledBy="journal-heading"
        className="content-center gap-8 bg-white px-[var(--gutter)] pb-[clamp(28px,4vh,48px)] pt-[var(--header-clear)]"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SplitHeading
            as="h2"
            id="journal-heading"
            text={screens.journal.heading}
            emphasis={screens.journal.headingEmphasis}
            className="text-[length:var(--step-section)] leading-[1.06]"
          />
          <RiseIn delay={0.2}>
            <div className="flex flex-wrap gap-x-7 gap-y-2">
              <Link href="/blog" className="link-ul">
                The journal
              </Link>
              <Link href="/guides" className="link-ul">
                Guides
              </Link>
            </div>
          </RiseIn>
        </div>
        <ul className="m-0 grid list-none gap-[clamp(14px,2vw,28px)] p-0 md:grid-cols-3">
          {journal.map((entry) => (
            <li key={entry.slug} data-rv="">
              <Link href={entry.href} className="grid content-start gap-3">
                <span className="photo photo-hover block aspect-[3/2] max-h-[36vh] rounded-[6px]">
                  <Image
                    src={entry.image.src}
                    alt={entry.image.alt}
                    fill
                    quality={72}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <span className="photo-caption">Read it</span>
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-gold-deep">{entry.tag}</span>
                <span className="font-display text-[length:var(--step-card)] font-medium leading-[1.2] text-ink">
                  {entry.title}
                </span>
                <span className="text-[length:var(--step-body)] leading-[1.6] text-slate">{entry.lead}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Screen>

      {/* 8. Contact and footer. */}
      <ContactScreen />
    </>
  );
}
