'use client';

import React from 'react';
import Link from 'next/link';

export default function PaywallChamada() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 shadow-sm">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Você atingiu o limite de análises gratuitas!
        </h2>
        
        <p className="text-lg text-gray-600 mb-6">
          Desbloqueie análises ilimitadas e descubra como melhorar seus gastos com o VaciloBank Premium.
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Análises mensais detalhadas do seu extrato</span>
          </div>
          
          <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Dicas personalizadas para economizar</span>
          </div>
          
          <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Alertas de gastos excessivos</span>
          </div>
          
          <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Previsões financeiras para o próximo mês</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/assinatura"
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Assinar agora por R$ 19,90/mês
          </Link>
          
          <Link 
            href="/"
            className="bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 px-6 rounded-lg transition-colors border border-gray-200"
          >
            Voltar para o início
          </Link>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          Cancele a qualquer momento. 7 dias de garantia de reembolso.
        </p>
      </div>
    </div>
  );
} 