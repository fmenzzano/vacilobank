interface BarChartProps {
  data: {
    label: string;
    value: number;
    color: string;
    description?: string;
  }[];
}

export default function BarChart({ data }: BarChartProps) {
  // Encontra o valor máximo para calcular as proporções
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h3 className="text-xl font-semibold mb-6">Seus Gastos por Categoria</h3>
      
      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">{item.label}</span>
                {item.description && (
                  <span className="text-sm text-gray-500 ml-2">— {item.description}</span>
                )}
              </div>
              <span className="font-semibold">R$ {item.value.toFixed(2)}</span>
            </div>
            
            <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full"
                style={{ 
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color,
                  transition: 'width 1s ease-out'
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 