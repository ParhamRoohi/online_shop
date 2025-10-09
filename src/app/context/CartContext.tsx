"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Defined the type for cart items
export type CartItemType = {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
};

// Defined the context type
type CartContextType = {
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  getTotalPrice: () => number;
};

// Context was created
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component was created
export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const addToCart = (item: CartItemType) => {
    setCartItems((prevItems) => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevItems.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex !== -1) {
        // If it exists, increase the quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + item.quantity,
        };
        return updatedItems;
      } else {
        // If it doesn't exist, add it to the cart
        return [...prevItems, item];
      }
    });
  };

  const increaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((prevItems) => {
      const itemToDecrease = prevItems.find((item) => item.id === id);

      if (itemToDecrease && itemToDecrease.quantity === 1) {
        // If quantity is 1, remove the item
        return prevItems.filter((item) => item.id !== id);
      } else {
        // Otherwise, decrease the quantity
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
