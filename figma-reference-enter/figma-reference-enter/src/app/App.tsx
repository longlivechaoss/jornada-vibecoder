import { useState } from 'react';
import imgLoginPage1 from "figma:asset/f1afaf250fa2f5518a1e3ffa72cae52f34f29295.png";

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });
    // Add your login logic here
  };

  return (
    <div className="bg-white relative h-screen w-full overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute h-[1016px] left-[-577px] opacity-40 top-[-232px] w-[1355px] pointer-events-none">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            alt="" 
            className="absolute h-[133.37%] left-[0.07%] max-w-none top-[-11.81%] w-full" 
            src={imgLoginPage1} 
          />
        </div>
      </div>

      {/* Header Section */}
      <div className="absolute left-[4px] top-[86px] px-8 py-8">
        <h1 className="text-[34px] font-extrabold text-[#7f22fd] mb-4 leading-normal">
          Entre na sua conta
        </h1>
        <p className="text-[16px] font-extrabold text-[#7f22fd] leading-normal">
          Utilize seu nome de usuário e senha<br />
          cadastrada
        </p>
      </div>

      {/* Gradient Card */}
      <div className="absolute left-0 top-[245px] w-full h-[599px] bg-gradient-to-b from-[#7f22fd] to-[#3f1479] rounded-tl-[55px] rounded-tr-[55px]">
        <form onSubmit={handleLogin} className="px-8 pt-11 flex flex-col gap-4">
          {/* Username Input */}
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuário"
              className="w-full h-[63px] px-12 bg-[rgba(34,34,34,0.25)] rounded-[31.5px] text-white placeholder-white/40 text-[16px] font-extrabold tracking-[0.48px] outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full h-[63px] px-12 bg-[rgba(34,34,34,0.25)] rounded-[31.5px] text-white placeholder-white/40 text-[16px] font-extrabold tracking-[0.48px] outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>

          {/* Forgot Password Link */}
          <button 
            type="button"
            className="text-white text-[12px] font-medium tracking-[0.36px] text-left hover:underline"
          >
            Esqueceu a senha?
          </button>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full h-[66px] bg-white rounded-[33px] text-[#222] text-[16px] font-extrabold tracking-[0.48px] hover:bg-gray-100 transition-colors mt-0"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
