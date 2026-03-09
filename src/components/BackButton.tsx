import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface BackButtonProps {
  to?: string;
}

export function BackButton({ to }: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center text-zinc-400 hover:text-zinc-50 transition-colors mb-6 group"
    >
      <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
      <span>Voltar</span>
    </button>
  );
}
