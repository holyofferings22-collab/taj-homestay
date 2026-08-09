'use client';

import { useState } from 'react';
import { booking } from '@/content/home';
import { contact } from '@/content/site';

const labelText = 'text-[11px] uppercase tracking-[0.12em] text-muted';
const field =
  'min-h-[46px] rounded-lg border border-line bg-white px-3 py-[13px] text-[15px] text-ink outline-none';

/** Formats an ISO date as "14 Aug", matching the original en-IN formatting. */
function formatDate(value: string) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

/**
 * Availability form. Confirms in-page and sends nothing — the original
 * behaviour, pending a real booking URL.
 */
export function BookingForm() {
  const [message, setMessage] = useState('');

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const checkIn = formatDate(String(data.get('checkIn') ?? ''));
    const checkOut = formatDate(String(data.get('checkOut') ?? ''));

    if (!checkIn || !checkOut) {
      setMessage('Please choose your check-in and check-out dates.');
      return;
    }

    setMessage(
      `${data.get('rooms')}, ${data.get('guests')} — ${checkIn} to ${checkOut}. ` +
        `Call ${contact.phone.display} to confirm; the desk answers at any hour.`,
    );
  }

  return (
    <div
      id="book"
      className="ml-auto w-full max-w-[340px] flex-[0_1_340px] rounded-2xl border border-line bg-white px-[26px] py-[30px] shadow-[0_26px_60px_rgba(28,26,24,0.12)]"
    >
      <h2 className="m-0 mb-[5px] text-center font-display text-[25px] font-normal text-ink">
        {booking.heading}
      </h2>
      <p className="m-0 mb-[22px] text-center text-[13px]">{booking.subheading}</p>

      <form onSubmit={onSubmit} className="grid gap-4">
        <label className="grid gap-[7px]">
          <span className={labelText}>Check-in</span>
          <input type="date" name="checkIn" defaultValue={booking.defaultCheckIn} className={field} />
        </label>
        <label className="grid gap-[7px]">
          <span className={labelText}>Check-out</span>
          <input type="date" name="checkOut" defaultValue={booking.defaultCheckOut} className={field} />
        </label>
        <label className="grid gap-[7px]">
          <span className={labelText}>Rooms</span>
          <select name="rooms" className={field} defaultValue={booking.roomOptions[0]}>
            {booking.roomOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-[7px]">
          <span className={labelText}>Guests</span>
          <select name="guests" className={field} defaultValue={booking.guestOptions[0]}>
            {booking.guestOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="mt-1 flex min-h-12 cursor-pointer items-center justify-center gap-2.5 rounded-full border-0 bg-blush p-4 text-[15px] text-ink transition-colors duration-[250ms] hover:bg-clay hover:text-white"
        >
          Check Availability <span aria-hidden="true">&rarr;</span>
        </button>

        {message && (
          <p
            role="status"
            className="m-0 rounded-[10px] bg-sand px-3.5 py-3 text-center text-[13px] leading-[1.55] text-ink"
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
