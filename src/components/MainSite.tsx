import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Target, Lightbulb, BrainCircuit, ChevronLeft, Home, Menu, X, PlayCircle, Globe, UserCheck, VolumeX } from 'lucide-react';
import HeroSection from './sections/HeroSection';
import StatsSection from './sections/StatsSection';
import CausesSection from './sections/CausesSection';
import CompetencesSection from './sections/CompetencesSection';
import SolutionsSection from './sections/SolutionsSection';
import QuizSection from './sections/QuizSection';
import VideoSection from './sections/VideoSection';
import GlobalExperienceSection from './sections/GlobalExperienceSection';
import PersonalViewSection from './sections/PersonalViewSection';
import soundCtrl from '../utils/SoundController';
import { useLanguage, type LanguageType } from '../utils/LanguageContext';

// Matrix Glitch Text effect component
export function GlitchText({ text, speed = 40 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = 'QWERTYUIOPASDFGHJKLZXCVBNM@#$%&*0123456789_';

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((char, index) => {
        if (char === ' ') return ' ';
        if (index < iteration) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayText}</span>;
}

interface MainSiteProps {
  onBack: () => void;
  initialSection: string;
}

const navItems = [
  { id: 'home', label: 'Главная', icon: Home },
  { id: 'stats', label: 'Статистика', icon: LayoutDashboard },
  { id: 'causes', label: 'Причины', icon: Target },
  { id: 'competences', label: 'Компетенции', icon: BrainCircuit },
  { id: 'video', label: 'Видео', icon: PlayCircle },
  { id: 'global', label: 'Мировой опыт', icon: Globe },
  { id: 'solutions', label: 'Песочница', icon: Lightbulb },
  { id: 'personal', label: 'Наш вклад', icon: UserCheck },
  { id: 'quiz', label: 'Tinder-тест', icon: BrainCircuit },
];

export default function MainSite({ onBack, initialSection }: MainSiteProps) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(soundCtrl.getMuted());
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    soundCtrl.click();
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundCtrl.setMute(next);
    soundCtrl.click();
  };

  useEffect(() => {
    if (initialSection !== 'home') {
      setTimeout(() => scrollToSection(initialSection), 100);
    }
  }, [initialSection]);

  const handleNavHover = () => {
    soundCtrl.hover();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-slate-950 text-slate-100 font-sans"
    >
      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <button 
            onClick={onBack}
            onMouseEnter={handleNavHover}
            data-magnetic
            className="flex items-center gap-2 font-medium text-slate-300 hover:text-kz-blue transition-colors px-3 py-1.5 rounded-full bg-white/5 border border-white/5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden md:inline font-display text-sm">
              <GlitchText text={t('nav.toLauncher')} />
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 bg-white/[0.02] backdrop-blur-md rounded-full p-1 border border-white/5 shadow-lg">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={handleNavHover}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all duration-300 flex items-center gap-2 font-display
                  ${activeSection === item.id 
                    ? 'bg-kz-blue text-white shadow-md shadow-kz-blue/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                <item.icon className={`w-3.5 h-3.5 ${activeSection === item.id ? 'text-white' : 'text-slate-500'}`} />
                {t('nav.' + item.id)}
              </button>
            ))}
          </div>

          {/* Controls (Mute, Language Selector & Mobile Menu) */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-white/5 rounded-full border border-white/10 p-0.5 font-mono text-[10px] font-bold shadow-inner">
              {(['KZ', 'RU', 'EN'] as LanguageType[]).map((l) => (
                <button
                  key={l}
                  onClick={() => {
                    soundCtrl.click();
                    setLang(l);
                  }}
                  className={`px-2.5 py-1 rounded-full transition-all duration-300 cursor-pointer ${lang === l ? 'bg-kz-blue text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Audio Toggle button */}
            <button
              onClick={toggleMute}
              onMouseEnter={handleNavHover}
              data-magnetic
              title={isMuted ? t('nav.unmute') : t('nav.mute')}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all flex items-center justify-center h-9 w-9"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <div className="flex items-end gap-[2px] h-3.5 w-3.5 justify-center">
                  <div className="w-[1.5px] bg-kz-blue sound-wave-bar h-1"></div>
                  <div className="w-[1.5px] bg-kz-blue sound-wave-bar h-3.5"></div>
                  <div className="w-[1.5px] bg-kz-blue sound-wave-bar h-2"></div>
                  <div className="w-[1.5px] bg-kz-blue sound-wave-bar h-3"></div>
                </div>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-300 hover:text-white bg-white/5 rounded-full border border-white/5"
              onClick={() => {
                soundCtrl.click();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-slate-950/98 backdrop-blur-2xl pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onMouseEnter={handleNavHover}
                  className={`flex items-center gap-4 p-4 rounded-2xl text-base font-semibold font-display tracking-wide uppercase transition-all
                    ${activeSection === item.id 
                      ? 'bg-kz-blue/10 text-kz-blue border border-kz-blue/20' 
                      : 'text-slate-400 hover:text-white bg-white/[0.02] border border-white/5'}`}
                >
                  <item.icon className="w-5 h-5" />
                  {t('nav.' + item.id)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pb-24 relative z-10">
        <HeroSection id="home" />
        <StatsSection id="stats" />
        <CausesSection id="causes" />
        <CompetencesSection id="competences" />
        <VideoSection id="video" />
        <GlobalExperienceSection id="global" />
        <SolutionsSection id="solutions" />
        <PersonalViewSection id="personal" />
        <QuizSection id="quiz" />
      </main>

      {/* Footer */}
      <footer className="bg-[#060813] text-slate-500 py-16 text-center border-t border-slate-900 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-kz-blue rounded-full"></div>
            <div className="w-8 h-[2px] bg-kz-yellow rounded-full"></div>
          </div>
          <p className="mb-4 text-slate-400 font-display font-medium text-sm md:text-base">
            Проблема безработицы в Казахстане через призму глобальных компетенций
          </p>
          <p className="text-xs opacity-50 font-mono">
            © 2026. Разработано под стандарты Awwwards для образовательных целей.
          </p>
        </div>
      </footer>
    </motion.div>
  );
}
