// Animation constants for consistent timing and easing across the site

export const EASINGS = {
  // Smooth, professional feel
  smooth: 'cubicBezier(0.4, 0, 0.2, 1)',
  // Natural, bouncy interactions
  bounce: 'spring(1, 80, 10, 0)',
  // Quick, responsive feedback
  sharp: 'cubicBezier(0.4, 0, 0.6, 1)',
  // Dramatic reveals
  dramatic: 'cubicBezier(0.16, 1, 0.3, 1)',
  // Number counting
  countUp: 'easeOutExpo',
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
