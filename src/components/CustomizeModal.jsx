import React, { useState, useEffect } from 'react';

const CustomizeModal = ({ isOpen, onClose, product, onConfirm, limitsData, ingredientGroups }) => {
  if (!isOpen || !product) return null;

  const ruleData = limitsData.find(l => l.id === product.limitRule);
  const limits = ruleData?.limits || {};

  const [selections, setSelections] = useState({});

  useEffect(() => {
    const initialSels = {};
    ingredientGroups.forEach(g => { initialSels[g.id] = []; });
    setSelections(initialSels);
  }, [product, ingredientGroups]);

  const handleToggle = (groupId, item, maxLimit) => {
    const currentList = selections[groupId] || [];
    if (currentList.includes(item)) {
      setSelections({ ...selections, [groupId]: currentList.filter(i => i !== item) });
    } else if (currentList.length < maxLimit) {
      setSelections({ ...selections, [groupId]: [...currentList, item] });
    }
  };

  const handleSave = () => {
    onConfirm({ ...product, customizations: selections });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-zinc-950 border border-fuchsia-700/30 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
          <div>
            <h3 className="text-xl font-black font-['Barlow_Condensed'] uppercase text-gray-100">{product.title}</h3>
            <p className="text-xs text-lime-500 font-mono mt-0.5">Personalize seu pedido</p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-red-500 text-2xl">&times;</button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-grow custom-scrollbar">
          {ingredientGroups.map(group => {
            const groupLimit = limits[group.id] || 0;
            if (groupLimit === 0) return null;

            const selectedList = selections[group.id] || [];
            return (
              <div key={group.id}>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-bold uppercase text-gray-200">{group.name}</h4>
                  <span className="text-xs font-mono text-fuchsia-400">Limite: {selectedList.length}/{groupLimit}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {group.items.map(item => {
                    const isChecked = selectedList.includes(item);
                    const isDisabled = !isChecked && selectedList.length >= groupLimit;
                    return (
                      <button
                        key={item}
                        type="button"
                        disabled={isDisabled}
                        onClick={() => handleToggle(group.id, item, groupLimit)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${isChecked ? 'bg-fuchsia-700/20 border-fuchsia-600 text-gray-100' : 'bg-zinc-900 border-zinc-800 text-zinc-400 disabled:opacity-30'}`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-zinc-800 bg-zinc-900 flex justify-end">
          <button onClick={handleSave} className="px-6 py-2.5 bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold font-['Barlow_Condensed'] uppercase rounded-xl">
            Confirmar e Adicionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeModal;
