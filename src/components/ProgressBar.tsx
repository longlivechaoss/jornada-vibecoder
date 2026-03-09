import React from "react";

interface ProgressBarProps {
  value: number;
}

export function ProgressBar({ value }: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  return (
    <div className="w-full bg-zinc-800/60 rounded-full h-2.5 overflow-hidden shadow-inner">
      <div
        className="bg-gradient-to-r from-violet-600 to-violet-400 h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(139,92,246,0.5)]"
        style={{ width: `${clampedValue}%` }}
      ></div>
    </div>
  );
}
