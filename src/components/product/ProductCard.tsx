import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { generateSlug } from "@/lib/slug";
import { useCartStore } from "@/stores/cartStore";

/**
 * Props for the ProductCard component.
 */
interface ProductCardProps {
  /** Product data to display */
  product: Product;
}

/**
 * ProductCard - Individual product display card.
 * 
 * A clickable card that links to the product detail page. Features:
 * - Product image with hover zoom effect
 * - Optional promotional badge overlay
 * - Product name, description, price, and rating
 * - Category badge
 * - "Add to Cart" button (prevents navigation when clicked)
 * 
 * The entire card is wrapped in a Link for navigation, but the Add to Cart
 * button stops propagation to prevent triggering the link navigation.
 * 
 * @example
 * <ProductCard product={product} />
 */
export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  
  // Generate URL-friendly slug from product name for linking
  const slug = generateSlug(product.name);

  /**
   * Handle add to cart button click.
   * 
   * Prevents the click from bubbling to the parent Link component,
   * which would otherwise navigate to the product detail page.
   * Stops both default link behavior and event propagation.
   */
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <Link to={`/product/${slug}`} className="block">
      <Card className="group h-full transition-shadow hover:shadow-md cursor-pointer">
        {/* Product image with optional badge */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.badge && (
            <Badge className="absolute left-3 top-3" variant="default">
              {product.badge}
            </Badge>
          )}
        </div>
        <CardHeader className="space-y-1">
          <div className="flex items-start justify-between gap-2">
            {/* Product name with line clamp for consistent height */}
            <CardTitle className="line-clamp-1 text-base">
              {product.name}
            </CardTitle>
          </div>
          {/* Product description - 2 lines max */}
          <CardDescription className="line-clamp-2 text-xs">
            {product.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {/* Rating display */}
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
          {/* Price and category */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">
              ${product.price.toFixed(2)}
            </span>
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button onClick={handleAddToCart} className="w-full" size="sm">
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
