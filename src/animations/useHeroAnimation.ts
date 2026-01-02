import { useEffect, useRef, RefObject } from 'react';
import { animate, createTimeline, utils } from 'animejs';
import { EASINGS, DURATIONS, STAGGER, prefersReducedMotion } from './constants';

const { stagger } = utils;

interface UseHeroAnimationOptions {
  titleRef: RefObject<HTMLElement>;
  subtitleRef: RefObject<HTMLElement>;
  descriptionRef: RefObject<HTMLElement>;
  ctaRef: RefObject<HTMLElement>;
  imageRef: RefObject<HTMLElement>;
  badgeRef?: RefObject<HTMLElement>;
  autoPlay?: boolean;
}

interface UseHeroAnimationReturn {
  play: () => void;
  pause: () => void;
  restart: () => void;
}

export function useHeroAnimation(
  options: UseHeroAnimationOptions
): UseHeroAnimationReturn {
  const {
    titleRef,
    subtitleRef,
    descriptionRef,
    ctaRef,
    imageRef,
    badgeRef,
    autoPlay = true,
  } = options;

  const timelineRef = useRef<ReturnType<typeof createTimeline> | null>(null);

  const createAnimation = () => {
    // If reduced motion is preferred, show all elements immediately
    if (prefersReducedMotion()) {
      const elements = [
        titleRef.current,
        subtitleRef.current,
        descriptionRef.current,
        imageRef.current,
        badgeRef?.current,
      ].filter(Boolean);

      elements.forEach((el) => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });

      // Also show CTA buttons
      if (ctaRef.current) {
        const buttons = ctaRef.current.querySelectorAll('a, button');
        buttons.forEach((btn) => {
          (btn as HTMLElement).style.opacity = '1';
          (btn as HTMLElement).style.transform = 'none';
        });
      }
      return null;
    }

    // Set initial states
    const setInitialState = (el: HTMLElement | null, transform: string = 'translateY(20px)') => {
      if (el) {
        el.style.opacity = '0';
        el.style.transform = transform;
      }
    };

    setInitialState(titleRef.current);
    setInitialState(subtitleRef.current);
    setInitialState(descriptionRef.current);
    setInitialState(imageRef.current, 'scale(0.95)');
    if (badgeRef?.current) setInitialState(badgeRef.current, 'translateY(10px)');

    // Set initial state on CTA buttons directly (not the container)
    if (ctaRef.current) {
      const buttons = ctaRef.current.querySelectorAll('a, button');
      buttons.forEach((btn) => {
        (btn as HTMLElement).style.opacity = '0';
        (btn as HTMLElement).style.transform = 'translateY(20px)';
      });
    }

    // Create timeline
    const tl = createTimeline({
      defaults: {
        ease: EASINGS.dramatic,
        duration: DURATIONS.slow,
      },
    });

    // Title animation
    if (titleRef.current) {
      tl.add(titleRef.current, {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: DURATIONS.slow,
      }, 0);
    }

    // Profile image animation (concurrent with title)
    if (imageRef.current) {
      tl.add(imageRef.current, {
        scale: [0.95, 1],
        opacity: [0, 1],
        duration: DURATIONS.slower,
        ease: EASINGS.smooth,
      }, 0);
    }

    // Subtitle fade in
    if (subtitleRef.current) {
      tl.add(subtitleRef.current, {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: DURATIONS.normal,
      }, DURATIONS.slow * 0.5);
    }

    // Description fade in
    if (descriptionRef.current) {
      tl.add(descriptionRef.current, {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: DURATIONS.normal,
      }, DURATIONS.slow * 0.6);
    }

    // CTA buttons with spring effect
    if (ctaRef.current) {
      const buttons = ctaRef.current.querySelectorAll('a, button');
      if (buttons.length > 0) {
        tl.add(buttons, {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: DURATIONS.slow,
          delay: stagger(STAGGER.slow),
          ease: EASINGS.bounce,
        }, DURATIONS.slow * 0.7);
      } else {
        tl.add(ctaRef.current, {
          translateY: [20, 0],
          opacity: [0, 1],
          duration: DURATIONS.slow,
          ease: EASINGS.bounce,
        }, DURATIONS.slow * 0.7);
      }
    }

    // Credential badge (after main content)
    if (badgeRef?.current) {
      tl.add(badgeRef.current, {
        translateY: [10, 0],
        opacity: [0, 1],
        duration: DURATIONS.normal,
        ease: EASINGS.smooth,
      }, DURATIONS.slow * 0.8);
    }

    return tl;
  };

  useEffect(() => {
    if (autoPlay) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        timelineRef.current = createAnimation();
      }, 100);

      return () => {
        clearTimeout(timer);
        if (timelineRef.current) {
          timelineRef.current.pause();
        }
      };
    }
  }, [autoPlay]);

  const play = () => {
    if (!timelineRef.current) {
      timelineRef.current = createAnimation();
    }
    timelineRef.current?.play();
  };

  const pause = () => {
    timelineRef.current?.pause();
  };

  const restart = () => {
    timelineRef.current?.restart();
  };

  return { play, pause, restart };
}

export default useHeroAnimation;
