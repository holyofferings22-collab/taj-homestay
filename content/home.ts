/**
 * The opening screen carries no words: it is the property, photographed, and
 * nothing else. Four frames from the September 2026 shoot, picked for light
 * and for what each one proves: the outlook at dusk, the tall windows, a
 * writing table, and a room with its own balcony. The lounge is a fine
 * photograph but a busy one, and it earns its place on the About page rather
 * than under the property's name.
 */
export const hero = {
  frames: [
    {
      src: '/photos/2026/room-dusk-city.jpg',
      alt: 'A room at Taj Home Stay at dusk, the lights of Dwarka through the window',
    },
    {
      src: '/photos/2026/room-window-view.jpg',
      alt: 'A room at Taj Home Stay with tall windows looking over Dwarka',
    },
    { src: '/photos/2026/room-window-pair.jpg', alt: 'A twin-windowed room with a writing table' },
    { src: '/photos/2026/room-balcony-door.jpg', alt: 'A room with its balcony door behind the bed' },
  ],
} as const;

/**
 * The screen under the hero. The hero carries no words, so this is where the
 * site first says what the place is.
 *
 * The eyebrow no longer repeats the headline: it was "Sector 26 Dwarka,
 * beside Yashobhoomi" directly above a headline ending "beside Yashobhoomi".
 * The three facts are the ones the rest of the site already stands behind,
 * and they are about the house rather than the distances, which are the
 * location screen's job further down.
 */
export const statement = {
  eyebrow: 'Sector 26 Dwarka',
  heading: 'A quiet address',
  headingEmphasis: 'beside Yashobhoomi.',
  body:
    'Five hundred metres from the convention hall. A twenty-room guest house run by the ' +
    'family who live here, with a desk that answers at any hour.',
  facts: [
    { value: 'Twenty', label: 'rooms, serviced daily' },
    { value: '24×7', label: 'front desk, no cut-off' },
    { value: 'Our own', label: 'kitchen, breakfast cooked here' },
  ],
  image: {
    src: '/photos/2026/lounge.jpg',
    alt: 'The ground-floor lounge at Taj Home Stay, with sofas and armchairs',
  },
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
  /**
   * The highlights row under the introduction, in the manner of a property
   * page's highlight cards: a photograph, a line, and where to read more.
   *
   * Every line here restates a claim the site already makes elsewhere, with
   * the source noted, so the row introduces nothing new to stand behind:
   * the distances come from content/location.ts, the rates and what a room
   * includes from content/rooms.ts, the group terms from content/home.ts
   * `groups`, and the lift, power and kitchen from `amenities` above.
   * The photographs are the property's own, from the September 2026 shoot,
   * with the alt text the gallery already carries for each.
   */
  highlights: {
    heading: 'Highlights',
    lede:
      'Twenty rooms, five hundred metres from Yashobhoomi. These are the things guests ask ' +
      'about first: the walk to the hall, the way in from the airport, the rooms and their ' +
      'rates, and how a block of them is held for a team.',
    items: [
      {
        title: 'Five hundred metres from Yashobhoomi',
        detail: 'Gate 1 of the convention centre is a short walk from the door.',
        href: '/location',
        cta: 'Directions and the walk',
        image: {
          src: '/photos/2026/room-window-view.jpg',
          alt: 'A room with tall windows looking over Dwarka',
        },
      },
      {
        title: 'Airport Express, 550 m from the door',
        detail:
          'Dwarka Sector 25 metro is about seven minutes on foot. From Terminal 3, take the ' +
          'Airport Express, or the desk arranges a car at any hour.',
        href: '/location#arriving',
        cta: 'Getting here',
        image: {
          src: '/photos/2026/front-desk-wide.jpg',
          alt: 'The reception desk and lounge entrance',
        },
      },
      {
        title: 'Twenty rooms, from ₹4,000 a night',
        detail:
          'Three categories, separated only by what they look out onto. Every room is ' +
          'air-conditioned and serviced daily, with an attached bathroom and a TV.',
        href: '/rooms',
        cta: 'See the rooms',
        image: {
          src: '/photos/2026/room-olive-wide.jpg',
          alt: 'A wide view of a room with olive cushions',
        },
      },
      {
        title: 'Room blocks for teams and delegations',
        detail:
          'One coordinator, one bill, one rate held across the block, and breakfast timed to ' +
          'your sessions.',
        href: '/group-stays',
        cta: 'Group stays',
        image: { src: '/photos/2026/corridor.jpg', alt: 'A corridor of guest-room doors' },
      },
      {
        title: 'A lift to every floor, and backup power',
        detail: 'Luggage and upper-floor rooms are not a problem.',
        href: '/about',
        cta: 'About the house',
        image: { src: '/photos/2026/lift.jpg', alt: 'The lift on a guest-room floor' },
      },
      {
        title: 'Breakfast from our own kitchen',
        detail:
          'Cooked here, vegetarian and non-vegetarian. Simple meals through the day if you ' +
          'would rather stay in.',
        href: '/about',
        cta: 'About the house',
        image: { src: '/photos/2026/dining-table.jpg', alt: 'A dining table set for two' },
      },
    ],
  },
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
    image: { src: '/photos/2026/corridor-long.jpg', alt: 'A guest-room corridor running the length of the floor' },
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
