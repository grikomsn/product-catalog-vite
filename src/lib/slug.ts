import type { Product } from "@/data/products";

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findProductBySlug(
  products: Product[],
  slug: string
): Product | undefined {
  return products.find((p) => generateSlug(p.name) === slug);
}
