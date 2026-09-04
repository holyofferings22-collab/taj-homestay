import type { NextConfig } from 'next';

/**
 * Response headers for every route. The site has no login, no cookies of
 * its own and no endpoints, so this is the whole hardening story: stop
 * MIME sniffing, keep referrers to the origin, refuse to be framed, and
 * declare that the page never asks for camera, microphone or location.
 * The Google Maps iframes are outbound and unaffected by frame-ancestors.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  /* No need to advertise the framework in every response. */
  poweredByHeader: false,
  images: {
    /* Photographs are served at 72: the hero source files are 3 to 4.5 MB
       JPEGs and 72 is where the AVIF stops being distinguishable from 75 at
       full width while shaving another 10 to 15 percent. */
    qualities: [72, 75],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
