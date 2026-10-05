import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Magical Celestial Cosmic Constellation WebGL Scene
 * Tailored to match the moonlit fairy-light aesthetic of the anime pfp:
 * - Deep midnight violet & starry twilight
 * - Warm ambient glow lamps & lavender fairy light constellations
 * - Responsive to both Dark and Light theme toggling
 */
export default function CosmicCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isDark = () => document.documentElement.classList.contains('dark');

    // --- Scene, Camera, Renderer Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(isDark() ? 0x06020c : 0xf3e8ff, 0.0016);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2500
    );
    camera.position.set(0, 0, 800);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(isDark() ? 0x06020c : 0xf5f0fb, 1);
    container.appendChild(renderer.domElement);

    // --- Lighting (Dreamy Lavender Moon Glow & Subtle Pink-Purple Fairylight) ---
    const ambientLight = new THREE.AmbientLight(isDark() ? 0x1f0a33 : 0xe9d5ff, isDark() ? 2.0 : 2.5);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0xf5d0fe, 2.4);
    moonLight.position.set(300, 700, 450);
    scene.add(moonLight);

    const fairyVioletLight = new THREE.PointLight(0xd8b4fe, 4.2, 1400);
    fairyVioletLight.position.set(-450, -180, 250);
    scene.add(fairyVioletLight);

    const warmStarLight = new THREE.PointLight(0xf472b6, 2.5, 950); // Dreamy pink-purple glow from anime pfp
    warmStarLight.position.set(450, -350, 200);
    scene.add(warmStarLight);

    // Cursor Follower Point Light in 3D (Subtle soft lavender glow)
    const cursorLight = new THREE.PointLight(0xe879f9, 3.8, 700);
    cursorLight.position.set(0, 0, 400);
    scene.add(cursorLight);

    // --- 1. Magical Starfield (Rich violet, soft lavender, starry lilac) ---
    const starCount = 3200;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    const darkPalette = [
      new THREE.Color('#ffffff'),
      new THREE.Color('#faf5ff'),
      new THREE.Color('#f5d0fe'),
      new THREE.Color('#e879f9'),
      new THREE.Color('#d8b4fe'),
      new THREE.Color('#c084fc'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#f472b6'),
    ];

    const lightPalette = [
      new THREE.Color('#9333ea'),
      new THREE.Color('#c084fc'),
      new THREE.Color('#a855f7'),
      new THREE.Color('#d946ef'),
      new THREE.Color('#7e22ce'),
    ];

    const palette = isDark() ? darkPalette : lightPalette;

    for (let i = 0; i < starCount; i++) {
      const idx = i * 3;
      starPositions[idx] = (Math.random() - 0.5) * 2600;
      starPositions[idx + 1] = (Math.random() - 0.5) * 2600;
      starPositions[idx + 2] = (Math.random() - 0.5) * 2200 - 150;

      const col = palette[Math.floor(Math.random() * palette.length)];
      starColors[idx] = col.r;
      starColors[idx + 1] = col.g;
      starColors[idx + 2] = col.b;

      starSizes[i] = Math.random() * 3.2 + 0.9;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const createStarTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.25, 'rgba(245, 208, 254, 0.95)');
      grad.addColorStop(0.55, 'rgba(216, 180, 254, 0.45)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const starTexture = createStarTexture();

    const starMat = new THREE.PointsMaterial({
      size: 4.5,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: isDark() ? 0.95 : 0.65,
      blending: isDark() ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);

    // --- 2. Celestial Constellation Nodes & Connecting Threads ---
    const nodeCount = 95;
    const nodeGeo = new THREE.BufferGeometry();
    const nodePos = new Float32Array(nodeCount * 3);
    const nodeVel = [];
    const nodeOriginals = [];

    for (let i = 0; i < nodeCount; i++) {
      const idx = i * 3;
      const x = (Math.random() - 0.5) * 1600;
      const y = (Math.random() - 0.5) * 1600;
      const z = (Math.random() - 0.5) * 1000 + 100;
      nodePos[idx] = x;
      nodePos[idx + 1] = y;
      nodePos[idx + 2] = z;

      nodeOriginals.push(new THREE.Vector3(x, y, z));
      nodeVel.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.4,
          (Math.random() - 0.5) * 0.3
        )
      );
    }

    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePos, 3));

    const nodeMat = new THREE.PointsMaterial({
      size: 9.5,
      map: starTexture,
      color: new THREE.Color(isDark() ? '#faf5ff' : '#9333ea'),
      transparent: true,
      opacity: 0.95,
      blending: isDark() ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
    });

    const constellationPoints = new THREE.Points(nodeGeo, nodeMat);
    scene.add(constellationPoints);

    // Glowing mesh lines for constellation connections
    const maxLines = 450;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: isDark() ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false,
      linewidth: 1,
    });

    const constellationLines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(constellationLines);

    // --- 3. Floating 3D Geometric Crystals & Moons ---
    const floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    const geoTypes = [
      new THREE.IcosahedronGeometry(22, 0),
      new THREE.OctahedronGeometry(18, 0),
      new THREE.TetrahedronGeometry(16, 0),
      new THREE.DodecahedronGeometry(20, 0),
      new THREE.TorusGeometry(18, 2.5, 12, 24),
    ];

    const crystalMeshes = [];
    for (let i = 0; i < 28; i++) {
      const geo = geoTypes[Math.floor(Math.random() * geoTypes.length)];
      
      const wireMat = new THREE.MeshBasicMaterial({
        color: isDark() ? (Math.random() > 0.5 ? 0xf5d0fe : 0xd8b4fe) : 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: isDark() ? 0.45 : 0.3,
      });
      const wireMesh = new THREE.Mesh(geo, wireMat);

      const coreMat = new THREE.MeshPhysicalMaterial({
        color: isDark() ? 0x160728 : 0xf5f3ff,
        emissive: isDark() ? 0x581c87 : 0xd8b4fe,
        emissiveIntensity: isDark() ? 0.65 : 0.2,
        roughness: 0.1,
        metalness: 0.8,
        transmission: 0.85,
        ior: 1.5,
        transparent: true,
        opacity: 0.7,
      });
      const coreMesh = new THREE.Mesh(geo, coreMat);

      const itemGroup = new THREE.Group();
      itemGroup.add(wireMesh);
      itemGroup.add(coreMesh);

      const scale = Math.random() * 1.5 + 0.6;
      itemGroup.scale.set(scale, scale, scale);

      itemGroup.position.set(
        (Math.random() - 0.5) * 1800,
        (Math.random() - 0.5) * 1800,
        (Math.random() - 0.5) * 1000 + 50
      );

      const rotSpeed = {
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.01,
      };

      crystalMeshes.push({ group: itemGroup, rotSpeed, basePos: itemGroup.position.clone() });
      floatingGroup.add(itemGroup);
    }

    // --- Interaction & Physics State ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, worldPos: new THREE.Vector3() };
    const scroll = { target: 0, current: 0 };
    let clock = new THREE.Clock();

    const onMouseMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

      const vector = new THREE.Vector3(mouse.targetX, mouse.targetY, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z + 400;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));
      mouse.worldPos.copy(pos);
      cursorLight.position.set(pos.x, pos.y, pos.z + 50);
    };

    const onScroll = () => {
      scroll.target = window.scrollY;
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Watch for theme changes on the html tag
    const observer = new MutationObserver(() => {
      const dark = isDark();
      renderer.setClearColor(dark ? 0x06020c : 0xf5f0fb, 1);
      scene.fog.color.setHex(dark ? 0x06020c : 0xf3e8ff);
      ambientLight.color.setHex(dark ? 0x1f0a33 : 0xe9d5ff);
      nodeMat.color.set(dark ? '#faf5ff' : '#9333ea');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    // --- Render Loop ---
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;
      scroll.current += (scroll.target - scroll.current) * 0.07;

      const scrollFactor = scroll.current * 0.35;
      camera.position.x = mouse.x * 90;
      camera.position.y = -mouse.y * 70 - (scrollFactor % 800) * 0.5;
      camera.position.z = 800 - Math.sin((scrollFactor * 0.002)) * 120;
      camera.lookAt(mouse.x * 20, -mouse.y * 20 - (scrollFactor % 800) * 0.5, 0);

      starPoints.rotation.y = elapsed * 0.012;
      starPoints.rotation.x = elapsed * 0.006;

      const posAttr = nodeGeo.attributes.position;
      const linePosAttr = lineGeo.attributes.position;
      const lineColAttr = lineGeo.attributes.color;
      let lineIndex = 0;

      for (let i = 0; i < nodeCount; i++) {
        const idx = i * 3;
        let nx = posAttr.array[idx];
        let ny = posAttr.array[idx + 1];
        let nz = posAttr.array[idx + 2];

        nx += nodeVel[i].x;
        ny += nodeVel[i].y;
        nz += nodeVel[i].z;

        const orig = nodeOriginals[i];
        if (Math.abs(nx - orig.x) > 100) nodeVel[i].x *= -1;
        if (Math.abs(ny - orig.y) > 100) nodeVel[i].y *= -1;
        if (Math.abs(nz - orig.z) > 80) nodeVel[i].z *= -1;

        const dx = mouse.worldPos.x - nx;
        const dy = mouse.worldPos.y - ny;
        const dz = mouse.worldPos.z - nz;
        const distToMouse = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distToMouse < 280) {
          const force = (1 - distToMouse / 280) * 2.5;
          nx += (dx / distToMouse) * force;
          ny += (dy / distToMouse) * force;
          nz += (dz / distToMouse) * force;
        }

        posAttr.array[idx] = nx;
        posAttr.array[idx + 1] = ny;
        posAttr.array[idx + 2] = nz;
      }
      posAttr.needsUpdate = true;

      const maxConnectDist = 180;
      for (let i = 0; i < nodeCount && lineIndex < maxLines; i++) {
        const i3 = i * 3;
        const x1 = posAttr.array[i3];
        const y1 = posAttr.array[i3 + 1];
        const z1 = posAttr.array[i3 + 2];

        for (let j = i + 1; j < nodeCount && lineIndex < maxLines; j++) {
          const j3 = j * 3;
          const x2 = posAttr.array[j3];
          const y2 = posAttr.array[j3 + 1];
          const z2 = posAttr.array[j3 + 2];

          const ddx = x1 - x2;
          const ddy = y1 - y2;
          const ddz = z1 - z2;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz);

          if (dist < maxConnectDist) {
            const pIdx = lineIndex * 6;
            linePosAttr.array[pIdx] = x1;
            linePosAttr.array[pIdx + 1] = y1;
            linePosAttr.array[pIdx + 2] = z1;
            linePosAttr.array[pIdx + 3] = x2;
            linePosAttr.array[pIdx + 4] = y2;
            linePosAttr.array[pIdx + 5] = z2;

            const alpha = 1 - dist / maxConnectDist;
            const r = 0.75 + alpha * 0.25;
            const g = 0.45 + alpha * 0.35;
            const b = 0.98;

            for (let k = 0; k < 6; k += 3) {
              lineColAttr.array[pIdx + k] = r * alpha;
              lineColAttr.array[pIdx + k + 1] = g * alpha;
              lineColAttr.array[pIdx + k + 2] = b * alpha;
            }

            lineIndex++;
          }
        }
      }

      for (let k = lineIndex * 6; k < maxLines * 6; k++) {
        linePosAttr.array[k] = 0;
        lineColAttr.array[k] = 0;
      }
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      crystalMeshes.forEach(({ group, rotSpeed, basePos }, i) => {
        group.rotation.x += rotSpeed.x;
        group.rotation.y += rotSpeed.y;
        group.rotation.z += rotSpeed.z;

        group.position.y = basePos.y + Math.sin(elapsed * 1.2 + i) * 18;
        group.position.x = basePos.x + Math.cos(elapsed * 0.8 + i) * 12;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#f5f0fb] dark:bg-[#06020c] transition-colors duration-300"
      aria-hidden="true"
    />
  );
}

