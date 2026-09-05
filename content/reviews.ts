/**
 * Google reviews, shown as a continuous slideshow on the home page.
 *
 * The aggregate below was read from Google's own listing for TAJ HOME STAY
 * DWARKA on 4 September 2026. Both figures drift as reviews come in; re-check
 * them whenever you next edit this file, and keep content/about.ts in step.
 *
 * `quotes` is empty until real reviews are pasted in. That is deliberate.
 * Google's signed-out listing does not expose review text to a script, and an
 * invented review on a site whose gallery promises "no staging, no stock"
 * would be the one lie on it. The slideshow renders nothing while the array
 * is empty and the screen still shows the rating, the count and the link.
 *
 * To fill it: open https://maps.google.com/?cid=8648571925722001411, click
 * Reviews, and copy real ones in, word for word, with the reviewer's name as
 * Google shows it and the month. Five or six is plenty; the strip loops.
 *
 *   { quote: 'Exactly as described, five minutes from the hall.',
 *     name: 'Ananya R', when: 'August 2026', stars: 5 },
 */
export type Review = {
  /** The reviewer's own words, copied, not paraphrased. */
  quote: string;
  name: string;
  /** As shown on the listing, e.g. "August 2026". */
  when: string;
  stars: 1 | 2 | 3 | 4 | 5;
};

export const reviews = {
  /** Read from the Google listing on 4 September 2026. */
  rating: 4.6,
  count: 164,
  listing: 'https://maps.google.com/?cid=8648571925722001411',
  heading: 'What guests say',
  headingEmphasis: 'on Google.',
  /**
   * The screen is a photograph with the rating set on it. Without review text
   * the aggregate alone is three centred lines, and on a 775px viewport that
   * left three quarters of the screen empty.
   */
  image: {
    src: '/photos/2026/room-daylight.jpg',
    alt: '',
  },
  cta: 'Read all 164 on Google',
  /** Waiting on the owner; see the note above. */
  quotes: [] as Review[],
} as const;
