import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItemType = {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
};

type CartState = {
  cartItems: CartItemType[];
  addToCart: (item: CartItemType) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  getTotalPrice: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (item) =>
        set((state) => {
          const existingItemIndex = state.cartItems.findIndex(
            (cartItem) => cartItem.id === item.id
          );

          if (existingItemIndex !== -1) {
            const updatedItems = [...state.cartItems];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity:
                updatedItems[existingItemIndex].quantity + item.quantity,
            };
            return { cartItems: updatedItems };
          } else {
            return { cartItems: [...state.cartItems, item] };
          }
        }),
      increaseQuantity: (id) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),
      decreaseQuantity: (id) =>
        set((state) => {
          const itemToDecrease = state.cartItems.find((item) => item.id === id);

          if (itemToDecrease && itemToDecrease.quantity === 1) {
            return {
              cartItems: state.cartItems.filter((item) => item.id !== id),
            };
          } else {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
              ),
            };
          }
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id),
        })),
      getTotalPrice: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
