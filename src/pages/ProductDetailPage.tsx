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
import { SEO } from "@/components/seo/SEO";
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  Package,
  Check,
  User,
} from "lucide-react";

// ============================================================================
// Mock Data
// ============================================================================

/**
 * Mock customer reviews data.
 * 
 * In a production app, this would be fetched from an API based on the product ID.
 * Currently static for demonstration purposes.
 */
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

// ============================================================================
// Sub-components
// ============================================================================

/**
 * StarRating - Visual 5-star rating display component.
 * 
 * Renders filled or empty stars based on the rating prop.
 * Used for displaying both product ratings and individual review ratings.
 */
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

/**
 * ReviewCard - Individual customer review display component.
 * 
 * Shows reviewer avatar (placeholder), name, date, rating, and review text
 * in a Card layout.
 */
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
            {/* Avatar placeholder with user icon */}
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

// ============================================================================
// Main Component
// ============================================================================

/**
 * ProductDetailPage - Individual product view with full details.
 * 
 * Features:
 * - Resolves product from URL slug parameter
 * - Product image with optional badge overlay
 * - Full product details (price, description, rating)
 * - Add to cart functionality
 * - Customer reviews section with rating distribution
 * - Breadcrumb navigation
 * - Product-specific SEO with JSON-LD structured data
 * - 404 handling for invalid slugs
 */
export function ProductDetailPage() {
  // Extract slug from URL: /product/:slug
  const { slug } = useParams<{ slug: string }>();
  const addItem = useCartStore((state) => state.addItem);

  // Resolve product from slug (returns undefined if not found)
  const product = slug ? findProductBySlug(products, slug) : undefined;

  // ============================================================================
  // Not Found State
  // ============================================================================
  
  if (!product) {
    return (
      <>
        {/* SEO for 404 page */}
        <SEO
          title="Product Not Found"
          description="The product you're looking for doesn't exist or has been removed. Browse our catalog for similar items."
        />
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
      </>
    );
  }

  // ============================================================================
  // Handlers
  // ============================================================================
  
  /** Adds the current product to the shopping cart with quantity 1 */
  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  // ============================================================================
  // SEO Data Preparation
  // ============================================================================
  
  // Build canonical URL for this product page
  const productUrl = `https://grikomsn.github.io/product-catalog-vite/product/${slug}`;
  
  // Generate product-specific keywords for better search indexing
  const productKeywords = `${product.name}, ${product.category}, buy ${product.name.toLowerCase()}, ${product.category.toLowerCase()} products, shophub, online shopping`;

  // ============================================================================
  // Render
  // ============================================================================
  
  return (
    <>
      {/* Product-specific SEO with structured data */}
      <SEO
        title={product.name}
        description={product.description}
        keywords={productKeywords}
        image={product.image}
        url={productUrl}
        type="product"
        product={product}
      />
      <div className="space-y-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground transition-colors">
          Products
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Product Details Grid - 2 columns on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image with optional badge overlay */}
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

        {/* Product Info Column */}
        <div className="flex flex-col">
          <div className="mb-4">
            <Badge variant="secondary" className="mb-3">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              {product.name}
            </h1>
            {/* Rating display with rounded value for stars */}
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

          {/* Shipping/Return Info List */}
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

          {/* Action Buttons */}
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

        {/* Rating Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Average Rating Card */}
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

          {/* Rating Distribution Bars Card */}
          <Card className="md:col-span-2">
            <CardContent className="pt-6">
              <div className="space-y-2">
                {/* 
                  Rating distribution visualization.
                  Shows horizontal bars for each star level (5★ to 1★) with 
                  hardcoded percentages representing typical review distributions.
                  
                  In a production app, these would be calculated from actual review data.
                */}
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm w-8">{stars}★</span>
                    {/* Progress bar background */}
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      {/* 
                        Filled portion representing percentage of reviews at this rating.
                        Hardcoded distribution: 5★=65%, 4★=25%, 3★=7%, 2★=2%, 1★=1%
                      */}
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{
                          width: `${stars === 5 ? 65 : stars === 4 ? 25 : stars === 3 ? 7 : stars === 2 ? 2 : 1}%`,
                        }}
                      />
                    </div>
                    {/* Percentage label */}
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

        {/* Individual Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      {/* Back to Products Link */}
      <div className="border-t pt-8">
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            View All Products
          </Button>
        </Link>
      </div>
    </div>
    </>
  );
}
