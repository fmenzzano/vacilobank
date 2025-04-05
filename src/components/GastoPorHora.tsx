import React from 'react';
import { AnaliseResult } from '@/lib/openai';

interface GastoPorHoraProps {
  data: AnaliseResult;
}

export default function GastoPorHora({ data }: GastoPorHoraProps) {
  const { gastosPorHora } = data;

  if (!gastosPorHora || gastosPorHora.length === 0) {
    return null;
  }

  const formatarValor = (valor: number | undefined) => {
    if (valor === undefined || isNaN(valor)) return 'R$ 0,00';
    return `R$${valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Gastos por Hora</h3>
      <div className="space-y-4">
        {gastosPorHora.map((valor, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-gray-600">{index}h</span>
            <span className="font-medium">{formatarValor(valor)}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 