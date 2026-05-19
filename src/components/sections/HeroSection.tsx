import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function HeroSection({ id }: { id: string }) {
  return (
    <section id={id} className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-slate-900" />
        <div className="absolute right-0 top-0 w-[80%] h-full bg-gradient-to-l from-kz-blue/20 to-transparent" />
        <div className="absolute left-0 bottom-0 w-[50%] h-[50%] bg-kz-yellow/10 blur-[120px] rounded-full" />
        
        {/* Map Placeholder or abstract shape */}
        <svg className="absolute right-[-10%] top-[10%] w-[80%] h-[80%] opacity-10 text-kz-blue" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.4,-46.2C91,-33.3,97.3,-16.6,96.5,-0.5C95.6,15.7,87.6,31.3,77.3,44.7C67,58.1,54.4,69.2,39.9,76.5C25.3,83.8,8.8,87.2,-7.3,85.1C-23.4,83,-39.1,75.4,-52.7,64.7C-66.3,54,-77.8,40.1,-84.9,23.8C-92,7.4,-94.7,-11.4,-89.6,-28C-84.5,-44.6,-71.6,-59,-56.3,-67.2C-41,-75.4,-20.5,-77.3,-1,-75.6C18.5,-73.9,30.5,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-white"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-kz-yellow animate-pulse" />
            <span className="text-sm font-medium tracking-wide uppercase">Глобальный вызов — Локальная реальность</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Безработица в <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kz-blue to-cyan-300">Казахстане</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed mb-6">
            Основная проблема — <span className="text-white font-semibold">разрыв между образованием и реальными потребностями экономики</span>. Ежегодно вузы выпускают тысячи специалистов, но работодателям не хватает кадров с практическими навыками. Ситуацию усугубляют автоматизация процессов и региональное неравенство рабочих мест.
          </p>
          <div className="bg-kz-blue/10 border-l-4 border-kz-blue p-4 rounded-r-lg mb-8 max-w-xl">
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-kz-yellow" />
              Пути решения:
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Развитие глобальных компетенций (цифровая грамотность, критическое мышление), внедрение дуального обучения (практика на производстве) и развитие IT-сектора в регионах. Подробнее в разделе "Решения".
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => {
                document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-kz-blue hover:bg-cyan-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-kz-blue/30 flex items-center gap-2"
            >
              Изучить данные
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative hidden md:block"
        >
          {/* Abstract Hero Image/Composition */}
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-kz-blue/40 to-kz-yellow/40 rounded-3xl rotate-6 blur-xl" />
            <div className="absolute inset-0 bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-2xl flex flex-col">
              <div className="h-12 border-b border-slate-700 flex items-center px-4 gap-2 bg-slate-800/50">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div className="w-full h-1/2 bg-slate-700/50 rounded-xl relative overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 1 }}
                    className="absolute bottom-0 left-0 h-full w-full bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-20"
                  />
                  {/* Mock Chart Line */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <motion.path 
                      d="M0,80 Q20,60 40,70 T80,40 T100,20" 
                      fill="none" 
                      stroke="#00AFCA" 
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </svg>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 bg-slate-700/50 rounded-xl p-4">
                    <div className="w-8 h-8 rounded-full bg-kz-blue/20 mb-2 flex items-center justify-center">
                      <div className="w-4 h-4 bg-kz-blue rounded-full" />
                    </div>
                    <div className="h-2 w-16 bg-slate-600 rounded mb-2" />
                    <div className="h-4 w-24 bg-slate-500 rounded" />
                  </div>
                  <div className="flex-1 bg-slate-700/50 rounded-xl p-4">
                    <div className="w-8 h-8 rounded-full bg-kz-yellow/20 mb-2 flex items-center justify-center">
                      <div className="w-4 h-4 bg-kz-yellow rounded-full" />
                    </div>
                    <div className="h-2 w-16 bg-slate-600 rounded mb-2" />
                    <div className="h-4 w-24 bg-slate-500 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
