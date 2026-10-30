import type { MetadataRoute } from 'next';
import { posts } from '@/content/blog';
import { guides } from '@/content/guides';
import { siteUrl } from '@/content/site';

/**
 * Serves /sitemap.xml. Every public route is listed, built from the same
 * content modules the pages render from, so a new post or guide appears here
 * the moment it exists and nothing has to be kept in sync by hand.
 *
 * A date is given only where the content carries one. The static pages have
 * no honest modification date, and search engines treat a lastmod they cannot
 * trust as noise, so those entries carry the URL alone.
 */

const staticPaths = [
  '/',
  '/about',
  '/rooms',
  '/group-stays',
  '/location',
  '/gallery',
  '/contact',
  '/blog',
  '/guides',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticPaths.map((path) => ({ url: `${siteUrl}${path}` }));

  const postPages = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.dateISO,
  }));

  const guidePages = guides.map((guide) => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    lastModified: guide.dateISO,
  }));

  return [...pages, ...postPages, ...guidePages];
}
