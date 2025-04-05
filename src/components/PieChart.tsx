interface PieChartProps {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
}

export default function PieChart({ data }: PieChartProps) {
  // Mock data para exemplo
  const mockData = [
    { label: 'Alimentação', value: 30, color: '#FF6B6B' },
    { label: 'Transporte', value: 20, color: '#4ECDC4' },
    { label: 'Lazer', value: 25, color: '#45B7D1' },
    { label: 'Outros', value: 25, color: '#96CEB4' },
  ];

  const chartData = data || mockData;
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="relative w-64 h-64 mx-auto">
        <svg viewBox="0 0 100 100" className="transform -rotate-90">
          {chartData.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const offset = chartData
              .slice(0, index)
              .reduce((sum, i) => sum + (i.value / total) * 100, 0);
            
            return (
              <circle
                key={item.label}
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={item.color}
                strokeWidth="20"
                strokeDasharray={`${percentage} 100`}
                strokeDashoffset={-offset}
              />
            );
          })}
        </svg>
      </div>

      <div className="mt-6 space-y-2">
        {chartData.map((item) => (
          <div key={item.label} className="flex items-center">
            <div
              className="w-4 h-4 rounded-full mr-2"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-600">
              {item.label}: {((item.value / total) * 100).toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 