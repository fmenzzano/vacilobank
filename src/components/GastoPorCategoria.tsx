import React from 'react';
import { AnaliseResult } from '@/lib/openai';

interface GastoPorCategoriaProps {
  data: AnaliseResult;
}

export default function GastoPorCategoria({ data }: GastoPorCategoriaProps) {
  // Log inicial dos dados recebidos
  console.log('GastoPorCategoria - Dados recebidos:', {
    data,
    temCategorias: 'categorias' in data,
    tipoCategorias: typeof data.categorias,
    isArrayCategorias: Array.isArray(data.categorias),
    categoriasLength: data.categorias?.length
  });

  // Garantir que categorias seja um array
  const categorias = Array.isArray(data.categorias) ? data.categorias : [];
  
  // Log após garantir que é um array
  console.log('GastoPorCategoria - Categorias após validação:', {
    categoriasLength: categorias.length,
    categorias: categorias.map(c => ({
      nome: c.nome,
      valor: c.valor,
      percentual: c.percentual,
      subcategoria: c.subcategoria
    }))
  });
  
  // Ordenar categorias por valor (decrescente)
  const categoriasOrdenadas = [...categorias].sort((a, b) => {
    const valorA = typeof a.valor === 'number' ? a.valor : 0;
    const valorB = typeof b.valor === 'number' ? b.valor : 0;
    return valorB - valorA;
  });
  
  // Log após ordenação
  console.log('GastoPorCategoria - Categorias ordenadas:', {
    categoriasOrdenadas: categoriasOrdenadas.map(c => ({
      nome: c.nome,
      valor: c.valor,
      percentual: c.percentual,
      subcategoria: c.subcategoria
    }))
  });
  
  // Função para formatar valores monetários
  const formatarValor = (valor: number | undefined) => {
    if (valor === undefined || isNaN(valor)) return 'R$ 0,00';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };
  
  // Função para determinar a cor com base na categoria
  const getCorCategoria = (nome: string) => {
    const nomeLower = nome.toLowerCase();
    
    if (nomeLower.includes('alimentação') || nomeLower.includes('delivery') || nomeLower.includes('restaurante')) {
      return 'bg-red-500';
    } else if (nomeLower.includes('transporte') || nomeLower.includes('uber') || nomeLower.includes('táxi')) {
      return 'bg-blue-500';
    } else if (nomeLower.includes('lazer') || nomeLower.includes('entretenimento')) {
      return 'bg-green-500';
    } else if (nomeLower.includes('cartão') || nomeLower.includes('fatura')) {
      return 'bg-yellow-500';
    } else if (nomeLower.includes('transferência') || nomeLower.includes('pix')) {
      return 'bg-purple-500';
    } else {
      return 'bg-gray-500';
    }
  };
  
  // Função para determinar o emoji com base na categoria
  const getEmojiCategoria = (nome: string) => {
    const nomeLower = nome.toLowerCase();
    
    if (nomeLower.includes('alimentação') || nomeLower.includes('delivery') || nomeLower.includes('restaurante')) {
      return '🍕';
    } else if (nomeLower.includes('transporte') || nomeLower.includes('uber') || nomeLower.includes('táxi')) {
      return '🚗';
    } else if (nomeLower.includes('lazer') || nomeLower.includes('entretenimento')) {
      return '🎮';
    } else if (nomeLower.includes('cartão') || nomeLower.includes('fatura')) {
      return '💳';
    } else if (nomeLower.includes('transferência') || nomeLower.includes('pix')) {
      return '💸';
    } else {
      return '📦';
    }
  };
  
  // Calcular o valor total de gastos para normalizar as barras de progresso
  const totalGastos = categorias.reduce((total, cat) => {
    const valor = typeof cat.valor === 'number' ? cat.valor : 0;
    return total + Math.abs(valor);
  }, 0);
  
  // Log do total de gastos
  console.log('GastoPorCategoria - Total de gastos:', totalGastos);
  
  if (categorias.length === 0) {
    console.log('GastoPorCategoria - Nenhuma categoria encontrada');
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Gastos por Categoria</h3>
        <p className="text-gray-600">Nenhuma categoria de gasto encontrada.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Gastos por Categoria</h3>
      
      <div className="space-y-6 divide-y divide-gray-200">
        {categoriasOrdenadas.map((categoria, index) => {
          const valor = typeof categoria.valor === 'number' ? categoria.valor : 0;
          const percentual = totalGastos > 0 ? (Math.abs(valor) / totalGastos) * 100 : 0;
          const corCategoria = getCorCategoria(categoria.nome);
          const emojiCategoria = getEmojiCategoria(categoria.nome);
          
          // Log de cada categoria sendo renderizada
          console.log('GastoPorCategoria - Renderizando categoria:', {
            index,
            nome: categoria.nome,
            valor,
            percentual,
            corCategoria,
            emojiCategoria
          });
          
          return (
            <div key={index} className="pt-4 first:pt-0">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="font-medium text-gray-800">{categoria.nome}</span>
                  {categoria.subcategoria && (
                    <span className="ml-2 text-sm text-gray-500">({categoria.subcategoria})</span>
                  )}
                  <span className="ml-2 text-sm">{emojiCategoria}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{formatarValor(valor)}</div>
                  <div className="text-xs text-gray-500">{Math.round(percentual)}% do total</div>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div 
                  className={`h-2.5 rounded-full ${corCategoria}`} 
                  style={{ width: `${percentual}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 