import React from 'react';

const ProductCard = ({ title, description, price, image, onAdd }) => {
  return (
    <div className="w-full bg-zinc-900 rounded-2xl shadow-[0px_0px_30px_0px_rgba(57,255,20,0.05)] outline outline-1 outline-offset-[-1px] outline-lime-500/10 overflow-hidden flex flex-col justify-between h-full hover:outline-lime-500/30 transition-all duration-300">
      <div className="relative w-full h-48 overflow-hidden">
        <img className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500" src={image} alt={title} />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-gray-100 text-2xl font-black font-['Barlow_Condensed'] uppercase leading-7">{title}</h3>
          <p className="pt-2 text-violet-300 text-sm font-normal font-['Barlow'] leading-5">{description}</p>
        </div>
        
        <div className="mt-6 flex justify-between items-center pt-2 border-t border-zinc-800">
          <div>
            <span className="text-lime-500 text-lg font-bold font-['Share_Tech_Mono'] leading-5">{price}</span>
          </div>
          <button onClick={onAdd} className="px-4 py-2 bg-lime-500 hover:bg-lime-400 transition-colors rounded-full shadow-[0px_0px_15px_0px_rgba(57,255,20,0.2)] flex justify-center items-center gap-1.5">
            <span className="text-zinc-950 text-xs font-bold font-['Barlow_Condensed'] uppercase leading-4">Pedir</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;