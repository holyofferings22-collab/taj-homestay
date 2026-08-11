/**
 * Guides & Updates — the three articles linked from the home page.
 *
 * Everything factual here is drawn from claims the site already makes, or from
 * figures measured against the real route: Gate 1 at ~500 m, and 550 m / about
 * 7 minutes on foot from Gate 3 of the Yashobhoomi metro station.
 *
 * Details nobody could verify — train times, fares, which local shops are open
 * at 1am — are deliberately absent rather than guessed. A guest acts on these:
 * an invented last-train time strands someone at the airport, and an invented
 * all-night chemist sends them walking for nothing. Where a fact is missing the
 * article points the reader at the desk or at DMRC, which is both true and
 * more useful than a number that may already be stale.
 *
 * TODO, when someone has them to hand: real Airport Express first/last trains
 * and journey time, and a short list of nearby places genuinely open late.
 */

export type GuideSection = {
  heading: string;
  paragraphs?: readonly string[];
  /** Rendered as an ordered list where the content is genuinely sequential. */
  steps?: readonly string[];
  /**
   * A figure inside the section, rendered at the article's full column width.
   * Use it for something that has to be legible — a route card or diagram —
   * rather than for decoration, which belongs in the hero.
   */
  figure?: { src: string; alt: string; caption?: string };
  /** An inline clip. MP4/H.264 so every browser can play it. */
  video?: { src: string; caption?: string };
};

export type Guide = {
  slug: string;
  tag: string;
  title: string;
  /** Human-readable, e.g. "9 August 2026". */
  date: string;
  /** Machine-readable for <time> and OpenGraph, e.g. "2026-08-09". */
  dateISO: string;
  lead: string;
  image: {
    src: string;
    alt: string;
    /**
     * How the hero is framed. 'wide' (the default) crops a banner strip, which
     * suits a landscape photo. 'square' shows the whole 1:1 frame at a capped
     * width — use it when the composition fills the square and a banner crop
     * would throw most of the picture away.
     */
    aspect?: 'wide' | 'square';
  };
  sections: readonly GuideSection[];
};

/**
 * Annotated rather than `as const`: with a const assertion each section gets
 * its own literal type, so a section written without `steps` has no such
 * property and `section.steps` fails to type-check across the union.
 */
export const guides: readonly Guide[] = [
  {
    slug: 'walking-to-yashobhoomi',
    tag: 'Guide',
    title: 'Yashobhoomi Gate 3 Metro / Sector 25',
    date: '9 August 2026',
    dateISO: '2026-08-09',
    lead:
      'The metro station is 550 m from our door — about seven minutes on foot, or a short ' +
      'e-rickshaw ride if you would rather not walk it.',
    image: {
      src: '/photos/yashobhoomi-iicc.jpg',
      alt: 'Yashobhoomi, the India International Convention and Expo Centre in Dwarka',
    },
    sections: [
      {
        heading: 'The short version',
        paragraphs: [
          'Gate 3 of the Yashobhoomi (Dwarka Sector 25) metro station sits 550 m from our front ' +
            'door — roughly seven minutes at an ordinary pace. That is the walk most of our ' +
            'guests do twice a day during an event, and it is the single reason people choose ' +
            'to stay on this side.',
          'The guest house lies almost due south of the station, about 380 m away in a straight ' +
            'line. The Dwarka Expressway runs between the two, so the walking route bends around ' +
            'it rather than cutting straight across — which is why 380 m on a map becomes 550 m ' +
            'on foot.',
        ],
      },
      {
        heading: 'E-rickshaws, if you would rather not walk',
        paragraphs: [
          'E-rickshaws run from the station and will drop you at the hotel for a minimum fare. ' +
            'That is the easy answer with luggage, in the heat, or after a long flight — and ' +
            'there is usually no wait for one.',
          'Tell the driver Taj Home Stay, Bharthal, Sector 26. If it is late and you cannot see ' +
            'one, call the desk and we will send a car instead.',
        ],
      },
      {
        heading: 'Following the route',
        paragraphs: [
          'The exact path is drawn on our Getting here page as a fixed map you can follow, and ' +
            'the same page has a button that opens the walk in Google Maps on your phone. Head ' +
            'south from Gate 3 and you are going the right way.',
        ],
      },
      {
        heading: 'During event weeks',
        paragraphs: [
          'The walk earns its keep when a session ends. Roads around the convention centre clog ' +
            'as a hall empties, and the cab queue grows faster than cars arrive — a five-minute ' +
            'journey turns into a long wait. Walking, or taking an e-rickshaw, is usually quicker ' +
            'than being driven.',
          'For heavy exhibition material, bad weather, or a departure before the metro starts ' +
            'running, tell the desk and a car is arranged instead. The desk is staffed 24×7, so ' +
            'this works at any hour.',
        ],
      },
      {
        heading: 'Not to be confused with the convention centre gates',
        paragraphs: [
          'Gate 3 here means the metro station exit, which is the one you want for the guest ' +
            'house. Yashobhoomi itself has its own separate numbered gates, and a large event ' +
            'can route delegates through a different one than the last event did.',
          'Check your event pass for which convention centre gate you need, or ask the desk on ' +
            'the way out and we will point you at the right one for that day.',
        ],
      },
    ],
  },

  {
    slug: 'airport-express-to-terminal-3',
    tag: 'Transport',
    title: 'Airport Express: Sector 25 to Terminal 3, step by step',
    date: '9 August 2026',
    dateISO: '2026-08-09',
    lead:
      'Two stops and about eight minutes on the Airport Express, with no change of train. ' +
      'Allow forty minutes from our door to the terminal.',
    image: {
      src: '/photos/airport-express-train.jpg',
      alt: 'An Airport Express train on the elevated Orange Line in Delhi',
    },
    sections: [
      {
        heading: 'At a glance',
        paragraphs: [
          'Yashobhoomi Dwarka Sector 25 is the nearest station — underground, inside the IICC ' +
            'complex. From there IGI Terminal 3 is two stops towards New Delhi: about eight ' +
            'minutes of riding, for roughly ₹50.',
          'Trains run all seven days, every 10 to 15 minutes, with the first at 06:00 and the ' +
            'last at 23:15. Allow forty minutes door to terminal and you will not be rushing.',
        ],
        figure: {
          src: '/photos/airport-express-route.png',
          alt:
            'Route card: Taj Home Stay to IGI Terminal 3 on the Airport Express. First train ' +
            '06:00, last train 23:15, every 10 to 15 minutes, 8 minutes and 2 stops, about ₹50, ' +
            'running all seven days.',
          caption: 'The whole journey on one card.',
        },
      },
      {
        heading: 'Departing: us to Terminal 3',
        steps: [
          'Walk to Yashobhoomi Dwarka Sector 25 — about 12 minutes, or 4 minutes by auto.',
          'The station is underground, inside the IICC complex.',
          'Board the Airport Express towards New Delhi.',
          'Stay on board through Dwarka Sector 21.',
          'Get off at IGI Airport Terminal 3 — roughly five minutes on foot to departures.',
        ],
        paragraphs: [
          'There is no change of train: Terminal 3 is the second stop. The same station also ' +
            'serves Terminal 2.',
        ],
        video: {
          src: '/VIDEOS/location.mp4',
          caption: 'The run from Sector 25 to Terminal 3 on the Delhi Metro network.',
        },
      },
      {
        heading: 'Arriving: Terminal 3 to us',
        paragraphs: [
          'The same journey in reverse. Board at Terminal 3 towards Dwarka Sector 25 and ride to ' +
            'the end of the line, then walk or take an e-rickshaw to our door.',
          'If you would rather not work any of this out after a long flight, send the desk your ' +
            'flight number before you travel and a car will be waiting instead.',
        ],
      },
      {
        heading: 'Outside 06:00 to 23:15',
        paragraphs: [
          'The first train is at 06:00 and the last at 23:15, so anything either side of that ' +
            'means a car. That is the most common reason our guests ask the desk for one — an ' +
            'early-morning departure simply lands before the metro starts.',
          'Tell us your flight time the night before and a car is waiting at the door. Worth ' +
            'settling in the evening rather than at 3am, particularly during event weeks when ' +
            'several guests leave at once.',
        ],
      },
      {
        heading: 'Before a tight connection',
        paragraphs: [
          'Timetables change. If your margin looks thin, check the current DMRC timings, or tell ' +
            'the desk and we will keep a car on standby instead. That is the safer call for a ' +
            'flight you cannot afford to miss.',
        ],
      },
    ],
  },

  {
    slug: 'late-night-near-bharthal',
    tag: 'Nearby',
    title: 'What stays open near Bharthal late at night',
    date: '9 August 2026',
    dateISO: '2026-08-09',
    lead:
      'Landing at 2am, or working late at the hall? What you can count on here, and what you ' +
      'should sort out before the evening ends.',
    image: {
      src: '/photos/dwarka-expressway-night.jpg',
      alt: 'The Dwarka Expressway interchange lit up at night, near Taj Home Stay in Bharthal',
      /** Shot square at 4096×4096 — a banner crop would lose the interchange. */
      aspect: 'square',
    },
    sections: [
      {
        heading: 'What is open here, whatever the hour',
        paragraphs: [
          'The front desk is staffed 24×7. A delegation landing at 2am checks in without waiting, ' +
            'and there is no bell to ring or night manager to wake.',
          'Backup power covers the whole building and the lift serves every floor, so a late ' +
            'arrival with luggage is not left carrying it upstairs in the dark.',
          'Simple meals can be arranged through the day on request. Tell the desk before the ' +
            'evening ends rather than at midnight, and something can usually be sorted out.',
        ],
      },
      {
        heading: 'Getting around late',
        paragraphs: [
          'The metro stops running well before the small hours, so anything after it closes means ' +
            'a car. The travel desk arranges these at any hour — airport runs, station drops and ' +
            'local trips. Booking the night before is always easier than finding something at 3am, ' +
            'especially during Yashobhoomi event weeks when demand spikes across the whole area.',
        ],
      },
      {
        heading: 'Plan for the evening before',
        paragraphs: [
          'Bharthal is a village neighbourhood rather than a late-night high street. The practical ' +
            'advice is the same one we give guests at the desk: pick up what you need on your way ' +
            'back, and tell us about anything you will want after midnight while someone is still ' +
            'around to organise it.',
        ],
      },
      {
        heading: 'Just ask at the desk',
        paragraphs: [
          'Whoever is on the desk lives here, and will know what is actually open tonight better ' +
            'than any list written months ago. Opening hours around Bharthal shift with the ' +
            'season and with whatever is running at the convention centre.',
          'If you need something after hours, ask before you set out. That is quicker, and more ' +
            'reliable, than walking out to find somewhere shut.',
        ],
      },
    ],
  },
];

export const guidesIndex = {
  eyebrow: 'Taj Home Stay, Dwarka',
  heading: 'Guides & Updates',
  lead:
    'Practical notes for getting here, getting to the hall, and getting a car at four in the ' +
    'morning. Written from the desk, not from a brochure.',
} as const;

/** Lookup used by the article route. Returns undefined for an unknown slug. */
export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}
