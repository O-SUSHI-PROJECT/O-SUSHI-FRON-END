// src/context/CartContext.js
'use client'; // Necessário para usar hooks de cliente como useState e createContext

import { createContext, useState, useContext } from 'react';

// 1. Criando o Contexto
const CartContext = createContext();

// 2. Criando o Provedor (Componente que vai fornecer os dados do carrinho)
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Verifica se o item já existe no carrinho
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        // Se existe, aumenta a quantidade
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Se não existe, adiciona com quantidade 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // Se a quantidade for zero ou menos, remove o item
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // O valor que será compartilhado com os componentes filhos
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// 3. Criando um Hook customizado para facilitar o uso do contexto
export const useCart = () => {
  return useContext(CartContext);
};