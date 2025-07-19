import { render, screen } from '@testing-library/react';
import HomePage from './page';

// 1. Mockamos os módulos que a HomePage importa
// Mockando a lista de produtos para ter controle sobre os dados no teste
jest.mock('@/data/produtos', () => ({
  __esModule: true, // Necessário para mocks de módulos ES6
  produtos: [
    { id: 1, nome: 'Sushi Mock 1' },
    { id: 2, nome: 'Temaki Mock 2' },
    { id: 3, nome: 'Sashimi Mock 3' },
  ],
}));

// Mockando o ProductCard. O teste da HomePage não precisa saber
// como o ProductCard funciona, apenas que ele foi renderizado.
jest.mock('@/components/ProductCard', () => {
  // eslint-disable-next-line react/display-name
  return ({ produto }) => (
    <div data-testid="mock-product-card">{produto.nome}</div>
  );
});

// 2. Unidade sob teste: A HomePage
describe('HomePage', () => {
  
  // 3. Cenário + Expectativa
  it('deve renderizar um card para cada produto da lista mockada', () => {
    // Arrange
    render(<HomePage />);

    // Act: Nenhuma ação necessária, apenas verificamos a renderização.

    // Assert
    // Verificamos se a quantidade de cards renderizados é a mesma da nossa lista mock.
    const productCards = screen.getAllByTestId('mock-product-card');
    expect(productCards).toHaveLength(3);

    // Verificamos se os nomes dos produtos estão na tela, confirmando
    // que os dados corretos foram passados para os componentes mockados.
    expect(screen.getByText('Sushi Mock 1')).toBeInTheDocument();
    expect(screen.getByText('Temaki Mock 2')).toBeInTheDocument();
    expect(screen.getByText('Sashimi Mock 3')).toBeInTheDocument();
  });
});