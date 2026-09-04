# Luxury UI redesign

Status: approved by the owner on 3 September 2026 ("create the website as said").
Supersedes the white, black and gold palette from commit 2150f8c and the
phone-native layout spec of 10 August where the two conflict.

## Brief

The owner rejected a commercial, budget-looking redesign and set the bar at
Taj Hotels, ITC Hotels, The Oberoi and The Leela. Three requirements were
stated: hover animation everywhere, every section of every page a full screen
that the scroll stops on, on desktop and phone, and a security pass before
anything ships. New photographs and videos (exterior, lobby, front desk,
breakfast, a hero video) are coming later; the design leaves labelled slots.

What stays: every route and nav label, all copy in `content/*.ts` (edited
only where this spec says), the property logo, WhatsApp as the booking
channel, the Google Ads conversion listener on every `wa.me` link, honest
photography only.

Design read: luxury-hotel register for a 20-room guest house selling to
convention delegates. Dials: variance 6, motion 6, density 2.

## What the references actually do

Captured with Playwright on 3 September (`.playwright-mcp/audit/ref-*.jpg`):

- Taj property pages: white ground, gold hairline before each small-caps serif
  section title (Cinzel), centred composition, a booking bar pinned under the
  hero, gold pill buttons, generous vertical space. The brand home is mostly
  lazy-loaded tiles and is not the reference.
- ITC: white, Helvetica Neue thin headings, a heavy booking bar over the hero,
  three-card offer rows. Efficient, not beautiful.
- Oberoi Delhi: white, editorial, photography given full width, section per
  topic (accommodation, dining, wellness), sticky nav with a Book button.
- None of them snap the scroll. Snapping is the owner's requirement, and it
  is what makes this site feel composed rather than scrolled.

Taken from them: hairline plus small-caps label, the booking bar under the
hero, a serif display face, photography at full width, restraint. Left behind:
Inter, Arial, three equal offer cards, lazy tiles.

## Design system

### Palette

| Token | Hex | Role |
| --- | --- | --- |
| `ivory` | `#f7f4ee` | page ground on light screens |
| `ivory-2` | `#efeae0` | alternate light band, image placeholder |
| `ink` | `#17161a` | text on ivory, primary button on ivory |
| `night` | `#14171d` | ground of dark screens |
| `night-2` | `#1c2028` | raised surface on dark screens |
| `gold` | `#c2a35d` | hairlines, section dots, gold button fill |
| `gold-2` | `#dcc48a` | gold hover, large numerals on night |
| `gold-deep` | `#7f662b` | gold used as text on ivory (passes 4.5:1) |
| `mist` | `rgba(23,22,26,.62)` | scrim over photographs |

Muted text is `ink` at 72 percent on ivory and `ivory` at 72 percent on
night. `whatsapp`, `facebook` and `instagram` brand colours stay for icons
only. No other hue. No pure `#fff` or `#000` except inside photographs.

Theme rule: the page alternates ivory and night screens by design (hero and
group-stays screens are photographs under a night scrim; rooms and guests are
ivory; location and contact are night). This is one deliberate rhythm, not
random inversion, and the header adapts per screen.

### Type

- Display: Cormorant Garamond 400 and 500, italic 400, via `next/font/google`.
  Justified by the brief: the register is luxury hotel, and the reference set
  is serif-led. Italic carries emphasis inside a headline; never a second
  family.
- Body and UI: Manrope 400, 500, 600, via `next/font/google`.
- Scale (desktop max, phone min): h1 `clamp(38px, 5.1vw, 74px)` at 1.02;
  h2 `clamp(32px, 4vw, 54px)` at 1.06; h3 26px; lede
  `clamp(15px, 1.15vw, 18px)` at 1.65; body 15 to 16px at 1.65; eyebrow 11px
  uppercase tracked 0.3em; button 12px uppercase tracked 0.12em, weight 600.
- Any italic display word with a descender gets `padding-bottom: 0.08em` so
  1.02 leading does not clip it.
- Prata and Jost are removed.

### Shape and materials

Buttons are full pills. Photographs, cards and inputs use a 6px radius. The
hero booking bar uses 14px. No drop shadows anywhere except the booking bar
over the hero photograph, which is tinted night, not black. Hairlines are one
pixel of `gold` on ivory and `ivory` at 14 percent on night.

### Hover vocabulary

One system, used everywhere:

- Photographs scale to 1.06 over 1.1s with the `[.16,1,.3,1]` curve; a
  night-to-transparent gradient fades in over the lower half and a small
  uppercase caption rises 8px into view.
- Pill buttons: a fill slides up from below (`::before` translateY 101% to 0)
  in 0.45s; gold fills lighten to `gold-2`, ink fills turn gold with ink text,
  ghost fills turn ivory with ink text. The pill lifts 1px.
- Text links draw a 1px gold underline from the left in 0.45s; on hover it
  shortens to 35 percent from the left.
- Nav links draw the same underline in the current text colour.
- List rows (distances, inclusions) shift 10px right.
- Section dots scale to 1.35 when active.

Nothing loops forever except the hero Ken Burns drift.

### The scroll system

Sections are screens. The implementation is native CSS scroll snap, chosen
over GSAP pinning or Lenis because it is the only approach that behaves the
same on iOS Safari, Android Chrome and desktop, costs no JavaScript on the
scroll path, and cannot jank.

- `<main id="snap">` is the scroll container: `height: 100dvh`,
  `overflow-y: auto`, `scroll-snap-type: y mandatory`,
  `scroll-behavior: smooth`, `overscroll-behavior: contain`. The document
  itself does not scroll.
- Every screen is `<section class="screen">`: `min-height: 100dvh`,
  `scroll-snap-align: start`, `scroll-snap-stop: always`.
- A screen whose content is taller than the viewport (gallery grids, FAQ,
  guide articles, the contact form on a short phone) keeps
  `scroll-snap-align: start` and drops `scroll-snap-stop`. The CSS spec lets
  a snap area larger than the snapport scroll freely inside itself, so long
  content is never trapped; the next screen still snaps when it arrives.
- `prefers-reduced-motion: reduce` switches the container to `proximity`
  snapping and `scroll-behavior: auto`, and disables every transition and the
  Ken Burns drift.
- Keyboard: ArrowDown, PageDown and Space move one screen; ArrowUp and PageUp
  move back. Tab order is unchanged; focus moving into an off-screen section
  scrolls it into view naturally because the container is scrollable.
- In-page anchors (`#rooms`) and the section dots scroll the container, not
  the window. On route change the container resets to the top.
- The header is `position: fixed` (sticky cannot work when the document does
  not scroll). It is transparent over photograph screens, ivory at 92 percent
  with blur over ivory screens, and night at 85 percent with blur over night
  screens. Each section declares `data-tone="photo" | "light" | "dark"` and one
  IntersectionObserver with `root` set to the container and threshold 0.55
  drives the header tone, the active dot, and the reveal class. No scroll
  listeners.
- Reveal: when a section becomes active it gains `.in`; children marked
  `data-rv` fade and rise 26px over 0.9s with 80ms stagger. A section that has
  been seen stays revealed.

This lives in one client component, `SnapShell`, which wraps `{children}` in
the root layout and renders the header tone state, the dots and the phone
WhatsApp button. Pages render plain `<Screen>` server components inside it.

### Booking and calls to action

- Booking intent has one label everywhere: **Check availability**. It appears
  in the header pill, the hero, the hero booking bar and every room screen.
  General contact intent has one label: **Message the desk**. No other
  labels for these two intents anywhere on the site.
- The hero booking bar replaces the card form: check-in, check-out, rooms,
  guests, and a Check availability pill. Defaults are today and tomorrow,
  computed on the client, replacing the fixed August 2026 dates in
  `content/home.ts` and `content/contact.ts`. Submit builds the WhatsApp
  message exactly as `BookingForm` does today and calls `reportConversion`.
- On phones the bar stacks two by two under the hero copy, and a fixed gold
  WhatsApp pill sits bottom right on every page. The old two-button fixed bar
  and its 78px spacer go.
- Every WhatsApp action stays an `<a href="https://wa.me/…">` so the
  delegated conversion listener keeps working; the booking bar submit is the
  one exception and reports explicitly, as today.

### Photography and media slots

- Hero: `IMG_0019` (balcony at night, lights of Dwarka) with a 16s drift from
  scale 1.02 to 1.1. When `content/media.ts` gains `heroVideo`, a muted,
  looping, `playsinline` video with the same photograph as poster replaces
  it. The slot is real code, not a placeholder note.
- `content/media.ts` also declares `exterior`, `lobby`, `frontDesk`,
  `breakfast` and `corridor` as `null` until shot. The about screen, the
  contact screen and the group-stays screen read from it and render their
  existing photographs while a slot is null.
- Room screens use the same three photographs as `content/rooms.ts`. The
  location screen uses `yashobhoomi-iicc.jpg`. Group stays uses `IMG_9993`.
  The rotated files stay unused.
- All photographs go through `next/image` with `sizes` set per slot; the hero
  is `priority` with `fetchPriority="high"`. Quality 72.
- The guides keep their existing images.

### Home page, six screens

1. **Hero.** Photograph or video full bleed under a night scrim that
   strengthens toward the foot. Bottom left: eyebrow "Sector 26 Dwarka,
   beside Yashobhoomi", h1 "A quiet address *beside Yashobhoomi.*", a
   twenty-word lede, gold pill Check availability and ghost pill View rooms.
   Booking bar pinned to the foot of the screen.
2. **Rooms.** Ivory. Eyebrow and h2 "Three rooms, told *honestly.*", lede,
   then three photographs at 3:2 with name, rate, a one-line description and
   a Check availability text link. Hover per the vocabulary.
3. **Location.** Night, split. Left: "500 m" in `gold-2` at up to 180px with
   "to Yashobhoomi Gate 1, on foot", a four-row distance list, a gold pill
   "Directions and the walk" to `/location`. Right: the Yashobhoomi
   photograph, full height, relaxing from scale 1.08 to 1 on hover.
4. **Guests.** `ivory-2`, centred. Eyebrow "What guests say", "4.5" at up to
   140px, five gold stars, "116 reviews on Google", and a text link "Read
   them on Google" to the listing (`https://maps.google.com/?cid=8648571925722001411`).
   No quoted review until the owner supplies real ones; a quote slot exists
   in the component and renders nothing while empty.
5. **Group stays.** Photograph under a left-to-right night scrim. Eyebrow,
   h2 "Block the floor. *Or the building.*", lede, four gold-dash bullets,
   gold pill "Send us your dates" to `/group-stays`.
6. **Contact.** Night. Left: eyebrow, h2 "The desk is *always* on.", the
   phone number at 30px, WhatsApp note, address, gold pill Message the desk
   and ghost pill Send an enquiry. Right: the Google map embed. Footer strip
   at the foot: copyright and the seven nav links. This screen is shared by
   every page as its last screen.

Stats, amenities, guides teasers and the FAQ leave the home page. The
amenities move to the about page; the FAQ moves to the contact page; the
guides keep `/guides`. The newsletter form is removed from the site.

### Inner pages

Every inner page opens with a photograph screen (eyebrow, h1, lead, the
page's own image, header transparent) and closes with the shared contact
screen. Between them:

- **About:** the three paragraphs beside the three photographs as one screen;
  the six amenities as one ivory screen in a two-by-three grid with gold
  hairlines, no cards; the stat band as a night screen with four numerals.
- **Rooms:** one screen per category, alternating photograph left and right,
  with name, chips as hairline pills, description, rate, rate note and Check
  availability. Three screens, then contact.
- **Group stays:** intro paragraphs with photograph; three USPs as a night
  screen; inclusions as a two-column hairline list beside its photograph;
  stats; contact.
- **Location:** distances beside the map embed; the three arriving cards as
  an ivory screen; the walking route embed as a screen; contact.
- **Gallery:** one screen per gallery section, each a tall snap area that
  scrolls inside itself; the lightbox is unchanged.
- **Contact:** form beside the reach card and map as one screen (tall on
  phones, so it drops `scroll-snap-stop`); the FAQ as the next screen.
- **Guides:** the index as a screen of three photograph cards; each article
  opens with its photograph screen, then the article body as one long snap
  area, then contact.

### Header and navigation

Fixed, 72px tall on desktop. Left: the logo at 34px beside "Taj Home Stay"
in Cormorant with "Dwarka · New Delhi" beneath in 9px tracked caps (the one
permitted middle dot). Centre: the seven nav labels at 12px tracked caps.
Right: Check availability pill. Below 860px the labels collapse into a
full-screen night menu opened by a two-line button; the pill stays.

Over photograph screens the logo renders white via a CSS filter; over ivory
and night screens it renders in its own colours at reduced size. The owner
may later supply a single-colour mark; the slot is the same.

### Accessibility

Contrast is checked per token pair (see palette). Focus rings are 2px `gold`
outside the element. Every screen is a landmark `<section aria-labelledby>`.
Reduced motion is honoured as above. Snapping never traps content. Tap
targets are at least 44px on phones.

### Performance

Hero LCP under 2.5s on a 4G phone: `priority` image at quality 72 and
`sizes="100vw"`; fonts subset latin with `display: swap`; Motion is used only
where CSS cannot do the job (none of the home screens need it), so the
initial bundle grows only by `SnapShell`. No scroll listeners, no layout
animation, transforms and opacity only. CLS 0: every image has intrinsic
size, the header is fixed from first paint.

### Security

Before deploy: a review of the full diff for injection (all copy is static;
the WhatsApp URL builder stays the single encoder), `rel="noopener"` on every
external link, no new endpoints, iframe sources unchanged. Response headers
added in `next.config.ts`: `X-Content-Type-Options: nosniff`,
`Referrer-Policy: strict-origin-when-cross-origin`,
`Permissions-Policy: camera=(), microphone=(), geolocation=()`,
`X-Frame-Options: DENY`.

### Libraries

- `motion` 13.2.0 for `useReducedMotion` and any later route transitions.
  Not needed for the six home screens; added because the inner pages'
  gallery lightbox and menu benefit from `AnimatePresence`.
- No GSAP, no Lenis.

### Verification

For every page, Playwright captures at 1440x900 and 390x844 saved under
`.playwright-mcp/audit/build-*.jpg`; a scripted nudge of 45 percent of a
screen must settle back on the current screen and a nudge of 55 percent on
the next; `npm run build`, `npx tsc --noEmit` and `npm run lint` clean; a
Lighthouse run on the home page with LCP under 2.5s on the mobile profile;
keyboard walk-through of the six home screens; reduced motion checked in
DevTools.

## Build notes, 4 September 2026

Decisions taken while building that refine the sections above:

- Eyebrows on the home page are limited to the hero and the shared contact
  screen; the rooms, location, guests and group screens open on their
  headline. One small-caps label per three screens holds on every page.
- The contact screen carries one pill, Message the desk. The "Send an
  enquiry" pill was dropped: a third label for the contact intent, and the
  footer strip already links the contact page.
- The phone WhatsApp pill is hidden while a page's first screen is active.
  Every hero carries its own pill, and on the home page the booking bar sits
  exactly where the floating pill would land.
- On phones the hero shows one pill; View rooms is desktop only. The booking
  bar cells tighten so the whole hero fits an 844px screen.
- A screen taller than the viewport (gallery grid, article, three stacked
  room cards on a phone) becomes active when 60 percent of the viewport is
  covered, not at 55 percent of itself, which it could never reach.
- The rating and review count are read from Google's own map embed: 4.6 and
  164 on 4 September 2026 (they were 4.5 and 116 on 9 August).
- Text-sized gold on ivory uses `gold-deep`; hairlines and marks use `gold`.
- The map on the location page starts below the header so Google's place
  card is never hidden under it.

## Out of scope

A booking engine, OTA links, review syndication, a CMS, dark-mode toggle.
