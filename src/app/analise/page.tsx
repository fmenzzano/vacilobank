'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnaliseResult } from '@/lib/openai';
import GastoPorCategoria from '@/components/GastoPorCategoria';
import FluxoCaixa from '@/components/FluxoCaixa';

function AnaliseContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [resultado, setResultado] = useState<AnaliseResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 30;
  
  // Array de CTAs para teste A/B
  const ctas = [
    {
      texto: "Me dá um plano antes que eu gaste de novo",
      subtexto: "R$19,90/mês – Cancelamento fácil, igual suas desculpas"
    },
    {
      texto: "Descobri que tô gastando errado. Agora quero gastar certo.",
      subtexto: "R$19,90/mês – Porque aprender com os próprios erros é mais barato"
    },
    {
      texto: "Tá bom, IA. Me ajuda antes que eu vire estatística.",
      subtexto: "R$19,90/mês – Sua carteira agradece, seu banco nem tanto"
    },
    {
      texto: "Vou pagar R$19,90 pra parar de pagar R$490 à toa.",
      subtexto: "Melhor investimento do mês, garanto."
    }
  ];
  
  // Seleciona um CTA aleatório ao carregar a página
  const [selectedCta] = useState(() => {
    const randomIndex = Math.floor(Math.random() * ctas.length);
    return ctas[randomIndex];
  });

  useEffect(() => {
    if (!id) {
      setError('ID de análise não encontrado');
      setLoading(false);
      return;
    }

    const fetchResultado = async () => {
      try {
        const response = await fetch(`/api/analise?id=${id}`);
        if (!response.ok) {
          if (response.status === 402) {
            window.location.href = '/assinatura';
            return;
          }
          throw new Error('Erro ao carregar análise');
        }
        const data = await response.json();
        
        // Log para verificar os dados recebidos
        console.log('Dados recebidos da API:', data);
        
        // Validar os dados recebidos
        if (!data || typeof data !== 'object') {
          throw new Error('Dados inválidos recebidos da API');
        }

        // Garantir que todos os campos necessários existam
        const resultadoValidado: AnaliseResult = {
          nota: typeof data.nota === 'number' ? data.nota : 0,
          vaciloDoMes: data.vaciloDoMes || "Não identificado",
          resumo: data.resumo || "Não foi possível gerar um resumo.",
          fraseFinal: data.fraseFinal || "Não foi possível gerar uma frase final.",
          perfilDoUsuario: data.perfilDoUsuario || "Perfil não identificado",
          categorias: Array.isArray(data.categorias) ? data.categorias.map((cat: any) => ({
            ...cat,
            valor: typeof cat.valor === 'number' ? cat.valor : 0,
            percentual: typeof cat.percentual === 'number' ? cat.percentual : 0
          })) : [],
          transacoes: Array.isArray(data.transacoes) ? data.transacoes.map((t: any) => ({
            ...t,
            valor: typeof t.valor === 'number' ? t.valor : 0
          })) : [],
          transacoesDestaque: Array.isArray(data.transacoesDestaque) ? data.transacoesDestaque.map((t: any) => ({
            ...t,
            valor: typeof t.valor === 'number' ? t.valor : 0
          })) : []
        };

        // Log dos dados validados
        console.log('Dados validados:', resultadoValidado);
        
        // Log específico para categorias
        console.log('Categorias processadas:', resultadoValidado.categorias);
        
        // Calcular percentuais das categorias
        const totalGastos = Math.abs(resultadoValidado.transacoes
          .filter(t => t.valor < 0)
          .reduce((acc, t) => acc + t.valor, 0));
          
        resultadoValidado.categorias = resultadoValidado.categorias.map(cat => ({
          ...cat,
          percentual: totalGastos > 0 ? Math.round((Math.abs(cat.valor) / totalGastos) * 100) : 0
        }));

        // Log para verificar os dados validados
        console.log('Dados validados:', resultadoValidado);
        console.log('Transações:', resultadoValidado.transacoes);
        console.log('Transações Destaque:', resultadoValidado.transacoesDestaque);
        console.log('Categorias com percentuais:', resultadoValidado.categorias.map(c => ({
          nome: c.nome,
          valor: c.valor,
          percentual: c.percentual
        })));
        
        // Garantir que transacoesDestaque seja sempre um array
        if (!Array.isArray(resultadoValidado.transacoesDestaque)) {
          resultadoValidado.transacoesDestaque = [];
        }

        // Ordenar transacoesDestaque por valor absoluto (maiores valores primeiro)
        resultadoValidado.transacoesDestaque.sort((a, b) => Math.abs(b.valor) - Math.abs(a.valor));

        setResultado(resultadoValidado);
      } catch (err) {
        setError('Não foi possível carregar sua análise. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResultado();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Analisando seus vacilos...</p>
        </div>
      </div>
    );
  }

  if (error || !resultado) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-6 bg-white rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ops! Algo deu errado</h2>
          <p className="text-gray-600 mb-6">{error || 'Não foi possível carregar sua análise'}</p>
          <Link 
            href="/" 
            className="inline-block px-6 py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-colors"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    );
  }

  // Função para verificar se uma transação tem as propriedades corretas
  const isTransacaoValida = (transacao: any): transacao is { data: string; descricao: string; valor: number; categoria: string } => {
    return transacao && 
           typeof transacao === 'object' && 
           'data' in transacao && 
           'descricao' in transacao && 
           'valor' in transacao && 
           'categoria' in transacao;
  };

  // Função para mudar de página
  const mudarPagina = (pagina: number) => {
    setPaginaAtual(pagina);
    window.scrollTo({
      top: document.getElementById('tabela-transacoes')?.offsetTop,
      behavior: 'smooth'
    });
  };

  // Função para renderizar os botões de paginação
  const renderizarPaginacao = (totalItens: number) => {
    const totalPaginas = Math.ceil(totalItens / itensPorPagina);
    
    if (totalPaginas <= 1) return null;
    
    return (
      <div className="mt-4 flex justify-center items-center gap-2">
        <button
          onClick={() => mudarPagina(paginaAtual - 1)}
          disabled={paginaAtual === 1}
          className={`px-3 py-1 rounded ${
            paginaAtual === 1 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          Anterior
        </button>
        <span className="text-gray-600">
          Página {paginaAtual} de {totalPaginas}
        </span>
        <button
          onClick={() => mudarPagina(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
          className={`px-3 py-1 rounded ${
            paginaAtual === totalPaginas
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          Próxima
        </button>
      </div>
    );
  };

  // Calcular índices para paginação
  const indiceInicial = (paginaAtual - 1) * itensPorPagina;
  const indiceFinal = indiceInicial + itensPorPagina;
  const transacoesPaginadas = resultado.transacoes.slice(indiceInicial, indiceFinal);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Seção de Saúde Financeira */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Saúde Financeira</h2>
            <div className="flex items-center mb-4">
              <div className="text-4xl font-bold text-purple-600">{resultado.nota}</div>
              <div className="ml-4">
                <div className="text-sm text-gray-500">de 10</div>
                <div className="text-lg font-medium text-gray-900">{resultado.perfilDoUsuario}</div>
              </div>
            </div>
            <div className="text-gray-600">{resultado.resumo}</div>
          </div>

          {/* Seção de Vacilo do Mês */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vacilo do Mês</h2>
            <div className="text-gray-600 mb-4">{resultado.vaciloDoMes}</div>
            <div className="text-sm text-gray-500 italic">{resultado.fraseFinal}</div>
          </div>
        </div>

        {/* Seção de Gastos por Categoria */}
        <div className="mt-6">
          <GastoPorCategoria data={resultado} />
        </div>

        {/* Seção de Fluxo de Caixa */}
        <div className="mt-6">
          <FluxoCaixa data={resultado} />
        </div>

        {/* Seção de Transações em Destaque */}
        <div className="mt-6 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Transações em Destaque</h2>
          <div className="space-y-4">
            {resultado.transacoesDestaque.map((transacao, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium text-gray-900">{transacao.descricao}</div>
                    <div className="text-sm text-gray-500">{transacao.data}</div>
                  </div>
                  <div className={`font-medium ${transacao.valor < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {transacao.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600 italic">{transacao.motivo}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção de Todas as Transações */}
        <div id="tabela-transacoes" className="mt-6 bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Todas as Transações</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transacoesPaginadas.map((transacao, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transacao.data}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transacao.descricao}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transacao.categoria}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium text-right ${
                      transacao.valor < 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transacao.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {renderizarPaginacao(resultado.transacoes.length)}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link 
            href="/assinatura" 
            className="inline-block px-8 py-4 bg-black text-white font-bold rounded-lg hover:bg-gray-900 transition-colors"
          >
            {selectedCta.texto}
          </Link>
          <p className="mt-2 text-sm text-gray-500">{selectedCta.subtexto}</p>
        </div>
      </div>
    </div>
  );
}

export default function AnalisePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando análise...</p>
        </div>
      </div>
    }>
      <AnaliseContent />
    </Suspense>
  );
} 