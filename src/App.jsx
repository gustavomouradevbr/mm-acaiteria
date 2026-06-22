import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import AboutSection from './components/AboutSection';
import MenuSection from './components/MenuSection';
import TestimonialsSection from './components/TestimonialsSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import AdminDashboard from './components/AdminDashboard';

// Importações dos webp iniciais do cardápio público
import imgMaisPedido300 from './assets/cardapiommacaiteria/maispedidos/acai300ML.webp';
import imgMaisPedido400 from './assets/cardapiommacaiteria/maispedidos/acai400ML.webp';
import imgMaisPedido1L from './assets/cardapiommacaiteria/maispedidos/acai1LITRO.webp';
import imgMaisPedidoDuplo400 from './assets/cardapiommacaiteria/maispedidos/acaiduplo400ML.webp';
import imgComboCasal250 from './assets/cardapiommacaiteria/COMBOACAI DUPLO/acaiduplo250ML.webp';
import imgComboTurbo300 from './assets/cardapiommacaiteria/COMBOACAI DUPLO/acaiduplo300ML.webp';
import imgComboSuper400 from './assets/cardapiommacaiteria/COMBOACAI DUPLO/acaiduplo400ML(1).webp';
import imgPromo1 from './assets/cardapiommacaiteria/promocoes/acai1.webp';
import imgPromo2 from './assets/cardapiommacaiteria/promocoes/acai2.webp';
import imgPromo3 from './assets/cardapiommacaiteria/promocoes/acai3.webp';
import imgMonte250 from './assets/cardapiommacaiteria/monteseuacai/acai250ML.webp';
import imgMonte300 from './assets/cardapiommacaiteria/monteseuacai/acai300ML(1).webp';
import imgMonte500 from './assets/cardapiommacaiteria/monteseuacai/acai500ML.webp';
import imgMonte770 from './assets/cardapiommacaiteria/monteseuacai/acai770ML.webp';
import imgPaleta1 from './assets/cardapiommacaiteria/paleta/paleta1.webp';
import imgPaleta2 from './assets/cardapiommacaiteria/paleta/paleta2.webp';
import imgAgua from './assets/cardapiommacaiteria/bebidas/agua.webp';

const initialProducts = [
  { id: 1, category: 'maispedidos', title: 'Açaí Tradicional 300ml', description: 'Banana fatiada, leite em pó, granola crocante e mel orgânico.', price: 'R$ 16,00', image: imgMaisPedido300 },
  { id: 2, category: 'maispedidos', title: 'Açaí Classic 400ml', description: 'Morango fresco, leite condensado, leite em pó e paçoca premium.', price: 'R$ 20,00', image: imgMaisPedido400 },
  { id: 3, category: 'maispedidos', title: 'Açaí Monstro 1 Litro', description: 'O gigante da casa! Escolha até 5 acompanhamentos direto no balcão.', price: 'R$ 42,00', image: imgMaisPedido1L },
  { id: 4, category: 'maispedidos', title: 'Açaí Duplo Especial 400ml', description: 'Duas camadas generosas de açaí puro intercaladas com creme de ninho.', price: 'R$ 24,00', image: imgMaisPedidoDuplo400 },
  { id: 5, category: 'monteseuacai', title: 'Monte seu Açaí 250ml', description: 'Tamanho perfeito para um lanche rápido. Inclui 2 acompanhamentos grátis.', price: 'R$ 13,00', image: imgMonte250 },
  { id: 6, category: 'monteseuacai', title: 'Monte seu Açaí 300ml', description: 'A medida exata para o seu pré-treino com até 3 acompanhamentos à escolha.', price: 'R$ 16,00', image: imgMonte300 },
  { id: 7, category: 'monteseuacai', title: 'Monte seu Açaí 500ml', description: 'Nosso campeão de vendas! Monte do seu jeito com até 4 complementos.', price: 'R$ 25,00', image: imgMonte500 },
  { id: 8, category: 'monteseuacai', title: 'Monte seu Açaí 770ml', description: 'Para os verdadeiros amantes de açaí. Espaço de sobra para caprichar nos cremes.', price: 'R$ 34,00', image: imgMonte770 },
  { id: 9, category: 'combos', title: 'Combo Duplo Casal 250ml', description: 'Leve dois copos de 250ml completíssimos com leite em pó e calda de morango.', price: 'R$ 22,00', image: imgComboCasal250 },
  { id: 10, category: 'combos', title: 'Combo Duplo Turbo 300ml', description: 'Dois copos de 300ml com paçoca, banana e leite condensado para repor as energias.', price: 'R$ 28,00', image: imgComboTurbo300 },
  { id: 11, category: 'combos', title: 'Combo Super Duplo 400ml', description: 'Dois copos grandes de 400ml recheados com os melhores complementos da casa.', price: 'R$ 36,00', image: imgComboSuper400 },
  { id: 12, category: 'promocoes', title: 'Promoção do Dia 01', description: 'Açaí com mousse de maracujá caseiro e gotas de chocolate meio amargo.', price: 'R$ 15,00', image: imgPromo1 },
  { id: 13, category: 'promocoes', title: 'Combo Universitário', description: 'Açaí de 400ml + porção extra de leite em pó por um preço especial.', price: 'R$ 18,00', image: imgPromo2 },
  { id: 14, category: 'promocoes', title: 'Trio Família', description: 'Três copos de açaí tradicionais montados para curtir o final de semana.', price: 'R$ 45,00', image: imgPromo3 },
  { id: 15, category: 'extras', title: 'Paleta Recheada Morango', description: 'Paleta artesanal de morango com recheio cremoso de leite condensado.', price: 'R$ 9,50', image: imgPaleta1 },
  { id: 16, category: 'extras', title: 'Paleta Ninho com Nutella', description: 'Gelato artesanal de leite ninho com recheio generoso de Nutella pura.', price: 'R$ 11,00', image: imgPaleta2 },
  { id: 17, category: 'extras', title: 'Água Mineral 500ml', description: 'Água mineral sem gás bem gelada para refrescar.', price: 'R$ 3,50', image: imgAgua },
];

const initialCategories = [
  { id: 'maispedidos', label: 'Mais Pedidos' },
  { id: 'monteseuacai', label: 'Monte seu Açaí' },
  { id: 'combos', label: 'Combos Duplos' },
  { id: 'promocoes', label: 'Promoções' },
  { id: 'extras', label: 'Paletas & Bebidas' },
];

function App() {
  const [menuData, setMenuData] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  
  // Controle de funcionamento ('auto' | 'open' | 'closed')
  const [storeOverride, setStoreOverride] = useState('auto');
  const [isOpenStatus, setIsOpenStatus] = useState(false);

  // Calcula se o estabelecimento está aberto conforme a especificação de horário
  useEffect(() => {
    if (storeOverride === 'open') {
      setIsOpenStatus(true);
    } else if (storeOverride === 'closed') {
      setIsOpenStatus(false);
    } else {
      const checkAutomaticTime = () => {
        const now = new Date();
        const day = now.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
        const hour = now.getHours();

        const isWorkingDay = day !== 1; // Terça a Domingo (Diferente de Segunda)
        const isWorkingHour = hour >= 17 && hour < 23; // 17h às 23h

        setIsOpenStatus(isWorkingDay && isWorkingHour);
      };

      checkAutomaticTime();
      const interval = setInterval(checkAutomaticTime, 60000); // Atualiza a cada minuto
      return () => clearInterval(interval);
    }
  }, [storeOverride]);

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true); 
  };

  const handleRemoveItem = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  // Funções CRUD do Administrador
  const handleAddProduct = (newProd) => setMenuData([...menuData, newProd]);
  const handleEditProduct = (editedProd) => setMenuData(menuData.map(p => p.id === editedProd.id ? editedProd : p));
  const handleDeleteProduct = (id) => setMenuData(menuData.filter(p => p.id !== id));
  const handleAddCategory = (newCat) => setCategories([...categories, newCat]);

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-gray-100 flex flex-col relative">
      <Header 
        cartCount={cartItems.length} 
        onOpenCart={() => setIsCartOpen(true)} 
        isAdminView={isAdminView}
        onToggleAdminView={setIsAdminView}
        isOpenStatus={isOpenStatus}
      />
      
      <main className="flex-grow">
        {isAdminView ? (
          <AdminDashboard 
            menuData={menuData}
            categories={categories}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            onAddCategory={handleAddCategory}
            storeOverride={storeOverride}
            onSetStoreOverride={setStoreOverride}
          />
        ) : (
          <>
            <HeroSection isOpenStatus={isOpenStatus} />
            <FeaturesSection />
            <AboutSection />
            <MenuSection menuData={menuData} categories={categories} onAddToCart={handleAddToCart} />
            <TestimonialsSection />
            <CtaSection />
          </>
        )}
      </main>
      
      <footer className="mt-auto">
        <Footer />
      </footer>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;