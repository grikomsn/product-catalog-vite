import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/Navbar";
import { HomePage } from "@/pages/HomePage";
import { ProductDetailPage } from "@/pages/ProductDetailPage";

/**
 * RootLayout - Application shell wrapping all routes.
 * 
 * Provides consistent layout structure:
 * - Navbar at the top (sticky)
 * - Main content area with container and padding
 * - Full-height background
 * 
 * The Outlet component renders the matched child route component.
 */
function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

/**
 * React Router configuration with browser history.
 * 
 * Routes:
 * - / (index): HomePage - product listing with search and filters
 * - /product/:slug: ProductDetailPage - individual product view
 * 
 * Base name is set for GitHub Pages deployment at /product-catalog-vite/ path.
 * This ensures all routes work correctly when deployed to a subdirectory.
 */
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "product/:slug",
          element: <ProductDetailPage />,
        },
      ],
    },
  ],
  {
    // Required for GitHub Pages subdirectory deployment
    basename: "/product-catalog-vite/",
  }
);

/**
 * App - Root application component.
 * 
 * Wraps the entire application with:
 * - ThemeProvider for dark/light mode support (default: system preference)
 * - RouterProvider for client-side routing
 * 
 * This is the entry point component mounted by main.tsx.
 */
function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
