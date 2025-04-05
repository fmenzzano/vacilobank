import React from 'react';
import Link from 'next/link';
import MockAnalysis from './MockAnalysis';

export default function Hero() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="mb-12 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-black">
              Seu extrato <span className="text-purple-600 font-extrabold">sabe de tudo</span>. Só você ainda <span className="text-purple-600 font-extrabold">finge que não</span>.
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              VaciloBank analisa seus gastos com <span className="text-purple-600 font-semibold">inteligência artificial</span> e <span className="text-purple-600 font-semibold">falta de paciência</span>.
            </p>
            <p className="text-xl text-gray-600 mb-8">
              Te mostra o que você fez, o que deu errado, e o que fazer antes do próximo <span className="text-purple-600 font-semibold">Pix vergonhoso</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/upload" 
                className="inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-bold rounded-lg text-white bg-black hover:bg-gray-900 transition-colors"
              >
                Me mostra logo onde eu vacilei
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <MockAnalysis />
          </div>
        </div>
      </div>
    </section>
  );
} 