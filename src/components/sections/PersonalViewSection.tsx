import { motion } from 'framer-motion';
import { UserPlus, Sparkles, HandHeart } from 'lucide-react';

const contributions = [
  {
    icon: Sparkles,
    title: "Непрерывное саморазвитие",
    desc: "Каждый из нас должен взять ответственность за свое образование. Изучение новых языков, освоение цифровых инструментов и развитие soft skills делают нас неуязвимыми на рынке труда."
  },
  {
    icon: UserPlus,
    title: "Проактивность и нетворкинг",
    desc: "Не ждать идеальной вакансии, а создавать возможности: участвовать в стажировках, хакатонах, волонтерских проектах и развивать профессиональные связи."
  },
  {
    icon: HandHeart,
    title: "Менторство и помощь другим",
    desc: "Делиться знаниями с окружающими. Если вы освоили востребованный навык, помогите друзьям или младшим коллегам сделать первые шаги. Сильное комьюнити — сильная экономика."
  }
];

export default function PersonalViewSection({ id }: { id: string }) {
  return (
    <section id={id} className="py-24 px-6 bg-kz-blue text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      <div className="absolute -bottom-[50%] -right-[20%] w-[80%] h-[100%] bg-white/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-kz-yellow font-semibold tracking-wider uppercase text-sm mb-2 block">Личный взгляд</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Какой вклад может внести каждый из нас?</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Мы считаем, что системные государственные решения работают только тогда, когда сами граждане проявляют инициативу. Безработица — это не только макроэкономическая проблема, но и вопрос личной адаптивности.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contributions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-colors"
            >
              <div className="w-14 h-14 bg-white text-kz-blue rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-blue-50 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center max-w-3xl mx-auto"
        >
          <p className="text-xl italic font-light text-slate-200">
            "Лучший способ предсказать свое будущее на рынке труда — это создать его самому."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
