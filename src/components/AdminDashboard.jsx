import React, { useState } from 'react';

const AdminDashboard = ({
  menuData,
  categories,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onAddCategory,
  storeOverride,
  onSetStoreOverride,
  isOpenStatus,
}) => {
  const [activeTab, setActiveTab] = useState('products');
  const [editingId, setEditingId] = useState(null);

  const [productForm, setProductForm] = useState({
    title: '',
    description: '',
    price: '',
    category: 'maispedidos',
    image: '',
  });
  const [newCatName, setNewCatName] = useState('');
  const [newCatId, setNewCatId] = useState('');

  // Upload de imagem como Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProductForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
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
    setProductForm({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setProductForm({ title: '', description: '', price: '', category: 'maispedidos', image: '' });
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

      {/* ── Cabeçalho do Painel ── */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-[0px_0px_40px_0px_rgba(151,80,175,0.08)]">
        <div>
          <span className="text-fuchsia-500 text-xs font-mono uppercase tracking-wider">
            Painel Administrativo
          </span>
          <h1 className="text-4xl font-black font-['Barlow_Condensed'] uppercase text-gray-100 mt-0.5">
            Gerenciador da Loja
          </h1>
        </div>

        {/* Status + Controles */}
        <div className="flex flex-col items-start md:items-end gap-3">
          {/* Badge de status atual */}
          <div className="flex items-center gap-3">
            <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">
              Status atual:
            </span>
            <span
              className={`px-3 py-1 rounded-md text-xs font-black font-['Barlow_Condensed'] uppercase tracking-wider border ${
                isOpenStatus
                  ? 'bg-green-500/10 text-green-400 border-green-500/40'
                  : 'bg-red-500/10 text-red-400 border-red-500/40'
              }`}
            >
              {isOpenStatus ? '🟢 Aberta' : '🔴 Fechada'}
            </span>
          </div>

          {/* Botões de override */}
          <div className="flex gap-1.5 p-1.5 bg-zinc-950 rounded-lg border border-zinc-800">
            <button
              onClick={() => onSetStoreOverride('auto')}
              className={`px-3 py-1.5 text-xs rounded-md uppercase font-bold transition-all ${
                storeOverride === 'auto'
                  ? 'bg-zinc-700 text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              🔄 Auto
            </button>
            <button
              onClick={() => onSetStoreOverride('open')}
              className={`px-3 py-1.5 text-xs rounded-md uppercase font-bold transition-all ${
                storeOverride === 'open'
                  ? 'bg-green-600 text-white shadow-lg'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Forçar Aberto
            </button>
            <button
              onClick={() => onSetStoreOverride('closed')}
              className={`px-3 py-1.5 text-xs rounded-md uppercase font-bold transition-all ${
                storeOverride === 'closed'
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Forçar Fechado
            </button>
          </div>
        </div>
      </div>

      {/* ── Abas ── */}
      <div className="flex space-x-4 mb-8 border-b border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-2 text-lg font-bold font-['Barlow_Condensed'] uppercase tracking-wide transition-colors ${
            activeTab === 'products'
              ? 'text-lime-500 border-b-2 border-lime-500'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          🍔 Produtos
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`pb-2 text-lg font-bold font-['Barlow_Condensed'] uppercase tracking-wide transition-colors ${
            activeTab === 'categories'
              ? 'text-lime-500 border-b-2 border-lime-500'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          📁 Categorias
        </button>
      </div>

      {/* ── Aba: Produtos ── */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Formulário */}
          <form
            onSubmit={handleProductSubmit}
            className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 h-fit"
          >
            <h3 className="text-xl font-black font-['Barlow_Condensed'] uppercase text-gray-100 mb-5">
              {editingId ? '📝 Editar Produto' : '✨ Novo Produto'}
            </h3>

            <div className="space-y-4">
              {/* Upload de Imagem */}
              <div>
                <label className="block text-xs text-zinc-400 mb-2 uppercase tracking-wider">
                  Imagem do Produto
                </label>
                <div className="flex items-center gap-4">
                  {productForm.image ? (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-lime-500 flex-shrink-0">
                      <img
                        src={productForm.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setProductForm((p) => ({ ...p, image: '' }))}
                        className="absolute top-1 right-1 bg-black/60 rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-xl border border-dashed border-zinc-600 bg-zinc-950 flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl opacity-30">📷</span>
                    </div>
                  )}
                  <div className="flex-grow">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      id="file-upload"
                      className="hidden"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer inline-block px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase rounded-lg transition-colors border border-zinc-700 text-zinc-300"
                    >
                      Escolher Arquivo
                    </label>
                    <p className="text-zinc-600 text-xs mt-1.5">PNG, JPG, WEBP</p>
                  </div>
                </div>
              </div>

              {/* Título */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">
                  Título
                </label>
                <input
                  type="text"
                  value={productForm.title}
                  onChange={(e) => setProductForm((p) => ({ ...p, title: e.target.value }))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:border-fuchsia-700 transition-colors"
                  placeholder="Ex: Açaí Turbinado 400ml"
                />
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">
                  Descrição
                </label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm((p) => ({ ...p, description: e.target.value }))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:border-fuchsia-700 h-20 resize-none transition-colors"
                  placeholder="Ingredientes e acompanhamentos..."
                />
              </div>

              {/* Preço + Categoria */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">
                    Preço
                  </label>
                  <input
                    type="text"
                    value={productForm.price}
                    onChange={(e) => setProductForm((p) => ({ ...p, price: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:border-fuchsia-700 transition-colors"
                    placeholder="R$ 22,00"
                  />
                </div>
                <div>
                  <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">
                    Categoria
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm((p) => ({ ...p, category: e.target.value }))}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:border-fuchsia-700 transition-colors"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Botão Submit */}
              <button
                type="submit"
                className="w-full py-3 bg-lime-500 hover:bg-lime-400 font-bold font-['Barlow_Condensed'] uppercase text-zinc-950 rounded-xl transition-colors mt-2 text-sm tracking-wide"
              >
                {editingId ? 'Salvar Alterações' : 'Adicionar ao Cardápio'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 font-bold font-['Barlow_Condensed'] uppercase rounded-xl transition-colors text-sm"
                >
                  Cancelar Edição
                </button>
              )}
            </div>
          </form>

          {/* Lista de Produtos */}
          <div className="lg:col-span-2 space-y-3 max-h-[620px] overflow-y-auto pr-1">
            {menuData.length === 0 && (
              <p className="text-zinc-500 text-sm font-['Barlow'] text-center py-10">
                Nenhum produto cadastrado ainda.
              </p>
            )}
            {menuData.map((product) => {
              const currentCat = categories.find((c) => c.id === product.category);
              return (
                <div
                  key={product.id}
                  className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 hover:border-zinc-700 flex justify-between items-center gap-4 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={
                        product.image ||
                        'https://images.unsplash.com/photo-1526424382096-74a93e105682?q=80&w=100'
                      }
                      alt={product.title}
                      className="w-14 h-14 object-cover rounded-lg border border-zinc-800 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-gray-100 font-bold leading-tight truncate">
                        {product.title}
                      </h4>
                      <p className="text-zinc-500 text-xs font-mono mt-0.5 uppercase">
                        {currentCat ? currentCat.label : product.category}
                        {' · '}
                        <span className="text-lime-500">{product.price}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => startEdit(product)}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-violet-300 text-xs rounded-lg transition-colors font-bold uppercase"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => onDeleteProduct(product.id)}
                      className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/60 text-red-400 text-xs rounded-lg transition-colors font-bold uppercase"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Aba: Categorias ── */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Formulário de nova categoria */}
          <form
            onSubmit={handleCategorySubmit}
            className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 h-fit"
          >
            <h3 className="text-xl font-black font-['Barlow_Condensed'] uppercase text-gray-100 mb-5">
              ✨ Criar Categoria
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">
                  Nome de Exibição
                </label>
                <input
                  type="text"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:border-fuchsia-700 transition-colors"
                  placeholder="Ex: Cremes Especiais"
                />
              </div>
              <div>
                <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wider">
                  ID Único
                </label>
                <input
                  type="text"
                  value={newCatId}
                  onChange={(e) => setNewCatId(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:border-fuchsia-700 transition-colors"
                  placeholder="Ex: cremes"
                />
                <p className="text-zinc-600 text-xs mt-1.5">
                  Apenas letras minúsculas e hífens, sem espaços.
                </p>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-lime-500 hover:bg-lime-400 font-bold font-['Barlow_Condensed'] uppercase text-zinc-950 rounded-xl transition-colors mt-2 text-sm tracking-wide"
              >
                Cadastrar Categoria
              </button>
            </div>
          </form>

          {/* Lista de categorias ativas */}
          <div className="space-y-3">
            <h3 className="text-sm font-black font-['Barlow_Condensed'] uppercase text-zinc-400 tracking-wider mb-3">
              Categorias Ativas ({categories.length})
            </h3>
            {categories.map((cat) => {
              const count = menuData.filter((p) => p.category === cat.id).length;
              return (
                <div
                  key={cat.id}
                  className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex justify-between items-center"
                >
                  <div>
                    <span className="text-gray-100 font-semibold text-sm">{cat.label}</span>
                    <p className="text-zinc-600 text-xs font-mono mt-0.5">ID: {cat.id}</p>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 bg-zinc-800 px-2 py-1 rounded-md">
                    {count} {count === 1 ? 'item' : 'itens'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminDashboard;