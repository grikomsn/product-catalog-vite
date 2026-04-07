import { CategoryFilter } from "./CategoryFilter";

interface SidebarProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  productCount: number;
}

export function Sidebar({
  selectedCategories,
  onCategoryChange,
  productCount,
}: SidebarProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
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
