import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { findProductBySlug } from "@/lib/slug";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCartStore } from "@/stores/cartStore";
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  Package,
  Check,
  User,
} from "lucide-react";

// Mock reviews data
const mockReviews = [
  {
    id: 1,
    author: "Sarah M.",
    rating: 5,
    date: "2 weeks ago",
    content:
      "Absolutely love this product! The quality exceeded my expectations. Would definitely recommend to friends and family.",
  },
  {
    id: 2,
    author: "James K.",
    rating: 4,
    date: "1 month ago",
    content:
      "Great value for money. Minor shipping delay but the product itself is fantastic. Customer service was helpful.",
  },
  {
    id: 3,
    author: "Emily R.",
    rating: 5,
    date: "2 months ago",
    content:
      "This is my third purchase from ShopHub. Consistently excellent quality and fast delivery. Five stars!",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

function ReviewCard({
  review,
}: {
  review: (typeof mockReviews)[0];
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm">{review.author}</CardTitle>
              <p className="text-xs text-muted-foreground">{review.date}</p>
            </div>
          </div>
          <StarRating rating={review.rating} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{review.content}</p>
      </CardContent>
    </Card>
  );
}

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const addItem = useCartStore((state) => state.addItem);

  const product = slug ? findProductBySlug(products, slug) : undefined;

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Package className="h-8 w-8 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/">
          <Button className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">
          Products
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
          {product.badge && (
            <Badge className="absolute left-4 top-4" variant="default">
              {product.badge}
            </Badge>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-4">
            <Badge variant="secondary" className="mb-3">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <StarRating rating={Math.round(product.rating)} />
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          <p className="text-3xl font-bold text-primary mb-6">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-muted-foreground mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10">
                <Check className="h-3 w-3 text-green-500" />
              </div>
              <span>In stock and ready to ship</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10">
                <Check className="h-3 w-3 text-green-500" />
              </div>
              <span>Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500/10">
                <Check className="h-3 w-3 text-green-500" />
              </div>
              <span>30-day return policy</span>
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.history.back()}>
              Back
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="border-t pt-8">
        <h2 className="text-2xl font-bold mb-6">
          Customer Reviews ({product.reviews})
        </h2>

        {/* Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{product.rating}</div>
                <StarRating rating={Math.round(product.rating)} />
                <p className="text-sm text-muted-foreground mt-2">
                  Average rating
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm w-8">{stars}★</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{
                          width: `${stars === 5 ? 65 : stars === 4 ? 25 : stars === 3 ? 7 : stars === 2 ? 2 : 1}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {stars === 5
                        ? "65%"
                        : stars === 4
                        ? "25%"
                        : stars === 3
                        ? "7%"
                        : stars === 2
                        ? "2%"
                        : "1%"}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Individual Reviews */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      {/* Back to Products */}
      <div className="border-t pt-8">
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            View All Products
          </Button>
        </Link>
      </div>
    </div>
  );
}
