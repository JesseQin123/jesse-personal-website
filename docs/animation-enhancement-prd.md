# Animation Enhancement PRD & Implementation Plan

## Project Overview

**Project Name**: Personal Website Animation Enhancement
**Tech Stack**: React + TypeScript + Vite + Tailwind CSS + Anime.js
**Current Branch**: `feat/animation`
**Document Version**: 1.0
**Created**: 2026-01-01

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current State Analysis](#2-current-state-analysis)
3. [Goals & Objectives](#3-goals--objectives)
4. [Anime.js Capabilities Overview](#4-animejs-capabilities-overview)
5. [Animation Design System](#5-animation-design-system)
6. [Feature Specifications](#6-feature-specifications)
7. [Technical Architecture](#7-technical-architecture)
8. [Implementation Plan](#8-implementation-plan)
9. [Performance Considerations](#9-performance-considerations)
10. [Success Metrics](#10-success-metrics)

---

## 1. Executive Summary

### 1.1 Purpose

Enhance the personal website with elegant, professional animations using Anime.js to:
- Create a memorable first impression
- Guide user attention to key CTAs
- Elevate the overall brand perception
- Improve user engagement and time on page

### 1.2 Scope

- Hero section entrance animations
- Scroll-triggered reveal animations
- Micro-interactions on buttons and cards
- Number counting animations for statistics
- Stagger effects for list/grid items

### 1.3 Design Philosophy

| Principle | Description |
|-----------|-------------|
| **Restraint** | Animations enhance, never distract |
| **Performance** | GPU-accelerated properties only (transform, opacity) |
| **Consistency** | Unified timing and easing across all animations |
| **Purpose** | Every animation serves a UX goal |

---

## 2. Current State Analysis

### 2.1 Website Structure

```
Pages:
├── Index.tsx (Landing Page)
├── BookCall.tsx (Calendly Integration)
└── NotFound.tsx (404 Page)

Active Components on Landing Page:
├── Navbar (sticky navigation)
├── HeroSection (profile + intro)
├── CredibilitySection (stats + credentials)
├── ServicesSection (4 service cards)
├── PricingSection (3 pricing tiers)
├── ContactSection (CTA + process steps)
└── Footer
```

### 2.2 Existing Animations

Current CSS animations in `index.css`:

| Animation | Duration | Effect |
|-----------|----------|--------|
| `float` | 6s | Y-axis translation + 3D perspective |
| `pulse-slow` | 4s | Opacity 0.8 → 1.0 |
| `slide-up` | 0.6s | Opacity + Y translation |
| `fade-in` | 0.8s | Simple opacity transition |

### 2.3 Gaps & Opportunities

- No scroll-triggered animations
- No stagger effects on lists/grids
- No number counting animations for stats
- Basic button hover states (could be enhanced)
- No entrance animations on page load
- Text animations not utilized

---

## 3. Goals & Objectives

### 3.1 Primary Goals

1. **First Impression**: Create a memorable entrance animation for the hero section
2. **Credibility Enhancement**: Animate statistics to draw attention and add impact
3. **Engagement**: Add scroll-triggered animations to maintain interest
4. **Conversion**: Subtle CTA button animations to encourage clicks

### 3.2 Success Criteria

- [ ] Page feels "alive" but not overwhelming
- [ ] Animations complete within reasonable timeframes (< 1s for entrances)
- [ ] No performance degradation (maintain 60fps)
- [ ] Consistent experience across devices
- [ ] Animations respect `prefers-reduced-motion`

---

## 4. Anime.js Capabilities Overview

### 4.1 Core Features to Utilize

| Feature | Use Case | Priority |
|---------|----------|----------|
| **Stagger** | Card grids, list items | High |
| **Timeline** | Sequenced entrance animations | High |
| **Spring Physics** | Button interactions, natural motion | Medium |
| **Scroll Integration** | Section reveals | High |
| **Text Splitting** | Hero title animation | Medium |
| **SVG Drawing** | Decorative elements, icons | Low |

### 4.2 Easing Functions

```typescript
// Recommended easings for this project
const easings = {
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
}
```

### 4.3 Duration Standards

```typescript
const durations = {
  instant: 100,    // Micro-interactions
  fast: 200,       // Hover states
  normal: 400,     // Standard transitions
  slow: 800,       // Entrance animations
  slower: 1200,    // Complex sequences

  // Stagger delays
  staggerFast: 30,
  staggerNormal: 50,
  staggerSlow: 100,
}
```

---

## 5. Animation Design System

### 5.1 Animation Categories

#### Category A: Entrance Animations
- Triggered once on page load or scroll into view
- Duration: 600-1200ms
- Easing: `dramatic` or `smooth`

#### Category B: Micro-interactions
- Triggered on user interaction (hover, click)
- Duration: 100-300ms
- Easing: `bounce` or `sharp`

#### Category C: Continuous Animations
- Always running (subtle background effects)
- Duration: 4000-8000ms
- Easing: `linear` or custom

#### Category D: Data Animations
- Number counting, progress bars
- Duration: 1500-2500ms
- Easing: `countUp`

### 5.2 Motion Principles

```
┌─────────────────────────────────────────────────────┐
│                    MOTION HIERARCHY                  │
├─────────────────────────────────────────────────────┤
│  Primary Elements (Hero title, main CTA)            │
│  → Larger movements, longer duration                │
│                                                      │
│  Secondary Elements (Cards, sections)               │
│  → Medium movements, standard duration              │
│                                                      │
│  Tertiary Elements (Icons, badges)                  │
│  → Subtle movements, quick duration                 │
└─────────────────────────────────────────────────────┘
```

---

## 6. Feature Specifications

### 6.1 Hero Section Animations

#### 6.1.1 Title Text Animation

**Trigger**: Page load
**Effect**: Characters fade in and slide up with stagger
**Duration**: 800ms total
**Stagger**: 30ms per character

```
Before: [invisible]
After:  "Jesse Qin, PhD" (each character animated)

Timeline:
0ms    ─────────────────────────────────────── 800ms
       J → e → s → s → e → (space) → Q → i → n
       ↑
       translateY: 20px → 0px
       opacity: 0 → 1
```

#### 6.1.2 Subtitle & Description

**Trigger**: After title completes
**Effect**: Fade in + slide up
**Duration**: 400ms
**Delay**: 200ms after title

#### 6.1.3 CTA Buttons

**Trigger**: After description
**Effect**: Scale from 0.8 → 1 with spring physics
**Duration**: 600ms
**Stagger**: 100ms between buttons

#### 6.1.4 Profile Image

**Trigger**: Concurrent with title
**Effect**: Scale 0.9 → 1 + opacity fade
**Duration**: 800ms
**Easing**: `smooth`

#### 6.1.5 Decorative Elements

**Trigger**: After main content
**Effect**: Fade in + subtle rotation
**Duration**: 1000ms

### 6.2 Credibility Section Animations

#### 6.2.1 Number Counter

**Trigger**: Scroll into view (once)
**Elements**: 4 stat numbers (500+, 8+, 50+, 95%)
**Duration**: 2000ms
**Easing**: `easeOutExpo`

```
Animation Flow:
0 → 500+ (clients)
0 → 8+ (years)
0 → 50+ (projects)
0 → 95% (satisfaction)

Features:
- Numbers increment from 0
- Suffix (+, %) appears after number settles
- Optional: Slight overshoot then settle
```

#### 6.2.2 Credential Cards

**Trigger**: Scroll into view
**Effect**: Stagger reveal from left to right
**Duration**: 400ms per card
**Stagger**: 100ms

### 6.3 Services Section Animations

#### 6.3.1 Card Grid Reveal

**Trigger**: Scroll into view
**Effect**: Stagger from center outward
**Grid**: 2x2
**Duration**: 500ms per card
**Stagger**: 80ms

```
Grid Animation Pattern:
┌─────┬─────┐
│  2  │  3  │
├─────┼─────┤
│  1  │  4  │
└─────┴─────┘
         ↓
Numbers indicate animation order (from center)
```

#### 6.3.2 Icon Animation

**Trigger**: Card visible
**Effect**: Scale bounce
**Duration**: 400ms
**Delay**: 200ms after card appears

### 6.4 Pricing Section Animations

#### 6.4.1 Card Reveal

**Trigger**: Scroll into view
**Effect**: Slide up + fade in
**Duration**: 600ms
**Stagger**: 150ms (left to right)

#### 6.4.2 Highlight Card (Middle)

**Additional Effect**: Subtle glow pulse after reveal
**Duration**: 2000ms (continuous)

#### 6.4.3 Feature Checkmarks

**Trigger**: After card reveals
**Effect**: Scale pop-in
**Duration**: 200ms per checkmark
**Stagger**: 50ms

### 6.5 Contact Section Animations

#### 6.5.1 Process Steps

**Trigger**: Scroll into view
**Effect**: Sequential reveal with connecting line

```
Step Animation:
① ──────── ② ──────── ③
↑          ↑          ↑
Reveal 1   Reveal 2   Reveal 3
(0ms)      (+200ms)   (+400ms)

Line draws between steps as they reveal
```

### 6.6 Micro-interactions

#### 6.6.1 Button Hover

**Effect**: Scale 1 → 1.02 + shadow expansion
**Duration**: 200ms
**Easing**: `spring(1, 100, 10, 0)`

#### 6.6.2 Button Click

**Effect**: Scale 1 → 0.98 → 1
**Duration**: 150ms
**Easing**: `sharp`

#### 6.6.3 Card Hover

**Effect**: TranslateY -4px + shadow
**Duration**: 250ms
**Easing**: `smooth`

#### 6.6.4 Navigation Link Hover

**Effect**: Underline draw animation
**Duration**: 200ms

---

## 7. Technical Architecture

### 7.1 File Structure

```
/src
├── /animations
│   ├── index.ts                 # Export all hooks
│   ├── constants.ts             # Easings, durations, common configs
│   ├── useHeroAnimation.ts      # Hero section orchestration
│   ├── useScrollReveal.ts       # Generic scroll-triggered reveal
│   ├── useCountUp.ts            # Number counting animation
│   ├── useStaggerReveal.ts      # Grid/list stagger animations
│   └── useButtonAnimation.ts    # Button micro-interactions
```

### 7.2 Hook Specifications

#### useHeroAnimation

```typescript
interface UseHeroAnimationOptions {
  titleRef: RefObject<HTMLElement>;
  subtitleRef: RefObject<HTMLElement>;
  ctaRef: RefObject<HTMLElement>;
  imageRef: RefObject<HTMLElement>;
  autoPlay?: boolean;
}

interface UseHeroAnimationReturn {
  play: () => void;
  pause: () => void;
  restart: () => void;
  isComplete: boolean;
}
```

#### useScrollReveal

```typescript
interface UseScrollRevealOptions {
  ref: RefObject<HTMLElement>;
  threshold?: number;        // 0-1, default 0.2
  animation?: {
    from: AnimeParams;
    to: AnimeParams;
  };
  duration?: number;
  easing?: string;
  once?: boolean;           // default true
}
```

#### useCountUp

```typescript
interface UseCountUpOptions {
  ref: RefObject<HTMLElement>;
  endValue: number;
  startValue?: number;      // default 0
  duration?: number;        // default 2000
  suffix?: string;          // e.g., '+', '%'
  decimals?: number;        // default 0
  triggerOnScroll?: boolean;
}
```

#### useStaggerReveal

```typescript
interface UseStaggerRevealOptions {
  containerRef: RefObject<HTMLElement>;
  itemSelector: string;     // e.g., '.card'
  staggerDelay?: number;    // default 50
  from?: 'first' | 'last' | 'center';
  grid?: [number, number];  // for grid stagger
}
```

### 7.3 Animation Constants

```typescript
// /src/animations/constants.ts

export const EASINGS = {
  smooth: 'cubicBezier(0.4, 0, 0.2, 1)',
  bounce: 'spring(1, 80, 10, 0)',
  sharp: 'cubicBezier(0.4, 0, 0.6, 1)',
  dramatic: 'cubicBezier(0.16, 1, 0.3, 1)',
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
```

---

## 8. Implementation Plan

### 8.1 Phase Overview

```
┌──────────────────────────────────────────────────────────────┐
│                    IMPLEMENTATION PHASES                      │
├──────────────────────────────────────────────────────────────┤
│                                                               │
│  Phase 1: Foundation                                         │
│  ├── Set up animation architecture                           │
│  ├── Create constants and utilities                          │
│  └── Implement useScrollReveal hook                          │
│                                                               │
│  Phase 2: Hero Section                                       │
│  ├── Title text animation                                    │
│  ├── Subtitle/description fade                               │
│  ├── CTA button spring animation                             │
│  └── Profile image reveal                                    │
│                                                               │
│  Phase 3: Scroll Animations                                  │
│  ├── Credibility number counting                             │
│  ├── Services card stagger                                   │
│  ├── Pricing card reveal                                     │
│  └── Contact process steps                                   │
│                                                               │
│  Phase 4: Micro-interactions                                 │
│  ├── Button hover/click effects                              │
│  ├── Card hover effects                                      │
│  └── Navigation link animations                              │
│                                                               │
│  Phase 5: Polish & Optimization                              │
│  ├── Reduced motion support                                  │
│  ├── Performance optimization                                │
│  └── Cross-browser testing                                   │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### 8.2 Detailed Task Breakdown

#### Phase 1: Foundation

| Task | Description | Files |
|------|-------------|-------|
| 1.1 | Create `/src/animations` directory | - |
| 1.2 | Create `constants.ts` with all timing/easing values | constants.ts |
| 1.3 | Create `useScrollReveal.ts` hook | useScrollReveal.ts |
| 1.4 | Create `index.ts` for exports | index.ts |
| 1.5 | Install types if needed | package.json |

#### Phase 2: Hero Section

| Task | Description | Files |
|------|-------------|-------|
| 2.1 | Create `useHeroAnimation.ts` hook | useHeroAnimation.ts |
| 2.2 | Implement title character animation | useHeroAnimation.ts |
| 2.3 | Add timeline for sequenced elements | useHeroAnimation.ts |
| 2.4 | Integrate into HeroSection component | HeroSection.tsx |
| 2.5 | Test and adjust timing | - |

#### Phase 3: Scroll Animations

| Task | Description | Files |
|------|-------------|-------|
| 3.1 | Create `useCountUp.ts` hook | useCountUp.ts |
| 3.2 | Integrate counting into CredibilitySection | CredibilitySection.tsx |
| 3.3 | Create `useStaggerReveal.ts` hook | useStaggerReveal.ts |
| 3.4 | Apply stagger to ServicesSection | ServicesSection.tsx |
| 3.5 | Apply reveal to PricingSection | PricingSection.tsx |
| 3.6 | Animate ContactSection steps | ContactSection.tsx |

#### Phase 4: Micro-interactions

| Task | Description | Files |
|------|-------------|-------|
| 4.1 | Create `useButtonAnimation.ts` hook | useButtonAnimation.ts |
| 4.2 | Apply to all CTA buttons | Button.tsx / components |
| 4.3 | Add card hover animations | Card styles |
| 4.4 | Add nav link underline animation | Navbar.tsx |

#### Phase 5: Polish & Optimization

| Task | Description | Files |
|------|-------------|-------|
| 5.1 | Add `prefers-reduced-motion` check | All animation hooks |
| 5.2 | Optimize with `will-change` hints | CSS |
| 5.3 | Test on mobile devices | - |
| 5.4 | Cross-browser testing | - |
| 5.5 | Final timing adjustments | constants.ts |

### 8.3 Implementation Priority Matrix

| Feature | Impact | Effort | Priority |
|---------|--------|--------|----------|
| Hero entrance animation | ⭐⭐⭐⭐⭐ | Medium | **P0** |
| Number counting | ⭐⭐⭐⭐ | Low | **P0** |
| Services card stagger | ⭐⭐⭐⭐ | Medium | **P1** |
| Button micro-interactions | ⭐⭐⭐ | Low | **P1** |
| Pricing reveal | ⭐⭐⭐ | Low | **P1** |
| Contact steps animation | ⭐⭐⭐ | Medium | **P2** |
| Nav link animations | ⭐⭐ | Low | **P2** |
| Reduced motion support | ⭐⭐⭐⭐ | Low | **P2** |

---

## 9. Performance Considerations

### 9.1 Best Practices

1. **GPU-Accelerated Properties Only**
   - Use `transform` and `opacity`
   - Avoid animating `width`, `height`, `margin`, `padding`

2. **Will-Change Hints**
   ```css
   .animate-ready {
     will-change: transform, opacity;
   }
   ```

3. **Intersection Observer**
   - Use for scroll-triggered animations
   - Disconnect after animation completes (for `once: true`)

4. **Reduced Motion**
   ```typescript
   const prefersReducedMotion =
     window.matchMedia('(prefers-reduced-motion: reduce)').matches;

   if (prefersReducedMotion) {
     // Skip or simplify animations
   }
   ```

### 9.2 Performance Targets

| Metric | Target |
|--------|--------|
| Animation FPS | 60fps |
| First animation start | < 100ms after load |
| Total animation JS size | < 20KB gzipped |
| Main thread blocking | < 50ms |

### 9.3 Mobile Considerations

- Reduce animation complexity on mobile
- Shorter durations for touch interactions
- Disable parallax effects on mobile
- Consider battery impact

---

## 10. Success Metrics

### 10.1 Qualitative

- [ ] Animations feel natural and professional
- [ ] No jarring or distracting movements
- [ ] Consistent timing across all animations
- [ ] Enhances rather than detracts from content

### 10.2 Quantitative

| Metric | Target | Measurement |
|--------|--------|-------------|
| Lighthouse Performance | > 90 | Lighthouse audit |
| Time to Interactive | < 3s | Web Vitals |
| CLS (Cumulative Layout Shift) | < 0.1 | Web Vitals |
| Animation frame rate | 60fps | Chrome DevTools |

### 10.3 User Experience

- [ ] Users notice the polish
- [ ] Animations guide attention to CTAs
- [ ] Page feels premium and professional
- [ ] No user complaints about motion

---

## Appendix A: Anime.js Quick Reference

### Basic Animation

```typescript
import anime from 'animejs';

anime({
  targets: '.element',
  translateY: [20, 0],
  opacity: [0, 1],
  duration: 800,
  easing: 'easeOutExpo',
});
```

### Timeline

```typescript
const tl = anime.timeline({
  easing: 'easeOutExpo',
  duration: 800,
});

tl.add({ targets: '.title', opacity: [0, 1] })
  .add({ targets: '.subtitle', opacity: [0, 1] }, '-=400')
  .add({ targets: '.button', scale: [0.8, 1] }, '-=200');
```

### Stagger

```typescript
anime({
  targets: '.card',
  translateY: [20, 0],
  opacity: [0, 1],
  delay: anime.stagger(100, { from: 'center' }),
});
```

### Scroll Trigger (with Intersection Observer)

```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      anime({
        targets: entry.target,
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 800,
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

observer.observe(element);
```

---

## Appendix B: Component Integration Examples

### HeroSection Integration

```tsx
// HeroSection.tsx
import { useHeroAnimation } from '@/animations';

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useHeroAnimation({
    titleRef,
    subtitleRef,
    ctaRef,
    imageRef,
    autoPlay: true,
  });

  return (
    <section>
      <h1 ref={titleRef}>Jesse Qin, PhD</h1>
      <p ref={subtitleRef}>AI Strategy Consultant</p>
      <div ref={ctaRef}>
        <Button>Book a Call</Button>
      </div>
      <div ref={imageRef}>
        <img src="..." alt="..." />
      </div>
    </section>
  );
};
```

### CredibilitySection with Count Up

```tsx
// CredibilitySection.tsx
import { useCountUp } from '@/animations';

const StatItem = ({ value, suffix, label }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useCountUp({
    ref,
    endValue: value,
    suffix,
    duration: 2000,
    triggerOnScroll: true,
  });

  return (
    <div>
      <span ref={ref}>0</span>
      <span>{label}</span>
    </div>
  );
};
```

---

*Document maintained by: Development Team*
*Last updated: 2026-01-01*
