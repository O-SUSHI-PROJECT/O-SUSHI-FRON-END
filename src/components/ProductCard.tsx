'use client';

import Image from 'next/image';
import styles from './ProductCard.module.css';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types/api';
import Button from './Button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product.isAvailable) {
      addToCart(product);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.imageUrl || '/images/sushi.jpg'}
          alt={product.name}
          width={300}
          height={200}
          className={styles.cardImage}
        />
        {!product.isAvailable && (
          <div className={styles.unavailableOverlay}>
            <span>Indisponível</span>
          </div>
        )}
      </div>
      
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{product.name}</h3>
        <p className={styles.cardDescription}>{product.description}</p>
        <p className={styles.cardCategory}>{product.category}</p>
        
        {product.ingredients && product.ingredients.length > 0 && (
          <div className={styles.ingredients}>
            <span className={styles.ingredientsLabel}>Ingredientes:</span>
            <span className={styles.ingredientsList}>
              {product.ingredients.join(', ')}
            </span>
          </div>
        )}
        
        {product.preparationTime && (
          <p className={styles.preparationTime}>
            ⏱️ {product.preparationTime} min
          </p>
        )}
        
        <p className={styles.cardPrice}>
          {product.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </div>
      
      <Button 
        onClick={handleAddToCart}
        disabled={!product.isAvailable}
        className={!product.isAvailable ? styles.disabledButton : ''}
      >
        {product.isAvailable ? 'Adicionar ao Carrinho' : 'Indisponível'}
      </Button>
    </div>
  );
} 