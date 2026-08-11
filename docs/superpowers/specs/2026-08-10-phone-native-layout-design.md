# Phone-native layout

Status: approved 10 August 2026

## Problem

The site was ported from a desktop HTML file, so every size in it is a desktop
size: `py-[104px]` between sections, 44px stat numbers, 21px card titles,
230–340px photo blocks, a 480px availability form. Tailwind applies an
unprefixed utility at every width, so all of those are also the phone values.

The result is not broken — there is no horizontal overflow and nothing is
unreachable. It is oversized. Each element is drawn at the scale it was
designed for on a 1440px screen and then shown on a 375px one, so the home page
runs to 9,342px and a single room card fills two thirds of a screen.

An earlier pass cut the padding. That was not enough, and was rejected: cutting
whitespace around desktop-sized components still reads as a narrowed desktop.

## What this is not

Not a restructure. Every page, section, sentence and photo stays where it is
and says what it says. Specifically kept: all eight pages, all six amenities,
all three guides and their articles, the eight FAQs, the newsletter, the group
list, both maps and the walking route.

No home page rooms section is added — home keeps hero, stats, intro, what you
get, guides, FAQ, in that order.

## Approach

Redesign the components at phone width, rather than rescaling them.

Three moves do most of the work:

1. **A phone type scale.** Every heading and number gets a lower `clamp()`
   floor. Because the desktop end of each clamp is unchanged and is reached via
   the `vw` term well before 1000px, desktop renders identically.
2. **Cards become rows.** A photo card stacked above its text is a desktop
   shape. On a phone the same content reads better as a 64px thumbnail beside
   it — a room drops from ~430px to ~100px, so four fit on screen where one did.
3. **The availability checker is rebuilt**, not resized. Four labelled fields
   stacked vertically is a form; the phone version is one bordered block with
   the dates side by side, the party on a summary row, and the action at its
   base. ~150px instead of ~480px.

## Scale

Set as `clamp()` floors so desktop is untouched:

| Role | Phone | Desktop | Token |
| --- | --- | --- | --- |
| Hero heading | 26px | 56px | `--step-hero` |
| Section heading | 21px | 42px | `--step-section` |
| Card title | 16px | 21px | `--step-card` |
| Stat number | 26px | 44px | `--step-stat` |
| Body | 15px / 1.62 | 16px / 1.7 | — |

Vertical rhythm keeps the existing `--rhythm-*` tokens with lower floors:
section 44px, block 38px, gap 32px, hero 30px.

## Per-component

- **Hero.** Below 640px the photo stops being a full-bleed backdrop with a
  gradient wash over it and becomes an in-flow 16:9 block with the copy on
  cream beneath. This removes the wash, the spacer and the three coupled magic
  numbers they needed to agree on. The slide dots move inside the photo's own
  positioning context so they sit on the photo at every width.
- **Rooms, guides index, home guide teasers.** Thumbnail-and-text rows below
  640px, existing cards above. One markup, responsive classes.
- **Amenities.** Two across, icon + title + body, all six kept.
- **Gallery.** Two columns with 8px gutters instead of one.
- **Stats, FAQ, CTA band, footer, location cards, group list.** Same content at
  the phone scale and tighter card padding.

## Carried over

Three fixes from the earlier pass are real defects, not spacing, and stay:

- Form fields are 16px on phones. Below 16px, Safari on iOS zooms the page when
  a field takes focus and does not zoom back.
- Footer nav links were 20px tall, under the 24px minimum target size.
- The hero photo layer was sized to the whole hero, so `object-cover` scaled
  4:3 photos to fill the height and cropped nothing vertically — the phone
  showed the top third of the frame, which on the lead photo is ceiling and a
  fan.

## Boundary

Every change sits below 640px (`sm`). At 640px and above, and therefore on
tablet and desktop, output is unchanged.
