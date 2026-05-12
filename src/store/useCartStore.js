import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,

      // Open / close drawer
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      // Add a product — if it already exists with same id + size, increment qty
      addToCart: (product, selectedSize = null) =>
        set((state) => {
          const key = selectedSize
            ? `${product.id}-${selectedSize.label}`
            : product.id;

          const exists = state.cart.find((item) => item.cartKey === key);

          if (exists) {
            return {
              cart: state.cart.map((item) =>
                item.cartKey === key
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isCartOpen: true,
            };
          }

          const price = selectedSize ? selectedSize.price : product.price;
          const original_price = selectedSize ? selectedSize.original_price : product.original_price;

          return {
            cart: [
              ...state.cart,
              {
                ...product,
                cartKey: key,
                selectedSize: selectedSize?.label || null,
                price,
                original_price,
                quantity: 1,
              },
            ],
            isCartOpen: true,
          };
        }),

      // Remove item by cartKey
      removeFromCart: (cartKey) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.cartKey !== cartKey),
        })),

      // Update quantity
      updateQuantity: (cartKey, quantity) =>
        set((state) => ({
          cart:
            quantity <= 0
              ? state.cart.filter((item) => item.cartKey !== cartKey)
              : state.cart.map((item) =>
                  item.cartKey === cartKey ? { ...item, quantity } : item
                ),
        })),

      // Clear cart
      clearCart: () => set({ cart: [] }),

      // Computed total
      getTotal: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      // Computed item count
      getCount: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'whiffora-cart', // localStorage key
      partialize: (state) => ({ cart: state.cart }), // only persist cart items
    }
  )
);
