import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  brand?: string;
  category: string;
  price: number;
  img: string;
  hot?: boolean;
  quantity?: number;
}

export interface PCComponent {
  id: string;
  name: string;
  brand: string;
  category?: string;
  price: number;
  img?: string;
  socket?: string;
  tdp?: number;
  perf?: number;
  vram?: number;
  compat?: string[];
}

interface NexusState {
  cart: Product[];
  isCartOpen: boolean;
  currentBuild: Record<string, PCComponent | null>;
  user: { isLoggedIn: boolean; name: string; isGoogle?: boolean } | null;
  
  // Actions
  setCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, delta: number) => void;
  updateBuild: (category: string, component: PCComponent | null) => void;
  login: (name: string, isGoogle?: boolean) => void;
  logout: () => void;
}

export const useNexusStore = create<NexusState>()(
  persist(
    (set) => ({
      cart: [],
      isCartOpen: false,
      currentBuild: { cpu: null, mobo: null, gpu: null, ram: null, cooling: null, cases: null },
      user: null,

      setCartOpen: (isCartOpen) => set({ isCartOpen }),

      addToCart: (product) => set((state) => {
        const productId = String(product.id);
        const existing = state.cart.find(p => String(p.id) === productId);
        if (existing) {
          return {
            cart: state.cart.map(p => 
              String(p.id) === productId 
                ? { ...p, quantity: (p.quantity || 1) + 1 } 
                : p
            ),
            isCartOpen: true
          };
        }
        return { 
          cart: [...state.cart, { ...product, id: productId, quantity: 1 }],
          isCartOpen: true
        };
      }),

      removeFromCart: (productId) => set((state) => ({ 
        cart: state.cart.filter(p => String(p.id) !== String(productId)) 
      })),

      updateQuantity: (productId, delta) => set((state) => ({
        cart: state.cart.map(p => 
          String(p.id) === String(productId)
            ? { ...p, quantity: Math.max(1, (p.quantity || 1) + delta) } 
            : p
        )
      })),

      updateBuild: (category, component) => set((state) => ({
        currentBuild: { ...state.currentBuild, [category]: component }
      })),

      login: (name, isGoogle = false) => set({ user: { isLoggedIn: true, name, isGoogle } }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'nexus-storage',
    }
  )
);
