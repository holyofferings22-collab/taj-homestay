/**
 * Room categories.
 *
 * The three categories differ by one thing only — what the room looks out
 * onto — so each card leads with that and says it plainly. Everything else
 * (air conditioning, TV, attached bathroom, daily servicing) is the same
 * across all three.
 *
 * Ordered cheapest first: the site sells a sensible price, not a suite.
 *
 * Each photo was checked to show the feature its card claims — a window where
 * a window is promised, a balcony where a balcony is promised, and neither on
 * the Deluxe. Do not swap these for prettier shots without looking: several
 * files in public/photos are stored rotated 90° and carry no EXIF orientation
 * tag, so browsers render them sideways.
 */
export const rooms = {
  eyebrow: 'Rooms',
  heading: 'Three rooms, told',
  headingEmphasis: 'honestly.',
  lead:
    'Three categories, separated by what the room looks out onto. Rooms without an external ' +
    'window say so plainly, so you know which one you are booking.',
  /** A made bed, straight on, daylight: the archetypal room for the index. */
  heroImage: {
    src: '/photos/2026/room-dusk-city.jpg',
    alt: 'A room at Taj Home Stay at dusk, the lights of Dwarka through the window',
  },
  categories: [
    {
      name: 'Deluxe',
      summary: 'Interior room, no external window. The quiet one.',
      chips: ['No external window', 'Air-conditioned', 'Attached bathroom'],
      description:
        'Our simplest room: no external window and no balcony. Everything else matches the ' +
        'other categories: air conditioning, a TV, an attached bathroom and daily servicing.',
      rate: '4,000',
      image: {
        src: '/photos/2026/room-interior.jpg',
        alt: 'A Deluxe room: bed, wardrobe and wall-mounted TV, with no external window',
      },
    },
    {
      name: 'Super Deluxe',
      summary: 'External window and daylight. The one most single travellers take.',
      chips: ['External window', 'Air-conditioned', 'Attached bathroom'],
      description:
        'Has an external window and daylight, but no balcony. The middle option, and the one ' +
        'most single travellers book.',
      rate: '5,000',
      image: {
        src: '/photos/2026/room-window-trees.jpg',
        alt: 'A Super Deluxe room with an external window looking onto trees',
      },
    },
    {
      name: 'Executive',
      summary: 'Private balcony. Several face Yashobhoomi and the Expressway.',
      chips: ['Private balcony', 'External window', 'Air-conditioned'],
      description:
        'Has a private balcony as well as an external window. Several of these look out toward ' +
        'Yashobhoomi and the Dwarka Expressway.',
      rate: '5,500',
      image: {
        src: '/photos/2026/room-balcony-door.jpg',
        alt: 'An Executive room with its own balcony behind sliding doors',
      },
    },
  ],
  /**
   * TODO: confirm whether these rates include GST, and what breakfast adds.
   * Rate disputes start here — once you know, say it outright in this line
   * rather than leaving a guest to ask at check-out.
   */
  rateNote:
    'Rates are per room, per night. Call the desk to confirm what is included for your dates. ' +
    'Rates move around Yashobhoomi event weeks.',
  cta: {
    heading: 'Checking dates for a convention?',
    body:
      'Rates move around Yashobhoomi event weeks. Call the desk and we will tell you what is ' +
      'actually free.',
  },
} as const;
