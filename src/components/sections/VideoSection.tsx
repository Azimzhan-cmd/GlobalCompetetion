import { motion } from 'framer-motion';
import soundCtrl from '../../utils/SoundController';
import { useLanguage } from '../../utils/LanguageContext';

export default function VideoSection({ id }: { id: string }) {
  const { t } = useLanguage();
  const handleHover = () => {
    soundCtrl.hover();
  };

  return (
    <section id={id} className="py-28 px-6 bg-slate-950 text-white relative border-t border-white/5">
      {/* Background radial glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[30%] left-[-15%] w-[50%] h-[50%] bg-kz-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[30%] right-[-15%] w-[50%] h-[50%] bg-kz-yellow/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-kz-yellow font-semibold tracking-wider uppercase text-xs mb-2 block font-display">
            {t('media.badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            {t('media.title')}
          </h2>
          <div className="w-24 h-[3px] bg-gradient-to-r from-kz-yellow to-kz-blue mx-auto rounded-full mb-6 shadow-[0_0_10px_rgba(254,193,5,0.4)]" />
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light font-sans font-light">
            {t('media.desc')}
          </p>
        </motion.div>

        {/* Video Player Glowing Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          onMouseEnter={handleHover}
          className="relative aspect-video w-full rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 bg-slate-900 group cursor-none"
        >
          {/* Glowing Border effect */}
          <div className="absolute inset-0 border border-kz-blue/20 rounded-[2rem] z-20 pointer-events-none group-hover:border-kz-blue/40 transition-colors duration-500" />
          <div className="absolute -inset-[2px] bg-gradient-to-r from-kz-blue/20 to-kz-yellow/20 rounded-[2rem] z-0 blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Video IFrame */}
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/lkdRmdnWJCY?si=educational_video" 
            title={t('media.iframeTitle')}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
            className="absolute inset-0 w-full h-full z-10"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
}
