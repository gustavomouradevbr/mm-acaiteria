import React, { useState } from 'react';

const AdminDashboard = ({ 
  menuData, categories, onAddProduct, onEditProduct, onDeleteProduct, onAddCategory,
  storeOverride, onSetStoreOverride, isOpenStatus,
  customizationLimits, setCustomizationLimits // Recebendo os limites
}) => {
  const [activeTab, setActiveTab] = useState('products');
  const [editingId, setEditingId] = useState(null);
  const [productForm, setProductForm] = useState({ title: '', description: '', price: '', category: 'maispedidos', image: '' });
  const [newCatName, setNewCatName] = useState('');
  const [newCatId, setNewCatId] = useState('');

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
    setProductForm({ title: '', description: '', price: '', category: 'maispedidos', image: '' });
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setProductForm({ title: product.title, description: product.description, price: product.price, category: product.category, image: product.image });
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCatName || !newCatId) return;
    onAddCategory({ id: newCatId.toLowerCase().trim(), label: newCatName });
    setNewCatName('');
    setNewCatId('');
  };

  // Função para o Administrador atualizar as regras de limites na hora
  const handleUpdateLimit = (index, field, value) => {
    const newLimits = [...customizationLimits];
    newLimits[index][field] = value;
    setCustomizationLimits(newLimits);
  };

  return (
    <section className="w-full max-w-[1024px] px-5 py-12 mx-auto flex-grow font-['Barlow']">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-[0px_0px_40px_0px_rgba(151,80,175,0.1)]">
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
            <button onClick={() => onSetStoreOverride('open')} className={`px-3 py-1.5 text-xs rounded-md uppercase font-bold transition-all ${storeOverride === 'open' ? 'bg-green-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}>Forçar Aberto</button>
            <button onClick={() => onSetStoreOverride('closed')} className={`px-3 py-1.5 text-xs rounded-md uppercase font-bold transition-all ${storeOverride === 'closed' ? 'bg-red-600 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}>Forçar Fechado</button>
          </div>
        </div>
      </div>

      {/* Abas */}
      <div className="flex space-x-4 mb-8 border-b border-zinc-800 pb-2 overflow-x-auto no-scrollbar">
        <button onClick={() => setActiveTab('products')} className={`whitespace-nowrap pb-2 text-lg font-bold font-['Barlow_Condensed'] uppercase tracking-wide ${activeTab === 'products' ? 'text-lime-500 border-b-2 border-lime-500' : 'text-zinc-500'}`}>🍔 Produtos</button>
        <button onClick={() => setActiveTab('categories')} className={`whitespace-nowrap pb-2 text-lg font-bold font-['Barlow_Condensed'] uppercase tracking-wide ${activeTab === 'categories' ? 'text-lime-500 border-b-2 border-lime-500' : 'text-zinc-500'}`}>📁 Categorias</button>
        <button onClick={() => setActiveTab('limits')} className={`whitespace-nowrap pb-2 text-lg font-bold font-['Barlow_Condensed'] uppercase tracking-wide ${activeTab === 'limits' ? 'text-lime-500 border-b-2 border-lime-500' : 'text-zinc-500'}`}>⚖️ Regras de Limites</button>
      </div>

      {/* Aba de Produtos */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleProductSubmit} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 h-fit">
            <h3 className="text-xl font-black font-['Barlow_Condensed'] uppercase text-gray-100 mb-4">{editingId ? '📝 Editar Produto' : '✨ Novo Produto'}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-2 uppercase">Imagem do Produto</label>
                <div className="flex items-center gap-4">
                  {productForm.image ? (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-lime-500 flex-shrink-0">
                      <img src={productForm.image} alt="Preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setProductForm({...productForm, image: ''})} className="absolute top-1 right-1 bg-black/60 rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-500">×</button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-xl border border-dashed border-zinc-600 bg-zinc-950 flex items-center justify-center flex-shrink-0"><span className="text-2xl opacity-40">📷</span></div>
                  )}
                  <div className="flex-grow">
                    <input type="file" accept="image/*" onChange={handleImageUpload} id="file-upload" className="hidden"/>
                    <label htmlFor="file-upload" className="cursor-pointer inline-block px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold rounded-lg transition-colors border border-zinc-700">Escolher do Computador</label>
                  </div>
                </div>
              </div>
              <div><label className="block text-xs text-zinc-400 mb-1 uppercase">Título do Produto</label><input type="text" value={productForm.title} onChange={e => setProductForm({...productForm, title: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-gray-100 focus:border-fuchsia-700 outline-none"/></div>
              <div><label className="block text-xs text-zinc-400 mb-1 uppercase">Descrição / Ingredientes</label><textarea value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-gray-100 focus:border-fuchsia-700 outline-none h-20 resize-none"/></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-xs text-zinc-400 mb-1 uppercase">Preço (R$)</label><input type="text" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-gray-100 focus:border-fuchsia-700 outline-none"/></div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 uppercase">Categoria</label>
                  <select value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-gray-100 focus:border-fuchsia-700 outline-none">
                    {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.label}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-lime-500 hover:bg-lime-400 font-bold font-['Barlow_Condensed'] uppercase text-zinc-950 rounded-xl transition-colors">{editingId ? 'Salvar Alterações' : 'Adicionar ao Cardápio'}</button>
              {editingId && <button type="button" onClick={() => { setEditingId(null); setProductForm({ title: '', description: '', price: '', category: 'maispedidos', image: '' }); }} className="w-full py-2 bg-zinc-800 text-zinc-400 font-bold font-['Barlow_Condensed'] uppercase rounded-xl transition-colors">Cancelar Edição</button>}
            </div>
          </form>
          <div className="lg:col-span-2 space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {menuData.map(product => {
              const currentCat = categories.find(c => c.id === product.category);
              return (
                <div key={product.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <img src={product.image || 'https://images.unsplash.com/photo-1526424382096-74a93e105682?q=80&w=100'} alt="" className="w-14 h-14 object-cover rounded-lg border border-zinc-800" />
                    <div><h4 className="text-gray-100 font-bold leading-tight">{product.title}</h4><p className="text-zinc-500 text-xs font-mono mt-0.5 uppercase">{currentCat ? currentCat.label : product.category} · <span className="text-lime-500">{product.price}</span></p></div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(product)} className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-violet-300 text-xs rounded-lg font-bold uppercase">Editar</button>
                    <button onClick={() => onDeleteProduct(product.id)} className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 text-xs rounded-lg font-bold uppercase">Excluir</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Aba de Categorias */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleCategorySubmit} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 h-fit">
            <h3 className="text-xl font-black font-['Barlow_Condensed'] uppercase text-gray-100 mb-4">✨ Criar Nova Categoria</h3>
            <div className="space-y-4">
              <div><label className="block text-xs text-zinc-400 mb-1 uppercase">Nome</label><input type="text" value={newCatName} onChange={e => setNewCatName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm outline-none focus:border-fuchsia-700" placeholder="Ex: Adicionais" /></div>
              <div><label className="block text-xs text-zinc-400 mb-1 uppercase">ID</label><input type="text" value={newCatId} onChange={e => setNewCatId(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm outline-none focus:border-fuchsia-700" placeholder="Ex: adicionais" /></div>
              <button type="submit" className="w-full py-3 bg-lime-500 text-zinc-950 font-bold font-['Barlow_Condensed'] uppercase rounded-xl">Cadastrar Categoria</button>
            </div>
          </form>
          <div className="space-y-3">
            <h3 className="text-lg font-black font-['Barlow_Condensed'] uppercase text-zinc-400 mb-2">Categorias Ativas</h3>
            {categories.map(cat => (
              <div key={cat.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex justify-between items-center"><span className="text-gray-100 font-semibold">{cat.label}</span><span className="text-zinc-500 text-xs font-mono">ID: {cat.id}</span></div>
            ))}
          </div>
        </div>
      )}

      {/* A Nova Aba de Limites */}
      {activeTab === 'limits' && (
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 overflow-x-auto custom-scrollbar">
          <h3 className="text-xl font-black font-['Barlow_Condensed'] uppercase text-gray-100 mb-2">⚖️ Regras de Montagem Dinâmicas</h3>
          <p className="text-zinc-400 text-sm mb-6 font-['Barlow']">Altere a quantidade máxima de itens que o cliente pode escolher no modal de acordo com o ML do copo. As alterações afetam o site inteiro imediatamente.</p>
          
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-zinc-800 text-fuchsia-500 text-xs font-mono uppercase tracking-wider">
                <th className="pb-3 pr-4">Identificador (Copo)</th>
                <th className="pb-3 px-4 text-center">Máx. Cremes</th>
                <th className="pb-3 px-4 text-center">Máx. Frutas</th>
                <th className="pb-3 pl-4 text-center">Máx. Acompanhamentos</th>
              </tr>
            </thead>
            <tbody>
              {customizationLimits.map((limit, index) => (
                <tr key={limit.id} className="border-b border-zinc-800/50 hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 pr-4 font-bold text-gray-200">{limit.label}</td>
                  <td className="py-4 px-4 text-center">
                    <input type="number" min="0" max="15" value={limit.creams} onChange={(e) => handleUpdateLimit(index, 'creams', parseInt(e.target.value) || 0)} className="w-16 bg-zinc-950 border border-zinc-700 rounded-md p-1.5 text-center text-sm focus:border-lime-500 outline-none text-lime-500 font-bold" />
                  </td>
                  <td className="py-4 px-4 text-center">
                    <input type="number" min="0" max="15" value={limit.fruits} onChange={(e) => handleUpdateLimit(index, 'fruits', parseInt(e.target.value) || 0)} className="w-16 bg-zinc-950 border border-zinc-700 rounded-md p-1.5 text-center text-sm focus:border-lime-500 outline-none text-lime-500 font-bold" />
                  </td>
                  <td className="py-4 pl-4 text-center">
                    <input type="number" min="0" max="15" value={limit.complements} onChange={(e) => handleUpdateLimit(index, 'complements', parseInt(e.target.value) || 0)} className="w-16 bg-zinc-950 border border-zinc-700 rounded-md p-1.5 text-center text-sm focus:border-lime-500 outline-none text-lime-500 font-bold" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminDashboard;