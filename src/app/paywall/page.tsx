'use client';

import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function PaywallPage() {
  const router = useRouter();
  
  const handleDesbloquear = () => {
    // Simula o processo de pagamento
    // Em um ambiente real, aqui seria integrado com o Stripe
    router.push('/plano');
  };
  
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Seu plano já está pronto.</h1>
          
          <p className="text-xl text-gray-600 mb-8">
            3 metas baseadas no seu extrato. Alertas. Acompanhamento.
          </p>
          
          <div className="flex items-center justify-center mb-8">
            <span className="text-4xl font-bold">R$19</span>
            <span className="text-gray-500 ml-2">/mês</span>
          </div>
          
          <div className="space-y-4 mb-8 text-left">
            <div className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Metas personalizadas baseadas no seu perfil de gastos</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Alertas quando estiver prestes a vacilar</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Acompanhamento semanal do seu progresso</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span>Dicas personalizadas para economizar</span>
            </div>
          </div>
          
          <button 
            onClick={handleDesbloquear}
            className="bg-black text-white py-3 px-8 rounded-lg font-semibold hover:bg-gray-800 transition-colors w-full"
          >
            Desbloquear meu plano e melhorar minha nota
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            Cancele quando quiser • Sem compromisso
          </p>
        </div>
      </div>
    </main>
  );
} 