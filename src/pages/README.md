# Pages

Route-level page components corresponding to URL paths.

## Files

- **HomePage.tsx**: Product listing page with search and filters (`/`)
- **ProductDetailPage.tsx**: Individual product view (`/product/:slug`)

## Routing

Pages are rendered by React Router within the `RootLayout` from `App.tsx`:

```typescript
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "product/:slug", element: <ProductDetailPage /> },
    ],
  },
]);
```

## Page Responsibilities

### HomePage

- Fetch and display product catalog
- Handle search queries (URL-based)
- Manage category filters (URL-based)
- Generate dynamic SEO based on filters
- Responsive layout (sidebar on desktop, sheet on mobile)

### ProductDetailPage

- Resolve product from URL slug parameter
- Display full product information
- Show customer reviews section
- Handle "Add to Cart" functionality
- Generate product-specific SEO with JSON-LD
- Handle 404 for invalid slugs

## URL State Management

Both pages use URL search parameters for state:
- **HomePage**: `?search=query&category=Electronics`
- **ProductDetailPage**: `/product/wireless-headphones-pro`

This enables:
- Shareable filtered views
- Browser back/forward navigation
- SEO-friendly URLs
- Deep linking to specific products

## Adding New Pages

1. Create component in `pages/`
2. Add route in `App.tsx`
3. Include SEO component with appropriate meta tags
4. Update navigation links as needed
