import { useRef, useEffect, useState } from 'react';

export default function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const transforms = {
    up: visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0',
    down: visible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0',
    left: visible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0',
    right: visible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0',
    scale: visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${transforms[direction]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
