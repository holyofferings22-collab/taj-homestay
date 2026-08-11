'use client';

import { useState } from 'react';
import { contactPage } from '@/content/contact';
import { contact } from '@/content/site';

const labelClass =
  'grid gap-1.5 text-[11px] uppercase tracking-[0.12em] text-muted';
/** 16px on phones so iOS does not zoom on focus — see BookingForm. */
const fieldClass =
  'min-h-[46px] rounded-lg border border-line bg-white px-3 py-[13px] text-base text-ink outline-none sm:text-[length:var(--step-body)]';

function formatDate(value: string) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

/**
 * Enquiry form. Confirms in-page and does not deliver anywhere yet, so the
 * confirmation says so plainly and points at the phone and email instead.
 */
export function ContactForm() {
  const [message, setMessage] = useState('');

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const checkIn = formatDate(String(data.get('checkIn') ?? ''));
    const checkOut = formatDate(String(data.get('checkOut') ?? ''));

    setMessage(
      `Noted: ${data.get('guests')}, ${checkIn} to ${checkOut}. This form does not send yet — ` +
        `please email ${contact.email} or call ${contact.phone.display} and we will confirm.`,
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-[460px] gap-[18px]">
      <label className={labelClass}>
        Name
        <input type="text" name="name" className={fieldClass} />
      </label>
      <label className={labelClass}>
        Phone or email
        <input type="text" name="contact" className={fieldClass} />
      </label>

      <div className="flex flex-wrap gap-[18px]">
        <label className={`${labelClass} flex-[1_1_160px]`}>
          Check-in
          <input
            type="date"
            name="checkIn"
            defaultValue={contactPage.defaultCheckIn}
            className={fieldClass}
          />
        </label>
        <label className={`${labelClass} flex-[1_1_160px]`}>
          Check-out
          <input
            type="date"
            name="checkOut"
            defaultValue={contactPage.defaultCheckOut}
            className={fieldClass}
          />
        </label>
      </div>

      <label className={labelClass}>
        Guests and rooms
        <select name="guests" className={fieldClass} defaultValue={contactPage.partyOptions[0]}>
          {contactPage.partyOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label className={labelClass}>
        Anything we should know
        <textarea name="notes" rows={4} className={`${fieldClass} resize-y`} />
      </label>

      <button
        type="submit"
        className="flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full border-0 bg-clay p-4 text-[length:var(--step-body)] text-white transition-colors duration-[250ms] hover:bg-accent hover:text-ink"
      >
        Send enquiry <span aria-hidden="true">&rarr;</span>
      </button>

      {message && (
        <p role="status" className="m-0 rounded-[10px] bg-sand px-4 py-3.5 text-sm text-ink">
          {message}
        </p>
      )}
    </form>
  );
}
