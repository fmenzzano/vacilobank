import React from 'react';
import { AnaliseResult } from '@/lib/openai';

interface FluxoCaixaProps {
  data: AnaliseResult;
}

export default function FluxoCaixa({ data }: FluxoCaixaProps) {
  // Garantir que transacoes seja um array
  const transacoes = Array.isArray(data.transacoes) ? data.transacoes : [];
  
  // Calcula totais com verificações de segurança
  const entradas = transacoes
    .filter(t => t && typeof t.valor === 'number' && t.valor > 0)
    .reduce((acc, t) => acc + t.valor, 0);

  const saidas = Math.abs(transacoes
    .filter(t => t && typeof t.valor === 'number' && t.valor < 0)
    .reduce((acc, t) => acc + t.valor, 0));

  const saldo = entradas - saidas;
  const total = entradas + saidas; // Para a barra de progresso

  // Log para debug
  console.log('FluxoCaixa - Dados recebidos:', {
    totalTransacoes: transacoes.length,
    entradas,
    saidas,
    saldo
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
        <span>Fluxo de Caixa</span>
        <span className="ml-2 text-xl">📊</span>
      </h3>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 flex items-center">
              <span className="mr-2">Entradas</span>
              <span className="text-lg">💸</span>
            </span>
            <span className="text-green-600 font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(entradas)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${total > 0 ? (entradas / total) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 flex items-center">
              <span className="mr-2">Saídas</span>
              <span className="text-lg">🔥</span>
            </span>
            <span className="text-red-600 font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(-saidas)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${total > 0 ? (saidas / total) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 flex items-center">
              <span className="mr-2">Saldo Final</span>
              <span className="text-lg">🧮</span>
            </span>
            <span className={`font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(saldo)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                saldo >= 0 ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{ width: `${total > 0 ? Math.min(Math.abs(saldo) / total * 100, 100) : 0}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
} 