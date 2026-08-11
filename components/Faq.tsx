import { Plus } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
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
      <JsonLd data={faqJsonLd} />

      <h2 className="mb-3 text-center font-display text-[length:var(--step-section)] font-normal text-ink">
        {faqs.heading}
      </h2>
      <p className="mx-auto mb-9 max-w-[520px] text-center sm:mb-12">{faqs.lead}</p>

      <div className="mx-auto max-w-[820px] border-b border-line">
        {faqs.items.map((item) => (
          <details key={item.q} className="group border-t border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
              <h3 className="m-0 font-display text-[clamp(15px,2.4vw,19px)] font-normal leading-[1.4] text-ink">
                {item.q}
              </h3>
              <Plus
                aria-hidden="true"
                strokeWidth={1.5}
                className="h-5 w-5 flex-none text-clay transition-transform duration-[250ms] group-open:rotate-45"
              />
            </summary>
            <p className="m-0 max-w-[680px] pb-7 text-[length:var(--step-body)]">{item.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
