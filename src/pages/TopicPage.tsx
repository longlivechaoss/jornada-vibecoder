import React, { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { mockData } from "../data/mockData";
import { PageHeader } from "../components/PageHeader";
import { BackButton } from "../components/BackButton";
import { StatusBadge } from "../components/StatusBadge";
import { Clock, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { useStudyProgress } from "../hooks/useStudyProgress";
import { QuizSection } from "../components/QuizSection";

function getYoutubeEmbedUrl(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

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
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const module = mockData.find((m) => m.id === moduleId);
  const topic = module?.topics.find((t) => t.id === topicId);

  if (!module || !topic) {
    return <Navigate to="/" replace />;
  }

  const topicIndex = module.topics.findIndex((t) => t.id === topic.id);
  const prevTopic = topicIndex > 0 ? module.topics[topicIndex - 1] : null;
  const nextTopic = topicIndex < module.topics.length - 1 ? module.topics[topicIndex + 1] : null;

  const completed = isCompleted(topic.id);

  let status: "not-started" | "in-progress" | "completed" = "not-started";
  if (completed) {
    status = "completed";
  } else {
    const firstUncompleted = module.topics.find((t) => !isCompleted(t.id));
    if (firstUncompleted?.id === topic.id) {
      status = "in-progress";
    }
  }

  const videoEmbedUrl = topic.videoUrl ? getYoutubeEmbedUrl(topic.videoUrl) : null;

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-1 bg-zinc-800 z-50">
        <div
          className="h-full bg-violet-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <BackButton to={`/module/${module.id}`} />

        {/* Hero header do tópico */}
        <header className="mb-10 sm:mb-14 rounded-2xl sm:rounded-3xl bg-zinc-900/80 border border-zinc-700/60 p-6 sm:p-10 shadow-xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <StatusBadge status={status} />
            {topic.duration && (
              <div className="flex items-center text-zinc-400 text-sm font-medium">
                <Clock className="w-4 h-4 mr-2 shrink-0" />
                {topic.duration}
              </div>
            )}
          </div>
          <PageHeader title={topic.title} subtitle={topic.description} />
          <div className="mt-6">
            <button
              onClick={() => toggleTopic(topic.id)}
              className={`inline-flex items-center justify-center gap-2 w-full sm:w-auto min-w-[200px] px-6 py-4 rounded-xl font-semibold text-base transition-all duration-300 ${
                completed
                  ? "bg-zinc-700/80 text-zinc-300 hover:bg-zinc-600 border border-zinc-600/60"
                  : "bg-violet-600 text-white hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-500/30 border border-violet-500/40"
              }`}
            >
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              {completed ? "Desmarcar" : "Marcar como estudado"}
            </button>
          </div>
        </header>

        {/* Navegação On This Page */}
        <nav className="mb-12 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50">
          <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Nesta página</h3>
          <div className="flex flex-wrap gap-2">
            {topic.summary && (
              <a href="#summary" className="px-4 py-2 rounded-full bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 transition-colors text-sm font-medium whitespace-nowrap">
                Resumo
              </a>
            )}
            {topic.keyConcepts && topic.keyConcepts.length > 0 && (
              <a href="#key-concepts" className="px-4 py-2 rounded-full bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 transition-colors text-sm font-medium whitespace-nowrap">
                Conceitos-chave
              </a>
            )}
            {topic.codeExample && (
              <a href="#code-example" className="px-4 py-2 rounded-full bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 transition-colors text-sm font-medium whitespace-nowrap">
                Exemplo de código
              </a>
            )}
            {topic.videoUrl && (
              <a href="#video" className="px-4 py-2 rounded-full bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 transition-colors text-sm font-medium whitespace-nowrap">
                Vídeo
              </a>
            )}
            {topic.timestamps && topic.timestamps.length > 0 && (
              <a href="#timestamps" className="px-4 py-2 rounded-full bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 transition-colors text-sm font-medium whitespace-nowrap">
                Timestamps
              </a>
            )}
            {topic.reviewQuestions && topic.reviewQuestions.length > 0 && (
              <a href="#quiz" className="px-4 py-2 rounded-full bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-50 transition-colors text-sm font-medium whitespace-nowrap">
                Revisão Rápida
              </a>
            )}
          </div>
        </nav>

        <div className="space-y-8 sm:space-y-10">
          {topic.summary && (
            <section id="summary" className="scroll-mt-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/50 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-zinc-50 mb-4 flex items-center gap-2">
                <span aria-hidden>📖</span> Resumo
              </h2>
              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
                {topic.summary}
              </p>
            </section>
          )}

          {topic.keyConcepts && topic.keyConcepts.length > 0 && (
            <section id="key-concepts" className="scroll-mt-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/50 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-zinc-50 mb-4 flex items-center gap-2">
                <span aria-hidden>🧠</span> Conceitos-chave
              </h2>
              <ul className="flex flex-wrap gap-3">
                {topic.keyConcepts.map((concept, index) => (
                  <li key={index}>
                    <span className="inline-block px-4 py-2.5 rounded-xl bg-violet-500/10 text-violet-300 border border-violet-500/20 text-sm font-medium">
                      {concept}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {topic.codeExample && (
            <section id="code-example" className="scroll-mt-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/50 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-zinc-50 mb-4 flex items-center gap-2">
                <span aria-hidden>💻</span> Exemplo de código
              </h2>
              <pre className="bg-zinc-950 text-emerald-400 font-mono text-sm sm:text-base p-4 sm:p-6 rounded-xl overflow-x-auto border border-zinc-800/80">
                <code>{topic.codeExample}</code>
              </pre>
            </section>
          )}

          {topic.videoUrl && (
            <section id="video" className="scroll-mt-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/50 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-zinc-50 mb-4 flex items-center gap-2">
                <span aria-hidden>🎥</span> Vídeo
              </h2>
              {videoEmbedUrl ? (
                <div className="relative w-full rounded-xl overflow-hidden border border-zinc-800/80 bg-zinc-950" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    src={videoEmbedUrl}
                    title="Vídeo do tópico"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <a
                  href={topic.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium transition-colors border border-zinc-700 hover:border-zinc-600"
                >
                  Assistir no link externo
                </a>
              )}
            </section>
          )}

          {topic.timestamps && topic.timestamps.length > 0 && (
            <section id="timestamps" className="scroll-mt-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/50 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-zinc-50 mb-4 flex items-center gap-2">
                <span aria-hidden>⏱</span> Timestamps
              </h2>
              <ul className="space-y-3">
                {topic.timestamps.map((ts, index) => (
                  <li key={index} className="flex items-start gap-4 p-4 rounded-xl bg-zinc-800/30 border border-zinc-800/50">
                    <span className="shrink-0 px-3 py-1.5 rounded-lg bg-zinc-800 text-violet-300 font-mono text-sm font-semibold border border-zinc-700">
                      {ts.time}
                    </span>
                    <span className="text-zinc-300 text-sm sm:text-base pt-0.5">{ts.description}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {topic.reviewQuestions && topic.reviewQuestions.length > 0 && (
            <section id="quiz" className="scroll-mt-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/50 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-zinc-50 mb-4 flex items-center gap-2">
                <span aria-hidden>⚡</span> Revisão Rápida
              </h2>
              <QuizSection topicId={topic.id} questions={topic.reviewQuestions} />
            </section>
          )}
        </div>

        <footer className="mt-14 sm:mt-16 pt-8 border-t border-zinc-800/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {prevTopic ? (
            <Link
              to={`/module/${module.id}/topic/${prevTopic.id}`}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-50 font-medium transition-colors border border-zinc-800/80"
            >
              <ArrowLeft className="w-5 h-5 shrink-0" />
              <div className="flex flex-col items-start min-w-0">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">Anterior</span>
                <span className="text-sm truncate max-w-[200px]">{prevTopic.title}</span>
              </div>
            </Link>
          ) : (
            <div className="sm:w-1/2" />
          )}

          {nextTopic ? (
            <Link
              to={`/module/${module.id}/topic/${nextTopic.id}`}
              className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-medium transition-all hover:shadow-lg hover:shadow-violet-500/25 border border-violet-500/40"
            >
              <div className="flex flex-col items-end min-w-0">
                <span className="text-[10px] text-violet-200 uppercase tracking-wider font-bold">Próximo</span>
                <span className="text-sm truncate max-w-[200px]">{nextTopic.title}</span>
              </div>
              <ArrowRight className="w-5 h-5 shrink-0" />
            </Link>
          ) : (
            <div className="sm:w-1/2" />
          )}
        </footer>
      </div>
    </>
  );
}
