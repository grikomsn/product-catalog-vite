# Product Catalog

A responsive product catalog built with React, TypeScript, and Vite.

![Product Catalog](https://grikomsn.github.io/product-catalog-vite/)

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Search**: Real-time product filtering by name and description
- **Category Filters**: Filter by product categories (Electronics, Clothing, etc.)
- **Mobile Filters**: Slide-in filter sheet for mobile devices
- **Shopping Cart**: Add items to cart with counter badge

## Tech Stack

- React 19 + TypeScript
- Vite (build tool)
- Tailwind CSS v4
- shadcn/ui components
- Bun (package manager)

## Quick Start

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Deployment

This project auto-deploys to GitHub Pages on every push to `main`. The workflow is defined in `.github/workflows/deploy.yml`.

**Live site**: https://grikomsn.github.io/product-catalog-vite/

## Project Structure

```
src/
  components/ui/      # shadcn/ui components
  data/products.ts    # Product data
  App.tsx             # Main application
  index.css           # Tailwind styles
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server |
| `bun run build` | Type check and build |
| `bun run lint` | Run ESLint |
| `bun run preview` | Preview production build |

## Customization

Products are defined in `src/data/products.ts`. Each product includes:
- Name, description, price
- Category, rating, reviews
- Image URL (supports external images)
- Optional badge ("Best Seller", "Top Rated")

## License

MIT
