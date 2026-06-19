import React from 'react';

// Dados das features separados em uma linha segura para não quebrar o código
const features = [
  {
    icon: (
      <div className="w-4 h-4 outline outline-[1.67px] outline-offset-[-0.83px] outline-fuchsia-700" />
    ),
    title: 'Entrega expressa',
    description: 'em até 40 minutos',
  },
  {
    icon: (
      <>
        <div className="w-3.5 h-3.5 outline outline-[1.67px] outline-offset-[-0.83px] outline-fuchsia-700" />
        <div className="w-2.5 h-2 outline outline-[1.67px] outline-offset-[-0.83px] outline-fuchsia-700" />
      </>
    ),
    title: 'Açaí 100% natural',
    description: 'sem conservantes',
  },
  {
    icon: (
      <div className="w-3 h-4 outline outline-[1.67px] outline-offset-[-0.83px] outline-fuchsia-700" />
    ),
    title: 'Porções generosas',
    description: '300ml a 1L',
  },
  {
    icon: (
      <div className="w-4 h-4 outline outline-[1.67px] outline-offset-[-0.83px] outline-fuchsia-700" />
    ),
    title: '4.9 ⭐ no Google',
    description: '+800 avaliações',
  },
];

const FeaturesSection = () => {
  return (
    <section className="self-stretch px-5 py-10 border-t border-b border-fuchsia-700/20 flex justify-center">
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="inline-flex flex-col justify-start items-center text-center gap-2">
            <div className="pb-1">
              <div className="size-11 bg-fuchsia-700/20 rounded-2xl outline outline-1 outline-offset-[-1px] outline-fuchsia-700/30 inline-flex justify-center items-center">
                <div className="size-5 relative overflow-hidden flex justify-center items-center">
                  {feature.icon}
                </div>
              </div>
            </div>
            <h3 className="text-gray-100 text-sm font-semibold font-['Barlow'] leading-5">
              {feature.title}
            </h3>
            <p className="text-zinc-400 text-xs font-normal font-['Barlow'] leading-4">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;