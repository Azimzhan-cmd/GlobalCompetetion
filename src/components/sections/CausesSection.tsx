import { motion } from 'framer-motion';
import { AlertCircle, GraduationCap, Building2, TrendingDown } from 'lucide-react';

const causes = [
  {
    icon: GraduationCap,
    title: "Разрыв между образованием и рынком",
    desc: "Более 30% выпускников вузов в РК работают не по специальности. Учебные программы отстают от реального сектора, что ведет к переизбытку юристов/экономистов и дефициту инженеров и IT-специалистов.",
    color: "bg-blue-50 text-blue-600 border-blue-200"
  },
  {
    icon: Building2,
    title: "Структурные изменения и автоматизация",
    desc: "Согласно исследованиям Всемирного экономического форума (ВЭФ) и «Атласу новых профессий РК», до 40% рутинных рабочих мест в Казахстане подвержены высокому риску автоматизации в ближайшие 10 лет.",
    color: "bg-orange-50 text-orange-600 border-orange-200"
  },
  {
    icon: AlertCircle,
    title: "Неформальная занятость",
    desc: "Около 2.1 млн человек (почти каждый четвертый занятый) работают без официальных договоров. Это лишает их доступа к пенсионным накоплениям, ОСМС и социальной защите при потере работы.",
    color: "bg-rose-50 text-rose-600 border-rose-200"
  },
  {
    icon: TrendingDown,
    title: "Региональный дисбаланс",
    desc: "Уровень безработицы на юге страны и в сельских регионах традиционно выше из-за слабого развития промышленности, в то время как Астана и Алматы перегружены внутренними мигрантами.",
    color: "bg-emerald-50 text-emerald-600 border-emerald-200"
  }
];

export default function CausesSection({ id }: { id: string }) {
  return (
    <section id={id} className="py-24 px-6 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-kz-blue font-semibold tracking-wider uppercase text-sm mb-2 block">Корневые причины</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Почему возникает проблема?</h2>
          <div className="w-24 h-1 bg-kz-yellow mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {causes.map((cause, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 rounded-full blur-3xl -mr-10 -mt-10 transition-transform group-hover:scale-150 ${cause.color.split(' ')[0]}`} />
              
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border ${cause.color}`}>
                <cause.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">{cause.title}</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {cause.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
