import React from 'react';

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Como o VaciloBank funciona
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Três passos simples para descobrir o que seu banco não tem coragem de te contar
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-6 relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              1
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cole seu extrato</h3>
              <p className="text-gray-600">
                Copie e cole seu extrato bancário. Não precisa de senha, não salvamos nada. É só colar e <span className="text-purple-600 font-semibold">enfrentar a realidade</span>.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              2
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">A IA te devolve a verdade</h3>
              <p className="text-gray-600">
                Nossa IA analisa seus gastos e te devolve a <span className="text-purple-600 font-semibold">verdade que dói</span>. Com um toque de sarcasmo pra você não esquecer.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 relative">
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              3
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Receba metas e alertas</h3>
              <p className="text-gray-600">
                Com o plano premium, você recebe <span className="text-purple-600 font-semibold">metas que você vai ignorar</span> e alertas para não repetir os mesmos vacilos. Ou pelo menos tentar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 