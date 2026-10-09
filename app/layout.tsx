import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { JsonLd } from '@/components/JsonLd';
import { SiteHeader } from '@/components/SiteHeader';
import { PageShell } from '@/components/PageShell';
import { SupportChat } from '@/components/SupportChat';
import { WhatsAppConversions } from '@/components/WhatsAppConversions';
import { MetaPixelPageViews } from '@/components/MetaPixelPageViews';
import { GOOGLE_ADS_ID, googleAdsEnabled } from '@/lib/conversion';
import { META_PIXEL_ID, metaPixelEnabled } from '@/lib/metaPixel';
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
      {/* Meta Pixel: Meta's own snippet, unchanged apart from reading the ID
          from lib/metaPixel.ts, written straight into <head> as Meta's install
          guide asks so it runs before anything else and a visitor who leaves
          early is still counted. It loads fbevents.js async, so it does not
          hold up the page. Same production-only guard as the Google Ads tag.
          A plain <script> rather than next/script: the App Router injects
          even `beforeInteractive` scripts from <body>. */}
      {metaPixelEnabled && (
        <head>
          <script
            id="meta-pixel"
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`,
            }}
          />
        </head>
      )}
      {/* Browser extensions write their own attributes onto <body> before
          React hydrates and React reports the difference as a hydration
          mismatch the app cannot fix. Suppressed for this element only. */}
      <body suppressHydrationWarning>
        <JsonLd data={hotelJsonLd} />
        <SiteHeader />
        {/* The document scrolls normally. PageShell wraps the page in
            <main>, reveals sections as they arrive and repaints the header
            for whatever is under it; the shared contact section at the end of
            each page is the footer. */}
        <PageShell>{children}</PageShell>
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

        {/* Meta Pixel, part two: the noscript image counts visitors with
            JavaScript off. It stays in <body> because an <img> is not valid
            inside <head>; the script half is in <head> above. */}
        {metaPixelEnabled && (
          <>
            <noscript>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                alt=""
                src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
            <MetaPixelPageViews />
          </>
        )}
      </body>
    </html>
  );
}
