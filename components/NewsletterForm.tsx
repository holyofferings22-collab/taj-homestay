'use client';

import { useState } from 'react';
import { newsletter } from '@/content/site';

const fieldLabel =
  'grid gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted';
/** 16px on phones so iOS does not zoom on focus — see BookingForm. */
const fieldInput =
  'min-h-[44px] border-0 border-b border-line bg-transparent px-0.5 py-[11px] text-base text-ink outline-none sm:text-[length:var(--step-body)]';

/**
 * Placeholder subscribe form: it confirms locally and does not send anywhere,
 * matching the original design's behaviour.
 */
export function NewsletterForm() {
  const [message, setMessage] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setMessage(newsletter.confirmation);
      }}
      className="grid max-w-[320px] gap-3.5"
    >
      <label className={fieldLabel}>
        First name
        <input type="text" name="firstName" className={fieldInput} />
      </label>
      <label className={fieldLabel}>
        Last name
        <input type="text" name="lastName" className={fieldInput} />
      </label>
      <label className={fieldLabel}>
        Email address
        <input type="email" name="email" className={fieldInput} />
      </label>
      <button
        type="submit"
        className="mt-2 flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full border-0 bg-clay p-[15px] text-[length:var(--step-body)] text-white transition-colors duration-[250ms] hover:bg-accent hover:text-ink"
      >
        {newsletter.cta} <span aria-hidden="true">&rarr;</span>
      </button>
      {message && (
        <p role="status" className="m-0 text-[13px] text-clay">
          {message}
        </p>
      )}
    </form>
  );
}
