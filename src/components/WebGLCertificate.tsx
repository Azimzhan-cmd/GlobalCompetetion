import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useLanguage } from '../utils/LanguageContext';

interface WebGLCertificateProps {
  userName: string;
  score: number;
  badge: string;
  onReset: () => void;
}

export default function WebGLCertificate({ userName, score, badge, onReset }: WebGLCertificateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvas2DRef = useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLanguage();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // Detect mobile viewports to completely skip WebGL
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Helper to create the certificate high-res 2D texture canvas
  const createCertificateCanvas = useCallback((width: number, height: number): HTMLCanvasElement => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    // Background Gradient (Dark Cyberpunk Blue/Black)
    const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.7);
    bgGrad.addColorStop(0, '#0f1326');
    bgGrad.addColorStop(1, '#05070f');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Tech Circuit Border lines
    ctx.strokeStyle = 'rgba(0, 175, 202, 0.15)';
    ctx.lineWidth = 4;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(45, 45, width - 90, height - 90);

    // Decorative corner line notches
    ctx.fillStyle = '#00afca';
    const notchSize = 25;
    // Top-Left
    ctx.fillRect(40, 40, notchSize, 4);
    ctx.fillRect(40, 40, 4, notchSize);
    // Top-Right
    ctx.fillRect(width - 40 - notchSize, 40, notchSize, 4);
    ctx.fillRect(width - 40, 40, 4, notchSize);
    // Bottom-Left
    ctx.fillRect(40, height - 40, notchSize, 4);
    ctx.fillRect(40, height - 40 - notchSize, 4, notchSize);
    // Bottom-Right
    ctx.fillRect(width - 40 - notchSize, height - 40, notchSize, 4);
    ctx.fillRect(width - 40, height - 40 - notchSize, 4, notchSize);

    // Tech grid dots
    ctx.fillStyle = 'rgba(0, 175, 202, 0.1)';
    const dotSpacing = 60;
    for (let x = 80; x < width - 80; x += dotSpacing) {
      for (let y = 80; y < height - 80; y += dotSpacing) {
        ctx.fillRect(x, y, 2, 2);
      }
    }

    // Title / Institution Header
    ctx.font = 'bold 36px "Outfit", "Inter", sans-serif';
    ctx.fillStyle = '#00afca';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '6px';
    ctx.fillText(t('quiz.certTitleFull').toUpperCase(), width / 2, 110);

    // Series/ID
    ctx.font = '18px "Courier New", monospace';
    ctx.fillStyle = '#64748b';
    ctx.letterSpacing = '2px';
    ctx.fillText(`${t('quiz.seriesLabel')} 2026-KZ-${score}-${Math.random().toString(36).substr(2, 4).toUpperCase()}`, width / 2, 150);

    // Gold divider
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 180, 185);
    ctx.lineTo(width / 2 + 180, 185);
    ctx.stroke();

    // Small sparkles/stars
    ctx.fillStyle = '#d4af37';
    ctx.font = '24px "Inter"';
    ctx.fillText('✦', width / 2 - 200, 192);
    ctx.fillText('✦', width / 2 + 200, 192);

    // Document confirmation
    ctx.font = 'light 20px "Outfit", "Inter", sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.letterSpacing = '1px';
    ctx.fillText(t('quiz.certConfirm').toUpperCase(), width / 2, 245);

    // User Name (Massive, glowing effect)
    ctx.font = 'bold 52px "Outfit", "Inter", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.letterSpacing = '4px';
    // Subtle name text shadow
    ctx.shadowColor = 'rgba(0, 175, 202, 0.6)';
    ctx.shadowBlur = 15;
    ctx.fillText(userName.toUpperCase(), width / 2, 330);
    ctx.shadowBlur = 0; // reset shadow

    // Certificate body description
    ctx.font = '300 22px "Inter", sans-serif';
    ctx.fillStyle = '#cbd5e1';
    ctx.letterSpacing = '0.5px';
    const descText = `${t('quiz.certDesc')} ${score * 2}%.`;
    // Text wrapping helper
    const words = descText.split(' ');
    let line = '';
    const maxWidth = width - 200;
    const lineHeight = 35;
    let y = 405;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, width / 2, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, width / 2, y);

    // Decorative Circuit Lines at bottom
    ctx.strokeStyle = 'rgba(0, 175, 202, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, height - 120);
    ctx.lineTo(250, height - 120);
    ctx.lineTo(280, height - 90);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width - 100, height - 120);
    ctx.lineTo(width - 250, height - 120);
    ctx.lineTo(width - 280, height - 90);
    ctx.stroke();

    // Footer - Left: Status
    ctx.textAlign = 'left';
    ctx.font = '16px "Courier New", monospace';
    ctx.fillStyle = '#64748b';
    ctx.fillText(t('quiz.certStatus').toUpperCase(), 100, height - 85);
    ctx.font = 'bold 22px "Outfit", "Inter", sans-serif';
    ctx.fillStyle = '#d4af37';
    ctx.fillText(badge, 100, height - 55);

    // Footer - Right: AI Verification Code
    ctx.textAlign = 'right';
    ctx.font = '16px "Courier New", monospace';
    ctx.fillStyle = '#64748b';
    ctx.fillText(t('quiz.certLicense').toUpperCase(), width - 100, height - 85);
    ctx.font = 'bold 16px "Courier New", monospace';
    ctx.fillStyle = '#10b981';
    ctx.fillText(t('quiz.certVerified'), width - 100, height - 55);

    // Holographic stamp circle
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(width / 2, height - 80, 45, 0, Math.PI * 2);
    ctx.stroke();
    // Inner star
    ctx.fillStyle = '#d4af37';
    ctx.font = '32px "Inter"';
    ctx.textAlign = 'center';
    ctx.fillText('★', width / 2, height - 70);

    return canvas;
  }, [userName, score, badge, t]);

  // WebGL Renderer setup
  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = Math.min(width * 0.7, 500);

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070f, 0.015);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 22;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);

    // 4. Generate high-res canvas texture
    const certCanvas = createCertificateCanvas(1600, 1140);
    // Keep reference for download trigger
    canvas2DRef.current = certCanvas;

    const texture = new THREE.CanvasTexture(certCanvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;

    // 5. Plane geometry representing the card
    const geometry = new THREE.PlaneGeometry(14, 10, 64, 64);

    // 6. Holographic Premium material
    const material = new THREE.MeshPhysicalMaterial({
      map: texture,
      roughness: 0.15,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      side: THREE.DoubleSide,
      // Native Iridescence for amazing holographic reflections
      iridescence: 1.0,
      iridescenceIOR: 1.8,
      iridescenceThicknessRange: [150, 400]
    });

    const card = new THREE.Mesh(geometry, material);
    scene.add(card);

    // 7. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Moving point light for interactive shine reflections
    const shineLight = new THREE.PointLight(0x00afca, 12, 50, 0.5);
    shineLight.position.set(0, 0, 8);
    scene.add(shineLight);

    // Gold warm spot light
    const goldLight = new THREE.DirectionalLight(0xd4af37, 4);
    goldLight.position.set(5, 5, 10);
    scene.add(goldLight);

    // Blue fill light
    const blueLight = new THREE.DirectionalLight(0x0055ff, 2);
    blueLight.position.set(-8, -5, 5);
    scene.add(blueLight);

    // 8. Interaction & Animation states
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Convert to normalized coordinates (-1 to 1)
      mouse.targetX = (x / rect.width) * 2 - 1;
      mouse.targetY = -(y / rect.height) * 2 + 1;
    };

    const handleMouseLeave = () => {
      mouse.targetX = 0;
      mouse.targetY = 0;
    };

    const containerElem = containerRef.current;
    containerElem.addEventListener('mousemove', handleMouseMove);
    containerElem.addEventListener('mouseleave', handleMouseLeave);

    // Handle touch interactions
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = renderer.domElement.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        mouse.targetX = (x / rect.width) * 2 - 1;
        mouse.targetY = -(y / rect.height) * 2 + 1;
      }
    };
    containerElem.addEventListener('touchmove', handleTouchMove, { passive: true });
    containerElem.addEventListener('touchend', handleMouseLeave, { passive: true });

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse positions for absolute smoothness
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Base idle rotation + interactive mouse rotation
      card.rotation.y = Math.sin(elapsedTime * 0.4) * 0.05 + mouse.x * 0.35;
      card.rotation.x = Math.cos(elapsedTime * 0.3) * 0.03 - mouse.y * 0.25;
      card.rotation.z = Math.sin(elapsedTime * 0.2) * 0.02 + mouse.x * mouse.y * 0.05;

      // Make card float slightly
      card.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

      // Dynamic shiny light moves with mouse
      shineLight.position.x = mouse.x * 12;
      shineLight.position.y = mouse.y * 8;
      // Animate color slightly for cyberpunk vibe
      shineLight.color.setHSL((Math.sin(elapsedTime * 0.1) * 0.1 + 0.55), 0.9, 0.6);

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = Math.min(w * 0.7, 500);

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      containerElem.removeEventListener('mousemove', handleMouseMove);
      containerElem.removeEventListener('mouseleave', handleMouseLeave);
      containerElem.removeEventListener('touchmove', handleTouchMove);
      containerElem.removeEventListener('touchend', handleMouseLeave);
      
      if (containerElem.contains(renderer.domElement)) {
        containerElem.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [isMobile, userName, score, badge, t, createCertificateCanvas]);

  // Trigger high-quality certificate image download from the 2D Canvas
  const handleDownload = () => {
    if (!canvas2DRef.current) return;
    setIsDownloading(true);
    setDownloadProgress(0);

    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDownloading(false);
            
            // Create link and download
            const dataUrl = canvas2DRef.current!.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = `Certificate_${userName.replace(/\s+/g, '_')}.png`;
            link.href = dataUrl;
            link.click();
          }, 300);
          return 100;
        }
        return prev + 20;
      });
    }, 100);
  };

  // Fallback Mobile Certificate (CSS/HTML version)
  if (isMobile) {
    return (
      <div className="w-full space-y-6">
        <div className="relative w-full aspect-[1.4/1] bg-[#0c0e1a] border-8 border-[#080911] rounded-2xl p-5 flex flex-col justify-between shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,175,202,0.05),transparent)] pointer-events-none" />
          <div className="absolute inset-0 border border-white/5 rounded-lg pointer-events-none" />

          {/* Top Seal */}
          <div className="flex justify-between items-start border-b border-white/5 pb-3 z-10">
            <div>
              <h4 className="text-[9px] font-mono tracking-widest text-kz-blue uppercase">{t('quiz.certTitleFull')}</h4>
              <span className="text-[7px] font-mono text-slate-500">{t('quiz.seriesLabel')} 2026-KZ-{score}</span>
            </div>
            <div className="w-8 h-8 rounded-full border border-kz-yellow/40 flex items-center justify-center text-kz-yellow">
              <span className="text-lg">✦</span>
            </div>
          </div>

          {/* Body */}
          <div className="text-center py-2 z-10">
            <span className="text-[7px] font-mono tracking-wider text-slate-500 uppercase">{t('quiz.certConfirm')}</span>
            <h3 className="text-lg font-bold font-display text-white mt-1 mb-1.5 tracking-wide uppercase border-b border-dashed border-white/10 pb-1.5 max-w-[240px] mx-auto">
              {userName}
            </h3>
            <p className="text-[9px] text-slate-400 font-sans font-light max-w-xs mx-auto leading-relaxed">
              {t('quiz.certDesc')} <span className="text-kz-blue font-bold">{score * 2}%</span>.
            </p>
          </div>

          {/* Bottom */}
          <div className="flex justify-between items-end z-10">
            <div>
              <span className="text-[7px] font-mono text-slate-500 block">{t('quiz.certStatus')}</span>
              <span className="text-[9px] font-bold font-display text-kz-yellow uppercase tracking-wide">{badge}</span>
            </div>
            <div>
              <span className="text-[7px] font-mono text-slate-500 block">{t('quiz.certLicense')}</span>
              <span className="text-[7px] font-mono text-emerald-400">{t('quiz.certVerified')}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="dark-glass-panel rounded-2xl p-5 border border-white/5 text-center shadow-lg">
          {isDownloading ? (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-2xs font-mono text-slate-400">
                <span>{t('quiz.genPdf')}</span>
                <span>{downloadProgress}%</span>
              </div>
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-kz-blue transition-all duration-150" style={{ width: `${downloadProgress}%` }} />
              </div>
            </div>
          ) : (
            <div className="flex gap-2 justify-center">
              <button
                onClick={handleDownload}
                className="px-4 py-2.5 bg-kz-blue text-white rounded-lg font-semibold font-display text-xs flex items-center gap-1.5 hover:bg-kz-blue/90 transition-all"
              >
                <span>📥</span>
                {t('quiz.downloadBtn')}
              </button>
              <button
                onClick={onReset}
                className="px-4 py-2.5 bg-white/5 border border-white/5 hover:border-white/10 rounded-lg font-mono text-2xs hover:text-white transition-all"
              >
                {t('quiz.startOver')}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Desktop WebGL Card View
  return (
    <div className="w-full space-y-8 flex flex-col items-center">
      {/* 3D WebGL Canvas Container */}
      <div 
        ref={containerRef} 
        className="w-full relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-b from-slate-950 to-slate-900/60 cursor-grab active:cursor-grabbing hover:border-kz-blue/40 transition-colors"
        style={{ height: '380px' }}
      />
      
      {/* Dynamic 2D Canvas in memory (hidden) so we can export it */}
      <canvas ref={canvas2DRef} className="hidden" />

      {/* Control Buttons */}
      <div className="dark-glass-panel rounded-2xl p-6 border border-white/5 text-center shadow-lg w-full max-w-md">
        {isDownloading ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-mono text-slate-400">
              <span>{t('quiz.genPdf')}</span>
              <span>{downloadProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <div className="h-full bg-kz-blue transition-all duration-150" style={{ width: `${downloadProgress}%` }} />
            </div>
          </div>
        ) : (
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-kz-blue text-white rounded-xl font-semibold font-display text-sm flex items-center gap-2 hover:bg-kz-blue/90 transition-all cursor-none"
            >
              <span>📥</span>
              {t('quiz.downloadBtn')}
            </button>
            <button
              onClick={onReset}
              className="px-6 py-3 bg-white/5 border border-white/5 hover:border-white/10 rounded-xl font-mono text-xs hover:text-white transition-all cursor-none"
            >
              {t('quiz.startOver')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
