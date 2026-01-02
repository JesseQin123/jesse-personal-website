import { useEffect, useRef } from 'react';
import { animate, svg, createTimeline, utils } from 'animejs';
import { prefersReducedMotion } from '@/animations/constants';

const { createDrawable } = svg;
const { stagger } = utils;

interface AnimatedCircuitLinesProps {
  className?: string;
}

const AnimatedCircuitLines = ({ className = '' }: AnimatedCircuitLinesProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!svgRef.current || hasAnimated.current) return;
    if (prefersReducedMotion()) return;

    hasAnimated.current = true;

    const paths = svgRef.current.querySelectorAll('.circuit-path');
    const nodes = svgRef.current.querySelectorAll('.circuit-node');

    // Create drawable proxies for line drawing animation
    const drawables = createDrawable(paths, 0, 0);

    // Create timeline for orchestrated animation
    const tl = createTimeline({
      defaults: {
        ease: 'outQuad',
      },
    });

    // Animate lines drawing
    tl.add(drawables, {
      draw: ['0 0', '0 1'],
      duration: 1500,
      delay: stagger(200),
    }, 0);

    // Animate nodes appearing
    tl.add(nodes, {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 400,
      delay: stagger(150, { start: 800 }),
      ease: 'outBack',
    }, 0);

    // Add subtle glow pulse to nodes
    animate(nodes, {
      opacity: [0.7, 1],
      duration: 2000,
      loop: true,
      alternate: true,
      ease: 'inOutSine',
      delay: stagger(300),
    });

  }, []);

  return (
    <svg
      ref={svgRef}
      className={`absolute pointer-events-none ${className}`}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circuit paths */}
      <path
        className="circuit-path"
        d="M50 50 L150 50 L150 100 L250 100"
        stroke="url(#circuit-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className="circuit-path"
        d="M50 150 L100 150 L100 200 L200 200 L200 250"
        stroke="url(#circuit-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className="circuit-path"
        d="M300 50 L300 120 L350 120 L350 200"
        stroke="url(#circuit-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className="circuit-path"
        d="M250 100 L250 180 L320 180"
        stroke="url(#circuit-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Circuit nodes (connection points) */}
      <circle className="circuit-node" cx="50" cy="50" r="4" fill="hsl(24, 95%, 53%)" />
      <circle className="circuit-node" cx="150" cy="50" r="3" fill="hsl(24, 95%, 53%)" />
      <circle className="circuit-node" cx="150" cy="100" r="3" fill="hsl(24, 95%, 53%)" />
      <circle className="circuit-node" cx="250" cy="100" r="4" fill="hsl(24, 95%, 53%)" />
      <circle className="circuit-node" cx="50" cy="150" r="4" fill="hsl(24, 95%, 53%)" />
      <circle className="circuit-node" cx="100" cy="200" r="3" fill="hsl(24, 95%, 53%)" />
      <circle className="circuit-node" cx="200" cy="200" r="3" fill="hsl(24, 95%, 53%)" />
      <circle className="circuit-node" cx="200" cy="250" r="4" fill="hsl(24, 95%, 53%)" />
      <circle className="circuit-node" cx="300" cy="50" r="4" fill="hsl(24, 95%, 53%)" />
      <circle className="circuit-node" cx="350" cy="120" r="3" fill="hsl(24, 95%, 53%)" />
      <circle className="circuit-node" cx="350" cy="200" r="4" fill="hsl(24, 95%, 53%)" />
      <circle className="circuit-node" cx="320" cy="180" r="4" fill="hsl(24, 95%, 53%)" />

      {/* Gradient definition */}
      <defs>
        <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(24, 95%, 53%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(28, 90%, 58%)" stopOpacity="0.3" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default AnimatedCircuitLines;
