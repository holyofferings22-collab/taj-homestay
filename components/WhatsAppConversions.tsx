'use client';

import { useEffect } from 'react';
import { reportConversion } from '@/lib/conversion';

/**
 * Reports a conversion for every WhatsApp click on the site.
 *
 * Renders nothing, and is mounted once in the root layout.
 *
 * One delegated listener rather than an `onClick` on each link. There are ten
 * `wa.me` links across the header, the footer, the CTA band and four pages,
 * and five of the files that render them are server components — giving them
 * a handler would mean `'use client'` on all five purely to carry it. This
 * also catches the "Open the chat" fallback inside `BookingBar`, which only
 * exists after a submit, and any link added later. `content/site.ts` already
 * treats `whatsappLink()` as the one place a chat URL is built; this is the
 * same idea for the click.
 *
 * Matching on `href` is deliberate. It is the thing that makes a link a
 * WhatsApp link, so it cannot fall out of sync the way a marker class or a
 * data attribute someone forgets to add would.
 */
export function WhatsAppConversions() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      /* Clicks usually land on the WhatsApp icon inside the link rather than
         the anchor itself, so walk up. `closest` lives on Element, which
         covers the SVG icons as well as the text. */
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest('a[href^="https://wa.me/"]')) return;

      reportConversion();
    }

    /* Capture phase, so a handler further down that stops propagation cannot
       cost a conversion. The trade is that `defaultPrevented` is not yet
       meaningful this early — no handler on this site prevents a WhatsApp
       link, and missing a real conversion is the worse failure. */
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
