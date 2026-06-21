import React, { useState } from 'react';
import ProductCard from './ProductCard';

// Importações organizadas de todas as fotos novas do cardápio
import imgMaisPedido300 from '../assets/cardapiommacaiteria/maispedidos/acai300ML.webp';
import imgMaisPedido400 from '../assets/cardapiommacaiteria/maispedidos/acai400ML.webp';
import imgMaisPedido1L from '../assets/cardapiommacaiteria/maispedidos/acai1LITRO.webp';
import imgMaisPedidoDuplo400 from '../assets/cardapiommacaiteria/maispedidos/acaiduplo400ML.webp';

import imgComboCasal250 from '../assets/cardapiommacaiteria/COMBOACAI DUPLO/acaiduplo250ML.webp';
import imgComboTurbo300 from '../assets/cardapiommacaiteria/COMBOACAI DUPLO/acaiduplo300ML.webp';
import imgComboSuper400 from '../assets/cardapiommacaiteria/COMBOACAI DUPLO/acaiduplo400ML(1).webp';

import imgPromo1 from '../assets/cardapiommacaiteria/promocoes/acai1.webp';
import imgPromo2 from '../assets/cardapiommacaiteria/promocoes/acai2.webp';
import imgPromo3 from '../assets/cardapiommacaiteria/promocoes/acai3.webp';

import imgMonte250 from '../assets/cardapiommacaiteria/monteseuacai/acai250ML.webp';
import imgMonte300 from '../assets/cardapiommacaiteria/monteseuacai/acai300ML(1).webp';
import imgMonte500 from '../assets/cardapiommacaiteria/monteseuacai/acai500ML.webp';
import imgMonte770 from '../assets/cardapiommacaiteria/monteseuacai/acai770ML.webp';

import imgPaleta1 from '../assets/cardapiommacaiteria/paleta/paleta1.webp';
import imgPaleta2 from '../assets/cardapiommacaiteria/paleta/paleta2.webp';
import imgAgua from '../assets/cardapiommacaiteria/bebidas/agua.webp';

const menuData = [
  // Mais Pedidos
  { id: 1, category: 'maispedidos', title: 'Açaí Tradicional 300ml', description: 'Banana fatiada, leite em pó, granola crocante e mel orgânico.', price: 'R$ 16,00', image: imgMaisPedido300 },
  { id: 2, category: 'maispedidos', title: 'Açaí Classic 400ml', description: 'Morango fresco, leite condensado, leite em pó e paçoca premium.', price: 'R$ 20,00', image: imgMaisPedido400 },
  { id: 3, category: 'maispedidos', title: 'Açaí Monstro 1 Litro', description: 'O gigante da casa! Escolha até 5 acompanhamentos direto no balcão.', price: 'R$ 42,00', image: imgMaisPedido1L },
  { id: 4, category: 'maispedidos', title: 'Açaí Duplo Especial 400ml', description: 'Duas camadas generosas de açaí puro intercaladas com creme de ninho.', price: 'R$ 24,00', image: imgMaisPedidoDuplo400 },

  // Monte seu Açaí
  { id: 5, category: 'monteseuacai', title: 'Monte seu Açaí 250ml', description: 'Tamanho perfeito para um lanche rápido. Inclui 2 acompanhamentos grátis.', price: 'R$ 13,00', image: imgMonte250 },
  { id: 6, category: 'monteseuacai', title: 'Monte seu Açaí 300ml', description: 'A medida exata para o seu pré-treino com até 3 acompanhamentos à escolha.', price: 'R$ 16,00', image: imgMonte300 },
  { id: 7, category: 'monteseuacai', title: 'Monte seu Açaí 500ml', description: 'Nosso campeão de vendas! Monte do seu jeito com até 4 complementos.', price: 'R$ 25,00', image: imgMonte500 },
  { id: 8, category: 'monteseuacai', title: 'Monte seu Açaí 770ml', description: 'Para os verdadeiros amantes de açaí. Espaço de sobra para caprichar nos cremes.', price: 'R$ 34,00', image: imgMonte770 },

  // Combos Duplos
  { id: 9, category: 'combos', title: 'Combo Duplo Casal 250ml', description: 'Leve dois copos de 250ml completíssimos com leite em pó e calda de morango.', price: 'R$ 22,00', image: imgComboCasal250 },
  { id: 10, category: 'combos', title: 'Combo Duplo Turbo 300ml', description: 'Dois copos de 300ml com paçoca, banana e leite condensado para repor as energias.', price: 'R$ 28,00', image: imgComboTurbo300 },
  { id: 11, category: 'combos', title: 'Combo Super Duplo 400ml', description: 'Dois copos grandes de 400ml recheados com os melhores complementos da casa.', price: 'R$ 36,00', image: imgComboSuper400 },

  // Promoções
  { id: 12, category: 'promocoes', title: 'Promoção do Dia 01', description: 'Açaí com mousse de maracujá caseiro e gotas de chocolate meio amargo.', price: 'R$ 15,00', image: imgPromo1 },
  { id: 13, category: 'promocoes', title: 'Combo Universitário', description: 'Açaí de 400ml + porção extra de leite em pó por um preço especial.', price: 'R$ 18,00', image: imgPromo2 },
  { id: 14, category: 'promocoes', title: 'Trio Família', description: 'Três copos de açaí tradicionais montados para curtir o final de semana.', price: 'R$ 45,00', image: imgPromo3 },

  // Paletas e Bebidas
  { id: 15, category: 'extras', title: 'Paleta Recheada Morango', description: 'Paleta artesanal de morango com recheio cremoso de leite condensado.', price: 'R$ 9,50', image: imgPaleta1 },
  { id: 16, category: 'extras', title: 'Paleta Ninho com Nutella', description: 'Gelato artesanal de leite ninho com recheio generoso de Nutella pura.', price: 'R$ 11,00', image: imgPaleta2 },
  { id: 17, category: 'extras', title: 'Água Mineral 500ml', description: 'Água mineral sem gás bem gelada para refrescar.', price: 'R$ 3,50', image: imgAgua },
];

const categories = [
  { id: 'maispedidos', label: 'Mais Pedidos' },
  { id: 'monteseuacai', label: 'Monte seu Açaí' },
  { id: 'combos', label: 'Combos Duplos' },
  { id: 'promocoes', label: 'Promoções' },
  { id: 'extras', label: 'Paletas & Bebidas' },
];

const MenuSection = () => {
  const [activeCategory, setActiveCategory] = useState('maispedidos');

  const filteredItems = menuData.filter(item => item.category === activeCategory);

  return (
    <section className="w-full max-w-[1024px] px-5 py-20 flex flex-col justify-start items-start mx-auto border-t border-zinc-800">
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

      {/* Abas de Navegação / Filtros */}
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

      {/* Grid de Produtos Dinâmicos */}
      <div className="w-full pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <ProductCard
            key={item.id}
            title={item.title}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;