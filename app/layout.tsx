import type { Metadata } from 'next';
import { Prata, Jost } from 'next/font/google';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { brand, contact } from '@/content/site';
import './globals.css';

const prata = Prata({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-prata',
  display: 'swap',
});

const jost = Jost({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Taj Home Stay, Dwarka — Guest house beside Yashobhoomi',
    template: '%s — Taj Home Stay, Dwarka',
  },
  description:
    'Budget-premium guest house beside Yashobhoomi (IICC) in Sector 26 Dwarka, New Delhi.',
};

/** schema.org Hotel data, carried over from the original Home page head. */
const hotelJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: 'Taj Home Stay, Dwarka',
  description:
    'Budget-premium guest house beside Yashobhoomi (IICC) in Sector 26 Dwarka, New Delhi.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: contact.address.streetAddress,
    addressLocality: contact.address.locality,
    postalCode: contact.address.postalCode,
    addressCountry: contact.address.country,
  },
  telephone: contact.phone.dial,
  currenciesAccepted: 'INR',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${prata.variable} ${jost.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd) }}
        />
        <SiteHeader />
        <main aria-label={brand.name}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
