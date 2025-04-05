import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeatureCards from '@/components/FeatureCards';
import HowItWorks from '@/components/HowItWorks';
import DataPrivacy from '@/components/DataPrivacy';
import PricingPlans from '@/components/PricingPlans';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeatureCards />
      <HowItWorks />
      <DataPrivacy />
      <PricingPlans />
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h2 className="text-2xl font-bold">Sobre o VaciloBank</h2>
          <div className="max-w-2xl mx-auto space-y-4 text-gray-300">
            <p>
              Um app criado pra ajudar você a não repetir o mesmo mês 12 vezes por ano.
            </p>
            <p>
              Se um dia vendermos pra alguma empresa financeira gigante, saiba que você participou do começo.
            </p>
            <p>
              Enquanto isso, cola seu extrato e toma sua dose de realidade.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
