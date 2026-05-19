import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

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

export default function StatsSection({ id }: { id: string }) {
  return (
    <section id={id} className="py-24 px-6 relative bg-white">
      {/* Decorative bg */}
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-kz-blue/5 rounded-bl-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Аналитика рынка труда</h2>
          <p className="text-lg text-slate-600 max-w-2xl">
            Официальные данные демонстрируют общую стабильность, однако глубинный анализ раскрывает структурные проблемы, особенно среди молодежи.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart 1: Dynamics */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
          >
            <h3 className="text-xl font-semibold mb-6 text-slate-800">Динамика уровня безработицы (%)</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dataDynamics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00AFCA" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00AFCA" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} domain={[4, 5.5]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="rate" stroke="#00AFCA" strokeWidth={3} fillOpacity={1} fill="url(#colorRate)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              В среднем уровень безработицы держится около 4.7-4.9%, что является естественным уровнем, но скрывает "скрытую безработицу".
            </p>
          </motion.div>

          {/* Chart 2: Youth */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
          >
            <h3 className="text-xl font-semibold mb-6 text-slate-800">Молодежная безработица (%)</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataYouth} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
                  <XAxis type="number" hide />
                  <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 13}} width={120} />
                  <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24}>
                    {dataYouth.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#00AFCA' : '#FEC105'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Молодежь (NEET) остается в зоне риска из-за несоответствия получаемого образования реальным потребностям рынка.
            </p>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { label: 'Численность рабочей силы', value: '9.2 млн', color: 'text-kz-blue' },
            { label: 'Занятое население', value: '8.8 млн', color: 'text-slate-700' },
            { label: 'Безработные', value: '450 тыс.', color: 'text-rose-500' },
            { label: 'Доля неформальной занятости', value: '~15%', color: 'text-kz-yellow' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100"
            >
              <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Evidence Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 bg-rose-50/50 rounded-3xl p-8 border border-rose-100"
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-rose-200 text-rose-600 flex items-center justify-center text-lg">!</span>
            Доказательства существования проблемы
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-rose-50">
              <h4 className="font-semibold text-rose-600 mb-2">Парадокс рынка</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Несмотря на безработицу, работодатели бьют тревогу о кадровом голоде. В таких секторах, как IT, инженерия и медицина, дефицит квалифицированных специалистов исчисляется десятками тысяч.
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-rose-50">
              <h4 className="font-semibold text-rose-600 mb-2">Проблема самозанятых</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Около 2 млн человек официально числятся "самозанятыми". На практике это часто означает нестабильные заработки, отсутствие социальных гарантий и налоговых отчислений (скрытая безработица).
              </p>
            </div>
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-rose-50">
              <h4 className="font-semibold text-rose-600 mb-2">NEET-молодежь</h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Доля молодежи категории NEET (не учатся, не работают и не повышают квалификацию) в Казахстане составляет около 7-8%. Это самая уязвимая прослойка, которая выпадает из экономики.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
