import React from 'react';
import Link from 'next/link';

export default function MockAnalysis() {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
      <div className="bg-purple-600 px-6 py-4">
        <h3 className="text-white font-bold text-lg">Seu Raio-X Financeiro</h3>
        <p className="text-white text-sm opacity-80">A IA analisou seu extrato. A vergonha é opcional.</p>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-2xl font-bold text-red-600">5.5</span>
            </div>
            <div className="ml-4">
              <h4 className="text-lg font-bold text-gray-900">Saúde Financeira</h4>
              <p className="text-sm text-gray-600">Você não está falido, só financeiramente confuso</p>
            </div>
          </div>
          
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
            <h4 className="text-sm font-bold text-purple-800 mb-1">Seu Perfil</h4>
            <p className="text-xs text-purple-700 italic">Impulsivo de quinta-feira</p>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Vacilo do Mês</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>R$3.157 em fatura, praticamente um aluguel. Isso não é gasto, é aluguel do seu futuro.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h4 className="text-lg font-bold text-gray-900 mb-2">Diagnóstico</h4>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Você teve uma entrada decente no dia <span className="font-bold">12</span> (<span className="font-bold">R$5.165</span>), mas em menos de 72h já mandou <span className="font-bold">R$1.800</span> embora. Pix pra si mesmo, fatura estourada, e um rastro de gastos em sequência.
          </p>
          <blockquote className="border-l-4 border-purple-500 pl-4 italic text-purple-700">
            &ldquo;Se continuar assim, até seu cartão vai pedir férias.&rdquo;
          </blockquote>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Gastos por Categoria</h4>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Alimentação</span>
                <span className="text-sm font-medium text-gray-700">R$1.200 (30%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Transporte</span>
                <span className="text-sm font-medium text-gray-700">R$800 (20%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <Link 
            href="/upload" 
            className="inline-block px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-colors"
          >
            Analise seu extrato
          </Link>
        </div>
      </div>
    </div>
  );
} 