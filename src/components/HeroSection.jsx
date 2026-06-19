import React from 'react';

const HeroSection = () => {
  return (
    <section className="w-full min-h-[584px] px-5 pt-24 pb-16 flex flex-col justify-center items-center overflow-hidden">
      {/* Badge Delivery */}
      <div className="pb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-lime-500/10 rounded-full outline outline-1 outline-offset-[-1px] outline-lime-500/30">
          <div className="size-1.5 bg-lime-500 rounded-full opacity-60 shadow-[0px_0px_6px_0px_rgba(57,255,20,1.00)]" />
          <span className="text-xs font-normal text-center text-lime-500 uppercase font-['Share_Tech_Mono'] leading-4 tracking-wider">
            Delivery aberto agora
          </span>
        </div>
      </div>

      {/* Título Principal */}
      <div className="pb-6 text-center">
        <h1 className="text-8xl font-black uppercase font-['Barlow_Condensed'] leading-[96px]">
          <span className="text-gray-100">🔥 O Açaí que<br /></span>
          <span className="text-fuchsia-700">virou febre<br /></span>
          <span className="text-gray-100">no bairro</span>
        </h1>
      </div>

      {/* Descrição */}
      <div className="pb-10 max-w-[576px] text-center">
        <p className="text-lg font-normal font-['Barlow'] leading-7">
          <span className="text-violet-300">Seja para o pré-treino, pós-treino ou aquele momento de recarregar as energias, a </span>
          <span className="font-bold text-gray-100">MM Açaiteria</span>
          <span className="text-violet-300"> entrega sabor, qualidade e açaí de verdade...</span>
        </p>
      </div>

      {/* Botão CTA */}
      <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-fuchsia-700 to-purple-900 rounded-full shadow-[0px_0px_60px_0px_rgba(151,80,175,0.20),0px_0px_30px_0px_rgba(151,80,175,0.60),inset_0px_1px_0px_0px_rgba(255,255,255,0.15)]">
        <span className="text-xl font-black text-white uppercase font-['Barlow_Condensed'] leading-7 tracking-wide">
          ⚡ Quero Minha Dose de Energia
        </span>
      </button>

      {/* Indicador de Scroll */}
      <div className="pt-16 opacity-40 flex flex-col items-center gap-1">
        <span className="text-xs font-normal text-gray-100 uppercase font-['Share_Tech_Mono'] leading-4 tracking-wider">
          scroll
        </span>
        <div className="w-2 h-1 outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-100" />
      </div>
    </section>
  );
};

export default HeroSection;