import { useEffect, useRef, useState } from 'react';
import soundCtrl from '../utils/SoundController';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device is mobile on mount & resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    // Scroll metrics
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let targetVelocity = 0;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    // Throttle mousemove for performance
    let lastMouseMove = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseMove > 16) { // ~60fps throttle
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
        lastMouseMove = now;
      }
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = Math.abs(currentScrollY - lastScrollY);
      targetVelocity = Math.min(diff, 100); // Clamp max velocity
      lastScrollY = currentScrollY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize particles (limited count for 60fps)
    const particleCount = Math.min(Math.floor((width * height) / 25000), 60);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
      });
    }

    // Smooth mouse interpolation
    const updateMouse = () => {
      if (mouse.targetX === -1000) {
        mouse.x = -1000;
        mouse.y = -1000;
      } else {
        mouse.x += (mouse.targetX - mouse.x) * 0.1;
        mouse.y += (mouse.targetY - mouse.y) * 0.1;
      }
    };

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      updateMouse();

      // Interpolate and decay scroll velocity
      scrollVelocity += (targetVelocity - scrollVelocity) * 0.1;
      targetVelocity *= 0.88;

      // Update background ambient synthesizer with scroll speed
      soundCtrl.updateAmbientFilter(scrollVelocity);

      const speedMult = 1 + scrollVelocity * 0.18;

      // Update and draw particles
      particles.forEach((p, i) => {
        // Move particles faster based on scroll speed, and drift upwards on scroll down
        p.x += p.vx * speedMult;
        p.y += (p.vy * speedMult) - (scrollVelocity * 0.3);

        // Wrapping boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse influence (slight push away)
        if (mouse.x !== -1000) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 1.5;
            p.y += (dy / dist) * force * 1.5;
          }
        }

        // Warp speed stretch rendering
        if (scrollVelocity > 1.5) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          // Tail stretches backward along vertical scroll and particle velocity
          const tailX = p.x - p.vx * scrollVelocity * 0.6;
          const tailY = p.y - (p.vy - 0.3) * scrollVelocity * 0.6;
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = `rgba(0, 175, 202, ${0.15 + (scrollVelocity / 100) * 0.35})`;
          ctx.lineWidth = p.radius * 0.8;
          ctx.stroke();
        } else {
          // Standard soft floating circular particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 175, 202, 0.4)';
          ctx.fill();
        }

        // Draw lines between close particles (only when moving slow for visual clean layout)
        if (scrollVelocity <= 1.5) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 100) {
              const alpha = (100 - dist) / 100 * 0.12 * (1 - scrollVelocity / 1.5);
              if (alpha > 0) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(0, 175, 202, ${alpha})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  // Return static background on mobile, canvas on desktop
  if (isMobile) {
    return (
      <div className="absolute inset-0 bg-slate-950 pointer-events-none z-0" />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-slate-950"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
