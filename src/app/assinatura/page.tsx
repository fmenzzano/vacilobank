'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AssinaturaPage() {
  const [planoSelecionado, setPlanoSelecionado] = useState<'mensal' | 'anual'>('mensal');
  
  const planos = {
    mensal: {
      preco: 'R$ 19,90',
      periodo: 'mês',
      economia: '',
      destaque: false
    },
    anual: {
      preco: 'R$ 199,90',
      periodo: 'ano',
      economia: 'Economize 16%',
      destaque: true
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">VaciloBank Premium</h1>
          <p className="text-xl text-gray-600">Escolha o plano que melhor se adapta ao seu nível de vacilo</p>
        </header>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {Object.entries(planos).map(([tipo, plano]) => (
            <div 
              key={tipo}
              className={`bg-white rounded-xl shadow-sm p-6 border-2 ${
                planoSelecionado === tipo 
                  ? 'border-purple-500' 
                  : 'border-transparent hover:border-purple-200'
              } cursor-pointer transition-all`}
              onClick={() => setPlanoSelecionado(tipo as 'mensal' | 'anual')}
            >
              {plano.destaque && (
                <div className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                  RECOMENDADO
                </div>
              )}
              
              <h2 className="text-2xl font-bold mb-2">
                Plano {tipo === 'mensal' ? 'Mensal' : 'Anual'}
              </h2>
              
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold">{plano.preco}</span>
                <span className="text-gray-500 ml-2">/{plano.periodo}</span>
              </div>
              
              {plano.economia && (
                <div className="text-green-600 text-sm font-medium mb-4">
                  {plano.economia}
                </div>
              )}
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Análises mensais detalhadas do seu extrato</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Dicas personalizadas para economizar</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Alertas de gastos excessivos</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Previsões financeiras para o próximo mês</span>
                </li>
                {tipo === 'anual' && (
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Relatório anual de evolução financeira</span>
                  </li>
                )}
              </ul>
              
              <div className={`w-full py-3 rounded-lg text-center font-bold ${
                planoSelecionado === tipo 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {planoSelecionado === tipo ? 'Selecionado' : 'Selecionar'}
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Formas de pagamento</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="border rounded-lg p-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div className="border rounded-lg p-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div className="border rounded-lg p-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div className="border rounded-lg p-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
          </div>
          
          <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-colors">
            Assinar agora por {planos[planoSelecionado].preco}/{planos[planoSelecionado].periodo}
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            Ao assinar, você concorda com nossos <a href="#" className="text-purple-600 hover:underline">Termos de Serviço</a> e <a href="#" className="text-purple-600 hover:underline">Política de Privacidade</a>
          </p>
        </div>
        
        <div className="text-center">
          <Link href="/" className="text-purple-600 hover:text-purple-800 font-medium">
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
} 