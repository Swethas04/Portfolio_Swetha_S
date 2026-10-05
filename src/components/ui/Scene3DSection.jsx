import { useRef, useState, useEffect } from 'react';

/**
 * 3D Spatial Container for entire sections
 * Adds cinematic depth, parallax shift, and gentle 3D tilt responding to mouse and scroll.
 */
export default function Scene3DSection({
  children,
  className = '',
  id,
  depthLevel = 0,
  ...props
}) {
  const sectionRef = useRef(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouseOffset({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`relative py-20 transition-transform duration-300 ease-out ${className}`}
      style={{
        perspective: '1500px',
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      <div
        className="relative z-10 w-full transition-transform duration-500 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * 6}px, ${mouseOffset.y * 4}px, ${depthLevel}px)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </section>
  );
}
