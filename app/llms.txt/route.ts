import { brand, contact, nav, social, siteUrl } from '@/content/site';
import { statement, amenities, faqs } from '@/content/home';
import { about } from '@/content/about';
import { rooms } from '@/content/rooms';
import { groupStays } from '@/content/group-stays';
import { location } from '@/content/location';
import { gallery } from '@/content/gallery';
import { contactPage } from '@/content/contact';
import { journalIndex, posts } from '@/content/blog';
import { guidesIndex, guides } from '@/content/guides';
import { reviews } from '@/content/reviews';

export const dynamic = 'force-static';

/**
 * Serves /llms.txt: the site in plain Markdown for language-model crawlers,
 * in the llmstxt.org shape. Every line is read from the same content modules
 * the pages render from, so an answer engine that quotes this file quotes
 * the site, and nothing here can drift from what a guest reads.
 */
const pageLeads: Record<string, string> = {
  '/': statement.body,
  '/about': about.lead,
  '/rooms': rooms.lead,
  '/group-stays': groupStays.lead,
  '/location': location.lead,
  '/gallery': gallery.lead,
  '/blog': journalIndex.lead,
  '/contact': contactPage.lead,
  '/guides': guidesIndex.lead,
};

function build() {
  const lines: string[] = [];
  lines.push(`# ${brand.name}, ${brand.locality}`, '', `> ${statement.body}`, '');
  lines.push(...about.paragraphs, '');

  lines.push('## Facts', '');
  lines.push(`- Address: ${contact.address.lines.join(' ')}`);
  lines.push(`- Phone and WhatsApp: ${contact.phone.display}`);
  lines.push(`- Email: ${contact.email}`);
  lines.push(`- ${contact.frontDesk}`);
  lines.push(`- Check-in from ${contact.checkIn}, check-out by ${contact.checkOut}`);
  lines.push('- Twenty rooms in three categories, every one air-conditioned with an attached bathroom and a TV');
  for (const room of rooms.categories) {
    lines.push(`- ${room.name}: ₹${room.rate} per room per night. ${room.summary}`);
  }
  lines.push(`- ${rooms.rateNote}`);
  for (const row of location.distances) lines.push(`- ${row.place}: ${row.value}`);
  lines.push(`- Google listing: ${reviews.listing}`);
  if (social.facebook) lines.push(`- Facebook: ${social.facebook}`);
  lines.push(`- Website: ${siteUrl}`, '');

  lines.push('## What comes with the room', '');
  for (const item of amenities) lines.push(`- ${item.title}: ${item.body}`);
  lines.push('');

  lines.push('## Questions guests ask', '');
  for (const item of faqs.items) lines.push(`- ${item.q} ${item.a}`);
  lines.push('');

  lines.push('## Pages', '');
  for (const item of [...nav, { href: '/guides', label: 'Guides' }]) {
    lines.push(`- [${item.label}](${siteUrl}${item.href}): ${pageLeads[item.href]}`);
  }
  lines.push('');

  lines.push('## Guides', '');
  for (const guide of guides) lines.push(`- [${guide.title}](${siteUrl}/guides/${guide.slug}): ${guide.lead}`);
  lines.push('');

  lines.push('## Journal', '');
  for (const post of posts) lines.push(`- [${post.title}](${siteUrl}/blog/${post.slug}): ${post.lead}`);

  return lines.join('\n') + '\n';
}

export function GET() {
  return new Response(build(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
