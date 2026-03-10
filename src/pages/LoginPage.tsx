import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setAuthState } from "@/utils/auth";
import { ArrowRight } from "lucide-react";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12"
      style={{ backgroundColor: "#0f0f0f" }}
    >
      {/* Layered purple glow and gradient background */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-purple-950/15" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[140%] max-w-[700px] h-[500px] rounded-full bg-violet-500/20 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[90%] max-w-[450px] h-[350px] rounded-full bg-purple-600/15 blur-[80px]" />
        <div className="absolute top-1/3 left-0 w-72 h-72 rounded-full bg-violet-600/10 blur-[60px]" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-fuchsia-500/10 blur-[50px]" />
      </div>

      <div className="relative w-full max-w-[400px] flex flex-col items-center">
        {/* Hero: mascot + title + platform subtitle */}
        <header className="flex flex-col items-center text-center mb-8 sm:mb-10">
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-violet-500/40 via-violet-600/30 to-purple-800/60 border-2 border-violet-400/30 flex items-center justify-center mb-5 shadow-2xl shadow-violet-500/20 ring-4 ring-violet-500/10"
            aria-hidden
          >
            <span className="text-4xl sm:text-5xl opacity-95" aria-hidden>🚀</span>
          </div>
          <h1 className="flex flex-col items-center mb-2">
            <span className="text-sm sm:text-base font-semibold text-zinc-400 tracking-widest uppercase">
              Jornada
            </span>
            <span className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-violet-300 via-violet-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
              Vibecoder
            </span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 max-w-[280px] leading-relaxed">
            Aprenda a programar de forma leve e progressiva, usando a IA a seu favor.
          </p>
        </header>

        {/* Section title above card */}
        <div className="text-center mb-6 w-full">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
            Entre na sua conta
          </h2>
          <p className="text-sm text-zinc-400">
            Utilize seu nome de usuário e senha cadastrada
          </p>
        </div>

        {/* Login card — increased inner spacing */}
        <Card className="w-full rounded-2xl sm:rounded-3xl border-0 shadow-2xl shadow-violet-900/20 overflow-hidden bg-gradient-to-b from-violet-700/50 via-violet-800/60 to-purple-900/80">
          <CardContent className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-zinc-200 sr-only"
                >
                  Usuário
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Usuário"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl bg-violet-950/80 border-violet-700/50 text-white placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:border-violet-500/50 h-12 px-4"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-zinc-200 sr-only"
                >
                  Senha
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Senha"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl bg-violet-950/80 border-violet-700/50 text-white placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:border-violet-500/50 h-12 px-4"
                />
                <div className="flex justify-end pt-0.5">
                  <button
                    type="button"
                    className="text-xs font-medium text-violet-300 hover:text-violet-200 underline-offset-4 hover:underline"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              </div>

              {/* Primary CTA — clear hierarchy */}
              <Button
                type="submit"
                className="w-full h-12 rounded-xl font-semibold text-base bg-white text-violet-900 hover:bg-zinc-100 focus-visible:ring-violet-400 mt-2 shadow-lg shadow-black/10"
              >
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Social login — secondary hierarchy */}
        <div className="w-full mt-8 space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 rounded-xl font-medium bg-white/95 text-zinc-800 hover:bg-zinc-50 border border-zinc-200/90 gap-2 text-sm"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
            <ArrowRight className="w-4 h-4 ml-auto shrink-0 opacity-70" />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 rounded-xl font-medium bg-white/95 text-zinc-800 hover:bg-zinc-50 border border-zinc-200/90 gap-2 text-sm"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden>
              <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
            <ArrowRight className="w-4 h-4 ml-auto shrink-0 opacity-70" />
          </Button>
        </div>

        <p className="mt-8 text-center text-xs text-zinc-500">
          Novo por aqui?{" "}
          <button
            type="button"
            className="text-violet-400 hover:text-violet-300 font-medium underline-offset-4 hover:underline"
          >
            Criar conta
          </button>
          {" · "}
          <Link
            to="/"
            className="text-zinc-400 hover:text-zinc-300 underline-offset-4 hover:underline"
          >
            Página inicial
          </Link>
        </p>
      </div>
    </div>
  );
}
