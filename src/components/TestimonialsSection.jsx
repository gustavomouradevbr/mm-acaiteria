import React from 'react';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    text: '"Melhor açaí que já comi! Chegou rápido e fresquinho."',
    author: 'Ana Beatriz',
  },
  {
    text: '"Pré-treino perfeito. Já virei cliente fixo toda semana."',
    author: 'Marcos V.',
  },
  {
    text: '"Tamanho generoso e preço justo. Vale muito cada centavo!"',
    author: 'Lara F.',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="self-stretch px-5 py-16 bg-zinc-950 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col items-center">
        <h2 className="text-center text-fuchsia-700 text-xs font-normal font-['Share_Tech_Mono'] uppercase leading-4 tracking-wider">O que falam de nós</h2>
        <div className="self-stretch pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} text={testimonial.text} author={testimonial.author} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

