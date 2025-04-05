import { AnaliseResult } from './openai';

interface Analise {
  id: string;
  data: string;
  resultado: AnaliseResult;
  premium: boolean;
}

// Armazenamento em memória (temporário)
let analises: Analise[] = [];

export async function getAnalises(): Promise<Analise[]> {
  console.log('Analises - Obtendo análises:', {
    totalAnalises: analises.length,
    analises: analises.map(a => ({
      id: a.id,
      data: a.data,
      premium: a.premium,
      categoriasLength: a.resultado.categorias.length
    }))
  });
  return analises;
}

export async function getAnalise(id: string): Promise<Analise | null> {
  console.log('Analises - Obtendo análise por ID:', id);
  const analise = analises.find(a => a.id === id);
  console.log('Analises - Resultado da busca:', {
    encontrado: !!analise,
    analise: analise ? {
      id: analise.id,
      data: analise.data,
      premium: analise.premium,
      categoriasLength: analise.resultado.categorias.length
    } : null
  });
  return analise || null;
}

export async function saveAnalise(analise: Analise): Promise<void> {
  console.log('Analises - Salvando análise:', {
    id: analise.id,
    data: analise.data,
    premium: analise.premium,
    categoriasLength: analise.resultado.categorias.length
  });
  
  // Remover análise existente com o mesmo ID (se houver)
  analises = analises.filter(a => a.id !== analise.id);
  
  // Adicionar nova análise
  analises.push(analise);
  
  console.log('Analises - Análise salva com sucesso:', {
    totalAnalises: analises.length,
    analises: analises.map(a => ({
      id: a.id,
      data: a.data,
      premium: a.premium,
      categoriasLength: a.resultado.categorias.length
    }))
  });
} 