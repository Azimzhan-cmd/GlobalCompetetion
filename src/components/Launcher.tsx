import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, BrainCircuit, Lightbulb, Target } from 'lucide-react';

interface LauncherProps {
  onLaunch: (section?: string) => void;
}

const quickLinks = [
  { id: 'stats', title: 'Статистика и графики', icon: BarChart3, color: 'from-blue-500 to-cyan-400', delay: 0.1 },
  { id: 'causes', title: 'Причины безработицы', icon: Target, color: 'from-orange-400 to-red-500', delay: 0.2 },
  { id: 'solutions', title: 'Пути решения и компетенции', icon: Lightbulb, color: 'from-emerald-400 to-teal-500', delay: 0.3 },
  { id: 'quiz', title: 'Интерактивный тест', icon: BrainCircuit, color: 'from-purple-500 to-indigo-500', delay: 0.4 },
];

export default function Launcher({ onLaunch }: LauncherProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen relative flex flex-col justify-center items-center p-6 bg-slate-900 text-white overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-kz-blue/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-kz-yellow/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        {/* Header */}
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
            <span className="text-kz-yellow text-sm font-semibold tracking-wider uppercase">Проект-исследование</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Глобальные компетенции:<br className="hidden md:block"/> Безработица в Казахстане
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Анализ рынка труда через призму критического мышления, цифровой грамотности и непрерывного обучения в эпоху глобальных изменений.
          </p>
        </motion.div>

        {/* Central CTA */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <button
            onClick={() => onLaunch('home')}
            className="group relative px-8 py-4 bg-kz-blue text-white rounded-full font-semibold text-lg overflow-hidden shadow-[0_0_40px_rgba(0,175,204,0.4)] hover:shadow-[0_0_60px_rgba(0,175,204,0.6)] transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-kz-blue via-cyan-400 to-kz-blue animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-3">
              Запустить проект
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {quickLinks.map((link) => (
            <motion.button
              key={link.id}
              onClick={() => onLaunch(link.id)}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + link.delay }}
              whileHover={{ scale: 1.03, translateY: -5 }}
              whileTap={{ scale: 0.98 }}
              className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 backdrop-blur-md text-left overflow-hidden group transition-all duration-300"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${link.color} rounded-full blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
              <link.icon className="w-8 h-8 text-slate-300 mb-4 group-hover:text-white transition-colors" />
              <h3 className="font-medium text-lg text-slate-200 group-hover:text-white transition-colors">{link.title}</h3>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-6 text-slate-500 text-sm font-light tracking-wide text-center"
      >
        Критическое мышление • Гражданственность • Непрерывное образование
      </motion.div>
    </motion.div>
  );
}
