export default function FeatureCards() {
  const features = [
    {
      title: "A IA lê seus gastos e te devolve uma nota",
      description: "Nossa IA analisa seu extrato e te dá uma nota realista sobre sua saúde financeira."
    },
    {
      title: "Identifica o 'vacilo do mês' com precisão cirúrgica",
      description: "Descubra qual foi seu maior gasto desnecessário do mês, com análise detalhada."
    },
    {
      title: "Te entrega um plano simples pra parar de repetir os mesmos erros",
      description: "Receba recomendações práticas para evitar os mesmos vacilos no próximo mês."
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          O que é o VaciloBank?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 