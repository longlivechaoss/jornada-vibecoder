import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#0d0d1a] flex flex-col items-center overflow-hidden">
      {/* Background decorative lines — more visible, fills composition */}
      <div
        className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: "url('/bg-lines.png.png')",
          opacity: 0.7,
        }}
        aria-hidden
      />

      {/* Ambient purple glow */}
      <div
        className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      {/* Top section: mascot + logo — chain passes over logo (mascot on top) */}
      <header className="relative z-10 flex flex-1 flex-col items-center justify-center pt-12 pb-4 w-full max-w-md px-4">
        <div className="relative flex flex-col items-center">
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-60 scale-150"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.55) 0%, transparent 65%)",
            }}
            aria-hidden
          />
          <img
            src="/mascot.png.png"
            alt="Mascote Vibecoder"
            className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 object-contain drop-shadow-2xl"
          />
          <img
            src="/logo-vibecoder.png.png"
            alt="Jornada Vibecoder"
            className="relative z-0 -mt-8 sm:-mt-10 h-14 sm:h-16 w-auto object-contain max-w-[240px]"
          />
        </div>
      </header>

      {/* Bottom card area — purple gradient, stronger presence */}
      <div className="relative z-10 w-full flex-shrink-0 flex justify-center pb-0 max-w-md px-0">
        <div
          className="w-full rounded-t-[48px] sm:rounded-t-[56px] px-8 sm:px-10 pt-10 sm:pt-12 pb-16 sm:pb-20 shadow-2xl min-h-[42vh] sm:min-h-[380px]"
          style={{
            background:
              "linear-gradient(180deg, #8B3DFF 0%, #5B21B6 100%)",
            boxShadow: "0 -8px 60px rgba(109,40,217,0.5)",
          }}
        >
          <WelcomeCard
            onLogin={() => navigate("/enter")}
            onSignup={() => navigate("/enter")}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Welcome (screen 1) ─── */
interface WelcomeCardProps {
  onLogin: () => void;
  onSignup: () => void;
}

function WelcomeCard({ onLogin, onSignup }: WelcomeCardProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-5">
        <h1 className="text-white font-extrabold leading-tight text-[2rem] sm:text-[2.25rem]">
          Bem-vindo!
        </h1>
        <p className="text-purple-200 leading-relaxed text-sm sm:text-base max-w-[320px] mt-0.5">
          Aprenda a programar de forma leve e progressiva mesmo sem experiência,
          utilizando a IA ao seu favor.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          type="button"
          onClick={onLogin}
          className="w-full py-5 rounded-2xl font-bold text-white text-base bg-[rgba(15,10,35,0.85)] border border-white/20 hover:bg-[rgba(15,10,35,0.95)] hover:border-white/25 backdrop-blur-md transition-colors min-h-[3.75rem]"
        >
          Login
        </Button>
        <Button
          type="button"
          onClick={onSignup}
          className="w-full h-14 rounded-2xl font-bold text-purple-900 text-base bg-white hover:bg-zinc-100 transition-colors"
        >
          Cadastre-se
        </Button>
      </div>
    </div>
  );
}
