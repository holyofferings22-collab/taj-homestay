/**
 * Media that is still to be shot, and where it goes when it arrives.
 *
 * Every slot is `null` until the owner supplies the file. Components read a
 * slot and render their current photograph while it is null, so filling one
 * in is a one-line change here and nothing else moves. Drop the file into
 * `public/photos` (or `public/VIDEOS` for footage), then point the slot at it.
 */
export type Still = { src: string; alt: string };
export type Footage = { src: string; poster: string };

export const media = {
  /**
   * Home hero. A muted, looping clip of the building or a balcony at dusk
   * replaces the photograph the moment this is set; the poster is shown
   * until the clip can play, and instead of it under reduced motion.
   */
  heroVideo: null as Footage | null,
  heroStill: {
    src: '/photos/IMG_0019.jpg',
    alt: 'A room at night at Taj Home Stay, balcony door open to the lights of Dwarka',
  } as Still,

  /** The building from across the lane, in its street. About page hero. */
  exterior: null as Still | null,
  /** The front desk, lamp-lit, phone on the counter. Contact screen. */
  frontDesk: null as Still | null,
  /** A corridor of numbered doors, receding. Group stays. */
  corridor: null as Still | null,
  /** Breakfast from the kitchen. About page amenities. */
  breakfast: null as Still | null,
  /** The walk toward Yashobhoomi Gate 1. Location page. */
  walk: null as Still | null,

  /**
   * Real guest reviews, copied word for word from the Google Business
   * Profile with the reviewer's first name and month. Nothing renders in the
   * guests screen's quote slot until at least one is here: an invented quote
   * on a page that promises honesty would cost more than an empty slot.
   */
  reviews: [] as { quote: string; name: string; when: string }[],

  /** The Google listing, where the rating and the 116 reviews live. */
  googleListing: 'https://maps.google.com/?cid=8648571925722001411',
} as const;
