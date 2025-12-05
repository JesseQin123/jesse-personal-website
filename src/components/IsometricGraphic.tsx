const IsometricGraphic = () => {
  return (
    <div className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]">
      {/* Grid lines background */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 500 500">
        {/* Curved grid lines */}
        {[...Array(8)].map((_, i) => (
          <ellipse
            key={`h-${i}`}
            cx="250"
            cy={150 + i * 40}
            rx={200 - i * 15}
            ry={80 - i * 6}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            style={{ transform: `rotate(-10deg)`, transformOrigin: 'center' }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <line
            key={`v-${i}`}
            x1={80 + i * 30}
            y1="50"
            x2={120 + i * 25}
            y2="450"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        ))}
      </svg>

      {/* Main isometric shape with gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float">
        <div className="relative">
          {/* Shadow layers */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-2xl border border-muted-foreground/10"
              style={{
                width: '180px',
                height: '120px',
                transform: `perspective(1000px) rotateX(55deg) rotateZ(-45deg) translateZ(${-i * 12}px)`,
                opacity: 0.1 + i * 0.05,
              }}
            />
          ))}
          
          {/* Main gradient shape */}
          <div
            className="relative rounded-2xl hero-gradient shadow-2xl"
            style={{
              width: '180px',
              height: '120px',
              transform: 'perspective(1000px) rotateX(55deg) rotateZ(-45deg)',
            }}
          >
            {/* Inner glow lines */}
            <div className="absolute inset-2 rounded-xl border border-primary-foreground/30" />
            <div className="absolute inset-4 rounded-lg border border-primary-foreground/20" />
            <div className="absolute inset-6 rounded-md border border-primary-foreground/10" />
          </div>
        </div>
      </div>

      {/* Decorative dots */}
      <div className="absolute top-20 right-20 w-2 h-2 rounded-full bg-gradient-pink animate-pulse-slow" />
      <div className="absolute bottom-32 left-16 w-3 h-3 rounded-full bg-gradient-green animate-pulse-slow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-40 left-24 w-2 h-2 rounded-full bg-gradient-yellow animate-pulse-slow" style={{ animationDelay: '2s' }} />
    </div>
  );
};

export default IsometricGraphic;
