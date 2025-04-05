import React from 'react';

export default function DataPrivacy() {
  return (
    <section id="privacidade" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            E meus dados?
          </h2>
        </div>
        
        <div className="bg-purple-50 rounded-xl p-8 md:p-12 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <p className="text-lg text-gray-800 mb-4">
                A gente não salva seu extrato. Não pede senha. Não lê sua alma. O GPT analisa em tempo real e <span className="text-purple-600 font-semibold">esquece logo depois</span>.
              </p>
              <p className="text-lg text-gray-800 font-medium">
                Nosso compromisso é com sua <span className="text-purple-600 font-semibold">vergonha</span>, não com seus dados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 