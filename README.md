# VaciloBank

Um app web que analisa seu extrato bancário e te entrega uma análise emocional-financeira com tom direto, sarcástico e empático.

## Funcionalidades

- Upload de extrato bancário (txt/csv)
- Análise de padrões de gasto
- Nota de saúde financeira
- Diagnóstico emocional-financeiro
- Gráfico de distribuição de gastos
- Paywall para recursos premium

## Tecnologias

- Next.js 14
- TypeScript
- Tailwind CSS
- OpenAI GPT-4
- Supabase (opcional)
- Stripe (simulado)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/vacilobank.git
cd vacilobank
```

2. Instale as dependências:
```bash
npm install
```

3. Crie um arquivo `.env.local` na raiz do projeto:
```env
OPENAI_API_KEY=sua-chave-api
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

```
src/
  ├── app/              # Páginas da aplicação
  ├── components/       # Componentes React
  ├── lib/             # Utilitários e configurações
  ├── styles/          # Estilos globais
  ├── types/           # Definições de tipos TypeScript
  └── utils/           # Funções utilitárias
```

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
