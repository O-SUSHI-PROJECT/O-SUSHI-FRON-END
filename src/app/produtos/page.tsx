'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { apiService } from '@/services/api';
import { Product } from '@/types/api';
import ProductCard from '@/components/ProductCard';
import Header from '@/components/Header';
import styles from './page.module.css';

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { isAuthenticated, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth');
      return;
    }

    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated, authLoading, router, selectedCategory]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      const data = selectedCategory 
        ? await apiService.getProducts(selectedCategory)
        : await apiService.getAvailableProducts();
      
      setProducts(data);
    } catch (err) {
      console.error('Erro ao carregar produtos:', err);
      setError('Erro ao carregar produtos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const categories = ['Sushi', 'Temaki', 'Sashimi', 'Hot Roll'];

  if (authLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Será redirecionado pelo useEffect
  }

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>🍣 Cardápio O Sushi</h1>
          <p>Escolha seus pratos favoritos</p>
        </div>

        <div className={styles.filters}>
          <button
            className={`${styles.filterButton} ${selectedCategory === '' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('')}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterButton} ${selectedCategory === category ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {error && (
          <div className={styles.error}>
            {error}
            <button onClick={loadProducts} className={styles.retryButton}>
              Tentar novamente
            </button>
          </div>
        )}

        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loading}>Carregando produtos...</div>
          </div>
        ) : (
          <div className={styles.productsGrid}>
            {products.length === 0 ? (
              <div className={styles.emptyState}>
                <p>Nenhum produto encontrado.</p>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={styles.clearFilterButton}
                  >
                    Ver todos os produtos
                  </button>
                )}
              </div>
            ) : (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
} 