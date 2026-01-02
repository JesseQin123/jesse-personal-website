import { useEffect, useRef, RefObject } from 'react';
import { animate } from 'animejs';
import { EASINGS, prefersReducedMotion } from './constants';

interface UseCountUpOptions {
  endValue: number;
  startValue?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  threshold?: number;
}

export function useCountUp<T extends HTMLElement>(
  options: UseCountUpOptions
): RefObject<T> {
  const {
    endValue,
    startValue = 0,
    duration = 2000,
    suffix = '',
    prefix = '',
    decimals = 0,
    threshold = 0.3,
  } = options;

  const ref = useRef<T>(null);
  const hasAnimated = useRef(false);
  const countObj = useRef({ value: startValue });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set initial value
    element.textContent = `${prefix}${startValue}${suffix}`;

    // If reduced motion is preferred, show final value immediately
    if (prefersReducedMotion()) {
      element.textContent = `${prefix}${endValue.toFixed(decimals)}${suffix}`;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            countObj.current.value = startValue;

            animate(countObj.current, {
              value: endValue,
              duration,
              ease: EASINGS.countUp,
              onUpdate: () => {
                if (element) {
                  const displayValue = decimals > 0
                    ? countObj.current.value.toFixed(decimals)
                    : Math.round(countObj.current.value).toString();
                  element.textContent = `${prefix}${displayValue}${suffix}`;
                }
              },
            });

            observer.unobserve(element);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [endValue, startValue, duration, suffix, prefix, decimals, threshold]);

  return ref;
}

export default useCountUp;
