import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, BrainCircuit, Lightbulb, Target } from 'lucide-react';
import React from 'react';
import soundCtrl from '../utils/SoundController';

interface LauncherProps {
  onLaunch: (section?: string) => void;
}

const quickLinks = [
  { id: 'stats', title: 'Аналитика и графики', icon: BarChart3, color: 'from-blue-500 to-cyan-400', delay: 0.1 },
  { id: 'causes', title: 'Причины безработицы', icon: Target, color: 'from-orange-400 to-red-500', delay: 0.2 },
  { id: 'solutions', title: 'Интерактивная песочница', icon: Lightbulb, color: 'from-emerald-400 to-teal-500', delay: 0.3 },
  { id: 'quiz', title: 'Tinder-тест готовности', icon: BrainCircuit, color: 'from-purple-500 to-indigo-500', delay: 0.4 },
];

export default function Launcher({ onLaunch }: LauncherProps) {
  // 3D Tilt handler using direct DOM manipulation for maximum performance (60fps)
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (window.innerWidth < 768) return; // Disable on mobile/tablet

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate within the element
    const y = e.clientY - rect.top;  // y coordinate within the element

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const angleX = (yc - y) / 10; // Max angle ~10 degrees
    const angleY = (x - xc) / 10;

    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = `0 15px 35px rgba(0, 175, 202, 0.15)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.boxShadow = `none`;
  };

  const handleHover = () => {
    soundCtrl.hover();
  };

  const handleClick = (id: string) => {
    soundCtrl.click();
    onLaunch(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen relative flex flex-col justify-center items-center p-6 bg-[#090d16] text-white overflow-hidden"
    >
      {/* Background Ornaments / Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-kz-blue/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-kz-yellow/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        {/* Header */}
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="text-kz-yellow text-xs font-semibold tracking-wider uppercase font-display">Проект-исследование</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 font-display">
            Глобальные компетенции:<br className="hidden md:block"/> Безработица в Казахстане
          </h1>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto font-light leading-relaxed font-sans">
            Интерактивный анализ рынка труда через призму критического мышления, цифровой грамотности и концепции непрерывного обучения в эпоху автоматизации.
          </p>
        </motion.div>

        {/* Central CTA Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <button
            onClick={() => handleClick('home')}
            onMouseEnter={handleHover}
            data-magnetic
            data-cursor-text="СТАРТ"
            className="group relative px-8 py-4 bg-kz-blue text-white rounded-full font-semibold text-base overflow-hidden shadow-[0_0_30px_rgba(0,175,204,0.3)] hover:shadow-[0_0_50px_rgba(0,175,204,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-kz-blue via-[#00d0f0] to-kz-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-3 font-display">
              Запустить проект
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {quickLinks.map((link) => (
            <motion.button
              key={link.id}
              onClick={() => handleClick(link.id)}
              onMouseEnter={handleHover}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + link.delay }}
              data-cursor-text="ОТКРЫТЬ"
              className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-kz-blue/30 backdrop-blur-md text-left overflow-hidden group transition-all duration-300 flex flex-col justify-between min-h-[140px] style-card"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-br ${link.color} rounded-full blur-[40px] opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
              
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-white transition-colors mb-4">
                <link.icon className="w-5 h-5" />
              </div>
              
              <h3 className="font-semibold text-base text-slate-300 group-hover:text-white transition-colors font-display">
                {link.title}
              </h3>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 text-slate-600 text-xs font-light tracking-widest text-center uppercase"
      >
        Критическое мышление • Гражданственность • Непрерывное образование
      </motion.div>
    </motion.div>
  );
}
