import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';

export default function VideoSection({ id }: { id: string }) {
  return (
    <section id={id} className="py-24 px-6 bg-slate-900 text-white relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] bg-kz-blue/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[40%] h-[40%] bg-kz-yellow/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-kz-yellow font-semibold tracking-wider uppercase text-sm mb-2 block">Медиа</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Обучающее видео: Безработица в РК</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Подробный разбор текущей ситуации на рынке труда, комментарии экспертов и анализ причин безработицы в Казахстане.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,175,204,0.15)] border border-slate-700 bg-slate-800"
        >
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/lkdRmdnWJCY?si=educational_video" 
            title="Обучающее видео о безработице" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
