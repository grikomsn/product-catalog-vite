# Stores

Zustand state management stores for global application state.

## Files

- **cartStore.ts**: Shopping cart state with localStorage persistence

## Cart Store

### State Shape

```typescript
interface CartState {
  items: CartItem[];           // Array of cart items
  addItem: (item) => void;     // Add or increment quantity
  removeItem: (id) => void;    // Remove item completely
  updateQuantity: (id, qty) => void;  // Set specific quantity
  clearCart: () => void;       // Empty cart
  getTotalItems: () => number; // Sum of all quantities
  getTotalPrice: () => number;  // Sum of price × quantity
}

interface CartItem {
  productId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
```

### Usage

```typescript
import { useCartStore } from "@/stores/cartStore";

// Add item to cart
const addItem = useCartStore((state) => state.addItem);
addItem({ productId: 1, name: "Product", price: 29.99, image: "url" });

// Get computed totals (reactive)
const totalItems = useCartStore((state) => state.getTotalItems());
const totalPrice = useCartStore((state) => state.getTotalPrice());

// Get cart items
const items = useCartStore((state) => state.items);
```

### Persistence

The cart automatically persists to `localStorage` under the key `"shophub-cart-storage"`.
Cart contents survive page refreshes and browser sessions.

## Store Patterns

1. **Selector Pattern**: Use selector functions to subscribe to specific state slices
2. **Computed Values**: Store computed values as methods that calculate on demand
3. **Persistence**: Use Zustand's `persist` middleware for localStorage sync
4. **Type Safety**: Define full interface including state and actions

## Adding New Stores

1. Create store file following the cartStore pattern
2. Define state interface with actions
3. Use `create()` from zustand (and `persist` if needed)
4. Export hook for component usage
5. Document store structure in this README
