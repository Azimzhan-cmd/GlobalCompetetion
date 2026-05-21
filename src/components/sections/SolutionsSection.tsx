import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Building2, AlertCircle, TrendingDown, Brain, Globe, Laptop, Zap, RotateCcw, Sparkles } from 'lucide-react';
import soundCtrl from '../../utils/SoundController';
import { useLanguage } from '../../utils/LanguageContext';

const causesData = [
  { 
    id: 'education', 
    icon: GraduationCap, 
    color: 'border-cyan-500/20 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-cyan-400' 
  },
  { 
    id: 'automation', 
    icon: Building2, 
    color: 'border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-500/5 text-blue-400' 
  },
  { 
    id: 'informal', 
    icon: AlertCircle, 
    color: 'border-rose-500/20 hover:border-rose-500/50 hover:bg-rose-500/5 text-rose-400' 
  },
  { 
    id: 'balance', 
    icon: TrendingDown, 
    color: 'border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/5 text-purple-400' 
  }
];

const competencesData = [
  { 
    id: 'thinking', 
    icon: Brain, 
    color: 'border-amber-500/20 hover:border-amber-500/50 hover:bg-amber-500/5 text-amber-400' 
  },
  { 
    id: 'citizenship', 
    icon: Globe, 
    color: 'border-yellow-500/20 hover:border-yellow-500/50 hover:bg-yellow-500/5 text-yellow-400' 
  },
  { 
    id: 'digital', 
    icon: Laptop, 
    color: 'border-teal-500/20 hover:border-teal-500/50 hover:bg-teal-500/5 text-teal-400' 
  },
  { 
    id: 'learning', 
    icon: Zap, 
    color: 'border-emerald-500/20 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-emerald-400' 
  }
];

export default function SolutionsSection({ id }: { id: string }) {
  const { t } = useLanguage();
  const [selectedCause, setSelectedCause] = useState<string | null>(null);
  const [selectedCompetence, setSelectedCompetence] = useState<string | null>(null);

  // Derived state
  let unemploymentRate = 4.9;
  let outcomeText = t('solutions.outcomes.default');
  let isSynergy = false;

  if (selectedCause && !selectedCompetence) {
    unemploymentRate = 4.9;
    outcomeText = t('solutions.outcomes.onlyCause');
    isSynergy = false;
  } else if (!selectedCause && selectedCompetence) {
    unemploymentRate = 4.9;
    outcomeText = t('solutions.outcomes.onlyComp');
    isSynergy = false;
  } else if (selectedCause && selectedCompetence) {
    const pair = `${selectedCause}+${selectedCompetence}`;
    switch (pair) {
      case 'education+learning':
        unemploymentRate = 4.1;
        outcomeText = t('solutions.outcomes.edu_learn');
        isSynergy = true;
        break;
      case 'automation+digital':
        unemploymentRate = 3.9;
        outcomeText = t('solutions.outcomes.auto_dig');
        isSynergy = true;
        break;
      case 'informal+citizenship':
        unemploymentRate = 4.3;
        outcomeText = t('solutions.outcomes.inf_cit');
        isSynergy = true;
        break;
      case 'balance+thinking':
        unemploymentRate = 4.2;
        outcomeText = t('solutions.outcomes.bal_think');
        isSynergy = true;
        break;
      default:
        unemploymentRate = 4.6;
        outcomeText = t('solutions.outcomes.partial');
        isSynergy = false;
        break;
    }
  }

  const playSynergySoundIfNeeded = (cause: string | null, competence: string | null) => {
    if (cause && competence) {
      const pair = `${cause}+${competence}`;
      const isMatch = ['education+learning', 'automation+digital', 'informal+citizenship', 'balance+thinking'].includes(pair);
      if (isMatch) {
        soundCtrl.success();
      } else {
        soundCtrl.click();
      }
    }
  };

  const handleSelectCause = (id: string) => {
    soundCtrl.click();
    const nextCause = selectedCause === id ? null : id;
    setSelectedCause(nextCause);
    playSynergySoundIfNeeded(nextCause, selectedCompetence);
  };

  const handleSelectCompetence = (id: string) => {
    soundCtrl.click();
    const nextCompetence = selectedCompetence === id ? null : id;
    setSelectedCompetence(nextCompetence);
    playSynergySoundIfNeeded(selectedCause, nextCompetence);
  };

  const handleReset = () => {
    soundCtrl.click();
    setSelectedCause(null);
    setSelectedCompetence(null);
  };

  const handleHover = () => {
    soundCtrl.hover();
  };

  // Gauge Angle Calculation
  const needleRotation = 90 - ((unemploymentRate - 3.5) / 2) * 180;

  return (
    <section id={id} className="py-28 px-6 bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-kz-yellow/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-kz-yellow font-semibold tracking-wider uppercase text-xs mb-2 block font-display">{t('solutions.badge')}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
            {t('solutions.title')}
          </h2>
          <div className="w-24 h-[3px] bg-gradient-to-r from-kz-yellow to-kz-blue mx-auto rounded-full mb-6 shadow-[0_0_10px_rgba(254,193,5,0.4)]" />
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light font-sans">
            {t('solutions.desc')}
          </p>
        </motion.div>

        {/* Sandbox Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Causes */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-bold font-display text-slate-300 mb-1">{t('solutions.step1Title')}</h3>
              <p className="text-xs text-slate-500 font-sans">{t('solutions.step1Desc')}</p>
            </div>
            
            <div className="space-y-3 flex-1 flex flex-col justify-center">
              {causesData.map((c) => {
                const Icon = c.icon;
                const isSelected = selectedCause === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCause(c.id)}
                    onMouseEnter={handleHover}
                    className={`w-full p-5 rounded-2xl border text-left cursor-none transition-all duration-300 group
                      ${isSelected 
                        ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_20px_rgba(0,175,202,0.25)] text-white' 
                        : 'bg-white/[0.01] border-white/5 text-slate-400 hover:text-white'}`}
                  >
                    <div className="flex gap-4 items-start">
                      <div className={`p-2.5 rounded-xl border transition-colors shrink-0
                        ${isSelected ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400' : 'bg-white/5 border-white/5'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm md:text-base font-display transition-colors">{t(`solutions.causes.${c.id}.name`)}</h4>
                        <p className="text-xs text-slate-500 mt-1 font-sans font-light leading-relaxed group-hover:text-slate-400 transition-colors">{t(`solutions.causes.${c.id}.desc`)}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Column: Dial / Gauge Chart */}
          <div className="lg:col-span-4 flex flex-col items-center justify-between p-8 rounded-3xl dark-glass-panel border border-white/5 relative shadow-2xl">
            {/* Port connection paths */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-4 z-0">
              <div className={`w-8 h-8 rounded-full border border-dashed flex items-center justify-center transition-all duration-500
                ${selectedCause ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400 animate-pulse' : 'border-white/10 text-slate-700'}`}>
                <div className="w-2 h-2 rounded-full bg-current" />
              </div>
              <div className={`w-8 h-8 rounded-full border border-dashed flex items-center justify-center transition-all duration-500
                ${selectedCompetence ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400 animate-pulse' : 'border-white/10 text-slate-700'}`}>
                <div className="w-2 h-2 rounded-full bg-current" />
              </div>
            </div>

            <div className="text-center z-10 w-full">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">{t('solutions.simTitle')}</span>
              <h3 className="text-sm font-bold font-display text-slate-300 mt-1">{t('solutions.simCalc')}</h3>
            </div>

            {/* SVG semi-circle Gauge */}
            <div className="relative w-64 h-36 flex items-end justify-center overflow-hidden my-6 z-10">
              <svg className="w-64 h-64 absolute -bottom-28" viewBox="0 0 200 200">
                {/* Gauge Background track */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.04)"
                  strokeWidth="12"
                  strokeLinecap="round"
                />
                
                {/* Gauge Active Glow track */}
                <path
                  d="M 20 100 A 80 80 0 0 1 180 100"
                  fill="none"
                  stroke="url(#gaugeGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray="251"
                  strokeDashoffset={251 - ((5.5 - unemploymentRate) / 2.0) * 251}
                  className="transition-all duration-1000 ease-out"
                />

                {/* Definitions for Gradients */}
                <defs>
                  <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f43f5e" />     {/* Rose (Unemployment High) */}
                    <stop offset="50%" stopColor="#FEC105" />    {/* Yellow */}
                    <stop offset="100%" stopColor="#00AFCA" />   {/* Turquoise (Unemployment Low) */}
                  </linearGradient>
                </defs>

                {/* Center Core Pin */}
                <circle cx="100" cy="100" r="8" fill="#1e293b" stroke="#00AFCA" strokeWidth="2" />
                
                {/* Needle */}
                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="35"
                  stroke={isSynergy ? "#00AFCA" : "#FEC105"}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: '100px 100px',
                    transform: `rotate(${needleRotation}deg)`,
                    transition: 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.5s'
                  }}
                />
              </svg>

              {/* Digital Unemployment rate display */}
              <div className="text-center absolute bottom-2 flex flex-col items-center">
                <motion.span 
                  key={unemploymentRate}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl md:text-5xl font-black font-display text-white tracking-tight"
                >
                  {unemploymentRate}%
                </motion.span>
                <span className="text-[10px] font-mono tracking-widest text-slate-400 mt-1 uppercase">{t('solutions.labelUnemp')}</span>
              </div>
            </div>

            {/* Results Console */}
            <div className="w-full text-center z-10 min-h-[96px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={outcomeText}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-2"
                >
                  {isSynergy && (
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-kz-blue/10 border border-kz-blue/20 text-kz-blue text-xs font-semibold font-display tracking-wide uppercase animate-bounce">
                      <Sparkles className="w-3.5 h-3.5" />
                      {t('solutions.synergyBadge')}
                    </div>
                  )}
                  <p className="text-sm text-slate-300 font-sans font-light leading-relaxed px-2">
                    {outcomeText}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Reset Button */}
            {(selectedCause || selectedCompetence) && (
              <button
                onClick={handleReset}
                onMouseEnter={handleHover}
                className="mt-4 px-4 py-2 rounded-full bg-white/5 border border-white/5 hover:border-white/10 hover:text-white transition-all text-xs font-mono flex items-center gap-2 cursor-none"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {t('solutions.resetBtn')}
              </button>
            )}
          </div>

          {/* Right Column: Competences */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            <div className="text-center lg:text-right">
              <h3 className="text-lg font-bold font-display text-slate-300 mb-1">{t('solutions.step2Title')}</h3>
              <p className="text-xs text-slate-500 font-sans">{t('solutions.step2Desc')}</p>
            </div>
            
            <div className="space-y-3 flex-1 flex flex-col justify-center">
              {competencesData.map((comp) => {
                const Icon = comp.icon;
                const isSelected = selectedCompetence === comp.id;
                return (
                  <button
                    key={comp.id}
                    onClick={() => handleSelectCompetence(comp.id)}
                    onMouseEnter={handleHover}
                    className={`w-full p-5 rounded-2xl border text-left cursor-none transition-all duration-300 group
                      ${isSelected 
                        ? 'bg-yellow-500/10 border-yellow-500 shadow-[0_0_20px_rgba(254,193,5,0.25)] text-white' 
                        : 'bg-white/[0.01] border-white/5 text-slate-400 hover:text-white'}`}
                  >
                    <div className="flex gap-4 items-start">
                      <div className={`p-2.5 rounded-xl border transition-colors shrink-0
                        ${isSelected ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' : 'bg-white/5 border-white/5'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm md:text-base font-display transition-colors">{t(`solutions.comps.${comp.id}.name`)}</h4>
                        <p className="text-xs text-slate-500 mt-1 font-sans font-light leading-relaxed group-hover:text-slate-400 transition-colors">{t(`solutions.comps.${comp.id}.desc`)}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
