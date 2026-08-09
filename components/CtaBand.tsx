import Link from 'next/link';
import { contact } from '@/content/site';

/** Sand call-to-action band: heading + copy on the left, call/enquire on the right. */
export function CtaBand({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-8 rounded-2xl bg-sand px-10 py-11">
      <div className="min-w-0 flex-[1_1_320px]">
        <h2 className="m-0 mb-2.5 font-display text-[28px] font-normal text-ink">{heading}</h2>
        <p className="m-0 max-w-[460px]">{body}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <a
          href={`tel:${contact.phone.dial}`}
          className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-clay px-7 py-4 text-[15px] text-white hover:text-white"
        >
          Call {contact.phone.display}
        </a>
        <Link
          href="/contact"
          className="inline-flex min-h-12 items-center gap-2.5 rounded-full border border-line bg-white px-[26px] py-4 text-[15px] text-ink hover:border-accent"
        >
          Send an enquiry <span aria-hidden="true" className="text-clay">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
