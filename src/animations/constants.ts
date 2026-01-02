// Animation constants for consistent timing and easing across the site

// In Anime.js v4, use standard easing names
export const EASINGS = {
  // Smooth, professional feel
  smooth: 'outQuad',
  // Natural, bouncy interactions
  bounce: 'outBack',
  // Quick, responsive feedback
  sharp: 'outQuart',
  // Dramatic reveals
  dramatic: 'outExpo',
  // Number counting
  countUp: 'outExpo',
  // Very gentle, no sudden stops - best for buttons
  gentle: 'outSine',
} as const;

export const DURATIONS = {
  instant: 100,
  fast: 200,
  normal: 400,
  slow: 800,
  slower: 1200,
} as const;

export const STAGGER = {
  fast: 30,
  normal: 50,
  slow: 100,
} as const;

export const TRANSFORMS = {
  slideUp: {
    from: { translateY: 20, opacity: 0 },
    to: { translateY: 0, opacity: 1 },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  scaleIn: {
    from: { scale: 0.9, opacity: 0 },
    to: { scale: 1, opacity: 1 },
  },
} as const;

// Utility to check for reduced motion preference
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
