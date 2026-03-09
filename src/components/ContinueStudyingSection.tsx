import React from "react";
import { Link } from "react-router-dom";
import { mockData } from "../data/mockData";
import { useStudyProgress } from "../hooks/useStudyProgress";
import { ProgressBar } from "./ProgressBar";
import { PlayCircle, ArrowRight } from "lucide-react";

export function ContinueStudyingSection() {
  const { isCompleted, completedTopics } = useStudyProgress();

  const hasProgress = completedTopics.length > 0;

  let nextTopic = null;
  let nextModule = null;

  for (const module of mockData) {
    for (const topic of module.topics) {
      if (!isCompleted(topic.id)) {
        nextTopic = topic;
        nextModule = module;
        break;
      }
    }
    if (nextTopic) break;
  }

  if (!hasProgress) {
    const firstModule = mockData[0];
    const firstTopic = firstModule?.topics[0];
    
    return (
      <div className="mb-12 mt-12">
        <h2 className="text-2xl font-bold text-zinc-50 mb-6">Continue Estudando</h2>
        <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold text-zinc-50 mb-2">Pronto para começar?</h3>
            <p className="text-zinc-400">Você ainda não começou a estudar. Comece pelo primeiro módulo.</p>
          </div>
          {firstModule && firstTopic && (
            <Link 
              to={`/module/${firstModule.id}/topic/${firstTopic.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-colors whitespace-nowrap"
            >
              <PlayCircle className="w-5 h-5" />
              Começar
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (!nextTopic || !nextModule) {
    return (
      <div className="mb-12 mt-12">
        <h2 className="text-2xl font-bold text-zinc-50 mb-6">Continue Estudando</h2>
        <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold text-zinc-50 mb-2">Parabéns! 🎉</h3>
            <p className="text-zinc-400">Você concluiu todos os tópicos disponíveis.</p>
          </div>
          <div className="w-48 hidden sm:block">
            <ProgressBar value={100} />
          </div>
        </div>
      </div>
    );
  }

  const moduleCompletedCount = nextModule.topics.filter(t => isCompleted(t.id)).length;
  const moduleProgress = Math.round((moduleCompletedCount / nextModule.topics.length) * 100);

  return (
    <div className="mb-12 mt-12">
      <h2 className="text-2xl font-bold text-zinc-50 mb-6">Continue Estudando</h2>
      <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex-1 w-full">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-xs font-semibold uppercase tracking-wider border border-violet-500/20">
              {nextModule.title}
            </span>
            <span className="text-zinc-500 text-sm font-medium">{moduleProgress}% concluído</span>
          </div>
          <h3 className="text-2xl font-bold text-zinc-50 mb-2">{nextTopic.title}</h3>
          <p className="text-zinc-400 line-clamp-2 mb-6 md:mb-0">{nextTopic.description}</p>
          
          <div className="mt-6 md:hidden">
            <ProgressBar value={moduleProgress} />
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-4 w-full md:w-auto shrink-0">
          <div className="hidden md:block w-48">
            <ProgressBar value={moduleProgress} />
          </div>
          <Link 
            to={`/module/${nextModule.id}/topic/${nextTopic.id}`}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-semibold transition-all hover:shadow-lg hover:shadow-violet-500/25"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
