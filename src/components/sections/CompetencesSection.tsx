import { motion } from 'framer-motion';
import { Brain, Globe, Laptop, Zap } from 'lucide-react';

const competences = [
  {
    icon: Brain,
    title: "Критическое мышление",
    desc: "Способность анализировать информацию, отличать факты от фейков и принимать взвешенные решения в условиях неопределенности."
  },
  {
    icon: Globe,
    title: "Гражданственность",
    desc: "Понимание глобальных процессов, ответственность за общество и готовность вносить вклад в развитие своей страны."
  },
  {
    icon: Laptop,
    title: "Цифровая грамотность",
    desc: "Умение эффективно использовать технологии, быстро осваивать новые программы и адаптироваться к цифровым рабочим местам."
  },
  {
    icon: Zap,
    title: "Непрерывное обучение (Lifelong Learning)",
    desc: "Готовность учиться всю жизнь. Навык, который гарантирует востребованность даже при смене профессии."
  }
];

export default function CompetencesSection({ id }: { id: string }) {
  return (
    <section id={id} className="py-24 px-6 bg-slate-900 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
      <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-kz-blue/20 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <span className="text-kz-yellow font-semibold tracking-wider uppercase text-sm mb-4 block">Навыки будущего</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Как глобальные компетенции спасают от безработицы?
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">
              В мире, где технические навыки (hard skills) устаревают за 3-5 лет, на первый план выходят универсальные компетенции. Именно они делают специалиста адаптивным к любым шокам на рынке труда.
            </p>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
              <p className="italic text-slate-200">
                "Выживает не самый сильный и не самый умный, а тот, кто лучше всех приспосабливается к изменениям."
              </p>
            </div>
          </motion.div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {competences.map((comp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 rounded-2xl hover:bg-slate-700/50 transition-colors"
              >
                <div className="w-12 h-12 bg-kz-blue/20 rounded-xl flex items-center justify-center mb-4 text-cyan-400">
                  <comp.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{comp.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{comp.desc}</p>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
