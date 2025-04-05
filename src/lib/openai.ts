import OpenAI from 'openai';

// Inicializa o cliente OpenAI
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('ERRO: Chave da API da OpenAI não encontrada!');
  throw new Error('Configuração da OpenAI ausente. Verifique as variáveis de ambiente.');
}

console.log('API Key configurada com sucesso');

const openai = new OpenAI({
  apiKey: apiKey,
  maxRetries: 3,
  timeout: 30000,
});

// Interface para o resultado da análise
export interface AnaliseResult {
  nota: number;
  vaciloDoMes: string;
  resumo: string;
  fraseFinal: string;
  perfilDoUsuario: string;
  categorias: Array<{
    nome: string;
    valor: number;
    percentual?: number;
    subcategoria?: string;
  }>;
  transacoes: Array<{
    data: string;
    descricao: string;
    valor: number;
    categoria?: string;
  }>;
  transacoesDestaque: Array<{
    data: string;
    descricao: string;
    valor: number;
    categoria?: string;
    motivo?: string;
  }>;
  gastosPorDia?: number[];
  gastosPorHora?: number[];
  comparativoMensal?: number[];
}

// Função para esperar um tempo antes de tentar novamente
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Função para verificar se um erro é de limite de taxa ou cota
function isQuotaError(error: any): boolean {
  if (!error) return false;
  
  // Verificar se é um erro da API da OpenAI
  if (error instanceof OpenAI.APIError) {
    return error.status === 429 || error.status === 402;
  }
  
  // Verificar a mensagem de erro
  const mensagem = (error instanceof Error ? error.message : String(error)).toLowerCase();
  return mensagem.includes('limite de requisições') || 
         mensagem.includes('rate limit') || 
         mensagem.includes('429') ||
         mensagem.includes('too many requests') ||
         mensagem.includes('quota') ||
         mensagem.includes('billing') ||
         mensagem.includes('payment');
}

// Função para analisar o extrato
export async function analisarExtrato(extrato: string): Promise<AnaliseResult> {
  console.log('OpenAI - Iniciando análise do extrato');
  
  try {
    console.log('Iniciando análise do extrato...');
    console.log(`Tamanho do extrato: ${extrato.length} caracteres`);
    
    // Verificar se o extrato está vazio
    if (!extrato || extrato.trim() === '') {
      console.error('Extrato vazio');
      throw new Error('Extrato vazio');
    }
    
    // Processar o extrato para remover caracteres desnecessários
    extrato = extrato
      .replace(/\r\n/g, '\n') // Normaliza quebras de linha
      .replace(/\s+/g, ' ') // Remove espaços extras
      .trim();
    
    // Verificar se o extrato é muito grande
    if (extrato.length > 50000) {
      console.log(`Extrato muito grande (${extrato.length} caracteres), processando em partes...`);
      
      // Dividir o extrato em linhas
      const linhas = extrato.split('\n');
      console.log(`Total de linhas: ${linhas.length}`);
      
      // Se houver muitas linhas, pegar uma amostra representativa
      if (linhas.length > 100) {
        const amostra = [
          ...linhas.slice(0, 10), // Primeiras 10 linhas
          ...linhas.slice(Math.floor(linhas.length / 2) - 5, Math.floor(linhas.length / 2) + 5), // 10 linhas do meio
          ...linhas.slice(-10) // Últimas 10 linhas
        ];
        
        console.log(`Reduzindo para amostra de ${amostra.length} linhas`);
        extrato = amostra.join('\n');
      } else {
        // Se não houver muitas linhas, trunca para 50000 caracteres
        extrato = extrato.substring(0, 50000);
      }
    }
    
    // Verificar se o extrato parece ser um PDF (começa com %PDF-)
    if (extrato.includes('%PDF-')) {
      console.log('Detectado conteúdo de PDF, tentando extrair texto...');
      // Tenta extrair apenas o texto do PDF
      extrato = extrato.replace(/%PDF-.*?stream\s*/g, '')
                      .replace(/endstream\s*/g, '')
                      .replace(/\[.*?\]/g, '')
                      .replace(/\(.*?\)/g, '')
                      .replace(/\s+/g, ' ')
                      .trim();
      
      console.log(`Texto extraído do PDF. Tamanho: ${extrato.length} caracteres`);
      
      if (extrato.length < 100) {
        console.error('Texto extraído do PDF muito pequeno, pode ser inválido');
        throw new Error('Não foi possível extrair texto válido do PDF');
      }
    }
    
    // Prompt simplificado para a OpenAI
    const prompt = `Analise o seguinte extrato bancário da XP e retorne um objeto JSON com os seguintes campos:
- nota: número de 0 a 10 representando a saúde financeira
- vaciloDoMes: string com o maior erro financeiro do período
- resumo: string com análise dos gastos
- fraseFinal: string com uma frase sarcástica ou reflexiva
- perfilDoUsuario: string com diagnóstico do comportamento
- categorias: array de objetos com {nome, valor, percentual, subcategoria?}
- transacoes: array de objetos com {data, descricao, valor, categoria}
- transacoesDestaque: array com EXATAMENTE 5 objetos contendo {data, descricao, valor, comentario}

IMPORTANTE SOBRE AS TRANSAÇÕES DESTAQUE:
1. É OBRIGATÓRIO retornar EXATAMENTE 5 transações, sendo:
   - As 3 maiores SAÍDAS (valores negativos)
   - As 2 maiores ENTRADAS (valores positivos)
2. Para cada transação:
   - data: formato "DD/MM"
   - descricao: versão resumida e clara (ex: "Pix pra Jaqueline", "iFood")
   - valor: número (negativo para saídas, positivo para entradas)
   - comentario: frase sarcástica sobre o gasto ou a entrada

Exemplo de transacoesDestaque:
[
  {
    "data": "15/03",
    "descricao": "Salário",
    "valor": 5000.00,
    "comentario": "Ah, então é por isso que você gasta tanto... mas cadê a poupança?"
  },
  {
    "data": "12/03",
    "descricao": "Aluguel",
    "valor": -2500.00,
    "comentario": "Metade do salário só pra ter um teto... tá mais pra teto de gastos"
  }
]

LEMBRE-SE: É OBRIGATÓRIO retornar EXATAMENTE 5 transações destaque, sendo 3 maiores saídas e 2 maiores entradas.

Retorne APENAS o objeto JSON, sem texto adicional.

Extrato:
${extrato}`;

    console.log('Enviando prompt para a OpenAI...');
    
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          {
            role: "system",
            content: `Você é um assistente especializado em análise financeira.
            Analise o extrato bancário fornecido e retorne um objeto JSON com a seguinte estrutura:
            {
              "nota": número de 0 a 10 representando a saúde financeira,
              "vaciloDoMes": string identificando o maior gasto desnecessário,
              "resumo": string com um resumo da análise,
              "fraseFinal": string com uma frase motivacional,
              "perfilDoUsuario": string descrevendo o perfil de gastos,
              "categorias": array de objetos com {nome: string, valor: number, subcategoria?: string},
              "transacoes": array de objetos com {data: string, descricao: string, valor: number, categoria?: string},
              "transacoesDestaque": array de objetos com {data: string, descricao: string, valor: number, categoria?: string, motivo?: string}
            }`
          },
          {
            role: "user",
            content: extrato
          }
        ],
        response_format: { type: "json_object" }
      });

      console.log('OpenAI - Resposta recebida');
      
      const resultado = JSON.parse(completion.choices[0].message.content || '{}');
      console.log('OpenAI - Resultado parseado:', {
        temCategorias: 'categorias' in resultado,
        categoriasLength: resultado.categorias?.length,
        categorias: resultado.categorias?.map((c: any) => ({
          nome: c.nome,
          valor: c.valor,
          subcategoria: c.subcategoria
        }))
      });

      // Validar e garantir que todos os campos necessários existam
      const resultadoValidado: AnaliseResult = {
        nota: typeof resultado.nota === 'number' ? resultado.nota : 0,
        vaciloDoMes: resultado.vaciloDoMes || "Não identificado",
        resumo: resultado.resumo || "Não foi possível gerar um resumo.",
        fraseFinal: resultado.fraseFinal || "Não foi possível gerar uma frase final.",
        perfilDoUsuario: resultado.perfilDoUsuario || "Perfil não identificado",
        categorias: Array.isArray(resultado.categorias) ? resultado.categorias.map((cat: any) => ({
          ...cat,
          valor: typeof cat.valor === 'number' ? cat.valor : 0,
          percentual: typeof cat.percentual === 'number' ? cat.percentual : 0
        })) : [],
        transacoes: Array.isArray(resultado.transacoes) ? resultado.transacoes.map((t: any) => ({
          ...t,
          valor: typeof t.valor === 'number' ? t.valor : 0
        })) : [],
        transacoesDestaque: Array.isArray(resultado.transacoesDestaque) ? resultado.transacoesDestaque.map((t: any) => ({
          ...t,
          valor: typeof t.valor === 'number' ? t.valor : 0
        })) : []
      };

      console.log('OpenAI - Resultado validado:', {
        temCategorias: 'categorias' in resultadoValidado,
        categoriasLength: resultadoValidado.categorias.length,
        categorias: resultadoValidado.categorias.map(c => ({
          nome: c.nome,
          valor: c.valor,
          percentual: c.percentual,
          subcategoria: c.subcategoria
        }))
      });

      return resultadoValidado;
    } catch (error) {
      console.error('OpenAI - Erro ao analisar extrato:', error);
      throw error;
    }
  } catch (error) {
    console.error('Erro ao analisar extrato:', error);
    throw error;
  }
} 