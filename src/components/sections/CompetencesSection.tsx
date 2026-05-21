import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Globe, Laptop, Zap, X, CheckCircle2, ArrowRight } from 'lucide-react';
import soundCtrl from '../../utils/SoundController';
import { useLanguage } from '../../utils/LanguageContext';

const competencesData = [
  {
    id: 0,
    icon: Brain,
    posClass: "top-4 left-4 md:top-8 md:left-12",
    color: "from-cyan-500 to-blue-500",
    shadowColor: "rgba(6, 182, 212, 0.4)",
    stepIds: [1, 2, 3]
  },
  {
    id: 1,
    icon: Globe,
    posClass: "top-4 right-4 md:top-8 md:right-12",
    color: "from-amber-500 to-yellow-500",
    shadowColor: "rgba(245, 158, 11, 0.4)",
    stepIds: [1, 2, 3]
  },
  {
    id: 2,
    icon: Laptop,
    posClass: "bottom-4 left-4 md:bottom-8 md:left-12",
    color: "from-teal-400 to-emerald-500",
    shadowColor: "rgba(20, 184, 166, 0.4)",
    stepIds: [1, 2, 3]
  },
  {
    id: 3,
    icon: Zap,
    posClass: "bottom-4 right-4 md:bottom-8 md:right-12",
    color: "from-purple-500 to-pink-500",
    shadowColor: "rgba(168, 85, 247, 0.4)",
    stepIds: [1, 2, 3]
  }
];

export default function CompetencesSection({ id }: { id: string }) {
  const { t } = useLanguage();
  const [activeModal, setActiveModal] = useState<typeof competencesData[0] | null>(null);

  const openModal = (comp: typeof competencesData[0]) => {
    soundCtrl.click();
    setActiveModal(comp);
  };

  const closeModal = () => {
    soundCtrl.click();
    setActiveModal(null);
  };

  const handleHover = () => {
    soundCtrl.hover();
  };

  const centralTextParts = t('competences.centralText2').split('\n');

  return (
    <section id={id} className="py-28 px-6 bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-kz-blue/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Description Column */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <span className="text-kz-yellow font-semibold tracking-wider uppercase text-xs mb-4 block font-display">{t('competences.badge')}</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-display bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
              {t('competences.title')}
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8 font-light font-sans">
              {t('competences.desc')}
            </p>
            
            <div className="glass-panel border-white/10 p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute left-0 top-0 h-full w-[3px] bg-kz-blue shadow-[0_0_10px_rgba(0,175,202,0.8)]" />
              <p className="italic text-slate-300 font-sans font-light leading-relaxed">
                {t('competences.quote')}
              </p>
              <span className="text-xs text-slate-500 font-mono mt-3 block text-right">{t('competences.quoteAuthor')}</span>
            </div>
          </motion.div>

          {/* Right Interactive Node Map / Grid */}
          <div className="flex-1 w-full flex justify-center items-center">
            {/* Desktop Node Map (Hidden on mobile) */}
            <div className="hidden md:flex relative w-[460px] h-[460px] items-center justify-center">
              {/* Dynamic SVG Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 460 460">
                {/* Connecting Lines */}
                <line x1="230" y1="230" x2="80" y2="80" stroke="rgba(0, 175, 202, 0.2)" strokeWidth="1.5" strokeDasharray="5,5" />
                <line x1="230" y1="230" x2="380" y2="80" stroke="rgba(0, 175, 202, 0.2)" strokeWidth="1.5" strokeDasharray="5,5" />
                <line x1="230" y1="230" x2="80" y2="380" stroke="rgba(0, 175, 202, 0.2)" strokeWidth="1.5" strokeDasharray="5,5" />
                <line x1="230" y1="230" x2="380" y2="380" stroke="rgba(0, 175, 202, 0.2)" strokeWidth="1.5" strokeDasharray="5,5" />
                
                {/* Connecting Pulsing Waves */}
                <circle cx="230" cy="230" r="100" fill="none" stroke="rgba(0, 175, 202, 0.05)" strokeWidth="2">
                  <animate attributeName="r" values="60;140;60" dur="8s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.1;0.5;0.1" dur="8s" repeatCount="indefinite" />
                </circle>
              </svg>

              {/* Central Glowing Core */}
              <div className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-kz-blue/20 to-kz-yellow/20 flex flex-col items-center justify-center border border-white/10 shadow-[0_0_40px_rgba(0,175,202,0.15)] z-10 backdrop-blur-md">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">{t('competences.centralText1')}</span>
                <span className="text-xs font-bold font-display uppercase tracking-wider text-kz-blue text-center leading-none mt-1">
                  {centralTextParts[0]}<br/>{centralTextParts[1] || ''}
                </span>
                <div className="absolute inset-0 rounded-full border border-kz-blue/40 animate-ping opacity-25" style={{ animationDuration: '3s' }} />
              </div>

              {/* Orbiting Competence Nodes */}
              {competencesData.map((comp) => {
                const Icon = comp.icon;
                return (
                  <button
                    key={comp.id}
                    onClick={() => openModal(comp)}
                    onMouseEnter={handleHover}
                    className={`absolute w-36 h-36 rounded-2xl glass-panel p-4 flex flex-col items-center justify-center text-center cursor-none transition-all duration-300 border border-white/5 hover:border-white/20 group hover:-translate-y-1 hover:scale-105 z-20 ${comp.posClass}`}
                    style={{
                      boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.3)`
                    }}
                  >
                    {/* Glowing highlight point */}
                    <div 
                      className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${comp.color} flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-110 transition-transform`}
                      style={{ boxShadow: `0 4px 15px ${comp.shadowColor}` }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold leading-tight font-display text-slate-200 group-hover:text-white transition-colors">
                      {t(`competences.c${comp.id}.title`)}
                    </span>
                    
                    {/* Tiny pulsing dot on the button */}
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-kz-blue/80 animate-pulse" />
                  </button>
                );
              })}
            </div>

            {/* Mobile Touch Layout (Fallback list/grid) */}
            <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {competencesData.map((comp) => {
                const Icon = comp.icon;
                return (
                  <button
                    key={comp.id}
                    onClick={() => openModal(comp)}
                    className="glass-panel p-6 rounded-2xl text-left border border-white/5 relative overflow-hidden group flex items-start gap-4 active:bg-white/5 transition-all"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${comp.color} flex items-center justify-center text-white shrink-0 shadow-lg`}
                         style={{ boxShadow: `0 4px 12px ${comp.shadowColor}` }}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-100 font-display mb-1 flex items-center gap-1.5">
                        {t(`competences.c${comp.id}.title`)}
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </h3>
                      <p className="text-xs text-slate-400 font-sans font-light leading-relaxed">{t(`competences.c${comp.id}.desc`)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>

      {/* Modal - Plan Details */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop filter overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md cursor-none"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-2xl dark-glass-panel rounded-3xl p-6 md:p-8 overflow-hidden z-10 border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.8)] animate-glow-pulse"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-full bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-none"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Glowing header accent */}
              <div 
                className={`absolute -top-24 -left-24 w-60 h-60 rounded-full blur-3xl opacity-20 pointer-events-none bg-gradient-to-tr ${activeModal.color}`} 
              />

              {/* Icon & Title */}
              <div className="flex items-center gap-4 mb-6 relative">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${activeModal.color} flex items-center justify-center text-white shadow-lg`}
                     style={{ boxShadow: `0 8px 24px ${activeModal.shadowColor}` }}>
                  <activeModal.icon className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-kz-blue">{t('competences.metaTitle')}</span>
                  <h3 className="text-2xl md:text-3xl font-bold font-display text-white mt-0.5">{t(`competences.c${activeModal.id}.title`)}</h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 font-sans font-light leading-relaxed mb-6 text-sm md:text-base relative border-b border-white/5 pb-6">
                {t(`competences.c${activeModal.id}.detailedDesc`)}
              </p>

              {/* Roadmap steps (План прокачки) */}
              <div className="relative">
                <h4 className="text-xs uppercase font-mono font-bold tracking-widest text-kz-yellow mb-4">
                  {t('competences.planTitle')}
                </h4>
                <div className="space-y-4">
                  {activeModal.stepIds.map((stepId, sIdx) => (
                    <div key={sIdx} className="flex gap-4 items-start group">
                      <div className="w-6 h-6 rounded-full bg-white/5 border border-white/10 text-kz-blue flex items-center justify-center shrink-0 mt-0.5 group-hover:border-kz-blue/50 transition-colors">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-xs font-mono text-slate-500">{t('competences.step')} {sIdx + 1}</span>
                        <p className="text-slate-300 text-sm font-sans font-light mt-0.5 group-hover:text-white transition-colors">
                          {t(`competences.c${activeModal.id}.step${stepId}`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-6 py-2.5 rounded-full bg-white/5 border border-white/5 hover:border-white/20 text-slate-300 hover:text-white font-display text-sm font-semibold transition-all cursor-none"
                >
                  {t('competences.closeBtn')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}