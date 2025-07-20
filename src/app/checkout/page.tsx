'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { apiService } from '@/services/api';
import { CreateOrderRequest } from '@/types/api';
import Header from '@/components/Header';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function CheckoutPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    deliveryAddress: '',
    notes: '',
    paymentMethod: 'CREDIT_CARD' as const,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Redirecionar se não estiver autenticado ou se o carrinho estiver vazio
  if (!authLoading && !isAuthenticated) {
    router.push('/auth');
    return null;
  }

  if (!authLoading && cartItems.length === 0) {
    router.push('/carrinho');
    return null;
  }

  if (authLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Carregando...</div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const orderData: CreateOrderRequest = {
        items: cartItems.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        deliveryAddress: formData.deliveryAddress,
        notes: formData.notes || undefined,
        paymentMethod: formData.paymentMethod,
      };

      const order = await apiService.createOrder(orderData);
      
      // Limpar carrinho e redirecionar para página de sucesso
      clearCart();
      router.push(`/pedido-sucesso?id=${order.id}`);
      
    } catch (err: any) {
      console.error('Erro ao criar pedido:', err);
      setError(err.response?.data?.errorMessage || 'Erro ao processar pedido. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal >= 50 ? 0 : 5;
  const total = subtotal + deliveryFee;

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>📋 Finalizar Pedido</h1>
          <p>Preencha suas informações para completar o pedido</p>
        </div>

        <div className={styles.content}>
          <div className={styles.formSection}>
            <h2>Informações de Entrega</h2>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="customerName">Nome Completo *</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="customerPhone">Telefone *</label>
                <input
                  type="tel"
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  required
                  placeholder="(11) 99999-9999"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="deliveryAddress">Endereço de Entrega *</label>
                <textarea
                  id="deliveryAddress"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  required
                  placeholder="Rua, número, complemento, bairro, cidade - estado"
                  className={styles.textarea}
                  rows={3}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="paymentMethod">Forma de Pagamento *</label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  required
                  className={styles.select}
                >
                  <option value="CREDIT_CARD">Cartão de Crédito</option>
                  <option value="DEBIT_CARD">Cartão de Débito</option>
                  <option value="PIX">PIX</option>
                  <option value="CASH">Dinheiro</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="notes">Observações</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Alguma observação especial? (ex: sem wasabi, entrega no portão)"
                  className={styles.textarea}
                  rows={3}
                />
              </div>

              {error && (
                <div className={styles.error}>
                  {error}
                </div>
              )}

              <div className={styles.formActions}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="large"
                  className={styles.submitButton}
                >
                  {isSubmitting ? 'Processando...' : 'Confirmar Pedido'}
                </Button>
                
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => router.push('/carrinho')}
                  size="large"
                >
                  Voltar ao Carrinho
                </Button>
              </div>
            </form>
          </div>

          <div className={styles.summarySection}>
            <h2>Resumo do Pedido</h2>
            
            <div className={styles.itemsList}>
              {cartItems.map((item) => (
                <div key={item.id} className={styles.summaryItem}>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemQuantity}>x{item.quantity}</span>
                  </div>
                  <span className={styles.itemPrice}>
                    {(item.price * item.quantity).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>
              ))}
            </div>

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
          </div>
        </div>
      </main>
    </div>
  );
} 