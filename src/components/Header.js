'use client'; // Necessário para acessar o contexto do carrinho

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './Header.module.css';

export default function Header() {
  const { cartItems } = useCart();

  // Calcula o número total de itens no carrinho (somando as quantidades)
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          🍣 Sushi House
        </Link>
        <nav>
          <Link href="/carrinho" className={styles.cartLink}>
            <div className={styles.cartIcon}>
              🛒
              {totalItems > 0 && (
                <span className={styles.cartCount}>{totalItems}</span>
              )}
            </div>
            Carrinho
          </Link>
        </nav>
      </div>
    </header>
  );
}