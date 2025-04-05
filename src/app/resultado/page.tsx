'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { AnaliseResult } from '@/lib/openai';
import Charts from '@/components/Charts';

// Função para gerar cores consistentes baseadas no nome da categoria
function getRandomColor(seed: string): string {
  const colors = [
    '#FF6B6B', // Vermelho
    '#4ECDC4', // Verde-água
    '#45B7D1', // Azul
    '#96CEB4', // Verde
    '#FFEEAD', // Amarelo
    '#D4A5A5', // Rosa
    '#9B59B6', // Roxo
    '#3498DB', // Azul claro
    '#E67E22', // Laranja
    '#2ECC71', // Verde
  ];
  
  // Gera um índice baseado no nome da categoria
  const index = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  
  return colors[index];
}

// Função para gerar descrições para as categorias
function getCategoryDescription(category: string, value: number): string {
  const descriptions: Record<string, string[]> = {
    'Alimentação': ['Autoengano gourmet', 'Fome emocional', 'Delivery crônico'],
    'Transporte': ['Preguiça a motor', 'Uberismo agudo', 'Taxismo compulsivo'],
    'Lazer': ['Diversão cara', 'Entretenimento premium', 'Dopamina cara'],
    'Fatura de Cartão': ['Cartão de crédito', 'Crédito infinito', 'Fatura do apocalipse'],
    'Transferências': ['Pix compulsivo', 'Dinheiro digital', 'Transferência de culpa'],
    'Outros': ['Gastos misteriosos', 'Despesas invisíveis', 'Dinheiro que some']
  };
  
  // Tenta encontrar uma descrição para a categoria
  const categoryDescriptions = descriptions[category] || ['Gasto inexplicável'];
  
  // Escolhe uma descrição com base no valor
  const index = Math.floor(value % categoryDescriptions.length);
  
  return categoryDescriptions[index];
}

export default function ResultadoPage() {
  const router = useRouter();
  const [resultado, setResultado] = useState<AnaliseResult | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Recupera o resultado da sessão
    const storedResult = sessionStorage.getItem('analiseResult');
    
    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult);
        setResultado(parsedResult);
      } catch (error) {
        console.error('Erro ao recuperar resultado:', error);
      }
    } else {
      // Se não houver resultado, redireciona para a página de análise
      router.push('/analise');
    }
    
    setLoading(false);
  }, [router]);
  
  const handleVerPlanos = () => {
    router.push('/paywall');
  };
  
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12 text-center">
          <p className="text-xl">Carregando seu resultado...</p>
        </div>
      </main>
    );
  }
  
  if (!resultado) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12 text-center">
          <p className="text-xl">Nenhum resultado encontrado.</p>
          <button 
            onClick={() => router.push('/analise')}
            className="mt-4 bg-black text-white py-2 px-6 rounded-lg"
          >
            Voltar para análise
          </button>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Velocímetro */}
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <h2 className="text-2xl font-bold mb-4">Sua Nota de Saúde Financeira</h2>
            <div className="relative w-48 h-48 mx-auto">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={resultado.nota >= 7 ? '#22c55e' : resultado.nota >= 4 ? '#eab308' : '#ef4444'}
                  strokeWidth="10"
                  strokeDasharray={`${(resultado.nota / 10) * 283} 283`}
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span className="text-4xl font-bold">{resultado.nota.toFixed(1)}</span>
                <span className="text-gray-500">/10</span>
              </div>
            </div>
          </div>
          
          {/* Vacilo do Mês */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Vacilo do Mês</h2>
            <p className="text-gray-700">{resultado.vaciloDoMes}</p>
          </div>
          
          {/* Diagnóstico */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Diagnóstico</h2>
            <p className="text-gray-700 whitespace-pre-line">{resultado.resumo}</p>
          </div>
          
          {/* Gráficos */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Gráficos</h2>
            <Charts data={resultado} />
          </div>
          
          {/* Frase Final */}
          <div className="text-center p-4">
            <blockquote className="border-l-4 border-purple-500 pl-4 italic text-purple-700">
              &ldquo;{resultado.fraseFinal}&rdquo;
            </blockquote>
          </div>
          
          {/* Botão para Planos */}
          <div className="text-center">
            <button
              onClick={handleVerPlanos}
              className="bg-black text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Ver Planos de Recuperação
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 