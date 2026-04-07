import { Helmet } from "react-helmet-async";
import type { Product } from "@/data/products";
import { generateSlug } from "@/lib/slug";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "product";
  product?: Product;
}

const BASE_URL = "https://grikomsn.github.io/product-catalog-vite";
const DEFAULT_IMAGE = `${BASE_URL}/opengraph.jpg`;
const DEFAULT_DESCRIPTION =
  "Discover premium products across electronics, clothing, home & garden, sports, books, toys, and beauty. Shop the best deals with fast shipping and 30-day returns.";
const DEFAULT_KEYWORDS =
  "shopping, ecommerce, electronics, clothing, home garden, sports, books, toys, beauty, online store";

export function SEO({
  title = "ShopHub - Premium Product Catalog",
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = "website",
  product,
}: SEOProps) {
  const fullTitle = title.includes("ShopHub") ? title : `${title} | ShopHub`;

  // Generate JSON-LD for product pages
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

  // Generate breadcrumb JSON-LD
  const getBreadcrumbJSONLD = () => {
    if (!product) {
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
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {product && <meta property="og:price:amount" content={product.price.toFixed(2)} />}
      {product && <meta property="og:price:currency" content="USD" />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
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
