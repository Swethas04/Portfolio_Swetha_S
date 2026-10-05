import { useEffect, useRef } from 'react';

/**
 * 3D Deep Space Constellation Background
 * Full 3D particle coordinate simulation (X, Y, Z) with depth perspective,
 * geometric mesh lines, camera parallax, nebula dust, and interactive starfield.
 */
export default function InteractiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', onResize);

    // 3D Space parameters
    const FOV = 320;
    const NUM_STARS = Math.min(Math.floor((width * height) / 12000), 120);
    const stars = [];

    // Target and smoothed rotation for smooth 3D camera parallax
    const targetRot = { x: 0, y: 0 };
    const curRot = { x: 0, y: 0 };
    const mousePos = { x: -1000, y: -1000, active: false };

    class Star3D {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = (Math.random() - 0.5) * width * 1.6;
        this.y = (Math.random() - 0.5) * height * 1.6;
        this.z = init ? Math.random() * 800 + 50 : 850;
        this.vz = -(Math.random() * 0.45 + 0.35); // Slow forward warp
        this.radius = Math.random() * 1.8 + 1.2;
        this.baseColor = Math.random() > 0.4 ? 'indigo' : Math.random() > 0.5 ? 'cyan' : 'purple';
      }

      update() {
        this.z += this.vz;
        if (this.z <= 20) {
          this.reset(false);
        }
      }

      getProjection(rotX, rotY) {
        // Rotate around Y axis (horizontal mouse movement)
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const x1 = this.x * cosY - this.z * sinY;
        const z1 = this.z * cosY + this.x * sinY;

        // Rotate around X axis (vertical mouse movement)
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = this.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + this.y * sinX;

        if (z2 <= 10) return null;

        const scale = FOV / z2;
        const px = width / 2 + x1 * scale;
        const py = height / 2 + y2 * scale;
        const size = Math.max(0.4, this.radius * scale * 0.9);
        const alpha = Math.min(1, Math.max(0.08, (1 - z2 / 900) * 1.1));

        return { px, py, z: z2, size, alpha, color: this.baseColor };
      }
    }

    for (let i = 0; i < NUM_STARS; i++) {
      stars.push(new Star3D());
    }

    const onMouseMove = (e) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      mousePos.active = true;

      // Calculate camera tilt based on mouse position relative to center
      const nx = (e.clientX - width / 2) / (width / 2);
      const ny = (e.clientY - height / 2) / (height / 2);
      targetRot.y = nx * 0.22;
      targetRot.x = -ny * 0.18;
    };

    const onMouseLeave = () => {
      mousePos.active = false;
      targetRot.x = 0;
      targetRot.y = 0;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      // Smooth camera interpolation
      curRot.x += (targetRot.x - curRot.x) * 0.05;
      curRot.y += (targetRot.y - curRot.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Deep Black Space Ambient Background with subtle 3D glowing nebulas
      const projected = [];

      for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        const p = stars[i].getProjection(curRot.x, curRot.y);
        if (p && p.px >= -50 && p.px <= width + 50 && p.py >= -50 && p.py <= height + 50) {
          projected.push(p);
        }
      }

      // Sort by depth (far to near)
      projected.sort((a, b) => b.z - a.z);

      // 1. Draw 3D Constellation Mesh Lines
      const maxConnectDist = 135;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];

        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];

          // Only connect stars with similar 3D depth for authentic 3D structure
          const zDiff = Math.abs(p1.z - p2.z);
          if (zDiff > 160) continue;

          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const proximityFactor = 1 - dist / maxConnectDist;
            const depthFactor = Math.min(p1.alpha, p2.alpha);
            const lineAlpha = proximityFactor * depthFactor * 0.45;

            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(99, 102, 241, ${lineAlpha})`;
            ctx.lineWidth = 0.75 * proximityFactor;
            ctx.stroke();
          }
        }

        // 2. Connect to mouse interactive gravitational node
        if (mousePos.active) {
          const mdx = p1.px - mousePos.x;
          const mdy = p1.py - mousePos.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mDist < 170) {
            const mouseFactor = 1 - mDist / 170;
            const mAlpha = mouseFactor * p1.alpha * 0.7;

            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${mAlpha})`;
            ctx.lineWidth = 1.1 * mouseFactor;
            ctx.stroke();
          }
        }
      }

      // 3. Draw 3D Star Nodes & Glowing Refractions
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];

        // Star Outer Halo Glow
        const glowRadius = p.size * 3.5;
        const grad = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, glowRadius);
        const glowColor =
          p.color === 'cyan'
            ? 'rgba(56, 189, 248,'
            : p.color === 'purple'
            ? 'rgba(192, 132, 252,'
            : 'rgba(129, 140, 248,';

        grad.addColorStop(0, `${glowColor} ${p.alpha * 0.85})`);
        grad.addColorStop(0.4, `${glowColor} ${p.alpha * 0.3})`);
        grad.addColorStop(1, `${glowColor} 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.px, p.py, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Star Solid Core
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, p.alpha * 1.3)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030308]" aria-hidden="true">
      {/* 3D Nebula ambient glowing energy orbs */}
      <div className="absolute top-[-15%] left-[-10%] w-[650px] h-[650px] rounded-full bg-indigo-700/15 blur-[150px] animate-pulse-slow" />
      <div className="absolute top-[40%] right-[-15%] w-[600px] h-[600px] rounded-full bg-violet-800/15 blur-[160px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-[-15%] left-[25%] w-[700px] h-[700px] rounded-full bg-cyan-900/10 blur-[170px] animate-pulse-slow" style={{ animationDelay: '6s' }} />

      {/* 3D Interactive Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
