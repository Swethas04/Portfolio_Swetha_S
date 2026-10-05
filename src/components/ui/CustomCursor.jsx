import { useEffect, useRef, useState } from 'react';

/**
 * High-Speed Celestial Constellation Star Cursor
 * - Fast, lag-free direct position tracking with smooth micro-lerp
 * - 4-Point Constellation North Star with sparkling core
 * - Elegant stardust satellites trailing closely with zero visual lag
 * - NO dashed circle ring
 */
export default function CustomCursor() {
  const mainStarRef = useRef(null);
  const spark1Ref = useRef(null);
  const spark2Ref = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let starX = -100;
    let starY = -100;
    let trail1X = -100;
    let trail1Y = -100;
    let trail2X = -100;
    let trail2Y = -100;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);
    };

    const onMouseDown = () => setClicking(true);
    const onMouseUp = () => setClicking(false);

    const onMouseOver = (e) => {
      if (
        e.target.closest('a, button, [role="button"], input, textarea, select, label, .card, .card-3d-panel, .clickable')
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const animate = () => {
      // Ultra-fast responsive tracking (zero perceptible lag)
      starX += (mouseX - starX) * 0.85;
      starY += (mouseY - starY) * 0.85;

      trail1X += (mouseX - trail1X) * 0.55;
      trail1Y += (mouseY - trail1Y) * 0.55;

      trail2X += (mouseX - trail2X) * 0.38;
      trail2Y += (mouseY - trail2Y) * 0.38;

      if (mainStarRef.current) {
        mainStarRef.current.style.transform = `translate3d(${starX}px, ${starY}px, 0) scale(${clicking ? 0.75 : hovering ? 1.35 : 1})`;
      }

      if (spark1Ref.current) {
        spark1Ref.current.style.transform = `translate3d(${trail1X}px, ${trail1Y}px, 0) scale(${hovering ? 1.2 : 1})`;
      }

      if (spark2Ref.current) {
        spark2Ref.current.style.transform = `translate3d(${trail2X}px, ${trail2Y}px, 0)`;
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
  }, [visible, hovering, clicking]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Trailing Stardust Sparkle 2 */}
      <div
        ref={spark2Ref}
        className={`fixed top-0 left-0 pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 ${
          visible ? 'opacity-80' : 'opacity-0'
        }`}
        aria-hidden="true"
        style={{ willChange: 'transform' }}
      >
        <div className="w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-pink-500 dark:bg-pink-300 shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
      </div>

      {/* Trailing Stardust Sparkle 1 */}
      <div
        ref={spark1Ref}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 ${
          visible ? 'opacity-90' : 'opacity-0'
        }`}
        aria-hidden="true"
        style={{ willChange: 'transform' }}
      >
        <div className="w-2 h-2 -ml-1 -mt-1 rounded-full bg-amber-500 dark:bg-yellow-200 shadow-[0_0_10px_rgba(250,204,21,0.9)]" />
      </div>

      {/* Central 4-Point Constellation Star (Fast North Star) */}
      <div
        ref={mainStarRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
        style={{ willChange: 'transform' }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 -ml-3 -mt-3 text-purple-700 dark:text-fuchsia-200 drop-shadow-[0_0_10px_rgba(192,132,252,0.95)] fill-current transition-transform duration-100"
        >
          {/* 4-Point Constellation Star */}
          <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
          {/* Inner sparkling bright core */}
          <circle cx="12" cy="12" r="2.2" className="text-white fill-current" />
        </svg>
      </div>
    </>
  );
}


