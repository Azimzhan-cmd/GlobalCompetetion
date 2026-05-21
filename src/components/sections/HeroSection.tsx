import { motion } from 'framer-motion';
import { ArrowDown, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import soundCtrl from '../../utils/SoundController';
import { useLanguage } from '../../utils/LanguageContext';

export default function HeroSection({ id }: { id: string }) {
  const { t } = useLanguage();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  };

  const handleHover = () => {
    soundCtrl.hover();
  };

  const handleClick = () => {
    soundCtrl.click();
    document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={id} className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-transparent">
      {/* Background Graphic Ambient Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-[60%] h-full bg-gradient-to-l from-kz-blue/10 to-transparent blur-[80px]" />
        <div className="absolute left-[5%] bottom-[10%] w-[300px] h-[300px] bg-kz-yellow/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Text Block */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-7 text-white flex flex-col items-start"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-kz-yellow animate-pulse" />
            <span className="text-xs font-semibold tracking-wider uppercase font-display text-slate-300">
              {t('hero.badge')}
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 leading-none font-display text-left"
          >
            {t('hero.title1')} <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-kz-blue via-cyan-400 to-kz-yellow">
              {t('hero.title2')}
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed mb-6 font-sans font-light text-left"
          >
            {t('hero.desc')}
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white/[0.02] border border-white/5 border-l-4 border-l-kz-blue p-5 rounded-r-2xl mb-8 max-w-xl backdrop-blur-sm text-left"
          >
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2 text-sm md:text-base font-display">
              <span className="w-1.5 h-1.5 rounded-full bg-kz-yellow" />
              {t('hero.dangerTitle')}
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed font-sans font-light">
              {t('hero.dangerDesc')}
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <button 
              onClick={handleClick}
              onMouseEnter={handleHover}
              data-magnetic
              className="px-6 py-3.5 bg-kz-blue hover:bg-[#00c5e3] text-white rounded-xl font-semibold transition-all shadow-lg shadow-kz-blue/20 hover:shadow-kz-blue/40 flex items-center gap-2 text-sm tracking-wider uppercase font-display cursor-none"
            >
              {t('hero.cta')}
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </button>
          </motion.div>
        </motion.div>

        {/* Right Interactive Mock Tech Terminal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-5 relative hidden lg:block"
        >
          {/* Glowing backlights */}
          <div className="absolute inset-0 bg-gradient-to-br from-kz-blue/20 to-kz-yellow/20 rounded-3xl rotate-3 blur-2xl opacity-50" />
          
          <div className="relative w-full aspect-[4/5] bg-[#090e1a]/80 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
            {/* Window bar */}
            <div className="h-10 border-b border-white/5 flex items-center justify-between px-5 bg-slate-950/40">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono">LABOUR_MONITOR_v1.2</div>
            </div>

            {/* Inner Content */}
            <div className="p-6 flex-1 flex flex-col gap-5 justify-between">
              {/* Top chart card */}
              <div className="bg-slate-950/50 rounded-2xl p-4 border border-white/5 flex-1 relative overflow-hidden flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Unemployment Index</div>
                    <div className="text-2xl font-bold text-white font-display mt-0.5">4.7% — 4.9%</div>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-mono flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> STABLE
                  </span>
                </div>

                {/* Animated graphic path */}
                <div className="h-20 w-full relative mt-4">
                  <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00AFCA" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#00AFCA" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,80 Q25,75 50,60 T100,30 L100,100 L0,100 Z"
                      fill="url(#glowGrad)"
                    />
                    <motion.path 
                      d="M0,80 Q25,75 50,60 T100,30" 
                      fill="none" 
                      stroke="#00AFCA" 
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: 0.8 }}
                    />
                  </svg>
                </div>
              </div>

              {/* Bottom statistics columns */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/50 rounded-2xl p-4 border border-white/5 flex flex-col justify-between">
                  <Users className="w-5 h-5 text-kz-blue mb-2" />
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">Active Labor</div>
                    <div className="text-lg font-bold text-slate-200 font-display mt-0.5">9.2 млн</div>
                  </div>
                </div>

                <div className="bg-slate-950/50 rounded-2xl p-4 border border-white/5 flex flex-col justify-between">
                  <AlertTriangle className="w-5 h-5 text-kz-yellow mb-2" />
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-mono">NEET Youth</div>
                    <div className="text-lg font-bold text-slate-200 font-display mt-0.5">7.5% — 8%</div>
                  </div>
                </div>
              </div>

              {/* Code log overlay */}
              <div className="font-mono text-[9px] text-slate-500 border-t border-white/5 pt-3 leading-relaxed">
                <div>&gt; STATUS_CODE: 200 OK</div>
                <div>&gt; PARADOX: LABOR SHORTAGE COEXISTS WITH UNEMPLOYMENT</div>
                <div>&gt; SYSTEM: STAGE READY FOR SANDBOX COMBINATIONS</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
