import React from 'react';

const HeroSection = () => {
  return (
    <section className="self-stretch min-h-[584px] px-5 pt-24 pb-16 flex flex-col justify-center items-center overflow-hidden">
      {/* Badge Delivery */}
      <div className="pb-6">
        <div className="relative w-52 h-7">
          <div className="absolute top-0 left-0 inline-flex items-center justify-start h-7 gap-2 px-4 py-1.5 bg-lime-500/10 rounded-full outline outline-1 outline-offset-[-1px] outline-lime-500/30">
            <div className="size-1.5 relative bg-lime-500 rounded-full opacity-60 shadow-[0px_0px_6px_0px_rgba(57,255,20,1.00)]" />
            <div className="text-xs font-normal text-center text-lime-500 uppercase justify-start font-['Share_Tech_Mono'] leading-4 tracking-wider">
              Delivery aberto agora
            </div>
          </div>
        </div>
      </div>

      {/* Título Principal */}
      <div className="pb-6">
        <div className="relative w-[537.13px] h-72 max-w-[768px]">
          <h1 className="absolute top-0 left-[18px] text-center justify-start text-8xl font-black uppercase font-['Barlow_Condensed'] leading-[96px]">
            <span className="text-gray-100">🔥 O Açaí que<br /></span>
            <span className="text-fuchsia-700">virou febre<br /></span>
            <span className="text-gray-100">no bairro</span>
          </h1>
        </div>
      </div>

      {/* Descrição */}
      <div className="pb-10">
        <div className="relative w-[576px] h-14 max-w-[576px]">
          <p className="absolute top-[-1px] left-0 w-[576px] text-center justify-start text-lg font-normal font-['Barlow'] leading-7">
            <span className="text-violet-300">Seja para o pré-treino, pós-treino ou aquele momento de recarregar as energias, a </span>
            <span className="font-bold text-gray-100">MM Açaiteria</span>
            <span className="text-violet-300"> entrega sabor, qualidade e açaí de verdade...</span>
          </p>
        </div>
      </div>

      {/* Botão CTA */}
      <button className="inline-flex items-center justify-start gap-3 px-8 py-4 bg-gradient-to-br from-fuchsia-700 to-purple-900 rounded-full shadow-[0px_0px_60px_0px_rgba(151,80,175,0.20)] shadow-[0px_0px_30px_0px_rgba(151,80,175,0.60)] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.15)]">
        <div className="relative size-5 overflow-hidden">
          <div className="absolute left-[2.50px] top-[1.66px] size-4 bg-white outline outline-[1.67px] outline-offset-[-0.83px] outline-white" />
        </div>
        <div className="text-xl font-black text-center text-white uppercase justify-start font-['Barlow_Condensed'] leading-7 tracking-wide">
          ⚡ Quero Minha Dose de Energia
        </div>
      </button>

      {/* Indicador de Scroll */}
      <div className="pt-16">
        <div className="flex flex-col items-center justify-start gap-1 opacity-40">
          <div className="relative w-12 h-4">
            <div className="absolute top-0 left-[1px] text-xs font-normal text-center text-gray-100 uppercase justify-start font-['Share_Tech_Mono'] leading-4 tracking-wider">
              scroll
            </div>
          </div>
          <div className="relative flex flex-col items-start justify-start size-4">
            <div className="absolute top-[-3.25px] left-0 size-4 overflow-hidden">
              <div className="absolute left-[4px] top-[6px] w-2 h-1 outline outline-[1.33px] outline-offset-[-0.67px] outline-gray-100" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;