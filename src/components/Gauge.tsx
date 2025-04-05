interface GaugeProps {
  value: number;
  maxValue?: number;
  label?: string;
}

export default function Gauge({ value, maxValue = 10, label = "Nota de Saúde Financeira" }: GaugeProps) {
  // Garante que o valor esteja entre 0 e maxValue
  const normalizedValue = Math.min(Math.max(value, 0), maxValue);
  
  // Calcula a porcentagem para o gauge
  const percentage = (normalizedValue / maxValue) * 100;
  
  // Determina a cor com base no valor
  let color = "#10B981"; // Verde para valores altos
  
  if (percentage < 30) {
    color = "#EF4444"; // Vermelho para valores baixos
  } else if (percentage < 70) {
    color = "#F59E0B"; // Amarelo para valores médios
  }
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative">
        {/* Círculo de fundo */}
        <div className="w-full aspect-square rounded-full border-8 border-gray-200 flex items-center justify-center">
          {/* Círculo de progresso */}
          <div 
            className="absolute w-full aspect-square rounded-full border-8"
            style={{
              borderColor: color,
              clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
              transform: `rotate(${percentage * 3.6 - 90}deg)`,
              transition: 'transform 1s ease-out',
            }}
          />
          
          {/* Valor central */}
          <div className="text-center">
            <div className="text-5xl font-bold" style={{ color }}>
              {normalizedValue.toFixed(1)}
            </div>
            <div className="text-gray-500 text-sm mt-1">
              {label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 