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
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Parte superior clara com linhas roxas decorativas (Figma: opacity 40%) */}
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-40 pointer-events-none"
        style={{ backgroundImage: "url('/bg-lines.png.png')" }}
        aria-hidden
      />

      {/* Header: título e subtítulo — alinhados à esquerda, mesmo padding do card */}
      <div className="relative z-10 flex flex-1 flex-col items-start w-full px-8 pt-[110px] pb-2">
        <h1 className="text-[34px] font-extrabold text-left leading-normal text-[#7f22fd] w-full">
          Entre na sua conta
        </h1>
        <p className="text-base font-extrabold text-[#7f22fd] text-left leading-normal mt-4 w-full">
          Utilize seu nome de usuário e senha cadastrada
        </p>
      </div>

      {/* Card roxo — Figma: top 245px, h 599px, rounded-t 55px, gradient #7f22fd → #3f1479 */}
      <div className="relative z-10 w-full flex-shrink-0 px-0 mt-6">
        <div
          className="w-full rounded-t-[55px] px-8 pt-11 pb-20 shadow-2xl min-h-[599px] sm:min-h-[52vh]"
          style={{
            background: "linear-gradient(180deg, #7f22fd 0%, #3f1479 100%)",
            boxShadow: "0 -8px 60px rgba(127,34,253,0.4)",
          }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Usuário"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[63px] px-12 rounded-[31.5px] text-white placeholder-white/40 text-base font-extrabold border-0 bg-[rgba(34,34,34,0.25)] focus-visible:ring-2 focus-visible:ring-white/30"
            />
            <Input
              type="password"
              placeholder="Senha"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[63px] px-12 rounded-[31.5px] text-white placeholder-white/40 text-base font-extrabold border-0 bg-[rgba(34,34,34,0.25)] focus-visible:ring-2 focus-visible:ring-white/30"
            />

            <div className="flex justify-end">
              <button
                type="button"
                className="text-white text-xs font-medium hover:underline"
              >
                Esqueceu a senha?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-[66px] rounded-[33px] font-extrabold text-[16px] text-[#222] bg-white hover:bg-gray-100"
            >
              Entrar
            </Button>
          </form>

          <p className="text-center text-xs text-white/80 mt-6">
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
