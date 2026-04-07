import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App.tsx";

/**
 * Application entry point.
 * 
 * Mounts the React application to the DOM using:
 * - StrictMode: Enables additional development checks and warnings
 * - HelmetProvider: Provides context for react-helmet-async (SEO meta tags)
 * - App: Root application component with routing and theme
 * 
 * The app mounts to the element with id "root" in index.html.
 */
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);
