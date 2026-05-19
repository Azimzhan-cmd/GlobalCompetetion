import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const solutions = [
  "Национальный проект по развитию предпринимательства на 2021-2025 годы: предоставление безвозвратных грантов до 400 МРП для стартапов молодежи и социально уязвимых слоев.",
  "Проекты «Первое рабочее место», «Молодежная практика» и «Контракт поколений» для предоставления первичного опыта выпускникам без опыта работы.",
  "Развитие дуального обучения: закрепление 60% времени обучения за практикой на производстве в соответствии с Законом об образовании РК.",
  "Региональные IT-хабы и программа «Tech Orda»: выделение ваучеров до 600 000 тенге для обучения IT-специальностям в частных школах программирования.",
  "Программа «Zhas Project»: поддержка молодежных инициатив и малого бизнеса на местном уровне через малые гранты до 1 000 000 тенге."
];

export default function SolutionsSection({ id }: { id: string }) {
  return (
    <section id={id} className="py-24 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <div className="relative aspect-square w-full max-w-lg mx-auto">
            <div className="absolute inset-0 bg-kz-yellow/20 rounded-full blur-3xl translate-x-10 translate-y-10" />
            <div className="absolute inset-0 bg-kz-blue/20 rounded-full blur-3xl -translate-x-10 -translate-y-10" />
            <img 
              src="https://tengrinews.kz/userdata/news/2026/news_599190/thumb_m/photo_542920.jpg" 
              alt="Ярмарка вакансий в Казахстане" 
              className="relative z-10 w-full h-full object-cover rounded-3xl shadow-2xl"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
            Как решить проблему?
          </h2>
          <div className="flex flex-col gap-6">
            {solutions.map((text, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="mt-1 flex-shrink-0 text-emerald-500">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <p className="text-lg text-slate-700 leading-relaxed">
                  {text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-slate-50 border border-slate-200 rounded-2xl">
            <h4 className="font-bold text-slate-800 mb-2">Главный вывод:</h4>
            <p className="text-slate-600">
              Решение проблемы безработицы требует комплексного подхода: усилий государства, бизнеса и, самое главное, личной ответственности каждого гражданина за свое профессиональное развитие.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
