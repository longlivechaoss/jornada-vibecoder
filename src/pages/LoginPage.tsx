import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setAuthState } from "@/utils/auth";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

type Screen = "welcome" | "login";

export function LoginPage() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      return;
    }

    setAuthState(trimmedEmail);
    navigate("/", { replace: true });
  };

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
          {screen === "welcome" ? (
            <WelcomeCard
              onLogin={() => setScreen("login")}
              onSignup={() => setScreen("login")}
            />
          ) : (
            <LoginFormCard
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              onSubmit={handleSubmit}
              onBack={() => setScreen("welcome")}
            />
          )}
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

/* ─── Login form (screen 2) ─── */
interface LoginFormCardProps {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

function LoginFormCard({
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  onSubmit,
  onBack,
}: LoginFormCardProps) {
  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={onBack}
        className="self-start flex items-center gap-2 text-purple-300 hover:text-white transition-colors text-sm font-medium"
        aria-label="Voltar"
      >
        <ArrowLeft className="w-5 h-5" />
        Voltar
      </button>

      <div className="flex flex-col gap-1">
        <h2 className="text-white font-extrabold text-2xl leading-tight">
          Entre na sua conta
        </h2>
        <p className="text-purple-300 text-sm leading-relaxed">
          Utilize seu nome de usuário e senha cadastrada
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <div className="space-y-1.5">
          <Label
            htmlFor="username"
            className="text-purple-200 text-xs font-semibold uppercase tracking-wider"
          >
            Usuário
          </Label>
          <Input
            id="username"
            type="text"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu_usuario"
            className="w-full px-4 py-3.5 rounded-2xl text-white placeholder:text-purple-400/80 bg-white/10 border-white/15 focus-visible:ring-2 focus-visible:ring-purple-300 focus-visible:border-purple-300/50"
          />
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor="password"
            className="text-purple-200 text-xs font-semibold uppercase tracking-wider"
          >
            Senha
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3.5 pr-12 rounded-2xl text-white placeholder:text-purple-400/80 bg-white/10 border-white/15 focus-visible:ring-2 focus-visible:ring-purple-300 focus-visible:border-purple-300/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-purple-300 hover:text-white transition-colors"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end -mt-1">
          <button
            type="button"
            className="text-purple-300 text-xs hover:text-white transition-colors underline underline-offset-2"
          >
            Esqueceu a senha?
          </button>
        </div>

        <Button
          type="submit"
          className="w-full py-4 mt-1 rounded-2xl font-bold text-purple-900 text-base bg-white hover:bg-zinc-100"
        >
          Entrar
        </Button>
      </form>

      <p className="text-center text-xs text-purple-300/90 mt-2">
        <Link to="/" className="underline underline-offset-2 hover:text-white">
          Página inicial
        </Link>
      </p>
    </div>
  );
}
