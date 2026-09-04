export const gallery = {
  eyebrow: 'Gallery',
  heading: 'Every room,',
  headingEmphasis: 'as it is.',
  lead:
    'Every room, bathroom and balcony photographed as it is. No staging, no stock. ' +
    'Tap any photo to view it full size.',
  heroImage: {
    src: '/photos/IMG_9976.jpg',
    alt: 'A room at Taj Home Stay with a marble floor and recessed ceiling lighting',
  },
  /**
   * Sections are titled by what is visible in the frame, not by the sold
   * category: the photographs were not shot per category, and a balcony shown
   * under "Deluxe" (a room sold as having no window) would promise the wrong
   * room. Rooms with a balcony or window come first because they sell best.
   */
  sections: [
    {
      id: 'rooms-with-a-view',
      heading: 'Rooms with a balcony or window',
      count: '8 photos',
      photos: [
        { src: '/photos/IMG_9991.jpg', alt: 'A room with balcony and open city view' },
        { src: '/photos/IMG_9993.jpg', alt: 'A room with daylight from the balcony door' },
        { src: '/photos/IMG_0016.jpg', alt: 'A room at dusk with curtains drawn back' },
        { src: '/photos/IMG_0018.jpg', alt: 'Full length view of a deluxe room' },
        { src: '/photos/IMG_0020.jpg', alt: 'A room with seating by the window' },
        { src: '/photos/IMG_9988.jpg', alt: 'A room with window and tufted headboard' },
        { src: '/photos/IMG_9986.jpg', alt: 'A room with daylight from the window' },
        { src: '/photos/IMG_9987.jpg', alt: 'A room, wide view from the doorway' },
      ],
    },
    {
      id: 'rooms',
      heading: 'Rooms',
      count: '18 photos',
      photos: [
        { src: '/photos/IMG_9977.jpg', alt: 'King bed with runner, framed art and wall-mounted TV' },
        { src: '/photos/IMG_9976.jpg', alt: 'A room, marble floor and recessed ceiling lighting' },
        { src: '/photos/IMG_0017.jpg', alt: 'A room seen from the entrance' },
        { src: '/photos/IMG_9995.jpg', alt: 'A room with writing desk and armchair' },
        { src: '/photos/IMG_0001.jpg', alt: 'A room with sofa, coffee table and wardrobe' },
        { src: '/photos/IMG_9978.jpg', alt: 'Bed made up with fresh linen and folded towels' },
        { src: '/photos/IMG_9994.jpg', alt: 'Armchair, side table and wardrobe in a room' },
        { src: '/photos/IMG_9996.jpg', alt: 'A room with maroon bed runner and framed art' },
        { src: '/photos/IMG_9983.jpg', alt: 'A room with mirror and luggage space' },
        { src: '/photos/IMG_9984.jpg', alt: 'A room with mustard feature wall and king bed' },
        { src: '/photos/IMG_0004.jpg', alt: 'A room with air conditioning and armchair' },
        { src: '/photos/IMG_0013.jpg', alt: 'A room with wardrobe and dressing mirror' },
        { src: '/photos/IMG_0012.jpg', alt: 'A room with bedside table and landscape art' },
        { src: '/photos/IMG_0005.jpg', alt: 'A room with teal cushions and marble floor' },
        { src: '/photos/IMG_0009.jpg', alt: 'A room with wardrobe, TV and mirror' },
        { src: '/photos/IMG_0014.jpg', alt: 'A room with armchair and framed painting' },
        { src: '/photos/IMG_0006.jpg', alt: 'A room with folded towels on the bed' },
        { src: '/photos/IMG_0015.jpg', alt: 'A room with wooden headboard and side chair' },
      ],
    },
    {
      id: 'bathrooms',
      heading: 'Bathrooms',
      count: '5 photos',
      photos: [
        { src: '/photos/IMG_0007.jpg', alt: 'A room with attached bathroom door open' },
        { src: '/photos/IMG_9997.jpg', alt: 'Bathroom with glass shower partition and marble tiling' },
        { src: '/photos/IMG_9979.jpg', alt: 'Bathroom with western WC, wall mirror and hand shower' },
        { src: '/photos/IMG_9998.jpg', alt: 'Bathroom basin with mirror and towel rail' },
        { src: '/photos/IMG_9989.jpg', alt: 'Bathroom with instant geyser for hot water' },
      ],
    },
  ],
} as const;
