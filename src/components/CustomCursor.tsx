import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [isMobile, setIsMobile] = useState(true);

  // Position of the mouse
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring settings for smooth lagging trail
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    const checkMobile = () => {
      const isTouch = 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0;
      setIsMobile(isTouch || window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (isMobile) return () => window.removeEventListener('resize', checkMobile);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', moveCursor);

    // Set up hover event listeners for interactive items
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, [role="button"], input, select, textarea, [data-cursor-text]');
      
      if (interactiveEl) {
        setIsHovered(true);
        const customText = interactiveEl.getAttribute('data-cursor-text');
        if (customText) {
          setHoverText(customText);
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, [role="button"], input, select, textarea, [data-cursor-text]');
      if (interactiveEl) {
        setIsHovered(false);
        setHoverText('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Magnetic elements logic
    const handleMagnetic = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magneticEl = target.closest('[data-magnetic]') as HTMLElement;
      if (magneticEl) {
        const rect = magneticEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Distance from mouse to center of button
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        
        // Pull the button slightly towards the mouse
        magneticEl.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
        // Warp cursor closer to center of button
        cursorX.set(centerX + dx * 0.5);
        cursorY.set(centerY + dy * 0.5);
      }
    };

    const handleMagneticLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magneticEl = target.closest('[data-magnetic]') as HTMLElement;
      if (magneticEl) {
        magneticEl.style.transform = 'translate(0px, 0px)';
      }
    };

    document.addEventListener('mousemove', handleMagnetic);
    document.addEventListener('mouseout', handleMagneticLeave);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousemove', handleMagnetic);
      document.removeEventListener('mouseout', handleMagneticLeave);
    };
  }, [isMobile, cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-kz-blue/50 pointer-events-none z-50 mix-blend-screen flex items-center justify-center"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? (hoverText ? 2.5 : 1.5) : 1,
          backgroundColor: isHovered && !hoverText ? 'rgba(0, 175, 202, 0.15)' : 'rgba(0, 0, 0, 0)',
          borderColor: isHovered ? '#FEC105' : '#00AFCA',
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 25 }}
      >
        {hoverText && (
          <span className="text-[7px] text-kz-yellow font-bold uppercase tracking-wider font-display">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* Inner Point */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-kz-yellow rounded-full pointer-events-none z-50"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
        }}
      />
    </>
  );
}
