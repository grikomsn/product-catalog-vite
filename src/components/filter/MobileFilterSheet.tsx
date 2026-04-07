import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoryFilter } from "./CategoryFilter";
import { Filter } from "lucide-react";

/**
 * Props for the mobile filter sheet component.
 */
interface MobileFilterSheetProps {
  /** Array of currently selected category names */
  selectedCategories: string[];
  /** Callback when a category is toggled */
  onCategoryChange: (category: string) => void;
  /** Number of products matching current filters */
  productCount: number;
}

/**
 * MobileFilterSheet - Slide-out filter drawer for mobile devices.
 * 
 * Provides the same category filtering functionality as the desktop Sidebar
 * but in a Sheet (slide-out drawer) format suitable for mobile screens.
 * 
 * Trigger button is hidden on desktop (lg:hidden) since the Sidebar handles
 * filters on larger screens.
 * 
 * @see Sidebar for desktop filter UI
 */
export function MobileFilterSheet({
  selectedCategories,
  onCategoryChange,
  productCount,
}: MobileFilterSheetProps) {
  return (
    <Sheet>
      {/* Trigger button - visible only on mobile */}
      <SheetTrigger
        render={
          <Button variant="outline" size="sm" className="lg:hidden gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        }
      />
      {/* Sheet slides in from left side on mobile */}
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
