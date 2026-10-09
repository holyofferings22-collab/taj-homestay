'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Reports a PageView on every client-side route change.
 *
 * Meta's snippet tracks PageView once, when the page first loads. Next.js
 * moves between pages without a reload, so without this a guest who lands on
 * the home page and then opens Rooms and Location would count as one view.
 * The first render is skipped because the inline snippet already counted it.
 */
export function MetaPixelPageViews() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.fbq?.('track', 'PageView');
  }, [pathname]);

  return null;
}
