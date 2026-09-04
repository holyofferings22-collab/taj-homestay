/**
 * The opening screen carries no words: it is the property, photographed, and
 * nothing else. The frames were picked for light and for what they prove,
 * with the balcony over Yashobhoomi leading. None of the nine files that are
 * stored rotated are in here.
 */
export const hero = {
  frames: [
    {
      src: '/photos/IMG_0019.jpg',
      alt: 'A room at Taj Home Stay at night, balcony door open to the lights of Dwarka',
    },
    {
      src: '/photos/IMG_9991.jpg',
      alt: 'A balcony at Taj Home Stay looking toward Yashobhoomi and the Dwarka Expressway',
    },
    { src: '/photos/IMG_9977.jpg', alt: 'A made-up king bed with a runner and framed art' },
    { src: '/photos/IMG_0016.jpg', alt: 'A room at dusk with the curtains drawn back' },
  ],
} as const;

/** The screen under the hero: the argument the whole page rests on. */
export const statement = {
  eyebrow: 'Sector 26 Dwarka, beside Yashobhoomi',
  heading: 'A quiet address',
  headingEmphasis: 'beside Yashobhoomi.',
  body:
    'Five hundred metres from the convention hall. Twenty rooms, a desk that answers at any ' +
    'hour, and the Airport Express a short walk away.',
} as const;

/** Options for the hero booking bar. Dates default to today and tomorrow. */
export const booking = {
  roomOptions: ['1 Room', '2 Rooms', '3 Rooms', '4+ Rooms'],
  guestOptions: ['1 Adult', '2 Adults', '2 Adults, 1 Child', '4 Adults'],
} as const;

export const amenities = [
  {
    icon: 'ConciergeBell',
    title: '24×7 front desk',
    body:
      'Someone is at the desk at 3am. Late arrivals, early checkouts and cab bookings are ' +
      'handled whenever your flight or session lands.',
  },
  {
    icon: 'Wifi',
    title: 'Free high-speed Wi-Fi',
    body:
      'Wi-Fi through the building, steady enough for a video call from your room before a ' +
      'session at the convention centre.',
  },
  {
    icon: 'CarFront',
    title: 'Airport transfer on request',
    body:
      'Tell the desk your flight time and a car is waiting. Useful for 4am departures, when ' +
      'the metro has not started running.',
  },
  {
    icon: 'Utensils',
    title: 'In-house kitchen and breakfast',
    body:
      'Breakfast is cooked here, vegetarian and non-vegetarian. Simple meals through the day ' +
      'if you would rather not go out.',
  },
  {
    icon: 'Zap',
    title: 'Power backup and lift',
    body:
      'Backup power covers the whole building, and a lift serves every floor, so luggage and ' +
      'upper-floor rooms are not a problem.',
  },
  {
    icon: 'Banknote',
    title: 'Travel desk and currency exchange',
    body:
      'Local trips, station drops and currency exchange arranged at the desk, which helps if ' +
      'you are arriving for an exhibition from abroad.',
  },
] as const;

/**
 * The home page as screens (see the 3 September 2026 luxury redesign spec).
 * Each entry is one full-viewport screen; the order here is the scroll order.
 */
export const screens = {
  rooms: {
    heading: 'Three rooms, told',
    headingEmphasis: 'honestly.',
    lede:
      'They differ only by what they look out onto. Every room is air-conditioned, serviced ' +
      'daily, with an attached bathroom and a TV.',
    cta: 'Check availability',
  },
  location: {
    big: '500 m',
    bigLabel: 'to Yashobhoomi Gate 1, on foot',
    cta: 'Directions and the walk',
    image: {
      src: '/photos/yashobhoomi-iicc.jpg',
      alt: 'Yashobhoomi, the India International Convention Centre, seen from the walk',
    },
  },
  /**
   * Rating and review count as Google's own map embed showed them for
   * TAJ HOME STAY DWARKA on 4 September 2026. Both drift as reviews come in;
   * re-check whenever you next edit this file, and keep about.ts in step.
   */
  guests: {
    rating: '4.6',
    reviewsLabel: '164 reviews on Google',
    cta: 'Read them on Google',
  },
  journal: {
    heading: 'Written at',
    headingEmphasis: 'the desk.',
  },
  groups: {
    heading: 'Block the floor.',
    headingEmphasis: 'Or the building.',
    lede:
      'For exhibitor teams, delegations and families travelling together. One coordinator, ' +
      'one bill, one rate held across the block.',
    points: [
      'Rooms held on confirmed dates',
      'Staggered check-in and check-out around flights',
      'Breakfast timed to your sessions',
      'Cars to Terminal 3 at any hour',
    ],
    cta: 'Send us your dates',
    image: { src: '/photos/IMG_9993.jpg', alt: 'A room at Taj Home Stay with daylight from the balcony door' },
  },
} as const;

/**
 * Home page FAQs.
 *
 * Answers are drawn from claims the site already makes elsewhere, so nothing
 * here introduces a new promise, and no answer states a fact nobody has
 * confirmed — an invented check-in time is exactly the kind of detail a guest
 * turns up and holds you to.
 *
 * Check-in and check-out times are as Google's own listing for the property
 * showed them on 4 September 2026. Re-check if the desk changes them.
 *
 * Faq.tsx withholds any answer containing "[" from the FAQPage structured
 * data. Nothing is filtered today; the guard stays for future edits.
 */
export const faqs = {
  heading: 'Questions guests ask',
  lead: 'If the answer you need is not here, message the desk. Someone is always on.',
  items: [
    {
      q: 'How far is Yashobhoomi?',
      a:
        'Gate 1 of the convention centre is about 500 m from the door, a few minutes on foot. ' +
        'From Gate 3 of the Yashobhoomi metro station it is roughly 550 m, about seven minutes. ' +
        'Nobody in your group needs a cab to reach the hall.',
    },
    {
      q: 'What are the check-in and check-out times?',
      a:
        'Check-in is from 12:00 pm and check-out is by 11:00 am. Arriving outside those hours ' +
        'is not a problem, and for groups both can be staggered. Message the desk and we will ' +
        'fix the times for your stay.',
    },
    {
      q: 'Can I check in late, or check out late?',
      a:
        'Yes. The front desk is staffed 24×7, so there is no cut-off for arriving. A delegation ' +
        'landing at 2am checks in without waiting, and the desk will arrange a car at four in the ' +
        'morning if that is when you need one. For groups, check-outs can be staggered when ' +
        'flights are spread across the day. Message the desk and we will fix the times for your stay.',
    },
    {
      q: 'How do I get here from the airport?',
      a:
        'Take the Airport Express from Terminal 3 towards Dwarka Sector 21 and change for Dwarka ' +
        'Sector 25 / Yashobhoomi. Or tell the desk your flight number and we will send a car.',
    },
    {
      q: 'Do all rooms have an external window?',
      a:
        'No. Categories without an external window say so plainly on each room screen, so you ' +
        'know which one you are booking before you book it.',
    },
    {
      q: 'Do you serve breakfast?',
      a:
        'Breakfast comes out of our own kitchen, vegetarian and non-vegetarian, and simple meals ' +
        'are available through the day on request. Call the desk to confirm what your rate includes.',
    },
    {
      q: 'Can you hold a block of rooms for a group?',
      a:
        'Yes. We hold blocks for exhibitor teams, delegations and families travelling together. ' +
        'A group booking means one point of contact, one consolidated bill, and a rate that holds ' +
        'across the whole block. Send us your dates and room count.',
    },

  ],
} as const;
