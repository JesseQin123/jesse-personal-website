import { useEffect, useRef } from 'react';
import { animate, svg, createTimeline, utils } from 'animejs';
import { prefersReducedMotion } from '@/animations/constants';

const { createDrawable } = svg;
const { stagger } = utils;

interface NeuralNetworkProps {
  className?: string;
}

const NeuralNetwork = ({ className = '' }: NeuralNetworkProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!svgRef.current || hasAnimated.current) return;
    if (prefersReducedMotion()) {
      // Show everything immediately for reduced motion
      const allElements = svgRef.current.querySelectorAll('.nn-node, .nn-connection');
      allElements.forEach(el => {
        (el as HTMLElement).style.opacity = '1';
      });
      return;
    }

    hasAnimated.current = true;

    const nodes = svgRef.current.querySelectorAll('.nn-node');
    const connections = svgRef.current.querySelectorAll('.nn-connection');
    const pulses = svgRef.current.querySelectorAll('.nn-pulse');

    // Create drawables for connections
    const drawables = createDrawable(connections, 0, 0);

    const tl = createTimeline({
      defaults: {
        ease: 'outExpo',
      },
    });

    // Nodes appear first with spring effect
    tl.add(nodes, {
      scale: [0, 1],
      opacity: [0, 1],
      duration: 600,
      delay: stagger(80, { from: 'center' }),
      ease: 'outBack',
    }, 0);

    // Connections draw after nodes
    tl.add(drawables, {
      draw: ['0 0', '0 1'],
      duration: 800,
      delay: stagger(50),
    }, 400);

    // After initial animation, start continuous pulse animation
    setTimeout(() => {
      // Pulse effect traveling through connections
      animate(pulses, {
        opacity: [0, 1, 0],
        strokeDashoffset: [100, -100],
        duration: 2000,
        loop: true,
        delay: stagger(300),
        ease: 'linear',
      });

      // Subtle node glow
      animate(nodes, {
        opacity: [0.8, 1, 0.8],
        duration: 2000,
        loop: true,
        delay: stagger(200, { from: 'center' }),
        ease: 'inOutSine',
      });
    }, 1500);

  }, []);

  // Neural network layout: 3 layers (input, hidden, output)
  const layers = [
    { x: 80, nodes: 4 },   // Input layer
    { x: 200, nodes: 5 },  // Hidden layer 1
    { x: 320, nodes: 4 },  // Hidden layer 2
    { x: 440, nodes: 3 },  // Output layer
  ];

  const getNodeY = (layerNodes: number, nodeIndex: number, height: number) => {
    const spacing = height / (layerNodes + 1);
    return spacing * (nodeIndex + 1);
  };

  const height = 300;

  // Generate connections between adjacent layers
  const connections: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let l = 0; l < layers.length - 1; l++) {
    const currentLayer = layers[l];
    const nextLayer = layers[l + 1];
    for (let i = 0; i < currentLayer.nodes; i++) {
      for (let j = 0; j < nextLayer.nodes; j++) {
        connections.push({
          x1: currentLayer.x,
          y1: getNodeY(currentLayer.nodes, i, height),
          x2: nextLayer.x,
          y2: getNodeY(nextLayer.nodes, j, height),
        });
      }
    }
  }

  return (
    <svg
      ref={svgRef}
      className={`pointer-events-none ${className}`}
      viewBox="0 0 520 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nn-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(24, 95%, 53%)" stopOpacity="0.3" />
          <stop offset="50%" stopColor="hsl(24, 95%, 53%)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(28, 90%, 58%)" stopOpacity="0.3" />
        </linearGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Connections */}
      {connections.map((conn, idx) => (
        <g key={`conn-${idx}`}>
          <line
            className="nn-connection"
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="url(#nn-gradient)"
            strokeWidth="1"
            opacity="0.4"
          />
          {/* Pulse effect overlay */}
          <line
            className="nn-pulse"
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="hsl(24, 95%, 53%)"
            strokeWidth="2"
            strokeDasharray="10 90"
            opacity="0"
          />
        </g>
      ))}

      {/* Nodes */}
      {layers.map((layer, layerIdx) =>
        Array.from({ length: layer.nodes }).map((_, nodeIdx) => (
          <g
            key={`node-${layerIdx}-${nodeIdx}`}
            className="nn-node"
            style={{ transformOrigin: `${layer.x}px ${getNodeY(layer.nodes, nodeIdx, height)}px` }}
          >
            {/* Outer glow */}
            <circle
              cx={layer.x}
              cy={getNodeY(layer.nodes, nodeIdx, height)}
              r={layerIdx === 0 || layerIdx === layers.length - 1 ? 12 : 10}
              fill="hsl(24, 95%, 53%)"
              opacity="0.15"
            />
            {/* Inner node */}
            <circle
              cx={layer.x}
              cy={getNodeY(layer.nodes, nodeIdx, height)}
              r={layerIdx === 0 || layerIdx === layers.length - 1 ? 6 : 5}
              fill="hsl(24, 95%, 53%)"
              filter="url(#glow)"
            />
          </g>
        ))
      )}
    </svg>
  );
};

export default NeuralNetwork;
