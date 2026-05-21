import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import soundCtrl from '../utils/SoundController';
import KazakhFlag3D from './KazakhFlag3D';

const loadingLogs = [
  "SYSTEM: Booting Global Competences platform...",
  "CONNECTING: Fetching Kazakhstan labour market analytics...",
  "ANALYZING: Processing youth NEET statistics (2019-2024)...",
  "COMPILING: Building dynamic Recharts structures...",
  "INJECTING: Initializing Interactive Sandbox physics...",
  "LOADING: Registering LocalStorage wall dependencies...",
  "CALIBRATING: Sound synthesizers and Web Audio API...",
  "READY: Platform initialization successful."
];

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([loadingLogs[0]]);

  useEffect(() => {
    const duration = 3500;
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(currentProgress);
      if (currentStep >= steps) {
        clearInterval(timer);
        // Play welcome success audio procedurally if audio context can be initialized
        // Note: browser might block, but we try anyway.
        soundCtrl.init();
        soundCtrl.success();
      }
    }, intervalTime);

    let logIdx = 0;
    // Increment logs dynamically
    const logTimer = setInterval(() => {
      const next = logIdx + 1;
      if (next < loadingLogs.length) {
        setVisibleLogs(logs => [...logs, loadingLogs[next]]);
        logIdx = next;
      }
    }, 400);

    return () => {
      clearInterval(timer);
      clearInterval(logTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060813] overflow-hidden"
    >
      {/* Premium ambient glow background */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <motion.div
          animate={{
            x: ['-10%', '10%', '-10%'],
            y: ['-10%', '10%', '-10%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-gradient-to-br from-[#00AFCA] via-transparent to-[#FEC105] blur-3xl opacity-30"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-lg px-6">
        {/* Interactive 3D Kazakh Flag Loader */}
        <div className="mb-6 flex items-center justify-center">
          <KazakhFlag3D />
        </div>

        {/* Matrix logs terminal container */}
        <div className="w-full bg-[#0a0d1a]/80 border border-slate-800 rounded-xl p-4 mb-6 font-mono text-left text-[11px] h-32 overflow-hidden flex flex-col justify-end shadow-inner">
          <div className="opacity-60 space-y-1">
            {visibleLogs.slice(-5).map((log, idx) => (
              <div 
                key={idx} 
                className={log.startsWith("READY") || log.startsWith("SYSTEM") ? "text-kz-yellow" : "text-slate-400"}
              >
                <span className="text-kz-blue mr-1.5">&gt;</span>
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden mb-3 relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-kz-blue to-kz-yellow"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Percentage logs */}
        <div className="flex justify-between w-full text-slate-500 text-xs font-mono">
          <span>{Math.round(progress)}% COMPLETE</span>
          <span className="animate-pulse text-kz-blue">INIT_SEQUENCE</span>
        </div>
      </div>
    </motion.div>
  );
}
