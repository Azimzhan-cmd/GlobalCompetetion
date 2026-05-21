import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import soundCtrl from '../../utils/SoundController';
import { useLanguage } from '../../utils/LanguageContext';
import KazakhstanMap3D from '../KazakhstanMap3D';

const dataDynamics = [
  { year: '2019', rate: 4.8 },
  { year: '2020', rate: 4.9 },
  { year: '2021', rate: 4.9 },
  { year: '2022', rate: 4.9 },
  { year: '2023', rate: 4.7 },
  { year: '2024', rate: 4.7 },
];

const dataYouth = [
  { category: 'Мужчины (15-28)', value: 3.5 },
  { category: 'Женщины (15-28)', value: 4.2 },
  { category: 'Город', value: 4.1 },
  { category: 'Село', value: 3.2 },
];

// Helper Counter component for premium Awwwards count-up effect
function Counter({ value, decimal = false }: { value: number; decimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => 
    decimal ? latest.toFixed(1) : Math.floor(latest).toLocaleString()
  );
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration: 1.8, ease: "easeOut" });
      return () => controls.stop();
    }
  }, [inView, value, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function StatsSection({ id }: { id: string }) {
  const handleCardHover = () => {
    soundCtrl.hover();
  };
  const { t, lang } = useLanguage();

  return (
    <section id={id} className="py-24 px-6 relative bg-transparent border-t border-white/5">
      {/* Decorative bg glow */}
      <div className="absolute top-[20%] right-0 w-80 h-80 bg-kz-blue/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-80 h-80 bg-kz-yellow/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-left"
        >
          <span className="text-kz-blue font-semibold tracking-wider uppercase text-xs mb-2 block font-display">{t('stats.badge')}</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-display">{t('stats.title')}</h2>
          <p className="text-base text-slate-400 max-w-2xl font-sans font-light">
            {t('stats.desc')}
          </p>
        </motion.div>

        {/* Interactive 3D Regional Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <KazakhstanMap3D />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Dynamics */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onMouseEnter={handleCardHover}
            className="bg-[#0b0f19]/60 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl"
          >
            <h3 className="text-lg font-semibold mb-6 text-slate-200 font-display text-left">{t('stats.chart1')}</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dataDynamics} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00AFCA" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00AFCA" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B', fontSize: 11}} domain={[4, 5.5]} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#090d16', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
                    labelStyle={{ color: '#94A3B8', fontFamily: 'monospace' }}
                    itemStyle={{ color: '#00AFCA' }}
                  />
                  <Area type="monotone" dataKey="rate" stroke="#00AFCA" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-xs text-slate-500 font-mono text-left">
              {t('stats.chart1Note')}
            </p>
          </motion.div>

          {/* Chart 2: Youth */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onMouseEnter={handleCardHover}
            className="bg-[#0b0f19]/60 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/5 shadow-2xl"
          >
            <h3 className="text-lg font-semibold mb-6 text-slate-200 font-display text-left">{t('stats.chart2')}</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataYouth} layout="vertical" margin={{ top: 0, right: 10, left: 35, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 11}} width={120} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.02)'}} 
                    contentStyle={{ backgroundColor: '#090d16', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                    itemStyle={{ color: '#FEC105' }}
                  />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={16}>
                    {dataYouth.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#00AFCA' : '#FEC105'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-xs text-slate-500 font-mono text-left">
              {t('stats.chart2Note')}
            </p>
          </motion.div>
        </div>

        {/* Stats Grid with dynamic count-up */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            { label: t('stats.counter1'), value: 9.2, suffix: lang === 'EN' ? 'M' : ' млн', color: 'text-kz-blue', decimal: true },
            { label: t('stats.counter2'), value: 8.8, suffix: lang === 'EN' ? 'M' : ' млн', color: 'text-slate-300', decimal: true },
            { label: t('stats.counter3'), value: 450, suffix: lang === 'EN' ? 'k' : ' тыс.', color: 'text-rose-500', decimal: false },
            { label: t('stats.counter4'), value: 15, prefix: '~', suffix: '%', color: 'text-kz-yellow', decimal: false },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              onMouseEnter={handleCardHover}
              className="bg-white/[0.01] backdrop-blur-sm hover:bg-white/[0.03] rounded-2xl p-6 text-center border border-white/5 transition-colors"
            >
              <div className={`text-3xl font-bold mb-2 font-display ${stat.color} text-center`}>
                {stat.prefix}
                <Counter value={stat.value} decimal={stat.decimal} />
                {stat.suffix}
              </div>
              <div className="text-xs text-slate-400 font-light leading-snug text-center">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Evidence Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onMouseEnter={handleCardHover}
          className="mt-12 bg-rose-500/[0.02] rounded-3xl p-6 md:p-8 border border-rose-500/10 shadow-2xl relative overflow-hidden text-left"
        >
          {/* Subtle background red spotlight */}
          <div className="absolute -bottom-[50%] -left-[10%] w-[40%] h-[100%] bg-rose-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3 font-display">
            <span className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center text-sm font-semibold border border-rose-500/20">!</span>
            {t('stats.evidenceTitle')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="bg-slate-950/40 p-5 rounded-2xl border border-white/5 hover:border-rose-500/20 transition-colors">
              <h4 className="font-semibold text-rose-400 mb-2 font-display">{t('stats.evidence1Title')}</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                {t('stats.evidence1Desc')}
              </p>
            </div>
            <div className="bg-slate-950/40 p-5 rounded-2xl border border-white/5 hover:border-rose-500/20 transition-colors">
              <h4 className="font-semibold text-rose-400 mb-2 font-display">{t('stats.evidence2Title')}</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                {t('stats.evidence2Desc')}
              </p>
            </div>
            <div className="bg-slate-950/40 p-5 rounded-2xl border border-white/5 hover:border-rose-500/20 transition-colors">
              <h4 className="font-semibold text-rose-400 mb-2 font-display">{t('stats.evidence3Title')}</h4>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                {t('stats.evidence3Desc')}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
