import { Plus } from 'lucide-react';
import { faqs } from '@/content/home';

/**
 * Home page FAQ accordion.
 *
 * Built on native <details>/<summary> rather than a useState accordion. That
 * keeps this a server component — no hydration cost on a page that otherwise
 * prerenders completely — and browsers give us the open/close toggle, keyboard
 * support and correct screen-reader semantics for free.
 *
 * Also emits schema.org FAQPage markup so the questions are eligible for
 * Google rich results, alongside the Hotel data in the root layout.
 */
export function Faq() {
  /**
   * A guard, not an active filter: every answer is finished today, so all of
   * them publish. If an unfinished one is ever added, a bracketed note would
   * still render on the page but must never reach Google — a placeholder in a
   * rich result is worse than no rich result.
   */
  const publishable = faqs.items.filter((item) => !item.a.includes('['));

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: publishable.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <h2 className="mb-3 text-center font-display text-[clamp(28px,3.4vw,42px)] font-normal text-ink">
        {faqs.heading}
      </h2>
      <p className="mx-auto mb-12 max-w-[520px] text-center">{faqs.lead}</p>

      <div className="mx-auto max-w-[820px] border-b border-line">
        {faqs.items.map((item) => (
          <details key={item.q} className="group border-t border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
              <h3 className="m-0 font-display text-[19px] font-normal leading-[1.4] text-ink">
                {item.q}
              </h3>
              <Plus
                aria-hidden="true"
                strokeWidth={1.5}
                className="h-5 w-5 flex-none text-clay transition-transform duration-[250ms] group-open:rotate-45"
              />
            </summary>
            <p className="m-0 max-w-[680px] pb-7 text-[15px]">{item.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
