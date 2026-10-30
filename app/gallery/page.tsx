import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import { HeroScreen } from '@/components/HeroScreen';
import { ContactScreen } from '@/components/ContactScreen';
import { GalleryScreens } from '@/components/GalleryScreens';
import { gallery } from '@/content/gallery';

export const metadata: Metadata = {
  title: 'Gallery',
  description: gallery.lead,
  ...pageMeta('/gallery', gallery.heroImage),
};

export default function GalleryPage() {
  return (
    <>
      <HeroScreen
        id="gallery-intro"
        eyebrow={gallery.eyebrow}
        heading={gallery.heading}
        headingEmphasis={gallery.headingEmphasis}
        lead={gallery.lead}
        image={gallery.heroImage}
      />
      <GalleryScreens sections={gallery.sections} />
      <ContactScreen />
    </>
  );
}
