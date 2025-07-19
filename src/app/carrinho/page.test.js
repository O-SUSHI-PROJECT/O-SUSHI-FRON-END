import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from './page';
import { useCart } from '@/context/CartContext';

// Mockando o hook useCart e o componente Link do Next.js
jest.mock('@/context/CartContext', () => ({
  useCart: jest.fn(),
}));
jest.mock('next/link', () => {
  return ({ children, href }) => {
    return <a href={href}>{children}</a>;
  };
});

// 1. Unidade sob teste: A página do Carrinho
describe('CartPage', () => {
  // Mocks das funções do contexto
  const removeFromCartMock = jest.fn();
  const updateQuantityMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // 2. Cenário + 3. Expectativa
  it('deve mostrar a mensagem de carrinho vazio quando não há itens', () => {
    // Arrange
    // Simulamos um carrinho vazio
    useCart.mockReturnValue({
      cartItems: [],
      removeFromCart: removeFromCartMock,
      updateQuantity: updateQuantityMock,
    });
    render(<CartPage />);

    // Assert
    expect(screen.getByText('Seu carrinho está vazio')).toBeInTheDocument();
    expect(screen.queryByText('Resumo do Pedido')).not.toBeInTheDocument();
  });

  // 2. Cenário + 3. Expectativa
  it('deve renderizar os itens do carrinho e o resumo do pedido', () => {
    // Arrange
    const cartItemsMock = [
      { id: 1, nome: 'Uramaki Filadélfia', preco: 22.5, quantity: 2, imagem: '/img.jpg' },
      { id: 2, nome: 'Temaki Salmão', preco: 28.0, quantity: 1, imagem: '/img.jpg' },
    ];
    // Total esperado: (22.5 * 2) + 28.0 = 45 + 28 = R$ 73,00
    useCart.mockReturnValue({
      cartItems: cartItemsMock,
      removeFromCart: removeFromCartMock,
      updateQuantity: updateQuantityMock,
    });
    render(<CartPage />);

    // Assert
    expect(screen.getByText('Uramaki Filadélfia')).toBeInTheDocument();
    expect(screen.getByText('Temaki Salmão')).toBeInTheDocument();
    expect(screen.getByText('Resumo do Pedido')).toBeInTheDocument();
    
    // Verifica o total. O seletor de texto precisa ser exato com a formatação da moeda.
    const totalElement = screen.getAllByText('R$ 73,00');
    expect(totalElement.length).toBeGreaterThan(0); // Garante que o total está na tela
  });

  // 2. Cenário + 3. Expectativa
  it('deve chamar a função de remover item quando o botão "Remover" é clicado', () => {
    // Arrange
    const cartItemsMock = [
        { id: 1, nome: 'Produto a ser removido', preco: 10.0, quantity: 1, imagem: '/img.jpg' },
    ];
    useCart.mockReturnValue({
        cartItems: cartItemsMock,
        removeFromCart: removeFromCartMock,
        updateQuantity: updateQuantityMock,
    });
    render(<CartPage />);
    const removeButton = screen.getByRole('button', { name: /remover/i });

    // Act
    fireEvent.click(removeButton);

    // Assert
    expect(removeFromCartMock).toHaveBeenCalledTimes(1);
    expect(removeFromCartMock).toHaveBeenCalledWith(1); // Verifica se chamou com o ID correto
  });
});