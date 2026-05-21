import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
import { RotateCcw, Award, Check, X } from 'lucide-react';
import soundCtrl from '../../utils/SoundController';
import { useLanguage } from '../../utils/LanguageContext';
import WebGLCertificate from '../WebGLCertificate';

interface QuizStatement {
  id: number;
  key: string;
}

const quizStatements: QuizStatement[] = [
  { id: 1, key: 'q1' },
  { id: 2, key: 'q2' },
  { id: 3, key: 'q3' },
  { id: 4, key: 'q4' },
  { id: 5, key: 'q5' }
];

export default function QuizSection({ id }: { id: string }) {
  const { t } = useLanguage();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  
  // Certificate states
  const [userName, setUserName] = useState('');
  const [isCertified, setIsCertified] = useState(false);

  // Tinder Card Swipe physics
  const motionX = useMotionValue(0);
  const rotateValue = useTransform(motionX, [-200, 200], [-30, 30]);
  const opacityLeft = useTransform(motionX, [-150, 0], [1, 0]);
  const opacityRight = useTransform(motionX, [0, 150], [0, 1]);

  const handleSwipe = (approved: boolean) => {
    if (swipeDirection !== null) return;

    if (approved) {
      setScore(prev => prev + 10);
      soundCtrl.success();
    } else {
      soundCtrl.click();
    }

    setSwipeDirection(approved ? 'right' : 'left');

    setTimeout(() => {
      motionX.set(0);
      setSwipeDirection(null);
      if (currentIdx < quizStatements.length - 1) {
        setCurrentIdx(prev => prev + 1);
      } else {
        setShowResult(true);
      }
    }, 300);
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 120;
    if (info.offset.x > threshold) {
      handleSwipe(true);
    } else if (info.offset.x < -threshold) {
      handleSwipe(false);
    }
  };

  const resetQuiz = () => {
    soundCtrl.click();
    setCurrentIdx(0);
    setScore(0);
    setShowResult(false);
    setUserName('');
    setIsCertified(false);
  };

  const getResult = () => {
    const pct = (score / (quizStatements.length * 10)) * 100;
    if (pct >= 80) return { title: t("quiz.r1.title"), desc: t("quiz.r1.desc"), color: "text-kz-blue", badge: "Awwwards Class A" };
    if (pct >= 50) return { title: t("quiz.r2.title"), desc: t("quiz.r2.desc"), color: "text-kz-yellow", badge: "Awwwards Class B" };
    return { title: t("quiz.r3.title"), desc: t("quiz.r3.desc"), color: "text-rose-400", badge: "Awwwards Class C" };
  };

  const activeStatement = quizStatements[currentIdx] || quizStatements[quizStatements.length - 1];

  return (
    <section id={id} className="py-28 px-6 bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-kz-blue/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-kz-yellow/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-kz-blue font-semibold tracking-wider uppercase text-xs mb-2 block font-display">{t('quiz.badge')}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">{t('quiz.title')}</h2>
          <p className="text-slate-400 text-sm font-sans font-light">{t('quiz.desc')}</p>
        </motion.div>

        <div className="relative min-h-[460px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div 
                key="deck" 
                className="w-full flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Tinder Card Stack */}
                <div className="relative w-full h-[320px] max-w-[360px] flex items-center justify-center">
                  
                  {/* Background Stack Card (Visual only) */}
                  {currentIdx + 1 < quizStatements.length && (
                    <div className="absolute w-full h-full rounded-3xl glass-panel border border-white/5 opacity-40 scale-95 translate-y-4 pointer-events-none z-0" />
                  )}
                  {currentIdx + 2 < quizStatements.length && (
                    <div className="absolute w-full h-full rounded-3xl glass-panel border border-white/5 opacity-10 scale-90 translate-y-8 pointer-events-none z-0" />
                  )}

                  {/* Main Active Card */}
                  <motion.div
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDragEnd}
                    style={{
                      x: motionX,
                      rotate: rotateValue,
                      touchAction: 'pan-y' // Prevent breaking native page scrolling on mobile
                    }}
                    animate={swipeDirection === 'left' ? { x: -400, opacity: 0, scale: 0.8 } : swipeDirection === 'right' ? { x: 400, opacity: 0, scale: 0.8 } : { x: 0, opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="absolute w-full h-full dark-glass-panel rounded-3xl p-8 border border-white/10 flex flex-col justify-between shadow-2xl z-10 cursor-grab active:cursor-grabbing select-none"
                  >
                    {/* Glowing swipe feedback badges */}
                    <motion.div style={{ opacity: opacityRight }} className="absolute top-6 left-6 border-2 border-emerald-500 text-emerald-400 text-xs font-bold font-mono tracking-widest uppercase px-3 py-1.5 rounded rotate-[-12deg] z-20 pointer-events-none">
                      {t('quiz.swipeRight')}
                    </motion.div>
                    <motion.div style={{ opacity: opacityLeft }} className="absolute top-6 right-6 border-2 border-rose-500 text-rose-400 text-xs font-bold font-mono tracking-widest uppercase px-3 py-1.5 rounded rotate-[12deg] z-20 pointer-events-none">
                      {t('quiz.swipeLeft')}
                    </motion.div>

                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-[10px] font-mono tracking-widest text-kz-blue uppercase">{t(`quiz.${activeStatement.key}.category`)}</span>
                        <span className="text-[10px] font-mono text-slate-500">{currentIdx + 1} / {quizStatements.length}</span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-bold font-display text-white leading-relaxed text-center py-4">
                        {t(`quiz.${activeStatement.key}.statement`)}
                      </h3>
                    </div>

                    <div className="text-center text-xs font-mono text-slate-500 uppercase tracking-widest animate-pulse">
                      {t('quiz.swipeHint')}
                    </div>
                  </motion.div>
                </div>

                {/* Programmatic Controls (Click fallbacks for Usability / Trackpads / Mobile) */}
                <div className="flex gap-4 items-center justify-center mt-10">
                  <button
                    onClick={() => handleSwipe(false)}
                    className="w-14 h-14 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:text-white hover:bg-rose-500 hover:border-rose-500 transition-all flex items-center justify-center cursor-none shadow-lg shadow-rose-950/20 hover:scale-105 active:scale-95"
                    title="Swipe Left / Нет"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => handleSwipe(true)}
                    className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 transition-all flex items-center justify-center cursor-none shadow-lg shadow-emerald-950/20 hover:scale-105 active:scale-95"
                    title="Swipe Right / Да"
                  >
                    <Check className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full flex flex-col items-center justify-center"
              >
                {!isCertified ? (
                  <div className="dark-glass-panel rounded-3xl p-8 border border-white/10 w-full text-center space-y-6 shadow-2xl">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-kz-blue/20 to-kz-yellow/20 border border-white/10 flex items-center justify-center mx-auto">
                      <Award className="w-8 h-8 text-kz-yellow" />
                    </div>
                    
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500">{t('quiz.resultTitle')}</span>
                      <h3 className={`text-2xl font-bold font-display mt-1 ${getResult().color}`}>
                        {getResult().title}
                      </h3>
                      <div className="inline-block mt-2 px-3 py-1 rounded bg-white/5 border border-white/5 font-mono text-xs text-slate-400">
                        {t('quiz.scoreLabel')} {score} / 50
                      </div>
                    </div>

                    <p className="text-sm text-slate-300 font-sans font-light leading-relaxed max-w-md mx-auto">
                      {getResult().desc}
                    </p>

                    {/* Certificate Form */}
                    <div className="border-t border-white/5 pt-6 space-y-4">
                      <h4 className="text-xs uppercase font-mono tracking-wider text-kz-blue font-bold">{t('quiz.certTitle')}</h4>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder={t('quiz.placeholderName')}
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="flex-1 bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm placeholder-slate-500 focus:outline-none focus:border-kz-blue"
                        />
                        <button
                          onClick={() => {
                            if (userName.trim()) {
                              soundCtrl.success();
                              setIsCertified(true);
                            }
                          }}
                          disabled={!userName.trim()}
                          className="px-5 py-2.5 bg-kz-blue text-white rounded-xl font-semibold font-display text-sm hover:bg-kz-blue/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-none"
                        >
                          {t('quiz.submitCert')}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={resetQuiz}
                      className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-white transition-colors cursor-none"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      {t('quiz.retryBtn')}
                    </button>
                  </div>
                ) : (
                  // Custom WebGL Certificate with Holographic Foil
                  <WebGLCertificate 
                    userName={userName} 
                    score={score} 
                    badge={getResult().badge} 
                    onReset={resetQuiz} 
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
