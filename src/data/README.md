# Data

Data layer containing type definitions and static/mock data.

## Files

- **products.ts**: Product data model, categories, and sample product catalog

## Data Model

### Product Interface

```typescript
interface Product {
  id: number;           // Unique identifier
  name: string;         // Display name (used for URL slugs)
  description: string;  // Product description
  price: number;        // USD price
  category: string;     // Category name
  rating: number;       // 1.0 to 5.0
  reviews: number;      // Total review count
  image: string;        // Image URL (500x500px recommended)
  badge?: string;       // Optional: "Best Seller", "Top Rated"
}
```

## Categories

Available product categories:
- All
- Electronics
- Clothing
- Home & Garden
- Sports
- Books
- Toys
- Beauty

## Extending the Catalog

To add new products, edit `products.ts`:

```typescript
{
  id: 13,  // Must be unique
  name: "New Product Name",
  description: "Product description",
  price: 99.99,
  category: "Electronics",  // Must match existing category
  rating: 4.5,
  reviews: 100,
  image: "https://images.unsplash.com/...?w=500&h=500&fit=crop",
  badge: "New Arrival",  // Optional
}
```

## Future Enhancements

In a production application, this would be replaced with:
- API client for fetching products from a backend
- Database models and migrations
- GraphQL or REST API schema definitions
- Data validation schemas (e.g., Zod)
