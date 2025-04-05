import { useState } from 'react';
import { AnaliseResult } from '@/lib/openai';

interface UploadFieldProps {
  onResult: (result: AnaliseResult) => void;
}

export default function UploadField({ onResult }: UploadFieldProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      console.log('Arquivo selecionado:', {
        nome: selectedFile.name,
        tipo: selectedFile.type,
        tamanho: selectedFile.size
      });
      
      // Verifica o tamanho do arquivo (limite de 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('O arquivo é muito grande. O tamanho máximo permitido é 5MB.');
        return;
      }
      
      if (selectedFile.type === 'application/pdf' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        setError(null);
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
        setError(null);
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
          // Lê o arquivo como texto, independente do tipo
          const content = e.target.result as string;
          resolve(content);
        } else {
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
    setError(null);
    setUploadProgress(0);
    
    try {
      // Lê o conteúdo do arquivo
      const fileContent = await readFileContent(file);
      
      // Envia para a API
      const response = await fetch('/api/analise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ extrato: fileContent }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao processar o arquivo');
      }
      
      const result = await response.json();
      onResult(result);
    } catch (err) {
      console.error('Erro ao processar arquivo:', err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao processar o arquivo');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging 
              ? 'border-black bg-gray-50' 
              : file 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300 hover:border-gray-400'
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
            className="cursor-pointer text-gray-600 hover:text-gray-900"
          >
            {file ? (
              <div className="space-y-2">
                <p className="text-lg font-medium text-green-700">
                  Arquivo selecionado:
                </p>
                <p className="text-sm text-gray-600">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  Clique para trocar o arquivo
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-lg mb-2">
                  Arraste seu arquivo ou clique para selecionar
                </p>
                <p className="text-sm text-gray-500">
                  Formatos aceitos: .csv, .pdf
                </p>
              </div>
            )}
          </label>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        {loading && (
          <div className="space-y-2">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 text-center">
              {uploadProgress < 100 
                ? 'Processando seu extrato...' 
                : 'Análise concluída! Redirecionando...'}
            </p>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!file || loading}
        >
          {loading ? 'Analisando...' : 'Analisar meu extrato'}
        </button>
      </form>
    </div>
  );
} 