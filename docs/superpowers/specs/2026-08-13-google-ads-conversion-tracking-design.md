# Google Ads conversion tracking

Status: approved 13 August 2026

## Problem

Google Ads issued a Purchase conversion action for this property —
`AW-18353920655`, label `hwhtCPmHs-AcEI-16q9E` — along with the standard
snippet that defines a `gtag_report_conversion(url)` helper. Nothing on the
site reports to it, so every rupee of ad spend is currently unattributed:
Smart Bidding has no signal to optimise against, and there is no way to tell
which campaign produced a guest.

Three things stand between the snippet and working attribution.

**The base tag is missing.** The supplied snippet is only the event half. It
calls `gtag(...)`, but `gtag` is never defined anywhere in this project —
`app/layout.tsx` loads Vercel Analytics and nothing else. Pasted as-is, every
click throws `gtag is not defined` and records zero conversions.

**The redirect callback is the wrong shape for this site.** The snippet's
`event_callback` sets `window.location = url`, a pattern that exists to stop a
same-tab navigation from cancelling the beacon in flight. No conversion path
here navigates the current tab. `BookingForm` calls
`window.open(url, '_blank')`, and all ten `wa.me` links carry
`target="_blank"`. Nothing unloads, so the callback is dead weight — and worse
than inert: if a popup blocker swallows `window.open`, the callback would drag
the guest off the page they were reading.

**There is no purchase.** This site has no booking engine. The desk is the
booking channel and WhatsApp is how guests reach it, so a "Purchase" here means
a guest opening a chat.

## Scope

Every WhatsApp click site-wide counts, plus the availability form submit. Ten
links in total:

| Location | Links |
| --- | --- |
| `components/SiteHeader.tsx` | 2 — number in the top bar, icon in the social row |
| `components/SiteFooter.tsx` | 2 — number in the contact block, icon in the social row |
| `components/CtaBand.tsx` | 1 — appears on several pages |
| `app/contact/page.tsx` | 2 |
| `app/location/page.tsx` | 1 |
| `app/group-stays/page.tsx` | 1 |
| `components/BookingForm.tsx` | 1 — the "Open the chat" fallback, rendered only after a submit |

Plus the `Check Availability` submit in `BookingForm`, which opens WhatsApp
directly.

## What this is not

Not a lead-quality filter. The chosen scope treats a guest tapping the footer
icon the same as one submitting dates. That is a deliberate call in favour of
Smart Bidding volume — the algorithm needs roughly 30 conversions a month to
train, and the booking form alone would not reach it.

`ContactForm` is **not** wired up. `components/ContactForm.tsx` is a stub: it
confirms in-page and tells the guest the form does not send yet. Reporting a
conversion there would count leads that never arrive.

The `Book Now` buttons in the header are **not** wired up. They are internal
`<Link href="/contact">` navigations, not contact attempts.

No consent banner. The property serves mostly Indian traffic and Google Consent
Mode is separate work — revisit if ads are ever targeted at EU visitors.

No conversion value in code. Value stays inherited from whatever is configured
on the action in the Google Ads UI. Hardcoding a rupee figure per WhatsApp
click would be inventing revenue that has not happened.

## Approach

### Delegated listener over a wrapper component

One client component mounted in the root layout listens for clicks on
`a[href^="https://wa.me/"]` at the document level.

The alternative — a `<WhatsAppLink>` component replacing all ten call sites —
was rejected on two counts. It drags a `'use client'` boundary into
`SiteFooter`, `CtaBand` and three page files that are currently server
components, purely to carry an `onClick`. And a tenth link added later that
forgets the wrapper silently stops converting.

Delegation also catches the dynamic fallback link in `BookingForm` for free,
and matches how this codebase already thinks: `content/site.ts` is a deliberate
single source of truth with `whatsappLink()` as the one chokepoint. A single
conversion chokepoint is the same instinct.

The listener matches on `href` rather than a class or data attribute, because
`href` is the thing that makes a link a WhatsApp link. A marker attribute is
another thing to remember.

### Session deduplication is mandatory, not optional

Site-wide scope makes this load-bearing. One guest who taps the header
WhatsApp, scrolls to a CTA band, then submits the booking form fires **three**
conversions. Google Ads would report cost-per-conversion at a third of reality
and bid up accordingly.

The `transaction_id` field sits empty in the supplied snippet. Filling it with
an ID minted once per browser session and held in `sessionStorage` makes Google
collapse repeat conversions into one. It also absorbs the specific double-fire
where a guest submits the form and then clicks the "Open the chat" fallback
because the popup blocker ate the first attempt.

`sessionStorage` rather than `localStorage`: a guest who returns next week is a
genuinely new conversion, and should count as one.

### The tag stays out of development

The base tag does not load unless `NODE_ENV` is `production` and
`NEXT_PUBLIC_VERCEL_ENV` is not `preview`, so local clicking and preview
deployments never reach the live account. Written so an undefined
`NEXT_PUBLIC_VERCEL_ENV` degrades to the `NODE_ENV` check alone rather than
failing shut.

`reportConversion()` no-ops when `window.gtag` is absent. That covers
development, ad blockers, and the window between first paint and the tag
finishing its download — a guest who clicks fast should not see an exception.

## Components

**`app/layout.tsx`** — two `<Script>` tags beside the existing `<Analytics />`:
the `gtag.js` loader and the inline `config` call. Both at `afterInteractive`,
which is the `next/script` default and correct here — conversion tracking must
never delay first paint. Confirmed against
`node_modules/next/dist/docs/01-app/03-api-reference/02-components/script.md`:
only `onLoad`/`onReady`/`onError` force a client boundary, so the layout stays
a server component. The inline tag carries an `id`, which `next/script`
requires in order to track it.

**`lib/conversion.ts`** *(new directory)* — `reportConversion()`. Owns the
session ID, the `send_to` constant, and the `gtag`-absent guard. One exported
function, no React, so it can be called from anywhere. New directory rather
than a home in `content/`, which holds site copy rather than behaviour.

**`components/WhatsAppConversions.tsx`** *(new)* — the delegated listener.
Renders nothing. Registers on mount, removes on unmount.

**`components/BookingForm.tsx`** — one line, calling `reportConversion()`
immediately before `window.open` at line 93. Placed before rather than inside a
callback for the reason set out above: nothing unloads, so there is nothing to
wait for.

## Data flow

```
guest clicks a wa.me link          guest submits the availability form
        │                                        │
        ▼                                        ▼
WhatsAppConversions (delegated)          BookingForm.onSubmit
        │                                        │
        └────────────────┬───────────────────────┘
                         ▼
                 reportConversion()
                         │
             ┌───────────┴───────────┐
             │  window.gtag absent?  │──► return, no throw
             └───────────┬───────────┘
                         ▼
        sessionStorage: reuse or mint transaction_id
                         ▼
     gtag('event', 'conversion', { send_to, transaction_id })
                         ▼
              default link/window.open behaviour proceeds
```

## Error handling

Every failure mode degrades to "the guest still reaches WhatsApp":

- **gtag absent or blocked** — `reportConversion()` returns early. Navigation is
  never conditional on the tag.
- **`sessionStorage` unavailable** (Safari private mode, some embedded
  webviews) — access is wrapped; on failure the conversion fires without a
  `transaction_id`, losing dedupe rather than losing the conversion.
- **Popup blocked on the form** — unchanged from today. The conversion has
  already fired, and the visible fallback link dedupes against it by session ID.
- **Listener throws** — cannot cancel the click, because it never calls
  `preventDefault()`.

## Verification

No test framework is configured in this project, so verification is manual
against the running dev server plus a production build:

1. `npm run build` and `npx tsc --noEmit` clean.
2. In dev, confirm no `gtag.js` request is made and no console error appears on
   a WhatsApp click — the development gate holding.
3. Temporarily force the production gate, then confirm in the network panel
   that a click on a header link, a footer icon, a CTA band button and a form
   submit each produce a `google.com/pagead/...` request carrying the correct
   `send_to`.
4. Confirm four clicks in one session share one `transaction_id`, and that a
   new session mints a different one.
5. Confirm every WhatsApp link still opens the chat with its message intact.
