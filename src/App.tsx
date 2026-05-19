import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from './components/Loader';
import Launcher from './components/Launcher';
import MainSite from './components/MainSite';

export default function App() {
  const [stage, setStage] = useState<'loader' | 'launcher' | 'main'>('loader');
  const [initialSection, setInitialSection] = useState<string>('home');

  useEffect(() => {
    // Loader stage automatically finishes after 3.5 seconds
    const timer = setTimeout(() => {
      setStage('launcher');
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleLaunch = (section = 'home') => {
    setInitialSection(section);
    setStage('main');
  };

  const handleBackToLauncher = () => {
    setStage('launcher');
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
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
  );
}
