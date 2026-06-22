import React from 'react';

const Header = ({ cartCount, onOpenCart }) => {
  return (
    <header className="w-full px-5 py-4 flex justify-between items-center bg-zinc-950 border-b border-fuchsia-700/20 sticky top-0 z-50">
      {/* Logo */}
      <div className="text-2xl font-black font-['Barlow_Condensed'] cursor-pointer">
        <span className="text-fuchsia-700">MM</span>
        <span className="text-lime-500">.</span>
        <span className="text-fuchsia-700">AÇAITERIA</span>
      </div>
      
      {/* Área de Ações e Perfil */}
      <div className="flex items-center gap-6">
        {/* Botão de Carrinho/Pedir (Oculto em telas muito pequenas para dar espaço ao perfil) */}
        <button onClick={onOpenCart} className="hidden sm:flex px-5 py-2 bg-white/5 rounded-full outline outline-1 outline-white/10 text-violet-300 text-sm font-semibold font-['Barlow_Condensed'] uppercase hover:bg-white/10 transition-all items-center gap-2">
  <span>🛒</span> Carrinho ({cartCount || 0})
</button>
        
        {/* Botão de Perfil (Cliente / Admin) */}
        <button className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer text-left">
          <div className="flex-col hidden sm:flex">
            <span className="text-gray-100 text-sm font-semibold font-['Barlow'] leading-tight">Gustavo</span>
            <span className="text-lime-500 text-xs font-normal font-['Share_Tech_Mono'] leading-tight">Minha Conta</span>
          </div>
          {/* Bolinha do Avatar */}
          <div className="w-10 h-10 rounded-full bg-zinc-900 outline outline-2 outline-offset-2 outline-fuchsia-700 flex items-center justify-center overflow-hidden shadow-[0px_0px_15px_0px_rgba(151,80,175,0.4)]">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Gustavo&backgroundColor=18181b" 
              alt="Perfil" 
              className="w-full h-full object-cover"
            />
          </div>
        </button>
      </div>
    </header>
  );
};

export default Header;