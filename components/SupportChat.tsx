'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { WhatsApp } from '@/components/BrandIcons';
import { support } from '@/content/support';
import { contact, whatsappLink } from '@/content/site';
import { reportConversion } from '@/lib/conversion';

/**
 * Live support.
 *
 * The desk answers WhatsApp around the clock and there is no staffed web
 * console, so this is a front door onto WhatsApp rather than a chat that
 * pretends someone is typing in the page. A guest picks a question or writes
 * one, and WhatsApp opens with it ready to send to the desk's own number.
 *
 * The quick questions are real `wa.me` anchors, which is what the site-wide
 * conversion listener watches (see lib/conversion.ts); the typed message goes
 * through `window.open`, which that listener cannot see, so it reports its
 * own conversion. The session transaction id collapses a double report.
 */
export function SupportChat() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  /* Escape closes and returns focus to the launcher; opening moves focus to
     the panel's close button so a keyboard is not stranded behind it. */
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLButtonElement>('.support-close')?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        setOpen(false);
        launcherRef.current?.focus();
      }
      /* The snap container listens for these on the document. */
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) {
        event.stopPropagation();
      }
    }
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [open]);

  /* Keep the newest message in view once there is a conversation. On first
     open there is only the greeting, and it should be read from the top. */
  useEffect(() => {
    if (!open || sent.length === 0) return;
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [open, sent]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setSent((s) => [...s, text]);
    setDraft('');
    reportConversion();
    window.open(whatsappLink(text), '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <button
        ref={launcherRef}
        type="button"
        className="support-launcher"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden="true" className="live-dot" />
        <WhatsApp className="h-[18px] w-[18px] flex-none" />
        <span className="support-launcher-label">{open ? 'Close' : support.launcher}</span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        className="support-panel"
        data-open={open}
        role="dialog"
        aria-label={`${support.heading}. ${support.status}.`}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- `inert` lands as a real prop in React 19 types
        {...({ inert: !open } as any)}
      >
        <div className="support-head">
          <div>
            <h2>{support.heading}</h2>
            <p>
              <span aria-hidden="true" className="live-dot" />
              {support.status}
            </p>
          </div>
          <button
            type="button"
            className="support-close"
            aria-label="Close live support"
            onClick={() => {
              setOpen(false);
              launcherRef.current?.focus();
            }}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <div ref={bodyRef} className="support-body">
          <p className="support-msg from-desk">{support.greeting}</p>
          {sent.map((text, i) => (
            <p key={`${i}-${text}`} className="support-msg from-guest">
              {text}
            </p>
          ))}
          {sent.length > 0 && (
            <p className="support-msg from-desk">
              That is now open in WhatsApp. Press send there and the desk has it.
            </p>
          )}
        </div>

        <div className="support-foot">
          {sent.length === 0 &&
            support.prompts.map((prompt) => (
              <a
                key={prompt.label}
                href={whatsappLink(prompt.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="support-chip"
                onClick={() => setSent((s) => [...s, prompt.label])}
              >
                {prompt.label}
              </a>
            ))}

          <form className="support-send" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor={`${panelId}-input`}>
              {support.inputLabel}
            </label>
            <input
              id={`${panelId}-input`}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={support.placeholder}
              autoComplete="off"
            />
            <button type="submit" aria-label={support.send}>
              <WhatsApp className="h-[18px] w-[18px]" />
            </button>
          </form>

          <p className="support-note">
            {support.note} Or call {contact.phone.display}.
          </p>
        </div>
      </div>
    </>
  );
}
