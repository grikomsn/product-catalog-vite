import type { Product } from "@/data/products";

/**
 * Generates a URL-friendly slug from a product name.
 * 
 * Converts the name to lowercase, replaces non-alphanumeric characters with hyphens,
 * and removes leading/trailing hyphens. This creates clean URLs that are both
 * human-readable and SEO-friendly.
 * 
 * @example
 * generateSlug("Wireless Headphones Pro") // returns "wireless-headphones-pro"
 * generateSlug("Home & Garden") // returns "home-garden"
 * 
 * @param name - The product name to convert into a slug
 * @returns A URL-safe slug string
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")  // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, "");      // Remove leading/trailing hyphens
}

/**
 * Finds a product by its URL slug.
 * 
 * Iterates through the products array and matches against slugs generated
 * from product names. Used for resolving product detail pages from URL parameters.
 * Returns undefined if no matching product is found.
 * 
 * @example
 * findProductBySlug(products, "wireless-headphones-pro") // returns matching Product
 * findProductBySlug(products, "nonexistent-product") // returns undefined
 * 
 * @param products - Array of products to search through
 * @param slug - The URL slug to match against
 * @returns The matching Product or undefined if not found
 */
export function findProductBySlug(
  products: Product[],
  slug: string
): Product | undefined {
  return products.find((p) => generateSlug(p.name) === slug);
}
