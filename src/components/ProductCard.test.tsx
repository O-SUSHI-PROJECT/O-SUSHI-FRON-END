import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { CartProvider } from '@/context/CartContext';

// Mock do useCart
const mockAddToCart = jest.fn();

jest.mock('@/context/CartContext', () => ({
  ...jest.requireActual('@/context/CartContext'),
  useCart: () => ({
    addToCart: mockAddToCart,
  }),
}));

const mockProduct = {
  id: '1',
  name: 'Sushi California',
  description: 'Sushi tradicional com salmão, abacate e pepino',
  price: 25.90,
  category: 'Sushi' as const,
  imageUrl: '/images/sushi.jpg',
  isAvailable: true,
  ingredients: ['Salmão', 'Abacate', 'Pepino', 'Arroz', 'Alga Nori'],
  preparationTime: 15,
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z',
};

describe('ProductCard', () => {
  beforeEach(() => {
    mockAddToCart.mockClear();
  });

  it('renderiza o produto corretamente', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    expect(screen.getByText('Sushi California')).toBeInTheDocument();
    expect(screen.getByText('Sushi tradicional com salmão, abacate e pepino')).toBeInTheDocument();
    expect(screen.getByText('Sushi')).toBeInTheDocument();
    expect(screen.getByText('R$ 25,90')).toBeInTheDocument();
    expect(screen.getByText('Adicionar ao Carrinho')).toBeInTheDocument();
  });

  it('exibe ingredientes quando disponíveis', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    expect(screen.getByText('Ingredientes:')).toBeInTheDocument();
    expect(screen.getByText('Salmão, Abacate, Pepino, Arroz, Alga Nori')).toBeInTheDocument();
  });

  it('exibe tempo de preparo quando disponível', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    expect(screen.getByText('⏱️ 15 min')).toBeInTheDocument();
  });

  it('chama addToCart quando o botão é clicado', () => {
    render(
      <CartProvider>
        <ProductCard product={mockProduct} />
      </CartProvider>
    );

    const addButton = screen.getByText('Adicionar ao Carrinho');
    fireEvent.click(addButton);

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('desabilita o botão quando o produto não está disponível', () => {
    const unavailableProduct = { ...mockProduct, isAvailable: false };

    render(
      <CartProvider>
        <ProductCard product={unavailableProduct} />
      </CartProvider>
    );

    const buttons = screen.getAllByText('Indisponível');
    const button = buttons.find(el => el.tagName === 'BUTTON');
    expect(button).toBeDisabled();
  });

  it('não chama addToCart quando o produto não está disponível', () => {
    const unavailableProduct = { ...mockProduct, isAvailable: false };

    render(
      <CartProvider>
        <ProductCard product={unavailableProduct} />
      </CartProvider>
    );

    const buttons = screen.getAllByText('Indisponível');
    const button = buttons.find(el => el.tagName === 'BUTTON');
    fireEvent.click(button!);

    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  it('usa imagem padrão quando imageUrl não está disponível', () => {
    const productWithoutImage = { ...mockProduct, imageUrl: undefined };

    render(
      <CartProvider>
        <ProductCard product={productWithoutImage} />
      </CartProvider>
    );

    const image = screen.getByAltText('Sushi California');
    expect(image).toHaveAttribute('src', expect.stringContaining('/images/sushi.jpg'));
  });
});

afterAll(() => {
  jest.resetModules();
}); 