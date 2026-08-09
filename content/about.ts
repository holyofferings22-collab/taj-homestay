export const about = {
  eyebrow: 'Taj Home Stay, Dwarka',
  heading: 'About the guest house',
  lead: 'Twenty keys in Bharthal Village, run by the family that lives here.',
  paragraphs: [
    'Taj Home Stay, Dwarka is a 20-key guest house in Bharthal Village, Sector 26. Most of our ' +
      'guests are here for a reason: a convention at Yashobhoomi, an early flight out of T3, or a ' +
      'night between trains at Bijwasan.',
    'Rooms are clean and serviced daily, the front desk is staffed around the clock, and breakfast ' +
      'comes out of our own kitchen. There is backup power, a lift to every floor, and a desk that ' +
      'will arrange a car at four in the morning if that is when you need one.',
    'No pool, no spa, no lobby music. What we offer is a sorted place to sleep a short walk from ' +
      'where you need to be, at a price that makes sense for a two-night trip.',
  ],
  /**
   * The three-photo block beside the copy.
   *
   * `lead` carries the argument the page is making: the first paragraph says
   * guests come here "for a reason: a convention at Yashobhoomi", and this is
   * the only photo in the set that proves it — the Yashobhoomi flyover and its
   * signage are visible from the balcony.
   *
   * All three were checked for orientation. Nine files in public/photos are
   * stored rotated 90° with no EXIF tag, so browsers render them sideways —
   * look before swapping any of these.
   */
  images: {
    lead: {
      src: '/photos/IMG_9991.jpg',
      alt: 'The view from a balcony at Taj Home Stay, looking out toward Yashobhoomi and the Dwarka Expressway',
    },
    supporting: [
      {
        src: '/photos/IMG_0019.jpg',
        alt: 'A room at night, balcony door open to the lights of Dwarka',
      },
      {
        src: '/photos/IMG_0012.jpg',
        alt: 'A serviced room with air conditioning, made up with fresh linen',
      },
    ],
  },

  /**
   * Rating and reviews read off the Google Business Profile on 9 August 2026;
   * keep in step with the same figures in home.ts.
   *
   * The fourth tile used to ask for "years operating", which nobody had to
   * hand. It now carries the 24×7 desk instead — a fact the page already
   * makes, and one that matters more to a guest landing at 2am.
   */
  stats: [
    { value: '20', label: 'Keys' },
    { value: '4.5', label: 'Google rating' },
    { value: '116', label: 'Reviews' },
    { value: '24×7', label: 'Front desk' },
  ],
} as const;
