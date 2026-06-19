import React from 'react';
import ProductCard from './ProductCard';

const MenuSection = () => {
  return (
    <section className="w-full max-w-[1024px] px-5 py-20 flex flex-col justify-start items-start mx-auto">
      <div className="self-stretch inline-flex justify-between items-end">
        <div className="w-72 inline-flex flex-col justify-start items-start">
          <div className="self-stretch flex flex-col justify-start items-start">
            <p className="justify-start text-lime-500 text-xs font-normal font-['Share_Tech_Mono'] uppercase leading-4 tracking-wider">Menu</p>
          </div>
          <div className="w-72 pt-2">
            <h2 className="justify-start">
              <span className="text-gray-100 text-5xl font-black font-['Barlow_Condensed'] uppercase leading-[48px]">Nossos Combos<br /></span>
              <span className="text-fuchsia-700 text-5xl font-black font-['Barlow_Condensed'] uppercase leading-[48px]">Favoritos</span>
            </h2>
          </div>
        </div>
        <div className="w-80 max-w-80">
          <p className="justify-start text-zinc-400 text-sm font-normal font-['Barlow'] leading-5">Montados por nutricionistas parceiros para maximizar seu treino.</p>
        </div>
      </div>

      <div className="self-stretch pt-12">
        <div className="flex space-x-4">
          <button className="px-5 py-2 bg-white/5 rounded-full outline outline-1 outline-offset-[-1px] outline-white/10">
            <span className="text-center text-zinc-400 text-sm font-semibold font-['Barlow_Condensed'] uppercase leading-5 tracking-tight">Pré-treino</span>
          </button>
          <button className="px-5 py-2 bg-lime-500 rounded-full shadow-[0px_0px_20px_0px_rgba(57,255,20,0.33)] outline outline-1 outline-offset-[-1px] outline-lime-500">
            <span className="text-center text-zinc-950 text-sm font-semibold font-['Barlow_Condensed'] uppercase leading-5 tracking-tight">Pós-treino</span>
          </button>
          <button className="px-5 py-2 bg-white/5 rounded-full outline outline-1 outline-offset-[-1px] outline-white/10">
            <span className="text-center text-zinc-400 text-sm font-semibold font-['Barlow_Condensed'] uppercase leading-5 tracking-tight">Clássico</span>
          </button>
        </div>
      </div>

      <div className="self-stretch pt-8">
        <ProductCard
          title="Recovery Bowl"
          description="Açaí + whey protein + frutas vermelhas + aveia + coco ralado"
          calories="480 kcal"
        />
      </div>
    </section>
  );
};

export default MenuSection;

