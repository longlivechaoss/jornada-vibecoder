import React from "react";
import { Status } from "../data/mockData";

interface StatusBadgeProps {
  status: Status;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    "not-started": {
      label: "Não iniciado",
      className: "bg-zinc-800 text-zinc-300",
    },
    "in-progress": {
      label: "Em andamento",
      className: "bg-amber-500/20 text-amber-500",
    },
    completed: {
      label: "Concluído",
      className: "bg-emerald-500/20 text-emerald-500",
    },
  };

  const { label, className } = config[status];

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
