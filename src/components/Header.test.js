import { render, screen } from '@testing-library/react';
import Header from './Header';
import { useCart } from '@/context/CartContext';

// Mockando o hook useCart e o componente Link
jest.mock('@/context/CartContext', () => ({
  useCart: jest.fn(),
}));
jest.mock('next/link', () => {
  return ({ children, href }) => <a href={href}>{children}</a>;
});

// 1. Unidade sob teste: O componente Header
describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 2. Cenário + 3. Expectativa
  it('deve renderizar o logo e o link do carrinho sem o contador quando o carrinho está vazio', () => {
    // Arrange
    // Simulamos o retorno do hook com um carrinho vazio.
    useCart.mockReturnValue({ cartItems: [] });
    render(<Header />);

    // Assert
    // Verificamos se o logo está na tela.
    expect(screen.getByText(/sushi house/i)).toBeInTheDocument();
    // Verificamos se o link para o carrinho existe.
    expect(screen.getByRole('link', { name: /carrinho/i })).toBeInTheDocument();
    // O mais importante: verificamos se o contador de itens NÃO está na tela.
    expect(screen.queryByText(/\d+/)).not.toBeInTheDocument();
  });

  // 2. Cenário + 3. Expectativa
  it('deve mostrar o número total de itens no contador do carrinho', () => {
    // Arrange
    // Simulamos um carrinho com 2 itens diferentes, somando 3 unidades no total.
    const cartItemsMock = [
      { id: 1, quantity: 2 }, // 2 unidades
      { id: 2, quantity: 1 }, // 1 unidade
    ];
    useCart.mockReturnValue({ cartItems: cartItemsMock });
    render(<Header />);

    // Assert
    // Verificamos se o contador está visível.
    const cartCount = screen.getByText('3');
    expect(cartCount).toBeInTheDocument();
  });
});