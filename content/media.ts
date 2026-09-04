/**
 * Media that is still to be shot, and where it goes when it arrives.
 *
 * Every slot is `null` until the owner supplies the file. Components read a
 * slot and render their current photograph while it is null, so filling one
 * in is a one-line change here and nothing else moves. Drop the file into
 * `public/photos` (or `public/VIDEOS` for footage), then point the slot at it.
 */
export type Still = { src: string; alt: string };
export type Footage = { src: string; poster: string };

export const media = {
  /**
   * Home hero. A muted, looping clip of the building or a balcony at dusk
   * replaces the photograph the moment this is set; the poster is shown
   * until the clip can play, and instead of it under reduced motion.
   */
  heroVideo: null as Footage | null,
  heroStill: {
    src: '/photos/2026/room-dusk-city.jpg',
    alt: 'A room at Taj Home Stay at dusk, the lights of Dwarka through the window',
  } as Still,

  /**
   * The building from across the lane.
   *
   * Still null on purpose. The September 2026 shoot does contain two night
   * exteriors, but they went through an AI retouch that rewrote the signage:
   * the rooftop sign reads "TAI HOME STAY" and the canopy sign below it
   * "BAHRTHAD". Neither is the property's name. Point this at an unretouched
   * frame when one exists; do not use the retouched pair.
   */
  exterior: null as Still | null,
  /** The front desk, with the lift beyond. */
  frontDesk: {
    src: '/photos/2026/front-desk.jpg',
    alt: 'The front desk at Taj Home Stay, with the lift beyond',
  } as Still | null,
  /** A corridor of guest-room doors, receding. */
  corridor: {
    src: '/photos/2026/corridor-long.jpg',
    alt: 'A guest-room corridor running the length of the floor',
  } as Still | null,
  /** The dining tables. Breakfast itself is still unphotographed. */
  breakfast: {
    src: '/photos/2026/dining.jpg',
    alt: 'A laid dining table at Taj Home Stay',
  } as Still | null,
  /** The walk toward Yashobhoomi Gate 1. The shoot was all indoors. */
  walk: null as Still | null,

  /** The ground-floor lounge. */
  lounge: {
    src: '/photos/2026/lounge.jpg',
    alt: 'The ground-floor lounge at Taj Home Stay, with sofas and armchairs',
  } as Still | null,

} as const;
