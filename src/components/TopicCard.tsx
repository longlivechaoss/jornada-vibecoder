import React from "react";
import { Link } from "react-router-dom";
import { Topic, mockData, Status } from "../data/mockData";
import { StatusBadge } from "./StatusBadge";
import { Clock } from "lucide-react";
import { useStudyProgress } from "../hooks/useStudyProgress";

interface TopicCardProps {
  moduleId: string;
  topic: Topic;
  index: number;
}

export function TopicCard({ moduleId, topic, index }: TopicCardProps) {
  const { isCompleted } = useStudyProgress();
  
  const module = mockData.find(m => m.id === moduleId);
  
  let status: Status = "not-started";
  if (isCompleted(topic.id)) {
    status = "completed";
  } else if (module) {
    const firstUncompleted = module.topics.find(t => !isCompleted(t.id));
    if (firstUncompleted?.id === topic.id) {
      status = "in-progress";
    }
  }

  return (
    <Link
      to={`/module/${moduleId}/topic/${topic.id}`}
      className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl hover:bg-zinc-900 hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/5 hover:-translate-y-0.5 hover:scale-[1.01] transition-all duration-300 gap-5"
    >
      <div className="flex items-start sm:items-center gap-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-800 text-zinc-400 font-semibold shrink-0 group-hover:bg-violet-500/10 group-hover:text-violet-400 transition-colors duration-300">
          {index + 1}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-zinc-50 mb-1.5 group-hover:text-violet-50 transition-colors duration-300">{topic.title}</h3>
          <p className="text-zinc-400 text-sm line-clamp-1 leading-relaxed">{topic.description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-5 sm:ml-auto shrink-0">
        <div className="flex items-center text-zinc-500 text-sm font-medium">
          <Clock className="w-4 h-4 mr-2" />
          {topic.duration}
        </div>
        <StatusBadge status={status} />
      </div>
    </Link>
  );
}
