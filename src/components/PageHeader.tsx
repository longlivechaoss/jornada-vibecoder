import React from "react";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-zinc-50 tracking-tight mb-3">{title}</h1>
      {subtitle && <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl leading-relaxed">{subtitle}</p>}
    </div>
  );
}
