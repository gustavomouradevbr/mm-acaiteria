import React, { useState } from 'react';

const AuthScreen = ({ onLogin, onNavigate }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    const role = email.toLowerCase().includes('admin') ? 'admin' : 'customer';
    onLogin({ name: isRegister ? name : (email.split('@')[0] || 'Visitante'), email, role });
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-5 py-20">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl relative">
        {/* Botão de fechar (X) discreto no topo do card */}
        <button 
          onClick={() => onNavigate('store')} 
          className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 transition-colors text-xl leading-none"
        >
          &times;
        </button>

        <h2 className="text-4xl font-black font-['Barlow_Condensed'] uppercase text-gray-100 mb-2">
          {isRegister ? 'Criar Conta' : 'Acessar Conta'}
        </h2>
        <p className="text-zinc-400 text-sm mb-6 font-['Barlow']">
          {isRegister ? 'Cadastre-se para acompanhar seus pedidos.' : 'Entre para ver o status do seu açaí.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs text-zinc-400 mb-1 uppercase">Seu Nome</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-gray-100 focus:border-fuchsia-700 outline-none" placeholder="Gustavo Moura" required />
            </div>
          )}
          <div>
            <label className="block text-xs text-zinc-400 mb-1 uppercase">E-mail</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-gray-100 focus:border-fuchsia-700 outline-none" placeholder="seu@email.com" required />
          </div>
          <div>
            <label className="block text-xs text-zinc-400 mb-1 uppercase">Senha (Temporariamente Opcional)</label>
            <input type="password" placeholder="••••••••" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-gray-100 focus:border-fuchsia-700 outline-none" />
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button type="submit" className="w-full py-3.5 bg-lime-500 hover:bg-lime-400 font-black font-['Barlow_Condensed'] text-lg uppercase text-zinc-950 rounded-xl transition-colors">
              {isRegister ? 'Cadastrar e Entrar' : 'Entrar na Conta'}
            </button>
            
            {/* Botão Voltar ao Início solicitado */}
            <button 
              type="button"
              onClick={() => onNavigate('store')}
              className="w-full py-2.5 bg-zinc-950 hover:bg-zinc-800 text-zinc-400 hover:text-white font-bold font-['Barlow_Condensed'] uppercase rounded-xl transition-colors border border-zinc-800 text-sm"
            >
              🏠 Voltar ao Início
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setIsRegister(!isRegister)} className="text-fuchsia-500 hover:text-fuchsia-400 text-sm font-semibold underline underline-offset-4">
            {isRegister ? 'Já tenho conta. Quero entrar.' : 'Não tem conta? Cadastre-se aqui.'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AuthScreen;