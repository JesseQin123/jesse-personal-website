import { useEffect, useRef } from 'react';
import { animate, svg, utils } from 'animejs';
import { prefersReducedMotion } from '@/animations/constants';

const { createMotionPath } = svg;
const { stagger } = utils;

interface FloatingParticlesProps {
  className?: string;
  count?: number;
}

const FloatingParticles = ({ className = '', count = 6 }: FloatingParticlesProps) => {
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (prefersReducedMotion()) return;

    const particles = containerRef.current.querySelectorAll('.particle');
    const paths = containerRef.current.querySelectorAll('.motion-path');

    // Animate each particle along its corresponding path
    particles.forEach((particle, index) => {
      const pathIndex = index % paths.length;
      const path = paths[pathIndex] as SVGGeometryElement;

      if (path) {
        const motionPath = createMotionPath(path);
        if (motionPath) {
          animate(particle, {
            ...motionPath,
            duration: 8000 + index * 2000,
            loop: true,
            ease: 'linear',
          });
        }
      }
    });

    // Add pulsing glow effect
    animate(particles, {
      opacity: [0.3, 0.8, 0.3],
      scale: [0.8, 1.2, 0.8],
      duration: 3000,
      loop: true,
      delay: stagger(500),
      ease: 'inOutSine',
    });

  }, []);

  return (
    <svg
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-visible ${className}`}
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Motion paths (invisible) */}
      <path
        className="motion-path"
        d="M100,300 Q200,100 400,200 T700,300"
        stroke="none"
        fill="none"
      />
      <path
        className="motion-path"
        d="M700,100 Q500,300 300,200 T100,400"
        stroke="none"
        fill="none"
      />
      <path
        className="motion-path"
        d="M50,500 Q250,200 450,400 T750,200"
        stroke="none"
        fill="none"
      />

      {/* Floating particles */}
      {Array.from({ length: count }).map((_, i) => (
        <g key={i} className="particle" style={{ transformOrigin: 'center' }}>
          <circle
            r={4 + (i % 3) * 2}
            fill={`hsl(24, 95%, ${53 + i * 5}%)`}
            opacity="0.6"
          />
          <circle
            r={8 + (i % 3) * 3}
            fill={`hsl(24, 95%, ${53 + i * 5}%)`}
            opacity="0.2"
          />
        </g>
      ))}
    </svg>
  );
};

export default FloatingParticles;
