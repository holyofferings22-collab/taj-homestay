'use client';

import { useEffect, useRef, useState } from 'react';
import { WhatsApp } from '@/components/BrandIcons';
import { contactPage } from '@/content/contact';
import { whatsappLink } from '@/content/site';
import { reportConversion } from '@/lib/conversion';

const labelClass = 'grid gap-2 text-[11px] uppercase tracking-[0.22em] text-slate';
/* 16px on phones so iOS does not zoom on focus; see BookingBar. */
const fieldClass =
  'min-h-[48px] w-full rounded-[6px] border border-hairline bg-white px-3.5 py-3 font-body text-base text-ink outline-none transition-colors focus:border-gold';

function isoDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function longDate(value: string) {
  if (!value) return 'not chosen';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Enquiry form. It composes the guest's details into a WhatsApp message to
 * the desk, which is the real booking channel; there is no inbox behind a
 * web form here. Field names are unchanged from the previous form so nothing
 * downstream that keyed on them breaks. The chat opens in a new tab; a
 * blocked popup cannot be detected, so a fallback link appears as well.
 */
export function ContactForm() {
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);
  const [chatUrl, setChatUrl] = useState('');

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (checkInRef.current && !checkInRef.current.value) checkInRef.current.value = isoDate(today);
    if (checkOutRef.current && !checkOutRef.current.value)
      checkOutRef.current.value = isoDate(tomorrow);
  }, []);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const reach = String(data.get('contact') ?? '').trim();
    const notes = String(data.get('notes') ?? '').trim();

    const lines = [
      'Hello Taj Home Stay, I would like to enquire about a stay.',
      '',
      `Check-in: ${longDate(String(data.get('checkIn') ?? ''))}`,
      `Check-out: ${longDate(String(data.get('checkOut') ?? ''))}`,
      `Party: ${data.get('guests')}`,
    ];
    if (name) lines.push(`Name: ${name}`);
    if (reach) lines.push(`Reach me on: ${reach}`);
    if (notes) lines.push('', notes);
    const message = lines.join('\n');

    const url = whatsappLink(message);
    setChatUrl(url);
    reportConversion();
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <form onSubmit={onSubmit} className="grid max-w-[520px] gap-4">
      <label className={labelClass}>
        Name
        <input type="text" name="name" autoComplete="name" className={fieldClass} />
      </label>
      <label className={labelClass}>
        Phone or email
        <input type="text" name="contact" autoComplete="tel" className={fieldClass} />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Check-in
          <input ref={checkInRef} type="date" name="checkIn" className={fieldClass} />
        </label>
        <label className={labelClass}>
          Check-out
          <input ref={checkOutRef} type="date" name="checkOut" className={fieldClass} />
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
        <textarea name="notes" rows={2} className={`${fieldClass} resize-y`} />
      </label>

      <div className="grid gap-3">
        <button type="submit" className="pill pill-ink justify-self-start">
          <WhatsApp className="h-4 w-4" />
          Book now
        </button>
        {chatUrl && (
          <p role="status" className="m-0 text-[13px] leading-[1.6] text-slate">
            Opening WhatsApp with your enquiry. Nothing happened?{' '}
            <a
              href={chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline decoration-gold underline-offset-4"
            >
              Open the chat
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
