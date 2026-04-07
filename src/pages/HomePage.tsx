import { useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Sidebar } from "@/components/filter/Sidebar";
import { MobileFilterSheet } from "@/components/filter/MobileFilterSheet";
import { SEO } from "@/components/seo/SEO";
import { Search } from "lucide-react";

/**
 * HomePage - Product listing with search and category filtering.
 * 
 * This is the main catalog page featuring:
 * - Real-time product search
 * - Multi-select category filtering
 * - URL-based filter persistence (enables shareable filtered links)
 * - Responsive layout with desktop sidebar and mobile sheet
 * - Dynamic SEO based on current filters
 * 
 * State Management Strategy:
 * - Uses URL search params as the single source of truth for filters
 * - Syncs local input state with URL (debounced for search)
 * - Enables browser back/forward navigation through filter history
 */
export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ============================================================================
  // URL State Extraction
  // ============================================================================
  
  // Extract search query from URL (?search=query)
  const searchQuery = searchParams.get("search") ?? "";
  
  // Extract selected categories from URL (?category=Electronics&category=Books)
  // Supports multi-select via repeated category params
  const categoryParams = searchParams.getAll("category");
  
  // Default to "All" if no categories specified (shows all products)
  const selectedCategories = categoryParams.length > 0 ? categoryParams : ["All"];

  // ============================================================================
  // Dynamic SEO Generation
  // ============================================================================
  
  // Generate SEO title based on current filters for better search relevance
  const seoTitle = searchQuery 
    ? `Search Results for "${searchQuery}" - ShopHub`
    : selectedCategories.length === 1 && selectedCategories[0] !== "All"
    ? `${selectedCategories[0]} Products - ShopHub`
    : "ShopHub - Premium Product Catalog";

  // Generate SEO description with contextual information about current view
  const seoDescription = searchQuery
    ? `Find the best products matching "${searchQuery}" at ShopHub. Browse our curated selection with fast shipping and 30-day returns.`
    : selectedCategories.length === 1 && selectedCategories[0] !== "All"
    ? `Browse our premium selection of ${selectedCategories[0].toLowerCase()} products. Quality items with fast shipping and easy returns.`
    : "Discover premium products across electronics, clothing, home & garden, sports, books, toys, and beauty. Shop the best deals with fast shipping and 30-day returns.";

  // ============================================================================
  // Filter Handlers
  // ============================================================================
  
  /**
   * Handles category selection/deselection with multi-select support.
   * 
   * Logic:
   * - Clicking "All" clears all category filters
   * - Clicking an already-selected category removes it
   * - Clicking a new category adds it to the selection
   * - If all categories are deselected, defaults back to "All"
   * 
   * Uses URLSearchParams to build the new query string while preserving
   * other params (like search) using { replace: true } to avoid history spam.
   */
  const handleCategoryChange = useCallback(
    (category: string) => {
      const newParams = new URLSearchParams(searchParams);

      if (category === "All") {
        // "All" selected - clear all category filters
        newParams.delete("category");
      } else {
        const currentCategories = newParams.getAll("category");

        if (currentCategories.includes(category)) {
          // Category already selected - remove it
          newParams.delete("category");
          const newSelection = currentCategories.filter((c) => c !== category);
          // Re-append remaining categories
          newSelection.forEach((c) => {
            newParams.append("category", c);
          });
        } else {
          // New category - add to selection
          newParams.append("category", category);
        }

        // If no categories selected after removal, default to "All" (clear params)
        const finalCategories = newParams.getAll("category");
        if (finalCategories.length === 0) {
          newParams.delete("category");
        }
      }

      // Update URL without adding to browser history stack (replace)
      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  /** Clears all filters (both search and categories) back to default state */
  const handleClearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  // ============================================================================
  // Product Filtering Logic
  // ============================================================================
  
  /**
   * Memoized filtered product list.
   * 
   * Filter criteria:
   * 1. Search match: product name OR description contains search query (case-insensitive)
   * 2. Category match: product category is in selected categories OR "All" is selected
   * 
   * Re-computes only when searchQuery or selectedCategories change.
   */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Check if product matches search query (name or description)
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Check if product matches selected categories
      const matchesCategory =
        selectedCategories.includes("All") ||
        selectedCategories.includes(product.category);

      // Product must satisfy both criteria
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories]);

  // ============================================================================
  // URL Building
  // ============================================================================
  
  /** Constructs canonical URL including query params for SEO */
  const buildCanonicalUrl = () => {
    const base = "https://grikomsn.github.io/product-catalog-vite/";
    if (searchParams.toString()) {
      return `${base}?${searchParams.toString()}`;
    }
    return base;
  };

  // ============================================================================
  // Render
  // ============================================================================
  
  return (
    <>
      {/* Dynamic SEO based on current filter state */}
      <SEO 
        title={seoTitle}
        description={seoDescription}
        url={buildCanonicalUrl()}
      />
      <div className="flex gap-8">
      {/* Desktop Sidebar - Hidden on mobile, sticky positioning for filters */}
      <Sidebar
        selectedCategories={selectedCategories}
        onCategoryChange={handleCategoryChange}
        productCount={filteredProducts.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        {/* Mobile Filter Bar - Shows filter button and product count on mobile */}
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

        {/* Results Header (Desktop) - Shows title and product count */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold tracking-tight">All Products</h1>
          <span className="text-sm text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </span>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          // Empty state when no products match filters
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
    </>
  );
}
