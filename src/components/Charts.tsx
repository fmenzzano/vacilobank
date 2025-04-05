import React from 'react';
import { AnaliseResult } from '@/lib/openai';

interface ChartProps {
  data: AnaliseResult;
}

export default function Charts({ data }: ChartProps) {
  // Função para garantir que um valor seja um número válido
  const garantirNumero = (valor: any): number => {
    if (typeof valor === 'number' && !isNaN(valor)) return valor;
    const num = Number(valor);
    return isNaN(num) ? 0 : num;
  };

  // Função para garantir que um array contenha apenas números válidos
  const garantirArrayNumeros = (arr: any[]): number[] => {
    if (!Array.isArray(arr)) return [];
    return arr.map(garantirNumero);
  };

  // Processa os dados garantindo que são números válidos
  const gastosPorDia = garantirArrayNumeros(data.gastosPorDia || []);
  const gastosPorHora = garantirArrayNumeros(data.gastosPorHora || []);
  const comparativoMensal = garantirArrayNumeros(data.comparativoMensal || []);
  
  // Processa as categorias garantindo que todos os valores numéricos são válidos
  const categorias = Array.isArray(data.categorias) 
    ? data.categorias.map(categoria => ({
        ...categoria,
        valor: garantirNumero(categoria.valor),
        percentual: garantirNumero(categoria.percentual)
      }))
    : [];

  // Função para calcular a altura do gráfico de forma segura
  const calcularAlturaSegura = (valor: number, maxValor: number): string => {
    // Garante que os valores são números válidos
    const valorSeguro = garantirNumero(valor);
    const maxValorSeguro = garantirNumero(maxValor);
    
    // Se o valor máximo for 0 ou inválido, retorna 0%
    if (maxValorSeguro <= 0) return '0%';
    
    // Calcula a porcentagem e garante que é um número válido
    const porcentagem = (valorSeguro / maxValorSeguro) * 100;
    return `${Math.min(Math.max(0, porcentagem), 100)}%`;
  };

  // Função para renderizar um gráfico de barras
  const renderizarGraficoBarras = (
    dados: number[], 
    cor: string, 
    renderizarLabel: (index: number) => string
  ) => {
    if (dados.length === 0) return null;
    
    const maxValor = Math.max(...dados);
    
    return (
      <div className="flex h-full items-end space-x-2">
        {dados.map((valor, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className={`w-full ${cor} rounded-t`}
              style={{ height: calcularAlturaSegura(valor, maxValor) }}
            />
            <span className="text-xs text-gray-500 mt-2">
              {renderizarLabel(index)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Gráfico de Gastos por Dia */}
      {gastosPorDia.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Gastos por Dia</h3>
          <div className="h-64">
            {renderizarGraficoBarras(
              gastosPorDia,
              'bg-blue-500',
              (index) => `Dia ${index + 1}`
            )}
          </div>
        </div>
      )}

      {/* Gráfico de Gastos por Hora */}
      {gastosPorHora.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Gastos por Hora do Dia</h3>
          <div className="h-64">
            {renderizarGraficoBarras(
              gastosPorHora,
              'bg-green-500',
              (index) => `${index}h`
            )}
          </div>
        </div>
      )}

      {/* Gráfico Comparativo Mensal */}
      {comparativoMensal.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Comparativo Mensal</h3>
          <div className="h-64">
            {renderizarGraficoBarras(
              comparativoMensal,
              'bg-purple-500',
              (index) => {
                const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
                return meses[index % 12];
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
} 