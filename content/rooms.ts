/**
 * Room categories.
 *
 * Every field here is a PLACEHOLDER carried over from the original design.
 * Replace the three entries with the real categories — add or remove entries
 * freely, the grid adapts.
 */
export const rooms = {
  eyebrow: 'Taj Home Stay, Dwarka',
  heading: 'Rooms',
  lead:
    'Room names, inclusions and rates are placeholders until you send them. Categories without ' +
    'an external window are stated plainly on the card.',
  categories: [
    {
      name: '[ADD ROOM NAME]',
      chips: ['[CHIP]', '[CHIP]', '[CHIP]'],
      description:
        '[ADD ONE-LINE DESCRIPTION — say plainly whether this category has an external window.]',
      rate: '[RATE]',
    },
    {
      name: '[ADD ROOM NAME]',
      chips: ['[CHIP]', '[CHIP]', '[CHIP]'],
      description:
        '[ADD ONE-LINE DESCRIPTION — say plainly whether this category has an external window.]',
      rate: '[RATE]',
    },
    {
      name: '[ADD ROOM NAME]',
      chips: ['[CHIP]', '[CHIP]', '[CHIP]'],
      description:
        '[ADD ONE-LINE DESCRIPTION — say plainly whether this category has an external window.]',
      rate: '[RATE]',
    },
  ],
  cta: {
    heading: 'Checking dates for a convention?',
    body:
      'Rates move around Yashobhoomi event weeks. Call the desk and we will tell you what is ' +
      'actually free.',
  },
} as const;
