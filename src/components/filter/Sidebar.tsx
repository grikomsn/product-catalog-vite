import { CategoryFilter } from "./CategoryFilter";

/**
 * Props for the Sidebar filter component.
 */
interface SidebarProps {
  /** Array of currently selected category names */
  selectedCategories: string[];
  /** Callback when a category is toggled */
  onCategoryChange: (category: string) => void;
  /** Number of products matching current filters */
  productCount: number;
}

/**
 * Sidebar - Desktop category filter panel.
 * 
 * A sticky sidebar that displays on large screens (lg breakpoint and up).
 * Contains the category filter checkboxes and product count.
 * 
 * Positioning:
 * - Uses sticky positioning (top-20) to remain visible while scrolling
 * - Hidden on mobile devices (replaced by MobileFilterSheet)
 * 
 * @see MobileFilterSheet for mobile filter UI
 */
export function Sidebar({
  selectedCategories,
  onCategoryChange,
  productCount,
}: SidebarProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      {/* Sticky container keeps filters accessible while scrolling */}
      <div className="sticky top-20 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Filters</h2>
          <span className="text-xs text-muted-foreground">
            {productCount} products
          </span>
        </div>
        <CategoryFilter
          selectedCategories={selectedCategories}
          onCategoryChange={onCategoryChange}
        />
      </div>
    </aside>
  );
}
