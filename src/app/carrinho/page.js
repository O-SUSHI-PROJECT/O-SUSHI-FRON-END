'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button'; // Nosso botão reutilizável
import styles from './page.module.css';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Calcula o valor total do carrinho
  const totalValue = cartItems.reduce(
    (total, item) => total + item.preco * item.quantity,
    0
  );

  const handleFinalizarCompra = () => {
    // Por enquanto, apenas exibe um alerta.
    // No futuro, aqui iria a lógica de integração com pagamento.
    alert('Compra finalizada com sucesso! (Função de exemplo)');
  };

  if (cartItems.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.emptyCart}>
          <h1>Seu carrinho está vazio</h1>
          <p>Que tal adicionar alguns sushis deliciosos?</p>
          <Link href="/">
            <Button>Ver Cardápio</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Meu Carrinho</h1>
      <div className={styles.cartContainer}>
        <div className={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <Image
                src={item.imagem}
                alt={item.nome}
                width={80}
                height={80}
                className={styles.itemImage}
              />
              <div className={styles.itemDetails}>
                <h3 className={styles.itemName}>{item.nome}</h3>
                <p className={styles.itemPrice}>
                  {item.preco.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
              </div>
              <div className={styles.quantityControl}>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <button
                className={styles.removeButton}
                onClick={() => removeFromCart(item.id)}
              >
                Remover
              </button>
            </div>
          ))}
        </div>

        <aside className={styles.summary}>
          <h2>Resumo do Pedido</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>
              {totalValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
          <div className={styles.summaryRow}>
            <span>Taxa de Entrega</span>
            <span>A calcular</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total</span>
            <span>
              {totalValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </span>
          </div>
          <Button onClick={handleFinalizarCompra}>
            Finalizar Compra
          </Button>
        </aside>
      </div>
    </main>
  );
}