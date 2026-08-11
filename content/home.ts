export const hero = {
  eyebrow: 'Guest house · Sector 26 Dwarka, New Delhi',
  heading: 'Steps from Yashobhoomi. Minutes from the Airport.',
  body:
    'Yashobhoomi (IICC) Gate 1 is about 500 m on foot, and Dwarka Sector 25 metro on the ' +
    'Airport Express line is walking distance. A clean, well-run stay with a 24×7 front desk.',
  slides: [
    { src: '/photos/IMG_9991.jpg' },
    { src: '/photos/IMG_0017.jpg' },
    { src: '/photos/IMG_9995.jpg' },
    { src: '/photos/IMG_0001.jpg' },
    { src: '/photos/IMG_9984.jpg' },
  ],
} as const;

export const booking = {
  heading: 'Check Availability',
  subheading: 'Best rate when you book direct',
  defaultCheckIn: '2026-08-14',
  defaultCheckOut: '2026-08-16',
  roomOptions: ['1 Room', '2 Rooms', '3 Rooms', '4+ Rooms'],
  guestOptions: ['1 Adult', '2 Adults', '2 Adults, 1 Child', '4 Adults'],
  /**
   * TODO: there is no online booking engine yet. Until one exists the form
   * hands the dates straight to WhatsApp, which is honest — the desk really is
   * the booking channel. Point this at the real URL and switch the submit in
   * `BookingForm` to it when there is one.
   *
   * The two defaults above are fixed dates and will drift into the past. They
   * are what a guest sends the desk if they submit without touching the
   * pickers, so they need revisiting — or replacing with today/tomorrow.
   */
  url: null as string | null,
} as const;

/**
 * Rating and review count read off the TAJ HOME STAY DWARKA Google Business
 * Profile on 9 August 2026. Both drift as reviews come in — re-check them
 * whenever you next edit this file, and keep about.ts in step.
 */
export const stats = [
  { value: '20', label: 'Rooms' },
  { value: '4.5', label: 'Google rating' },
  { value: '116', label: 'Reviews' },
  { value: '500 m', label: 'To Yashobhoomi Gate 1' },
] as const;

export const intro = {
  heading: 'A practical base beside Yashobhoomi',
  body:
    'Most of our guests are here for a reason: a convention at Yashobhoomi, an early flight ' +
    'out of T3, or a night between trains at Bijwasan. Rooms are clean, the front desk is ' +
    'staffed around the clock, and breakfast comes out of our own kitchen.',
  cta: 'Read More',
  /**
   * The only photo in the set where Yashobhoomi is actually identifiable — the
   * flyover and its signage are visible through the balcony door. That is why
   * it sits beside a heading that claims we are beside it.
   *
   * Nine files in public/photos are stored rotated 90° with no EXIF tag and
   * render sideways in every browser; check before swapping this out.
   */
  image: {
    src: '/photos/IMG_9991.jpg',
    alt: 'The view from a balcony at Taj Home Stay, looking out toward Yashobhoomi and the Dwarka Expressway',
  },
} as const;

export const amenities = [
  {
    icon: 'ConciergeBell',
    title: '24×7 Front Desk',
    body:
      'Someone is at the desk at 3am. Late arrivals, early checkouts and cab bookings are ' +
      'handled whenever your flight or session lands.',
  },
  {
    icon: 'Wifi',
    title: 'Free High-Speed Wi-Fi',
    body:
      'Wi-Fi through the building, steady enough for a video call from your room before a ' +
      'session at the convention centre.',
  },
  {
    icon: 'CarFront',
    title: 'Airport Transfer on Request',
    body:
      'Tell the desk your flight time and a car is waiting. Useful for 4am departures, when ' +
      'the metro has not started running.',
  },
  {
    icon: 'Utensils',
    title: 'In-House Kitchen & Breakfast',
    body:
      'Breakfast is cooked here, vegetarian and non-vegetarian. Simple meals through the day ' +
      'if you would rather not go out.',
  },
  {
    icon: 'Zap',
    title: 'Power Backup & Lift',
    body:
      'Backup power covers the whole building, and a lift serves every floor, so luggage and ' +
      'upper-floor rooms are not a problem.',
  },
  {
    icon: 'Banknote',
    title: 'Travel Desk & Currency Exchange',
    body:
      'Local trips, station drops and currency exchange arranged at the desk, which helps if ' +
      'you are arriving for an exhibition from abroad.',
  },
] as const;

/**
 * Chrome for the home page's Guides section. The cards themselves are built
 * from `content/guides.ts`, which is the single source of truth for titles,
 * tags, dates and images — the home page used to carry its own copies, and
 * they drifted from the articles they linked to.
 */
export const guides = {
  heading: 'Guides & Updates',
  cta: 'All guides',
} as const;

/**
 * Home page FAQs.
 *
 * Answers are drawn from claims the site already makes elsewhere, so nothing
 * here introduces a new promise, and no answer states a fact nobody has
 * confirmed — an invented check-in time is exactly the kind of detail a guest
 * turns up and holds you to.
 *
 * TODO: add a plain "check-in from X, check-out by Y" entry once those times
 * are settled. The entry below covers late arrival, which is what guests
 * flying in actually ask about, but it does not replace the standard times.
 *
 * Faq.tsx withholds any answer containing "[" from the FAQPage structured
 * data. Nothing is filtered today; the guard stays for future edits.
 */
export const faqs = {
  heading: 'Questions guests ask',
  lead: 'If the answer you need is not here, call the desk — someone is always on.',
  items: [
    {
      q: 'How far is Yashobhoomi?',
      a:
        'Gate 1 of the convention centre is about 500 m from the door, a few minutes on foot. ' +
        'From Gate 3 of the Yashobhoomi metro station it is roughly 550 m, about seven minutes. ' +
        'Nobody in your group needs a cab to reach the hall.',
    },
    {
      q: 'Can I check in late, or check out late?',
      a:
        'Yes. The front desk is staffed 24×7, so there is no cut-off for arriving — a delegation ' +
        'landing at 2am checks in without waiting. For groups, check-outs can be staggered when ' +
        'flights are spread across the day. Call the desk and we will fix the times for your stay.',
    },
    {
      q: 'Is anyone at the desk late at night?',
      a:
        'Yes. The front desk is staffed 24×7, so a delegation landing at 2am checks in without ' +
        'waiting. The desk will also arrange a car at four in the morning if that is when you ' +
        'need one, which matters for departures before the metro starts running.',
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
        'No. Categories without an external window are stated plainly on the room card, so you ' +
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
