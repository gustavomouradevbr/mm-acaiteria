import React from 'react';

const Footer = () => {
  return (
    <footer className="self-stretch px-5 py-12 bg-zinc-950 border-t border-fuchsia-700/20 flex flex-col items-center">
      <div className="w-full max-w-[1024px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1: Logo e Slogan */}
          <div className="flex flex-col justify-start items-start">
            <h3 className="text-2xl font-black font-['Barlow_Condensed'] leading-8">
              <span className="text-fuchsia-700">MM</span>
              <span className="text-lime-500">.</span>
              <span className="text-fuchsia-700">AÇAITERIA</span>
            </h3>
            <p className="pt-3 text-zinc-400 text-xs font-normal font-['Barlow'] leading-5">
              Sabor, qualidade e açaí de verdade direto na sua porta.
            </p>
          </div>

          {/* Coluna 2: Endereço e Horário */}
          <div className="flex flex-col justify-start items-start gap-3">
            <div className="inline-flex justify-start items-start gap-2">
              <div className="size-3.5 pt-0.5">
                {/* Ícone Endereço */}
              </div>
              <p className="text-violet-300 text-sm font-normal font-['Barlow'] leading-5">
                📍 Avenida São Mateus, 345<br />Iputinga, Recife – PE
              </p>
            </div>
            <div className="inline-flex justify-start items-start gap-2">
              <div className="size-3.5 pt-0.5">
                {/* Ícone Horário */}
              </div>
              <p>
                <span className="text-violet-300 text-sm font-normal font-['Barlow'] leading-5">Terça a domingo<br /></span>
                <span className="text-gray-100 text-sm font-bold font-['Barlow'] leading-5">17h às 23h</span>
              </p>
            </div>
          </div>

          {/* Coluna 3: Redes Sociais */}
          <div className="flex flex-col justify-start items-start gap-3">
            <h4 className="text-zinc-400 text-xs font-normal font-['Share_Tech_Mono'] uppercase leading-4 tracking-wider">Redes</h4>
            <a href="#" className="inline-flex justify-start items-center gap-2 text-violet-300 text-sm font-normal font-['Barlow'] leading-5">
              <div className="size-3.5">{/* Ícone Instagram */}</div>
              <span>@mmacaiteria</span>
            </a>
            <a href="#" className="inline-flex justify-start items-center gap-2 text-violet-300 text-sm font-normal font-['Barlow'] leading-5">
              <div className="size-3.5">{/* Ícone WhatsApp */}</div>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
        <div className="w-full pt-10 mt-6 border-t border-fuchsia-700/10 text-center">
          <p className="text-zinc-600 text-xs font-normal font-['Share_Tech_Mono'] leading-4">© 2026 MM Açaiteria · Feito com 💜 em Recife</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

