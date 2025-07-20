'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function CarrinhoPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Redirecionar se não estiver autenticado
  if (!authLoading && !isAuthenticated) {
    router.push('/auth');
    return null;
  }

  if (authLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Carregando...</div>
      </div>
    );
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal >= 50 ? 0 : 5;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.emptyCart}>
          <h2>🛒 Seu carrinho está vazio</h2>
          <p>Adicione alguns produtos deliciosos do nosso cardápio!</p>
          <Button onClick={() => router.push('/produtos')}>
            Ver Cardápio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>🛒 Seu Carrinho</h1>
          <p>{cartItems.length} item(s) no carrinho</p>
        </div>

        <div className={styles.content}>
          <div className={styles.itemsSection}>
            <h2>Itens do Pedido</h2>
            <div className={styles.itemsList}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <img 
                      src={item.imageUrl || '/images/sushi.jpg'} 
                      alt={item.name}
                    />
                  </div>
                  
                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    <p className={styles.itemCategory}>{item.category}</p>
                    <p className={styles.itemPrice}>
                      {item.price.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                  </div>

                  <div className={styles.itemQuantity}>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className={styles.quantityButton}
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>

                  <div className={styles.itemTotal}>
                    <p>
                      {(item.price * item.quantity).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className={styles.removeButton}
                    title="Remover item"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.summarySection}>
            <h2>Resumo do Pedido</h2>
            <div className={styles.summary}>
              <div className={styles.summaryRow}>
                <span>Subtotal:</span>
                <span>
                  {subtotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </div>
              
              <div className={styles.summaryRow}>
                <span>Taxa de entrega:</span>
                <span>
                  {deliveryFee === 0 ? 'Grátis' : deliveryFee.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </div>
              
              {deliveryFee > 0 && (
                <div className={styles.deliveryInfo}>
                  <p>🎉 Adicione mais R$ {(50 - subtotal).toFixed(2)} para entrega grátis!</p>
                </div>
              )}
              
              <div className={styles.summaryRowTotal}>
                <span>Total:</span>
                <span>
                  {total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </div>
            </div>

            <div className={styles.actions}>
              <Button 
                onClick={handleCheckout}
                size="large"
                className={styles.checkoutButton}
              >
                Finalizar Pedido
              </Button>
              
              <Button 
                onClick={() => router.push('/produtos')}
                variant="secondary"
                size="large"
              >
                Continuar Comprando
              </Button>
              
              <Button 
                onClick={clearCart}
                variant="danger"
                size="medium"
              >
                Limpar Carrinho
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 