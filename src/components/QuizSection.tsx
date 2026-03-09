import React, { useState } from "react";
import { CheckCircle2, XCircle, ChevronRight, RefreshCcw } from "lucide-react";
import { useStudyProgress } from "../hooks/useStudyProgress";

export interface ReviewQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizSectionProps {
  topicId: string;
  questions: ReviewQuestion[];
}

export function QuizSection({ topicId, questions }: QuizSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const { saveQuizResult } = useStudyProgress();

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
  };

  const handleAnswerSubmit = () => {
    if (!selectedOption || isAnswered) return;
    
    setIsAnswered(true);
    
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    setScore(prev => isCorrect ? prev + 1 : prev);

    setUserAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentIndex] = selectedOption;
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      const finalScore = userAnswers.reduce((acc, ans, idx) => {
        return acc + (ans === questions[idx].correctAnswer ? 1 : 0);
      }, 0);

      saveQuizResult(topicId, {
        correct: finalScore,
        total: questions.length,
        completed: true
      });
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setUserAnswers([]);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-8 shadow-sm text-center">
        <h3 className="text-2xl font-bold text-zinc-50 mb-4">Revisão Concluída!</h3>
        <p className="text-zinc-300 text-lg mb-8">
          Você acertou <span className="text-violet-400 font-bold">{score}</span> de <span className="text-zinc-50 font-bold">{questions.length}</span> perguntas ({percentage}%).
        </p>
        <button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors"
        >
          <RefreshCcw className="w-5 h-5" />
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-8 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <span className="text-sm font-medium text-zinc-400">
          Pergunta {currentIndex + 1} de {questions.length}
        </span>
        <span className="text-sm font-medium text-violet-400">
          Acertos: {score}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-zinc-50 mb-6 leading-relaxed">
        {currentQuestion.question}
      </h3>

      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === currentQuestion.correctAnswer;
          
          let buttonClass = "w-full text-left px-6 py-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 ";
          
          if (!isAnswered) {
            buttonClass += isSelected 
              ? "bg-violet-500/20 border-violet-500 text-violet-100" 
              : "bg-zinc-800/50 border-zinc-700/50 text-zinc-300 hover:bg-zinc-800 hover:border-zinc-600";
          } else {
            if (isCorrect) {
              buttonClass += "bg-emerald-500/20 border-emerald-500 text-emerald-100";
            } else if (isSelected && !isCorrect) {
              buttonClass += "bg-red-500/20 border-red-500 text-red-100";
            } else {
              buttonClass += "bg-zinc-800/30 border-zinc-800/50 text-zinc-500 opacity-50";
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={isAnswered}
              className={buttonClass}
            >
              <span className="flex-1">{option}</span>
              {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
              {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
            </button>
          );
        })}
      </div>

      <div className="flex justify-end">
        {!isAnswered ? (
          <button
            onClick={handleAnswerSubmit}
            disabled={!selectedOption}
            className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed text-white font-medium transition-colors"
          >
            Responder
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 hover:bg-white text-zinc-900 font-medium transition-colors"
          >
            {currentIndex < questions.length - 1 ? "Próxima Pergunta" : "Ver Resultado"}
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}
