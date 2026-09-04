import type { ReactNode } from 'react';

export type ScreenTone = 'photo' | 'light' | 'dark';

/**
 * One full-viewport screen inside the snap container (see SnapShell).
 *
 * `tone` tells the fixed header how to paint itself while this screen is the
 * active one: transparent over a photograph, ivory over a light ground, night
 * over a dark one. `long` is for screens whose content is taller than the
 * viewport (gallery grids, the FAQ, an article): they still snap into place
 * when they arrive, but drop `scroll-snap-stop` so a fast scroll is not held
 * on them, and the CSS spec lets a snap area larger than the viewport scroll
 * freely inside itself, so nothing is ever trapped.
 */
export function Screen({
  id,
  tone = 'light',
  long = false,
  revealed = false,
  className = '',
  labelledBy,
  children,
}: {
  id: string;
  tone?: ScreenTone;
  long?: boolean;
  /**
   * Render already revealed. The first screen of every page sets this so its
   * copy is in the initial HTML rather than waiting for SnapShell to mount.
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
      className={`screen ${long ? 'screen-long' : ''} ${revealed ? 'in' : ''} ${className}`
        .replace(/\s+/g, ' ')
        .trim()}
    >
      {children}
    </section>
  );
}
