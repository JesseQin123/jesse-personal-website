import { useEffect, useRef, RefObject } from 'react';
import { animate } from 'animejs';
import { EASINGS, DURATIONS, prefersReducedMotion } from './constants';

interface UseScrollRevealOptions {
  threshold?: number;
  translateY?: number;
  duration?: number;
  easing?: string;
  delay?: number;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
): RefObject<T> {
  const {
    threshold = 0.2,
    translateY = 30,
    duration = DURATIONS.slow,
    easing = EASINGS.dramatic,
    delay = 0,
    once = true,
  } = options;

  const ref = useRef<T>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If reduced motion is preferred, skip animation and show element
    if (prefersReducedMotion()) {
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }

    // Set initial state
    element.style.opacity = '0';
    element.style.transform = `translateY(${translateY}px)`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !hasAnimated.current)) {
            hasAnimated.current = true;

            animate(element, {
              translateY: [translateY, 0],
              opacity: [0, 1],
              duration,
              ease: easing,
              delay,
            });

            if (once) {
              observer.unobserve(element);
            }
          } else if (!entry.isIntersecting && !once) {
            // Reset if not once mode
            element.style.opacity = '0';
            element.style.transform = `translateY(${translateY}px)`;
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, translateY, duration, easing, delay, once]);

  return ref;
}

export default useScrollReveal;
