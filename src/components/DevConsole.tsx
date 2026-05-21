import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import soundCtrl from '../utils/SoundController';
import { useLanguage } from '../utils/LanguageContext';

interface LogEntry {
  text: string;
  type: 'info' | 'success' | 'error' | 'input' | 'warning';
}

interface DevConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DevConsole({ isOpen, onClose }: DevConsoleProps) {
  const { t } = useLanguage();
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    { text: t('console.welcome'), type: 'info' }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // States for active terminal features
  const [matrixActive, setMatrixActive] = useState(false);
  const [shanyrakActive, setShanyrakActive] = useState(false);
  const [hackingActive, setHackingActive] = useState(false);

  const consoleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);
  const shanyrakContainerRef = useRef<HTMLDivElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      soundCtrl.click();
    }
  }, [isOpen]);

  // Handle ESC or ~ to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === '`') {
        if (isOpen) {
          e.preventDefault();
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Autoscroll logs to bottom
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Matrix Code Rain Effect
  useEffect(() => {
    if (!matrixActive || !isOpen || !matrixCanvasRef.current) return;

    const canvas = matrixCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Make canvas full size of parent container
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ';
    const charArr = chars.split('');
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Drop tracking
    const drops: number[] = Array(columns).fill(1);

    let animFrameId: number;

    const draw = () => {
      // Dark semi-transparent background to create trailing fade effect
      ctx.fillStyle = 'rgba(5, 7, 15, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0'; // matrix green
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Pick random character
        const char = charArr[Math.floor(Math.random() * charArr.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        // Reset drops when they reach bottom with a random delay
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [matrixActive, isOpen]);

  // Three.js 3D Shanyrak Wireframe Effect
  useEffect(() => {
    if (!shanyrakActive || !isOpen || !shanyrakContainerRef.current || window.innerWidth < 768) return;

    const container = shanyrakContainerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 260;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.z = 12;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Construct 3D Wireframe Shanyrak
    const shanyrakGroup = new THREE.Group();

    // Custom glowing neon cyan material
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00afca,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });

    // Gold core details
    const goldMat = new THREE.MeshBasicMaterial({
      color: 0xfec105,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });

    // 3a. Main outer Ring rim
    const outerRimGeo = new THREE.TorusGeometry(3.0, 0.15, 12, 48);
    const outerRim = new THREE.Mesh(outerRimGeo, wireframeMat);
    shanyrakGroup.add(outerRim);

    // 3b. Inner parallel Ring
    const innerRimGeo = new THREE.TorusGeometry(2.7, 0.05, 8, 36);
    const innerRim = new THREE.Mesh(innerRimGeo, goldMat);
    shanyrakGroup.add(innerRim);

    // 3c. Intersecting cross arches (Kuldyreushter)
    const drawCrossbar = (start: THREE.Vector3, ctrl: THREE.Vector3, end: THREE.Vector3, mat: THREE.Material) => {
      const curve = new THREE.QuadraticBezierCurve3(start, ctrl, end);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.08, 6, false);
      const tubeMesh = new THREE.Mesh(tubeGeo, mat);
      shanyrakGroup.add(tubeMesh);
    };

    // Parallel set 1 (rotated y)
    drawCrossbar(new THREE.Vector3(-2.8, 0.5, 0), new THREE.Vector3(0, 0.5, 0.8), new THREE.Vector3(2.8, 0.5, 0), wireframeMat);
    drawCrossbar(new THREE.Vector3(-3.0, 0, 0), new THREE.Vector3(0, 0, 0.9), new THREE.Vector3(3.0, 0, 0), goldMat);
    drawCrossbar(new THREE.Vector3(-2.8, -0.5, 0), new THREE.Vector3(0, -0.5, 0.8), new THREE.Vector3(2.8, -0.5, 0), wireframeMat);

    // Parallel set 2 (perpendicular)
    drawCrossbar(new THREE.Vector3(-0.5, -2.8, 0), new THREE.Vector3(-0.5, 0, 0.8), new THREE.Vector3(-0.5, 2.8, 0), wireframeMat);
    drawCrossbar(new THREE.Vector3(0, -3.0, 0), new THREE.Vector3(0, 0, 0.9), new THREE.Vector3(0, 3.0, 0), goldMat);
    drawCrossbar(new THREE.Vector3(0.5, -2.8, 0), new THREE.Vector3(0.5, 0, 0.8), new THREE.Vector3(0.5, 2.8, 0), wireframeMat);

    scene.add(shanyrakGroup);

    // 4. Lights (even for basic wireframes, subtle ambient helps color space)
    const ambLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambLight);

    // 5. Render Loop
    let animFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Spin beautifully in multiple dimensions
      shanyrakGroup.rotation.y = elapsed * 0.45;
      shanyrakGroup.rotation.x = elapsed * 0.25;
      shanyrakGroup.rotation.z = Math.sin(elapsed * 0.1) * 0.15;

      renderer.render(scene, camera);
    };
    animate();

    // 6. Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 260;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      outerRimGeo.dispose();
      innerRimGeo.dispose();
      wireframeMat.dispose();
      goldMat.dispose();
      renderer.dispose();
    };
  }, [shanyrakActive, isOpen]);

  // Hacking Brute-force Simulation Effect
  const startHackingSimulation = () => {
    setHackingActive(true);
    soundCtrl.warning();
    let currentStep = 0;
    
    const steps: { text: string; type: LogEntry['type'] }[] = [
      { text: 'WARNING: ACCESSING PROTECTED ROOT DIRECTORIES...', type: 'warning' },
      { text: 'CONNECTING TO GOV.KZ RESILIENCE SECURITY PORTAL...', type: 'info' },
      { text: 'BYPASSING SSL CERTIFICATE PINNING...', type: 'info' },
      { text: 'DECRYPTING ALGORITHMIC SALARY SCHEMAS...', type: 'info' },
      { text: 'BRUTE FORCING SSH PASSWORDS FOR USER "ADMIN"...', type: 'warning' },
    ];

    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        setLogs(prev => [...prev, { text: step.text, type: step.type }]);
        soundCtrl.hover();
        currentStep++;
      } else {
        clearInterval(interval);
        // Start showing binary decryption loops
        let attempts = 0;
        const binaryInterval = setInterval(() => {
          if (attempts < 10) {
            const currentAttempt = attempts;
            const randomHex = Array(20).fill(0).map(() => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join(' ');
            setLogs(prev => [...prev, { text: `[HASH ATTEMPT #${currentAttempt}]: ${randomHex}`, type: 'info' }]);
            soundCtrl.hover();
            attempts++;
          } else {
            clearInterval(binaryInterval);
            soundCtrl.success();
            setLogs(prev => [
              ...prev,
              { text: '---------------------------------------------------', type: 'success' },
              { text: 'DECRYPTION COMPLETE. SYSTEM UNLOCKED: "OK-60FPS"', type: 'success' },
              { text: 'DEEP MARKET METRICS ACCESS GRANTED.', type: 'success' },
              { text: '---------------------------------------------------', type: 'success' },
            ]);
            setHackingActive(false);
          }
        }, 120);
      }
    }, 600);
  };

  // Command execution parser
  const handleCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    // Log the user command entry
    setLogs(prev => [...prev, { text: `> ${trimmed}`, type: 'input' }]);
    
    // Add to history
    const newHistory = [trimmed, ...commandHistory.filter(h => h !== trimmed)].slice(0, 50);
    setCommandHistory(newHistory);
    setHistoryIndex(-1);
    setInputVal('');

    const args = trimmed.split(' ');
    const cmd = args[0].toLowerCase();

    soundCtrl.click();

    switch (cmd) {
      case '/help':
        setLogs(prev => [
          ...prev,
          { text: 'Available CLI commands:', type: 'info' },
          { text: '  /matrix          - Toggle matrix code rain fallback', type: 'info' },
          { text: '  /hack            - Launch interactive brute-force decryption simulation', type: 'info' },
          { text: '  /shanyrak        - Toggle spinning 3D Wireframe Shanyrak WebGL scene', type: 'info' },
          { text: '  /theme [neon|gold] - Swap color theme variables (Cyberpunk / Kazakh Gold)', type: 'info' },
          { text: '  /clear           - Clear terminal logs screen', type: 'info' },
          { text: '  /exit            - Close developer console console drawer', type: 'info' }
        ]);
        break;

      case '/matrix':
        setMatrixActive(prev => {
          const next = !prev;
          setLogs(prevLogs => [...prevLogs, { 
            text: next ? 'Matrix Mode: Enabled.' : 'Matrix Mode: Disabled.', 
            type: 'success' 
          }]);
          return next;
        });
        break;

      case '/hack':
        if (hackingActive) {
          setLogs(prev => [...prev, { text: 'Already decrypting, stand by...', type: 'error' }]);
        } else {
          startHackingSimulation();
        }
        break;

      case '/shanyrak':
        if (window.innerWidth < 768) {
          setLogs(prev => [...prev, { text: 'WebGL Context disabled on mobile viewports (<768px).', type: 'error' }]);
        } else {
          setShanyrakActive(prev => {
            const next = !prev;
            setLogs(prevLogs => [...prevLogs, { 
              text: next ? '3D Wireframe Shanyrak enabled. Initializing WebGL context...' : '3D Wireframe Shanyrak disabled. Disposing WebGL context.', 
              type: 'success' 
            }]);
            return next;
          });
        }
        break;

      case '/theme': {
        const themeName = args[1]?.toLowerCase();
        if (themeName === 'neon') {
          // Set to neon cyberpunk colors
          document.documentElement.style.setProperty('--color-kz-blue', '#b500ff'); // bright magenta
          document.documentElement.style.setProperty('--color-kz-yellow', '#00ffcc'); // neon teal
          setLogs(prev => [...prev, { text: 'Theme changed to NEON CYBERPUNK. Localized state updated.', type: 'success' }]);
          soundCtrl.success();
        } else if (themeName === 'gold' || themeName === 'reset') {
          // Revert to gold colors
          document.documentElement.style.setProperty('--color-kz-blue', '#00AFCA');
          document.documentElement.style.setProperty('--color-kz-yellow', '#FEC105');
          setLogs(prev => [...prev, { text: 'Theme reset to ORIGINAL KAZAKH GOLD.', type: 'success' }]);
          soundCtrl.success();
        } else {
          setLogs(prev => [
            ...prev,
            { text: 'Error: Invalid theme choice. Use "/theme neon" or "/theme gold".', type: 'error' }
          ]);
          soundCtrl.warning();
        }
        break;
      }

      case '/clear':
        setLogs([]);
        break;

      case '/exit':
        onClose();
        break;

      default:
        setLogs(prev => [
          ...prev,
          { text: `Error: Command "${cmd}" not recognized. Type /help for assistance.`, type: 'error' }
        ]);
        soundCtrl.warning();
        break;
    }
  };

  // Command History Arrow Up/Down navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      
      const nextIdx = historyIndex + 1;
      if (nextIdx < commandHistory.length) {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const prevIdx = historyIndex - 1;
      if (prevIdx >= 0) {
        setHistoryIndex(prevIdx);
        setInputVal(commandHistory[prevIdx]);
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={consoleRef}
      className="fixed inset-x-0 top-0 h-[65vh] bg-slate-950/95 border-b border-white/10 z-[999] shadow-2xl flex flex-col font-mono text-sm overflow-hidden select-none"
    >
      {/* Absolute Matrix Canvas */}
      {matrixActive && (
        <canvas 
          ref={matrixCanvasRef} 
          className="absolute inset-0 pointer-events-none opacity-40 z-0"
        />
      )}

      {/* Floating 3D Shanyrak Canvas Panel */}
      {shanyrakActive && window.innerWidth >= 768 && (
        <div 
          ref={shanyrakContainerRef}
          className="absolute right-10 top-16 w-[260px] h-[260px] z-10 pointer-events-none rounded-2xl border border-white/5 bg-slate-950/60 backdrop-blur-md"
        />
      )}

      {/* Console Header Bar */}
      <div className="flex justify-between items-center px-6 py-3 border-b border-white/10 bg-slate-900/60 backdrop-blur-sm relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
          <span className="ml-3 font-semibold text-xs tracking-wider text-slate-400 uppercase">SYSTEM DIAGNOSTIC CONSOLE v2.0</span>
        </div>
        <button 
          onClick={onClose}
          className="text-xs text-slate-500 hover:text-white border border-white/10 hover:border-white/20 rounded px-2.5 py-1 transition-all cursor-none"
        >
          ESC / CLOSE [×]
        </button>
      </div>

      {/* Logs Display Screen */}
      <div 
        ref={logContainerRef}
        className="flex-1 overflow-y-auto px-8 py-6 space-y-2.5 z-10 relative scrollbar-thin select-text"
      >
        {logs.map((log, index) => {
          let colorClass = 'text-slate-300';
          if (log.type === 'success') colorClass = 'text-emerald-400 font-semibold';
          if (log.type === 'error') colorClass = 'text-rose-500 font-bold';
          if (log.type === 'warning') colorClass = 'text-amber-500';
          if (log.type === 'input') colorClass = 'text-kz-blue';
          
          return (
            <div key={index} className={`whitespace-pre-wrap ${colorClass}`}>
              {log.text}
            </div>
          );
        })}
      </div>

      {/* Input Command Area */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(inputVal);
        }}
        className="flex items-center gap-3 px-8 py-4 border-t border-white/10 bg-slate-900/40 relative z-10"
      >
        <span className="text-kz-blue font-bold font-mono">system@azim-awwwards:~$</span>
        <input 
          ref={inputRef}
          type="text" 
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('console.placeholder')}
          className="flex-1 bg-transparent text-white font-mono text-sm outline-none border-none placeholder-slate-600 focus:ring-0"
        />
      </form>
    </div>
  );
}
