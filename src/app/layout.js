// src/app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext'; // 1. Importe o Provider

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Cardápio Sushi House',
  description: 'O melhor da culinária japonesa',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        {/* 2. Envolva o children com o CartProvider */}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
