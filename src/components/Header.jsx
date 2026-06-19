import React from 'react';

const Header = () => {
  return (
    <header className="w-full px-5 py-4 flex justify-between items-center bg-zinc-950 border-b border-fuchsia-700/20">
      <div className="text-2xl font-black font-['Barlow_Condensed'] cursor-pointer">
        <span className="text-fuchsia-700">MM</span>
        <span className="text-lime-500">.</span>
        <span className="text-fuchsia-700">AÇAITERIA</span>
      </div>
      <button className="px-5 py-2 bg-white/5 rounded-full outline outline-1 outline-white/10 text-violet-300 text-sm font-semibold font-['Barlow_Condensed'] uppercase hover:bg-white/10 transition-all">
        💜 Pedir Agora
      </button>
    </header>
  );
};

export default Header;