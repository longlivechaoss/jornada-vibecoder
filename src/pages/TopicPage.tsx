import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { mockData } from "../data/mockData";
import { PageHeader } from "../components/PageHeader";
import { BackButton } from "../components/BackButton";
import { StatusBadge } from "../components/StatusBadge";
import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { useStudyProgress } from "../hooks/useStudyProgress";
import { QuizSection } from "../components/QuizSection";

export function TopicPage() {
  const { moduleId, topicId } = useParams<{ moduleId: string; topicId: string }>();
  const { isCompleted, toggleTopic } = useStudyProgress();
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      
      setScrollProgress(Number(scroll) * 100);
    }
    
    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const module = mockData.find((m) => m.id === moduleId);
  const topic = module?.topics.find((t) => t.id === topicId);
  
  if (!module || !topic) {
    return <Navigate to="/" replace />;
  }

  const topicIndex = module.topics.findIndex(t => t.id === topic.id);
  const prevTopic = topicIndex > 0 ? module.topics[topicIndex - 1] : null;
  const nextTopic = topicIndex < module.topics.length - 1 ? module.topics[topicIndex + 1] : null;

  const completed = isCompleted(topic.id);

  let status: "not-started" | "in-progress" | "completed" = "not-started";
  if (completed) {
    status = "completed";
  } else {
    const firstUncompleted = module.topics.find(t => !isCompleted(t.id));
    if (firstUncompleted?.id === topic.id) {
      status = "in-progress";
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 bg-zinc-800 z-50">
        <div 
          className="h-full bg-violet-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      <div className="max-w-6xl mx-auto px-6 py-16">
      <BackButton to={`/module/${module.id}`} />
      
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <StatusBadge status={status} />
          <div className="flex items-center text-zinc-400 text-sm font-medium">
            <Clock className="w-4 h-4 mr-2" />
            {topic.duration}
          </div>
        </div>
        
        <PageHeader title={topic.title} subtitle={topic.description} />

        <button
          onClick={() => toggleTopic(topic.id)}
          className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold transition-all duration-300 mt-2 ${
            completed
              ? "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
              : "bg-violet-600 text-white hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/25"
          }`}
        >
          {completed ? "↩ Desmarcar" : "✓ Marcar como estudado"}
        </button>

        <div className="mt-10 p-6 bg-zinc-900/40 border border-zinc-800/40 rounded-2xl">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">On This Page</h3>
          <nav className="flex flex-wrap gap-3">
            {topic.summary && (
              <a 
                href="#summary" 
                className="px-4 py-2 rounded-full bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 transition-colors text-sm font-medium whitespace-nowrap"
              >
                Resumo
              </a>
            )}
            {topic.keyConcepts && topic.keyConcepts.length > 0 && (
              <a 
                href="#key-concepts" 
                className="px-4 py-2 rounded-full bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 transition-colors text-sm font-medium whitespace-nowrap"
              >
                Conceitos-chave
              </a>
            )}
            {topic.codeExample && (
              <a 
                href="#code-example" 
                className="px-4 py-2 rounded-full bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 transition-colors text-sm font-medium whitespace-nowrap"
              >
                Exemplo de código
              </a>
            )}
            {topic.videoUrl && (
              <a 
                href="#video" 
                className="px-4 py-2 rounded-full bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 transition-colors text-sm font-medium whitespace-nowrap"
              >
                Vídeo recomendado
              </a>
            )}
            {topic.timestamps && topic.timestamps.length > 0 && (
              <a 
                href="#timestamps" 
                className="px-4 py-2 rounded-full bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 transition-colors text-sm font-medium whitespace-nowrap"
              >
                Timestamps importantes
              </a>
            )}
            {topic.reviewQuestions && topic.reviewQuestions.length > 0 && (
              <a 
                href="#quiz" 
                className="px-4 py-2 rounded-full bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 transition-colors text-sm font-medium whitespace-nowrap"
              >
                Revisão Rápida
              </a>
            )}
          </nav>
        </div>
      </div>

      <hr className="border-zinc-800/60 mb-12" />

      <div className="space-y-8">
        {/* 3.1 Resumo */}
        {topic.summary && (
          <section id="summary" className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-8 shadow-sm scroll-mt-8">
            <h2 className="text-2xl font-bold text-zinc-50 mb-4 flex items-center gap-2">
              <span>📖</span> Resumo
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed">
              {topic.summary}
            </p>
          </section>
        )}

        {/* 3.2 Conceitos-chave */}
        {topic.keyConcepts && topic.keyConcepts.length > 0 && (
          <section id="key-concepts" className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-8 shadow-sm scroll-mt-8">
            <h2 className="text-2xl font-bold text-zinc-50 mb-4 flex items-center gap-2">
              <span>🧠</span> Conceitos-chave
            </h2>
            <div className="flex flex-wrap gap-3">
              {topic.keyConcepts.map((concept, index) => (
                <span key={index} className="px-4 py-2 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 text-sm font-medium">
                  {concept}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* 3.3 Exemplo de código */}
        {topic.codeExample && (
          <section id="code-example" className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-8 shadow-sm scroll-mt-8">
            <h2 className="text-2xl font-bold text-zinc-50 mb-4 flex items-center gap-2">
              <span>💻</span> Exemplo de código
            </h2>
            <pre className="bg-zinc-950 text-emerald-400 font-mono p-6 rounded-2xl overflow-x-auto border border-zinc-800/80 shadow-inner">
              <code>{topic.codeExample}</code>
            </pre>
          </section>
        )}

        {/* 3.4 Vídeo recomendado */}
        {topic.videoUrl && (
          <section id="video" className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-8 shadow-sm scroll-mt-8">
            <h2 className="text-2xl font-bold text-zinc-50 mb-4 flex items-center gap-2">
              <span>🎥</span> Vídeo recomendado
            </h2>
            <a 
              href={topic.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium transition-colors border border-zinc-700 hover:border-zinc-600"
            >
              Assistir aula no YouTube
            </a>
          </section>
        )}

        {/* 3.5 Timestamps importantes */}
        {topic.timestamps && topic.timestamps.length > 0 && (
          <section id="timestamps" className="bg-zinc-900/60 border border-zinc-800/60 rounded-3xl p-8 shadow-sm scroll-mt-8">
            <h2 className="text-2xl font-bold text-zinc-50 mb-6 flex items-center gap-2">
              <span>⏱</span> Timestamps importantes
            </h2>
            <ul className="space-y-4">
              {topic.timestamps.map((ts, index) => (
                <li key={index} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-800/30 border border-zinc-800/50">
                  <span className="px-3 py-1 rounded-lg bg-zinc-800 text-zinc-300 font-mono text-sm border border-zinc-700 shrink-0">
                    {ts.time}
                  </span>
                  <span className="text-zinc-300 font-medium">
                    {ts.description}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 3.6 Revisão Rápida */}
        {topic.reviewQuestions && topic.reviewQuestions.length > 0 && (
          <section id="quiz" className="mt-12 scroll-mt-8">
            <h2 className="text-2xl font-bold text-zinc-50 mb-6 flex items-center gap-2">
              <span>⚡</span> Revisão Rápida
            </h2>
            <QuizSection topicId={topic.id} questions={topic.reviewQuestions} />
          </section>
        )}
      </div>

      <div className="mt-16 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevTopic ? (
          <Link
            to={`/module/${module.id}/topic/${prevTopic.id}`}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-50 font-medium transition-colors border border-zinc-800/80"
          >
            <ArrowLeft className="w-5 h-5" />
            <div className="flex flex-col items-start">
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Tópico Anterior</span>
              <span className="text-sm truncate max-w-[200px]">{prevTopic.title}</span>
            </div>
          </Link>
        ) : (
          <div className="w-full sm:w-auto" />
        )}

        {nextTopic ? (
          <Link
            to={`/module/${module.id}/topic/${nextTopic.id}`}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-all hover:shadow-lg hover:shadow-violet-500/25"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-violet-200 uppercase tracking-wider font-bold">Próximo Tópico</span>
              <span className="text-sm truncate max-w-[200px]">{nextTopic.title}</span>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Link>
        ) : (
          <div className="w-full sm:w-auto" />
        )}
      </div>
    </div>
    </>
  );
}
