import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * Represents a single item in the shopping cart.
 * Stores essential product information needed for checkout display and calculations.
 */
interface CartItem {
  /** Unique product identifier matching the product catalog */
  productId: number;
  /** Product display name */
  name: string;
  /** Unit price in USD */
  price: number;
  /** URL to product image for cart thumbnail display */
  image: string;
  /** Number of units of this product in the cart */
  quantity: number;
}

/**
 * Cart state interface defining the store structure and available actions.
 * 
 * Uses Zustand for state management with localStorage persistence via
 * the `persist` middleware. The cart survives page refreshes and browser sessions.
 */
interface CartState {
  /** Array of items currently in the cart */
  items: CartItem[];
  
  /**
   * Adds a product to the cart or increments quantity if already present.
   * @param item - Product details (without quantity, defaults to 1)
   */
  addItem: (item: Omit<CartItem, "quantity">) => void;
  
  /**
   * Removes a product entirely from the cart regardless of quantity.
   * @param productId - ID of the product to remove
   */
  removeItem: (productId: number) => void;
  
  /**
   * Updates the quantity of a specific cart item.
   * Automatically removes item if quantity is set to 0 or less.
   * @param productId - ID of the product to update
   * @param quantity - New quantity value (must be positive)
   */
  updateQuantity: (productId: number, quantity: number) => void;
  
  /** Clears all items from the cart */
  clearCart: () => void;
  
  /**
   * Calculates the total number of items in cart (sum of all quantities).
   * @returns Total item count
   */
  getTotalItems: () => number;
  
  /**
   * Calculates the total cart value (sum of price × quantity for all items).
   * @returns Total price in USD
   */
  getTotalPrice: () => number;
}

/**
 * Zustand store for shopping cart state management.
 * 
 * Features:
 * - Add items with automatic quantity merging (increments if product already in cart)
 * - Remove items completely
 * - Update quantities with automatic removal at zero
 * - Persist cart to localStorage (key: "shophub-cart-storage")
 * - Computed totals for item count and price
 * 
 * @example
 * // Add item to cart
 * const addItem = useCartStore((state) => state.addItem);
 * addItem({ productId: 1, name: "Product", price: 29.99, image: "url" });
 * 
 * // Get total items (reactive selector)
 * const totalItems = useCartStore((state) => state.getTotalItems());
 * 
 * // Get total price
 * const totalPrice = useCartStore((state) => state.getTotalPrice());
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          // Check if product already exists in cart
          const existingItem = state.items.find(
            (i) => i.productId === item.productId
          );

          if (existingItem) {
            // Merge: increment quantity of existing item
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }

          // Add new item with quantity of 1
          return {
            items: [...state.items, { ...item, quantity: 1 }],
          };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          // Filter out the item with matching productId
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        // Auto-remove if quantity drops to 0 or below
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          // Map over items and update matching product's quantity
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        // Sum all quantities across all cart items
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        // Calculate subtotal: price × quantity for each item
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "shophub-cart-storage",
    }
  )
);
