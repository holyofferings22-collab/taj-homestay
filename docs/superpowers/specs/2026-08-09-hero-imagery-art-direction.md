# Hero imagery — art direction brief

**Date:** 2026-08-09
**Status:** Brief agreed. Layout treatment still open.
**Scope:** Hero sections of the six inner pages — About, Rooms, Group Stays, Location, Gallery, Contact.

## The governing constraint

Two lines of existing copy rule out an entire genre of imagery:

> "Every room, bathroom and balcony photographed as it is — no staging, no stock."
> — `content/gallery.ts`

> "No pool, no spa, no lobby music."
> — `content/about.ts`

The site's voice is deliberately anti-aspirational. It sells *sorted*, not *luxurious*. Glossy
hotel photography — rose petals, fanned towels, sunset pools — would not merely be off-brand; it
would contradict a promise the Gallery page makes in writing.

The second rule follows from the first: **every page's copy names a concrete, photographable
noun.** Yashobhoomi Gate 1, the 24×7 desk, the lift, the 4am car, the family that lives here. The
strongest hero for any page is the literal subject of its own first sentence, not a decorative
mood shot.

## Per-page recommendation

| Page | Image | Rationale | Source |
| --- | --- | --- | --- |
| **About** | Building exterior, from across the lane, in its Bharthal Village street context | Lead is *"Twenty keys in Bharthal Village, run by the family that lives here."* A room interior cannot say "village" or "family-run". A facade says both. | **New** |
| **Rooms** | A made bed, straight-on, balcony door open, daylight | Category index — wants the archetypal room, not a specific one | `IMG_9977` works today |
| **Group Stays** | A corridor of numbered doors, receding in perspective | Lead is *"Room blocks."* One bedroom says "a room"; a corridor says "a block of rooms" — and *"the whole property is effectively yours."* | **New** |
| **Location** | Street-level view toward Yashobhoomi Gate 1 | The page's whole claim is *"~350 m, walkable."* Show the walk. | `IMG_9991` today; new is better |
| **Gallery** | A composed montage of 3–4 existing photos, overlapping | The promise is *quantity and honesty*. One photo undersells it. This hero should be **built, not shot**. | Existing, composed |
| **Contact** | The front desk at night, lamp-lit, phone on the counter | Lead is *"The desk answers all day and all night. Calling is quickest."* This is the copy, photographed. | **New** |

## Shot list — four photos, one evening

1. **Facade** — late afternoon, from across the lane, building in its street context → *About*
2. **Corridor** — doors receding, room numbers legible, existing ceiling light → *Group Stays*
3. **Front desk at night** — warm lamp, phone visible, ideally someone on duty → *Contact*
4. **Street toward Yashobhoomi Gate 1** — daylight, the walk itself → *Location*

### Shooting spec

- Landscape, 3:2, generous headroom on all four edges so one file crops safely to either hero layout.
- Hold the phone level. The existing set's worst defects are tilt and sideways framing —
  `IMG_9992`, `IMG_0010`, `IMG_0011` and `IMG_9982` are all stored rotated with no EXIF
  orientation tag, so browsers render them sideways.
- No staging. Don't add flowers, don't fan towels. The honesty is the brand.

## On generated imagery

An AI-generated image is fine for the **Gallery montage** — that is composition, not depiction.
It fights the other three. A generated facade is not *this* building; a generated desk is not
*this* desk. Guests who arrive and find a different building notice, and the Gallery page's
"no stock" line becomes false in writing.

## Existing photo inventory

43 files in `public/photos/`. All interiors — rooms and bathrooms. **No exterior, lobby, facade,
or reception shot exists**, which is the binding constraint above.

Nine are unused, and unused for cause:

| File | Defect |
| --- | --- |
| `IMG_9992` | Stored sideways — **currently live in the gallery** (`content/gallery.ts`) |
| `IMG_0010`, `IMG_0011`, `IMG_9982` | Sideways, plus a thumb over the lens |
| `IMG_9980`, `IMG_9990` | Photographer's reflection in the bathroom mirror |
| `pasted-1785827051639-0.png`, `pasted-1785829280866-0.png` | Byte-identical duplicates (4.5 MB each) of a "Hotel Mellow" template screenshot — a design reference, not property photography |

`IMG_9991` is the standout: the Yashobhoomi flyover and signage are visible from the balcony,
making it the only image that *proves* the ~350 m claim.

## Open question

**Hero layout treatment**, which determines the final crop:

- **Right-hand panel** — sand band stays, photo occupies the right ~45%, bleeding to the viewport
  edge with a sand→transparent gradient melting its left edge into the band. Keeps inner pages
  subordinate to the home page.
- **Full-bleed** — photo fills the hero band edge-to-edge behind the existing `.hero-wash-wide`
  gradient, exactly like the home page. More dramatic; risks making all seven pages look alike.

A 3:2 frame with headroom survives either, so shooting is not blocked on this decision.
