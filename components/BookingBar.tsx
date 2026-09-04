'use client';

import { useEffect, useRef, useState } from 'react';
import { WhatsApp } from '@/components/BrandIcons';
import { booking } from '@/content/home';
import { whatsappLink } from '@/content/site';
import { reportConversion } from '@/lib/conversion';

/** `YYYY-MM-DD` in local time, which is what a date input wants. */
function isoDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** "14 Sep 2026": the message lands in a chat the desk reads later, where a
 *  bare "14 Sep" is ambiguous. */
function longDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

const cellBase = 'grid gap-0.5 border-hairline py-2 sm:gap-1 sm:py-3.5';
const label = 'text-[10px] uppercase tracking-[0.22em] text-stone';
/* 16px minimum on phones: below that iOS Safari zooms the page when the
   field takes focus and does not zoom back. */
const field =
  'w-full min-w-0 border-0 bg-transparent p-0 font-display text-[20px] font-medium leading-tight text-espresso outline-none [color-scheme:light]';

/**
 * The booking bar pinned to the foot of the home hero. Hands the guest's
 * dates and party to WhatsApp as a pre-filled message to the desk, which is
 * the real booking channel; there is no engine behind it.
 *
 * Defaults are today and tomorrow, set after mount so the server and the
 * first client paint agree (the server does not know the guest's date).
 * The chat opens in a new tab; a blocked popup cannot be detected, so a
 * visible fallback link appears as well, which is also the keyboard path.
 */
export function BookingBar({ variant = 'panel' }: { variant?: 'panel' | 'hero' } = {}) {
  const hero = variant === 'hero';
  const cell = `${cellBase} ${hero ? 'px-5 sm:px-6' : 'px-4 sm:px-5'}`;
  /* The first cell lines up with the page gutter so the date does not start
     hard against the viewport edge. */
  const firstCell = hero ? 'md:pl-[var(--gutter)]' : '';
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
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
    const checkIn = String(data.get('checkIn') ?? '');
    const checkOut = String(data.get('checkOut') ?? '');

    if (!checkIn || !checkOut) {
      setChatUrl('');
      setError('Please choose your check-in and check-out dates.');
      return;
    }
    /* Both are `YYYY-MM-DD`, so string order is date order. */
    if (checkOut <= checkIn) {
      setChatUrl('');
      setError('Check-out needs to be a date after check-in.');
      return;
    }

    const message = [
      'Hello Taj Home Stay, I would like to check availability.',
      '',
      `Check-in: ${longDate(checkIn)}`,
      `Check-out: ${longDate(checkOut)}`,
      `Rooms: ${data.get('rooms')}`,
      `Guests: ${data.get('guests')}`,
    ].join('\n');

    const url = whatsappLink(message);
    setError('');
    setChatUrl(url);
    /* The strongest signal on the site: dates, rooms and guests chosen.
       Reported here because a submit is not a wa.me anchor, which is all the
       site-wide listener sees. A guest who then clicks the fallback link
       reports twice; the session transaction id collapses that to one. */
    reportConversion();
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <form
      onSubmit={onSubmit}
      aria-label="Check availability"
      className={`relative z-[3] grid text-espresso backdrop-blur-[10px] max-md:grid-cols-2 md:grid-cols-[1.2fr_1.2fr_1fr_1fr_auto] ${
        hero
          ? 'bg-porcelain/95 shadow-[0_-10px_40px_rgba(28,34,30,0.25)]'
          : 'mx-auto w-full max-w-[1100px] overflow-hidden rounded-[14px] bg-porcelain shadow-[0_16px_40px_rgba(47,71,60,0.16)] ring-1 ring-hairline'
      }`}
    >
      <label className={`${cell} ${firstCell} border-r max-md:border-b`}>
        <span className={label}>Check in</span>
        <input ref={checkInRef} type="date" name="checkIn" className={field} />
      </label>
      <label className={`${cell} md:border-r max-md:border-b`}>
        <span className={label}>Check out</span>
        <input ref={checkOutRef} type="date" name="checkOut" className={field} />
      </label>
      <label className={`${cell} border-r max-md:border-b`}>
        <span className={label}>Rooms</span>
        <select name="rooms" className={field} defaultValue={booking.roomOptions[0]}>
          {booking.roomOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <label className={`${cell} md:border-r max-md:border-b`}>
        <span className={label}>Guests</span>
        <select name="guests" className={field} defaultValue={booking.guestOptions[0]}>
          {booking.guestOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
      <div className={hero ? 'max-md:col-span-2' : 'grid place-items-center p-2.5 max-md:col-span-2 md:p-3'}>
        <button
          type="submit"
          className={
            hero
              ? 'flex h-full w-full cursor-pointer items-center justify-center gap-2.5 border-0 bg-gold px-8 py-4 md:pr-[var(--gutter)] text-[12px] font-semibold uppercase tracking-[0.14em] text-espresso transition-colors duration-300 hover:bg-gold-light max-md:py-4'
              : 'pill pill-ink w-full px-6 py-3.5 md:py-4'
          }
        >
          <WhatsApp className="h-4 w-4" />
          Check availability
        </button>
      </div>

      {(error || chatUrl) && (
        <p
          role={error ? 'alert' : 'status'}
          className="m-0 border-t border-hairline px-5 py-3 text-center text-[13px] leading-[1.55] text-espresso max-md:col-span-2 md:col-span-5"
        >
          {error}
          {chatUrl && (
            <>
              Opening WhatsApp with your dates. Nothing happened?{' '}
              <a
                href={chatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-gold underline-offset-4"
              >
                Open the chat
              </a>
              .
            </>
          )}
        </p>
      )}
    </form>
  );
}
