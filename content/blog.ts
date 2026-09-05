/**
 * The journal.
 *
 * The guides in content/guides.ts answer a question a guest has already asked
 * ("how do I get from the metro to your door"). The journal is the other
 * half: what it is actually like to stay here, and how the place works. Both
 * are written at the desk and both follow the same rule.
 *
 * The rule: every fact in here is one the site already states somewhere else,
 * or one a reader can check for themselves. There are no invented train
 * times, fares, event dates, opening hours or prices, and nothing claims a
 * facility the property has not claimed. Where a number would help and nobody
 * has measured it, the sentence points at the desk instead. A guest acts on
 * these; a made-up detail costs them a morning.
 */
export type PostSection = {
  heading: string;
  paragraphs: readonly string[];
};

export type Post = {
  slug: string;
  tag: string;
  title: string;
  /** Human-readable, e.g. "4 September 2026". */
  date: string;
  /** Machine-readable for <time> and OpenGraph, e.g. "2026-09-04". */
  dateISO: string;
  lead: string;
  image: { src: string; alt: string };
  sections: readonly PostSection[];
};

export const posts: readonly Post[] = [
  {
    slug: 'a-convention-week-from-bharthal',
    tag: 'Yashobhoomi',
    title: 'A convention week, from this side of the road',
    date: '4 September 2026',
    dateISO: '2026-09-04',
    lead:
      'What the days look like when the hall is full and you are staying five hundred metres from it.',
    image: {
      src: '/photos/2026/room-window-view.jpg',
      alt: 'The outlook over Dwarka from a room at Taj Home Stay',
    },
    sections: [
      {
        heading: 'The walk is the whole point',
        paragraphs: [
          'Gate 1 of Yashobhoomi is about five hundred metres from our door. On an ordinary ' +
            'morning that is a few minutes on foot, which means you leave when you mean to leave ' +
            'rather than when a cab turns up.',
          'It matters most at the two moments of a convention day that everyone underestimates. ' +
            'The first is the morning rush into the hall, when the approach roads carry more ' +
            'cars than they were built for. The second is the changeover, when a session ends ' +
            'and several thousand people want a car at the same minute.',
        ],
      },
      {
        heading: 'Going back for an hour',
        paragraphs: [
          'Exhibitors who stay further out tend to treat the day as one long block, because ' +
            'going back to the room is a trip. From here it is not. Delegates come back between ' +
            'sessions to change a shirt, take a call somewhere quiet, or put their feet up for ' +
            'half an hour before the evening.',
          'That is the part that is hard to sell in a photograph, and it is the reason most of ' +
            'our repeat guests are repeat guests.',
        ],
      },
      {
        heading: 'The evening after',
        paragraphs: [
          'The desk is staffed around the clock, so a late finish is not a problem to solve. ' +
            'Come in when the day ends. If you need a car for the morning, tell the desk before ' +
            'you go up rather than at six the next day.',
          'For anything specific about a particular event, its dates or its hours, check with ' +
            'the organiser. We know the walk, not the programme.',
        ],
      },
    ],
  },
  {
    slug: 'why-guests-choose-this-side',
    tag: 'Dwarka',
    title: 'Why business travellers pick this side of Delhi',
    date: '4 September 2026',
    dateISO: '2026-09-04',
    lead:
      'Three things put Bharthal on the map for working guests: the convention centre, the Airport Express and the Expressway.',
    image: {
      src: '/photos/dwarka-expressway-night.jpg',
      alt: 'The Dwarka Expressway at night',
    },
    sections: [
      {
        heading: 'The convention centre',
        paragraphs: [
          'Yashobhoomi, the India International Convention and Expo Centre, is the reason most ' +
            'of our guests are in Dwarka at all. Sector 25 was a quiet corner before it opened, ' +
            'and the whole area now runs on the hall calendar.',
        ],
      },
      {
        heading: 'The Airport Express',
        paragraphs: [
          'Dwarka Sector 25, the Yashobhoomi station, sits on the Airport Express line, and it ' +
            'is walking distance from us. The line runs to Terminal 3 in one direction and to ' +
            'New Delhi station in the other, so a guest can move between the airport, the hall ' +
            'and central Delhi without a car.',
          'For first and last trains on the day you are travelling, check the Delhi Metro Rail ' +
            'Corporation timings rather than any figure written here months earlier. If your ' +
            'flight falls outside the running hours, tell the desk and we will arrange a car.',
        ],
      },
      {
        heading: 'The Expressway',
        paragraphs: [
          'We sit on the Dwarka Expressway corridor, which is why guests working in Gurgaon or ' +
            'Cyber City choose to sleep on this side rather than fight across the city twice a ' +
            'day. New Delhi Bijwasan station is under a kilometre away for anyone arriving by ' +
            'train.',
        ],
      },
    ],
  },
  {
    slug: 'arriving-at-two-in-the-morning',
    tag: 'Arriving',
    title: 'Arriving at two in the morning',
    date: '4 September 2026',
    dateISO: '2026-09-04',
    lead: 'What actually happens when your flight lands at an hour nobody plans for.',
    image: {
      src: '/photos/2026/room-dusk-city.jpg',
      alt: 'A room at Taj Home Stay at dusk, the lights of Dwarka through the window',
    },
    sections: [
      {
        heading: 'Someone is at the desk',
        paragraphs: [
          'The front desk is staffed twenty four hours a day, seven days a week. There is no ' +
            'cut-off for arriving and no bell to ring and hope. A delegation landing at two in ' +
            'the morning checks in without waiting for anyone to be woken.',
          'This is the single most common thing guests write to us about before they book, and ' +
            'it is the easiest one to answer.',
        ],
      },
      {
        heading: 'Send the flight number',
        paragraphs: [
          'If you would rather not work out the metro at that hour, message the desk your ' +
            'flight number and we will send a car. Telling us the number rather than the time ' +
            'means the driver is watching the same delay you are.',
          'The same works in reverse. Departures before the metro starts running are the reason ' +
            'the travel desk exists; a four in the morning car is a normal request here, not a ' +
            'favour.',
        ],
      },
      {
        heading: 'What to expect at that hour',
        paragraphs: [
          'A lift serves every floor, so luggage and an upper floor are not a problem at any ' +
            'hour. Backup power covers the building.',
          'For check-in and check-out times on your particular booking, ask the desk when you ' +
            'book. Groups can stagger both when flights are spread across a day.',
        ],
      },
    ],
  },
  {
    slug: 'the-rooms-that-face-the-expressway',
    tag: 'Rooms',
    title: 'The rooms with a balcony, and what they look at',
    date: '4 September 2026',
    dateISO: '2026-09-04',
    lead: 'Three categories, separated by one thing: what the window opens onto.',
    image: {
      src: '/photos/2026/room-balcony-door.jpg',
      alt: 'An Executive room with its own balcony behind sliding doors',
    },
    sections: [
      {
        heading: 'One difference, stated plainly',
        paragraphs: [
          'Air conditioning, a television, an attached bathroom and daily servicing are the same ' +
            'in every room we let. The categories differ by what the room looks out onto, and ' +
            'nothing else.',
          'The Deluxe has no external window and no balcony. The Super Deluxe has an external ' +
            'window and daylight. The Executive has a private balcony as well. We say that on ' +
            'the room screen rather than leaving you to find out at check-in, because a guest ' +
            'who wanted daylight and did not get it has a bad two nights.',
        ],
      },
      {
        heading: 'What the balcony sees',
        paragraphs: [
          'Several of the Executive rooms look out toward Yashobhoomi and the Dwarka ' +
            'Expressway. That view is also the proof of the claim the rest of the site makes: ' +
            'the hall really is that close.',
          'If a particular outlook matters to you, say so when you book. We cannot promise a ' +
            'specific room on a specific night, but the desk knows which ones face which way.',
        ],
      },
      {
        heading: 'Which one to take',
        paragraphs: [
          'Most single travellers here for a session take the middle option and are happy with ' +
            'it. The Deluxe is the quiet one and the sensible one for a short stay where you ' +
            'are out all day. The Executive is worth it for a longer stay, or if you are going ' +
            'to be working from the room.',
          'Rates move around Yashobhoomi event weeks. Message the desk with your dates and we ' +
            'will tell you what is actually free and what it costs that week.',
        ],
      },
    ],
  },
  {
    slug: 'holding-a-block-of-rooms',
    tag: 'Groups',
    title: 'Holding a block of rooms, and what we need from you',
    date: '4 September 2026',
    dateISO: '2026-09-04',
    lead: 'For exhibitor teams, delegations and families travelling together, in a house with twenty rooms.',
    image: {
      src: '/photos/2026/corridor-long.jpg',
      alt: 'A guest-room corridor running the length of the floor',
    },
    sections: [
      {
        heading: 'Two things, and we can quote',
        paragraphs: [
          'Send the dates and the number of rooms. That is enough for the desk to come back ' +
            'with what we can hold and what it costs across the block.',
          'If you also know how the arrivals are spread, say so. It is the difference between ' +
            'a group that checks in smoothly and one that queues in its own lobby.',
        ],
      },
      {
        heading: 'What a block gets you',
        paragraphs: [
          'One coordinator handles the whole booking, so there is one person to call rather ' +
            'than a switchboard. One consolidated bill at the end. A rate that holds across the ' +
            'block rather than moving room by room.',
          'Check-ins and check-outs can be staggered when flights are spread across the day.',
        ],
      },
      {
        heading: 'The honest limitation',
        paragraphs: [
          'We are a twenty room guest house, not a convention hotel. There is no banquet hall ' +
            'and no meeting room, and for a very large delegation we are simply not big enough.',
          'That cuts the other way too. For a group of the right size the whole property is ' +
            'effectively yours, which is a different kind of stay from taking a floor of a ' +
            'chain hotel.',
        ],
      },
    ],
  },
];

export const journalIndex = {
  eyebrow: 'Journal',
  heading: 'Notes from',
  headingEmphasis: 'the front desk.',
  lead:
    'What it is like to stay here during a convention week, how the house works, and what we ' +
    'can and cannot do. For step by step directions, read the guides instead.',
  heroImage: {
    src: '/photos/2026/lounge.jpg',
    alt: 'The ground-floor lounge at Taj Home Stay',
  },
} as const;

/** Lookup used by the article route. Returns undefined for an unknown slug. */
export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

/** Every tag in the journal, in the order the posts introduce them. */
export const postTags = Array.from(new Set(posts.map((post) => post.tag)));
