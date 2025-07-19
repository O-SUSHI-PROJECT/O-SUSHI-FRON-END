// src/app/layout.js
import Header from '@/components/Header';
import { CartProvider } from '@/context/CartContext'; 
import { Inter } from 'next/font/google';
import './globals.css';

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
        <CartProvider>
          <Header/>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
