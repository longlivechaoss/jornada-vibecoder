import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setAuthState } from "@/utils/auth";

export function EnterPage() {
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
    <div className="relative min-h-screen flex flex-col bg-zinc-100">
      {/* Parte superior clara com linhas roxas decorativas */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-30 pointer-events-none"
        style={{ backgroundImage: "url('/bg-lines.png.png')" }}
        aria-hidden
      />

      <div className="relative z-10 flex flex-1 flex-col items-center px-4 pt-12 pb-4 max-w-md mx-auto w-full">
        <h1 className="text-violet-900 font-extrabold text-3xl sm:text-4xl text-center leading-tight">
          Entre na sua conta
        </h1>
        <p className="text-violet-700 text-base sm:text-lg text-center mt-3 max-w-[320px]">
          Utilize seu nome de usuário e senha cadastrada
        </p>
      </div>

      {/* Card roxo — mais espaço acima, bordas mais arredondadas */}
      <div className="relative z-10 w-full flex-shrink-0 flex justify-center max-w-md mx-auto w-full px-0 mt-10 sm:mt-12">
        <div
          className="w-full rounded-t-[56px] px-8 sm:px-10 pt-12 sm:pt-14 pb-20 sm:pb-24 shadow-2xl min-h-[55vh] sm:min-h-[52vh]"
          style={{
            background:
              "linear-gradient(180deg, #8B3DFF 0%, #5B21B6 100%)",
            boxShadow: "0 -8px 60px rgba(109,40,217,0.5)",
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-7">
            <Input
              type="text"
              placeholder="Usuário"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 sm:h-[3.75rem] px-6 rounded-full text-white placeholder:text-purple-300/90 border-white/15 focus-visible:ring-2 focus-visible:ring-purple-300 text-base bg-violet-950/50"
            />
            <Input
              type="password"
              placeholder="Senha"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 sm:h-[3.75rem] px-6 rounded-full text-white placeholder:text-purple-300/90 border-white/15 focus-visible:ring-2 focus-visible:ring-purple-300 text-base bg-violet-950/50"
            />

            <div className="flex justify-end pt-1">
              <button
                type="button"
                className="text-purple-200 text-sm hover:text-white transition-colors underline underline-offset-2"
              >
                Esqueceu a senha?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full min-h-[4rem] py-6 rounded-full font-bold text-purple-900 text-base bg-white hover:bg-zinc-100 mt-2"
            >
              Entrar
            </Button>
          </form>

          <p className="text-center text-xs text-purple-200/90 mt-6">
            <Link
              to="/login"
              className="underline underline-offset-2 hover:text-white"
            >
              Voltar
            </Link>
            {" · "}
            <Link
              to="/"
              className="underline underline-offset-2 hover:text-white"
            >
              Página inicial
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
