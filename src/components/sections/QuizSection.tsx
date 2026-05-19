import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, RotateCcw, Award } from 'lucide-react';

const questions = [
  {
    question: "Как часто вы осваиваете новые цифровые инструменты или программы?",
    options: [
      { text: "Постоянно, слежу за трендами (например, изучаю нейросети)", score: 10 },
      { text: "По мере необходимости для учебы или работы", score: 5 },
      { text: "Редко, предпочитаю проверенные методы", score: 0 },
    ]
  },
  {
    question: "Ваша реакция, если ваша будущая профессия будет автоматизирована?",
    options: [
      { text: "Быстро переквалифицируюсь в смежную IT/креативную сферу", score: 10 },
      { text: "Буду искать работу в той же сфере, пока есть вакансии", score: 5 },
      { text: "Растеряюсь, не знаю, что делать", score: 0 },
    ]
  },
  {
    question: "Насколько вы готовы переехать в другой регион ради хорошей работы?",
    options: [
      { text: "Готов хоть завтра, если условия отличные", score: 10 },
      { text: "Рассмотрю только крупные города (Астана, Алматы)", score: 5 },
      { text: "Предпочитаю остаться в родном городе", score: 2 },
    ]
  },
  {
    question: "Как вы оцениваете свои навыки критического мышления?",
    options: [
      { text: "Всегда проверяю информацию в нескольких источниках", score: 10 },
      { text: "Иногда задумываюсь, но часто верю новостям", score: 5 },
      { text: "Обычно доверяю первому впечатлению", score: 0 },
    ]
  }
];

export default function QuizSection({ id }: { id: string }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionScore: number) => {
    setScore(score + optionScore);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  const getResult = () => {
    if (score >= 35) return { title: "Высокая готовность", desc: "У вас отличные шансы! Вы обладаете гибким мышлением и готовы к изменениям на рынке труда.", color: "text-emerald-500", bg: "bg-emerald-50" };
    if (score >= 20) return { title: "Средняя готовность", desc: "Вы на правильном пути, но стоит больше внимания уделить цифровым навыкам и непрерывному обучению.", color: "text-kz-yellow", bg: "bg-yellow-50" };
    return { title: "Зона риска", desc: "Вам необходимо срочно пересмотреть свой подход к образованию и развитию навыков, чтобы избежать проблем с трудоустройством.", color: "text-rose-500", bg: "bg-rose-50" };
  };

  return (
    <section id={id} className="py-24 px-6 bg-slate-50 relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Интерактивный тест</h2>
          <p className="text-lg text-slate-600">Каковы ваши шансы на рынке труда будущего в Казахстане?</p>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 min-h-[400px] flex flex-col">
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                <div className="flex justify-between items-center mb-8">
                  <span className="text-sm font-semibold text-kz-blue uppercase tracking-wider">
                    Вопрос {currentQuestion + 1} из {questions.length}
                  </span>
                  <div className="flex gap-1">
                    {questions.map((_, i) => (
                      <div key={i} className={`h-2 w-8 rounded-full ${i <= currentQuestion ? 'bg-kz-blue' : 'bg-slate-100'}`} />
                    ))}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-800 mb-8 leading-relaxed">
                  {questions[currentQuestion].question}
                </h3>

                <div className="flex flex-col gap-4 mt-auto">
                  {questions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.score)}
                      className="text-left w-full p-4 rounded-xl border-2 border-slate-100 hover:border-kz-blue hover:bg-slate-50 transition-all group flex justify-between items-center"
                    >
                      <span className="text-slate-700 font-medium group-hover:text-slate-900">{option.text}</span>
                      <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-kz-blue transition-colors" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${getResult().bg}`}>
                  <Award className={`w-10 h-10 ${getResult().color}`} />
                </div>
                <h3 className={`text-3xl font-bold mb-4 ${getResult().color}`}>
                  {getResult().title}
                </h3>
                <p className="text-xl text-slate-600 mb-10 max-w-md leading-relaxed">
                  {getResult().desc}
                </p>

                <button
                  onClick={resetQuiz}
                  className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors"
                >
                  <RotateCcw className="w-5 h-5" />
                  Пройти заново
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
