import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import AboutSection from './components/AboutSection';
import MenuSection from './components/MenuSection';
import TestimonialsSection from './components/TestimonialsSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Função para adicionar item e já abrir a gaveta do carrinho
  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true); 
  };

  const handleRemoveItem = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-gray-100 flex flex-col relative">
      {/* Passamos o número de itens e a função de abrir o carrinho pro Header */}
      <Header cartCount={cartItems.length} onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        {/* Passamos a função de adicionar pro Menu */}
        <MenuSection onAddToCart={handleAddToCart} />
        <TestimonialsSection />
        <CtaSection />
      </main>
      
      <Footer />

      {/* O nosso novo componente */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  )
}

export default App;