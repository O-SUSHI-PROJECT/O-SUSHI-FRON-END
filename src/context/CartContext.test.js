import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

// 1. Unidade sob teste
describe('useCart Hook', () => {

  // A função que estamos testando
  describe('addToCart', () => {

    // Mock de um produto para usar nos testes
    const produtoMock = { id: 1, nome: 'Uramaki', preco: 22.50 };

    // 2. Cenário + 3. Expectativa
    it('deve adicionar um novo produto ao carrinho com quantidade 1', () => {
      // Arrange
      // Para testar um hook, usamos renderHook.
      // O 'wrapper' garante que nosso hook 'useCart' tenha acesso ao 'CartProvider'.
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      // Act
      // Ações que mudam o estado do hook devem estar dentro de um `act()`
      act(() => {
        result.current.addToCart(produtoMock);
      });

      // Assert
      // Verificamos se o estado do carrinho (cartItems) foi atualizado corretamente.
      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0]).toEqual({ ...produtoMock, quantity: 1 });
    });

    // 2. Cenário + 3. Expectativa
    it('deve incrementar a quantidade de um produto que já existe no carrinho', () => {
      // Arrange
      const { result } = renderHook(() => useCart(), {
        wrapper: CartProvider,
      });

      // Adiciona o mesmo produto duas vezes
      // Act
      act(() => {
        result.current.addToCart(produtoMock);
      });
      act(() => {
        result.current.addToCart(produtoMock);
      });

      // Assert
      // Esperamos que o carrinho ainda tenha 1 item, mas com quantidade 2.
      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0].quantity).toBe(2);
    });
  });

  // Você pode continuar aqui com testes para removeFromCart e updateQuantity...
  describe('removeFromCart', () => {
    it('deve remover um produto do carrinho', () => {
        // ... (Arrange, Act, Assert)
    })
  })
});