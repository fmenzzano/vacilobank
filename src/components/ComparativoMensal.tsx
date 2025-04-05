import React from 'react';
import { AnaliseResult } from '@/lib/openai';

interface ComparativoMensalProps {
  data: AnaliseResult;
}

export default function ComparativoMensal({ data }: ComparativoMensalProps) {
  const { comparativoMensal } = data;

  if (!comparativoMensal || comparativoMensal.length === 0) {
    return null;
  }

  const formatarValor = (valor: number | undefined) => {
    if (valor === undefined || isNaN(valor)) return 'R$ 0,00';
    return `R$${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  // Nomes dos meses para exibição
  const nomesMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Comparativo Mensal</h3>
      <div className="space-y-4">
        {comparativoMensal.map((valor, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">{nomesMeses[index]}</span>
            <span className="font-medium">{formatarValor(valor)}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 