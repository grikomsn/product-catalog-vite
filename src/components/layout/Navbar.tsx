import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Search, Package, ArrowLeft } from "lucide-react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useState, useEffect } from "react";

/**
 * Navbar - Sticky header with logo, search, cart, and theme toggle.
 * 
 * Features:
 * - Sticky positioning with backdrop blur for modern aesthetic
 * - Conditional search bar (only shows on homepage)
 * - Back button (shows on non-home pages)
 * - Cart drawer trigger with item count badge
 * - Theme toggle button
 * - Clicking logo clears all filters and returns home
 * 
 * Search Implementation:
 * - Uses debounced input (300ms) to avoid excessive URL updates
 * - Syncs input state with URL params for consistency
 * - Only active on homepage
 */
export function Navbar() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Check if currently on homepage to conditionally render search
  const isHomePage = location.pathname === "/";

  // ============================================================================
  // Search State Management
  // ============================================================================
  
  /**
   * Local controlled state for search input.
   * Initialized from URL params on mount, enabling shareable search links.
   */
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? ""
  );

  /**
   * Effect: Sync local input with URL when params change externally.
   * 
   * Handles cases where:
   * - User navigates via back/forward buttons
   * - Filters are cleared programmatically
   * - URL is modified by other components
   */
  useEffect(() => {
    setSearchInput(searchParams.get("search") ?? "");
  }, [searchParams]);

  /**
   * Effect: Debounced search URL updates.
   * 
   * Delays URL update by 300ms after user stops typing to:
   * - Reduce history spam (each keystroke won't create a new history entry)
   * - Improve performance by batching rapid changes
   * - Provide better UX by waiting for typing to pause
   * 
   * Cleanup function clears timeout on unmount or input change to prevent
   * stale updates.
   */
  useEffect(() => {
    // Only enable search functionality on homepage
    if (!isHomePage) return;

    const timeoutId = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      if (searchInput.trim()) {
        newParams.set("search", searchInput.trim());
      } else {
        newParams.delete("search");
      }
      // Use replace to avoid adding to browser history stack
      setSearchParams(newParams, { replace: true });
    }, 300);

    // Cleanup: clear timeout if input changes before delay completes
    return () => clearTimeout(timeoutId);
  }, [searchInput, isHomePage, searchParams, setSearchParams]);

  // ============================================================================
  // Handlers
  // ============================================================================
  
  /** Clears all URL params (search and filters) and resets search input */
  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
    setSearchInput("");
  };

  // ============================================================================
  // Render
  // ============================================================================
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        {/* Logo - Clicking clears filters and returns to home */}
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={handleClearFilters}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Package className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="hidden text-lg font-semibold tracking-tight sm:inline-block">
            ShopHub
          </span>
        </Link>

        {/* Search Bar - Only rendered on homepage */}
        {isHomePage ? (
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-9 w-full"
              />
            </div>
          </div>
        ) : (
          // Spacer to push other elements right when no search on detail pages
          <div className="flex-1" />
        )}

        {/* Back button - Only on non-home pages (product detail) */}
        {!isHomePage && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back</span>
          </Button>
        )}

        {/* Cart Drawer Trigger */}
        <CartDrawer />

        {/* Theme Toggle Button */}
        <ThemeToggle />
      </div>
    </header>
  );
}
