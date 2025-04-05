export default function DataPrivacyBlock() {
  return (
    <section id="privacidade" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Vamos roubar seus dados? Claro que não. (Oficialmente.)
        </h2>
        
        <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-600">
          <p>
            A gente não coleta CPF, não pede senha, e não armazena seu extrato no nosso banco.
          </p>
          <p>
            Tudo que você colar aqui vai direto pra IA fazer seu diagnóstico e sumir da nossa memória.
          </p>
          <p>
            A análise é processada em tempo real, e você continua sendo o dono do seu caos.
          </p>
          <p className="font-semibold text-gray-900">
            Nosso compromisso é com a sua vergonha, não com seus dados.
          </p>
        </div>
      </div>
    </section>
  );
} 