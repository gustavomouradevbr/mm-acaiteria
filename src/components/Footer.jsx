import React from 'react';

const Footer = () => {
  return (
    <footer className="self-stretch px-5 py-12 bg-zinc-950 border-t border-fuchsia-700/20 flex flex-col items-center">
      <div className="w-full max-w-[1024px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Coluna 1: Logo e Slogan */}
          <div className="flex flex-col justify-start items-start">
            <h3 className="text-2xl font-black font-['Barlow_Condensed'] leading-8">
              <span className="text-fuchsia-700">MM</span>
              <span className="text-lime-500">.</span>
              <span className="text-fuchsia-700">AÇAITERIA</span>
            </h3>
            <p className="pt-3 text-zinc-400 text-xs font-normal font-['Barlow'] leading-5">
              Sabor, quality e açaí de verdade direto na sua porta.
            </p>
          </div>

          {/* Coluna 2: Endereço e Horário */}
          <div className="flex flex-col justify-start items-start gap-3">
            <div className="inline-flex justify-start items-start gap-2">
              <span className="text-sm">📍</span>
              <p className="text-violet-300 text-sm font-normal font-['Barlow'] leading-5">
                Avenida São Mateus, 345<br />Iputinga, Recife – PE
              </p>
            </div>
            <div className="inline-flex justify-start items-start gap-2">
              <span className="text-sm">🕒</span>
              <p>
                <span className="text-violet-300 text-sm font-normal font-['Barlow'] leading-5">Terça a domingo<br /></span>
                <span className="text-gray-100 text-sm font-bold font-['Barlow'] leading-5">17h às 23h</span>
              </p>
            </div>
          </div>

          {/* Coluna 3: Redes Sociais */}
          <div className="flex flex-col justify-start items-start gap-3">
            <h4 className="text-zinc-400 text-xs font-normal font-['Share_Tech_Mono'] uppercase leading-4 tracking-wider">Redes Sociais</h4>
            
            {/* Link Instagram */}
            <a 
              href="https://www.instagram.com/mm.acaiteria01/" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex justify-start items-center gap-2 text-violet-300 text-sm font-normal font-['Barlow'] hover:text-fuchsia-500 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.85.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.85-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.073-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              <span>@mmacaiteria01</span>
            </a>

            {/* Link WhatsApp */}
            <a 
              href="https://wa.me/5581995212578" 
              target="_blank" 
              rel="noreferrer" 
              className="inline-flex justify-start items-center gap-2 text-violet-300 text-sm font-normal font-['Barlow'] hover:text-lime-500 transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.775-1.456L0 24zm6.59-4.846c1.644.975 3.51 1.489 5.412 1.491 5.441 0 9.865-4.413 9.869-9.85.002-2.634-1.02-5.11-2.877-6.97s-4.343-2.879-6.982-2.88c-5.442 0-9.866 4.413-9.87 9.852-.001 1.916.498 3.79 1.446 5.4l-.994 3.625 3.716-.974zM17.48 14.86c-.301-.15-1.783-.88-2.059-.98-.277-.1-.478-.15-.68.15-.202.3-.782.98-.96 1.18-.178.2-.355.225-.656.075-.301-.15-1.27-.47-2.42-1.482-.895-.798-1.5-1.783-1.676-2.083-.177-.3-.019-.462.13-.61.135-.133.301-.35.452-.524.151-.174.201-.3.301-.5.101-.2.05-.375-.025-.525-.075-.15-.68-1.642-.932-2.247-.247-.593-.497-.512-.68-.522-.177-.008-.379-.01-.58-.01-.201 0-.528.075-.804.375-.276.3-1.056 1.032-1.056 2.516s1.08 2.917 1.23 3.117c.15.2 2.126 3.247 5.15 4.553.719.31 1.28.495 1.718.635.722.23 1.381.197 1.902.132.58-.073 1.783-.73 2.033-1.435.25-.705.25-1.31.176-1.435-.074-.125-.276-.2-.577-.35z"/>
              </svg>
              <span>Fale Conosco</span>
            </a>
          </div>
        </div>
        <div className="w-full pt-10 mt-6 border-t border-fuchsia-700/10 text-center">
          <p className="text-zinc-600 text-xs font-normal font-['Share_Tech_Mono'] leading-4">© 2026 MM Açaiteria · Feito com 💜 em Recife</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;