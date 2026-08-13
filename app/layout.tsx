import type { Metadata } from 'next';
import { Prata, Jost } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { JsonLd } from '@/components/JsonLd';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { WhatsAppConversions } from '@/components/WhatsAppConversions';
import { GOOGLE_ADS_ID, googleAdsEnabled } from '@/lib/conversion';
import { brand, contact } from '@/content/site';
import './globals.css';

const prata = Prata({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-prata',
  display: 'swap',
});

/**
 * 600 is here for the contact details in the header, which are set bold.
 * Without it the browser synthesises the weight by smearing the 500, which on
 * a phone number reads as a blurred 500 rather than as bold.
 */
const jost = Jost({
  weight: ['300', '400', '500', '600'],
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
  /**
   * Root-relative on purpose: the site has no production domain configured yet,
   * and a hardcoded guess would be worse than a relative path — consumers
   * resolve these against the page URL. Make them absolute once the domain is
   * known and `metadataBase` is set.
   */
  logo: brand.logo.src,
  image: brand.logo.src,
  currenciesAccepted: 'INR',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${prata.variable} ${jost.variable}`}>
      {/* Browser extensions write their own attributes onto <body> before React
          hydrates — ColorZilla adds `cz-shortcut-listen`, Grammarly and several
          password managers do the same — and React reports the difference as a
          hydration mismatch the app cannot fix, because the markup it shipped
          was correct. This suppresses that report for this element only: it is
          one level deep, so a genuine mismatch inside any component below still
          surfaces normally. <body> sets no attributes of its own here, so there
          is nothing real being hidden. */}
      <body suppressHydrationWarning>
        <JsonLd data={hotelJsonLd} />
        <SiteHeader />
        <main aria-label={brand.name}>{children}</main>
        <SiteFooter />
        {/* Vercel Analytics. Injects its script at the end of the body and
            renders nothing, so it stays out of the layout above it. It is
            inert off Vercel — no endpoint to report to — which is why there
            is no dev-only guard around it. */}
        <Analytics />

        {/* Google Ads conversion tracking. Unlike Analytics above, this one
            does need the guard: it reports into a live ad account, so a
            developer clicking through the site would otherwise spend the
            property's optimisation signal on themselves.

            `afterInteractive` is the next/script default and the right one
            here — conversion tracking must never sit in front of first paint.
            No onLoad/onReady/onError handler is used, which is what would
            force this layout to become a client component. The inline tag
            carries an id because next/script needs one to track it.

            The inline script defines `gtag` synchronously and queues into
            dataLayer, so a conversion fired before gtag.js has finished
            downloading is held and sent rather than dropped. */}
        {googleAdsEnabled && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-ads-tag" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
            </Script>
            <WhatsAppConversions />
          </>
        )}
      </body>
    </html>
  );
}
