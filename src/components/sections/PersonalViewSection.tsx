import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, User, Calendar, ShieldCheck, HeartHandshake } from 'lucide-react';
import soundCtrl from '../../utils/SoundController';
import { useLanguage } from '../../utils/LanguageContext';

interface Pledge {
  id: string;
  name: string;
  skill: string;
  customPledge?: string;
  date: string;
}

const mockPledgesKeys = [
  {
    id: 'mock-1',
    name: 'Алимхан',
    skillKey: 'solutions.comps.digital.name',
    pledgeKey: 'solutions.outcomes.auto_dig',
    date: '21.05.2026'
  },
  {
    id: 'mock-2',
    name: 'Мадина',
    skillKey: 'solutions.comps.learning.name',
    pledgeKey: 'solutions.outcomes.edu_learn',
    date: '20.05.2026'
  },
  {
    id: 'mock-3',
    name: 'Данияр',
    skillKey: 'solutions.comps.thinking.name',
    pledgeKey: 'solutions.outcomes.bal_think',
    date: '19.05.2026'
  }
];

const skillOptions = [
  { key: "solutions.comps.digital.name", label: "Цифровая грамотность" },
  { key: "solutions.comps.thinking.name", label: "Критическое мышление" },
  { key: "solutions.comps.learning.name", label: "Самообучение (Lifelong)" },
  { key: "competences.c1.title", label: "Глобальная гражданственность" }
];

export default function PersonalViewSection({ id }: { id: string }) {
  const { t, lang } = useLanguage();
  const [name, setName] = useState('');
  const [selectedSkillKey, setSelectedSkillKey] = useState(skillOptions[0].key);
  const [customText, setCustomText] = useState('');
  
  // Lazy initialize only user-created custom pledges from localStorage
  const [customPledges, setCustomPledges] = useState<Pledge[]>(() => {
    try {
      const saved = localStorage.getItem('global_competence_pledges_v2');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Dynamically map and translate mock pledges on the fly
  const mockPledges: Pledge[] = mockPledgesKeys.map(p => ({
    id: p.id,
    name: p.name,
    skill: t(p.skillKey),
    customPledge: t(p.pledgeKey),
    date: p.date
  }));

  // Combine custom and mock pledges
  const pledges = [...customPledges, ...mockPledges];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    soundCtrl.success();

    const locale = lang === 'RU' ? 'ru-RU' : lang === 'KZ' ? 'kk-KZ' : 'en-US';
    const newPledge: Pledge = {
      id: `pledge-${Date.now()}`,
      name: name.trim(),
      skill: t(selectedSkillKey),
      customPledge: customText.trim() || t('personal.pledgeDefault'),
      date: new Date().toLocaleDateString(locale)
    };

    const updated = [newPledge, ...customPledges];
    setCustomPledges(updated);
    localStorage.setItem('global_competence_pledges_v2', JSON.stringify(updated));

    // Reset fields
    setName('');
    setCustomText('');
  };

  const handleHover = () => {
    soundCtrl.hover();
  };

  return (
    <section id={id} className="py-28 px-6 bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
      {/* Decorative glows */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute bottom-[10%] left-[20%] w-[350px] h-[350px] bg-kz-yellow/5 rounded-full blur-[130px]" />
        <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] bg-kz-blue/5 rounded-full blur-[130px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-kz-blue font-semibold tracking-wider uppercase text-xs mb-2 block font-display">{t('personal.badge')}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            {t('personal.title')}
          </h2>
          <div className="w-24 h-[3px] bg-gradient-to-r from-kz-blue to-kz-yellow mx-auto rounded-full mb-6 shadow-[0_0_10px_rgba(0,175,202,0.5)]" />
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light font-sans">
            {t('personal.desc')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Pledge Submission Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4 glass-panel border-white/5 rounded-3xl p-6 md:p-8 shadow-2xl relative"
          >
            <div className="absolute top-4 right-4 text-kz-blue/40">
              <HeartHandshake className="w-6 h-6 animate-pulse" />
            </div>

            <h3 className="text-xl font-bold font-display text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-kz-yellow" />
              {t('personal.formTitle')}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">{t('personal.labelName')}</label>
                <input
                  type="text"
                  required
                  placeholder={t('personal.placeholderName')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={handleHover}
                  className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-kz-blue focus:ring-1 focus:ring-kz-blue transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">{t('personal.labelSkill')}</label>
                <div className="grid grid-cols-1 gap-2">
                  {skillOptions.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => {
                        soundCtrl.click();
                        setSelectedSkillKey(option.key);
                      }}
                      onMouseEnter={handleHover}
                      className={`py-2 px-3 text-xs text-left font-display rounded-lg border transition-all cursor-none
                        ${selectedSkillKey === option.key 
                          ? 'bg-kz-blue/10 border-kz-blue text-kz-blue shadow-[0_0_15px_rgba(0,175,202,0.15)]' 
                          : 'bg-white/[0.01] border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/5'}`}
                    >
                      {t(option.key)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">{t('personal.labelDetails')}</label>
                <textarea
                  placeholder={t('personal.placeholderDetails')}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  onFocus={handleHover}
                  rows={3}
                  className="w-full bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-kz-blue focus:ring-1 focus:ring-kz-blue transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                onMouseEnter={handleHover}
                className="w-full py-3.5 bg-kz-blue text-white rounded-xl font-semibold font-display text-sm flex items-center justify-center gap-2 hover:bg-kz-blue/90 shadow-[0_4px_20px_rgba(0,175,204,0.25)] hover:shadow-[0_4px_30px_rgba(0,175,204,0.4)] transition-all cursor-none transform active:scale-98"
              >
                {t('personal.submitBtn')}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

          {/* Staggered Pledges Grid */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-xs font-mono uppercase tracking-widest text-slate-500">
                {t('personal.cardsTitle')} {pledges.length}
              </span>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <ShieldCheck className="w-4 h-4" />
                {t('personal.savedLabel')}
              </div>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[580px] overflow-y-auto pr-2 scrollbar-thin"
            >
              <AnimatePresence initial={false}>
                {pledges.map((pledge) => (
                  <motion.div
                    key={pledge.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -15 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="p-5 rounded-2xl dark-glass-panel border border-white/5 flex flex-col justify-between hover:border-white/10 transition-colors shadow-lg"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-kz-blue">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-bold font-display text-sm text-slate-200">{pledge.name}</h4>
                            <span className="text-[9px] font-mono uppercase text-kz-yellow tracking-wider">{pledge.skill}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-xs md:text-sm text-slate-400 font-sans font-light leading-relaxed italic mb-4">
                        "{pledge.customPledge}"
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-600 mt-2 border-t border-white/5 pt-2">
                      <Calendar className="w-3 h-3" />
                      {pledge.date}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
