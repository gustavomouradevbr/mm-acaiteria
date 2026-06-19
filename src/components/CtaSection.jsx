import React from 'react';

const CtaSection = () => {
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
        <button className="px-10 py-5 bg-gradient-to-br from-fuchsia-700 to-purple-900 rounded-full shadow-[0px_0px_80px_0px_rgba(151,80,175,0.20)] shadow-[0px_0px_40px_0px_rgba(151,80,175,0.70)] inline-flex justify-start items-center gap-3">
          <div className="size-5 relative overflow-hidden">
            <div className="w-4 h-5 left-[2.75px] top-[1.83px] absolute bg-white outline outline-2 outline-offset-[-0.92px] outline-white"></div>
          </div>
          <span className="text-center text-white text-xl font-black font-['Barlow_Condensed'] uppercase leading-7 tracking-wide">⚡ Quero Minha Dose de Energia</span>
        </button>
      </div>
    </section>
  );
};

export default CtaSection;

