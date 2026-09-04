/**
 * Single source of truth for site-wide content.
 *
 * Nothing here is a placeholder — every value renders as finished copy. Where
 * a real-world detail is still unknown (a second social profile, an online
 * booking URL), the site omits it rather than showing a gap, and the note is
 * kept in a comment beside the field so it is not forgotten.
 */

export const brand = {
  name: 'Taj Home Stay',
  locality: 'Dwarka',
  /**
   * The property's own logo. Intrinsic pixel size is recorded here so
   * next/image can reserve the right box and never shift the header on load.
   * The artwork already reads "TAJ HOME STAY", so the lockup that renders it
   * (`SiteHeader`) sets it as the accessible name and does not repeat the name
   * in text beside it.
   */
  logo: {
    src: '/photos/LOGO-hires.png',
    width: 600,
    height: 334,
  },
  blurb:
    'A 20-room guest house in Sector 26 Dwarka, a short walk from Yashobhoomi and the Airport Express line.',
} as const;

const phone = {
  display: '+91 98105 63059',
  dial: '+919810563059',
} as const;

/**
 * wa.me wants bare digits in full international form — no '+', spaces or
 * dashes — so the number is stripped out of `phone.dial` rather than typed a
 * second time. One number, one place: change `phone.dial` above and every
 * WhatsApp link on the site follows.
 */
const whatsappNumber = phone.dial.replace(/\D/g, '');

/**
 * Builds a click-to-chat URL for the property's number, with `message`
 * pre-filled into the guest's composer. Guests can edit or delete it before
 * sending — it is a starting line, not a locked message.
 *
 * The origin and the number are fixed here and only the message varies, so a
 * caller can never redirect this somewhere else: `encodeURIComponent` percent-
 * encodes `&`, `#` and `?`, which keeps caller text inside the `text` parameter
 * instead of letting it append parameters or a fragment of its own. Callers
 * pass plain text and nothing else — never a URL, and never anything they want
 * treated as markup.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const contact = {
  email: 'tajhomestaydelhi@gmail.com',
  phone,
  /** The generic click-to-chat link, used by every plain phone-number link. */
  whatsapp: whatsappLink('Hello Taj Home Stay, I would like to check availability for my dates.'),
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
 *
 * WhatsApp is listed first because it is the desk's fastest channel, and it is
 * never null — it is the property's own phone number, so it exists as long as
 * the number does.
 */
export const social = {
  whatsapp: contact.whatsapp as string | null,
  /** TODO: no Instagram profile yet. Its icon is hidden until a URL lands here. */
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
  { href: '/blog', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
] as const;

export const copyright = '© 2026 Taj Home Stay, Dwarka. All rights reserved.';
