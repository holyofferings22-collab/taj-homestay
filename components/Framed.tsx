import Image from 'next/image';
import type { ReactNode } from 'react';
import { Parallax } from '@/components/motion/Parallax';

/**
 * A photograph in a frame.
 *
 * The rooms section set the pattern the owner asked every other section to
 * follow: a rounded, inset picture beside its copy, not one bled to the edge
 * of the window. The picture still drifts a little on scroll; the frame
 * clips it. On phones it is a 4:3 block the full width of the column; from
 * `lg` it takes a fixed height so the two columns line up.
 */
export function Framed({
  src,
  alt,
  sizes = '(max-width: 1024px) 100vw, 50vw',
  className = '',
  children,
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`photo photo-hover relative aspect-[4/3] w-full overflow-hidden rounded-[6px] lg:aspect-auto lg:h-[min(56vh,560px)] ${className}`}
    >
      <Parallax strength={10} className="absolute inset-[-6%_0]">
        <Image src={src} alt={alt} fill quality={72} sizes={sizes} className="object-cover" />
      </Parallax>
      {children}
    </div>
  );
}
