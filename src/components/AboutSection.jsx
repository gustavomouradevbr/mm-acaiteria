import React from 'react';

const AboutSection = () => {
  return (
    <section className="w-full max-w-[1024px] px-5 py-20 mx-auto flex flex-col md:flex-row items-center gap-12 border-t border-fuchsia-700/20">
      {/* Coluna da Imagem */}
      <div className="w-full md:w-1/2 relative">
        <div className="absolute inset-0 bg-fuchsia-700/20 blur-3xl rounded-full"></div>
        {/* Deixei um link de imagem do Unsplash como placeholder, mas você pode trocar por uma foto real da loja depois */}
        <img
          className="w-full h-auto max-h-[400px] object-cover rounded-2xl outline outline-1 outline-fuchsia-700/30 shadow-[0px_0px_40px_0px_rgba(151,80,175,0.2)] relative z-10"
          src="https://images.unsplash.com/photo-1526424382096-74a93e105682?q=80&w=800&auto=format&fit=crop"
          alt="Tigela de Açaí fresco"
        />
      </div>

      {/* Coluna do Texto */}
      <div className="w-full md:w-1/2 flex flex-col justify-start items-start">
        <p className="text-lime-500 text-xs font-normal font-['Share_Tech_Mono'] uppercase leading-4 tracking-wider mb-3">
          Nossa História
        </p>
        <h2 className="mb-6">
          <span className="text-gray-100 text-5xl font-black font-['Barlow_Condensed'] uppercase leading-[48px]">Nascida e criada<br /></span>
          <span className="text-fuchsia-700 text-5xl font-black font-['Barlow_Condensed'] uppercase leading-[48px]">na Iputinga</span>
        </h2>
        <p className="text-zinc-400 text-base font-normal font-['Barlow'] leading-6 mb-4">
          A MM Açaiteria começou com uma ideia simples: trazer o verdadeiro sabor do açaí para a galera de Recife. Sem misturas estranhas, sem miséria nos acompanhamentos, apenas energia pura para o seu dia a dia.
        </p>
        <p className="text-zinc-400 text-base font-normal font-['Barlow'] leading-6">
          Seja para dar aquele gás antes do treino ou para refrescar as noites quentes da cidade, nosso compromisso é entregar qualidade, rapidez e uma experiência que faça você querer pedir de novo.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;