'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import styles from './Header.module.css';

export default function Header() {
  const { getTotalItems } = useCart();
  const { logout } = useAuth();
  const totalItems = getTotalItems();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/produtos" className={styles.logo}>
          <h1>🍣 O Sushi</h1>
        </Link>

        <nav className={styles.nav}>
          <Link href="/produtos" className={styles.navLink}>
            Cardápio
          </Link>
          <Link href="/carrinho" className={styles.navLink}>
            Carrinho
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
          </Link>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Sair
          </button>
        </nav>
      </div>
    </header>
  );
} 