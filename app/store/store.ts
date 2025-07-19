// store.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartStoreState {
  inCart: Record<string, boolean>;
  totalPrice: number;
  toggleInCart: (id: string) => void;
  calculateTotalPrice: (items: { id: number; price: number }[]) => void;
}

export const useCartStore = create<CartStoreState>()(
  persist(
    (set) => ({
      inCart: {},
      totalPrice: 0,
      toggleInCart: (id: string) =>
        set((state) => {
          const newInCart = {
            ...state.inCart,
            [id]: !state.inCart[id],
          };
          return { inCart: newInCart };
        }),
      calculateTotalPrice: (items) => 
        set((state) => ({
          totalPrice: items.reduce((sum, item) => {
            return sum + (state.inCart[item.id] ? item.price : 0);
          }, 0),
        })),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);