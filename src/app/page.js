// src/app/page.js
import { produtos } from '@/data/produtos';
import ProductCard from '@/components/ProductCard';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <section className={styles.grid}>
        {/* Usamos .map() para criar um card para cada produto da nossa lista */}
        {produtos.map((produto) => (
          <ProductCard key={produto.id} produto={produto} />
        ))}
      </section>
    </main>
  );
}
