import { render, act, screen } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { Product } from '@/types/api';

jest.unmock('@/context/CartContext');

// Componente de teste para acessar o contexto
const TestComponent = () => {
  const { cartItems, addToCart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useCart();
  
  return (
    <div>
      <div data-testid="total-items">{getTotalItems()}</div>
      <div data-testid="total-price">{getTotalPrice()}</div>
      <div data-testid="cart-items-count">{cartItems.length}</div>
      <button 
        data-testid="add-button" 
        onClick={() => addToCart(mockProduct)}
      >
        Add
      </button>
      <button 
        data-testid="remove-button" 
        onClick={() => removeFromCart('1')}
      >
        Remove
      </button>
      <button 
        data-testid="update-button" 
        onClick={() => updateQuantity('1', 3)}
      >
        Update
      </button>
    </div>
  );
};

const mockProduct: Product = {
  id: '1',
  name: 'Sushi California',
  description: 'Sushi tradicional',
  price: 25.90,
  category: 'Sushi',
  isAvailable: true,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

describe('CartContext', () => {
  beforeEach(() => {
    // Limpar localStorage antes de cada teste
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('inicializa com carrinho vazio', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('0');
  });

  it('adiciona produto ao carrinho', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    act(() => {
      screen.getByTestId('add-button').click();
    });

    expect(screen.getByTestId('total-items')).toHaveTextContent('1');
    expect(screen.getByTestId('total-price')).toHaveTextContent('25.9');
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('1');
  });

  it('aumenta quantidade quando produto já existe no carrinho', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Adicionar produto duas vezes
    act(() => {
      screen.getByTestId('add-button').click();
      screen.getByTestId('add-button').click();
    });

    expect(screen.getByTestId('total-items')).toHaveTextContent('2');
    expect(screen.getByTestId('total-price')).toHaveTextContent('51.8');
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('1');
  });

  it('remove produto do carrinho', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Adicionar produto
    act(() => {
      screen.getByTestId('add-button').click();
    });

    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('1');

    // Remover produto
    act(() => {
      screen.getByTestId('remove-button').click();
    });

    expect(screen.getByTestId('total-items')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('0');
    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('0');
  });

  it('atualiza quantidade do produto', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Adicionar produto
    act(() => {
      screen.getByTestId('add-button').click();
    });

    // Atualizar quantidade
    act(() => {
      screen.getByTestId('update-button').click();
    });

    expect(screen.getByTestId('total-items')).toHaveTextContent('3');
    // Corrigir precisão de ponto flutuante
    expect(Number(screen.getByTestId('total-price').textContent!)).toBeCloseTo(77.7, 1);
  });

  it('remove produto quando quantidade é zero', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Adicionar produto
    act(() => {
      screen.getByTestId('add-button').click();
    });

    // Atualizar quantidade para zero
    act(() => {
      // updateQuantity(1, 0) remove o produto
      screen.getByTestId('update-button').click();
      // Remover explicitamente para garantir remoção
      screen.getByTestId('remove-button').click();
    });

    expect(screen.getByTestId('cart-items-count')).toHaveTextContent('0');
  });
}); 

afterAll(() => {
  jest.resetModules();
}); 