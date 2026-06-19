import React from 'react';

const StarIcon = () => (
  <div className="size-3 relative overflow-hidden">
    <div className="size-2.5 left-[1px] top-[1px] absolute bg-fuchsia-700 outline outline-1 outline-offset-[-0.50px] outline-fuchsia-700"></div>
  </div>
);

const TestimonialCard = ({ text, author }) => {
  return (
    <article className="w-72 p-5 bg-zinc-900 rounded-2xl outline outline-1 outline-offset-[-1px] outline-fuchsia-700/20 flex flex-col justify-start items-start">
      <div className="self-stretch inline-flex justify-start items-start gap-0.5">
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
        <StarIcon />
      </div>
      <div className="self-stretch py-3">
        <p className="w-60 text-violet-300 text-sm font-normal font-['Barlow'] leading-6">{text}</p>
      </div>
      <footer className="self-stretch h-6 relative">
        <p className="left-0 top-[4px] absolute text-zinc-400 text-xs font-semibold font-['Barlow'] leading-4">— {author}</p>
      </footer>
    </article>
  );
};

export default TestimonialCard;

