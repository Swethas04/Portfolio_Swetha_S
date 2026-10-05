import { useRef, useState } from 'react';

/**
 * 3D Holographic Floating Card Component
 * Provides authentic 3D spatial perspective tilt, specular glass reflection sheen,
 * rim illumination, and cursor-responsive dynamic lighting.
 */
export default function Card3D({
  children,
  className = '',
  depth = 25,
  glowColor = 'rgba(139, 92, 246, 0.25)',
  onClick,
  style = {},
  ...props
}) {
  const cardRef = useRef(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-12deg to +12deg max)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotX(rotateX);
    setRotY(rotateY);

    // Glare position percentage
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: 0.65 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
    setGlarePos((p) => ({ ...p, opacity: 0 }));
  };

  return (
    <div
      className="perspective-1200 w-full h-full"
      style={{ perspective: '1200px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={`card-3d-panel relative transition-all duration-200 ease-out will-change-transform ${className}`}
        style={{
          transform: isHovered
            ? `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${depth}px)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `0 25px 50px -12px ${glowColor}, 0 0 25px 2px rgba(102, 119, 255, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.2)`
            : undefined,
          ...style,
        }}
        {...props}
      >
        {/* Dynamic Holographic Specular Glare Layer */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.15) 0%, rgba(139, 92, 246, 0.12) 40%, transparent 80%)`,
            opacity: glarePos.opacity,
          }}
          aria-hidden="true"
        />

        {/* Ambient 3D Rim Light Edge */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 border border-purple-200/50 dark:border-purple-400/20 transition-colors duration-300"
          aria-hidden="true"
        />

        {/* Inner Content with 3D Depth Layering */}
        <div
          className="relative z-10 w-full h-full"
          style={{ transform: isHovered ? 'translateZ(12px)' : 'translateZ(0px)', transition: 'transform 0.2s ease-out' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
