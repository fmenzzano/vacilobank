interface ResultBlockProps {
  healthScore: number;
  monthlyVacilo: string;
  emotionalAnalysis: string;
  fraseFinal?: string;
}

export default function ResultBlock({ 
  healthScore, 
  monthlyVacilo, 
  emotionalAnalysis,
  fraseFinal 
}: ResultBlockProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Seu Raio-X Financeiro</h2>
        <div className="text-6xl font-bold text-gray-900 mb-2">
          {healthScore}/10
        </div>
        <p className="text-gray-600">Nota de Saúde Financeira</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Vacilo do Mês</h3>
        <p className="text-gray-700">{monthlyVacilo}</p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Análise Emocional</h3>
        <p className="text-gray-700 whitespace-pre-line">{emotionalAnalysis}</p>
      </div>

      {fraseFinal && (
        <div className="text-center p-4 border-t border-gray-200">
          <blockquote className="border-l-4 border-purple-500 pl-4 italic text-purple-700">
            &ldquo;{fraseFinal}&rdquo;
          </blockquote>
        </div>
      )}
    </div>
  );
} 