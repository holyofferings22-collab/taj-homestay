import { contact } from './site';

export const location = {
  eyebrow: 'Taj Home Stay, Dwarka',
  heading: 'Getting here',
  lead: 'KH No. 483, VPO Bharthal Village, Sector 26 Dwarka, New Delhi 110077.',
  distances: [
    { icon: 'MapPin', place: 'Yashobhoomi (IICC) Gate 1', value: '~500 m, walkable' },
    {
      icon: 'TrainFront',
      place: 'Dwarka Sector 25 / Yashobhoomi metro, Airport Express',
      value: 'Walking distance',
    },
    /**
     * TODO: no measured drive time to T3 yet. "Short drive" is the claim the
     * About and Group Stays pages already make, so it is used here rather than
     * a guessed figure — replace it with a real number once someone times it.
     */
    { icon: 'Plane', place: 'IGI Airport Terminal 3', value: 'Short drive' },
    { icon: 'TrainTrack', place: 'New Delhi Bijwasan railway station', value: 'Under 1 km' },
    { icon: 'Building2', place: 'DLF Cyber City, via Dwarka Expressway', value: 'By road' },
  ],
  arriving: {
    heading: 'Arriving',
    cards: [
      {
        icon: 'PlaneLanding',
        title: 'From the airport',
        body:
          'Take the Airport Express from T3 towards Dwarka Sector 21 and change for Dwarka ' +
          'Sector 25 / Yashobhoomi, or tell the desk your flight number and we will send a car.',
      },
      {
        icon: 'Footprints',
        title: 'To Yashobhoomi',
        body:
          'Gate 1 is roughly 500 m from the door, so delegates walk across in a few minutes ' +
          'rather than queueing for a cab during hall changeovers.',
      },
      {
        icon: 'CarFront',
        title: 'By road',
        body:
          'We sit on the Dwarka Expressway corridor, which is the reason guests working in ' +
          'Gurgaon or Cyber City choose to stay on this side.',
      },
    ],
  },
} as const;

/**
 * The locked walking route shown on the Location page.
 *
 * The two ends are addressed differently, on purpose. Gate 3 has no Google
 * listing of its own, so only a coordinate can point at it. The property is
 * the opposite case: its coordinate reverse-geocodes to a car-service garage
 * sharing plot KH No. 483, so it has to be named instead.
 *
 * `facts` are what Google reports for this exact pair. Re-check them if either
 * endpoint moves.
 */
export const walkRoute = {
  heading: 'Walking from the metro',
  lead:
    'The same walk every guest makes, fixed on the map below — from Gate 3 of the ' +
    'Yashobhoomi metro station to our door.',
  /** Fixed coordinates — there is no Google listing for an individual gate. */
  origin: {
    label: 'Yashobhoomi Dwarka Sector 25 metro — Gate 3',
    lat: 28.549579,
    lng: 77.0469135,
  },
  /**
   * Searched by name rather than by coordinate, deliberately — see the note on
   * `contact.mapQuery`. Appending `(Label)` to a coordinate does NOT override
   * the pin name; this embed ignores it.
   */
  destination: {
    label: 'Taj Home Stay, Dwarka',
    query: contact.mapQuery,
  },
  facts: [
    { label: 'On foot', value: '550 m, about 7 min' },
    { label: 'Straight-line distance', value: '~380 m' },
    { label: 'From Gate 3', value: 'Head south' },
  ],
  cta: 'Open walking directions',
} as const;
