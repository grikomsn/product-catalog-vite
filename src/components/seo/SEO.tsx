import { Helmet } from "react-helmet-async";
import type { Product } from "@/data/products";
import { generateSlug } from "@/lib/slug";

/**
 * Props for the SEO component defining all configurable meta tag values.
 */
interface SEOProps {
  /** Page title (will be suffixed with " | ShopHub" if not already present) */
  title?: string;
  /** Meta description for search engines (max ~160 characters recommended) */
  description?: string;
  /** Comma-separated keywords for search indexing */
  keywords?: string;
  /** Open Graph / Twitter Card image URL (should be 1200x630 for optimal sharing) */
  image?: string;
  /** Canonical URL for this page */
  url?: string;
  /** Open Graph type - "website" for general pages, "product" for product detail pages */
  type?: "website" | "product";
  /** Product data (required when type="product" for generating structured data) */
  product?: Product;
}

/** Base URL for the deployed application - used in all absolute URLs */
const BASE_URL = "https://grikomsn.github.io/product-catalog-vite";
/** Default social sharing image (1200x630px Open Graph image) */
const DEFAULT_IMAGE = `${BASE_URL}/opengraph.jpg`;
/** Default meta description for the homepage and fallback pages */
const DEFAULT_DESCRIPTION =
  "Discover premium products across electronics, clothing, home & garden, sports, books, toys, and beauty. Shop the best deals with fast shipping and 30-day returns.";
/** Default keywords for general site indexing */
const DEFAULT_KEYWORDS =
  "shopping, ecommerce, electronics, clothing, home garden, sports, books, toys, beauty, online store";

/**
 * SEO component for managing all meta tags and structured data.
 * 
 * Uses react-helmet-async to inject tags into the document head.
 * Automatically generates JSON-LD structured data for products and breadcrumbs,
 * which improves search engine visibility and enables rich results.
 * 
 * Features:
 * - Dynamic title with automatic "ShopHub" suffix
 * - Open Graph tags for Facebook/LinkedIn sharing
 * - Twitter Card tags for Twitter sharing
 * - Canonical URL to prevent duplicate content issues
 * - JSON-LD structured data (Schema.org):
 *   - Product schema with offers and ratings (on product pages)
 *   - BreadcrumbList schema for navigation structure
 * 
 * @example
 * // Homepage
 * <SEO />
 * 
 * // Product page
 * <SEO 
 *   title="Wireless Headphones Pro"
 *   description="Premium noise-cancelling headphones"
 *   type="product"
 *   product={product}
 * />
 */
export function SEO({
  title = "ShopHub - Premium Product Catalog",
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = "website",
  product,
}: SEOProps) {
  // Append "ShopHub" suffix unless already present in title
  const fullTitle = title.includes("ShopHub") ? title : `${title} | ShopHub`;

  /**
   * Generates JSON-LD structured data for product pages.
   * 
   * Includes Product schema with:
   * - Basic product info (name, description, image, SKU)
   * - Brand information
   * - Offer details (price, availability, currency)
   * - Aggregate rating from reviews
   * 
   * Returns null if no product data is provided.
   * 
   * @see https://schema.org/Product
   */
  const getProductJSONLD = () => {
    if (!product) return null;

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: product.image,
      description: product.description,
      sku: `SH-${product.id}`,
      brand: {
        "@type": "Brand",
        name: "ShopHub",
      },
      offers: {
        "@type": "Offer",
        url: `${BASE_URL}/product/${generateSlug(product.name)}`,
        priceCurrency: "USD",
        price: product.price.toFixed(2),
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "ShopHub",
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.rating.toString(),
        reviewCount: product.reviews.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      category: product.category,
    };
  };

  /**
   * Generates BreadcrumbList JSON-LD structured data.
   * 
   * Creates navigation breadcrumbs for search results:
   * - Home page: single "Home" item
   * - Product page: Products > Category > Product Name hierarchy
   * 
   * @see https://schema.org/BreadcrumbList
   */
  const getBreadcrumbJSONLD = () => {
    if (!product) {
      // Homepage breadcrumb - just the root
      return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL,
          },
        ],
      };
    }

    // Product page breadcrumb with category hierarchy
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Products",
          item: BASE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: product.category,
          // Category filter link for easy navigation back to filtered view
          item: `${BASE_URL}/?category=${encodeURIComponent(product.category)}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: product.name,
          item: `${BASE_URL}/product/${generateSlug(product.name)}`,
        },
      ],
    };
  };

  const productJSONLD = getProductJSONLD();
  const breadcrumbJSONLD = getBreadcrumbJSONLD();

  return (
    <Helmet>
      {/* Primary Meta Tags - Essential for all search engines */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook - Controls how links appear when shared */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {product && <meta property="og:price:amount" content={product.price.toFixed(2)} />}
      {product && <meta property="og:price:currency" content="USD" />}

      {/* Twitter Card - Twitter-specific sharing format */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* JSON-LD Structured Data - Enables rich search results */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbJSONLD)}
      </script>
      {productJSONLD && (
        <script type="application/ld+json">
          {JSON.stringify(productJSONLD)}
        </script>
      )}
    </Helmet>
  );
}
