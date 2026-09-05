export const about = {
  eyebrow: 'About',
  heading: 'A family address',
  headingEmphasis: 'in Bharthal Village.',
  lead: 'Twenty rooms in Sector 26 Dwarka, run by the family that lives here.',
  /** Until the exterior is shot: a room the story screen does not repeat. */
  heroImage: {
    src: '/photos/2026/lounge.jpg',
    alt: 'The ground-floor lounge at Taj Home Stay, with sofas and armchairs',
  },
  story: { heading: 'Most guests are here', headingEmphasis: 'for a reason.' },
  amenitiesHeading: { heading: 'What comes', headingEmphasis: 'with the room.' },
  paragraphs: [
    'Taj Home Stay, Dwarka is a 20-room guest house in Bharthal Village, Sector 26. Most of our ' +
      'guests are here for a reason: a convention at Yashobhoomi, an early flight out of T3, or a ' +
      'night between trains at Bijwasan.',
    'Rooms are clean and serviced daily and the front desk is staffed around the clock. There is ' +
      'backup power, a lift to every floor, and a desk that will arrange a car at four in the ' +
      'morning if that is when you need one.',
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
   * All three come from the September 2026 shoot and show the parts of the
   * house the story talks about: a room, the desk that answers at any hour,
   * and the lounge. There is no kitchen and no breakfast at the house, so
   * the dining-table photographs stay in the gallery and nowhere else.
   */
  images: {
    lead: {
      src: '/photos/2026/room-window-view.jpg',
      alt: 'A room at Taj Home Stay with tall windows looking over Dwarka',
    },
    supporting: [
      {
        src: '/photos/2026/front-desk.jpg',
        alt: 'The front desk at Taj Home Stay, with the lift beyond',
      },
      {
        src: '/photos/2026/lounge-seating.jpg',
        alt: 'Armchairs and a low table in the lounge',
      },
    ],
  },

  /**
   * Rating and reviews as Google's map embed showed them on 4 September 2026;
   * keep in step with the same figures in home.ts.
   *
   * The fourth tile used to ask for "years operating", which nobody had to
   * hand. It now carries the 24×7 desk instead — a fact the page already
   * makes, and one that matters more to a guest landing at 2am.
   */
  stats: [
    { value: '20', label: 'Rooms' },
    { value: '4.6', label: 'Google rating' },
    { value: '164', label: 'Reviews' },
    { value: '24×7', label: 'Front desk' },
  ],
} as const;
