import type { Metadata } from 'next';
import Link from 'next/link';
import { Screen } from '@/components/Screen';
import { HeroScreen } from '@/components/HeroScreen';
import { ContactScreen } from '@/components/ContactScreen';
import { PostFilter } from '@/components/PostFilter';
import { journalIndex, posts, postTags } from '@/content/blog';

export const metadata: Metadata = {
  title: 'Journal',
  description: journalIndex.lead,
};

export default function JournalPage() {
  return (
    <>
      <HeroScreen
        id="journal-intro"
        eyebrow={journalIndex.eyebrow}
        heading={journalIndex.heading}
        headingEmphasis={journalIndex.headingEmphasis}
        lead={journalIndex.lead}
        image={journalIndex.heroImage}
      >
        <Link href="/guides" className="pill pill-ghost">
          Guides
        </Link>
      </HeroScreen>

      <Screen
        id="notes"
        tone="light"
        long
        labelledBy="notes-heading"
        className="content-start gap-8 bg-white px-[var(--gutter)] pb-[clamp(28px,5vh,56px)] pt-[var(--header-clear)]"
      >
        <h2 id="notes-heading" className="sr-only">
          Every note
        </h2>
        <PostFilter posts={posts} tags={postTags} />
      </Screen>

      <ContactScreen />
    </>
  );
}
