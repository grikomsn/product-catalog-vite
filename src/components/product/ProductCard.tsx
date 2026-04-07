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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const slug = generateSlug(product.name);

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
            <CardTitle className="line-clamp-1 text-base">
              {product.name}
            </CardTitle>
          </div>
          <CardDescription className="line-clamp-2 text-xs">
            {product.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span>
          </div>
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
