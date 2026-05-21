/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';

export type LanguageType = 'RU' | 'KZ' | 'EN';

interface Translations {
  [key: string]: {
    [lang in LanguageType]: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.home': { RU: 'Главная', KZ: 'Басты бет', EN: 'Home' },
  'nav.stats': { RU: 'Статистика', KZ: 'Статистика', EN: 'Analytics' },
  'nav.causes': { RU: 'Причины', KZ: 'Себептері', EN: 'Causes' },
  'nav.competences': { RU: 'Компетенции', KZ: 'Құзыреттер', EN: 'Competences' },
  'nav.video': { RU: 'Видео', KZ: 'Бейне', EN: 'Media' },
  'nav.global': { RU: 'Мировой опыт', KZ: 'Әлемдік тәжірибе', EN: 'Global Experience' },
  'nav.solutions': { RU: 'Песочница', KZ: 'Құмсалғыш', EN: 'Sandbox' },
  'nav.personal': { RU: 'Наш вклад', KZ: 'Біздің үлес', EN: 'Contribution' },
  'nav.quiz': { RU: 'Tinder-тест', KZ: 'Tinder-тест', EN: 'Tinder Quiz' },
  'nav.toLauncher': { RU: 'В лаунчер', KZ: 'Лаунчерге', EN: 'To Launcher' },
  'nav.mute': { RU: 'Выключить звук', KZ: 'Дыбысты өшіру', EN: 'Mute Audio' },
  'nav.unmute': { RU: 'Включить звук', KZ: 'Дыбысты қосу', EN: 'Unmute Audio' },

  // Hero Section
  'hero.badge': { RU: 'Глобальный вызов — Локальная реальность', KZ: 'Жаһандық сын-қатер — Жергілікті шындық', EN: 'Global Challenge — Local Reality' },
  'hero.title1': { RU: 'Безработица в', KZ: 'Қазақстандағы', EN: 'Unemployment in' },
  'hero.title2': { RU: 'Казахстане', KZ: 'Жұмыссыздық', EN: 'Kazakhstan' },
  'hero.desc': { 
    RU: 'Основная проблема — разрыв между образованием и реальными потребностями экономики. Ежегодно вузы выпускают тысячи специалистов, но работодателям критически не хватает кадров с практическими навыками.', 
    KZ: 'Басты мәселе — білім беру жүйесі мен экономиканың нақты қажеттіліктері арасындағы алшақтық. Жыл сайын жоғары оқу орындары мыңдаған мамандарды бітіреді, бірақ жұмыс берушілерге тәжірибелік дағдылары бар кадрлар жетіспейді.', 
    EN: 'The core issue is the gap between education and real economic needs. Universities graduate thousands of specialists every year, yet employers critically lack personnel with practical skills.' 
  },
  'hero.dangerTitle': { RU: 'В чем главная опасность?', KZ: 'Басты қауіп неден тұрады?', EN: 'What is the main danger?' },
  'hero.dangerDesc': { 
    RU: 'Ситуацию ускоряет автоматизация процессов: до 40% рутинных рабочих мест находятся в зоне риска. Развитие универсальных компетенций (soft skills) — это единственный щит от безработицы будущего.', 
    KZ: 'Процестерді автоматтандыру жағдайды тездетеді: күнделікті жұмыс орындарының 40%-на дейін қауіп төніп тұр. Әмбебап құзыреттерді (soft skills) дамыту — болашақтағы жұмыссыздықтан қорғайтын жалғыз қалқан.', 
    EN: 'Automation accelerates this trend: up to 40% of routine jobs are at risk. Developing universal competences (soft skills) is the only shield against future unemployment.' 
  },
  'hero.cta': { RU: 'Изучить аналитику', KZ: 'Аналитиканы зерттеу', EN: 'Explore Analytics' },

  // Stats Section
  'stats.badge': { RU: 'Анализ рынка труда', KZ: 'Еңбек нарығын талдау', EN: 'Labour Market Analysis' },
  'stats.title': { RU: 'Аналитика и динамика', KZ: 'Аналитика және динамика', EN: 'Analytics & Dynamics' },
  'stats.desc': { 
    RU: 'Официальные данные демонстрируют стабильность, однако более глубокий анализ раскрывает скрытую безработицу и дисбаланс, в особенности среди молодежи.', 
    KZ: 'Ресми деректер тұрақтылықты көрсетеді, бірақ тереңірек талдау жасырын жұмыссыздық пен теңгерімсіздікті, әсіресе жастар арасында ашады.', 
    EN: 'Official data shows stability, but deeper analysis reveals hidden unemployment and imbalances, especially among youth.' 
  },
  'stats.chart1': { RU: 'Динамика уровня безработицы (%)', KZ: 'Жұмыссыздық деңгейінің динамикасы (%)', EN: 'Unemployment Rate Dynamics (%)' },
  'stats.chart1Note': { RU: '* Средний уровень безработицы держится около 4.7-4.9%', KZ: '* Орташа жұмыссыздық деңгейі 4.7-4.9% шамасында сақталуда', EN: '* Average unemployment rate remains around 4.7-4.9%' },
  'stats.chart2': { RU: 'Молодежная безработица (%)', KZ: 'Жастар жұмыссыздығы (%)', EN: 'Youth Unemployment (%)' },
  'stats.chart2Note': { RU: '* Несоответствие между рынком труда и вузами', KZ: '* Еңбек нарығы мен жоғары оқу орындарының сәйкес келмеуі', EN: '* Mismatch between the labour market and universities' },
  
  // Stats Counters
  'stats.counter1': { RU: 'Рабочая сила страны', KZ: 'Елдің жұмыс күші', EN: 'Labour Force' },
  'stats.counter2': { RU: 'Официально занятые', KZ: 'Ресми жұмыспен қамтылғандар', EN: 'Officially Employed' },
  'stats.counter3': { RU: 'Зарегистрированные безработные', KZ: 'Тіркелген жұмысыздар', EN: 'Registered Unemployed' },
  'stats.counter4': { RU: 'Уровень скрытой самозанятости', KZ: 'Жасырын өзін-өзі жұмыспен қамту деңгейі', EN: 'Hidden Self-employment Rate' },

  // Evidence Block
  'stats.evidenceTitle': { RU: 'Доказательства существования проблемы', KZ: 'Мәселенің бар екендігийнің дәлелдері', EN: 'Evidence of the Problem' },
  'stats.evidence1Title': { RU: 'Парадокс кадрового голода', KZ: 'Кадр тапшылығының парадоксы', EN: 'Talent Shortage Paradox' },
  'stats.evidence1Desc': { 
    RU: 'Несмотря на безработицу, работодатели испытывают жесткий дефицит квалифицированных специалистов в IT, инженерии и техническом производстве.', 
    KZ: 'Жұмыссыздыққа қарамастан, жұмыс берушілер IT, инженерия және техникалық өндіріс салаларында білікті мамандардың тапшылығын сезінуде.', 
    EN: 'Despite unemployment, employers experience a severe shortage of qualified specialists in IT, engineering, and manufacturing.' 
  },
  'stats.evidence2Title': { RU: 'Скрытая нестабильность', KZ: 'Жасырын тұрақсыздық', EN: 'Hidden Instability' },
  'stats.evidence2Desc': { 
    RU: 'Более 2 млн человек классифицируются как «самозанятые», что оборачивается отсутствием соцпакета, трудовых договоров и ОСМС.', 
    KZ: '2 миллионнан астам адам «өзін-өзі жұмыспен қамтығандар» санатына жатады, бұл әлеуметтік пакеттің, еңбек шарттарының және МӘМС жоқтығын білдіреді.', 
    EN: 'Over 2 million people are classified as "self-employed," which often means no social benefits, employment contracts, or state health insurance.' 
  },
  'stats.evidence3Title': { RU: 'NEET Категория (7-8%)', KZ: 'NEET санаты (7-8%)', EN: 'NEET Category (7-8%)' },
  'stats.evidence3Desc': { 
    RU: 'Значительная часть молодежи в РК не учится, не работает и формирует зону повышенного социального риска.', 
    KZ: 'Қазақстандағы жастардың айтарлықтай бөлігі оқымайды, жұмыс істемейді және жоғары әлеуметтік қауіп аймағын құрайды.', 
    EN: 'A significant portion of youth in Kazakhstan does not study or work, forming a high social risk zone.' 
  },

  // 3D Map hover tooltip helper
  'map.hoverHint': { RU: 'Нажми для анализа региона', KZ: 'Аймақты талдау үшін басыңыз', EN: 'Click to analyze region' },
  'map.neetRate': { RU: 'Индекс NEET', KZ: 'NEET индексі', EN: 'NEET Index' },
  'map.selfEmpRate': { RU: 'Скрытая самозанятость', KZ: 'Жасырын өзін-өзі жұмыспен қамту', EN: 'Hidden Self-Employment' },
  'map.descZone': { RU: 'Ключевой вызов', KZ: 'Басты мәселе', EN: 'Key Challenge' },
  'map.close': { RU: 'Сбросить регион', KZ: 'Аймақты тазарту', EN: 'Reset Region' },
  'map.zone.west.title': { RU: 'Западный Казахстан', KZ: 'Батыс Қазақстан', EN: 'West Kazakhstan' },
  'map.zone.west.desc': {
    RU: 'Высокая зависимость от нефтяного сектора, риск сокращения рабочих мест из-за автоматизации добычи.',
    KZ: 'Мұнай секторына жоғары тәуелділік, өндіруді автоматтандыру салдарынан жұмыс орындарының қысқару қаупі.',
    EN: 'High dependence on oil sector, risk of job cuts due to automation of extraction.'
  },
  'map.zone.north.title': { RU: 'Северный Казахстан', KZ: 'Солтүстік Қазақстан', EN: 'North Kazakhstan' },
  'map.zone.north.desc': {
    RU: 'Отток молодежи в крупные мегаполисы, старение кадров в агропромышленном секторе.',
    KZ: 'Жастардың ірі мегаполистерге кетуі, агроөнеркәсіптік сектордағы кадрлардың қартаюы.',
    EN: 'Youth outflow to large megacities, aging workforce in the agro-industrial sector.'
  },
  'map.zone.east.title': { RU: 'Восточный Казахстан', KZ: 'Шығыс Қазақстан', EN: 'East Kazakhstan' },
  'map.zone.east.desc': {
    RU: 'Экологические вызовы и необходимость диверсификации моногородов, переход к экологичным производствам.',
    KZ: 'Экологиялық мәселелер және моноқалаларды әртараптандыру қажеттілігі, экологиялық таза өндірістерге көшу.',
    EN: 'Environmental challenges and the need to diversify mono-cities, transition to green production.'
  },
  'map.zone.center.title': { RU: 'Центральный Казахстан', KZ: 'Орталық Қазақстан', EN: 'Central Kazakhstan' },
  'map.zone.center.desc': {
    RU: 'Устаревание промышленных мощностей в горнодобывающей отрасли, высокий износ оборудования.',
    KZ: 'Тау-кен өндірісіндегі өнеркәсіптік қуаттардың ескіруі, жабдықтардың тозуының жоғары деңгейі.',
    EN: 'Obsolescence of industrial capacities in mining industry, high wear and tear of equipment.'
  },
  'map.zone.south.title': { RU: 'Южный Казахстан', KZ: 'Оңтүстік Қазақстан', EN: 'South Kazakhstan' },
  'map.zone.south.desc': {
    RU: 'Максимальный уровень неформальной занятости и высокий процент категории NEET среди сельской молодежи.',
    KZ: 'Ауыл жастары арасындағы бейресми жұмыспен қамтудың ең жоғары деңгейі және NEET санатының жоғары пайызы.',
    EN: 'Maximum level of informal employment and high percentage of NEET category among rural youth.'
  },

  // DevConsole
  'console.placeholder': { RU: 'Введите команду (например, /matrix, /hack, /shanyrak)...', KZ: 'Команданы енгізіңіз (мысалы, /matrix, /hack, /shanyrak)...', EN: 'Enter command (e.g., /matrix, /hack, /shanyrak)...' },
  'console.welcome': { RU: 'Awwwards CLI Консоль. Наберите /help для помощи. Нажмите ESC или ~ для закрытия.', KZ: 'Awwwards CLI Консолі. Көмек үшін /help теріңіз. ESC немесе ~ пернесін басыңыз.', EN: 'Awwwards CLI Console. Type /help for help. Press ESC or ~ to close.' },

  // Causes Section
  'causes.badge': { RU: 'Корневые причины', KZ: 'Негізгі себептері', EN: 'Root Causes' },
  'causes.title': { RU: 'Почему возникает проблема?', KZ: 'Бұл мәселе неліктен туындайды?', EN: 'Why Does This Problem Arise?' },
  'causes.hoverText': { RU: 'ИЗУЧИТЬ', KZ: 'ЗЕРТТЕУ', EN: 'EXPLORE' },
  'causes.c1.title': { RU: 'Разрыв между образованием и рынком', KZ: 'Білім беру мен нарық арасындағы алшақтық', EN: 'Education & Market Disconnect' },
  'causes.c1.desc': { 
    RU: 'Более 30% выпускников вузов в РК работают не по специальности. Учебные программы отстают от реального сектора, что ведет к переизбытку юристов/экономистов и дефициту инженеров и IT-специалистов.',
    KZ: 'Қазақстандағы жоғары оқу орындары түлектерінің 30%-дан астамы мамандығы бойынша жұмыс істемейді. Оқу бағдарламалары нақты сектордан қалып қоюда, бұл заңгерлер мен экономистердің шамадан тыс көп болуына, ал инженерлер мен IT-мамандардың тапшылығына әкеледі.',
    EN: 'Over 30% of university graduates in Kazakhstan do not work in their field of study. Academic curricula lag behind the real economy, leading to a surplus of lawyers/economists and a critical shortage of engineers and IT specialists.'
  },
  'causes.c2.title': { RU: 'Структурные изменения и автоматизация', KZ: 'Құрылымдық өзгерістер мен автоматтандыру', EN: 'Structural Shifts & Automation' },
  'causes.c2.desc': { 
    RU: 'Согласно исследованиям Всемирного экономического форума (ВЭФ) и «Атласу новых профессий РК», до 40% рутинных рабочих мест в Казахстане подвержены высокому риску автоматизации в ближайшие 10 лет.',
    KZ: 'Дүниежүзілік экономикалық форумның (ДЭФ) зерттеулеріне және «Қазақстанның жаңа мамандықтар атласына» сәйкес, алдағы 10 жылда елдегі күнделікті жұмыс орындарының 40%-на дейін автоматтандырудың жоғары қаупі төніп тұр.',
    EN: 'According to studies by the World Economic Forum (WEF) and the "Atlas of New Professions of Kazakhstan," up to 40% of routine jobs in the country are at high risk of automation over the next 10 years.'
  },
  'causes.c3.title': { RU: 'Неформальная занятость', KZ: 'Бейресми жұмыспен қамтылу', EN: 'Informal Employment' },
  'causes.c3.desc': { 
    RU: 'Около 2.1 млн человек (почти каждый четвертый занятый) работают без официальных договоров. Это лишает их доступа к пенсионным накоплениям, ОСМС и социальной защите при потере работы.',
    KZ: 'Шамамен 2.1 млн адам (әрбір төртінші жұмыс істейтін адам) ресми келісімшартсыз жұмыс істейді. Бұл оларды зейнетақы жинақтарынан, МӘМС-тен және жұмысынан айырылған жағдайда әлеуметтік қорғалудан айырады.',
    EN: 'About 2.1 million people (nearly one in four employed) work without official contracts. This deprives them of pension contributions, state health insurance, and social security in case of job loss.'
  },
  'causes.c4.title': { RU: 'Региональный дисбаланс', KZ: 'Аймақтық теңгерімсіздік', EN: 'Regional Imbalance' },
  'causes.c4.desc': { 
    RU: 'Уровень безработицы на юге страны и в сельских регионах традиционно выше из-за слабого развития промышленности, в то время как Астана и Алматы перегружены внутренними мигрантами.',
    KZ: 'Өнеркәсіптің нашар дамуына байланысты елдің оңтүстігінде және ауылдық аймақтарда жұмыссыздық деңгейі дәстүрлі түрде жоғары, ал Астана мен Алматы ішкі көші-қонмен шамадан тыс жүктелген.',
    EN: 'Unemployment in the south and rural regions is traditionally higher due to weak industrial development, while Astana and Almaty are overwhelmed by domestic migration.'
  },

  // Competences Section
  'competences.badge': { RU: 'Навыки будущего', KZ: 'Болашақ дағдылары', EN: 'Future Skills' },
  'competences.title': { RU: 'Как глобальные компетенции спасают от безработицы?', KZ: 'Жаһандық құзыреттер жұмыссыздықтан қалай құтқарады?', EN: 'How Do Global Competences Protect Against Unemployment?' },
  'competences.desc': { 
    RU: 'В мире, где технические навыки (hard skills) теряют актуальность за 3–5 лет из-за роботизации, на первый план выходят универсальные мета-навыки. Именно они делают профессионала неуязвимым к любым кризисам и структурным изменениям рынка.',
    KZ: 'Роботтандыруға байланысты техникалық дағдылар (hard skills) 3-5 жыл ішінде өзектілігін жоғалтатын әлемде әмбебап мета-дағдылар алдыңғы қатарға шығады. Дәл осылар маманды кез келген дағдарыстар мен нарықтың құрылымдық өзгерістеріне осал етпейді.',
    EN: 'In a world where technical hard skills expire in 3–5 years due to robotics, universal meta-skills take center stage. These are what make a professional resilient against any crisis or structural market shift.'
  },
  'competences.quote': { RU: '"Выживает не самый сильный и не самый умный, а тот, кто лучше всех приспосабливается к изменениям."', KZ: '"Ең күштісі немесе ең ақылдысы емес, өзгерістерге ең жақсы бейімделетіні аман қалады."', EN: '"It is not the strongest of the species that survives, nor the most intelligent, but the one most adaptable to change."' },
  'competences.quoteAuthor': { RU: '— Чарльз Дарвин (адапт.)', KZ: '— Чарльз Дарвин (бейім.)', EN: '— Charles Darwin (adapt.)' },
  'competences.centralText1': { RU: 'Сфера', KZ: 'Аясы', EN: 'Sphere of' },
  'competences.centralText2': { RU: 'Мета\nНавыков', KZ: 'Мета\nДағдылар', EN: 'Meta\nSkills' },
  'competences.metaTitle': { RU: 'Компетенция будущего', KZ: 'Болашақ құзыреті', EN: 'Future Competence' },
  'competences.planTitle': { RU: 'План прокачки (Индивидуальный трек)', KZ: 'Дамыту жоспары (Жеке трек)', EN: 'Upgrade Plan (Individual Track)' },
  'competences.step': { RU: 'Шаг', KZ: 'Қадам', EN: 'Step' },
  'competences.closeBtn': { RU: 'Понятно, закрыть', KZ: 'Түсінікті, жабу', EN: 'Understood, Close' },

  'competences.c0.title': { RU: 'Критическое мышление', KZ: 'Снидарлық ойлау', EN: 'Critical Thinking' },
  'competences.c0.desc': { RU: 'Способность анализировать информацию, отличать факты от мнений и принимать взвешенные решения в условиях дезинформации.', KZ: 'Ақпаратты талдау, фактілерді пікірлерден ажырату және жалған ақпарат жағдайында салмақты шешімдер қабылдау қабілеті.', EN: 'The ability to analyze information, separate facts from opinions, and make balanced decisions under information overload.' },
  'competences.c0.detailedDesc': { RU: 'В эпоху переизбытка информации и фейков, критическое мышление является главным щитом специалиста. Оно позволяет глубже видеть проблемы рынка труда Казахстана и находить нетривиальные решения.', KZ: 'Ақпарат пен фейктердің көптігі заманында сыни ойлау маманның басты қалқаны болып табылады. Ол Қазақстанның еңбек нарығындағы мәселелерді тереңірек көруге және ерекше шешімдер табуға мүмкіндік береді.', EN: 'In an era of information overload and fake news, critical thinking is a professional\'s primary shield. It enables a deeper understanding of Kazakhstan\'s labor market problems and helps uncover unconventional solutions.' },
  'competences.c0.step1': { RU: 'Изучите основы логики, когнитивных искажений и манипулятивных техник в медиа.', KZ: 'Логика негіздерін, когнитивті бұрмалауларды және медиадағы манипуляциялық әдістерді зерттеңіз.', EN: 'Study the basics of logic, cognitive biases, and manipulative media techniques.' },
  'competences.c0.step2': { RU: 'Практикуйте метод декомпозиции «5 Почему» для докопания до первопричин любых проблем.', KZ: 'Кез келген мәселенің түпкі себептерін анықтау үшін «5 Неліктен» декомпозиция әдісін қолданыңыз.', EN: 'Practice the "5 Whys" root-cause analysis method to drill down to the source of any problem.' },
  'competences.c0.step3': { RU: 'Сопоставляйте альтернативные источники статистики и проверяйте надежность первоисточников.', KZ: 'Альтернативті статистика көздерін салыстырыңыз және түпнұсқа дереккөздердің сенімділігін тексеріңіз.', EN: 'Cross-reference alternative statistical sources and verify the reliability of primary sources.' },

  'competences.c1.title': { RU: 'Глобальная гражданственность', KZ: 'Жаһандық азаматтық', EN: 'Global Citizenship' },
  'competences.c1.desc': { RU: 'Понимание мировых тенденций, социальная ответственность и готовность вносить вклад в развитие своего сообщества.', KZ: 'Әлемдік тенденцияларды түсіну, әлеуметтік жауапкершілік және өз қоғамының дамуына үлес қосуға дайын болу.', EN: 'Understanding global trends, social responsibility, and readiness to contribute to the development of one\'s community.' },
  'competences.c1.detailedDesc': { RU: 'Рынок труда больше не ограничен границами одного города или страны. Понимание глобального контекста и целей устойчивого развития делает вас востребованным специалистом мирового масштаба.', KZ: 'Еңбек нарығы бұдан былай бір қала немесе елдің шекарасымен шектелмейді. Жаһандық контекст пен тұрақты даму мақсаттарын түсіну сізді әлемдік деңгейдегі сұранысқа ие маман етеді.', EN: 'The labor market is no longer limited by geographical borders. Understanding the global context and Sustainable Development Goals (SDGs) transforms you into a world-class professional.' },
  'competences.c1.step1': { RU: 'Пройдите базовый курс по 17 Целям устойчивого развития ООН (ЦУР).', KZ: 'БҰҰ-ның 17 Тұрақты даму мақсаттары (ТДМ) бойынша негізгі курстан өтіңіз.', EN: 'Complete a foundational course on the UN\'s 17 Sustainable Development Goals (SDGs).' },
  'competences.c1.step2': { RU: 'Участвуйте в локальных социальных проектах и развивайте экологическую культуру.', KZ: 'Жергілікті әлеуметтік жобаларға қатысыңыз және экологиялық мәдениетті дамытыңыз.', EN: 'Participate in local social projects and foster environmental awareness.' },
  'competences.c1.step3': { RU: 'Исследуйте, как мировые тренды (зеленая экономика, шеринг) меняют занятость в РК.', KZ: 'Әлемдік трендтердің (жасыл экономика, шеринг) Қазақстандағы жұмыспен қамтуды қалай өзгертетінін зерттеңіз.', EN: 'Explore how global trends (green economy, sharing platforms) are shifting employment dynamics in Kazakhstan.' },

  'competences.c2.title': { RU: 'Цифровая грамотность', KZ: 'Цифрлық сауаттылық', EN: 'Digital Literacy' },
  'competences.c2.desc': { RU: 'Эффективная работа с технологиями, использование ИИ для рутинных задач и быстрая адаптация к цифровым платформам.', KZ: 'Технологиялармен тиімді жұмыс істеу, күнделікті тапсырмалар үшін жасанды интеллектіні пайдалану және цифрлық платформаларға жылдам бейімделу.', EN: 'Leveraging technology effectively, utilizing AI for routine automation, and adapting swiftly to digital platforms.' },
  'competences.c2.detailedDesc': { RU: 'Автоматизация заменит рутинный труд. Цифровая грамотность — это умение использовать технологии (включая генеративный ИИ) как катализатор собственной продуктивности, а не угрозу.', KZ: 'Автоматтандыру күнделікті еңбекті алмастырады. Цифрлық сауаттылық — технологияларды (соның ішінде генеративті ЖИ) қауіп емес, өз өнімділігіңіздің катализаторы ретінде пайдалану қабілеті.', EN: 'Automation will inevitably replace routine labor. Digital literacy is the capacity to harness technologies (including generative AI) as a catalyst for personal productivity, rather than viewing them as a threat.' },
  'competences.c2.step1': { RU: 'Освойте базовые инструменты анализа данных (Excel, Google Sheets, основы SQL).', KZ: 'Деректерді талдаудың негізгі құралдарын меңгеріңіз (Excel, Google Sheets, SQL негіздері).', EN: 'Master baseline data analysis tools like Excel, Google Sheets, and basic SQL.' },
  'competences.c2.step2': { RU: 'Научитесь промпт-инжинирингу: интегрируйте нейросети в свои повседневные задачи.', KZ: 'Промпт-инжинирингті үйреніңіз: нейрожелілерді күнделікті тапсырмаларыңызға біріктіріңіз.', EN: 'Learn prompt engineering: integrate neural networks into your daily workflows.' },
  'competences.c2.step3': { RU: 'Изучите правила кибергигиены и защиты персональных данных в сети.', KZ: 'Желідегі кибергигиена және жеке деректерді қорғау ережелерін зерттеңіз.', EN: 'Study cybersecurity hygiene and privacy protection protocols online.' },

  'competences.c3.title': { RU: 'Непрерывное обучение (Lifelong Learning)', KZ: 'Үздіксіз білім алу (Lifelong Learning)', EN: 'Lifelong Learning' },
  'competences.c3.desc': { RU: 'Постоянное обновление знаний и развитие умения быстро осваивать смежные направления в течение жизни.', KZ: 'Өмір бойы білімді үнемі жаңартып отыру және сабақтас бағыттарды жылдам меңгеру қабілетін дамыту.', EN: 'Constantly updating knowledge and developing the ability to quickly master adjacent fields throughout your life.' },
  'competences.c3.detailedDesc': { RU: 'Устаревание знаний происходит быстрее, чем когда-либо. Концепция Lifelong Learning переключает фокус с накопления дипломов на способность разучиваться (unlearn) и учиться заново.', KZ: 'Білімнің ескіруі бұрынғыдан да тез жүруде. Lifelong Learning тұжырымдамасы назарды диплом жинақтаудан бас тартуға (unlearn) және қайтадан үйрену қабілетіне аударады.', EN: 'Knowledge becomes obsolete faster than ever. The concept of Lifelong Learning shifts your focus away from collecting diplomas and certificates toward the ability to unlearn outdated habits and learn anew.' },
  'competences.c3.step1': { RU: 'Составьте персональную карту развития (Individual Development Plan) на 1-2 года.', KZ: '1-2 жылға арналған жеке даму картасын (Individual Development Plan) жасаңыз.', EN: 'Formulate an Individual Development Plan (IDP) covering the next 1–2 years.' },
  'competences.c3.step2': { RU: 'Внедрите «Правило 5 часов»: уделяйте обучению 1 час каждый рабочий день.', KZ: '«5 сағат ережесін» енгізіңіз: әр жұмыс күні оқуға 1 сағат уақыт бөліңіз.', EN: 'Implement the "5-Hour Rule": dedicate 1 hour of every working day to self-education.' },
  'competences.c3.step3': { RU: 'Изучите техники эффективного запоминания и быстрого чтения (методы Фейнмана, интервальные повторения).', KZ: 'Тиімді есте сақтау және жылдам оқу әдістерін зерттеңіз (Фейнман әдістері, аралық қайталаулар).', EN: 'Acquire highly efficient memory and learning techniques like the Feynman technique and spaced repetition.' },

  // Solutions Section
  'solutions.badge': { RU: 'Лаборатория решений', KZ: 'Шешімдер зертханасы', EN: 'Solutions Sandbox' },
  'solutions.title': { RU: 'Интерактивная песочница', KZ: 'Интерактивті құмсалғыш', EN: 'Interactive Sandbox' },
  'solutions.desc': { 
    RU: 'Сопоставьте причины безработицы с глобальными компетенциями и оцените их влияние на экономический прогноз уровня занятости в Казахстане.',
    KZ: 'Жұмыссыздық себептерін жаһандық құзыреттермен сәйкестендіріңіз және олардың Қазақстандағы жұмыспен қамту деңгейінің экономикалық болжамына әсерін бағалаңыз.',
    EN: 'Match root labor issues with global competences to simulate their impact on the projected unemployment rate in Kazakhstan.'
  },
  'solutions.step1Title': { RU: '1. Выберите причину', KZ: '1. Себебін таңдаңыз', EN: '1. Select a Cause' },
  'solutions.step1Desc': { RU: 'Что вызывает кризис на рынке труда?', KZ: 'Еңбек нарығындағы дағдарысқа не себеп болады?', EN: 'What triggers labor market instability?' },
  'solutions.step2Title': { RU: '2. Выберите навык', KZ: '2. Дағдыны таңдаңыз', EN: '2. Select a Skill' },
  'solutions.step2Desc': { RU: 'Чем можно решить данную проблему?', KZ: 'Бұл мәселені қалай шешуге болады?', EN: 'How can this challenge be addressed?' },
  'solutions.simTitle': { RU: 'Симуляция занятости', KZ: 'Жұмыспен қамту симуляциясы', EN: 'Employment Simulation' },
  'solutions.simCalc': { RU: 'Калькулятор синергии', KZ: 'Синергия калькуляторы', EN: 'Synergy Calculator' },
  'solutions.labelUnemp': { RU: 'Безработица РК', KZ: 'ҚР жұмыссыздығы', EN: 'Kazakhstan Unemployment' },
  'solutions.synergyBadge': { RU: 'Идеальная Синергия!', KZ: 'Керемет Синергия!', EN: 'Perfect Synergy!' },
  'solutions.resetBtn': { RU: 'Сбросить', KZ: 'Тазарту', EN: 'Reset Sandbox' },

  'solutions.causes.education.name': { RU: 'Разрыв образования', KZ: 'Білім алшақтығы', EN: 'Education Gap' },
  'solutions.causes.education.desc': { RU: 'Учебные программы отстают от реального сектора.', KZ: 'Оқу бағдарламалары нақты сектордан қалып қоюда.', EN: 'Academic curricula lag behind the real economy.' },
  'solutions.causes.automation.name': { RU: 'Автоматизация рутины', KZ: 'Күнделікті істерді автоматтандыру', EN: 'Routine Automation' },
  'solutions.causes.automation.desc': { RU: 'Замена рабочих мест алгоритмами и роботами.', KZ: 'Жұмыс орындарын алгоритмдер мен роботтармен алмастыру.', EN: 'Replacing routine jobs with algorithms and robotics.' },
  'solutions.causes.informal.name': { RU: 'Теневая занятость', KZ: 'Көлеңкелі жұмыспен қамтылу', EN: 'Shadow Employment' },
  'solutions.causes.informal.desc': { RU: 'Работа без контрактов и социальных гарантий.', KZ: 'Келісімшартсыз және әлеуметтік кепілдіктерсіз жұмыс істеу.', EN: 'Work without formal contracts or social guarantees.' },
  'solutions.causes.balance.name': { RU: 'Региональный дисбаланс', KZ: 'Аймақтық теңгерімсіздік', EN: 'Regional Imbalances' },
  'solutions.causes.balance.desc': { RU: 'Переток кадров в мегаполисы, дефицит на селе.', KZ: 'Кадрлардың мегаполистерге ағылуы, ауылдағы тапшылық.', EN: 'Concentration of talent in cities, rural shortages.' },

  'solutions.comps.thinking.name': { RU: 'Критическое мышление', KZ: 'Снидарлық ойлау', EN: 'Critical Thinking' },
  'solutions.comps.thinking.desc': { RU: 'Поиск новых ниш, самозанятость и адаптивность.', KZ: 'Жаңа нишаларды іздеу, өзін-өзі жұмыспен қамту және бейімділік.', EN: 'Spotting new niches, digital freelancing & adaptability.' },
  'solutions.comps.citizenship.name': { RU: 'Гражданственность', KZ: 'Азаматтық белсенділік', EN: 'Citizenship' },
  'solutions.comps.citizenship.desc': { RU: 'Осознание прав, легализация труда и контракты.', KZ: 'Құқықтарды түсіну, еңбекті заңдастыру және келісімшарттар.', EN: 'Rights awareness, formalizing labor & requiring contracts.' },
  'solutions.comps.digital.name': { RU: 'Цифровая грамотность', KZ: 'Цифрлық сауаттылық', EN: 'Digital Literacy' },
  'solutions.comps.digital.desc': { RU: 'Укрощение ИИ и автоматизации для своей пользы.', KZ: 'ЖИ мен автоматтандыруды өз пайдаңызға бағындыру.', EN: 'Harnessing generative AI tools to hyper-charge output.' },
  'solutions.comps.learning.name': { RU: 'Самообучение (Lifelong)', KZ: 'Үздіксіз оқу (Lifelong)', EN: 'Lifelong Learning' },
  'solutions.comps.learning.desc': { RU: 'Постоянная переквалификация под тренды рынка.', KZ: 'Нарық трендтеріне сәйкес тұрақты түрде қайта даярлану.', EN: 'Constant proactive upskilling to match economic trends.' },

  'solutions.outcomes.default': { 
    RU: 'Выберите причину слева и навык будущего справа для запуска моделирования.', 
    KZ: 'Модельдеуді іске қосу үшін сол жақтан себебін және оң жақтан болашақ дағдысын таңдаңыз.', 
    EN: 'Select a structural market cause on the left and a meta-skill on the right to start simulating.' 
  },
  'solutions.outcomes.onlyCause': { 
    RU: 'Теперь выберите навык будущего справа, чтобы компенсировать эту проблему.', 
    KZ: 'Енді осы мәселенің орнын толтыру үшін оң жақтан болашақ дағдысын таңдаңыз.', 
    EN: 'Now select an corresponding future meta-skill on the right to counter this issue.' 
  },
  'solutions.outcomes.onlyComp': { 
    RU: 'Отлично! Теперь выберите причину безработицы слева, к которой примените этот навык.', 
    KZ: 'Керемет! Енді сол жақтан осы дағдыны қолданатын жұмыссыздық себебін таңдаңыз.', 
    EN: 'Excellent! Now pick a structural cause on the left to apply this competency against.' 
  },
  'solutions.outcomes.edu_learn': { 
    RU: 'СИНЕРГИЯ! Готовность к непрерывному обучению идеально компенсирует разрыв между вузами и рынком: специалисты сами добирают нужные навыки онлайн.', 
    KZ: 'СИНЕРГИЯ! Үздіксіз білім алуға дайындық жоғары оқу орындары мен нарық арасындағы алшақтықты тамаша толтырады: мамандар қажетті дағдыларды өз бетінше онлайн алады.', 
    EN: 'SYNERGY! Lifelong learning perfectly counters the academic-market gap: specialists proactively acquire cutting-edge skills online.' 
  },
  'solutions.outcomes.auto_dig': { 
    RU: 'СИНЕРГИЯ! Вместо страха потерять работу из-за роботов, цифровая грамотность позволяет использовать ИИ как личного ассистента, повышая КПД на 200%.', 
    KZ: 'СИНЕРГИЯ! Роботтардың кесірінен жұмысымнан айырыламын деп қорықпай, цифрлық сауаттылық ЖИ-ді жеке көмекші ретінде пайдалануға мүмкіндік береді, тиімділікті 200%-ға арттырады.', 
    EN: 'SYNERGY! Instead of fearing job loss to robots, digital literacy enables workers to leverage AI as a personal multiplier, boosting productivity by 200%.' 
  },
  'solutions.outcomes.inf_cit': { 
    RU: 'СИНЕРГИЯ! Развитая глобальная гражданственность формирует культуру уплаты налогов, требования трудовых договоров и защиты своих прав перед работодателем.', 
    KZ: 'СИНЕРГИЯ! Дамыған жаһандық азаматтық салық төлеу мәдениетін, еңбек келісімшарттарын талап етуді және жұмыс беруші алдында өз құқықтарын қорғауды қалыптастырады.', 
    EN: 'SYNERGY! High global citizenship cultivates a culture of fiscal responsibility, demanding formal employment agreements, and defending labor rights.' 
  },
  'solutions.outcomes.bal_think': { 
    RU: 'СИНЕРГИЯ! Критическое мышление помогает увидеть новые ниши в регионах: запуск онлайн-бизнеса, удаленная работа на зарубежные компании без переезда.', 
    KZ: 'СИНЕРГИЯ! Сыни ойлау аймақтардағы жаңа мүмкіндіктерді көруге көмектеседі: онлайн-бизнесті ашу, басқа жаққа көшпей-ақ шетелдік компанияларға қашықтан жұмыс істеу.', 
    EN: 'SYNERGY! Critical thinking helps unlock local economic potential: setting up online businesses and working remotely for international firms without relocating.' 
  },
  'solutions.outcomes.partial': { 
    RU: 'ЧАСТИЧНОЕ РЕШЕНИЕ. Этот навык полезен, но он напрямую не бьет по корню выбранной проблемы. Модель показывает небольшое снижение безработицы за счет общей эрудиции.', 
    KZ: 'ЖАРТЫЛАЙ ШЕШІМ. Бұл дағды пайдалы, бірақ ол таңдалған мәселенің негізіне тікелей әсер етпейді. Модель жалпы эрудиция есебінен жұмыссыздықтың азғантай ғана төмендеуін көрсетеді.', 
    EN: 'PARTIAL RESOLUTION. While this skill is valuable, it doesn\'t directly target the root of the chosen problem. The model shows a slight reduction in unemployment via general intelligence.' 
  },

  // Personal View Section
  'personal.badge': { RU: 'Личный вклад', KZ: 'Жеке үлес', EN: 'Personal Contribution' },
  'personal.title': { RU: 'Стена обязательств: твой вклад', KZ: 'Міндеттемелер қабырғасы: сенің үлесің', EN: 'Pledge Wall: Your Contribution' },
  'personal.desc': { 
    RU: 'Государство создает инфраструктуру, но твое будущее на рынке труда зависит от твоих действий. Оставь свое обязательство по развитию навыков.',
    KZ: 'Мемлекет инфрақұрылым жасайды, бірақ сенің еңбек нарығындағы болашағың өз әрекеттеріңе байланысты. Дағдыларды дамыту бойынша өз міндеттемеңді қалдыр.',
    EN: 'The state builds infrastructure, but your destiny in the job market rests in your hands. Write down a concrete commitment to upskill.'
  },
  'personal.formTitle': { RU: 'Принять вызов', KZ: 'Сын-қатерді қабылдау', EN: 'Accept the Challenge' },
  'personal.labelName': { RU: 'Твое Имя', KZ: 'Сенің есімің', EN: 'Your Name' },
  'personal.placeholderName': { RU: 'Введите имя...', KZ: 'Есіміңізді енгізіңіз...', EN: 'Enter name...' },
  'personal.labelSkill': { RU: 'Направление мета-навыков', KZ: 'Мета-дағдылар бағыты', EN: 'Meta-Skills Focus' },
  'personal.labelDetails': { RU: 'Детали обязательства (опционально)', KZ: 'Міндеттеме мәліметтері (міндетті емес)', EN: 'Commitment details (optional)' },
  'personal.placeholderDetails': { RU: 'Что именно вы сделаете? (например, пройду курс, прочту книгу)...', KZ: 'Сіз нақты не істейсіз? (мысалы, курстан өтемін, кітап оқимын)...', EN: 'What will you do? (e.g. finish a course, read a book)...' },
  'personal.submitBtn': { RU: 'Отправить на стену', KZ: 'Қабырғаға жіберу', EN: 'Post to Wall' },
  'personal.cardsTitle': { RU: 'Карточки участников:', KZ: 'Қатысушылардың карточкалары:', EN: 'Participant pledges:' },
  'personal.savedLabel': { RU: 'СОХРАНЕНО В LOCALSTORAGE', KZ: 'LOCALSTORAGE-ТА САҚТАЛДЫ', EN: 'SAVED SECURELY IN LOCALSTORAGE' },
  'personal.pledgeDefault': { RU: 'Обязуюсь прокачивать этот навык для личной конкурентоспособности.', KZ: 'Жеке бәсекеге қабілеттілікті арттыру үшін осы дағдыны дамытуға міндеттенемін.', EN: 'I commit to upgrading this competence to maximize my market competitiveness.' },

  // Quiz Section
  'quiz.badge': { RU: 'Проверка потенциала', KZ: 'Әлеуетті тексеру', EN: 'Potential Assessment' },
  'quiz.title': { RU: 'Tinder-тест', KZ: 'Tinder-тест', EN: 'Tinder Quiz' },
  'quiz.desc': { RU: 'Проверил свою устойчивость к безработицы будущего за 5 быстрых свайпов.', KZ: 'Болашақ жұмыссыздыққа төзімділігіңізді 5 жылдам свайп арқылы тексеріңіз.', EN: 'Evaluate your vulnerability to future job displacements in 5 rapid swipes.' },
  'quiz.swipeLeft': { RU: 'НЕ ДЕЛАЮ', KZ: 'ІСТЕМЕЙМІН', EN: 'NO PRACTICE' },
  'quiz.swipeRight': { RU: 'ПРАКТИКУЮ', KZ: 'ТӘЖІРИБЕЛЕЙМІН', EN: 'PRACTICING' },
  'quiz.swipeHint': { RU: '‹ Смахни влево или вправо ›', KZ: '‹ Солға немесе оңға свайптаңыз ›', EN: '‹ Swipe Left or Right ›' },
  'quiz.resultTitle': { RU: 'Твой результат', KZ: 'Сенің нәтижең', EN: 'Your Results' },
  'quiz.scoreLabel': { RU: 'Индекс устойчивости:', KZ: 'Төзімділік индексі:', EN: 'Resilience Index:' },
  'quiz.certTitle': { RU: 'Выпуск Именного Сертификата', KZ: 'Атаулы сертификатты шығару', EN: 'Issue Verified Certificate' },
  'quiz.placeholderName': { RU: 'Введите Фамилию и Имя...', KZ: 'Тегіңіз бен есіміңізді енгізіңіз...', EN: 'Enter Full Name...' },
  'quiz.submitCert': { RU: 'Подтвердить', KZ: 'Растау', EN: 'Generate' },
  'quiz.retryBtn': { RU: 'Пройти заново', KZ: 'Қайта тапсыру', EN: 'Restart Quiz' },
  'quiz.certTitleFull': { RU: 'Global Competence Center', KZ: 'Global Competence Center', EN: 'Global Competence Center' },
  'quiz.seriesLabel': { RU: 'СЕРИЯ:', KZ: 'СЕРИЯСЫ:', EN: 'SERIES:' },
  'quiz.certConfirm': { RU: 'Данный документ подтверждает, что', KZ: 'Бұл құжат мынаны растайды:', EN: 'This official document certifies that' },
  'quiz.certDesc': { 
    RU: 'Успешно завершил интерактивное тестирование и продемонстрировал готовность к автоматизированной экономике Казахстана с показателем устойчивости',
    KZ: 'Интерактивті тестілеуді сәтті аяқтап, Қазақстанның автоматтандырылған экономикасына дайындығын келесі төзімділік көрсеткішімен дәлелдеді:',
    EN: 'Has successfully passed the interactive labor assessment, demonstrating active preparedness for Kazakhstan\'s automated future economy with a resilience rating of'
  },
  'quiz.certStatus': { RU: 'Статус в системе', KZ: 'Жүйедегі мәртебесі', EN: 'System Designation' },
  'quiz.certLicense': { RU: 'Лицензия ИИ-прогноза', KZ: 'ЖИ-болжам лицензиясы', EN: 'AI Forecast License' },
  'quiz.certVerified': { RU: 'VERIFIED CODE: OK-60FPS', KZ: 'РАСТАЛҒАН КОД: OK-60FPS', EN: 'VERIFIED INTEGRITY: OK-60FPS' },
  'quiz.genPdf': { RU: 'Генерация PDF-сертификата...', KZ: 'PDF-сертификатты жасау...', EN: 'Generating certificate texture...' },
  'quiz.downloadBtn': { RU: 'Скачать сертификат', KZ: 'Сертификатты жүктеу', EN: 'Download Certificate' },
  'quiz.startOver': { RU: 'Начать заново', KZ: 'Басынан бастау', EN: 'Restart Assessment' },

  // Quiz statements & categories
  'quiz.q1.statement': {
    RU: 'Я регулярно использую нейросети (ChatGPT и др.) и цифровые инструменты для автоматизации своих задач.',
    KZ: 'Мен өз тапсырмаларымды автоматтандыру үшін нейрожелілерді (ChatGPT және т.б.) және цифрлық құралдарды жүйелі түрде пайдаланамын.',
    EN: 'I regularly use neural networks (ChatGPT, etc.) and digital tools to automate my tasks.'
  },
  'quiz.q1.category': {
    RU: 'Цифровая грамотность',
    KZ: 'Цифрлық сауаттылық',
    EN: 'Digital Literacy'
  },
  'quiz.q2.statement': {
    RU: 'При угрозе автоматизации моей профессии я готов инвестировать время и средства в полную смену сферы деятельности.',
    KZ: 'Мамандығымның автоматтандырылу қаупі төнгенде, мен қызмет саласын толық өзгертуге уақыт пен қаражат салуға дайынмын.',
    EN: 'If my profession faces automation risks, I am ready to invest time and resources to completely pivot my career.'
  },
  'quiz.q2.category': {
    RU: 'Lifelong Learning',
    KZ: 'Lifelong Learning',
    EN: 'Lifelong Learning'
  },
  'quiz.q3.statement': {
    RU: 'Я проверяю факты и статистику о рынке труда в 2-3 альтернативных источниках, прежде чем доверять им.',
    KZ: 'Мен еңбек нарығы туралы фактілер мен статистикаға сенбес бұрын оларды 2-3 баламалы дереккөзден тексеремін.',
    EN: 'I verify facts and stats about the labor market in 2-3 alternative sources before trusting them.'
  },
  'quiz.q3.category': {
    RU: 'Критическое мышление',
    KZ: 'Сыни ойлау',
    EN: 'Critical Thinking'
  },
  'quiz.q4.statement': {
    RU: 'Я самостоятельно выделяю от 5 часов в неделю на обучение новым навыкам без давления со стороны работы/вуза.',
    KZ: 'Мен жұмыс/жоғары оқу орны тарапынан қысымсыз жаңа дағдыларды үйренуге аптасына өз бетімше 5 сағаттан кем емес уақыт бөлемін.',
    EN: 'I independently allocate 5+ hours a week to learn new skills without any pressure from employers or university.'
  },
  'quiz.q4.category': {
    RU: 'Самообразование',
    KZ: 'Өздігінен білім алу',
    EN: 'Self-Education'
  },
  'quiz.q5.statement': {
    RU: 'Я считаю, что личная конкурентоспособность — это моя персональная ответственность, а не только задача государства.',
    KZ: 'Мен жеке бәсекеге қабілеттілік мемлекеттің ғана емес, менің жеке жауапкершілігім деп санаймын.',
    EN: 'I believe that personal competitiveness is my own responsibility, not just the duty of the state.'
  },
  'quiz.q5.category': {
    RU: 'Глобальная гражданственность',
    KZ: 'Жаһандық азаматтық',
    EN: 'Global Citizenship'
  },

  // Quiz outcomes
  'quiz.r1.title': { RU: 'Гроссмейстер рынка труда', KZ: 'Еңбек нарығының гроссмейстері', EN: 'Labor Market Grandmaster' },
  'quiz.r1.desc': {
    RU: 'Высокая готовность! Вы обладаете гибким адаптивным мышлением, развитой цифровой культурой и полностью готовы к вызовам автоматизации в Казахстане.',
    KZ: 'Жоғары дайындық! Сіз икемді бейімделгіш ойлауға, дамыған цифрлық мәдениетке иесіз және Қазақстандағы автоматтандырудың сын-қатерлеріне толық дайынсыз.',
    EN: 'High readiness! You possess a flexible, adaptive mindset and a strong digital culture, fully prepared for automation challenges in Kazakhstan.'
  },
  'quiz.r2.title': { RU: 'Перспективный специалист', KZ: 'Болашағы бар маман', EN: 'Promising Specialist' },
  'quiz.r2.desc': {
    RU: 'Средний уровень готовности. Вы понимаете важность изменений, но вам следует активнее осваивать нейросети и системно выделять время на Lifelong Learning.',
    KZ: 'Орташа дайындық деңгейі. Сіз өзгерістердің маңыздылығын түсінесіз, бірақ нейрожелілерді белсендірек меңгеріп, Lifelong Learning-ке жүйелі түрде уақыт бөлуіңіз керек.',
    EN: 'Moderate readiness. You understand the importance of change, but should more actively master neural networks and systematically allocate time for Lifelong Learning.'
  },
  'quiz.r3.title': { RU: 'Пассивный наблюдатель', KZ: 'Пассивті бақылаушы', EN: 'Passive Observer' },
  'quiz.r3.desc': {
    RU: 'Зона риска. Традиционный подход к карьере делает вас уязвимым перед роботизацией. Рекомендуется пересмотреть отношение к цифровым навыкам.',
    KZ: 'Қауіпті аймақ. Мансапқа деген дәстүрлі көзқарас сізді роботтандыру алдында осал етеді. Цифрлық дағдыларға деген көзқарасыңызды қайта қарау ұсынылады.',
    EN: 'Risk zone. A traditional career approach leaves you vulnerable to automation. It is highly recommended to reconsider your attitude toward digital skills.'
  },
  'quiz.alertSuccess': {
    RU: 'Сертификат для пользователя {name} успешно сформирован и загружен в буфер обмена!',
    KZ: 'Пайдаланушы {name} үшін сертификат сәтті жасалып, алмасу буферіне жүктелді!',
    EN: 'Certificate for user {name} has been successfully generated and copied to clipboard!'
  },

  // Media (Video) Section
  'media.badge': { RU: 'Медиа-контент', KZ: 'Медиа мазмұны', EN: 'Media Content' },
  'media.title': { RU: 'Обучающее видео: Безработица в РК', KZ: 'Үйретуші бейне: ҚР-дағы жұмыссыздық', EN: 'Educational Video: Unemployment in Kazakhstan' },
  'media.desc': {
    RU: 'Подробный разбор текущей ситуации на рынке труда, комментарии экспертов и анализ причин безработицы в Казахстане.',
    KZ: 'Еңбек нарығындағы ағымдағы жағдайды егжей-тегжейлі талдау, сарапшылардың пікірлері және Қазақстандағы жұмыссыздық себептерін талдау.',
    EN: 'A detailed breakdown of the current labor market situation, expert comments, and analysis of the causes of unemployment in Kazakhstan.'
  },
  'media.iframeTitle': { RU: 'Обучающее видео о безработице', KZ: 'Жұмыссыздық туралы үйретуші бейне', EN: 'Educational video about unemployment' },

  // Global Experience Section
  'global.badge': { RU: 'Мировые практики', KZ: 'Әлемдік тәжірибелер', EN: 'Global Practices' },
  'global.title': { RU: 'Как борются с безработицей в мире?', KZ: 'Әлемде жұмыссыздықпен қалай күреседі?', EN: 'How the World Fights Unemployment' },
  'global.desc': {
    RU: 'Взаимосвязь систем образования и поддержки занятости. Нажмите на точки на интерактивном 3D-глобусе, чтобы изучить кейсы передовых стран.',
    KZ: 'Білім беру мен жұмыспен қамтуды қолдау жүйелерінің өзара байланысы. Озық елдердің тәжірибесін зерттеу үшін интерактивті 3D-глобустағы нүктелерді басыңыз.',
    EN: 'The interconnection of education systems and employment support. Click on the points on the interactive 3D globe to explore case studies of leading nations.'
  },
  'global.mobileHint': {
    RU: 'Используйте стрелки для переключения между странами на мобильном устройстве.',
    KZ: 'Мобильді құрылғыда елдер арасында ауысу үшін көрсеткілерді пайдаланыңыз.',
    EN: 'Use the arrows to switch between countries on a mobile device.'
  },
  'global.leaderCountry': { RU: 'Страна-лидер', KZ: 'Көшбасшы ел', EN: 'Leader Country' },
  'global.experienceRK': { RU: 'Опыт для РК', KZ: 'ҚР үшін тәжірибе', EN: 'Experience for RK' },
  'global.experienceRKDesc': { RU: 'Адаптация дуальных систем, переобучения и цифровых ваучеров занятости.', KZ: 'Дуалды жүйелерді, қайта даярлауды және цифрлық жұмыспен қамту ваучерлерін бейімдеу.', EN: 'Adaptation of dual systems, retraining, and digital employment vouchers.' },
  'global.knowledgeBase': { RU: 'База знаний', KZ: 'Білім қоры', EN: 'Knowledge Base' },
  'global.importModels': { RU: 'Импорт глобальных моделей', KZ: 'Жаһандық модельдер импорты', EN: 'Importing Global Models' },
  'global.selectRegion': { RU: 'Выберите целевой регион на глобусе или в меню ниже для просмотра практики:', KZ: 'Тәжірибені көру үшін глобустан немесе төмендегі мәзірден мақсатты аймақты таңдаңыз:', EN: 'Select a target region on the globe or in the menu below to view the practice:' },
  'global.spec': { RU: 'Спецификация опыта', KZ: 'Тәжірибе сипаттамасы', EN: 'Experience Specification' },
  'global.stateInitiative': { RU: 'Государственная инициатива', KZ: 'Мемлекеттік бастама', EN: 'State Initiative' },
  'global.strategyDesc': { RU: 'Описание стратегии', KZ: 'Стратегия сипаттамасы', EN: 'Strategy Description' },
  'global.synergyImport': { RU: 'Синергетический импорт в РК', KZ: 'ҚР-ға синергетикалық импорт', EN: 'Synergy Import to RK' },
  'global.synergyImportDesc': { RU: 'Проецирование лазерного моста с глобуса визуализирует передачу компетенций в РК.', KZ: 'Глобустан лазерлік көпірді проекциялау ҚР-ға құзыреттердің берілуін көрсетеді.', EN: 'Projecting a laser bridge from the globe visualizes the transfer of competences to RK.' },
  'global.resetBtn': { RU: 'Сбросить', KZ: 'Ысыру', EN: 'Reset' },
  'global.swipeHint': { RU: 'Смахивайте влево / вправо', KZ: 'Солға / оңға сырғытыңыз', EN: 'Swipe left / right' },
  'global.exploreHint': { RU: 'Изучить опыт', KZ: 'Тәжірибені зерттеу', EN: 'Explore Experience' },
  'global.kazakhstanHub': { RU: 'Казахстан (Центр внедрения)', KZ: 'Қазақстан (Енгізу орталығы)', EN: 'Kazakhstan (Implementation Hub)' },

  // Global Experience Countries
  'global.country.de.name': { RU: 'Германия', KZ: 'Германия', EN: 'Germany' },
  'global.country.de.title': { RU: 'Дуальное обучение & Kurzarbeit', KZ: 'Дуалды оқыту & Kurzarbeit', EN: 'Dual Education & Kurzarbeit' },
  'global.country.de.desc': {
    RU: 'Система дуального образования связывает вузы с производством, гарантируя практику. Программа Kurzarbeit субсидирует до 87% зарплаты при вынужденном сокращении часов, предотвращая увольнения.',
    KZ: 'Дуалды білім беру жүйесі жоғары оқу орындарын өндіріспен байланыстырады, тәжірибеге кепілдік береді. Kurzarbeit бағдарламасы жұмыс уақыты мәжбүрлі түрде қысқартылған кезде жалақының 87%-на дейін субсидиялайды, жұмыстан босатуды болдырмайды.',
    EN: 'The dual education system links universities with production, guaranteeing practice. The Kurzarbeit program subsidizes up to 87% of wages during forced reductions in hours, preventing layoffs.'
  },
  'global.country.sg.name': { RU: 'Сингапур', KZ: 'Сингапур', EN: 'Singapore' },
  'global.country.sg.title': { RU: 'Экосистема SkillsFuture', KZ: 'SkillsFuture экожүйесі', EN: 'SkillsFuture Ecosystem' },
  'global.country.sg.desc': {
    RU: 'Государство выделяет каждому гражданину старше 25 лет кредиты на непрерывное обучение. Программа TechSkills Accelerator переобучает специалистов под нужды AI и цифровой экономики.',
    KZ: 'Мемлекет 25 жастан асқан әрбір азаматқа үздіксіз оқуға несие бөледі. TechSkills Accelerator бағдарламасы мамандарды AI және цифрлық экономика қажеттіліктеріне қайта даярлайды.',
    EN: 'The government allocates training credits to all citizens aged 25 and above for lifelong learning. The TechSkills Accelerator program reskills specialists for AI and the digital economy.'
  },
  'global.country.kr.name': { RU: 'Южная Корея', KZ: 'Оңтүстік Корея', EN: 'South Korea' },
  'global.country.kr.title': { RU: 'K-Digital Training & Поддержка Молодежи', KZ: 'K-Digital Training & Жастарды қолдау', EN: 'K-Digital Training & Youth Support' },
  'global.country.kr.desc': {
    RU: 'Фокус на обучении молодежи технологиям будущего (AI, Big Data) совместно с гигантами вроде Samsung и Hyundai. Выплата "молодежных пособий" при активном поиске работы.',
    KZ: 'Samsung және Hyundai сияқты алпауыттармен бірлесіп жастарды болашақ технологияларына (AI, Big Data) оқытуға назар аудару. Жұмысты белсенді іздеу кезінде "жастар жәрдемақысын" төлеу.',
    EN: 'Focus on training youth in future technologies (AI, Big Data) in partnership with giants like Samsung and Hyundai. Payment of "youth allowances" during active job search.'
  },
  'global.country.dk.name': { RU: 'Дания', KZ: 'Дания', EN: 'Denmark' },
  'global.country.dk.title': { RU: 'Модель Flexicurity', KZ: 'Flexicurity моделі', EN: 'Flexicurity Model' },
  'global.country.dk.desc': {
    RU: 'Золотой треугольник: гибкий рынок труда (легко уволить/нанять), мощная социальная защита (высокие пособия) и агрессивная система переобучения и активации безработных за счет государства.',
    KZ: 'Алтын үшбұрыш: икемді еңбек нарығы (жұмыстан шығару/жалдау оңай), күшті әлеуметтік қорғау (жоғары жәрдемақы) және мемлекет есебінен жұмыссыздарды қайта даярлау және белсендірудің агрессивті жүйесі.',
    EN: 'A "golden triangle" linking a flexible labor market (easy hiring/firing), generous social security (high benefits), and aggressive active labor market policies for retraining.'
  },
  'global.country.jp.name': { RU: 'Япония', KZ: 'Жапония', EN: 'Japan' },
  'global.country.jp.title': { RU: 'Система Hello Work & AI-Мэтчинг', KZ: 'Hello Work жүйесі & AI-Сәйкестендіру', EN: 'Hello Work System & AI-Matching' },
  'global.country.jp.desc': {
    RU: 'Государственная сеть центров занятости использует искусственный интеллект для анализа навыков соискателя и мгновенного подбора вакансий с учетом психологического профиля.',
    KZ: 'Мемлекеттік жұмыспен қамту орталықтарының желісі үміткердің дағдыларын талдау және оның психологиялық бейінін ескере отырып, бос жұмыс орындарын жылдам таңдау үшін жасанды интеллектті пайдаланады.',
    EN: 'The state-run network of employment service centers uses AI to analyze job seekers\' skills and instantly match them with vacancies, factoring in their psychological profile.'
  },
  'global.country.ch.name': { RU: 'Швейцария', KZ: 'Швейцария', EN: 'Switzerland' },
  'global.country.ch.title': { RU: 'Ранняя профориентация', KZ: 'Ерте кәсіптік бағдарлау', EN: 'Early Vocational Guidance' },
  'global.country.ch.desc': {
    RU: 'Более 70% подростков выбирают профессионально-техническое обучение вместо академического. Программы жестко квотируются под реальный дефицит мест на локальном рынке труда.',
    KZ: 'Жасөспірімдердің 70%-дан астамы академиялық оқудың орнына кәсіптік-техникалық білімді таңдайды. Бағдарламалар жергілікті еңбек нарығындағы нақты орын тапшылығына қатаң квоталанады.',
    EN: 'Over 70% of teenagers opt for vocational training rather than academic schooling. Programs are strictly quota-controlled to match actual shortages in the local labor market.'
  },
  'global.country.fi.name': { RU: 'Финляндия', KZ: 'Финляндия', EN: 'Finland' },
  'global.country.fi.title': { RU: 'Elements of AI & Цифровой Апскейлинг', KZ: 'Elements of AI & Цифрлық апскейлинг', EN: 'Elements of AI & Digital Upskilling' },
  'global.country.fi.desc': {
    RU: 'Бесплатное массовое обучение нации основам AI для повышения глобальной конкурентоспособности кадров. Переход центров занятости на полностью предиктивные цифровые платформы.',
    KZ: 'Кадрлардың жаһандық бәсекеге қабілеттілігін арттыру үшін халықты AI негиздерине тегін жаппай оқыту. Жұмыспен қамту орталықтарын толықтай болжамды цифрлық платформаларға көшіру.',
    EN: 'Free mass education of the nation in the basics of AI to increase the global competitiveness of the workforce. Transition of employment centers to fully predictive digital platforms.'
  },
  'global.country.us.name': { RU: 'США', KZ: 'АҚШ', EN: 'United States' },
  'global.country.us.title': { RU: 'Налоговые Интенсивы & Tech-Буткемпы', KZ: 'Салықтық интенсивтер & Tech-Буткемптер', EN: 'Tax Incentives & Tech Bootcamps' },
  'global.country.us.desc': {
    RU: 'Субсидирование краткосрочных интенсивных курсов (Bootcamps) и налоговые льготы для ИТ-компаний, нанимающих людей из традиционных секторов (ритейл, производство) без высшего образования.',
    KZ: 'Қысқа мерзімді интенсивті курстарды (Bootcamps) субсидиялау және жоғары білімі жоқ дәстүрлі секторлардан (ритейл, өндіріс) адамдарды жұмысқа қабылдайтын IT-компаниялар үшін салықтық жеңілдіктер.',
    EN: 'Subsidization of short-term intensive coding bootcamps and tax incentives for IT companies hiring workers from traditional sectors (retail, manufacturing) without college degrees.'
  },
  'global.country.ae.name': { RU: 'ОАЭ', KZ: 'БАӘ', EN: 'UAE' },
  'global.country.ae.title': { RU: 'Программа Emiratisation (Nafis)', KZ: 'Emiratisation бағдарламасы (Nafis)', EN: 'Emiratisation Program (Nafis)' },
  'global.country.ae.desc': {
    RU: 'Субсидирование зарплат граждан ОАЭ в частном секторе, создание экосистем для развития предпринимательства и обязательные квоты на наем локальных талантов в тех-компании.',
    KZ: 'Жеке сектордағы БАӘ азаматтарының жалақысын субсидиялау, кәсіпкерлікті дамыту үшін экожүйелер құру және технологиялық компанияларда жергілікті таланттарды жалдаудың міндетті квоталары.',
    EN: 'Subsidizing salaries of UAE citizens in the private sector, building entrepreneurship ecosystems, and enforcing mandatory quotas for hiring local talent in tech companies.'
  },
  'global.country.nl.name': { RU: 'Нидерланды', KZ: 'Нидерланды', EN: 'Netherlands' },
  'global.country.nl.title': { RU: 'Закон о гибком рабочем времени', KZ: 'Икемді жұмыс уақыты туралы заң', EN: 'Flexible Working Hours Act' },
  'global.country.nl.desc': {
    RU: 'Законодательное поощрение высокопродуктивной частичной занятости (part-time jobs). До 50% населения работают неполный день с полным сохранением социальных и трудовых прав.',
    KZ: 'Жоғары өнімді толық емес жұмыс күнін (part-time jobs) заңнамалық тұрғыдан ынталандыру. Халықтың 50%-на дейіні әлеуметтік және еңбек құқықтарын толық сақтай отырып, толық емес жұмыс күні жұмыс іштеді.',
    EN: 'Legislative promotion of highly productive part-time employment. Up to 50% of the working population works part-time with full retention of social and labor rights.'
  }
};

interface LanguageContextType {
  lang: LanguageType;
  setLang: (lang: LanguageType) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to load language from localStorage, fallback to RU
  const [lang, setLangState] = useState<LanguageType>(() => {
    const saved = localStorage.getItem('kz_unemp_lang');
    return (saved as LanguageType) || 'RU';
  });

  const setLang = (newLang: LanguageType) => {
    setLangState(newLang);
    localStorage.setItem('kz_unemp_lang', newLang);
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][lang];
    }
    // Return key if no translation exists
    return key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};