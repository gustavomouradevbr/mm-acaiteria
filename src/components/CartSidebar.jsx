import React from 'react';

const CartSidebar = ({ isOpen, onClose, cartItems, onRemoveItem }) => {
  const total = cartItems.reduce((acc, item) => {
    const priceNumber = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
    return acc + priceNumber;
  }, 0);

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    const pedidoID = Math.floor(Math.random() * 9000) + 1000;
    
    let msg = `Olá Gustavo, seu pedido foi confirmado e está sendo preparado 🥰\n`;
    msg += `Você pode acompanhar o progresso do seu pedido através do botão que será enviado 📱\n\n`;
    msg += `Pedido: B-${pedidoID}\n`;
    msg += `---------------------------------------\n`;
    msg += ` Produtos \n\n`;

    cartItems.forEach(item => {
      msg += `${item.price} 1x ${item.title.toUpperCase()}\n`;
      
      if (item.customizations) {
        const { creams, fruits, complements } = item.customizations;
        
        if (complements && complements.length > 0) {
          msg += `   COMPLEMENTOS \n`;
          complements.forEach(c => msg += `      1x ${c.toUpperCase()}\n`);
        }
        if (creams && creams.length > 0) {
          msg += `   CREMES \n`;
          creams.forEach(cr => msg += `      1x ${cr.toUpperCase()}\n`);
        }
        if (fruits && fruits.length > 0) {
          msg += `   FRUTAS \n`;
          fruits.forEach(f => msg += `      1x ${f.toUpperCase()}\n`);
        }
      }
      msg += `\n`;
    });

    msg += `---------------------------------------\n\n`;
    msg += `R$ ${total.toFixed(2).replace('.', ',')} Total dos produtos\n`;
    msg += `R$ 0,00 Taxa de entrega\n`;
    msg += `R$ ${total.toFixed(2).replace('.', ',')} Total\n`;
    msg += `Forma de pagamento: Dinheiro\n`;
    msg += `Valor em dinheiro: R$ ${total.toFixed(2).replace('.', ',')}\n`;
    msg += `Troco: R$ 0,00\n`;
    msg += `O seu pedido ainda não foi pago.\n\n`;
    msg += `---------------------------------------\n\n`;
    msg += `Nome: Gustavo Bezerra De Moura\n\n`;
    msg += `Pedido para retirada\n`;

    const phone = "5581995212578"; 
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-md bg-zinc-950 border-l border-fuchsia-700/20 h-full shadow-[0px_0px_60px_0px_rgba(151,80,175,0.3)] flex flex-col">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="text-2xl font-black font-['Barlow_Condensed'] uppercase text-gray-100">🛒 Seu Pedido</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-fuchsia-700 text-3xl">&times;</button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-4">
          {cartItems.length === 0 ? (
            <p className="text-zinc-400 text-center mt-10 font-['Barlow']">Seu carrinho está vazio.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={index} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-100 font-semibold font-['Barlow']">{item.title}</p>
                    <p className="text-lime-500 font-['Share_Tech_Mono'] text-sm">{item.price}</p>
                  </div>
                  <button onClick={() => onRemoveItem(index)} className="text-zinc-500 hover:text-red-500 font-black px-2">X</button>
                </div>
                
                {item.customizations && (
                  <div className="text-[11px] text-zinc-500 font-mono pl-2 border-l border-fuchsia-700/40 space-y-1">
                    {item.customizations.creams.length > 0 && <div>🍦 {item.customizations.creams.join(', ')}</div>}
                    {item.customizations.fruits.length > 0 && <div>🍓 {item.customizations.fruits.join(', ')}</div>}
                    {item.customizations.complements.length > 0 && <div>🥜 {item.customizations.complements.join(', ')}</div>}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-zinc-800 bg-zinc-900">
          <div className="flex justify-between items-center mb-6">
            <span className="text-zinc-400 font-['Barlow']">Total:</span>
            <span className="text-3xl font-black font-['Barlow_Condensed'] text-gray-100">
              R$ {total.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <button
            onClick={handleWhatsAppCheckout}
            disabled={cartItems.length === 0}
            className="w-full py-4 bg-gradient-to-r from-lime-500 to-green-600 rounded-full text-zinc-950 font-black font-['Barlow_Condensed'] uppercase text-xl hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            <span>📱</span> Finalizar no WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;