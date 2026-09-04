/**
 * The live support chat.
 *
 * There is no web console for staff to sit at, so the chat does not pretend
 * one exists: it is a front door onto the channel the desk actually watches,
 * WhatsApp, staffed 24x7. Nothing in the panel claims a person is typing,
 * and every reply the guest sees before they send is the site's own text,
 * written as the desk would say it.
 */
export const support = {
  launcher: 'Live support',
  heading: 'The front desk',
  status: 'Replies on WhatsApp, day or night',
  /** Shown as one message from the desk when the panel opens. */
  greeting:
    'Hello. The desk is on WhatsApp and someone is there at any hour. Pick a question or write ' +
    'your own and it opens with your message ready to send.',
  /** The quick questions. Each opens WhatsApp with `message` prefilled. */
  prompts: [
    { label: 'Are rooms free on my dates?', message: 'Hello Taj Home Stay, are rooms free on my dates?' },
    {
      label: 'What does a room cost this week?',
      message: 'Hello Taj Home Stay, what does a room cost this week?',
    },
    {
      label: 'How do I reach you from the airport?',
      message: 'Hello Taj Home Stay, how do I reach you from Terminal 3?',
    },
    {
      label: 'Can you hold a block of rooms?',
      message: 'Hello Taj Home Stay, can you hold a block of rooms for a group? I will send the dates and count.',
    },
    { label: 'I am arriving late tonight', message: 'Hello Taj Home Stay, I am arriving late tonight. Is that alright?' },
  ],
  inputLabel: 'Write to the desk',
  placeholder: 'Type your message',
  send: 'Send on WhatsApp',
  note: 'Opens WhatsApp with your message ready. Nothing is sent until you press send there.',
} as const;
