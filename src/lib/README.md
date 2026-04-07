# Lib

Utility functions and shared helpers.

## Files

- **slug.ts**: URL slug generation and product lookup by slug
- **utils.ts**: Tailwind CSS class merging utility (cn)

## Utilities

### `generateSlug(name: string): string`

Converts a product name to a URL-friendly slug.

```typescript
import { generateSlug } from "@/lib/slug";

generateSlug("Wireless Headphones Pro");  // "wireless-headphones-pro"
generateSlug("Home & Garden");            // "home-garden"
```

### `findProductBySlug(products, slug): Product | undefined`

Finds a product in an array by its slug.

```typescript
import { findProductBySlug } from "@/lib/slug";

const product = findProductBySlug(products, "wireless-headphones-pro");
```

### `cn(...inputs: ClassValue[]): string`

Combines Tailwind CSS classes with proper conflict resolution.

```typescript
import { cn } from "@/lib/utils";

// Basic usage
cn("px-4", "py-2");  // "px-4 py-2"

// With conditionals
cn("px-4", isActive && "bg-blue-500");

// Resolves conflicts
cn("px-2", "px-4");  // "px-4" (later wins)
```

## Adding New Utilities

1. Create function in appropriate file (or new file for unrelated utilities)
2. Add JSDoc documentation with examples
3. Export as named export
4. Update this README with usage documentation
