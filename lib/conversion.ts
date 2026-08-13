/**
 * Google Ads conversion reporting.
 *
 * This property has no booking engine — the desk is the booking channel and
 * WhatsApp is how guests reach it — so the "Purchase" conversion action means
 * a guest opening a chat. Every WhatsApp click on the site reports it, plus
 * the availability form's submit.
 *
 * See docs/superpowers/specs/2026-08-13-google-ads-conversion-tracking-design.md
 */

/**
 * The Google Ads account tag. Exported because `app/layout.tsx` needs it for
 * the loader URL and the `config` call, and a tag ID typed in three places is
 * three chances to typo one of them — the same reasoning that keeps the phone
 * number in `content/site.ts` derived from a single field.
 */
export const GOOGLE_ADS_ID = 'AW-18353920655';

/** The Purchase action's label within that account. */
const CONVERSION_LABEL = 'hwhtCPmHs-AcEI-16q9E';

/**
 * Whether to load the tag at all.
 *
 * Local clicking and preview deployments would otherwise report into the live
 * account and distort cost-per-conversion. `NEXT_PUBLIC_VERCEL_ENV` is set by
 * Vercel; the comparison is written so that an undefined value degrades to the
 * `NODE_ENV` check alone rather than switching tracking off in production.
 */
export const googleAdsEnabled =
  process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_VERCEL_ENV !== 'preview';

/** Where one browser session's conversion ID is kept. */
const SESSION_KEY = 'ths:conversion-session';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * One ID per browser session, minted on first use.
 *
 * Every WhatsApp click counts as a conversion, so a guest who taps the number
 * in the header, then a CTA band, then submits the form would otherwise report
 * three — and Google Ads would put cost-per-conversion at a third of reality
 * and bid up on the fiction. Google collapses conversions sharing a
 * `transaction_id`, so stamping them all with one ID reports the guest once.
 *
 * `sessionStorage` rather than `localStorage`: a guest returning next week is a
 * genuinely new enquiry and should count again.
 *
 * Returns undefined rather than throwing where storage is unavailable — Safari
 * private mode and some in-app webviews block it — which costs deduplication
 * but never the conversion itself.
 */
function sessionId(): string | undefined {
  try {
    const existing = sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;

    /* randomUUID is undefined outside a secure context. The tag only loads on
       the production origin, which is https, but the fallback costs one line
       and keeps this function total. */
    const minted =
      globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    sessionStorage.setItem(SESSION_KEY, minted);
    return minted;
  } catch {
    return undefined;
  }
}

/**
 * Reports one conversion.
 *
 * Deliberately fire-and-forget. Google's snippet ships an `event_callback` that
 * sets `window.location`, which exists to stop a same-tab navigation from
 * cancelling the beacon in flight — but nothing here navigates the current tab.
 * The form calls `window.open` and every WhatsApp link is `target="_blank"`, so
 * the page never unloads and there is nothing to wait for. Worse, that callback
 * would drag a guest off the page they were reading if a popup blocker ate the
 * `window.open`.
 *
 * No-ops when `gtag` is absent: development, ad blockers, and the moment before
 * the tag has run. A guest who clicks fast should not meet an exception.
 */
export function reportConversion(): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABEL}`,
    transaction_id: sessionId() ?? '',
  });
}
