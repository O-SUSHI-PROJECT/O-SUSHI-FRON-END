import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { useCart } from '@/context/CartContext';

// 1. Unidade sob teste: O componente ProductCard
// Mockando o hook useCart para isolar o componente
jest.mock('@/context/CartContext', () => ({
  useCart: jest.fn(),
}));

describe('ProductCard Component', () => {
  // Criando um mock da função que será retornada pelo nosso falso useCart
  const addToCartMock = jest.fn();
  const produtoMock = {
    id: 1,
    nome: 'Uramaki Filadélfia',
    preco: 22.5,
    categoria: 'Makis',
    imagem: '/images/sashimi.jpg',
  };

  // Antes de cada teste, resetamos os mocks para garantir um teste limpo
  beforeEach(() => {
    useCart.mockReturnValue({ addToCart: addToCartMock });
    jest.clearAllMocks();
  });

  // 2. Cenário + 3. Expectativa
  it('deve renderizar as informações do produto corretamente', () => {
    // Arrange
    render(<ProductCard produto={produtoMock} />);

    // Act: Nenhuma ação, apenas verificando a renderização inicial

    // Assert
    // Verificamos se o nome, categoria e preço estão na tela
    expect(screen.getByText('Uramaki Filadélfia')).toBeInTheDocument();
    expect(screen.getByText('Makis')).toBeInTheDocument();
    // O preço é formatado, então verificamos pelo texto formatado
    expect(screen.getByText('R$ 22,50')).toBeInTheDocument();
    // Verificamos se a imagem está sendo exibida com o texto alternativo correto
    expect(screen.getByRole('img', { name: 'Uramaki Filadélfia' })).toBeInTheDocument();
  });

  // 2. Cenário + 3. Expectativa
  it('deve chamar a função addToCart com o produto correto quando o botão é clicado', () => {
    // Arrange
    render(<ProductCard produto={produtoMock} />);
    const addButton = screen.getByRole('button', { name: /adicionar ao carrinho/i });

    // Act
    fireEvent.click(addButton);

    // Assert
    // Verificamos se nossa função mock foi chamada
    expect(addToCartMock).toHaveBeenCalledTimes(1);
    // Verificamos se ela foi chamada com o produto que passamos para o card
    expect(addToCartMock).toHaveBeenCalledWith(produtoMock);
  });
});