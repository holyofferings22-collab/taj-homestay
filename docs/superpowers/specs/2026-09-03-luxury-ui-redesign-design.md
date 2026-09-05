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

## Second revision, 4 September 2026

The owner asked for five further things and then, after seeing the result,
for three corrections. Both sets are built and this section records what the
sections above no longer describe.

### Palette: white, with grey in a few sections

The forest-green and near-black grounds are gone. The site is white
throughout, with two greys used sparingly so consecutive screens can differ.
Measured, not estimated:

| Token | Hex | Role | On white |
| --- | --- | --- | --- |
| `white` | `#ffffff` | the page | |
| `mist` | `#f6f6f6` | second band | |
| `ash` | `#ededed` | the grey band | |
| `stone` | `#e3e3e3` | hairline fills, photo placeholder | |
| `ink` | `#1f1d1b` | headings, strong text | 16.80 |
| `slate` | `#5c5955` | body text | 6.96 |
| `gold` | `#c9a961` | button fills, marks | ink on gold 7.47 |
| `gold-deep` | `#6f5518` | gold as text | 7.03 |

Every pair passes WCAG AA for body text. No screen is dark, so the header has
one painted state (white at 94 percent) plus transparent over a photograph.
Band rhythm never places two greys together: on the home page it runs photo,
white, mist, white, ash, photo, white, ash.

### The hero

Built to the Taj Hotels property page the owner sent. Full-bleed photography
with no editorial copy on it, circular prev and next arrows at mid-height,
the property name in display caps along the foot behind a gold rule, a
gallery button with a thumbnail, and the availability bar flush across the
bottom edge. Frames cross-fade on a six second timer and the stage drifts
against the scroll.

### The availability bar

Rebuilt to the reference's proportions: 61px tall, one line per cell, a 9.5px
tracked label over a 15px Manrope value, hairline dividers, and a square gold
action at the right that runs the full height of the bar. It was previously
78px with display-face values, which took a slice out of the photograph.

### GSAP

3.15, free under the standard licence, with ScrollTrigger and Flip. Two rules
that are not obvious and must not be undone:

- The scroller is passed as an **element**, never as the selector `#snap`.
  `useGSAP`'s `scope` resolves selector text against descendants of the scoped
  element, and the scroll container is an ancestor, so as a string it resolved
  to undefined and ScrollTrigger threw on it.
- **Nothing pins.** A pin spacer makes its section taller than the viewport,
  which under the CSS scroll-snap oversized-area rule turns that screen into a
  free-scrolling region and moves every later snap point.

Entry animations use `gsap.from`, so a failed GSAP leaves copy readable rather
than stuck at opacity zero.

### The journal

Six notes at `/blog`, filterable by subject with Flip, cross-linked with the
guides and surfaced on the home page. Same honesty rule as the guides.

### Live support

A front door onto the desk's WhatsApp, which is staffed around the clock. It
does not simulate an agent typing. Quick questions are real `wa.me` anchors so
the conversion listener sees them; a typed message reports its own conversion.

### Google reviews

The rating and count are read from Google's own listing: 4.6 from 164 reviews
on 4 September 2026. The same listing also gave check-in 12:00 pm and
check-out 11:00 am, which closes a standing TODO in the FAQ.

`content/reviews.ts` holds a `quotes` array that drives a continuous
slideshow of review cards on the guests screen. **It is empty and must be
filled by hand.** Google's signed-out listing does not expose review text to a
script, and an invented review on a site whose gallery promises no staging and
no stock would be the one lie on it. The marquee renders nothing while the
array is empty; the screen still shows the rating, the count and the link.

## Third revision, 5 September 2026: the scroll runs free

After using the site, the owner asked for three reversals, and they are
built. This section replaces "The scroll system" above.

- **No scroll lock.** The 100dvh scroll container and `scroll-snap-type: y
  mandatory` are gone. The document scrolls; `html` has
  `scroll-behavior: smooth` and `scroll-padding-top` for the fixed header,
  and that is the whole scroll system. No key handlers, no section dots.
- **Sections are bands, not slides.** A `<Screen>` has a `min-height` floor,
  not a lock. `full` asks for the viewport (heroes only); `auto` sizes to the
  content. Content sections share one padding, `pt clamp(84px, 10vh, 104px)`
  and `pb clamp(56px, 7vh, 88px)`, so a heading sits just under the header
  rather than a third of the way down the window.
- **Photographs are framed, not bled.** The rooms section set the pattern:
  a rounded, inset picture beside its copy. `components/Framed.tsx` is that
  frame, 4:3 on phones and `min(56vh, 560px)` tall from `lg`, with the
  parallax clipped inside it. It carries the stay, location, guests and group
  sections on the home page and every room on the rooms page. The location
  map sits in the same frame. Only the heroes are full bleed.
- **The header is transparent over the hero and solid white from the first
  scroll.** `PageShell` re-derives the section under the header's bottom edge
  from every section's box whenever any edge crosses the band beneath the
  header, rather than trusting an observer's changed entries, which missed
  the section already sitting there and left white type on a white ground.
- **The availability bar is a card** floated clear of the hero's foot, not a
  strip welded to its bottom edge. On phones the support launcher steps aside
  while a photograph section is under the header, so it never lands on the
  card; the header's WhatsApp pill covers the same intent there.

## Fourth revision, 5 September 2026: the bands take the window again

Two more reversals from the owner, both on the home page, and one fix that
came out of checking them.

- **Every home band after the hero is a window tall again.** The `auto`
  sizing made the bands feel small. They are `full` once more, with the
  content centred in the height and the shared padding keeping a heading
  clear of the header only when a band holds more than a window. The framed
  photograph grew with them, `min(64vh, 640px)` from `lg`; the rooms
  photograph and the journal thumbnails grew in proportion. The inner pages
  keep `auto`: they are for reading.
- **"Block the floor. Or the building." is back as it was.** The corridor
  photograph carries the whole band, the offer sits on it in white, and the
  left-to-right gradient keeps the copy legible. It is the one photograph
  section between the hero and the footer, and the owner asked for exactly
  this one. The review pass caught that the old gradient was tuned for the
  desktop column only: on a phone the copy spans the width and its right
  half sat over the bright far wall at 2 to 2.4:1. The scrim is now deeper
  under the column from `lg` (0.9 to 0.82 across the first 56%, then
  fading to 0.15) and runs top to bottom below `lg` (0.88 to 0.86 over the
  copy, 0.5 at the foot). Measured against the photograph's 99th-percentile
  luminance, white body text holds above 5:1 and the lede above 4.5:1 in
  both layouts.
- **The header samples both of its edges.** With a photograph band in the
  middle of the page the old rule showed its seam: the header went
  transparent the moment the photograph reached its bottom edge, while its
  top 72px still covered the grey band above, and the white nav text sat on
  light grey. Now `PageShell` reads the section at the top of the window
  and the one under the header's bottom edge; if either is light the
  header is white, and it goes transparent only once a photograph fills the
  whole strip. A white bar over the last inches of a photograph looks
  intended; white type over a light band does not. Two observer bands, one
  from y=0 and one from y=72, trigger the recomputation.
- **The phone launcher hides for the hero only.** The earlier rule keyed on
  `data-tone="photo"`, which now also matched the corridor band. PageShell
  writes the active section's id to `data-screen`, and the rule keys on
  `welcome`, the only section with a card in the launcher's corner.

## Fifth revision, 5 September 2026: the highlights row

The owner asked for a highlights section under the introduction, in the
manner of a Taj property page: the word on the left with a rule, a line of
copy on the right, and a row of photographs with a caption under each,
three to a window, with arrows to page through the rest.

- **`components/Highlights.tsx`** is a native scroll-snap track. A swipe
  or a trackpad needs no script; the arrows only scroll to the neighbouring
  card. From `lg` the arrows sit in the gutters on the photographs'
  midline; below `lg` they sit under the track, and the track runs out to
  the window's edges so the next card peeks in.
- **It loops.** The owner asked that the row never stop. The six cards are
  laid out three times over and the track starts on the middle copy, so
  there is always a full set to scroll into on either side. When the
  scroll comes to rest with the card at its aligned edge outside the
  middle copy, the track moves, instantly, onto that card's twin in the
  copy alongside; nothing on screen changes, and the next swipe or arrow
  has room again. The move is an absolute scroll to the twin's exact
  position, not a relative scroll of one set's width: the cards stop
  every gesture at the next card (`scroll-snap-stop: always`), and
  Chromium holds a relative programmatic scroll to one card as well, so a
  `scrollBy` of one set hopped visibly through every card on the way.
  Traced scroll event by scroll event at 375 and 1470 wide, the move is
  now a single hop in every case: arrow forward past the sixth card,
  arrow back past the first, and wheel in both directions. `scrollend` marks rest where the browser has it, a quiet
  160ms otherwise, and the move waits while a focused card is on screen
  so a keyboard user is never left focused on something off screen (it
  runs the moment focus leaves the track instead). The card at the
  aligned edge always rests inside the middle copy, so what a screen
  reader's touch finds under the first card is real. Each gesture stops
  at the next card (`scroll-snap-stop: always`), so a fling can never run
  to the track's real end. The arrows count from the card they are
  already scrolling to, so quick presses keep count, and they make the
  one-set move themselves before aiming outside the middle copy. Only the
  middle copy is in the accessibility tree and the tab order; the other
  two are scenery, `aria-hidden` with empty alt, and the reveal's stagger
  is handed to the copy on screen by index rather than by DOM order.
  Neither arrow ever disables.
- **The shell rebuilds per route.** `PageShell` lives in the layout and
  did not remount on navigation, so a page reached through a link kept
  every section after its hero unrevealed and the header painted for the
  page before: the owner saw "nothing" on the inner pages. Both observers
  are now keyed on the pathname. The wrapper carries `min-w-0`: a grid item's minimum width is
  otherwise its min-content, which for a no-wrap flex track is the sum of
  every card's min-content, and the track widened the whole page on a
  phone until that was set.
- **Six cards, no new claims.** Every line in `screens.highlights`
  restates something the site already says, with the source noted in the
  content file: the walk to Gate 1, the metro and the Airport Express, the
  rooms and the ₹4,000 opening rate, room blocks for teams, the lift and
  backup power, and the kitchen. The review pass caught two lines that had
  quietly gone further than their sources ("Terminal 3 on the same line",
  which the Location page contradicts, and "at any hour" on the lift) and
  both were cut back. Photographs are the property's own, with the
  gallery's audited alt text.
- **Grounds re-alternated.** The row sits on mist after the white
  introduction, so rooms is white, location mist, guests white (with the
  marquee fade to match), then the corridor, the journal on mist and the
  contact band on ash.
- **Two more fixes from the same review.** The bands after the hero use
  `100lvh`, not `100dvh`: the dynamic unit follows a phone's toolbar and
  made every band above the reader breathe as it came and went. Only the
  hero keeps `dvh`, for the card anchored to its foot. And the reviews
  strip is now sized from the gutter rather than `100vw`, so it cannot
  overrun the page by half a scrollbar on desktops that reserve one.

## Sixth revision, 5 September 2026: the header is solid once the page moves

The owner asked that a moving page never carry a see-through header. The
header is transparent only while the page sits at the very top, over a
hero photograph, and solid white from the first scroll, wherever the page
has got to, the corridor photograph included. `PageShell` pins a 24px
sentinel to the top of the page and watches it with an
IntersectionObserver: while any of it is in view the page has not
scrolled. That replaces the two-edge sampling of the fifth revision for
the header's colour; the section-under-header derivation stays, for the
phone launcher and the phone booking pill. The top shade the corridor
band had carried for the transparent header is gone again, so the band
is as the owner first had it. The hero keeps its `dvh` height through a
`:first-of-type` rule, since the sentinel now precedes it in the page.
The white is opaque, with no blur behind it: the owner could see the
page through the earlier 94% white, and asked that nothing show through.
