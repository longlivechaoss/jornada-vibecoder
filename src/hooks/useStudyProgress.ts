import { useState, useEffect } from "react";

export type QuizResult = {
  correct: number;
  total: number;
  completed: boolean;
};

export interface StudyProgress {
  completedTopics: string[];
  quizResults?: Record<string, QuizResult>;
}

export function useStudyProgress() {
  const [progress, setProgress] = useState<StudyProgress>(() => {
    const saved = localStorage.getItem("study-progress");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as StudyProgress;
        return {
          completedTopics: parsed.completedTopics || [],
          quizResults: parsed.quizResults || {},
        };
      } catch (e) {
        return { completedTopics: [], quizResults: {} };
      }
    }
    return { completedTopics: [], quizResults: {} };
  });

  useEffect(() => {
    localStorage.setItem("study-progress", JSON.stringify(progress));
  }, [progress]);

  const isCompleted = (topicId: string) => progress.completedTopics.includes(topicId);

  const toggleTopic = (topicId: string) => {
    setProgress((prev) => ({
      ...prev,
      completedTopics: prev.completedTopics.includes(topicId)
        ? prev.completedTopics.filter((id) => id !== topicId)
        : [...prev.completedTopics, topicId],
    }));
  };

  const saveQuizResult = (topicId: string, result: QuizResult) => {
    setProgress((prev) => {
      const existingQuizResults = prev.quizResults || {};
      return {
        ...prev,
        quizResults: {
          ...existingQuizResults,
          [topicId]: result,
        },
      };
    });
  };

  return { 
    completedTopics: progress.completedTopics, 
    quizResults: progress.quizResults || {},
    isCompleted, 
    toggleTopic,
    saveQuizResult
  };
}
