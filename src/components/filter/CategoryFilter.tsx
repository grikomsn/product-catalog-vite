import { Checkbox } from "@/components/ui/checkbox";
import { categories } from "@/data/products";

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
}

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
