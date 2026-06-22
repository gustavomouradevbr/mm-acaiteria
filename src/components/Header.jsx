import React, { useState } from 'react';

const Header = ({ cartCount, onOpenCart, isAdminView, onToggleAdminView, isOpenStatus }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="w-full px-5 py-4 flex justify-between items-center bg-zinc-950 border-b border-fuchsia-700/20 sticky top-0 z-50">
      
      {/* Logo & Botão Início (Exibido quando está no painel) */}
      <div className="flex items-center gap-4">
        <div onClick={() => onToggleAdminView(false)} className="text-2xl font-black font-['Barlow_Condensed'] cursor-pointer">
          <span className="text-fuchsia-700">MM</span>
          <span className="text-lime-500">.</span>
          <span className="text-fuchsia-700">AÇAITERIA</span>
        </div>
        
        {isAdminView && (
          <button 
            onClick={() => onToggleAdminView(false)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-semibold font-['Barlow'] uppercase tracking-wide rounded-lg border border-zinc-800 transition-colors"
          >
            <span>🏠</span> Voltar ao Início
          </button>
        )}
      </div>
      
      {/* Área de Ações e Perfil */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Status de funcionamento visível no Header */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider">
          <span className={`w-2 h-2 rounded-full ${isOpenStatus ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
          <span className={isOpenStatus ? 'text-green-500' : 'text-red-400'}>
            {isOpenStatus ? 'Aberto' : 'Fechado'}
          </span>
        </div>

        {/* Botão de Carrinho (Oculto no Painel Admin) */}
        {!isAdminView && (
          <button onClick={onOpenCart} className="px-4 py-2 bg-white/5 rounded-full outline outline-1 outline-white/10 text-violet-300 text-sm font-semibold font-['Barlow_Condensed'] uppercase hover:bg-white/10 transition-all flex items-center gap-2">
            <span>🛒</span> <span className="hidden sm:inline">Carrinho</span> ({cartCount || 0})
          </button>
        )}
        
        {/* Menu de Perfil (Dropdown) */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer text-left"
          >
            <div className="flex-col hidden sm:flex">
              <span className="text-gray-100 text-sm font-semibold font-['Barlow'] leading-tight">Gustavo</span>
              <span className="text-fuchsia-500 text-xs font-normal font-['Share_Tech_Mono'] leading-tight">
                {isAdminView ? 'Modo Admin' : 'Modo Cliente'}
              </span>
            </div>
            {/* Avatar */}
            <div className={`w-9 h-9 rounded-full bg-zinc-900 outline outline-2 outline-offset-2 flex items-center justify-center overflow-hidden transition-all ${isAdminView ? 'outline-lime-500 shadow-[0px_0px_12px_0px_rgba(57,255,20,0.5)]' : 'outline-fuchsia-700 shadow-[0px_0px_12px_0px_rgba(151,80,175,0.4)]'}`}>
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gustavo&backgroundColor=18181b" 
                alt="Perfil" 
                className="w-full h-full object-cover"
              />
            </div>
          </button>

          {/* O Dropdown */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden py-1 z-50">
              <button 
                onClick={() => {
                  onToggleAdminView(false);
                  setIsProfileMenuOpen(false);
                  alert("Em breve: Tela de rastreio de pedidos do cliente!");
                }}
                className="w-full px-4 py-3 text-left text-sm font-['Barlow'] text-gray-100 hover:bg-zinc-800 transition-colors flex items-center gap-2"
              >
                <span>📦</span> Meus Pedidos
              </button>
              <div className="h-px bg-zinc-800 my-1"></div>
              <button 
                onClick={() => {
                  onToggleAdminView(true);
                  setIsProfileMenuOpen(false);
                }}
                className="w-full px-4 py-3 text-left text-sm font-['Barlow'] text-lime-500 hover:bg-zinc-800 transition-colors flex items-center gap-2"
              >
                <span>⚙️</span> Painel Administrativo
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;