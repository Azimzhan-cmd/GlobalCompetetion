import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Helper function to draw the Kazakhstan flag on an offline Canvas
function createFlagTexture(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // 1. Turquoise background
  ctx.fillStyle = '#00B2C9';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. Draw Kazakh national ornament on the left hoist
  const ornamentX = 100; // Centered in the first 200px zone
  const unitH = 256; // 1024 / 4 = 4 units

  // Draw connecting central gold line
  ctx.fillStyle = '#FEC105';
  ctx.fillRect(ornamentX - 8, 0, 16, canvas.height);

  const drawOrnamentUnit = (c: CanvasRenderingContext2D, x: number, y: number, h: number) => {
    c.fillStyle = '#FEC105';
    c.save();
    c.translate(x, y);

    // Central diamond
    c.beginPath();
    c.moveTo(0, -h * 0.15);
    c.lineTo(h * 0.15, 0);
    c.lineTo(0, h * 0.15);
    c.lineTo(-h * 0.15, 0);
    c.closePath();
    c.fill();

    // Horn drawing helper with custom bezier curves
    // Left upper horn
    c.beginPath();
    c.moveTo(0, 0);
    c.bezierCurveTo(-h * 0.4, -h * 0.1, -h * 0.5, -h * 0.5, -h * 0.25, -h * 0.45);
    c.bezierCurveTo(-h * 0.1, -h * 0.4, -h * 0.25, -h * 0.1, 0, -h * 0.05);
    c.fill();

    // Right upper horn
    c.beginPath();
    c.moveTo(0, 0);
    c.bezierCurveTo(h * 0.4, -h * 0.1, h * 0.5, -h * 0.5, h * 0.25, -h * 0.45);
    c.bezierCurveTo(h * 0.1, -h * 0.4, h * 0.25, -h * 0.1, 0, -h * 0.05);
    c.fill();

    // Left lower horn
    c.beginPath();
    c.moveTo(0, 0);
    c.bezierCurveTo(-h * 0.4, h * 0.1, -h * 0.5, h * 0.5, -h * 0.25, h * 0.45);
    c.bezierCurveTo(-h * 0.1, h * 0.4, -h * 0.25, h * 0.1, 0, h * 0.05);
    c.fill();

    // Right lower horn
    c.beginPath();
    c.moveTo(0, 0);
    c.bezierCurveTo(h * 0.4, h * 0.1, h * 0.5, h * 0.5, h * 0.25, h * 0.45);
    c.bezierCurveTo(h * 0.1, h * 0.4, h * 0.25, h * 0.1, 0, h * 0.05);
    c.fill();

    c.restore();
  };

  // Draw 4 ornament blocks
  for (let i = 0; i < 4; i++) {
    const centerY = unitH * i + unitH / 2;
    drawOrnamentUnit(ctx, ornamentX, centerY, unitH);
  }

  // 3. Draw Golden Sun in the center (32 rays in wheat-grain style)
  const sunX = canvas.width / 2;
  const sunY = 512;
  const innerR = 150;
  const outerR = 210;

  ctx.fillStyle = '#FEC105';
  ctx.beginPath();
  ctx.arc(sunX, sunY, innerR, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 32; i++) {
    const angle = (i * Math.PI * 2) / 32;
    const nextAngle = ((i + 0.5) * Math.PI * 2) / 32;
    const midAngle = (i + 0.25) * Math.PI * 2 / 32;

    const x1 = sunX + Math.cos(angle) * innerR;
    const y1 = sunY + Math.sin(angle) * innerR;
    const x2 = sunX + Math.cos(nextAngle) * innerR;
    const y2 = sunY + Math.sin(nextAngle) * innerR;
    const xTip = sunX + Math.cos(midAngle) * outerR;
    const yTip = sunY + Math.sin(midAngle) * outerR;

    // Control points for a leafy wheat-grain curve
    const ctrlX1 = sunX + Math.cos((angle + midAngle) / 2) * (innerR + outerR) * 0.48;
    const ctrlY1 = sunY + Math.sin((angle + midAngle) / 2) * (innerR + outerR) * 0.48;
    const ctrlX2 = sunX + Math.cos((nextAngle + midAngle) / 2) * (innerR + outerR) * 0.48;
    const ctrlY2 = sunY + Math.sin((nextAngle + midAngle) / 2) * (innerR + outerR) * 0.48;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.quadraticCurveTo(ctrlX1, ctrlY1, xTip, yTip);
    ctx.quadraticCurveTo(ctrlX2, ctrlY2, x2, y2);
    ctx.closePath();
    ctx.fill();
  }

  // 4. Draw Steppe Eagle flying under the sun
  ctx.beginPath();
  ctx.moveTo(sunX, 690); // Top head center

  // Left wing top curve
  ctx.bezierCurveTo(sunX - 60, 680, sunX - 180, 710, sunX - 290, 780);
  // Left wing feathers / tips
  ctx.lineTo(sunX - 295, 800);
  ctx.lineTo(sunX - 265, 790);
  ctx.lineTo(sunX - 270, 815);
  ctx.lineTo(sunX - 240, 800);
  // Left wing bottom edge curving back
  ctx.bezierCurveTo(sunX - 160, 780, sunX - 80, 800, sunX - 24, 840);

  // Tail
  ctx.lineTo(sunX, 860);
  ctx.lineTo(sunX + 24, 840);

  // Right wing bottom edge curving out
  ctx.bezierCurveTo(sunX + 80, 800, sunX + 160, 780, sunX + 290, 800);
  // Right wing feathers / tips
  ctx.lineTo(sunX + 270, 815);
  ctx.lineTo(sunX + 265, 790);
  ctx.lineTo(sunX + 295, 800);
  ctx.lineTo(sunX + 290, 780);
  // Right wing top curve back to head
  ctx.bezierCurveTo(sunX + 180, 710, sunX + 60, 680, sunX, 690);

  ctx.closePath();
  ctx.fillStyle = '#FEC105';
  ctx.fill();

  return canvas;
}

export default function KazakhFlag3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  // Detect mobile width on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Return early if loading state or mobile width
    if (isMobile === null || isMobile) return;

    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = 360;
    const height = 240;

    // Scene setup
    const scene = new THREE.Scene();

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 3.2);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.3);
    dirLight.position.set(2, 3, 4);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0x00b2c9, 0.4);
    dirLight2.position.set(-2, -1, 2);
    scene.add(dirLight2);

    // Flagpole setup
    // Graphite metallic rod
    const poleGeom = new THREE.CylinderGeometry(0.02, 0.02, 2.8, 16);
    const poleMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.9,
      roughness: 0.15
    });
    const poleMesh = new THREE.Mesh(poleGeom, poleMat);
    poleMesh.position.set(-1.02, -0.4, 0);
    scene.add(poleMesh);

    // Gold tip sphere on pole
    const tipGeom = new THREE.SphereGeometry(0.05, 16, 16);
    const tipMat = new THREE.MeshStandardMaterial({
      color: 0xfec105,
      metalness: 0.95,
      roughness: 0.1
    });
    const tipMesh = new THREE.Mesh(tipGeom, tipMat);
    tipMesh.position.set(-1.02, 1.02, 0);
    scene.add(tipMesh);

    // Flag setup
    const flagWidth = 2.0;
    const flagHeight = 1.0;
    const flagGeom = new THREE.PlaneGeometry(flagWidth, flagHeight, 60, 30);

    // Generate flag texture from Canvas
    const canvas = createFlagTexture();
    const flagTex = new THREE.CanvasTexture(canvas);
    flagTex.colorSpace = THREE.SRGBColorSpace;

    // MeshPhysicalMaterial for premium satin cloth effect
    const flagMat = new THREE.MeshPhysicalMaterial({
      map: flagTex,
      side: THREE.DoubleSide,
      roughness: 0.38,
      metalness: 0.08,
      sheen: 1.0,
      sheenColor: new THREE.Color('#00B2C9'),
      clearcoat: 0.05,
      shadowSide: THREE.DoubleSide
    });

    const flagMesh = new THREE.Mesh(flagGeom, flagMat);
    // Align left edge of flag to pole at x = -1.0
    flagMesh.position.set(0, 0.5, 0);
    scene.add(flagMesh);

    // Hover state management
    let isHovered = false;
    let currentWind = 2.5;
    let currentAmplitude = 0.07;

    const targetWind = () => (isHovered ? 5.5 : 2.5);
    const targetAmplitude = () => (isHovered ? 0.18 : 0.07);

    // Event Handlers for hover
    const handleMouseEnter = () => {
      isHovered = true;
    };
    const handleMouseLeave = () => {
      isHovered = false;
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('touchstart', handleMouseEnter, { passive: true });
    container.addEventListener('touchend', handleMouseLeave, { passive: true });

    // Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const posAttr = flagGeom.attributes.position;
    const count = posAttr.count;

    const animate = () => {
      const time = clock.getElapsedTime();

      // Lerp wind properties
      currentWind += (targetWind() - currentWind) * 0.06;
      currentAmplitude += (targetAmplitude() - currentAmplitude) * 0.06;

      // Displace vertices on Z axis to simulate flag waving in the wind
      for (let i = 0; i < count; i++) {
        const x = posAttr.getX(i);
        const y = posAttr.getY(i);

        // Distance factor: 0 at flagpole (left edge x = -1.0) and 1 at right fly edge (x = 1.0)
        // x goes from -1.0 to 1.0 inside PlaneGeometry of width 2
        const distanceFactor = (x + flagWidth / 2) / flagWidth;

        // Wave formula: composite sine/cosine waves moving along x axis
        const wave = Math.sin(x * 2.5 - time * currentWind) * Math.cos(y * 1.5 - time * currentWind * 0.3);
        const z = wave * currentAmplitude * distanceFactor;

        posAttr.setZ(i, z);
      }

      posAttr.needsUpdate = true;
      flagGeom.computeVertexNormals();

      // Slow rotation of flag scene to give extra depth
      const hoverTilt = isHovered ? 0.2 : 0;
      flagMesh.rotation.y = THREE.MathUtils.lerp(flagMesh.rotation.y, hoverTilt, 0.05);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup function to prevent memory leaks
    return () => {
      cancelAnimationFrame(animationFrameId);

      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('touchstart', handleMouseEnter);
      container.removeEventListener('touchend', handleMouseLeave);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      flagGeom.dispose();
      flagMat.dispose();
      flagTex.dispose();

      poleGeom.dispose();
      poleMat.dispose();

      tipGeom.dispose();
      tipMat.dispose();

      renderer.dispose();
    };
  }, [isMobile]);

  // Return static container / placeholder if screen is mobile or loading
  if (isMobile) {
    // Return simple CSS/SVG waving flag for mobile (low resource requirement)
    return (
      <div className="w-48 h-32 flex items-center justify-center relative select-none">
        <svg viewBox="0 0 200 100" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(0,178,201,0.4)] animate-pulse rounded-lg border border-[#00B2C9]/20">
          <rect width="200" height="100" fill="#00B2C9" />
          <circle cx="100" cy="50" r="15" fill="#FEC105" />
          <path d="M 80 50 Q 100 65 120 50" fill="none" stroke="#FEC105" strokeWidth="2" />
        </svg>
        <span className="absolute text-[9px] text-[#00B2C9] bottom-0 font-mono tracking-wider">PREVIEW</span>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="w-[360px] h-[240px] flex items-center justify-center relative cursor-pointer filter drop-shadow-[0_10px_35px_rgba(0,178,201,0.25)] hover:drop-shadow-[0_15px_50px_rgba(0,178,201,0.45)] transition-all duration-500"
    />
  );
}
