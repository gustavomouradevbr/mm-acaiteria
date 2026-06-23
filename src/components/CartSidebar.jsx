import React from 'react';

const CartSidebar = ({ isOpen, onClose, cartItems, onRemoveItem, onCheckout, ingredientGroups, currentUser }) => {
  const total = cartItems.reduce((acc, item) => {
    return acc + parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
  }, 0);

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    // Captura os itens antes de o onCheckout limpar o carrinho
    const itemsSnapshot = [...cartItems];
    const order = onCheckout();

    let msg = `Olá ${currentUser?.name || 'Cliente'}, seu pedido foi confirmado! 🥰\n`;
    msg += `Você pode acompanhar o progresso logando no site.\n\n`;
    msg += `Pedido: ${order.id}\n---------------------------------------\n Produtos \n\n`;

    itemsSnapshot.forEach(item => {
      msg += `${item.price} 1x ${item.title.toUpperCase()}\n`;
      if (item.customizations) {
        Object.entries(item.customizations).forEach(([groupId, items]) => {
          if (items.length > 0) {
            const groupName = (ingredientGroups.find(g => g.id === groupId)?.name || groupId)
              .replace(/[^\w\sÀ-ÿ]/g, '').trim();
            msg += `   ${groupName.toUpperCase()}\n`;
            items.forEach(i => msg += `      1x ${i.toUpperCase()}\n`);
          }
        });
      }
      msg += `\n`;
    });

    msg += `---------------------------------------\n`;
    msg += `R$ ${total.toFixed(2).replace('.', ',')} Total\n`;
    msg += `Pedido para retirada\n`;

    const phone = '5581995212578';
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
                    {Object.entries(item.customizations).map(([groupId, items]) => {
                      if (!items || items.length === 0) return null;
                      const group = ingredientGroups.find(g => g.id === groupId);
                      return (
                        <div key={groupId}>{group?.name || groupId}: {items.join(', ')}</div>
                      );
                    })}
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
