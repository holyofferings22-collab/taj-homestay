import type { Metadata } from 'next';
import { GalleryGrid } from '@/components/GalleryGrid';
import { gallery } from '@/content/gallery';

export const metadata: Metadata = {
  title: 'Gallery',
  description: gallery.lead,
};

export default function GalleryPage() {
  return (
    <div className="font-body text-base font-light leading-[1.7] text-muted">
      <section className="bg-sand pb-[62px] pt-[66px]">
        <div className="mx-auto max-w-[1240px] px-6">
          <p className="m-0 mb-3.5 text-xs uppercase tracking-[0.14em] text-clay">
            {gallery.eyebrow}
          </p>
          <h1 className="m-0 font-display text-[clamp(32px,4vw,50px)] font-normal leading-[1.2] text-ink">
            {gallery.heading}
          </h1>
          <p className="mt-5 max-w-[560px]">{gallery.lead}</p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {gallery.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="rounded-full border border-line px-[18px] py-2.5 text-sm text-ink hover:border-clay hover:text-clay"
              >
                {section.heading}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-[104px]">
        <GalleryGrid sections={gallery.sections} />
      </div>
    </div>
  );
}
