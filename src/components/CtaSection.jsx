import React from 'react';

const CtaSection = ({ onScrollToMenu }) => {
  return (
    <section className="self-stretch py-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-700/20 to-black/0 to-70% overflow-hidden flex justify-center">
      <div className="w-full max-w-[672px] inline-flex flex-col justify-start items-center text-center">
        <h2>
          <span className="text-gray-100 text-7xl font-black font-['Barlow_Condensed'] uppercase leading-[72px]">Sua energia<br /></span>
          <span className="text-lime-500 text-7xl font-black font-['Barlow_Condensed'] uppercase leading-[72px]">começa aqui</span>
        </h2>
        <p className="pt-6 pb-10 text-zinc-400 text-base font-normal font-['Barlow'] leading-6">
          Peça pelo WhatsApp e receba na sua porta em até 40 minutos.
        </p>
        <button onClick={onScrollToMenu} className="inline-flex items-center justify-start gap-3 px-8 py-4 bg-gradient-to-br from-fuchsia-700 to-purple-900 rounded-full hover:scale-105 transition-transform duration-300">
          <span className="text-xl font-black text-white uppercase font-['Barlow_Condensed'] leading-7 tracking-wide">⚡ Quero Minha Dose de Energia</span>
        </button>
      </div>
    </section>
  );
};

export default CtaSection;
