import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Target, Lightbulb, BrainCircuit, ChevronLeft, Home, Menu, X, PlayCircle, Globe, UserCheck } from 'lucide-react';
import HeroSection from './sections/HeroSection';
import StatsSection from './sections/StatsSection';
import CausesSection from './sections/CausesSection';
import CompetencesSection from './sections/CompetencesSection';
import SolutionsSection from './sections/SolutionsSection';
import QuizSection from './sections/QuizSection';
import VideoSection from './sections/VideoSection';
import GlobalExperienceSection from './sections/GlobalExperienceSection';
import PersonalViewSection from './sections/PersonalViewSection';

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
  { id: 'solutions', label: 'Решения', icon: Lightbulb },
  { id: 'personal', label: 'Наш вклад', icon: UserCheck },
  { id: 'quiz', label: 'Интерактив', icon: BrainCircuit },
];

export default function MainSite({ onBack, initialSection }: MainSiteProps) {
  const [activeSection, setActiveSection] = useState(initialSection);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (initialSection !== 'home') {
      setTimeout(() => scrollToSection(initialSection), 100);
    }
  }, [initialSection]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-slate-50 font-sans"
    >
      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          <button 
            onClick={onBack}
            className={`flex items-center gap-2 font-medium transition-colors ${scrolled ? 'text-slate-800 hover:text-kz-blue' : 'text-slate-800 hover:text-kz-blue'}`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden md:inline">В лаунчер</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1 bg-white/50 backdrop-blur-md rounded-full p-1 border border-slate-200/50 shadow-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                  ${activeSection === item.id 
                    ? 'bg-kz-blue text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-100'}`}
              >
                <item.icon className={`w-4 h-4 ${activeSection === item.id ? 'text-white' : 'text-slate-400'}`} />
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl text-lg font-medium transition-all
                    ${activeSection === item.id ? 'bg-kz-blue/10 text-kz-blue' : 'text-slate-700 hover:bg-slate-100'}`}
                >
                  <item.icon className="w-6 h-6" />
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pb-24">
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
      <footer className="bg-slate-900 text-slate-400 py-12 text-center border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center items-center gap-3 mb-6">
            <div className="w-8 h-1 bg-kz-blue rounded-full"></div>
            <div className="w-8 h-1 bg-kz-yellow rounded-full"></div>
          </div>
          <p className="mb-4">Проект-исследование: "Проблема безработицы в Казахстане через призму глобальных компетенций"</p>
          <p className="text-sm opacity-60">© 2026. Разработано для образовательных целей.</p>
        </div>
      </footer>
    </motion.div>
  );
}
