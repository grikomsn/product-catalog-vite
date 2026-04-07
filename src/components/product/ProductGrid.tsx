import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

/**
 * Props for the ProductGrid component.
 */
interface ProductGridProps {
  /** Array of products to display in the grid */
  products: Product[];
}

/**
 * ProductGrid - Responsive grid layout for product cards.
 * 
 * Grid breakpoints:
 * - 1 column: Mobile (default)
 * - 2 columns: Small screens (sm)
 * - 3 columns: Extra large screens (xl)
 * - 4 columns: 2XL screens and up
 * 
 * Consistent gap spacing scales with screen size (gap-4 → gap-6).
 * 
 * @example
 * <ProductGrid products={filteredProducts} />
 */
export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
