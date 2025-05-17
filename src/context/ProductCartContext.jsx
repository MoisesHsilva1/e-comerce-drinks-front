import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({});

export const CartProvider = ({ children }) => {
  const getInitialCartItems = () => {
    const saved = localStorage.getItem("productData");
    const parsed = JSON.parse(saved || "[]");
    return Array.isArray(parsed) ? parsed : [];
  };

  const [cartItems, setCartItems] = useState(getInitialCartItems);

  useEffect(() => {
    localStorage.setItem("productData", JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qtd: i.qtd + item.qtd } : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (id) => {
    setCartItems((prev) =>
      prev.flatMap((item) =>
        item.id !== id
          ? [item]
          : item.qtd > 1
          ? [{ ...item, qtd: item.qtd - 1 }]
          : []
      )
    );
  };
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addItem, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
