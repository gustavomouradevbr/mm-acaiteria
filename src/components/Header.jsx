import React, { useState } from 'react';

const Header = ({ cartCount, onOpenCart, currentUser, currentView, onNavigate, onLogout }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <header className="w-full px-5 py-4 flex justify-between items-center bg-zinc-950 border-b border-fuchsia-700/20 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div onClick={() => onNavigate('store')} className="text-2xl font-black font-['Barlow_Condensed'] cursor-pointer">
          <span className="text-fuchsia-700">MM</span>
          <span className="text-lime-500">.</span>
          <span className="text-fuchsia-700">AÇAITERIA</span>
        </div>
        {currentView !== 'store' && currentView !== 'login' && (
          <button
            onClick={() => onNavigate('store')}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold uppercase rounded-lg border border-zinc-800"
          >
            <span>🏠</span> Voltar à Loja
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        {currentView === 'store' && (
          <button onClick={onOpenCart} className="px-4 py-2 bg-white/5 rounded-full outline outline-1 outline-white/10 text-violet-300 text-sm font-semibold font-['Barlow_Condensed'] uppercase hover:bg-white/10 flex items-center gap-2">
            <span>🛒</span> <span className="hidden sm:inline">Carrinho</span> ({cartCount || 0})
          </button>
        )}

        {currentUser ? (
          <div className="relative">
            <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center gap-2.5 hover:opacity-80 text-left">
              <div className="flex-col hidden sm:flex">
                <span className="text-gray-100 text-sm font-semibold">{currentUser.name}</span>
                <span className="text-fuchsia-500 text-xs font-mono">{currentUser.role === 'admin' ? 'Administrador' : 'Cliente'}</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-zinc-900 border-2 border-fuchsia-700 flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.name}`} alt="Perfil" className="w-full h-full" />
              </div>
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden py-1 z-50">
                {currentUser.role === 'admin' ? (
                  <button onClick={() => { onNavigate('admin'); setIsProfileMenuOpen(false); }} className="w-full px-4 py-3 text-left text-sm text-lime-500 hover:bg-zinc-800 flex items-center gap-2">
                    <span>⚙️</span> Painel Admin
                  </button>
                ) : (
                  <button onClick={() => { onNavigate('customer'); setIsProfileMenuOpen(false); }} className="w-full px-4 py-3 text-left text-sm text-gray-100 hover:bg-zinc-800 flex items-center gap-2">
                    <span>📦</span> Meus Pedidos
                  </button>
                )}
                <div className="h-px bg-zinc-800 my-1"></div>
                <button onClick={() => { onLogout(); setIsProfileMenuOpen(false); }} className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-zinc-800 flex items-center gap-2">
                  <span>🚪</span> Sair da Conta
                </button>
              </div>
            )}
          </div>
        ) : (
          currentView !== 'login' && (
            <button onClick={() => onNavigate('login')} className="text-sm font-bold font-['Barlow_Condensed'] uppercase text-lime-500 hover:text-lime-400 tracking-wider">
              Fazer Login
            </button>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
