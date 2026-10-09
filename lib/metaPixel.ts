/**
 * Meta (Facebook / Instagram) Pixel.
 *
 * Counts page views so Meta ads can measure visits and build audiences. Loaded
 * under the same production-only guard as the Google Ads tag, so local clicking
 * and preview deployments never report into the live ad account.
 */
export { googleAdsEnabled as metaPixelEnabled } from '@/lib/conversion';

/** The pixel from the Meta Events Manager. Public by design: it ships in the page. */
export const META_PIXEL_ID = '1418836603063291';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
