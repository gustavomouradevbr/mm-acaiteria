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
import CustomizeModal from './components/CustomizeModal';
import AuthScreen from './components/AuthScreen';
import CustomerDashboard from './components/CustomerDashboard';

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
  { id: 1, category: 'maispedidos', title: 'Açaí Tradicional 300ml', description: 'Banana fatiada, leite em pó, granola crocante e mel orgânico.', price: 'R$ 16,00', image: imgMaisPedido300, limitRule: '300ml' },
  { id: 2, category: 'maispedidos', title: 'Açaí Classic 400ml', description: 'Morango fresco, leite condensado, leite em pó e paçoca premium.', price: 'R$ 20,00', image: imgMaisPedido400, limitRule: '400ml' },
  { id: 3, category: 'maispedidos', title: 'Açaí Monstro 1 Litro', description: 'O gigante da casa! Escolha até 5 acompanhamentos direto no balcão.', price: 'R$ 42,00', image: imgMaisPedido1L, limitRule: '1l' },
  { id: 4, category: 'maispedidos', title: 'Açaí Duplo Especial 400ml', description: 'Duas camadas generosas de açaí puro intercaladas com creme de ninho.', price: 'R$ 24,00', image: imgMaisPedidoDuplo400, limitRule: '400ml' },
  { id: 5, category: 'monteseuacai', title: 'Monte seu Açaí 250ml', description: 'Personalize do seu jeito com acompanhamentos e caldas tradicionais.', price: 'R$ 13,00', image: imgMonte250, limitRule: '250ml' },
  { id: 6, category: 'monteseuacai', title: 'Monte seu Açaí 300ml', description: 'Personalize do seu jeito com acompanhamentos e caldas tradicionais.', price: 'R$ 16,00', image: imgMonte300, limitRule: '300ml' },
  { id: 7, category: 'monteseuacai', title: 'Monte seu Açaí 500ml', description: 'Personalize do seu jeito com acompanhamentos e caldas tradicionais.', price: 'R$ 25,00', image: imgMonte500, limitRule: '500ml' },
  { id: 8, category: 'monteseuacai', title: 'Monte seu Açaí 770ml', description: 'Personalize do seu jeito com acompanhamentos e caldas tradicionais.', price: 'R$ 34,00', image: imgMonte770, limitRule: '770ml' },
  { id: 18, category: 'monteseuacai', title: 'Monte seu Açaí 1 Litro', description: 'O senhor dos açaís. Monte com o máximo de cremes, frutas e acompanhamentos.', price: 'R$ 40,00', image: imgMaisPedido1L, limitRule: '1l' },
  { id: 9, category: 'combos', title: 'Combo Duplo Casal 250ml', description: 'Leve dois copos de 250ml completíssimos com leite em pó e calda de morango.', price: 'R$ 22,00', image: imgComboCasal250, limitRule: '250ml' },
  { id: 10, category: 'combos', title: 'Combo Duplo Turbo 300ml', description: 'Dois copos de 300ml com paçoca, banana e leite condensado para repor as energias.', price: 'R$ 28,00', image: imgComboTurbo300, limitRule: '300ml' },
  { id: 11, category: 'combos', title: 'Combo Super Duplo 400ml', description: 'Dois copos grandes de 400ml recheados com os melhores complementos da casa.', price: 'R$ 36,00', image: imgComboSuper400, limitRule: '400ml' },
  { id: 12, category: 'promocoes', title: 'Promoção do Dia 01', description: 'Açaí com mousse de maracujá caseiro e gotas de chocolate meio amargo.', price: 'R$ 15,00', image: imgPromo1, limitRule: '300ml' },
  { id: 13, category: 'promocoes', title: 'Combo Universitário', description: 'Açaí de 400ml + porção extra de leite em pó por um preço especial.', price: 'R$ 18,00', image: imgPromo2, limitRule: '400ml' },
  { id: 14, category: 'promocoes', title: 'Trio Família', description: 'Três copos de açaí tradicionais montados para curtir o final de semana.', price: 'R$ 45,00', image: imgPromo3, limitRule: '300ml' },
  { id: 15, category: 'extras', title: 'Paleta Recheada Morango', description: 'Paleta artesanal de morango com recheio cremoso de leite condensado.', price: 'R$ 9,50', image: imgPaleta1, limitRule: 'none' },
  { id: 16, category: 'extras', title: 'Paleta Ninho com Nutella', description: 'Gelato artesanal de leite ninho com recheio generoso de Nutella pura.', price: 'R$ 11,00', image: imgPaleta2, limitRule: 'none' },
  { id: 17, category: 'extras', title: 'Água Mineral 500ml', description: 'Água mineral sem gás bem gelada para refrescar.', price: 'R$ 3,50', image: imgAgua, limitRule: 'none' },
];

const initialCategories = [
  { id: 'maispedidos', label: 'Mais Pedidos' },
  { id: 'monteseuacai', label: 'Monte seu Açaí' },
  { id: 'combos', label: 'Combos Duplos' },
  { id: 'promocoes', label: 'Promoções' },
  { id: 'extras', label: 'Paletas & Bebidas' },
];

const initialIngredientGroups = [
  { id: 'creams', name: '🍦 Cremes', items: ['Leite Ninho', 'Nutella Pura', 'Ovomaltine', 'Mousse de Maracujá'] },
  { id: 'fruits', name: '🍓 Frutas', items: ['Morango Fresco', 'Banana Fatiada', 'Kiwi', 'Manga'] },
  { id: 'complements', name: '🥜 Complementos', items: ['Leite em Pó', 'Granola Crocante', 'Paçoca Premium', 'Canudinho'] },
];

const initialLimits = [
  { id: '250ml', label: 'Regra 250ml', limits: { creams: 1, fruits: 1, complements: 2 } },
  { id: '300ml', label: 'Regra 300ml', limits: { creams: 3, fruits: 2, complements: 3 } },
  { id: '400ml', label: 'Regra 400ml', limits: { creams: 3, fruits: 2, complements: 3 } },
  { id: '500ml', label: 'Regra 500ml', limits: { creams: 3, fruits: 3, complements: 4 } },
  { id: '600ml', label: 'Regra 600ml', limits: { creams: 3, fruits: 3, complements: 4 } },
  { id: '770ml', label: 'Regra 770ml', limits: { creams: 2, fruits: 3, complements: 5 } },
  { id: '1l',   label: 'Regra 1 Litro', limits: { creams: 2, fruits: 3, complements: 5 } },
];

function App() {
  const [currentView, setCurrentView] = useState('store'); // 'store' | 'login' | 'admin' | 'customer'
  const [currentUser, setCurrentUser] = useState(null);

  const [menuData, setMenuData] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);
  const [ingredientGroups, setIngredientGroups] = useState(initialIngredientGroups);
  const [customizationLimits, setCustomizationLimits] = useState(initialLimits);
  const [orders, setOrders] = useState([]);

  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [storeOverride, setStoreOverride] = useState('auto');
  const [isOpenStatus, setIsOpenStatus] = useState(false);

  const [customizingProduct, setCustomizingProduct] = useState(null);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);

  useEffect(() => {
    if (storeOverride === 'open') {
      setIsOpenStatus(true);
    } else if (storeOverride === 'closed') {
      setIsOpenStatus(false);
    } else {
      const checkAutomaticTime = () => {
        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        setIsOpenStatus(day !== 1 && hour >= 17 && hour < 23);
      };
      checkAutomaticTime();
      const interval = setInterval(checkAutomaticTime, 60000);
      return () => clearInterval(interval);
    }
  }, [storeOverride]);

  const scrollToMenu = () => document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' });

  const handleAddToCartIntent = (product) => {
    if (product.limitRule && product.limitRule !== 'none') {
      setCustomizingProduct(product);
      setIsCustomizeModalOpen(true);
    } else {
      setCartItems([...cartItems, product]);
      setIsCartOpen(true);
    }
  };

  const handleConfirmCustomization = (customizedProduct) => {
    setCartItems([...cartItems, customizedProduct]);
    setIsCartOpen(true);
  };

  const handleCheckoutOrder = () => {
    const newOrder = {
      id: 'B-' + Math.floor(Math.random() * 9000 + 1000),
      items: [...cartItems],
      total: cartItems.reduce((acc, item) => acc + parseFloat(item.price.replace('R$ ', '').replace(',', '.')), 0),
      status: 'Em Preparo',
      customerEmail: currentUser?.email || 'visitante@loja.com',
      customerName: currentUser?.name || 'Visitante',
      date: new Date().toLocaleTimeString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setIsCartOpen(false);
    return newOrder;
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setCurrentView(user.role === 'admin' ? 'admin' : 'store');
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-gray-100 flex flex-col relative">
      <Header
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        currentUser={currentUser}
        currentView={currentView}
        onNavigate={setCurrentView}
        onLogout={() => { setCurrentUser(null); setCurrentView('store'); }}
      />

      <main className="flex-grow">
        {currentView === 'login' && (
  <AuthScreen onLogin={handleLogin} onNavigate={setCurrentView} />)}
        {currentView === 'customer' && <CustomerDashboard orders={orders} currentUser={currentUser} />}
        {currentView === 'admin' && (
          <AdminDashboard
            menuData={menuData}
            categories={categories}
            onAddProduct={(p) => setMenuData([...menuData, p])}
            onEditProduct={(p) => setMenuData(menuData.map(m => m.id === p.id ? p : m))}
            onDeleteProduct={(id) => setMenuData(menuData.filter(m => m.id !== id))}
            onAddCategory={(c) => setCategories([...categories, c])}
            storeOverride={storeOverride}
            onSetStoreOverride={setStoreOverride}
            isOpenStatus={isOpenStatus}
            customizationLimits={customizationLimits}
            setCustomizationLimits={setCustomizationLimits}
            ingredientGroups={ingredientGroups}
            setIngredientGroups={setIngredientGroups}
            orders={orders}
            setOrders={setOrders}
          />
        )}
        {currentView === 'store' && (
          <>
            <HeroSection isOpenStatus={isOpenStatus} onScrollToMenu={scrollToMenu} />
            <FeaturesSection />
            <AboutSection />
            <MenuSection menuData={menuData} categories={categories} onAddToCart={handleAddToCartIntent} />
            <TestimonialsSection />
            <CtaSection onScrollToMenu={scrollToMenu} />
          </>
        )}
      </main>

      <footer className="mt-auto"><Footer /></footer>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={(idx) => setCartItems(cartItems.filter((_, i) => i !== idx))}
        onCheckout={handleCheckoutOrder}
        ingredientGroups={ingredientGroups}
        currentUser={currentUser}
      />

      <CustomizeModal
        isOpen={isCustomizeModalOpen}
        onClose={() => setIsCustomizeModalOpen(false)}
        product={customizingProduct}
        onConfirm={handleConfirmCustomization}
        limitsData={customizationLimits}
        ingredientGroups={ingredientGroups}
      />
    </div>
  );
}

export default App;
