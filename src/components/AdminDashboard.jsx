import React, { useState } from 'react';

const AdminDashboard = ({ 
  menuData, 
  categories, 
  onAddProduct, 
  onEditProduct, 
  onDeleteProduct, 
  onAddCategory,
  storeOverride,
  onSetStoreOverride
}) => {
  const [activeTab, setActiveTab] = useState('products');
  const [editingId, setEditingId] = useState(null);

  // Estados dos Formulários
  const [productForm, setProductForm] = useState({ title: '', description: '', price: '', category: 'maispedidos', image: '' });
  const [newCatName, setNewCatName] = useState('');
  const [newCatId, setNewCatId] = useState('');

  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!productForm.title || !productForm.price) return;

    if (editingId) {
      onEditProduct({ id: editingId, ...productForm });
      setEditingId(null);
    } else {
      onAddProduct({ id: Date.now(), ...productForm });
    }
    setProductForm({ title: '', description: '', price: '', category: 'maispedidos', image: 'https://images.unsplash.com/photo-1526424382096-74a93e105682?q=80&w=300' });
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setProductForm({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image
    });
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    if (!newCatName || !newCatId) return;
    onAddCategory({ id: newCatId.toLowerCase().trim(), label: newCatName });
    setNewCatName('');
    setNewCatId('');
  };

  return (
    <section className="w-full max-w-[1024px] px-5 py-12 mx-auto flex-grow font-['Barlow']">
      <div className="border-b border-zinc-800 pb-4 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-fuchsia-500 text-xs font-mono uppercase tracking-wider">Painel Administrativo</span>
          <h1 className="text-4xl font-black font-['Barlow_Condensed'] uppercase text-gray-100">Gerenciador da Açaiteria</h1>
        </div>

        {/* Controle de Status de Funcionamento */}
        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex flex-col gap-2">
          <span className="text-zinc-400 text-xs font-semibold">Status de Funcionamento:</span>
          <div className="flex gap-2">
            <button 
              onClick={() => onSetStoreOverride('auto')}
              className={`px-3 py-1 text-xs rounded-full uppercase font-bold transition-all ${storeOverride === 'auto' ? 'bg-lime-500 text-zinc-950' : 'bg-zinc-800 text-zinc-400'}`}
            >
              🔄 Automático
            </button>
            <button 
              onClick={() => onSetStoreOverride('open')}
              className={`px-3 py-1 text-xs rounded-full uppercase font-bold transition-all ${storeOverride === 'open' ? 'bg-green-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}
            >
              🟢 Forçar Aberto
            </button>
            <button 
              onClick={() => onSetStoreOverride('closed')}
              className={`px-3 py-1 text-xs rounded-full uppercase font-bold transition-all ${storeOverride === 'closed' ? 'bg-red-600 text-white' : 'bg-zinc-800 text-zinc-400'}`}
            >
              🔴 Forçar Fechado
            </button>
          </div>
        </div>
      </div>

      {/* Abas */}
      <div className="flex space-x-4 mb-8 border-b border-zinc-800 pb-2">
        <button 
          onClick={() => setActiveTab('products')} 
          className={`pb-2 text-lg font-bold font-['Barlow_Condensed'] uppercase tracking-wide ${activeTab === 'products' ? 'text-lime-500 border-b-2 border-lime-500' : 'text-zinc-500'}`}
        >
          🍔 Produtos
        </button>
        <button 
          onClick={() => setActiveTab('categories')} 
          className={`pb-2 text-lg font-bold font-['Barlow_Condensed'] uppercase tracking-wide ${activeTab === 'categories' ? 'text-lime-500 border-b-2 border-lime-500' : 'text-zinc-500'}`}
        >
          📁 Categorias
        </button>
      </div>

      {/* Aba de Produtos */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <form onSubmit={handleProductSubmit} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 h-fit">
            <h3 className="text-xl font-black font-['Barlow_Condensed'] uppercase text-gray-100 mb-4">
              {editingId ? '📝 Editar Produto' : '✨ Novo Produto'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1 uppercase">Título do Produto</label>
                <input 
                  type="text" 
                  value={productForm.title}
                  onChange={e => setProductForm({...productForm, title: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:border-fuchsia-700" 
                  placeholder="Ex: Super Combo Açaí"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1 uppercase">Descrição / Acompanhamentos</label>
                <textarea 
                  value={productForm.description}
                  onChange={e => setProductForm({...productForm, description: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:border-fuchsia-700 h-20 resize-none" 
                  placeholder="Ex: Leite em pó, banana, morango..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 uppercase">Preço (R$)</label>
                  <input 
                    type="text" 
                    value={productForm.price}
                    onChange={e => setProductForm({...productForm, price: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:border-fuchsia-700" 
                    placeholder="R$ 22,00"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 uppercase">Categoria</label>
                  <select 
                    value={productForm.category}
                    onChange={e => setProductForm({...productForm, category: e.target.value})}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:border-fuchsia-700"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1 uppercase">URL da Imagem (Opcional)</label>
                <input 
                  type="text" 
                  value={productForm.image}
                  onChange={e => setProductForm({...productForm, image: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:border-fuchsia-700" 
                  placeholder="https://..."
                />
              </div>
              <button type="submit" className="w-full py-3 bg-lime-500 hover:bg-lime-400 font-bold font-['Barlow_Condensed'] uppercase text-zinc-950 rounded-xl transition-colors mt-2">
                {editingId ? 'Salvar Alterações' : 'Adicionar ao Cardápio'}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setProductForm({ title: '', description: '', price: '', category: 'maispedidos', image: '' }); }} className="w-full py-2 bg-zinc-800 text-zinc-400 font-bold font-['Barlow_Condensed'] uppercase rounded-xl transition-colors mt-1">
                  Cancelar
                </button>
              )}
            </div>
          </form>

          {/* Lista de Produtos Cadastrados */}
          <div className="lg:col-span-2 space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {menuData.map(product => {
              const currentCat = categories.find(c => c.id === product.category);
              return (
                <div key={product.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <img src={product.image || 'https://images.unsplash.com/photo-1526424382096-74a93e105682?q=80&w=100'} alt="" className="w-12 h-12 object-cover rounded-lg" />
                    <div>
                      <h4 className="text-gray-100 font-bold leading-tight">{product.title}</h4>
                      <p className="text-zinc-500 text-xs font-mono mt-0.5 uppercase">
                        {currentCat ? currentCat.label : product.category} · <span className="text-lime-500">{product.price}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(product)} className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-violet-300 text-xs rounded-lg transition-colors font-bold uppercase">Editar</button>
                    <button onClick={() => onDeleteProduct(product.id)} className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 text-xs rounded-lg transition-colors font-bold uppercase">Excluir</button>
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
              <div>
                <label className="block text-xs text-zinc-400 mb-1 uppercase">Nome de Exibição</label>
                <input 
                  type="text" 
                  value={newCatName}
                  onChange={e => setNewCatName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:border-fuchsia-700" 
                  placeholder="Ex: Adicionais, Cremes Especiais"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1 uppercase">ID Único (Identificador de Sistema)</label>
                <input 
                  type="text" 
                  value={newCatId}
                  onChange={e => setNewCatId(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:border-fuchsia-700" 
                  placeholder="Ex: adicionais, cremes"
                />
              </div>
              <button type="submit" className="w-full py-3 bg-lime-500 hover:bg-lime-400 font-bold font-['Barlow_Condensed'] uppercase text-zinc-950 rounded-xl transition-colors mt-2">
                Cadastrar Categoria
              </button>
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
    </section>
  );
};

export default AdminDashboard;