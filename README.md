# 🍣 O Sushi - Frontend

Frontend do sistema de delivery de comida japonesa **O Sushi**, desenvolvido com Next.js, React e TypeScript.

## 🚀 Funcionalidades

- **Autenticação**: Sistema de login com API key
- **Cardápio**: Visualização de produtos com filtros por categoria
- **Carrinho**: Gerenciamento de itens com controle de quantidade
- **Checkout**: Formulário de finalização de pedido
- **Integração com API**: Comunicação completa com backend REST

## 🛠️ Tecnologias

- **Next.js 15** - Framework React
- **React 19** - Biblioteca de interface
- **TypeScript** - Tipagem estática
- **Axios** - Cliente HTTP
- **CSS Modules** - Estilização modular
- **Jest + Testing Library** - Testes automatizados

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- API do O Sushi rodando em `http://localhost:3000`

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd O-SUSHI-FRON-END
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse [http://localhost:3001](http://localhost:3001)

## 🧪 Testes

Execute os testes:
```bash
npm test
```

Execute verificação de tipos:
```bash
npm run type-check
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas Next.js 13+
│   ├── auth/              # Página de autenticação
│   ├── produtos/          # Página do cardápio
│   ├── carrinho/          # Página do carrinho
│   ├── checkout/          # Página de finalização
│   └── pedido-sucesso/    # Página de confirmação
├── components/            # Componentes reutilizáveis
│   ├── Button.tsx        # Botão customizado
│   ├── Header.tsx        # Cabeçalho da aplicação
│   └── ProductCard.tsx   # Card de produto
├── context/              # Contextos React
│   ├── AuthContext.tsx   # Gerenciamento de autenticação
│   └── CartContext.tsx   # Gerenciamento do carrinho
├── services/             # Serviços de API
│   └── api.ts           # Cliente HTTP e endpoints
└── types/               # Definições TypeScript
    └── api.ts           # Tipos da API
```

## 🔌 Integração com API

O frontend se integra com a API do O Sushi através dos seguintes endpoints:

- `GET /health` - Verificação de status
- `GET /products` - Listar produtos (com filtro opcional)
- `GET /products/available` - Listar produtos disponíveis
- `POST /orders` - Criar novo pedido

### Autenticação

A API utiliza autenticação via API key no header `x-api-key`. O sistema salva a chave no localStorage e a utiliza automaticamente em todas as requisições.

## 🎨 Design System

O projeto utiliza um design system consistente com:

- **Cores principais**: Gradientes azul/roxo (#667eea → #764ba2)
- **Tipografia**: Inter (Google Fonts)
- **Componentes**: Botões, cards, formulários padronizados
- **Responsividade**: Design mobile-first

## 📱 Funcionalidades por Página

### 🔐 Autenticação (`/auth`)
- Formulário de login com API key
- Validação de credenciais
- Redirecionamento automático

### 🍽️ Cardápio (`/produtos`)
- Listagem de produtos da API
- Filtros por categoria (Sushi, Temaki, Sashimi, Hot Roll)
- Cards com informações detalhadas
- Adição ao carrinho

### 🛒 Carrinho (`/carrinho`)
- Visualização de itens
- Controle de quantidade
- Cálculo de subtotal e taxa de entrega
- Navegação para checkout

### 📋 Checkout (`/checkout`)
- Formulário de dados do cliente
- Seleção de forma de pagamento
- Resumo do pedido
- Envio para API

### ✅ Sucesso (`/pedido-sucesso`)
- Confirmação do pedido
- Número do pedido
- Informações de entrega

## 🔒 Regras de Negócio

- **Taxa de entrega**: R$ 5,00 para pedidos até R$ 50,00, grátis acima
- **Produtos**: Apenas produtos disponíveis podem ser adicionados ao carrinho
- **Quantidade mínima**: 1 item por produto
- **Autenticação**: Obrigatória para todas as operações

## 🚀 Deploy

Para fazer deploy em produção:

```bash
npm run build
npm start
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato através dos canais oficiais do O Sushi.
