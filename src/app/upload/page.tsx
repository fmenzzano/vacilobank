'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Verifica o tamanho do arquivo (limite de 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('O arquivo é muito grande. O tamanho máximo permitido é 5MB.');
        return;
      }
      
      if (selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Por favor, selecione um arquivo PDF ou CSV');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf' || droppedFile.name.endsWith('.csv')) {
        setFile(droppedFile);
        setError('');
      } else {
        setError('Por favor, selecione um arquivo PDF ou CSV');
      }
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result) {
          try {
            // Lê o arquivo como texto, independente do tipo
            const content = e.target.result as string;
            console.log(`Arquivo lido com sucesso. Tamanho: ${content.length} caracteres`);
            console.log(`Tipo do arquivo: ${file.type}`);
            console.log(`Primeiros 100 caracteres: ${content.substring(0, 100)}`);
            
            // Verifica se o conteúdo está vazio ou muito grande
            if (!content || content.trim() === '') {
              console.error('Arquivo vazio ou conteúdo inválido');
              reject(new Error('O arquivo está vazio ou não pode ser lido corretamente'));
              return;
            }
            
            // Verifica se o conteúdo parece ser um PDF (começa com %PDF-)
            if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
              if (!content.includes('%PDF-')) {
                console.log('Arquivo PDF detectado, mas não contém cabeçalho PDF. Tentando processar mesmo assim...');
              } else {
                console.log('Arquivo PDF válido detectado');
              }
              
              // Tenta extrair apenas o texto do PDF
              let processedContent = content;
              
              // Remove cabeçalhos e rodapés do PDF
              processedContent = processedContent.replace(/%PDF-.*?stream\s*/g, '')
                                              .replace(/endstream\s*/g, '')
                                              .replace(/\[.*?\]/g, '')
                                              .replace(/\(.*?\)/g, '')
                                              .replace(/\s+/g, ' ')
                                              .trim();
              
              console.log(`Conteúdo processado do PDF. Tamanho: ${processedContent.length} caracteres`);
              
              if (processedContent.length < 100) {
                console.error('Texto extraído do PDF muito pequeno, pode ser inválido');
                reject(new Error('Não foi possível extrair texto válido do PDF'));
                return;
              }
              
              resolve(processedContent);
            } else {
              // Para arquivos que não são PDF, usa o conteúdo original
              if (content.length > 50000) {
                console.log('Arquivo muito grande, truncando para 50000 caracteres');
                resolve(content.substring(0, 50000));
              } else {
                resolve(content);
              }
            }
          } catch (error) {
            console.error('Erro ao processar o conteúdo do arquivo:', error);
            reject(new Error('Erro ao processar o conteúdo do arquivo'));
          }
        } else {
          console.error('Falha ao ler o arquivo: resultado vazio');
          reject(new Error('Falha ao ler o arquivo'));
        }
      };
      
      reader.onerror = (error) => {
        console.error('Erro ao ler arquivo:', error);
        reject(new Error('Erro ao ler o arquivo'));
      };
      
      // Lê sempre como texto
      reader.readAsText(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Por favor, selecione um arquivo');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      console.log(`Iniciando processamento do arquivo: ${file.name}, tamanho: ${file.size} bytes, tipo: ${file.type}`);
      
      // Lê o conteúdo do arquivo
      const fileContent = await readFileContent(file);
      console.log(`Conteúdo do arquivo lido com sucesso. Tamanho: ${fileContent.length} caracteres`);
      
      // Envia para a API
      console.log('Enviando conteúdo para a API...');
      const response = await fetch('/api/analise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ extrato: fileContent }),
      });

      console.log(`Resposta da API recebida. Status: ${response.status}`);
      
      if (!response.ok) {
        let errorMessage = 'Erro interno do servidor';
        try {
          const errorData = await response.json();
          console.error('Erro na resposta da API:', errorData);
          errorMessage = errorData.error || errorMessage;
        } catch (parseError) {
          console.error('Erro ao parsear resposta de erro:', parseError);
        }
        
        if (response.status === 402) {
          router.push('/assinatura');
          return;
        }
        
        throw new Error(errorMessage);
      }

      let result;
      try {
        result = await response.json();
        console.log('Resultado da API:', result);
      } catch (parseError) {
        console.error('Erro ao parsear resposta da API:', parseError);
        throw new Error('Erro ao processar a resposta da API');
      }
      
      if (!result || !result.id) {
        console.error('Resposta da API inválida:', result);
        throw new Error('Resposta da API inválida');
      }
      
      // Redireciona para a página de análise com o ID
      router.push(`/analise?id=${result.id}`);
    } catch (err) {
      console.error('Erro ao processar arquivo:', err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao processar o arquivo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Análise Financeira Sincera
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Cole o extrato e descubra o que seu banco nunca teve coragem de te dizer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">Como Funciona</span>
                <span className="text-xl">🎯</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 text-purple-600 font-bold text-sm">
                      1
                    </span>
                  </div>
                  <p className="ml-4 text-gray-600">
                    Baixe o PDF ou CSV do seu banco
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 text-purple-600 font-bold text-sm">
                      2
                    </span>
                  </div>
                  <p className="ml-4 text-gray-600">
                    Cole o conteúdo aqui ao lado
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 text-purple-600 font-bold text-sm">
                      3
                    </span>
                  </div>
                  <p className="ml-4 text-gray-600">
                    Leia a verdade com bom humor
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6">
              <div 
                className={`border-dashed border-2 rounded-lg p-8 text-center transition-colors ${
                  isDragging 
                    ? 'border-purple-500 bg-purple-50' 
                    : file 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-purple-300 hover:border-purple-500 hover:bg-purple-50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  accept=".csv,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                
                <label 
                  htmlFor="file-upload" 
                  className="cursor-pointer flex flex-col items-center"
                >
                  {file ? (
                    <>
                      <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-green-100">
                        <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-lg font-medium text-gray-900 mb-2">
                        {file.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        Clique ou arraste outro arquivo para substituir
                      </span>
                    </>
                  ) : (
                    <>
                      <svg className="w-16 h-16 text-purple-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      
                      <span className="text-lg font-medium text-gray-900 mb-2">
                        Arraste e solte seu arquivo aqui
                      </span>
                      
                      <span className="text-sm text-gray-500 mb-2">
                        ou clique para selecionar
                      </span>
                      
                      <span className="text-xs text-gray-500">
                        Formatos aceitos: PDF ou CSV (máx. 5MB)
                      </span>
                    </>
                  )}
                </label>
              </div>

              {error && (
                <div className="mt-4 bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!file || loading}
                className={`w-full mt-6 flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                  (!file || loading) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analisando...
                  </>
                ) : (
                  'Analisar Extrato'
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Seus dados são processados com segurança e não são armazenados.
          </p>
        </div>
      </div>
    </main>
  );
} 