import type { MetadataRoute } from 'next';
import { siteUrl } from '@/content/site';

/**
 * Serves /robots.txt. Nothing on the site is private and there are no
 * endpoints, so every crawler may read all of it; the one thing worth saying
 * is where the sitemap lives.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
