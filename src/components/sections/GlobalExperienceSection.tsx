import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, ArrowLeft, ArrowRight, X } from 'lucide-react';
import soundCtrl from '../../utils/SoundController';
import Globe from 'react-globe.gl';
import type { GlobeMethods } from 'react-globe.gl';
import type { PanInfo } from 'framer-motion';
import { MeshStandardMaterial } from 'three';
import { useLanguage } from '../../utils/LanguageContext';

interface CountryData {
  id: string;
  name: string;
  coordinates: [number, number]; // [lat, lng]
  title: string;
  desc: string;
}

const globalData: CountryData[] = [
  { id: "de", name: "Германия", coordinates: [52.52, 13.40], title: "Дуальное обучение & Kurzarbeit", desc: "Система дуального образования связывает вузы с производством, гарантируя практику. Программа Kurzarbeit субсидирует до 87% зарплаты при вынужденном сокращении часов, предотвращая увольнения." },
  { id: "sg", name: "Сингапур", coordinates: [1.35, 103.82], title: "Экосистема SkillsFuture", desc: "Государство выделяет каждому гражданину старше 25 лет кредиты на непрерывное обучение. Программа TechSkills Accelerator переобучает специалистов под нужды AI и цифровой экономики." },
  { id: "kr", name: "Южная Корея", coordinates: [37.56, 126.97], title: "K-Digital Training & Поддержка Молодежи", desc: "Фокус на обучении молодежи технологиям будущего (AI, Big Data) совместно с гигантами вроде Samsung и Hyundai. Выплата 'молодежных пособий' при активном поиске работы." },
  { id: "dk", name: "Дания", coordinates: [55.67, 12.56], title: "Модель Flexicurity", desc: "Золотой треугольник: гибкий рынок труда (легко уволить/нанять), мощная социальная защита (высокие пособия) и агрессивная система переобучения и активации безработных за счет государства." },
  { id: "jp", name: "Япония", coordinates: [35.67, 139.65], title: "Система Hello Work & AI-Мэтчинг", desc: "Государственная сеть центров занятости использует искусственный интеллект для анализа навыков соискателя и мгновенного подбора вакансий с учетом психологического профиля." },
  { id: "ch", name: "Швейцария", coordinates: [46.94, 7.44], title: "Ранняя профориентация", desc: "Более 70% подростков выбирают профессионально-техническое обучение вместо академического. Программы жестко квотируются под реальный дефицит мест на локальном рынке труда." },
  { id: "fi", name: "Финляндия", coordinates: [60.16, 24.93], title: "Elements of AI & Цифровой Апскейлинг", desc: "Бесплатное массовое обучение нации основам AI для повышения глобальной конкурентоспособности кадров. Переход центров занятости на полностью предиктивные цифровые платформы." },
  { id: "us", name: "США", coordinates: [38.90, -77.03], title: "Налоговые Интенсивы & Tech-Буткемпы", desc: "Субсидирование краткосрочных интенсивных курсов (Bootcamps) и налоговые льготы для ИТ-компаний, нанимающих людей из традиционных секторов (ритейл, производство) без высшего образования." },
  { id: "ae", name: "ОАЭ", coordinates: [24.45, 54.37], title: "Программа Emiratisation (Nafis)", desc: "Субсидирование зарплат граждан ОАЭ в частном секторе, создание экосистем для развития предпринимательства и обязательные квоты на наем локальных талантов в тех-компании." },
  { id: "nl", name: "Нидерланды", coordinates: [52.36, 4.90], title: "Закон о гибком рабочем времени", desc: "Законодательное поощрение высокопродуктивной частичной занятости (part-time jobs). До 50% населения работают неполный день с полным сохранением социальных и трудовых прав." }
];

const kzCoords: [number, number] = [48.01, 66.92];



interface GlobePoint {
  lat: number;
  lng: number;
  color: string;
  name: string;
  size: number;
  isKazakhstan: boolean;
  data: CountryData | null;
}

interface GlobeRing {
  lat: number;
  lng: number;
  color: string;
  maxRadius: number;
  propagationSpeed: number;
  repeatPeriod: number;
}

interface GlobeArc {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  color: string[];
}

export default function GlobalExperienceSection({ id }: { id: string }) {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<boolean>(false);
  const [mobileIdx, setMobileIdx] = useState(0);

  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

  const localizedGlobalData = useMemo<CountryData[]>(() => {
    return globalData.map(c => ({
      ...c,
      name: t(`global.country.${c.id}.name`),
      title: t(`global.country.${c.id}.title`),
      desc: t(`global.country.${c.id}.desc`)
    }));
  }, [t]);

  const selectedCountry = useMemo(() => {
    if (!selectedCountryId) return null;
    return localizedGlobalData.find(c => c.id === selectedCountryId) || null;
  }, [selectedCountryId, localizedGlobalData]);

  const customMaterial = useMemo(() => {
    return new MeshStandardMaterial({
      color: 0x0c1020,
      emissive: 0x020615,
      roughness: 0.95
    });
  }, []);

  // Handle Resize and Mobile toggle
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (containerRef.current && !mobile) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: Math.min(containerRef.current.clientWidth, 500)
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Monitor element dimension changes
  useEffect(() => {
    if (isMobile || !containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        setDimensions({
          width: width,
          height: Math.min(width, 500)
        });
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [isMobile]);

  // Adjust camera controls on load
  useEffect(() => {
    if (globeRef.current && !isMobile) {
      const controls = globeRef.current.controls();
      controls.enableZoom = true;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;

      // Initial camera view focused on Central Asia / Kazakhstan
      globeRef.current.pointOfView({
        lat: kzCoords[0],
        lng: kzCoords[1],
        altitude: 2.2
      }, 0);
    }
  }, [isMobile, dimensions]);

  // Trigger click logic
  const handleSelectCountry = (countryId: string) => {
    soundCtrl.click();
    setSelectedCountryId(countryId);

    const country = globalData.find(c => c.id === countryId);
    if (country && globeRef.current) {
      globeRef.current.pointOfView({
        lat: country.coordinates[0],
        lng: country.coordinates[1],
        altitude: 1.6
      }, 1500);

      // Disable auto-rotation to focus
      const controls = globeRef.current.controls();
      controls.autoRotate = false;
    }
  };

  // Trigger close / reset camera
  const handleCloseDetail = () => {
    soundCtrl.click();
    setSelectedCountryId(null);

    if (globeRef.current) {
      globeRef.current.pointOfView({
        lat: kzCoords[0],
        lng: kzCoords[1],
        altitude: 2.2
      }, 1500);

      // Enable auto-rotation back
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
    }
  };

  const handleHover = () => {
    soundCtrl.hover();
  };

  // Build Globe Render Data
  const pointsData: GlobePoint[] = [
    ...localizedGlobalData.map((c): GlobePoint => ({
      lat: c.coordinates[0],
      lng: c.coordinates[1],
      color: '#00AFCA',
      name: c.name,
      size: 0.16,
      isKazakhstan: false,
      data: c
    })),
    {
      lat: kzCoords[0],
      lng: kzCoords[1],
      color: '#FEC105',
      name: t('global.kazakhstanHub'),
      size: 0.24,
      isKazakhstan: true,
      data: null
    }
  ];

  const ringsData: GlobeRing[] = [
    ...localizedGlobalData.map((c): GlobeRing => ({
      lat: c.coordinates[0],
      lng: c.coordinates[1],
      color: '#00AFCA',
      maxRadius: 6,
      propagationSpeed: 2,
      repeatPeriod: 2000
    })),
    {
      lat: kzCoords[0],
      lng: kzCoords[1],
      color: '#FEC105',
      maxRadius: 10,
      propagationSpeed: 2.5,
      repeatPeriod: 1500
    }
  ];

  const arcsData: GlobeArc[] = selectedCountry ? [{
    startLat: kzCoords[0],
    startLng: kzCoords[1],
    endLat: selectedCountry.coordinates[0],
    endLng: selectedCountry.coordinates[1],
    color: ['#FEC105', '#00AFCA'] // gold from KZ to cyan target country
  }] : [];

  // Mobile Swipe Handlers
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      soundCtrl.swipe();
      setMobileIdx(prev => (prev - 1 + localizedGlobalData.length) % localizedGlobalData.length);
    } else if (info.offset.x < -threshold) {
      soundCtrl.swipe();
      setMobileIdx(prev => (prev + 1) % localizedGlobalData.length);
    }
  };

  return (
    <section id={id} className="py-28 px-6 bg-slate-950 text-white relative overflow-hidden border-t border-white/5">
      {/* Dynamic Background Glows */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kz-blue/10 rounded-full blur-[160px]" />
        <div className="absolute right-[10%] top-[10%] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-kz-blue font-semibold tracking-wider uppercase text-xs mb-2 block font-display">{t('global.badge')}</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
            {t('global.title')}
          </h2>
          <div className="w-24 h-[3px] bg-gradient-to-r from-kz-blue to-kz-yellow mx-auto rounded-full mb-6 shadow-[0_0_10px_rgba(0,175,202,0.5)]" />
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light font-sans leading-relaxed">
            {t('global.desc')}
          </p>
        </motion.div>

        {isMobile ? (
          /* ========================================================================= */
          /* MOBILE VIEW: Premium Swipeable Cards (Completely bypasses 3D for 60fps) */
          /* ========================================================================= */
          <div className="flex flex-col items-center space-y-6">
            <div className="w-full max-w-md px-4">
              <motion.div 
                className="relative min-h-[380px] p-6 rounded-3xl dark-glass-panel border border-white/5 shadow-2xl flex flex-col justify-between overflow-hidden touch-none"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
              >
                {/* Background watermarks */}
                <div className="absolute right-4 top-4 text-7xl font-bold font-display text-white/5 pointer-events-none select-none uppercase">
                  {localizedGlobalData[mobileIdx].id}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={mobileIdx}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6 flex-1 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs uppercase font-mono tracking-wider text-kz-yellow font-bold">{t('global.leaderCountry')}</span>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
                          {mobileIdx + 1} / {localizedGlobalData.length}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold font-display text-white mt-2">{localizedGlobalData[mobileIdx].name}</h3>
                      <div className="w-12 h-[2px] bg-kz-blue mt-2" />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">{t('global.stateInitiative')}</span>
                        <h4 className="text-base font-semibold font-display text-slate-200 mt-1">{localizedGlobalData[mobileIdx].title}</h4>
                      </div>
                      <p className="text-slate-400 text-sm font-sans font-light leading-relaxed">
                        {localizedGlobalData[mobileIdx].desc}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                      <GraduationCap className="w-5 h-5 text-kz-blue shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-kz-blue font-bold">{t('global.experienceRK')}</span>
                        <p className="text-slate-300 text-xs font-sans mt-0.5 leading-relaxed">
                          {t('global.experienceRKDesc')}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Slider navigation helper */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => {
                  soundCtrl.click();
                  setMobileIdx(prev => (prev - 1 + localizedGlobalData.length) % localizedGlobalData.length);
                }}
                className="p-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-slate-400">{t('global.swipeHint')}</span>
              <button
                onClick={() => {
                  soundCtrl.click();
                  setMobileIdx(prev => (prev + 1) % localizedGlobalData.length);
                }}
                className="p-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 text-white transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* DESKTOP VIEW: Beautiful 3D Globe with Side Dashboard Panel */
          /* ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left/Globe side (lg:col-span-7) */}
            <div 
              ref={containerRef}
              className="lg:col-span-7 flex justify-center items-center relative rounded-3xl overflow-hidden border border-white/5 bg-slate-950/40 p-4 shadow-inner min-h-[500px]"
            >
              {/* Radar Grid overlay effects */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0),rgba(9,13,22,0.9))] pointer-events-none z-10" />
              <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-10" />

              {/* Holographic hud indicators */}
              <div className="absolute top-6 left-6 z-20 font-mono text-[10px] text-slate-500 space-y-1 select-none">
                <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-kz-blue animate-pulse" /> 3D ORBIT ENGINE ACTIVE</p>
                <p>LATENCY: 14MS // SECTOR: GL-09</p>
              </div>

              <div className="absolute bottom-6 left-6 z-20 font-mono text-[10px] text-slate-500 select-none">
                <p>KAZAKHSTAN HUB: 48.01° N, 66.92° E</p>
              </div>

              {/* The Globe Component */}
              <div 
                className="relative z-10 cursor-pointer"
                data-cursor-text={hoveredPoint ? t('global.exploreHint') : undefined}
              >
                <Globe
                  ref={globeRef}
                  width={dimensions.width - 32}
                  height={dimensions.height - 32}
                  backgroundColor="rgba(0,0,0,0)"
                  showAtmosphere={true}
                  atmosphereColor="#00AFCA"
                  atmosphereAltitude={0.16}
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                  bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                  globeMaterial={customMaterial}

                  // Points/Markers
                  pointsData={pointsData}
                  pointLat="lat"
                  pointLng="lng"
                  pointColor="color"
                  pointAltitude={0.06}
                  pointRadius={0.4}
                  pointLabel={(d: object) => {
                    const gp = d as GlobePoint;
                    return `
                      <div style="color: #fff; background: rgba(15,23,42,0.9); border: 1px solid rgba(0,175,202,0.3); padding: 8px 12px; border-radius: 8px; font-family: sans-serif; font-size: 11px; backdrop-filter: blur(4px);">
                        <strong style="color: #FEC105;">${gp.name}</strong>
                      </div>
                    `;
                  }}
                  onPointClick={(point: object) => {
                    const p = point as GlobePoint;
                    if (p.isKazakhstan || !p.data) return;
                    handleSelectCountry(p.data.id);
                  }}
                  onPointHover={(point: object | null) => {
                    const p = point as GlobePoint | null;
                    const isTargetPoint = !!p && !p.isKazakhstan;
                    setHoveredPoint(isTargetPoint);
                    
                    if (isTargetPoint) {
                      soundCtrl.hover();
                      if (globeRef.current) {
                        globeRef.current.controls().autoRotateSpeed = 0.1;
                      }
                    } else {
                      if (globeRef.current) {
                        globeRef.current.controls().autoRotateSpeed = 0.6;
                      }
                    }
                  }}

                  // Pulse Rings
                  ringsData={ringsData}
                  ringLat="lat"
                  ringLng="lng"
                  ringColor="color"
                  ringMaxRadius="maxRadius"
                  ringPropagationSpeed="propagationSpeed"
                  ringRepeatPeriod="repeatPeriod"

                  // Laser Connections (Arcs)
                  arcsData={arcsData}
                  arcStartLat="startLat"
                  arcStartLng="startLng"
                  arcEndLat="endLat"
                  arcEndLng="endLng"
                  arcColor="color"
                  arcDashLength={0.35}
                  arcDashGap={0.15}
                  arcDashAnimateTime={1100}
                  arcStroke={1.8}
                />
              </div>
            </div>

            {/* Right/Dashboard Side (lg:col-span-5) */}
            <div className="lg:col-span-5 min-h-[500px] flex flex-col justify-center">
              <div className="p-8 rounded-3xl dark-glass-panel border border-white/5 shadow-2xl relative overflow-hidden min-h-[460px] flex flex-col justify-between">
                
                {/* Tech scan lines background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] opacity-5 pointer-events-none" />

                <AnimatePresence mode="wait">
                  {!selectedCountry ? (
                    <motion.div
                      key="country-list"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div>
                        <span className="text-xs uppercase font-mono tracking-wider text-kz-yellow font-bold">{t('global.knowledgeBase')}</span>
                        <h3 className="text-xl font-bold font-display text-white mt-1">{t('global.importModels')}</h3>
                        <p className="text-xs text-slate-500 font-sans mt-1">{t('global.selectRegion')}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                        {localizedGlobalData.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => handleSelectCountry(c.id)}
                            onMouseEnter={handleHover}
                            className="p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-[#00AFCA]/5 hover:border-[#00AFCA]/40 text-left transition-all duration-300 flex flex-col justify-between h-24 cursor-none"
                          >
                            <span className="text-[10px] font-mono tracking-widest text-[#FEC105] uppercase font-bold">{c.id}</span>
                            <span className="text-sm font-bold font-display text-white mt-1 leading-tight">{c.name}</span>
                            <span className="text-[10px] text-slate-500 font-sans font-light truncate mt-1 w-full block">{c.title}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="country-details"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -25 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6 flex-1 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs uppercase font-mono tracking-wider text-kz-yellow font-bold">{t('global.spec')}</span>
                            <h3 className="text-2xl font-bold font-display text-white mt-1">{selectedCountry.name}</h3>
                          </div>
                          <button
                            onClick={handleCloseDetail}
                            onMouseEnter={handleHover}
                            className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white transition-colors cursor-none"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="w-12 h-[2px] bg-kz-blue" />
                      </div>

                      <div className="space-y-5">
                        <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                          <span className="text-[10px] uppercase font-mono tracking-widest text-kz-blue font-bold block mb-1">{t('global.stateInitiative')}</span>
                          <h4 className="text-base font-semibold font-display text-slate-200 leading-snug">{selectedCountry.title}</h4>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold block mb-1.5">{t('global.strategyDesc')}</span>
                          <p className="text-slate-300 text-sm font-sans font-light leading-relaxed">
                            {selectedCountry.desc}
                          </p>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-white/5 flex gap-4 items-center">
                        <div className="flex-1 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                          <Briefcase className="w-4 h-4 text-kz-yellow shrink-0 mt-0.5 animate-pulse" />
                          <div>
                            <span className="text-[9px] uppercase font-mono tracking-widest text-kz-yellow font-bold">{t('global.synergyImport')}</span>
                            <p className="text-slate-400 text-xs font-sans mt-0.5 leading-normal">
                              {t('global.synergyImportDesc')}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={handleCloseDetail}
                          onMouseEnter={handleHover}
                          className="px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 shrink-0 cursor-none"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          {t('global.resetBtn')}
                        </button>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
