export const groupStays = {
  eyebrow: 'Taj Home Stay, Dwarka',
  heading: 'Group stays for teams and delegations',
  lead:
    'Room blocks for exhibitors, corporate travel and families — about 350 m from Yashobhoomi ' +
    '(IICC) Gate 1.',

  intro: {
    heading: 'Business travel, sorted',
    paragraphs: [
      'Most groups who stay with us are working an event at Yashobhoomi. Exhibitor teams setting ' +
        'up a stand, delegations in for a three-day conference, families travelling together for ' +
        'a wedding. We hold blocks of rooms for exactly that.',
      'A group booking here means one point of contact, one consolidated bill, and a rate that ' +
        'holds across the whole block. Tell us how many rooms and which nights, and we will ' +
        'confirm what we can protect for you.',
      'We are a 20-key guest house rather than a convention hotel, which cuts both ways: no ' +
        'banquet hall, but for a large enough group the whole property is effectively yours.',
    ],
    image: { src: '/photos/IMG_9993.jpg', alt: 'A deluxe room at Taj Home Stay, Dwarka' },
  },

  usps: {
    heading: 'Our USPs',
    cards: [
      {
        icon: 'MapPin',
        title: 'Prime Location',
        body:
          'Yashobhoomi (IICC) Gate 1 is about 350 m on foot, and Dwarka Sector 25 on the Airport ' +
          'Express line is walking distance. IGI Terminal 3 is a short drive, and Bijwasan ' +
          'station is close for anyone arriving by train. Nobody in your group needs a cab to ' +
          'reach the hall.',
      },
      {
        icon: 'ConciergeBell',
        title: 'Personalised Service',
        body:
          'One coordinator handles the whole block. The desk is staffed 24×7, so a delegation ' +
          'landing at 2am checks in without waiting, and check-outs can be staggered when ' +
          'flights are spread across the day. Breakfast timings move to fit your schedule, not ' +
          'ours.',
      },
      {
        icon: 'CarFront',
        title: 'Transportation Assistance',
        body:
          'Airport pickups and drops arranged on request, along with station transfers and local ' +
          'runs through our travel desk. Share the flight numbers and cars are waiting — which ' +
          'matters most for departures before the metro starts running.',
      },
    ],
  },

  includes: {
    heading: 'What a group booking includes',
    image: { src: '/photos/IMG_0013.jpg', alt: 'A standard room at Taj Home Stay, Dwarka' },
    items: [
      'Rooms held on confirmed dates',
      'One contact, one consolidated bill',
      'Veg and non-veg breakfast from our kitchen',
      'Free high-speed Wi-Fi throughout',
      'Power backup and a lift to every floor',
      'Currency exchange for overseas exhibitors',
      'Staggered check-in and check-out',
      'Simple meals through the day on request',
    ],
  },

  /**
   * The fourth tile used to ask for a minimum room count, which is not a rule
   * this guest house actually has. It now states the single point of contact
   * instead — the promise the page above it already makes.
   */
  stats: [
    { value: '20', label: 'Keys available to block' },
    { value: '350 m', label: 'To Yashobhoomi Gate 1' },
    { value: '24×7', label: 'Front desk for late arrivals' },
    { value: '1', label: 'Point of contact for the block' },
  ],

  closing: {
    heading: 'Planning a group stay in Dwarka?',
    body:
      'Send us your dates and room count and we will come back with a rate and what we can hold. ' +
      'For anything urgent, the desk answers the phone at any hour.',
  },
} as const;
