export const location = {
  eyebrow: 'Taj Home Stay, Dwarka',
  heading: 'Getting here',
  lead: 'KH No. 483, VPO Bharthal Village, Sector 26 Dwarka, New Delhi 110077.',
  mapQuery: 'Bharthal Village Sector 26 Dwarka New Delhi 110077',
  distances: [
    { icon: 'MapPin', place: 'Yashobhoomi (IICC) Gate 1', value: '~350 m, walkable' },
    {
      icon: 'TrainFront',
      place: 'Dwarka Sector 25 / Yashobhoomi metro, Airport Express',
      value: 'Walking distance',
    },
    /** PLACEHOLDER — measure the actual drive time to T3. */
    { icon: 'Plane', place: 'IGI Airport Terminal 3', value: '[ADD DRIVE TIME]' },
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
          'Gate 1 is roughly 350 m from the door, so delegates walk across in a few minutes ' +
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
