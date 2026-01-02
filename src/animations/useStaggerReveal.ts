import { useEffect, RefObject, useRef } from 'react';
import { animate, utils } from 'animejs';
import { EASINGS, DURATIONS, STAGGER, prefersReducedMotion } from './constants';

const { stagger } = utils;

interface UseStaggerRevealOptions {
  itemSelector: string;
  staggerDelay?: number;
  duration?: number;
  easing?: string;
  translateY?: number;
  from?: 'first' | 'last' | 'center';
  threshold?: number;
  once?: boolean;
}

export function useStaggerReveal<T extends HTMLElement>(
  options: UseStaggerRevealOptions
): RefObject<T> {
  const {
    itemSelector,
    staggerDelay = STAGGER.normal,
    duration = DURATIONS.normal,
    easing = EASINGS.dramatic,
    translateY = 30,
    from = 'first',
    threshold = 0.2,
    once = true,
  } = options;

  const ref = useRef<T>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = container.querySelectorAll(itemSelector);
    if (items.length === 0) return;

    // If reduced motion is preferred, show all items immediately
    if (prefersReducedMotion()) {
      items.forEach((item) => {
        (item as HTMLElement).style.opacity = '1';
        (item as HTMLElement).style.transform = 'none';
      });
      return;
    }

    // Set initial state for all items
    items.forEach((item) => {
      (item as HTMLElement).style.opacity = '0';
      (item as HTMLElement).style.transform = `translateY(${translateY}px)`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !hasAnimated.current)) {
            hasAnimated.current = true;

            animate(items, {
              translateY: [translateY, 0],
              opacity: [0, 1],
              duration,
              ease: easing,
              delay: stagger(staggerDelay, { from }),
            });

            if (once) {
              observer.unobserve(container);
            }
          } else if (!entry.isIntersecting && !once) {
            // Reset if not once mode
            items.forEach((item) => {
              (item as HTMLElement).style.opacity = '0';
              (item as HTMLElement).style.transform = `translateY(${translateY}px)`;
            });
          }
        });
      },
      { threshold }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [itemSelector, staggerDelay, duration, easing, translateY, from, threshold, once]);

  return ref;
}

export default useStaggerReveal;
