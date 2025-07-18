// src/app/page.js
'use client'; // Necessário para usar o hook useState

import { useState } from 'react'; // 1. Importe o useState
import { produtos } from '@/data/produtos';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Card'; // 2. Importe o Carrinho
import { useCart } from '@/context/CartContext'; // Importe para o ícone
import styles from './page.module.css';

// Componente para o ícone do carrinho
function CartIcon({ onOpen }) {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={styles.cartIcon} onClick={onOpen}>
      🛒
      {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
    </div>
  );
}

export default function HomePage() {
  const [isCartOpen, setIsCartOpen] = useState(false); // 3. Crie o estado

  return (
    <main className={styles.main}>
      {/* 4. Adicione o ícone e o componente do carrinho */}
      <CartIcon onOpen={() => setIsCartOpen(true)} />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <header className={styles.header}>
        <h1 className={styles.title}>🍣 Cardápio Sushi House</h1>
        <p className={styles.subtitle}>O melhor da culinária japonesa tradicional</p>
      </header>

      <section className={styles.grid}>
        {produtos.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </section>
    </main>
  );
}