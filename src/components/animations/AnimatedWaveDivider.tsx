import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/animations/constants';

interface AnimatedWaveDividerProps {
  className?: string;
  color?: string;
  flip?: boolean;
}

const AnimatedWaveDivider = ({
  className = '',
  color = 'hsl(24, 95%, 53%)',
  flip = false
}: AnimatedWaveDividerProps) => {
  const reduceMotion = prefersReducedMotion();

  return (
    <div className={`w-full overflow-hidden ${flip ? 'rotate-180' : ''} ${className}`}>
      <svg
        className="w-full h-auto"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animation: reduceMotion ? 'none' : 'wave-shift 8s ease-in-out infinite',
        }}
      >
        <defs>
          <linearGradient id="wave-gradient-animated" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.8" />
            <stop offset="50%" stopColor={color} stopOpacity="1" />
            <stop offset="100%" stopColor={color} stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {/* Wave 1 - background */}
        <path
          d="M0,60 Q150,20 300,60 T600,60 T900,60 T1200,60 L1200,100 L0,100 Z"
          fill={color}
          opacity="0.3"
          style={{
            animation: reduceMotion ? 'none' : 'wave-move 6s ease-in-out infinite',
          }}
        />
        {/* Wave 2 - middle */}
        <path
          d="M0,50 Q150,80 300,50 T600,50 T900,50 T1200,50 L1200,100 L0,100 Z"
          fill={color}
          opacity="0.5"
          style={{
            animation: reduceMotion ? 'none' : 'wave-move 8s ease-in-out infinite reverse',
          }}
        />
        {/* Wave 3 - foreground */}
        <path
          d="M0,70 Q150,40 300,70 T600,70 T900,70 T1200,70 L1200,100 L0,100 Z"
          fill={color}
          opacity="0.8"
          style={{
            animation: reduceMotion ? 'none' : 'wave-move 10s ease-in-out infinite',
          }}
        />
      </svg>
      <style>{`
        @keyframes wave-move {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-20px);
          }
        }
        @keyframes wave-shift {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedWaveDivider;
