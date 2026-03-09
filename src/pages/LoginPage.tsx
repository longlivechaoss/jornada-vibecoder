import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight } from "lucide-react";

export function LoginPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Nenhuma autenticação real por enquanto.
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.25),_transparent_55%),_radial-gradient(circle_at_bottom,_rgba(236,72,153,0.12),_transparent_55%)]" />

      <div className="relative w-full max-w-md">
        <Card className="bg-zinc-950/70 border-zinc-800/80 shadow-2xl backdrop-blur-md">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold tracking-tight">
              Entrar na Jornada VIBECODER
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Acesse sua jornada de estudos com uma interface pensada para o modo escuro.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Button
              type="button"
              variant="outline"
              className="w-full justify-center gap-2 border-zinc-800 bg-zinc-900/60 text-zinc-100 hover:bg-zinc-900 hover:border-zinc-700"
            >
              <Mail className="w-4 h-4" />
              Continuar com Google
            </Button>

            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <div className="h-px flex-1 bg-zinc-800" />
              <span>Ou continue com e‑mail</span>
              <div className="h-px flex-1 bg-zinc-800" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm text-zinc-200">
                  E‑mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="voce@exemplo.com"
                  autoComplete="email"
                  className="bg-zinc-900/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-violet-500/60"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <Label htmlFor="password" className="text-sm text-zinc-200">
                    Senha
                  </Label>
                  <button
                    type="button"
                    className="text-xs font-medium text-violet-400 hover:text-violet-300 underline-offset-4 hover:underline"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    className="bg-zinc-900/60 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 pr-10 focus-visible:ring-violet-500/60"
                  />
                  <Lock className="w-4 h-4 text-zinc-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-2 gap-2 bg-violet-600 hover:bg-violet-500"
              >
                Entrar
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 items-center justify-center bg-zinc-950/60 border-t border-zinc-900">
            <p className="text-xs text-zinc-500 text-center">
              Novo por aqui?{" "}
              <button
                type="button"
                className="text-violet-400 hover:text-violet-300 font-medium underline-offset-4 hover:underline"
              >
                Criar conta
              </button>
            </p>
            <p className="text-[11px] text-zinc-600 text-center">
              Você também pode explorar livremente a{" "}
              <Link
                to="/"
                className="text-zinc-300 hover:text-zinc-100 underline underline-offset-4"
              >
                página inicial
              </Link>{" "}
              sem login.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}