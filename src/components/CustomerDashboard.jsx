import React from 'react';

const CustomerDashboard = ({ orders, currentUser }) => {
  const myOrders = orders.filter(o => o.customerEmail === currentUser.email);

  return (
    <section className="w-full max-w-[1024px] mx-auto px-5 py-12 min-h-[60vh] font-['Barlow']">
      <div className="mb-8">
        <h1 className="text-4xl font-black font-['Barlow_Condensed'] uppercase text-gray-100">Meus Pedidos</h1>
        <p className="text-zinc-400 text-sm">Acompanhe o status do seu açaí em tempo real.</p>
      </div>

      {myOrders.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl text-center">
          <p className="text-zinc-400">Você ainda não tem nenhum pedido ativo.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myOrders.map(order => (
            <div key={order.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-fuchsia-500 font-mono text-xs uppercase font-bold">{order.id}</span>
                <p className="text-gray-100 font-bold text-lg mt-1">{order.items.length} itens no pedido</p>
                <p className="text-zinc-400 text-sm">{order.date} · R$ {order.total.toFixed(2).replace('.', ',')}</p>
              </div>
              
              <div className={`px-4 py-2 rounded-lg font-bold uppercase font-['Barlow_Condensed'] text-lg border ${
                order.status === 'Pronto' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
              }`}>
                {order.status === 'Pronto' ? '🟢 Pedido Pronto' : '🟡 Em Preparo'}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CustomerDashboard;
