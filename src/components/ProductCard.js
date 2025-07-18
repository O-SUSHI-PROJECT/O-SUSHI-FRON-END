// src/components/ProductCard.js
import Image from 'next/image';
import styles from './ProductCard.module.css';
import { useCart } from '@/context/CartContext'; // 1. Importe o useCart

export default function ProductCard({ produto }) {
  const { addToCart } = useCart(); // 2. Pegue a função addToCart do contexto

  return (
    <div className={styles.card}>
      <Image
        src={produto.imagem}
        alt={produto.nome}
        width={300}
        height={200}
        className={styles.cardImage}
      />
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{produto.nome}</h3>
        <p className={styles.cardCategory}>{produto.categoria}</p>
        <div className={styles.footer}>
          <p className={styles.cardPrice}>
            {produto.preco.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </p>
          {/* 3. Adicione o botão e chame a função no clique */}
          <button className={styles.addButton} onClick={() => addToCart(produto)}>
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}