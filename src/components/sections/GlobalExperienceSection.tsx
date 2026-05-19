import { motion } from 'framer-motion';
import { Globe2, GraduationCap, Briefcase } from 'lucide-react';

const globalExamples = [
  {
    country: "Германия",
    title: "Система дуального образования",
    desc: "Студенты проводят 70% времени на практике в компаниях и 30% в колледжах. Это обеспечивает один из самых низких уровней молодежной безработицы в Европе (около 6%).",
    icon: Briefcase,
    color: "from-amber-400 to-orange-500"
  },
  {
    country: "Сингапур",
    title: "Инициатива SkillsFuture",
    desc: "Государственная программа непрерывного обучения (Lifelong Learning). Каждому гражданину старше 25 лет выдается стартовый кредит на оплату курсов переквалификации.",
    icon: GraduationCap,
    color: "from-blue-500 to-cyan-400"
  },
  {
    country: "Южная Корея",
    title: "Цифровизация и IT-хабы",
    desc: "Массовое финансирование стартапов и создание национальных центров переобучения IT-навыкам, что позволило быстро адаптировать население к цифровой экономике.",
    icon: Globe2,
    color: "from-rose-400 to-red-500"
  }
];

export default function GlobalExperienceSection({ id }: { id: string }) {
  return (
    <section id={id} className="py-24 px-6 bg-slate-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-kz-blue/10 rounded-full blur-[80px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-kz-blue font-semibold tracking-wider uppercase text-sm mb-2 block">Мировой опыт</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Что уже сделано мировым сообществом?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Эффективные решения и лучшие практики из разных стран, которые доказывают свою состоятельность в борьбе с безработицей.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {globalExamples.map((example, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 hover:-translate-y-2 transition-transform duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${example.color} flex items-center justify-center text-white mb-6 shadow-lg`}>
                <example.icon className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{example.country}</h3>
              <h4 className="text-xl font-bold text-slate-800 mb-4">{example.title}</h4>
              <p className="text-slate-600 leading-relaxed">
                {example.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
