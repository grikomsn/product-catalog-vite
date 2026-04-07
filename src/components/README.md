# Components

This directory contains all React components organized by feature domain.

## Directory Structure

```
components/
├── cart/              # Shopping cart related components
├── filter/            # Product filtering components
├── layout/            # Layout and navigation components
├── product/           # Product display components
├── seo/               # SEO and meta tag components
├── ui/                # shadcn/ui primitive components
├── theme-provider.tsx # Dark/light mode context provider
└── theme-toggle.tsx   # Theme mode toggle button
```

## Component Categories

### Cart (`cart/`)
- **CartDrawer.tsx**: Slide-out shopping cart with item management

### Filter (`filter/`)
- **CategoryFilter.tsx**: Checkbox list of product categories
- **MobileFilterSheet.tsx**: Mobile slide-out filter panel
- **Sidebar.tsx**: Desktop sticky filter sidebar

### Layout (`layout/`)
- **Navbar.tsx**: Sticky header with logo, search, cart, and theme toggle

### Product (`product/`)
- **ProductCard.tsx**: Individual product card with add-to-cart
- **ProductGrid.tsx**: Responsive grid layout for product cards

### SEO (`seo/`)
- **SEO.tsx**: Dynamic meta tags and JSON-LD structured data

### UI (`ui/`)
Primitive components from shadcn/ui:
- **badge.tsx**: Status and category badges
- **button.tsx**: Button with variants
- **card.tsx**: Card container components
- **checkbox.tsx**: Form checkbox input
- **input.tsx**: Text input field
- **sheet.tsx**: Slide-out drawer/panel

## Component Conventions

1. **File Naming**: PascalCase for component files (e.g., `ProductCard.tsx`)
2. **Props Interface**: Each component exports its props interface (e.g., `ProductCardProps`)
3. **Default Exports**: Components are exported as named exports (not default)
4. **Documentation**: Components include JSDoc comments explaining purpose and props
5. **Styling**: Uses Tailwind CSS utility classes exclusively

## Adding New Components

1. Create file in appropriate subdirectory (or new subdirectory for new domains)
2. Define props interface with JSDoc comments
3. Export component as named export
4. Add component-level JSDoc explaining purpose and usage
5. Import and use in parent components

## shadcn/ui Components

To add new shadcn/ui components:
```bash
bunx shadcn@latest add [component-name]
```

Components are installed to `src/components/ui/` and can be imported via:
```typescript
import { Button } from "@/components/ui/button";
```
