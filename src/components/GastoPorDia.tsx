import React from 'react';
import { AnaliseResult } from '@/lib/openai';

interface GastoPorDiaProps {
  data: AnaliseResult;
}

export default function GastoPorDia({ data }: GastoPorDiaProps) {
  const { gastosPorDia } = data;

  if (!gastosPorDia || gastosPorDia.length === 0) {
    return null;
  }

  const formatarValor = (valor: number | undefined) => {
    if (valor === undefined || isNaN(valor)) return 'R$ 0,00';
    return `R$${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Gastos por Dia</h3>
      <div className="space-y-4">
        {gastosPorDia.map((valor, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">Dia {index + 1}</span>
            <span className="font-medium">{formatarValor(valor)}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 