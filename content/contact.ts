export const contactPage = {
  eyebrow: 'Contact',
  heading: 'Reach us,',
  headingEmphasis: 'any hour.',
  lead:
    'The desk answers all day and all night. WhatsApp is quickest, especially during Yashobhoomi ' +
    'event weeks.',
  heroImage: {
    src: '/photos/IMG_0016.jpg',
    alt: 'A room at Taj Home Stay at dusk, curtains drawn back',
  },
  formHeading: 'Send an enquiry',
  formLead: 'Tell us your dates and party and the desk replies on WhatsApp with what it can hold.',
  partyOptions: ['1 room, 1 adult', '1 room, 2 adults', '2 rooms, 4 adults', 'Group booking'],
  reachHeading: 'Reach us',
  /**
   * TODO: no OTA profile links yet (MakeMyTrip, Goibibo, Booking.com). The
   * line that advertised them has been removed rather than left empty — add a
   * `bookingSites` field and render it once the real URLs exist.
   */
  directNote: 'Booking direct means you deal with the desk, which can hold rooms a site cannot.',
} as const;
