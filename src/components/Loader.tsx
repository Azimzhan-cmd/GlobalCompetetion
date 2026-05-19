import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const loadingTexts = [
  "Анализ рынка труда...",
  "Сбор статистики занятости...",
  "Оценка глобальных компетенций...",
  "Загрузка платформы..."
];

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const duration = 3500;
    const intervalTime = 50;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    const textTimer = setInterval(() => {
      setTextIndex(prev => (prev + 1) % loadingTexts.length);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearInterval(textTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 overflow-hidden"
    >
      {/* Abstract Animated Flag Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <motion.div
          animate={{
            x: ['-5%', '5%', '-5%'],
            y: ['-5%', '5%', '-5%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-gradient-to-br from-[#00AFCA] via-transparent to-[#FEC105] blur-3xl opacity-50"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">
        {/* Flag Icon / Symbol */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-32 h-32 mb-12 relative"
        >
          <img 
            src="https://media.tenor.com/0RCgw7Qg90YAAAAM/kazakistan-kazakhstan.gif" 
            alt="Флаг Казахстана" 
            className="w-full h-full object-contain rounded-xl shadow-[0_0_30px_rgba(0,175,204,0.3)]"
          />
        </motion.div>

        {/* Dynamic Text */}
        <div className="h-8 mb-6 flex items-center justify-center">
          <motion.p
            key={textIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-kz-blue text-lg font-medium tracking-wide text-center"
          >
            {loadingTexts[textIndex]}
          </motion.p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2 relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-kz-blue to-kz-yellow"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Percentage */}
        <div className="flex justify-between w-full text-slate-400 text-sm font-mono">
          <span>{Math.round(progress)}%</span>
          <span>SYSTEM.INIT</span>
        </div>
      </div>
    </motion.div>
  );
}
