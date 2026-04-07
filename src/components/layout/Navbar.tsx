import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { Search, Package, ArrowLeft } from "lucide-react";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useState, useEffect } from "react";

export function Navbar() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isHomePage = location.pathname === "/";

  // Local state for search input (controlled)
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? ""
  );

  // Sync local input with URL params when they change externally
  useEffect(() => {
    setSearchInput(searchParams.get("search") ?? "");
  }, [searchParams]);

  // Update URL when search changes (debounced)
  useEffect(() => {
    if (!isHomePage) return;

    const timeoutId = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      if (searchInput.trim()) {
        newParams.set("search", searchInput.trim());
      } else {
        newParams.delete("search");
      }
      setSearchParams(newParams, { replace: true });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchInput, isHomePage, searchParams, setSearchParams]);

  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
    setSearchInput("");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center gap-4 px-4">
        {/* Logo */}
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

        {/* Search Bar - Only on home page */}
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
          <div className="flex-1" />
        )}

        {/* Back button - Only on non-home pages */}
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

        {/* Cart Drawer */}
        <CartDrawer />

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
