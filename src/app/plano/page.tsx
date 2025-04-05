'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import { AnaliseResult } from '@/lib/openai';

interface Meta {
  titulo: string;
  descricao: string;
  status: 'pendente' | 'em-andamento' | 'concluida';
}

export default function PlanoPage() {
  const router = useRouter();
  const [resultado, setResultado] = useState<AnaliseResult | null>(null);
  const [metas, setMetas] = useState<Meta[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Recupera o resultado da sessão
    const storedResult = sessionStorage.getItem('analiseResult');
    
    if (storedResult) {
      try {
        const parsedResult = JSON.parse(storedResult);
        setResultado(parsedResult);
        
        // Gera metas personalizadas com base no resultado
        const metasGeradas = gerarMetas(parsedResult);
        setMetas(metasGeradas);
      } catch (error) {
        console.error('Erro ao recuperar resultado:', error);
      }
    } else {
      // Se não houver resultado, redireciona para a página de análise
      router.push('/analise');
    }
    
    setLoading(false);
  }, [router]);
  
  // Função para gerar metas personalizadas com base no resultado
  const gerarMetas = (resultado: AnaliseResult): Meta[] => {
    const metas: Meta[] = [];
    
    // Analisa as categorias para gerar metas específicas
    resultado.categorias.forEach(categoria => {
      if (categoria.nome.toLowerCase().includes('alimentação') || 
          categoria.nome.toLowerCase().includes('delivery') ||
          categoria.nome.toLowerCase().includes('restaurante')) {
        metas.push({
          titulo: 'Corte 30% de gastos em lanches',
          descricao: 'Você gasta muito em alimentação fora. Tente cozinhar mais em casa e limitar os deliveries.',
          status: 'pendente'
        });
      }
      
      if (categoria.nome.toLowerCase().includes('transporte') || 
          categoria.nome.toLowerCase().includes('uber') ||
          categoria.nome.toLowerCase().includes('táxi')) {
        metas.push({
          titulo: 'Reduza em 50% os gastos com transporte',
          descricao: 'Use mais transporte público ou caminhe quando possível. Seu bolso e sua saúde agradecem.',
          status: 'pendente'
        });
      }
      
      if (categoria.nome.toLowerCase().includes('cartão') || 
          categoria.nome.toLowerCase().includes('fatura')) {
        metas.push({
          titulo: 'Pague a fatura do cartão em dia',
          descricao: 'Evite juros e multas. Programe-se para pagar a fatura antes do vencimento.',
          status: 'pendente'
        });
      }
    });
    
    // Adiciona metas gerais baseadas na nota
    if (resultado.nota < 5) {
      metas.push({
        titulo: 'Crie um orçamento mensal',
        descricao: 'Defina limites para cada categoria de gasto e siga-os rigorosamente.',
        status: 'pendente'
      });
    }
    
    // Adiciona meta para revisar assinaturas
    metas.push({
      titulo: 'Revise assinaturas que você nem lembra que tem',
      descricao: 'Cancele serviços que não usa ou que podem ser substituídos por alternativas gratuitas.',
      status: 'pendente'
    });
    
    // Adiciona meta para alertas de Pix
    metas.push({
      titulo: 'Ative um aviso se fizer Pix acima de R$100 à noite',
      descricao: 'Gastos noturnos costumam ser impulsivos. Configure um alerta para evitar vacilos.',
      status: 'pendente'
    });
    
    // Limita a 3 metas para não sobrecarregar
    return metas.slice(0, 3);
  };
  
  const handleVoltar = () => {
    router.push('/resultado');
  };
  
  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12 text-center">
          <p className="text-xl">Carregando seu plano personalizado...</p>
        </div>
      </main>
    );
  }
  
  if (!resultado || metas.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 pt-24 pb-12 text-center">
          <p className="text-xl">Nenhum plano encontrado.</p>
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
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Seu Plano de Recuperação</h1>
            <p className="text-xl text-gray-600">
              Metas personalizadas para melhorar sua nota de {resultado.nota.toFixed(1)} para 10
            </p>
          </div>
          
          <div className="space-y-6">
            {metas.map((meta, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-gray-600 font-semibold">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{meta.titulo}</h3>
                    <p className="text-gray-600">{meta.descricao}</p>
                    <div className="mt-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                        meta.status === 'pendente' ? 'bg-yellow-100 text-yellow-800' :
                        meta.status === 'em-andamento' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {meta.status === 'pendente' ? 'Pendente' :
                         meta.status === 'em-andamento' ? 'Em andamento' :
                         'Concluída'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <button 
              onClick={handleVoltar}
              className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg mr-4 hover:bg-gray-300 transition-colors"
            >
              Voltar
            </button>
            <button 
              className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Salvar meu plano
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 