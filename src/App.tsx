import { useState, useMemo } from "react";
import { products, categories, type Product } from "./data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Search,
  ShoppingCart,
  Filter,
  Star,
  Package,
} from "lucide-react";

function Navbar({
  searchQuery,
  setSearchQuery,
  cartCount,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden text-lg font-semibold tracking-tight sm:inline-block">
            ShopHub
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
        </div>

        {/* Cart Button */}
        <Button variant="outline" size="icon" className="relative shrink-0">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <Badge
              variant="default"
              className="absolute -right-2 -top-2 h-5 w-5 items-center justify-center p-0 text-xs"
            >
              {cartCount}
            </Badge>
          )}
        </Button>
      </div>
    </header>
  );
}

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: () => void }) {
  return (
    <Card className="group h-full transition-shadow hover:shadow-md">
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
          <CardTitle className="line-clamp-1 text-base">{product.name}</CardTitle>
        </div>
        <CardDescription className="line-clamp-2 text-xs">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
          <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button onClick={onAddToCart} className="w-full" size="sm">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

function CategoryFilter({
  selectedCategories,
  onCategoryChange,
}: {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm">Categories</h3>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category} className="flex items-center gap-2">
            <Checkbox
              id={`category-${category}`}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => onCategoryChange(category)}
            />
            <label
              htmlFor={`category-${category}`}
              className="text-sm cursor-pointer hover:text-foreground transition-colors"
            >
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sidebar({
  selectedCategories,
  onCategoryChange,
  productCount,
}: {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  productCount: number;
}) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-20 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Filters</h2>
          <span className="text-xs text-muted-foreground">{productCount} products</span>
        </div>
        <CategoryFilter
          selectedCategories={selectedCategories}
          onCategoryChange={onCategoryChange}
        />
      </div>
    </aside>
  );
}

function MobileFilterSheet({
  selectedCategories,
  onCategoryChange,
  productCount,
}: {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  productCount: number;
}) {
  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="outline" size="sm" className="lg:hidden gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        }
      />
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="text-sm text-muted-foreground">
            {productCount} products found
          </div>
          <CategoryFilter
            selectedCategories={selectedCategories}
            onCategoryChange={onCategoryChange}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["All"]);
  const [cartCount, setCartCount] = useState(0);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.includes("All") ||
        selectedCategories.includes(product.category);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) => {
      if (category === "All") {
        return ["All"];
      }

      const withoutAll = prev.filter((c) => c !== "All");

      if (prev.includes(category)) {
        const newSelection = withoutAll.filter((c) => c !== category);
        return newSelection.length === 0 ? ["All"] : newSelection;
      } else {
        return [...withoutAll, category];
      }
    });
  };

  const handleAddToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartCount}
      />

      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <Sidebar
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
            productCount={filteredProducts.length}
          />

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Bar */}
            <div className="flex items-center justify-between gap-4 mb-6 lg:hidden">
              <MobileFilterSheet
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
                productCount={filteredProducts.length}
              />
              <span className="text-sm text-muted-foreground">
                {filteredProducts.length} products
              </span>
            </div>

            {/* Results Header (Desktop) */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold tracking-tight">All Products</h1>
              <span className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </span>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-4 mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-1">No products found</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategories(["All"]);
                  }}
                >
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
