# Taj Home Stay — TypeScript Port

**Date:** 2026-08-09
**Status:** Approved

## Problem

The site currently lives at `~/Documents/HOTEL TAJHOMESTAY/` as seven `.dc.html`
files — an export from a visual design tool. Three problems make it unfit to
deploy.

**Nothing renders server-side.** Each page is a shell containing custom elements
like `<dc-import name="SiteHeader">` and unresolved bindings like
`{{ heroMinH }}`. A 69 KB runtime (`support.js`) fetches the component files and
assembles the DOM in the browser. View-source shows no content, so search
crawlers and link-preview bots see an empty page. For a hotel competing on
local search near Yashobhoomi, this is the most expensive defect, and it is
invisible when checking the site in a browser.

**Values are duplicated with no single source of truth.** The reservations email
appeared in seven places across three files; the palette is retyped in inline
`style` attributes on hundreds of elements. Changing either means a
find-and-replace.

**No build step and no version control.** Editing a component and reloading can
serve a stale cached copy, because the runtime `fetch()`es components and the
dev server sends no cache headers. Separately, `git rev-parse --show-toplevel`
resolves to `/Users/nikhilprasad` — the home directory is an accidental git
repo, and zero project files are tracked by it. There is no history.

## Goal

A faithful port to TypeScript. Every page looks identical to today's design;
what changes is the machinery underneath.

Explicit non-goals: no design changes, no filling of content placeholders, no
making the contact form actually send. Each is a clean follow-up once the port
is proven.

## Architecture

Next.js 15 App Router, TypeScript strict mode, Tailwind, at
`~/Documents/taj-homestay/` with its own git repo. The old project stays where
it is, untouched and runnable, for side-by-side comparison.

### Routes

| Current file | Route |
|---|---|
| `Home.dc.html` | `/` |
| `About.dc.html` | `/about` |
| `Rooms.dc.html` | `/rooms` |
| `Gallery.dc.html` | `/gallery` |
| `Location.dc.html` | `/location` |
| `GroupStays.dc.html` | `/group-stays` |
| `Contact.dc.html` | `/contact` |

`SiteHeader.dc.html` and `SiteFooter.dc.html` become `app/layout.tsx`, rendered
once around every page.

The `vercel.json` rewrite mapping `/` to `/Home.dc.html` is deleted — `/` is a
real route.

### Build output

Default Vercel output, with all seven pages statically pre-rendered at build
time.

Deliberately **not** `output: 'export'`. Static export disables the Next.js
image optimizer, which is the feature that makes full-resolution source photos
practical (see Images). Default output keeps both real HTML in view-source and
on-demand image optimisation.

## Content

Every string moves into typed modules under `content/`, separate from markup:

```ts
export const contact = {
  email: 'tajhomestaydelhi@gmail.com',
  phone: { display: '+91 98105 63059', dial: '+919810563059' },
} as const;
```

The email is then defined once rather than seven times, so the duplication
problem cannot recur.

The existing placeholders — `[ADD ROOM NAME]`, `[ADD BOOKING URL]`,
`[ADD DATE]`, `[ADD DRIVE TIME]`, `[ADD SOCIAL LINKS]`,
`[ADD MAKEMYTRIP / GOIBIBO / BOOKING.COM LINKS]` — carry over verbatim as
values in these modules. The rendered site is unchanged; filling them later
means editing one file, not hunting through markup.

## Styling

Palette and type extracted from the existing inline styles into
`tailwind.config.ts`. Same values, given names.

| Token | Value | Used for |
|---|---|---|
| `ink` | `#1C1A18` | Headings |
| `muted` | `#6E6862` | Body text |
| `accent` | `#E4924E` | Icons |
| `clay` | `#A2591F` | Links, hover |
| `cream` | `#FDFBF8` | Page background |
| `sand` | `#FBF2E9` | Header topbar |
| `line` | `#EFE6DC` | Borders |

Additional values encountered during the port (for example `#F3EDE6` on the
hero) are added as tokens rather than inlined.

Fonts Prata (display) and Jost 300/400/500 (body) load through `next/font`,
self-hosted. This removes the render-blocking Google Fonts request and the
associated layout shift.

Fluid sizing such as `clamp(32px, 4.4vw, 56px)` on the hero heading is
preserved as-is.

## Images

`uploads/` and `photos/` are not two sets of pictures. They are the same 41
photographs at two resolutions:

| File | `photos/` | `uploads/` |
|---|---|---|
| `IMG_0001.jpg` | 1600×1200, 259 KB | 4032×3024, 1.2 MB |
| `IMG_0009.jpg` | 1200×1600, 245 KB | 5712×4284, 2.2 MB |

`uploads/` additionally holds two PNGs absent from `photos/`, giving **43
distinct images**. Only 32 are currently placed on the site.

All 43 originals from `uploads/` move to `public/photos/` and render through
`next/image`. The 1600px `photos/` copies are dropped: they are a manual
downscale that Next now performs automatically, and keeping them would mean two
sources of truth per photograph.

Feeding the optimizer the original rather than the downscale matters. Next
generates its own sized WebP/AVIF derivatives; given an already-compressed
1600px input it can only re-compress, which shows as softness on retina screens
and full-bleed heroes. Visitors never receive the 1.2 MB original — they receive
a derivative sized to their viewport.

## Interactive components

Each page carries one `data-dc-script` block today. These become client
components marked `'use client'`; everything else remains a server component and
ships no JavaScript.

- **Hero slider** — autoplay and interval, currently props on Home
- **Gallery** — category sections and lightbox
- **Contact form** — same fields and validation
- **Mobile nav** — open/close toggle

## Verification

The old site runs on `:4173`, the new on `:3000`. For each of the seven pages,
both are screenshotted at desktop and mobile widths and compared. Any difference
is either fixed or explicitly justified in writing.

This is what makes "faithful" a checkable claim rather than an assertion.

## Decisions requiring action during the port

**`Contact.dc.html:170`** — the post-submit message reads: *"This form is a
design placeholder — connect it to tajhomestaydelhi@gmail.com to receive
enquiries."* That is a note to the site owner, displayed to guests. A faithful
port would carry it across. It is instead rewritten as guest-facing copy; the
form's non-sending behaviour is unchanged.

**`image-slot.js`** (65 KB) — believed to be a design-tool editing shim rather
than runtime behaviour. To be confirmed by inspection before it is dropped.

## Out of scope

- Filling content placeholders
- Making the contact form deliver mail
- Any change to the visual design
- The unreferenced 1600px `photos/` copies
