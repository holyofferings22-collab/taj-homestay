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
} as const;

export const social = {
  /** PLACEHOLDER — replace with the real profile URLs. */
  label: '[ADD SOCIAL LINKS]',
  instagram: '#',
  facebook: '#',
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
