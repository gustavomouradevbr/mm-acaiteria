import React, { useState } from 'react';

const AdminDashboard = ({
  menuData, categories, onAddProduct, onEditProduct, onDeleteProduct, onAddCategory,
  storeOverride, onSetStoreOverride, isOpenStatus,
  customizationLimits, setCustomizationLimits,
  ingredientGroups, setIngredientGroups,
  orders, setOrders,
}) => {
  const [activeTab, setActiveTab] = useState('orders');

  // Produto
  const [editingId, setEditingId] = useState(null);
  const [productForm, setProductForm] = useState({ title: '', description: '', price: '', category: 'maispedidos', image: '', limitRule: 'none' });
  const [newCatName, setNewCatName] = useState('');
  const [newCatId, setNewCatId] = useState('');

  // Regras e Grupos
  const [newRule, setNewRule] = useState({ id: '', label: '' });
  const [newGroup, setNewGroup] = useState({ id: '', name: '' });
  const [newItemInput, setNewItemInput] = useState({});

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProductForm({ ...productForm, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!productForm.title || !productForm.price) return;
    if (editingId) {
      onEditProduct({ id: editingId, ...productForm });
      setEditingId(null);
    } else {
      onAddProduct({ id: Date.now(), ...productForm });
    }
    setProductForm({ title: '', description: '', price: '', category: 'maispedidos', image: '', limitRule: 'none' });
  };

  // CORRIGIDO: startEdit estava faltando no código da IA
  const startEdit = (product) => {
    setEditingId(product.id);
    setProductForm({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
      limitRule: product.limitRule || 'none',
    });
    setActiveTab('products');
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCatName || !newCatId) return;
    onAddCategory({ id: newCatId.toLowerCase().trim(), label: newCatName });
    setNewCatName(''); setNewCatId('');
  };

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newRule.id) return;
    const initialLimitsForGroups = {};
    ingredientGroups.forEach(g => { initialLimitsForGroups[g.id] = 0; });
    setCustomizationLimits([...customizationLimits, { id: newRule.id, label: newRule.label || newRule.id, limits: initialLimitsForGroups }]);
    setNewRule({ id: '', label: '' });
  };

  const handleAddGroup = (e) => {
    e.preventDefault();
    if (!newGroup.id) return;
    setIngredientGroups([...ingredientGroups, { id: newGroup.id, name: newGroup.name || newGroup.id, items: [] }]);
    setCustomizationLimits(customizationLimits.map(rule => ({
      ...rule,
      limits: { ...rule.limits, [newGroup.id]: 0 },
    })));
    setNewGroup({ id: '', name: '' });
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  return (
    <section className="w-full max-w-[1200px] px-5 py-12 mx-auto flex-grow font-['Barlow']">
      {/* Header do Admin */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="text-fuchsia-500 text-xs font-mono uppercase tracking-wider">Painel Administrativo</span>
          <h1 className="text-4xl font-black font-['Barlow_Condensed'] uppercase text-gray-100">Gerenciador da Loja</h1>
        </div>
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center gap-3">
            <span className="text-zinc-400 text-sm font-semibold uppercase tracking-wider">A loja no momento está:</span>
            <span className={`px-4 py-1.5 rounded-md text-sm font-black font-['Barlow_Condensed'] uppercase tracking-wider ${isOpenStatus ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
              {isOpenStatus ? '🟢 Aberta' : '🔴 Fechada'}
            </span>
          </div>
          <div className="flex gap-2 p-1.5 bg-zinc-950 rounded-lg border border-zinc-800">
            <button onClick={() => onSetStoreOverride('auto')} className={`px-3 py-1.5 text-xs rounded-md uppercase font-bold transition-all ${storeOverride === 'auto' ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>🔄 Automático</button>
            <button onClick={() => onSetStoreOverride('open')} className={`px-3 py-1.5 text-xs rounded-md uppercase font-bold transition-all ${storeOverride === 'open' ? 'bg-green-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>Forçar Aberto</button>
            <button onClick={() => onSetStoreOverride('closed')} className={`px-3 py-1.5 text-xs rounded-md uppercase font-bold transition-all ${storeOverride === 'closed' ? 'bg-red-600 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>Forçar Fechado</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 border-b border-zinc-800 pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'orders', label: '🛵 Pedidos em Tempo Real' },
          { id: 'products', label: '🍔 Cardápio' },
          { id: 'categories', label: '📁 Categorias' },
          { id: 'limits', label: '⚖️ Regras de Customização' },
          { id: 'ingredients', label: '🍯 Ingredientes Extras' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap pb-2 text-lg font-bold font-['Barlow_Condensed'] uppercase ${activeTab === tab.id ? 'text-lime-500 border-b-2 border-lime-500' : 'text-zinc-500'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ABA: PEDIDOS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length === 0 ? (
            <p className="text-zinc-500">Nenhum pedido recebido ainda.</p>
          ) : (
            orders.map(order => (
              <div key={order.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-fuchsia-500 font-mono text-xs font-bold">{order.id} — {order.customerName}</span>
                  <p className="text-gray-100 font-bold mt-1">R$ {order.total.toFixed(2).replace('.', ',')} · {order.items.length} itens</p>
                  <div className="text-xs text-zinc-500 mt-2">{order.items.map(i => i.title).join(', ')}</div>
                </div>
                <div>
                  {order.status === 'Em Preparo' ? (
                    <button onClick={() => handleUpdateOrderStatus(order.id, 'Pronto')} className="px-6 py-3 bg-lime-500 text-zinc-950 font-bold uppercase rounded-lg">Marcar como Pronto</button>
                  ) : (
                    <span className="px-4 py-2 bg-green-900/30 text-green-500 border border-green-500/50 rounded-lg font-bold uppercase text-sm">Aguardando Retirada</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ABA: PRODUTOS */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleProductSubmit} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 h-fit">
            <h3 className="text-xl font-black font-['Barlow_Condensed'] uppercase text-gray-100 mb-4">{editingId ? '📝 Editar Produto' : '✨ Novo Produto'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-2 uppercase">Imagem</label>
                <div className="flex items-center gap-4">
                  {productForm.image ? (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-lime-500 flex-shrink-0">
                      <img src={productForm.image} alt="Preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setProductForm({...productForm, image: ''})} className="absolute top-1 right-1 bg-black/60 rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-500 text-white">×</button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-xl border border-dashed border-zinc-600 bg-zinc-950 flex items-center justify-center flex-shrink-0"><span className="text-2xl opacity-40">📷</span></div>
                  )}
                  <label className="flex-grow flex flex-col items-center justify-center gap-1 py-3 px-4 border border-dashed border-zinc-700 rounded-xl cursor-pointer hover:border-lime-500 hover:bg-lime-500/5 transition-all text-center">
                    <span className="text-xs text-zinc-400">Clique para enviar</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>
              <div><label className="block text-xs text-zinc-400 mb-1 uppercase">Título</label><input type="text" value={productForm.title} onChange={e => setProductForm({...productForm, title: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm outline-none" /></div>
              <div><label className="block text-xs text-zinc-400 mb-1 uppercase">Descrição</label><textarea value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} rows={2} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm outline-none resize-none" /></div>
              <div><label className="block text-xs text-zinc-400 mb-1 uppercase">Preço (ex: R$ 16,00)</label><input type="text" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm outline-none" /></div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1 uppercase">Categoria</label>
                <select value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm outline-none">
                  {categories.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-fuchsia-400 font-bold mb-1 uppercase">Regra de Montagem</label>
                <select value={productForm.limitRule} onChange={e => setProductForm({...productForm, limitRule: e.target.value})} className="w-full bg-zinc-950 border border-fuchsia-700/50 rounded-lg p-2.5 text-sm outline-none">
                  <option value="none">🚫 Venda Direta (Sem Personalização)</option>
                  {customizationLimits.map(l => <option key={l.id} value={l.id}>{l.label}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full py-3 bg-lime-500 text-zinc-950 font-bold font-['Barlow_Condensed'] uppercase rounded-xl">{editingId ? 'Salvar Alterações' : 'Adicionar Produto'}</button>
              {editingId && <button type="button" onClick={() => { setEditingId(null); setProductForm({ title: '', description: '', price: '', category: 'maispedidos', image: '', limitRule: 'none' }); }} className="w-full py-2 text-zinc-400 text-sm hover:text-white">Cancelar edição</button>}
            </div>
          </form>

          <div className="lg:col-span-2 space-y-3 overflow-y-auto max-h-[600px]">
            {menuData.map(product => (
              <div key={product.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-gray-100">{product.title}</h4>
                  <span className="text-lime-500 text-sm">{product.price}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(product)} className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-bold uppercase">Editar</button>
                  <button onClick={() => onDeleteProduct(product.id)} className="px-3 py-1.5 bg-red-900/30 hover:bg-red-900/60 text-red-400 rounded-lg text-xs font-bold uppercase">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABA: CATEGORIAS */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleCategorySubmit} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 h-fit">
            <h3 className="text-xl font-black font-['Barlow_Condensed'] uppercase text-gray-100 mb-4">✨ Criar Nova Categoria</h3>
            <div className="space-y-4">
              <div><label className="block text-xs text-zinc-400 mb-1 uppercase">Nome</label><input type="text" value={newCatName} onChange={e => setNewCatName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm outline-none" placeholder="Ex: Adicionais" /></div>
              <div><label className="block text-xs text-zinc-400 mb-1 uppercase">ID</label><input type="text" value={newCatId} onChange={e => setNewCatId(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm outline-none" placeholder="Ex: adicionais" /></div>
              <button type="submit" className="w-full py-3 bg-lime-500 text-zinc-950 font-bold font-['Barlow_Condensed'] uppercase rounded-xl">Cadastrar Categoria</button>
            </div>
          </form>
          <div className="space-y-3">
            <h3 className="text-lg font-black font-['Barlow_Condensed'] uppercase text-zinc-400 mb-2">Categorias Ativas</h3>
            {categories.map(cat => (
              <div key={cat.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex justify-between items-center">
                <span className="text-gray-100 font-semibold">{cat.label}</span>
                <span className="text-zinc-500 text-xs font-mono">ID: {cat.id}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABA: REGRAS DE CUSTOMIZAÇÃO */}
      {activeTab === 'limits' && (
        <div className="space-y-8">
          <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 overflow-x-auto">
            <h3 className="text-xl font-black font-['Barlow_Condensed'] uppercase text-gray-100 mb-6">Tabela de Limites por Regra</h3>
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-zinc-800 text-fuchsia-500 text-xs font-mono uppercase tracking-wider">
                  <th className="pb-3 pr-4">Regra</th>
                  {ingredientGroups.map(g => <th key={g.id} className="pb-3 px-4 text-center">{g.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {customizationLimits.map((rule, index) => (
                  <tr key={rule.id} className="border-b border-zinc-800/50 hover:bg-white/[0.02]">
                    <td className="py-4 pr-4 font-bold text-gray-200">{rule.label}</td>
                    {ingredientGroups.map(g => (
                      <td key={g.id} className="py-4 px-4 text-center">
                        <input
                          type="number" min="0"
                          value={rule.limits[g.id] ?? 0}
                          onChange={(e) => {
                            const updated = customizationLimits.map((r, i) =>
                              i === index ? { ...r, limits: { ...r.limits, [g.id]: parseInt(e.target.value) || 0 } } : r
                            );
                            setCustomizationLimits(updated);
                          }}
                          className="w-16 bg-zinc-950 border border-zinc-700 rounded-md p-1.5 text-center text-sm text-lime-500 font-bold"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <form onSubmit={handleAddRule} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-grow"><label className="block text-xs text-zinc-400 mb-1">ID da Regra (ex: 800ml)</label><input value={newRule.id} onChange={e => setNewRule({...newRule, id: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm outline-none" /></div>
            <div className="flex-grow"><label className="block text-xs text-zinc-400 mb-1">Nome de Exibição (ex: Regra 800ml)</label><input value={newRule.label} onChange={e => setNewRule({...newRule, label: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm outline-none" /></div>
            <button type="submit" className="px-6 py-2.5 bg-lime-500 text-zinc-950 font-bold rounded-lg uppercase">Criar Regra</button>
          </form>
        </div>
      )}

      {/* ABA: INGREDIENTES */}
      {activeTab === 'ingredients' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ingredientGroups.map(group => (
              <div key={group.id} className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 flex flex-col h-[400px]">
                <h4 className="font-bold font-['Barlow_Condensed'] text-xl uppercase mb-4 text-gray-100">{group.name}</h4>
                <ul className="space-y-2 mb-4 overflow-y-auto flex-grow custom-scrollbar">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex justify-between items-center bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-sm font-semibold text-zinc-300">
                      {item}
                      <button onClick={() => setIngredientGroups(ingredientGroups.map(g => g.id === group.id ? {...g, items: g.items.filter((_, idx) => idx !== i)} : g))} className="text-red-500 hover:bg-red-500/20 px-2 rounded font-bold">X</button>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2 pt-3 border-t border-zinc-800">
                  <input
                    value={newItemInput[group.id] || ''}
                    onChange={e => setNewItemInput({...newItemInput, [group.id]: e.target.value})}
                    placeholder="Novo item..."
                    className="flex-grow bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm outline-none"
                  />
                  <button onClick={() => {
                    if (newItemInput[group.id]?.trim()) {
                      setIngredientGroups(ingredientGroups.map(g => g.id === group.id ? {...g, items: [...g.items, newItemInput[group.id].trim()]} : g));
                      setNewItemInput({...newItemInput, [group.id]: ''});
                    }
                  }} className="bg-lime-500 text-zinc-950 px-4 rounded-lg font-black">+</button>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddGroup} className="bg-zinc-900 p-6 rounded-2xl border border-fuchsia-700/30 flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-grow"><label className="block text-xs text-fuchsia-400 mb-1 font-bold">ID do Novo Grupo (ex: caldas)</label><input value={newGroup.id} onChange={e => setNewGroup({...newGroup, id: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm outline-none" /></div>
            <div className="flex-grow"><label className="block text-xs text-fuchsia-400 mb-1 font-bold">Nome de Exibição (ex: 🍯 Caldas)</label><input value={newGroup.name} onChange={e => setNewGroup({...newGroup, name: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm outline-none" /></div>
            <button type="submit" className="px-6 py-2.5 bg-fuchsia-700 text-white font-bold rounded-lg uppercase">Adicionar Novo Card</button>
          </form>
        </div>
      )}
    </section>
  );
};

export default AdminDashboard;
