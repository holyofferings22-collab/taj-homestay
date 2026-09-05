/**
 * The gallery.
 *
 * Photographed in September 2026 and colour-corrected; nothing is staged and
 * nothing is stock. Sections are titled by what is visible in the frame, not
 * by the sold category: the shoot was not organised category by category, and
 * a balcony filed under "Deluxe" (a room sold as having no window) would
 * promise the wrong room. The house comes first because the lounge, the desk
 * and the dining tables are the parts a guest cannot see anywhere else. (The
 * tables are photographed as they are; there is no kitchen and no breakfast
 * at the house, and no caption says otherwise.)
 */
export const gallery = {
  eyebrow: 'Gallery',
  heading: 'Every room,',
  headingEmphasis: 'as it is.',
  lead:
    'Every room, bathroom and balcony photographed as it is. No staging, no stock. ' +
    'Tap any photo to view it full size.',
  heroImage: {
    src: '/photos/2026/lounge.jpg',
    alt: 'The ground-floor lounge at Taj Home Stay, with sofas and armchairs',
  },
  sections: [
    {
      id: 'house',
      heading: 'The house',
      count: '13 photos',
      photos: [
        { src: '/photos/2026/lounge.jpg', alt: 'The ground-floor lounge with sofas and armchairs' },
        { src: '/photos/2026/lounge-seating.jpg', alt: 'Armchairs and a low table in the lounge' },
        { src: '/photos/2026/lounge-entrance.jpg', alt: 'Lounge seating beside the entrance' },
        { src: '/photos/2026/front-desk.jpg', alt: 'The front desk at Taj Home Stay, with the lift beyond' },
        { src: '/photos/2026/front-desk-wide.jpg', alt: 'The reception desk and lounge entrance' },
        { src: '/photos/2026/dining.jpg', alt: 'A laid dining table at Taj Home Stay' },
        { src: '/photos/2026/dining-table.jpg', alt: 'A dining table set for two' },
        { src: '/photos/2026/games-room.jpg', alt: 'The pool table in the games room' },
        { src: '/photos/2026/games-table.jpg', alt: 'The games room pool table' },
        { src: '/photos/2026/corridor.jpg', alt: 'A corridor of guest-room doors' },
        { src: '/photos/2026/corridor-long.jpg', alt: 'A guest-room corridor running the length of the floor' },
        { src: '/photos/2026/stairwell.jpg', alt: 'The staircase beside the guest-room corridor' },
        { src: '/photos/2026/lift.jpg', alt: 'The lift on a guest-room floor' },
      ],
    },
    {
      id: 'rooms-with-a-view',
      heading: 'Rooms with a window or balcony',
      count: '10 photos',
      photos: [
        { src: '/photos/2026/room-dusk-city.jpg', alt: 'A room at dusk, the lights of Dwarka through the window' },
        { src: '/photos/2026/room-window-view.jpg', alt: 'A room with tall windows looking over Dwarka' },
        { src: '/photos/2026/room-window-pair.jpg', alt: 'A twin-windowed room with a writing table' },
        { src: '/photos/2026/room-daylight.jpg', alt: 'A made-up room in daylight' },
        { src: '/photos/2026/room-green-outlook.jpg', alt: 'A room whose window looks onto trees' },
        { src: '/photos/2026/room-window-trees.jpg', alt: 'A room with a window onto greenery' },
        { src: '/photos/2026/room-window-wide.jpg', alt: 'A wide view of a room with an external window' },
        { src: '/photos/2026/room-curtains.jpg', alt: 'A room with the curtains drawn back' },
        { src: '/photos/2026/room-balcony-door.jpg', alt: 'A room with the balcony door behind the bed' },
        { src: '/photos/2026/room-balcony-night.jpg', alt: 'A room at night with the balcony door beyond' },
      ],
    },
    {
      id: 'rooms',
      heading: 'Rooms',
      count: '14 photos',
      photos: [
        { src: '/photos/2026/room-armchair.jpg', alt: 'A room with a yellow armchair and a side table' },
        { src: '/photos/2026/room-armchair-wide.jpg', alt: 'A room with an armchair, mirror and wall-mounted TV' },
        { src: '/photos/2026/room-interior.jpg', alt: 'An interior room with no external window' },
        { src: '/photos/2026/room-interior-wide.jpg', alt: 'A wide view of an interior room' },
        { src: '/photos/2026/room-interior-wardrobe.jpg', alt: 'An interior room with a wardrobe and TV' },
        { src: '/photos/2026/room-interior-twin.jpg', alt: 'An interior room made up with two pillows' },
        { src: '/photos/2026/room-twin-beds.jpg', alt: 'A room laid out with two beds' },
        { src: '/photos/2026/room-twin-wide.jpg', alt: 'A wide view of a twin room' },
        { src: '/photos/2026/room-mirror.jpg', alt: 'A room with a full-height mirror beside the bed' },
        { src: '/photos/2026/room-chair-table.jpg', alt: 'A room with a chair and a round table' },
        { src: '/photos/2026/room-olive.jpg', alt: 'A room made up with olive cushions' },
        { src: '/photos/2026/room-olive-wide.jpg', alt: 'A wide view of a room with olive cushions' },
        { src: '/photos/2026/room-runner.jpg', alt: 'A room with a woven runner across the bed' },
        { src: '/photos/2026/room-runner-wide.jpg', alt: 'A room with a runner, seen from the door' },
      ],
    },
    {
      id: 'bathrooms',
      heading: 'Bathrooms',
      count: '6 photos',
      photos: [
        { src: '/photos/2026/bathroom.jpg', alt: 'An attached bathroom with a basin and mirror' },
        { src: '/photos/2026/bathroom-lit-mirror.jpg', alt: 'A bathroom with a lit mirror' },
        { src: '/photos/2026/bathroom-shower.jpg', alt: 'A bathroom with a shower area' },
        { src: '/photos/2026/bathroom-marble.jpg', alt: 'A marble-tiled attached bathroom' },
        { src: '/photos/2026/bathroom-heater.jpg', alt: 'A bathroom with a wall-mounted water heater' },
        { src: '/photos/2026/bathroom-dark-tile.jpg', alt: 'A bathroom finished in dark tile' },
      ],
    },
  ],
} as const;
