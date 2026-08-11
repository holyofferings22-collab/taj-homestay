'use client';

import { useState } from 'react';
import { WhatsApp } from '@/components/BrandIcons';
import { booking } from '@/content/home';
import { whatsappLink } from '@/content/site';

const labelText =
  'text-[10px] uppercase tracking-[0.1em] text-muted sm:text-[11px] sm:tracking-[0.12em]';

/**
 * Two shapes.
 *
 * From 640px up each field is its own bordered box stacked down a card — the
 * original, untouched. Below that, four boxed fields and their labels came to
 * roughly 480px of form standing between the headline and the rest of the
 * page, so the fields drop their boxes and become cells inside one bordered
 * block: dates across the top, party beneath, action at the base. Same four
 * inputs, same values, about 220px.
 *
 * 16px on phones either way. Safari on iOS zooms the page in when a field
 * under 16px takes focus and does not zoom back out — tapping Check-in left
 * the guest on a page 120% too wide, mid-form. The 15px above 640px is the
 * original and is safe there. Every field on the site follows this; see
 * ContactForm and NewsletterForm.
 */
const field =
  'w-full min-w-0 border-0 bg-transparent p-0 text-base text-ink outline-none sm:min-h-[46px] sm:rounded-lg sm:border sm:border-line sm:bg-white sm:px-3 sm:py-[13px] sm:text-[length:var(--step-body)]';

/** One field's cell: padded inside the phone block, bare inside the card. */
const cell = 'grid min-w-0 gap-1 px-3 py-2.5 sm:gap-1.5 sm:px-0 sm:py-0';

/** A row of cells on a phone, a plain stack from 640px up. */
const row =
  'grid divide-x divide-line border-b border-line sm:grid-cols-1 sm:gap-4 sm:divide-x-0 sm:border-0';

/** Formats an ISO date as "14 Aug 2026". The year matters here: the message
 *  lands in a chat the desk reads later, where a bare "14 Aug" is ambiguous. */
function formatDate(value: string) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

/**
 * Availability form. On submit it hands the guest's dates and party size to
 * WhatsApp as a pre-filled message to the desk — there is still no booking
 * engine, and the desk is the real booking channel.
 *
 * The chat opens in a new tab so a guest who switches back still has the site
 * and their dates as they left them. Popup blockers can swallow that even from
 * inside a click, and `window.open` with `noopener` returns null whether it was
 * blocked or not, so success cannot be detected — hence the visible fallback
 * link, which is also the keyboard- and screen-reader-friendly path.
 */
export function BookingForm() {
  const [error, setError] = useState('');
  const [chatUrl, setChatUrl] = useState('');

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

    /* Both values are `YYYY-MM-DD`, so comparing them as strings orders them
       correctly and sidesteps the timezone traps of parsing to Date first. */
    if (checkOut <= checkIn) {
      setChatUrl('');
      setError('Check-out needs to be a date after check-in.');
      return;
    }

    const message = [
      'Hello Taj Home Stay — I would like to check availability.',
      '',
      `Check-in: ${formatDate(checkIn)}`,
      `Check-out: ${formatDate(checkOut)}`,
      `Rooms: ${data.get('rooms')}`,
      `Guests: ${data.get('guests')}`,
    ].join('\n');

    const url = whatsappLink(message);
    setError('');
    setChatUrl(url);
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <div
      id="book"
      /* Centred while the hero is stacked, pinned right once it is not.
         `ml-auto` is what holds this against the right edge of the hero when
         the copy sits beside it. Stacked, it did the same thing to a 340px
         card in a wider column — on a 430px phone that left 66px of space on
         one side and 24px on the other. 760px is where the copy's 320px
         basis, this card's 340px and the 36px gap first fit on one line. */
      className="mx-auto w-full max-w-[340px] flex-[0_1_340px] overflow-hidden rounded-xl border border-line bg-white shadow-[0_10px_30px_rgba(28,26,24,0.07)] sm:overflow-visible sm:rounded-2xl sm:px-[26px] sm:py-[30px] sm:shadow-[0_26px_60px_rgba(28,26,24,0.12)] min-[760px]:ml-auto min-[760px]:mr-0"
    >
      <div className="border-b border-line px-3 py-2.5 text-center sm:border-0 sm:p-0">
        <h2 className="m-0 font-display text-[18px] font-normal text-ink sm:mb-[5px] sm:text-[25px]">
          {booking.heading}
        </h2>
        <p className="m-0 text-[12px] sm:mb-[22px] sm:text-[13px]">{booking.subheading}</p>
      </div>

      <form onSubmit={onSubmit} className="grid sm:gap-4">
        {/* Dates two-up. A native date field needs about 120px to show
            dd/mm/yyyy and its picker button, and half of this block is ~150px,
            so the pair fits on one line where four stacked fields did not. */}
        <div className={`grid-cols-2 ${row}`}>
          <label className={cell}>
            <span className={labelText}>Check-in</span>
            <input
              type="date"
              name="checkIn"
              defaultValue={booking.defaultCheckIn}
              className={field}
            />
          </label>
          <label className={cell}>
            <span className={labelText}>Check-out</span>
            <input
              type="date"
              name="checkOut"
              defaultValue={booking.defaultCheckOut}
              className={field}
            />
          </label>
        </div>

        {/* Not an even split: "4+ Rooms" is short and "2 Adults, 1 Child" is
            the longest string in either menu, and a select that runs out of
            room truncates its value rather than wrapping it. */}
        <div className={`grid-cols-[2fr_3fr] ${row}`}>
          <label className={cell}>
            <span className={labelText}>Rooms</span>
            <select name="rooms" className={field} defaultValue={booking.roomOptions[0]}>
              {booking.roomOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label className={cell}>
            <span className={labelText}>Guests</span>
            <select name="guests" className={field} defaultValue={booking.guestOptions[0]}>
              {booking.guestOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-2.5 p-3 sm:gap-4 sm:p-0 sm:pt-1">
          <button
            type="submit"
            className="flex min-h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border-0 bg-clay p-3.5 text-[length:var(--step-body)] text-white transition-colors duration-[250ms] hover:bg-accent hover:text-ink sm:p-4"
          >
            <WhatsApp className="h-[17px] w-[17px]" />
            Check Availability
          </button>

          {error && (
            <p
              role="alert"
              className="m-0 rounded-[10px] bg-sand px-3.5 py-3 text-center text-[13px] leading-[1.55] text-ink"
            >
              {error}
            </p>
          )}

          {chatUrl && (
            <p
              role="status"
              className="m-0 rounded-[10px] bg-sand px-3.5 py-3 text-center text-[13px] leading-[1.55] text-ink"
            >
              Opening WhatsApp with your dates. Nothing happened?{' '}
              <a
                href={chatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-clay underline hover:text-clay"
              >
                Open the chat
              </a>
              .
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
