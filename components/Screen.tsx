import type { ReactNode } from 'react';

export type ScreenTone = 'photo' | 'light' | 'dark';

/**
 * One band of the page.
 *
 * `tone` tells the fixed header how to paint itself while this section sits
 * under it: transparent over a photograph, white over a light ground. `full`
 * asks for the whole viewport: the home page bands and every photograph
 * section; `auto` sizes to the content, for long reading on the inner pages.
 */
export function Screen({
  id,
  tone = 'light',
  full = false,
  auto = false,
  revealed = false,
  className = '',
  labelledBy,
  children,
}: {
  id: string;
  tone?: ScreenTone;
  full?: boolean;
  /** Sized by its content, with generous padding. For long reading. */
  auto?: boolean;
  /**
   * Render already revealed. The first screen of every page sets this so its
   * copy is in the initial HTML rather than waiting for PageShell to mount.
   */
  revealed?: boolean;
  className?: string;
  /** id of the heading that names this screen, for the section landmark */
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      data-screen=""
      data-tone={tone}
      aria-labelledby={labelledBy}
      className={`screen ${full ? 'screen-full' : ''} ${auto ? 'screen-auto' : ''} ${revealed ? 'in' : ''} ${className}`
        .replace(/\s+/g, ' ')
        .trim()}
    >
      {children}
    </section>
  );
}
