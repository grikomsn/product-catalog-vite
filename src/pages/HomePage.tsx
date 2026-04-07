import { useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Sidebar } from "@/components/filter/Sidebar";
import { MobileFilterSheet } from "@/components/filter/MobileFilterSheet";
import { Search } from "lucide-react";

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read values from URL
  const searchQuery = searchParams.get("search") ?? "";
  const categoryParams = searchParams.getAll("category");
  const selectedCategories = categoryParams.length > 0 ? categoryParams : ["All"];

  // Update URL when categories change
  const handleCategoryChange = useCallback(
    (category: string) => {
      const newParams = new URLSearchParams(searchParams);

      if (category === "All") {
        newParams.delete("category");
      } else {
        const currentCategories = newParams.getAll("category");

        if (currentCategories.includes(category)) {
          // Remove category
          newParams.delete("category");
          const newSelection = currentCategories.filter((c) => c !== category);
          newSelection.forEach((c) => {
            newParams.append("category", c);
          });
        } else {
          // Add category
          newParams.append("category", category);
        }

        // If no categories selected or "All" was clicked, default to "All"
        const finalCategories = newParams.getAll("category");
        if (finalCategories.length === 0) {
          newParams.delete("category");
        }
      }

      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

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

  return (
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
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-4 mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-1">No products found</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
              Try adjusting your search or filters to find what you're looking
              for.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={handleClearFilters}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
