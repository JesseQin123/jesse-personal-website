import { useEffect, useRef } from 'react';
import { animate, svg, createTimeline, utils } from 'animejs';
import { prefersReducedMotion } from '@/animations/constants';

const { createDrawable, createMotionPath } = svg;
const { stagger } = utils;

interface DataFlowAnimationProps {
  className?: string;
}

const DataFlowAnimation = ({ className = '' }: DataFlowAnimationProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!svgRef.current || hasAnimated.current) return;
    if (prefersReducedMotion()) {
      const allElements = svgRef.current.querySelectorAll('.flow-node, .flow-line');
      allElements.forEach(el => {
        (el as HTMLElement).style.opacity = '1';
      });
      return;
    }

    hasAnimated.current = true;

    const nodes = svgRef.current.querySelectorAll('.flow-node');
    const lines = svgRef.current.querySelectorAll('.flow-line');
    const dataPackets = svgRef.current.querySelectorAll('.data-packet');
    const flowPath = svgRef.current.querySelector('.flow-path') as SVGGeometryElement;

    // Create drawables for lines
    const drawables = createDrawable(lines, 0, 0);

    const tl = createTimeline({
      defaults: {
        ease: 'outExpo',
      },
    });

    // Nodes appear with scale animation
    tl.add(nodes, {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(100),
      ease: 'outBack',
    }, 0);

    // Lines draw
    tl.add(drawables, {
      draw: ['0 0', '0 1'],
      duration: 600,
      delay: stagger(80),
    }, 300);

    // After initial animation, start data packet flow
    setTimeout(() => {
      if (flowPath) {
        const motionPath = createMotionPath(flowPath);
        if (motionPath) {
          dataPackets.forEach((packet, index) => {
            animate(packet, {
              ...motionPath,
              duration: 3000,
              loop: true,
              delay: index * 600,
              ease: 'linear',
            });

            // Pulsing effect on packets
            animate(packet, {
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8],
              duration: 1500,
              loop: true,
              delay: index * 200,
              ease: 'inOutSine',
            });
          });
        }
      }

      // Nodes glow effect
      animate(nodes, {
        opacity: [0.7, 1, 0.7],
        duration: 2500,
        loop: true,
        delay: stagger(200),
        ease: 'inOutSine',
      });
    }, 1200);

  }, []);

  return (
    <svg
      ref={svgRef}
      className={`pointer-events-none ${className}`}
      viewBox="0 0 400 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(24, 95%, 53%)" stopOpacity="0.2" />
          <stop offset="50%" stopColor="hsl(24, 95%, 53%)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="hsl(28, 90%, 58%)" stopOpacity="0.2" />
        </linearGradient>
        <filter id="flow-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Main flow path (invisible, for motion path) */}
      <path
        className="flow-path"
        d="M40,100 Q100,40 160,100 T280,100 T360,100"
        stroke="none"
        fill="none"
      />

      {/* Visible connection lines */}
      <path
        className="flow-line"
        d="M60,100 L140,100"
        stroke="url(#flow-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className="flow-line"
        d="M180,100 L260,100"
        stroke="url(#flow-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        className="flow-line"
        d="M300,100 L360,100"
        stroke="url(#flow-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Branch lines */}
      <path
        className="flow-line"
        d="M160,100 L160,50 L220,50"
        stroke="url(#flow-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        className="flow-line"
        d="M160,100 L160,150 L220,150"
        stroke="url(#flow-gradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Main nodes */}
      <g className="flow-node" style={{ transformOrigin: '40px 100px' }}>
        <circle cx="40" cy="100" r="20" fill="hsl(24, 95%, 53%)" opacity="0.15" />
        <circle cx="40" cy="100" r="12" fill="hsl(24, 95%, 53%)" filter="url(#flow-glow)" />
        <text x="40" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">IN</text>
      </g>

      <g className="flow-node" style={{ transformOrigin: '160px 100px' }}>
        <circle cx="160" cy="100" r="22" fill="hsl(24, 95%, 53%)" opacity="0.15" />
        <circle cx="160" cy="100" r="14" fill="hsl(24, 95%, 53%)" filter="url(#flow-glow)" />
        <text x="160" y="105" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">AI</text>
      </g>

      <g className="flow-node" style={{ transformOrigin: '280px 100px' }}>
        <circle cx="280" cy="100" r="20" fill="hsl(24, 95%, 53%)" opacity="0.15" />
        <circle cx="280" cy="100" r="12" fill="hsl(24, 95%, 53%)" filter="url(#flow-glow)" />
      </g>

      <g className="flow-node" style={{ transformOrigin: '380px 100px' }}>
        <circle cx="380" cy="100" r="22" fill="hsl(24, 95%, 53%)" opacity="0.15" />
        <circle cx="380" cy="100" r="14" fill="hsl(24, 95%, 53%)" filter="url(#flow-glow)" />
        <text x="380" y="105" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">OUT</text>
      </g>

      {/* Branch nodes */}
      <g className="flow-node" style={{ transformOrigin: '240px 50px' }}>
        <circle cx="240" cy="50" r="15" fill="hsl(24, 95%, 53%)" opacity="0.15" />
        <circle cx="240" cy="50" r="8" fill="hsl(24, 95%, 53%)" filter="url(#flow-glow)" />
      </g>

      <g className="flow-node" style={{ transformOrigin: '240px 150px' }}>
        <circle cx="240" cy="150" r="15" fill="hsl(24, 95%, 53%)" opacity="0.15" />
        <circle cx="240" cy="150" r="8" fill="hsl(24, 95%, 53%)" filter="url(#flow-glow)" />
      </g>

      {/* Data packets */}
      <circle className="data-packet" r="5" fill="hsl(24, 100%, 65%)" opacity="0" />
      <circle className="data-packet" r="4" fill="hsl(28, 100%, 70%)" opacity="0" />
      <circle className="data-packet" r="5" fill="hsl(24, 100%, 65%)" opacity="0" />
    </svg>
  );
};

export default DataFlowAnimation;
