import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Launcher from './components/Launcher';
import MainSite from './components/MainSite';
import CustomCursor from './components/CustomCursor';
import InteractiveCanvas from './components/InteractiveCanvas';
import DevConsole from './components/DevConsole';
import soundCtrl from './utils/SoundController';
import { LanguageProvider } from './utils/LanguageContext';

export default function App() {
  const [stage, setStage] = useState<'loader' | 'launcher' | 'main'>('loader');
  const [initialSection, setInitialSection] = useState<string>('home');
  const [consoleOpen, setConsoleOpen] = useState(false);

  useEffect(() => {
    // Loader stage automatically finishes after 4 seconds
    const timer = setTimeout(() => {
      setStage('launcher');
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Global backtick key listener to open system console
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setConsoleOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLaunch = (section = 'home') => {
    // Initialize procedural audio context on user gesture
    soundCtrl.init();
    soundCtrl.click();
    setInitialSection(section);
    setStage('main');
  };

  const handleBackToLauncher = () => {
    soundCtrl.click();
    setStage('launcher');
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden">
        {/* Immersive interactive backgrounds & custom inputs */}
        <InteractiveCanvas />
        <CustomCursor />
        
        {/* CLI Developer console drawer */}
        <DevConsole isOpen={consoleOpen} onClose={() => setConsoleOpen(false)} />

        {/* Floating Console Toggle Button for Accessibility */}
        <button
          onClick={() => setConsoleOpen(prev => !prev)}
          className="fixed bottom-6 left-6 z-[90] w-10 h-10 rounded-full bg-slate-900/80 border border-white/10 text-kz-blue hover:text-white hover:border-kz-blue/50 flex items-center justify-center backdrop-blur-md transition-all shadow-lg active:scale-95 cursor-none"
          title="Toggle System Console (~)"
        >
          <span className="font-mono text-sm font-bold">&gt;_</span>
        </button>

        <AnimatePresence mode="wait">
          {stage === 'loader' && (
            <Loader key="loader" />
          )}
          {stage === 'launcher' && (
            <Launcher key="launcher" onLaunch={handleLaunch} />
          )}
          {stage === 'main' && (
            <MainSite key="main" onBack={handleBackToLauncher} initialSection={initialSection} />
          )}
        </AnimatePresence>
      </div>
    </LanguageProvider>
  );
}
