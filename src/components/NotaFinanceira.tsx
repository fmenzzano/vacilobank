import React from 'react';

interface NotaFinanceiraProps {
  nota: number;
}

export default function NotaFinanceira({ nota }: NotaFinanceiraProps) {
  // Garantir que a nota está entre 0 e 100
  const notaNormalizada = Math.min(Math.max(0, nota), 100);
  
  // Determinar a cor com base na nota
  const getCorNota = (nota: number): string => {
    if (nota >= 7) return 'text-green-600';
    if (nota >= 4) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  // Determinar a cor de fundo do velocímetro
  const getCorFundo = (nota: number): string => {
    if (nota < 40) return 'bg-red-100';
    if (nota < 70) return 'bg-yellow-100';
    return 'bg-green-100';
  };
  
  // Determinar a cor da barra do velocímetro
  const getCorBarra = (nota: number): string => {
    if (nota < 40) return 'bg-red-500';
    if (nota < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  // Determinar a frase sarcástica com base na nota
  const getFraseSarcastica = (nota: number): string => {
    if (nota < 30) return '— Você não está falido, só financeiramente confuso';
    if (nota < 50) return '— Seu cartão de crédito está chorando de solidão';
    if (nota < 70) return '— Você não está mal, só precisa de um empurrãozinho';
    if (nota < 90) return '— Você está no caminho certo, mas ainda vacila um pouco';
    return '— Você é o exemplo que ninguém pediu, mas todos precisam';
  };
  
  const corNota = getCorNota(notaNormalizada);
  const corFundo = getCorFundo(notaNormalizada);
  const corBarra = getCorBarra(notaNormalizada);
  const fraseSarcastica = getFraseSarcastica(notaNormalizada);
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Saúde Financeira</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-1/2">
          <div className={`${corFundo} rounded-full p-8 flex flex-col items-center justify-center`}>
            <div className="text-5xl font-bold mb-2 ${corNota}">
              {notaNormalizada}
            </div>
            <div className="text-lg font-medium text-gray-600">
              {fraseSarcastica}
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Progresso</span>
                <span className="text-sm font-medium text-gray-700">{notaNormalizada}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`${corBarra} h-2.5 rounded-full`} 
                  style={{ width: `${notaNormalizada}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-red-100 p-2 rounded">
                <div className="text-red-500 font-bold">0-39</div>
                <div className="text-xs text-gray-600">Crítico</div>
              </div>
              <div className="bg-yellow-100 p-2 rounded">
                <div className="text-yellow-500 font-bold">40-69</div>
                <div className="text-xs text-gray-600">Atenção</div>
              </div>
              <div className="bg-green-100 p-2 rounded">
                <div className="text-green-500 font-bold">70-100</div>
                <div className="text-xs text-gray-600">Saudável</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 