/**
 * Single source of truth for site-wide content.
 *
 * Values marked PLACEHOLDER are carried over verbatim from the original
 * design and are intended to be filled in. They render exactly as they did
 * before, so the site is unchanged until you edit them here.
 */

export const brand = {
  name: 'Taj Home Stay',
  locality: 'Dwarka',
  monogram: 'T',
  blurb:
    'A 20-key guest house in Sector 26 Dwarka, a short walk from Yashobhoomi and the Airport Express line.',
} as const;

export const contact = {
  email: 'tajhomestaydelhi@gmail.com',
  phone: {
    display: '+91 98105 63059',
    dial: '+919810563059',
  },
  address: {
    lines: ['KH No. 483, VPO Bharthal Village,', 'Sector 26 Dwarka, New Delhi 110077'],
    streetAddress: 'KH No. 483, VPO Bharthal Village, Sector 26 Dwarka',
    locality: 'New Delhi',
    postalCode: '110077',
    country: 'IN',
  },
  frontDesk: 'Front desk staffed 24×7',
  /**
   * Google's own embed for our listing, pinned by feature ID
   * (0x390d1bda71bbf22f:0x7805e65827137003) rather than by a text search.
   *
   * The feature ID is exact. Every looser way of pointing at this place gets
   * it wrong: searching "Bharthal Village…" pins the whole village, and the
   * bare coordinate reverse-geocodes to a car-service garage sharing plot
   * KH No. 483.
   *
   * The `pb=` payload is opaque on purpose — do not hand-edit it. To change
   * the pin, zoom or map type, regenerate it: open the listing on Google Maps
   * → Share → Embed a map → copy the `src` out of the iframe.
   */
  mapEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.7908006533285' +
    '!2d77.04409201183542!3d28.546007087901977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768' +
    '!4f13.1!3m3!1m2!1s0x390d1bda71bbf22f%3A0x7805e65827137003' +
    '!2sTAJ%20HOME%20STAY%20DWARKA!5e0!3m2!1sen!2sin!4v1786275474017!5m2!1sen!2sin',

  /**
   * Searchable form of the same place, for directions.
   *
   * The embed above cannot express a route, and the directions endpoint takes
   * a query rather than a feature ID — so this string stays. It resolves to
   * the same listing and labels the pin "TAJ HOME STAY DWARKA".
   */
  mapQuery: 'Taj Home Stay, Bharthal, Sector 26 Dwarka, New Delhi 110077',
} as const;

/**
 * Social profiles.
 *
 * A profile with no URL yet is `null`, not '#'. The header and footer skip
 * null entries entirely rather than rendering an icon that looks clickable and
 * goes nowhere. Add the URL here and the icon appears on both.
 */
export const social = {
  /** Shown only while a profile is still missing — a prompt, not a caption. */
  placeholderLabel: '[ADD SOCIAL LINKS]',
  instagram: null as string | null,
  facebook: 'https://www.facebook.com/profile.php?id=61592809888082' as string | null,
} as const;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/group-stays', label: 'Group Stays' },
  { href: '/location', label: 'Location' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
] as const;

/** Footer link columns, split exactly as the original footer splits them. */
export const footerNav = [
  nav.slice(0, 4),
  nav.slice(4),
] as const;

export const newsletter = {
  heading: 'Join Our Newsletter',
  blurb: 'Occasional notes on rates around convention dates.',
  cta: 'Subscribe',
  confirmation: 'Thanks — we will only write around convention dates.',
} as const;

export const copyright = '© 2026 Taj Home Stay, Dwarka. All rights reserved.';
