export default function PaywallBlock() {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gray-50 rounded-lg">
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold">Quer mais que isso?</h2>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            Desbloqueie o plano mensal e receba:
          </p>
          
          <ul className="space-y-2 text-left">
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Metas personalizadas baseadas no seu perfil
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Alertas quando estiver prestes a vacilar
            </li>
            <li className="flex items-center">
              <span className="mr-2">✓</span>
              Análises semanais do seu progresso
            </li>
          </ul>
        </div>

        <div className="pt-4">
          <button className="bg-black text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            Quero parar de vacilar
          </button>
          <p className="text-sm text-gray-500 mt-2">
            R$ 19,90/mês • Cancele quando quiser
          </p>
        </div>
      </div>
    </div>
  );
} 