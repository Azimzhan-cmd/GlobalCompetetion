import { motion } from 'framer-motion';
import { AlertCircle, GraduationCap, Building2, TrendingDown } from 'lucide-react';
import React from 'react';
import soundCtrl from '../../utils/SoundController';
import { useLanguage } from '../../utils/LanguageContext';

export default function CausesSection({ id }: { id: string }) {
  const { t } = useLanguage();

  const causes = [
    {
      icon: GraduationCap,
      title: t('causes.c1.title'),
      desc: t('causes.c1.desc'),
      color: "bg-kz-blue/10 text-kz-blue border-kz-blue/20 glow-kz-blue",
      glowColor: "rgba(0, 175, 202, 0.15)"
    },
    {
      icon: Building2,
      title: t('causes.c2.title'),
      desc: t('causes.c2.desc'),
      color: "bg-[#ff8f3d]/10 text-[#ff8f3d] border-[#ff8f3d]/20 glow-orange",
      glowColor: "rgba(255, 143, 61, 0.15)"
    },
    {
      icon: AlertCircle,
      title: t('causes.c3.title'),
      desc: t('causes.c3.desc'),
      color: "bg-rose-500/10 text-rose-400 border-rose-500/20 glow-rose",
      glowColor: "rgba(244, 63, 94, 0.15)"
    },
    {
      icon: TrendingDown,
      title: t('causes.c4.title'),
      desc: t('causes.c4.desc'),
      color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 glow-emerald",
      glowColor: "rgba(52, 211, 153, 0.15)"
    }
  ];

  // 3D Tilt handler using direct DOM manipulation for maximum performance (60fps)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, glowColor: string) => {
    if (window.innerWidth < 768) return; // Disable on mobile/tablet

    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const angleX = (yc - y) / 15; // Max angle ~7 degrees
    const angleY = (x - xc) / 15;

    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.01, 1.01, 1.01)`;
    card.style.boxShadow = `0 15px 35px ${glowColor}`;
    card.style.borderColor = glowColor.replace('0.15', '0.4');
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.boxShadow = `0 8px 32px 0 rgba(0, 0, 0, 0.37)`;
    card.style.borderColor = `rgba(255, 255, 255, 0.05)`;
  };

  const handleHover = () => {
    soundCtrl.hover();
  };

  return (
    <section id={id} className="py-28 px-6 bg-slate-950/20 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-kz-blue font-semibold tracking-wider uppercase text-xs mb-2 block font-display">{t('causes.badge')}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">{t('causes.title')}</h2>
          <div className="w-24 h-[3px] bg-gradient-to-r from-kz-blue to-kz-yellow mx-auto rounded-full shadow-[0_0_10px_rgba(0,175,202,0.5)]" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {causes.map((cause, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={handleHover}
              onMouseMove={(e) => handleMouseMove(e, cause.glowColor)}
              onMouseLeave={handleMouseLeave}
              data-cursor-text={t('causes.hoverText')}
              style={{ transformStyle: 'preserve-3d', transition: 'transform 0.1s ease-out, box-shadow 0.3s, border-color 0.3s' }}
              className="glass-panel rounded-3xl p-8 hover:shadow-2xl transition-all group relative overflow-hidden cursor-none"
            >
              {/* Radial gradient background hover glow */}
              <div 
                className="absolute top-0 right-0 w-48 h-48 opacity-10 rounded-full blur-3xl -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150"
                style={{ backgroundColor: cause.glowColor }}
              />
              
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border transition-all duration-300 group-hover:scale-110 ${cause.color}`}>
                <cause.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-2xl font-bold text-slate-100 mb-4 font-display group-hover:text-white transition-colors">{cause.title}</h3>
              <p className="text-slate-400 leading-relaxed text-lg font-light font-sans group-hover:text-slate-300 transition-colors">
                {cause.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
