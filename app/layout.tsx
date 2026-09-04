import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { JsonLd } from '@/components/JsonLd';
import { SiteHeader } from '@/components/SiteHeader';
import { SnapShell } from '@/components/SnapShell';
import { SupportChat } from '@/components/SupportChat';
import { WhatsAppConversions } from '@/components/WhatsAppConversions';
import { GOOGLE_ADS_ID, googleAdsEnabled } from '@/lib/conversion';
import { brand, contact } from '@/content/site';
import './globals.css';

/**
 * Cormorant Garamond carries every headline; the italic is what emphasis
 * looks like inside one (never a second family). Manrope is body and UI.
 * Both subset to latin and swap in, so text paints before the files land.
 */
const cormorant = Cormorant_Garamond({
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  /* latin-ext carries the rupee sign the rates are set in. */
  subsets: ['latin', 'latin-ext'],
  variable: '--font-cormorant',
  display: 'swap',
});

const manrope = Manrope({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Taj Home Stay, Dwarka: a quiet address beside Yashobhoomi',
    template: '%s | Taj Home Stay, Dwarka',
  },
  description:
    'Twenty rooms in Sector 26 Dwarka, New Delhi, five hundred metres from Yashobhoomi (IICC), a short walk from the Airport Express. A desk that answers at any hour.',
};

/** schema.org Hotel data, carried over from the original Home page head. */
const hotelJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: 'Taj Home Stay, Dwarka',
  description:
    'Twenty-room guest house beside Yashobhoomi (IICC) in Sector 26 Dwarka, New Delhi.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: contact.address.streetAddress,
    addressLocality: contact.address.locality,
    postalCode: contact.address.postalCode,
    addressCountry: contact.address.country,
  },
  telephone: contact.phone.dial,
  /**
   * Root-relative on purpose: the site has no production domain configured
   * yet, and a hardcoded guess would be worse than a relative path. Make
   * these absolute once the domain is known and `metadataBase` is set.
   */
  logo: brand.logo.src,
  image: brand.logo.src,
  currenciesAccepted: 'INR',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      {/* Browser extensions write their own attributes onto <body> before
          React hydrates and React reports the difference as a hydration
          mismatch the app cannot fix. Suppressed for this element only. */}
      <body suppressHydrationWarning>
        <JsonLd data={hotelJsonLd} />
        <SiteHeader />
        {/* The document does not scroll. SnapShell is the one scroll
            container; every page renders its screens inside it, and the
            shared contact screen at the end of each page is the footer. */}
        <SnapShell>{children}</SnapShell>
        {/* Live support. It is a front door onto the desk's WhatsApp, which
            is staffed around the clock; see components/SupportChat.tsx. */}
        <SupportChat />
        {/* Vercel Analytics: inert off Vercel, so no dev-only guard. */}
        <Analytics />

        {/* Google Ads conversion tracking. Guarded: it reports into a live ad
            account. `afterInteractive` keeps it off the critical path. The
            inline tag defines `gtag` synchronously and queues into dataLayer,
            so a conversion fired before gtag.js has loaded is held, not
            dropped. */}
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
