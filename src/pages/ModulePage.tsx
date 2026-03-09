import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { mockData, Status } from "../data/mockData";
import { PageHeader } from "../components/PageHeader";
import { BackButton } from "../components/BackButton";
import { ProgressBar } from "../components/ProgressBar";
import { useStudyProgress } from "../hooks/useStudyProgress";
import { CheckCircle2, Circle, PlayCircle, Clock } from "lucide-react";

export function ModulePage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { isCompleted } = useStudyProgress();
  
  const module = mockData.find((m) => m.id === moduleId);
  
  if (!module) {
    return <Navigate to="/" replace />;
  }

  const completedCount = module.topics.filter(t => isCompleted(t.id)).length;
  const progressPercentage = (completedCount / module.totalTopics) * 100;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <BackButton to="/" />
      
      <div className="mb-12">
        <div className="flex items-center gap-5 mb-6">
          <div className="p-4 bg-violet-500/10 rounded-2xl">
            <module.icon className="w-10 h-10 text-violet-500" />
          </div>
          <PageHeader title={module.title} subtitle={module.description} />
        </div>
        
        <div className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-8 mt-8 shadow-sm">
          <div className="flex justify-between text-sm font-medium text-zinc-400 mb-4">
            <span className="text-zinc-300">Progresso do Módulo</span>
            <span className="text-violet-400">{completedCount} de {module.totalTopics} tópicos concluídos ({Math.round(progressPercentage)}%)</span>
          </div>
          <ProgressBar value={progressPercentage} />
        </div>
      </div>

      <hr className="border-zinc-800/60 mb-12" />

      <div>
        <h2 className="text-2xl font-bold text-zinc-50 mb-8 tracking-tight">Trilha de Aprendizado ({module.totalTopics} tópicos)</h2>
        
        <div className="relative border-l-2 border-zinc-800/60 ml-4 md:ml-6 space-y-6 pb-4">
          {module.topics.map((topic, index) => {
            let status: Status = "not-started";
            if (isCompleted(topic.id)) {
              status = "completed";
            } else {
              const firstUncompleted = module.topics.find(t => !isCompleted(t.id));
              if (firstUncompleted?.id === topic.id) {
                status = "in-progress";
              }
            }

            const isCompletedStatus = status === "completed";
            const isInProgress = status === "in-progress";
            const isNotStarted = status === "not-started";

            return (
              <div key={topic.id} className="relative pl-8 md:pl-10">
                {/* Timeline Node */}
                <div className={`absolute -left-[11px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full border-4 border-[#09090b] flex items-center justify-center z-10
                  ${isCompletedStatus ? 'bg-emerald-500' : isInProgress ? 'bg-violet-500' : 'bg-zinc-700'}`}>
                </div>

                <Link
                  to={`/module/${module.id}/topic/${topic.id}`}
                  className={`group block p-6 rounded-2xl border transition-all duration-300
                    ${isCompletedStatus ? 'bg-emerald-950/10 border-emerald-900/20 opacity-75 hover:opacity-100 hover:border-emerald-500/30' : ''}
                    ${isInProgress ? 'bg-violet-900/10 border-violet-500/30 shadow-lg shadow-violet-500/5 hover:border-violet-500/50 hover:-translate-y-0.5' : ''}
                    ${isNotStarted ? 'bg-zinc-900/40 border-zinc-800/50 opacity-60 hover:opacity-100 hover:border-zinc-700' : ''}
                  `}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-5">
                      <div className={`flex items-center justify-center w-12 h-12 rounded-full shrink-0 transition-colors duration-300
                        ${isCompletedStatus ? 'bg-emerald-500/10 text-emerald-500' : ''}
                        ${isInProgress ? 'bg-violet-500/20 text-violet-400' : ''}
                        ${isNotStarted ? 'bg-zinc-800/80 text-zinc-500' : ''}
                      `}>
                        {isCompletedStatus ? <CheckCircle2 className="w-6 h-6" /> : isInProgress ? <PlayCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-1.5">
                          <h3 className={`text-lg font-semibold transition-colors duration-300
                            ${isCompletedStatus ? 'text-zinc-300 group-hover:text-emerald-400' : ''}
                            ${isInProgress ? 'text-zinc-50 group-hover:text-violet-300' : ''}
                            ${isNotStarted ? 'text-zinc-400 group-hover:text-zinc-200' : ''}
                          `}>
                            {index + 1}. {topic.title}
                          </h3>
                          {isInProgress && (
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-violet-500/20 text-violet-400 border border-violet-500/20">
                              Atual
                            </span>
                          )}
                          {isCompletedStatus && (
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                              Concluído
                            </span>
                          )}
                        </div>
                        <p className={`text-sm line-clamp-2 leading-relaxed
                          ${isCompletedStatus ? 'text-zinc-500' : ''}
                          ${isInProgress ? 'text-zinc-400' : ''}
                          ${isNotStarted ? 'text-zinc-500' : ''}
                        `}>
                          {topic.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 sm:ml-auto shrink-0 pl-17 sm:pl-0">
                      <div className={`flex items-center text-sm font-medium px-3 py-1.5 rounded-lg
                        ${isCompletedStatus ? 'text-emerald-500/70 bg-emerald-500/5' : ''}
                        ${isInProgress ? 'text-violet-400 bg-violet-500/10' : ''}
                        ${isNotStarted ? 'text-zinc-500 bg-zinc-800/50' : ''}
                      `}>
                        <Clock className="w-4 h-4 mr-2" />
                        {topic.duration}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
