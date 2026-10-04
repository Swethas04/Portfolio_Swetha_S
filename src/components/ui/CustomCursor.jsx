import { useEffect, useRef, useState } from 'react';

/**
 * Premium Glass Magnetic Cursor with Smooth Spring Physics and Glow Ring
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);

    const onMouseOver = (e) => {
      if (
        e.target.closest('a, button, [role="button"], input, textarea, select, label, .card, .clickable')
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    // Smooth physics loop for the trailing outer glass ring
    const animate = () => {
      // Linear interpolation (lerp) for smooth trailing
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [visible]);

  // Disable on touch screens
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Outer Glass Ring with Refraction Glow */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`rounded-full border border-indigo-500/50 dark:border-indigo-400/60 backdrop-blur-[2px] transition-all duration-300 ${
            hovering
              ? 'w-12 h-12 -ml-6 -mt-6 bg-indigo-500/15 dark:bg-indigo-400/20 scale-110 shadow-lg shadow-indigo-500/30'
              : clicking
              ? 'w-6 h-6 -ml-3 -mt-3 bg-indigo-600/30 dark:bg-indigo-400/40 scale-90'
              : 'w-8 h-8 -ml-4 -mt-4 bg-indigo-500/5 dark:bg-white/5 shadow-md shadow-indigo-500/10'
          }`}
        />
      </div>

      {/* Inner Precision Laser Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
        style={{ willChange: 'transform' }}
      >
        <div
          className={`w-2 h-2 -ml-1 -mt-1 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 dark:from-indigo-400 dark:to-pink-400 shadow-sm transition-transform duration-150 ${
            hovering ? 'scale-0' : clicking ? 'scale-75' : 'scale-100'
          }`}
        />
      </div>
    </>
  );
}
