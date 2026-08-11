export const contactPage = {
  eyebrow: 'Taj Home Stay, Dwarka',
  heading: 'Contact & booking',
  lead:
    'The desk answers all day and all night. WhatsApp is quickest, especially during Yashobhoomi ' +
    'event weeks.',
  formHeading: 'Send an enquiry',
  defaultCheckIn: '2026-08-14',
  defaultCheckOut: '2026-08-16',
  partyOptions: ['1 room, 1 adult', '1 room, 2 adults', '2 rooms, 4 adults', 'Group booking'],
  reachHeading: 'Reach us',
  whatsappCta: 'Message the desk',
  /**
   * TODO: no OTA profile links yet (MakeMyTrip, Goibibo, Booking.com). The
   * line that advertised them has been removed rather than left empty — add a
   * `bookingSites` field and render it once the real URLs exist.
   */
  directNote: 'Booking direct gets you our best rate, and the desk can hold rooms a site cannot.',
} as const;
