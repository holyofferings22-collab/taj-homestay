import Link from 'next/link';
import { WhatsApp } from '@/components/BrandIcons';
import { contact } from '@/content/site';

/**
 * Sand call-to-action band: heading + copy on the left, call/enquire on the right.
 *
 * The buttons go full width below 640px. "WhatsApp +91 98105 63059" needs about
 * 300px with its padding, more than a 375px phone leaves inside a padded card,
 * so at its natural width the label wrapped inside the pill. Full width is also
 * the honest read of what these are on a phone: the two things to do here.
 */
export function CtaBand({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-7 rounded-2xl bg-sand px-6 py-8 sm:gap-8 sm:px-10 sm:py-11">
      <div className="min-w-0 flex-[1_1_320px]">
        <h2 className="m-0 mb-2.5 font-display text-[clamp(23px,5vw,28px)] font-normal text-ink">
          {heading}
        </h2>
        <p className="m-0 max-w-[460px]">{body}</p>
      </div>
      <div className="flex w-full flex-wrap gap-3 sm:w-auto">
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-clay px-7 py-4 text-[length:var(--step-body)] text-white hover:text-white sm:w-auto"
        >
          <WhatsApp className="h-[17px] w-[17px]" />
          WhatsApp {contact.phone.display}
        </a>
        <Link
          href="/contact"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border border-line bg-white px-[26px] py-4 text-[length:var(--step-body)] text-ink hover:border-accent sm:w-auto"
        >
          Send an enquiry <span aria-hidden="true" className="text-clay">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
