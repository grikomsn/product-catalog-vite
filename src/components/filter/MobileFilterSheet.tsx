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

interface MobileFilterSheetProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  productCount: number;
}

export function MobileFilterSheet({
  selectedCategories,
  onCategoryChange,
  productCount,
}: MobileFilterSheetProps) {
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
