import Link from 'next/link';
import Image from 'next/image';
import { Screen } from '@/components/Screen';
import { HeroStage } from '@/components/HeroStage';
import { RoomSwitcher } from '@/components/RoomSwitcher';
import { ContactScreen } from '@/components/ContactScreen';
import { ReviewMarquee } from '@/components/ReviewMarquee';
import { Framed } from '@/components/Framed';
import { Highlights } from '@/components/Highlights';
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


/* One padding for every band of the home page. Each band takes the whole
   window (`full`), as the screens did before the scroll was freed, and its
   content sits centred in that height; the padding only keeps the heading
   clear of the header when a band has more in it than a window holds. */
const band =
  'content-center gap-10 px-[var(--gutter)] pb-[clamp(56px,7vh,88px)] pt-[clamp(84px,10vh,104px)] lg:gap-14';

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

      {/* 2. What the place is. The hero says nothing, so this section
          carries the introduction: the claim on the left, the lounge framed
          on the right, and the three facts the rest of the site stands
          behind along the foot. */}
      <Screen
        id="stay"
        tone="light"
        full
        labelledBy="stay-heading"
        className={`${band} bg-white lg:grid-cols-[1.05fr_1fr] lg:items-center`}
      >
        <div className="grid gap-[clamp(18px,3vh,28px)]">
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

        <Framed src={statement.image.src} alt={statement.image.alt} />
      </Screen>

      {/* 3. Highlights. What guests ask about first, as a row of cards in the
          manner of a property page: the name and a line on top, then framed
          photographs with a caption under each, three to a window, with
          arrows to page through the rest. Every line restates a claim made
          elsewhere on the site; see content/home.ts. */}
      <Screen
        id="highlights"
        tone="light"
        full
        labelledBy="highlights-heading"
        className={`${band} bg-mist`}
      >
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-14">
          <div className="flex items-center gap-[clamp(16px,2vw,28px)]">
            <span aria-hidden="true" className="h-px w-[clamp(40px,6vw,88px)] flex-none bg-gold" />
            <SplitHeading
              as="h2"
              id="highlights-heading"
              text={screens.highlights.heading}
              className="text-[length:var(--step-section)] uppercase leading-[1.06] tracking-[0.08em]"
            />
          </div>
          <RiseIn delay={0.2}>
            <p className="lede max-w-[640px] lg:justify-self-end">{screens.highlights.lede}</p>
          </RiseIn>
        </div>
        <Highlights items={screens.highlights.items} />
      </Screen>

      {/* 4. Rooms, as one comparison rather than three cards. */}
      <Screen
        id="rooms"
        tone="light"
        full
        labelledBy="rooms-heading"
        className="content-center gap-[clamp(14px,2.5vh,28px)] bg-white px-[var(--gutter)] pb-[clamp(56px,7vh,88px)] pt-[clamp(84px,10vh,104px)]"
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

      {/* 5. Where it is. The count and the distances, with the hall framed
          beside them. */}
      <Screen
        id="location"
        tone="light"
        full
        labelledBy="location-heading"
        className={`${band} bg-mist lg:grid-cols-[1fr_1.05fr] lg:items-center`}
      >
        <div className="grid gap-6">
          <h2 id="location-heading" data-rv="" className="font-display text-[length:var(--step-stat)] leading-[0.9] text-ink">
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

        <Link href="/location" className="block">
          <Framed src={screens.location.image.src} alt={screens.location.image.alt}>
            <span className="photo-caption">Yashobhoomi, from the walk</span>
          </Framed>
        </Link>
      </Screen>

      {/* 6. What guests say. The aggregate from Google beside a framed
          photograph; the review cards appear beneath the moment
          content/reviews.ts has real quotes in it. */}
      <Screen
        id="guests"
        tone="light"
        full
        labelledBy="guests-heading"
        className={`${band} bg-white lg:grid-cols-[1fr_1.05fr] lg:items-center [--marquee-fade:var(--color-white)]`}
      >
        <Framed src={reviews.image.src} alt="" className="lg:order-1" />

        <div className="grid gap-6 lg:order-2">
          <SplitHeading
            as="h2"
            id="guests-heading"
            text={reviews.heading}
            emphasis={reviews.headingEmphasis}
            className="text-[length:var(--step-section)] leading-[1.06]"
          />
          <RiseIn delay={0.2}>
            <p className="m-0 flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="font-display text-[clamp(56px,7vw,104px)] leading-none text-ink">
                <CountUp value={reviews.rating} decimals={1} />
              </span>
              <span className="grid gap-1.5">
                <span
                  role="img"
                  aria-label={`Rated ${reviews.rating} out of 5`}
                  className="relative inline-block text-[20px] leading-none tracking-[0.28em]"
                >
                  <span aria-hidden="true" className="text-ink/20">
                    ★★★★★
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 overflow-hidden whitespace-nowrap text-gold-deep"
                    style={{ width: `${(reviews.rating / 5) * 100}%` }}
                  >
                    ★★★★★
                  </span>
                </span>
                <span className="text-[11px] uppercase tracking-[0.22em] text-slate">
                  <CountUp value={reviews.count} /> reviews on Google
                </span>
              </span>
            </p>
          </RiseIn>
          <RiseIn delay={0.3}>
            <a href={reviews.listing} target="_blank" rel="noopener noreferrer" className="pill pill-ink">
              {reviews.cta}
            </a>
          </RiseIn>
        </div>

        {reviews.quotes.length > 0 && (
          <div className="lg:col-span-2">
            <ReviewMarquee reviews={reviews.quotes} />
          </div>
        )}
      </Screen>

      {/* 7. Group stays. The corridor of doors carries the whole screen, as
          it did before the framed pass: the owner asked for this one back
          exactly as it was. The photograph is the ground and the offer sits
          on it in white. From `lg` the scrim runs left to right, deep under
          the copy column and thin over the corridor, as before; below `lg`
          the copy spans the whole width, so the scrim runs top to bottom
          instead and stays deep wherever there is type. Both keep white
          body text above 4.5:1 over the brightest pixel in the frame. */}
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
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,38,32,0.88)_0%,rgba(28,38,32,0.86)_82%,rgba(28,38,32,0.5)_100%)] lg:bg-[linear-gradient(90deg,rgba(28,38,32,0.9)_0%,rgba(28,38,32,0.82)_56%,rgba(28,38,32,0.15)_100%)]" />
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

      {/* 8. The journal: the newest writing from the desk. */}
      <Screen
        id="journal"
        tone="light"
        full
        labelledBy="journal-heading"
        className={`${band} bg-mist`}
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
                <span className="photo photo-hover block aspect-[3/2] max-h-[40vh] rounded-[6px]">
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

      {/* 9. Contact and footer. */}
      <ContactScreen />
    </>
  );
}
