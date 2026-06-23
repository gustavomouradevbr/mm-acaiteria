import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const MenuSection = ({ menuData, categories, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState('');

  useEffect(() => {
    if (categories && categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0].id);
    }
  }, [categories, activeCategory]);

  const filteredItems = menuData.filter(item => item.category === activeCategory);

  return (
    <section id="cardapio" className="w-full max-w-[1024px] px-5 py-20 flex flex-col justify-start items-start mx-auto border-t border-zinc-800">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="w-full md:w-72 flex flex-col justify-start items-start">
          <p className="text-lime-500 text-xs font-normal font-['Share_Tech_Mono'] uppercase leading-4 tracking-wider">Cardápio</p>
          <div className="pt-2">
            <h2>
              <span className="text-gray-100 text-5xl font-black font-['Barlow_Condensed'] uppercase leading-[48px]">Nossas Opções<br /></span>
              <span className="text-fuchsia-700 text-5xl font-black font-['Barlow_Condensed'] uppercase leading-[48px]">Favoritas</span>
            </h2>
          </div>
        </div>
        <div className="w-full md:w-80 max-w-80">
          <p className="text-zinc-400 text-sm font-normal font-['Barlow'] leading-5">Montados com ingredientes selecionados para dar o máximo de energia para o seu dia.</p>
        </div>
      </div>

      <div className="w-full pt-12 overflow-x-auto no-scrollbar">
        <div className="flex space-x-3 whitespace-nowrap pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full font-semibold font-['Barlow_Condensed'] text-sm uppercase leading-5 tracking-tight transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'bg-lime-500 text-zinc-950 border-lime-500 shadow-[0px_0px_20px_0px_rgba(57,255,20,0.25)]'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:bg-white/10 hover:text-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.length === 0 ? (
          <p className="text-zinc-500 text-sm font-['Barlow'] col-span-full">Nenhum produto cadastrado nesta categoria.</p>
        ) : (
          filteredItems.map((item) => (
            <ProductCard
              key={item.id}
              title={item.title}
              description={item.description}
              price={item.price}
              image={item.image}
              onAdd={() => onAddToCart(item)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default MenuSection;
