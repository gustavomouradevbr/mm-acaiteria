import React, { useState, useEffect } from 'react';

const CustomizeModal = ({ isOpen, onClose, product, onConfirm }) => {
  if (!isOpen || !product) return null;

  // Analisa o título E a descrição para caçar a litragem do copo
  const getLimits = (prod) => {
    const textToSearch = (prod.title + " " + prod.description).toLowerCase();
    
    // Regras de negócio da MM Açaiteria aplicadas exatamente como solicitado
    if (textToSearch.includes('250ml')) return { creams: 1, fruits: 1, complements: 2 };
    if (textToSearch.includes('300ml')) return { creams: 3, fruits: 2, complements: 3 };
    if (textToSearch.includes('400ml')) return { creams: 3, fruits: 2, complements: 3 };
    if (textToSearch.includes('500ml')) return { creams: 3, fruits: 3, complements: 4 };
    if (textToSearch.includes('600ml')) return { creams: 3, fruits: 3, complements: 4 };
    if (textToSearch.includes('770ml')) return { creams: 2, fruits: 3, complements: 5 };
    if (textToSearch.includes('1 litro') || textToSearch.includes('1l')) return { creams: 2, fruits: 3, complements: 5 };
    
    // Padrão de segurança caso o administrador cadastre um produto sem informar os "ml"
    return { creams: 3, fruits: 2, complements: 3 }; 
  };

  const limits = getLimits(product);

  const availableCreams = ['Leite Ninho', 'Nutella Pura', 'Ovomaltine', 'Mousse de Maracujá'];
  const availableFruits = ['Morango Fresco', 'Banana Fatiada', 'Kiwi', 'Manga'];
  const availableComplements = ['Leite em Pó', 'Granola Crocante', 'Paçoca Premium', 'Canudinho', 'Confeitos de Chocolate'];

  const [selectedCreams, setSelectedCreams] = useState([]);
  const [selectedFruits, setSelectedFruits] = useState([]);
  const [selectedComplements, setSelectedComplements] = useState([]);

  useEffect(() => {
    setSelectedCreams([]);
    setSelectedFruits([]);
    setSelectedComplements([]);
  }, [product]);

  const handleToggle = (item, selectedList, setSelectedList, maxLimit) => {
    if (selectedList.includes(item)) {
      setSelectedList(selectedList.filter(i => i !== item));
    } else if (selectedList.length < maxLimit) {
      setSelectedList([...selectedList, item]);
    }
  };

  const handleSave = () => {
    onConfirm({
      ...product,
      customizations: {
        creams: selectedCreams,
        fruits: selectedFruits,
        complements: selectedComplements
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-lg bg-zinc-950 border border-fuchsia-700/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
          <div>
            <h3 className="text-xl font-black font-['Barlow_Condensed'] uppercase text-gray-100">{product.title}</h3>
            <p className="text-xs text-lime-500 font-mono mt-0.5">Personalize seu copo</p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-red-500 text-2xl">&times;</button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-grow custom-scrollbar">
          {/* Cremes */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-bold uppercase text-gray-200 tracking-wider">Escolha os Cremes</h4>
              <span className="text-xs font-mono text-fuchsia-400">Limite: {selectedCreams.length}/{limits.creams}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {availableCreams.map(cream => {
                const isChecked = selectedCreams.includes(cream);
                const isDisabled = !isChecked && selectedCreams.length >= limits.creams;
                return (
                  <button key={cream} type="button" disabled={isDisabled} onClick={() => handleToggle(cream, selectedCreams, setSelectedCreams, limits.creams)} className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${isChecked ? 'bg-fuchsia-700/20 border-fuchsia-600 text-gray-100' : 'bg-zinc-900 border-zinc-800 text-zinc-400 disabled:opacity-30'}`}>
                    {cream}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Frutas */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-bold uppercase text-gray-200 tracking-wider">Escolha as Frutas</h4>
              <span className="text-xs font-mono text-fuchsia-400">Limite: {selectedFruits.length}/{limits.fruits}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {availableFruits.map(fruit => {
                const isChecked = selectedFruits.includes(fruit);
                const isDisabled = !isChecked && selectedFruits.length >= limits.fruits;
                return (
                  <button key={fruit} type="button" disabled={isDisabled} onClick={() => handleToggle(fruit, selectedFruits, setSelectedFruits, limits.fruits)} className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${isChecked ? 'bg-fuchsia-700/20 border-fuchsia-600 text-gray-100' : 'bg-zinc-900 border-zinc-800 text-zinc-400 disabled:opacity-30'}`}>
                    {fruit}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Complementos */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-bold uppercase text-gray-200 tracking-wider">Complementos</h4>
              <span className="text-xs font-mono text-fuchsia-400">Limite: {selectedComplements.length}/{limits.complements}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {availableComplements.map(comp => {
                const isChecked = selectedComplements.includes(comp);
                const isDisabled = !isChecked && selectedComplements.length >= limits.complements;
                return (
                  <button key={comp} type="button" disabled={isDisabled} onClick={() => handleToggle(comp, selectedComplements, setSelectedComplements, limits.complements)} className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${isChecked ? 'bg-fuchsia-700/20 border-fuchsia-600 text-gray-100' : 'bg-zinc-900 border-zinc-800 text-zinc-400 disabled:opacity-30'}`}>
                    {comp}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-zinc-800 bg-zinc-900 flex justify-end">
          <button onClick={handleSave} className="px-6 py-2.5 bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold font-['Barlow_Condensed'] uppercase tracking-wider rounded-xl transition-all">
            Confirmar e Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeModal;