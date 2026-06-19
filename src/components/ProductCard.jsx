import React from 'react';
import React from 'react';
import imgAcai from '../assets/image/frutaroxa.jpg';

const ProductCard = ({ title, description, calories }) => {
  return (
    <div className="self-stretch bg-zinc-900 rounded-2xl shadow-[0px_0px_40px_0px_rgba(57,255,20,0.13)] outline outline-1 outline-offset-[-1px] outline-lime-500/20 overflow-hidden flex flex-col md:flex-row">
      <div className="relative md:w-1/2">
        <img className="w-full h-full object-cover opacity-90" src={imgAcai} alt={title} />
        <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 to-black/0 to-60%"></div>
      </div>
      <div className="p-8 md:w-1/2 flex flex-col justify-between">
        <div>
          <h3 className="text-gray-100 text-4xl font-black font-['Barlow_Condensed'] uppercase leading-10">{title}</h3>
          <p className="pt-3 text-violet-300 text-base font-normal font-['Barlow'] leading-6">{description}</p>
        </div>
        <div className="mt-8 inline-flex justify-between items-center">
          <div>
            <span className="text-lime-500 text-sm font-normal font-['Share_Tech_Mono'] leading-5">{calories}</span>
          </div>
          <button className="px-6 py-3 bg-lime-500 rounded-full shadow-[0px_0px_20px_0px_rgba(57,255,20,0.33)] flex justify-start items-center gap-2">
            <div className="size-3.5 relative overflow-hidden">
              <div className="w-2.5 h-3 left-[1.75px] top-[1.17px] absolute outline outline-1 outline-offset-[-0.58px] outline-zinc-950"></div>
            </div>
            <span className="text-zinc-950 text-sm font-bold font-['Barlow_Condensed'] uppercase leading-5"> Pedir esse</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
