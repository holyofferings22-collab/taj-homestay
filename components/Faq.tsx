import { Plus } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { faqs } from '@/content/home';

/**
 * FAQ accordion on native <details>/<summary>: a server component with no
 * hydration cost, and the browser supplies the toggle, keyboard support and
 * screen-reader semantics. Also emits schema.org FAQPage markup so the
 * questions are eligible for Google rich results.
 */
export function Faq() {
  /* A guard, not an active filter: a bracketed note would still render on
     the page but must never reach Google as a rich result. */
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
      <div className="grid gap-3">
        <h2 id="faq-heading" data-rv="" className="text-[length:var(--step-section)] leading-[1.06]">
          {faqs.heading}
        </h2>
        <p className="lede" data-rv="">
          {faqs.lead}
        </p>
      </div>
      <div data-rv="" className="max-w-[820px] border-b border-hairline">
        {faqs.items.map((item) => (
          <details key={item.q} className="group border-t border-hairline">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 transition-[padding] duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:pl-2 [&::-webkit-details-marker]:hidden">
              <h3 className="text-[clamp(18px,1.6vw,22px)] font-medium leading-[1.35]">{item.q}</h3>
              <Plus
                aria-hidden="true"
                strokeWidth={1.25}
                className="h-5 w-5 flex-none text-gold-deep transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-open:rotate-45"
              />
            </summary>
            <p className="m-0 max-w-[64ch] pb-6 text-[15px] leading-[1.7] text-stone">{item.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
