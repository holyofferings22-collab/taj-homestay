'use client';

import { useEffect, useRef, useState } from 'react';
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

/* One line per cell, the way a hotel booking bar is set: a small label above a
   single line of plain sans, not a stacked block of display type. The whole
   bar comes to about 64px, so it sits along the foot of the photograph
   without taking a slice out of it. */
const cellBase = 'grid content-center gap-[3px] border-hairline py-2.5';
const label = 'text-[9.5px] uppercase tracking-[0.18em] text-slate';
/* 16px on phones: below that iOS Safari zooms the page when the field takes
   focus and does not zoom back. 15px from md up, where that does not apply
   and the smaller figure sits better in a 61px bar. */
const field =
  'w-full min-w-0 border-0 bg-transparent p-0 text-[16px] font-medium leading-tight text-ink outline-none [color-scheme:light] md:text-[15px]';

/**
 * The availability bar.
 *
 * Hands the guest's dates and party to WhatsApp as a pre-filled message to the
 * desk, which is the real booking channel; there is no engine behind it.
 *
 * Defaults are today and tomorrow, set after mount so the server and the first
 * client paint agree (the server does not know the guest's date). The chat
 * opens in a new tab; a blocked popup cannot be detected, so a visible
 * fallback link appears as well, which is also the keyboard path.
 */
export function BookingBar({ variant = 'panel' }: { variant?: 'panel' | 'hero' } = {}) {
  const hero = variant === 'hero';
  const cell = `${cellBase} px-4 md:px-6`;


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
      aria-label="Book now"
      className={`relative z-[3] mx-auto grid w-full text-ink max-md:grid-cols-2 md:grid-cols-[1.1fr_1.1fr_1fr_1.1fr_auto] ${
        hero
          ? 'max-w-[min(1080px,100%)] overflow-hidden rounded-[10px] bg-white shadow-[0_18px_50px_rgba(31,29,27,0.22)] ring-1 ring-hairline'
          : 'max-w-[min(1000px,100%)] overflow-hidden rounded-[10px] bg-white shadow-[0_14px_34px_rgba(31,29,27,0.12)] ring-1 ring-hairline'
      }`}
    >
      <label className={`${cell} border-r max-md:border-b`}>
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

      <div className={hero ? 'max-md:col-span-2' : 'grid place-items-center p-2 max-md:col-span-2'}>
        <button
          type="submit"
          className={
            hero
              ? 'flex h-full w-full cursor-pointer items-center justify-center border-0 bg-gold px-9 py-4 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-gold-deep hover:text-white'
              : 'flex w-full cursor-pointer items-center justify-center border-0 bg-gold px-8 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-300 hover:bg-gold-deep hover:text-white'
          }
        >
          Book now
        </button>
      </div>

      {(error || chatUrl) && (
        <p
          role={error ? 'alert' : 'status'}
          className="m-0 border-t border-hairline px-5 py-2.5 text-center text-[12.5px] leading-[1.5] text-slate max-md:col-span-2 md:col-span-5"
        >
          {error}
          {chatUrl && (
            <>
              Opening WhatsApp with your dates. Nothing happened?{' '}
              <a
                href={chatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline decoration-gold underline-offset-4"
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
