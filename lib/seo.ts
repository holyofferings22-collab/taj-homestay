import type { Metadata } from 'next';
import { brand, siteUrl } from '@/content/site';

export type Picture = { src: string; alt: string };

/** The property's name as the share cards and schema.org carry it. */
export const siteName = `${brand.name}, ${brand.locality}`;

/** A site path as an absolute URL, which schema.org and share cards require. */
export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

/**
 * The 1200×630 share-card cut of a photograph. Every hero and article photo
 * has one in public/og under its own file name, cut from the source with
 * `sips`. WhatsApp only draws the large preview when the image is small, so
 * the full-size photographs are never offered as cards directly.
 */
export function ogImage(picture: Picture) {
  const name = picture.src.slice(picture.src.lastIndexOf('/') + 1).replace(/\.[^.]+$/, '');
  return { url: `/og/${name}.jpg`, width: 1200, height: 630, alt: picture.alt };
}

/**
 * Canonical URL and share-card metadata for one page.
 *
 * Next merges metadata shallowly: a page that sets `openGraph` replaces the
 * layout's whole object, so the shared values live here and every page
 * spreads the result rather than repeating them. Title and description are
 * left to the page, and Next copies them into the card tags.
 */
export function pageMeta(
  path: string,
  picture: Picture,
  article?: { publishedTime: string },
): Metadata {
  const url = absoluteUrl(path);
  const shared = { url, siteName, locale: 'en_IN', images: [ogImage(picture)] };
  return {
    alternates: { canonical: url },
    openGraph: article
      ? { ...shared, type: 'article', publishedTime: article.publishedTime, authors: [siteName] }
      : { ...shared, type: 'website' },
    twitter: { card: 'summary_large_image' },
  };
}

/** The property as schema.org author and publisher of its own writing. */
export const organization = {
  '@type': 'Organization',
  '@id': `${siteUrl}/#hotel`,
  name: siteName,
  url: siteUrl,
  logo: absoluteUrl(brand.logo.src),
};

/** schema.org BreadcrumbList from Home down to the current page. */
export function breadcrumbs(trail: readonly { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
