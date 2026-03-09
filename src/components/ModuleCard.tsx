import React from "react";
import { Link } from "react-router-dom";
import { Module } from "../data/mockData";
import { ProgressBar } from "./ProgressBar";

interface ModuleCardProps {
  module: Module;
}

export function ModuleCard({ module }: ModuleCardProps) {
  const Icon = module.icon;
  const progressPercentage = (module.completedTopics / module.totalTopics) * 100;

  return (
    <Link
      to={`/module/${module.id}`}
      className="block bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-8 hover:-translate-y-1.5 hover:scale-[1.02] hover:bg-zinc-900 hover:border-violet-500/30 hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-300 group"
    >
      <div className="flex items-center mb-6">
        <div className="p-4 bg-zinc-800/50 group-hover:bg-violet-500/10 rounded-2xl mr-5 transition-colors duration-300">
          <Icon className="w-7 h-7 text-zinc-400 group-hover:text-violet-400 transition-colors duration-300" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-50 tracking-tight">{module.title}</h2>
      </div>
      
      <p className="text-zinc-400 mb-8 line-clamp-2 leading-relaxed">{module.description}</p>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm font-medium text-zinc-400">
          <span>Progresso</span>
          <span className="text-zinc-300">{module.completedTopics} de {module.totalTopics} tópicos</span>
        </div>
        <ProgressBar value={progressPercentage} />
      </div>
    </Link>
  );
}
