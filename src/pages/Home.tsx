import React, { useState } from "react";
import { Link } from "react-router-dom";
import { mockData } from "../data/mockData";
import { ModuleCard } from "../components/ModuleCard";
import { useStudyProgress } from "../hooks/useStudyProgress";
import { ProgressBar } from "../components/ProgressBar";
import { PlayCircle, ArrowRight, Search, BookOpen, CheckCircle2, Layers, Clock } from "lucide-react";

export function Home() {
  const { isCompleted, completedTopics } = useStudyProgress();
  const [searchQuery, setSearchQuery] = useState("");

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

  const firstModule = mockData[0];
  const firstTopic = firstModule?.topics[0];

  const filteredModules = mockData.map((module) => {
    const query = searchQuery.toLowerCase();
    const matchesTitle = module.title.toLowerCase().includes(query);
    const matchedTopics = module.topics.filter(topic => topic.title.toLowerCase().includes(query));
    
    if (matchesTitle || matchedTopics.length > 0 || query === "") {
      return {
        ...module,
        matchedTopics: query !== "" && !matchesTitle ? matchedTopics : []
      };
    }
    return null;
  }).filter(Boolean);

  const totalTopics = mockData.reduce((acc, module) => acc + module.topics.length, 0);
  const completedTopicsCount = completedTopics.length;
  const modulesInProgress = mockData.filter(module => {
    const completedInModule = module.topics.filter(t => isCompleted(t.id)).length;
    return completedInModule > 0 && completedInModule < module.topics.length;
  }).length;
  const globalProgressPercentage = totalTopics > 0 ? Math.round((completedTopicsCount / totalTopics) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
      {/* Hero Section */}
      <div className="mb-10 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-violet-400 to-fuchsia-500 tracking-tight mb-4">
          Jornada VIBECODER
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
          Escolha um módulo para continuar estudando e aprimorar suas habilidades.
        </p>
      </div>

      {/* Progress Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 md:mb-10">
        <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{completedTopicsCount}</div>
            <div className="text-sm text-zinc-400 font-medium">Tópicos concluídos</div>
          </div>
        </div>
        
        <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0">
            <Layers className="w-6 h-6 text-violet-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{modulesInProgress}</div>
            <div className="text-sm text-zinc-400 font-medium">Módulos em andamento</div>
          </div>
        </div>
        
        <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{totalTopics}</div>
            <div className="text-sm text-zinc-400 font-medium">Tópicos disponíveis</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative group max-w-2xl mb-16 md:mb-24">
        <div className="absolute inset-0 bg-violet-500/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500 group-focus-within:text-violet-400 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Buscar módulos ou tópicos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-2xl py-4 pl-13 pr-4 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all shadow-sm"
          />
        </div>
      </div>
      
      {/* Continue Studying Section */}
      <div className="mb-16 md:mb-20 relative">
        <div className="absolute -inset-x-6 -inset-y-8 bg-gradient-to-b from-zinc-900/50 to-transparent rounded-[3rem] -z-10 pointer-events-none"></div>
        
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1.5 bg-fuchsia-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-zinc-50 tracking-tight">Continue Estudando</h2>
        </div>

        {!hasProgress ? (
          <div className="relative overflow-hidden bg-gradient-to-r from-fuchsia-500/10 to-violet-500/10 border border-fuchsia-500/20 rounded-3xl p-8 md:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-8 group hover:border-fuchsia-500/40 transition-colors">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-fuchsia-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-fuchsia-500/20 transition-colors duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-zinc-50 mb-3 tracking-tight">Pronto para começar?</h3>
              <p className="text-zinc-400 text-lg">Você ainda não começou a estudar. Comece pelo primeiro módulo.</p>
            </div>
            {firstModule && firstTopic && (
              <Link 
                to={`/module/${firstModule.id}/topic/${firstTopic.id}`}
                className="relative z-10 inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold transition-all hover:shadow-lg hover:shadow-fuchsia-500/25 hover:-translate-y-0.5 whitespace-nowrap"
              >
                <PlayCircle className="w-5 h-5" />
                Começar Jornada
              </Link>
            )}
          </div>
        ) : !nextTopic || !nextModule ? (
          <div className="relative overflow-hidden bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-3xl p-8 md:p-10 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-8 group hover:border-emerald-500/40 transition-colors">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-zinc-50 mb-3 tracking-tight">Parabéns! 🎉</h3>
              <p className="text-zinc-400 text-lg">Você concluiu todos os tópicos disponíveis.</p>
            </div>
            <div className="w-56 hidden sm:block relative z-10">
              <ProgressBar value={100} />
            </div>
          </div>
        ) : (
          <div className="relative overflow-hidden bg-gradient-to-r from-fuchsia-500/10 to-violet-500/10 border border-fuchsia-500/20 rounded-3xl p-8 md:p-10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group hover:border-fuchsia-500/40 transition-colors">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-fuchsia-500/10 blur-3xl rounded-full pointer-events-none group-hover:bg-fuchsia-500/20 transition-colors duration-500"></div>
            
            <div className="flex-1 w-full relative z-10">
              <div className="flex items-center gap-4 mb-5">
                <span className="px-3 py-1 rounded-full bg-fuchsia-500/20 text-fuchsia-400 text-xs font-bold uppercase tracking-wider border border-fuchsia-500/20">
                  {nextModule.title}
                </span>
                <span className="text-zinc-400 text-sm font-medium flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                  {Math.round((nextModule.topics.filter(t => isCompleted(t.id)).length / nextModule.topics.length) * 100)}% concluído
                </span>
              </div>
              <h3 className="text-3xl font-bold text-zinc-50 mb-3 tracking-tight">{nextTopic.title}</h3>
              <p className="text-zinc-400 text-lg line-clamp-2 mb-6 md:mb-0 max-w-2xl">{nextTopic.description}</p>
              
              <div className="mt-8 md:hidden">
                <ProgressBar value={Math.round((nextModule.topics.filter(t => isCompleted(t.id)).length / nextModule.topics.length) * 100)} />
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-6 w-full md:w-auto shrink-0 relative z-10">
              <div className="hidden md:block w-56">
                <ProgressBar value={Math.round((nextModule.topics.filter(t => isCompleted(t.id)).length / nextModule.topics.length) * 100)} />
              </div>
              <Link 
                to={`/module/${nextModule.id}/topic/${nextTopic.id}`}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold transition-all hover:shadow-lg hover:shadow-fuchsia-500/25 hover:-translate-y-0.5"
              >
                Continuar
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Modules List Section */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1.5 bg-zinc-700 rounded-full"></div>
        <h2 className="text-2xl font-bold text-zinc-50 tracking-tight">Módulos</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredModules.map((module) => {
          const completedCount = module.topics.filter(t => isCompleted(t.id)).length;
          const updatedModule = { ...module, completedTopics: completedCount };
          
          return (
            <div key={module.id} className="flex flex-col gap-4">
              <div className="group/card relative h-full">
                <div className="absolute -inset-0.5 bg-gradient-to-b from-zinc-800 to-zinc-900 rounded-[1.75rem] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="relative h-full">
                  <ModuleCard module={updatedModule} />
                </div>
              </div>
              
              {module.matchedTopics && module.matchedTopics.length > 0 && (
                <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 flex flex-col gap-3 shadow-sm mt-2 relative z-10">
                  <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5" />
                    Tópicos encontrados
                  </h4>
                  <div className="space-y-2 mt-1">
                    {module.matchedTopics.map(topic => (
                      <div key={topic.id} className="group/topic flex items-center justify-between gap-4 p-3 rounded-xl hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-zinc-700/50">
                        <span className="text-sm text-zinc-300 font-medium truncate group-hover/topic:text-zinc-100 transition-colors">{topic.title}</span>
                        <Link
                          to={`/module/${module.id}/topic/${topic.id}`}
                          className="shrink-0 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-violet-600 hover:text-white text-xs font-medium transition-all shadow-sm"
                        >
                          Abrir
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Global Journey Progress */}
      <div className="mt-16 md:mt-24 bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-zinc-50 mb-1 tracking-tight">Progresso da Jornada</h2>
            <p className="text-zinc-400 text-sm">
              {completedTopicsCount} de {totalTopics} tópicos concluídos
            </p>
          </div>
          <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
            {globalProgressPercentage}% <span className="text-sm font-medium text-zinc-500 tracking-normal">da jornada completa</span>
          </div>
        </div>
        <ProgressBar value={globalProgressPercentage} />
      </div>
    </div>
  );
}
