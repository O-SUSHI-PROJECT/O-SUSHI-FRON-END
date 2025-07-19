// src/components/ProductCard.js
'use client';

import Image from 'next/image';
import styles from './ProductCard.module.css';
import { useCart } from '@/context/CartContext';
import Button from './Button';

// Este componente recebe um objeto 'produto' como propriedade (prop)
export default function ProductCard({ produto }) {
  const { addToCart } = useCart();

  return (
    <div className={styles.card}>
      {/* O componente <Image> do Next.js otimiza as imagens para nós */}
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
        <p className={styles.cardPrice}>
          {/* Esta linha formata o número para o padrão de moeda brasileiro */}
          {produto.preco.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </div>
      <Button onClick={() => addToCart(produto)}>
          Adicionar ao Carrinho
      </Button>
    </div>
  );
}
