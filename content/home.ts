export const hero = {
  eyebrow: 'Guest house · Sector 26 Dwarka, New Delhi',
  heading: 'Steps from Yashobhoomi. Minutes from the airport.',
  body:
    'Yashobhoomi (IICC) Gate 1 is about 350 m on foot, and Dwarka Sector 25 metro on the ' +
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
  /** PLACEHOLDER — the live booking-engine URL. */
  url: '[ADD BOOKING URL]',
} as const;

export const bookingNote =
  'Booking links pending — the form confirms in-page for now. Add [ADD BOOKING URL] and I will wire the submit to it.';

export const stats = [
  { value: '20', label: 'Keys (confirm)' },
  { value: '4.3', label: 'Google rating (confirm)' },
  { value: '88', label: 'Reviews (confirm)' },
  { value: '350 m', label: 'To Yashobhoomi Gate 1' },
] as const;

export const intro = {
  heading: 'A practical base beside Yashobhoomi',
  body:
    'Most of our guests are here for a reason: a convention at Yashobhoomi, an early flight ' +
    'out of T3, or a night between trains at Bijwasan. Rooms are clean, the front desk is ' +
    'staffed around the clock, and breakfast comes out of our own kitchen.',
  cta: 'Read More',
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

export const guides = {
  heading: 'Guides & Updates',
  /** `date` is a PLACEHOLDER on every card in the original design. */
  items: [
    {
      tag: 'Guide',
      title: 'Walking to Yashobhoomi Gate 1 from the guest house',
      date: '[ADD DATE]',
      href: '/location',
      slot: 'ths-guide-1',
    },
    {
      tag: 'Transport',
      title: 'Airport Express: Sector 25 to Terminal 3, step by step',
      date: '[ADD DATE]',
      href: '/location',
      slot: 'ths-guide-2',
    },
    {
      tag: 'Nearby',
      title: 'What stays open near Bharthal late at night',
      date: '[ADD DATE]',
      href: '/location',
      slot: 'ths-guide-3',
    },
  ],
} as const;
