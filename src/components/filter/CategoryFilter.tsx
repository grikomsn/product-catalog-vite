import { Checkbox } from "@/components/ui/checkbox";
import { categories } from "@/data/products";

/**
 * Props for the CategoryFilter component.
 */
interface CategoryFilterProps {
  /** Array of currently selected category names (including possibly "All") */
  selectedCategories: string[];
  /** Callback invoked when a category checkbox is toggled */
  onCategoryChange: (category: string) => void;
}

/**
 * CategoryFilter - Checkbox list of product categories.
 * 
 * Renders a vertical list of checkboxes for all available categories.
 * Used by both Sidebar (desktop) and MobileFilterSheet (mobile).
 * 
 * The "All" category is a special value that represents no filtering
 * (show all products). When selected alongside other categories, the
 * filter behavior depends on implementation in the parent component.
 * 
 * @example
 * // In a parent component
 * <CategoryFilter
 *   selectedCategories={["Electronics", "Books"]}
 *   onCategoryChange={(cat) => toggleCategory(cat)}
 * />
 */
export function CategoryFilter({
  selectedCategories,
  onCategoryChange,
}: CategoryFilterProps) {
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
