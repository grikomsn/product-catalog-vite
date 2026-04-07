import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * Available theme modes.
 * - "light": Force light mode
 * - "dark": Force dark mode  
 * - "system": Follow OS preference with automatic switching
 */
type Theme = "dark" | "light" | "system";

/**
 * Theme context state interface.
 * 
 * Provides the current theme setting, a setter function, and the resolved
 * theme (the actual "light" or "dark" value after system preference resolution).
 */
interface ThemeProviderState {
  /** Currently selected theme mode (may be "system") */
  theme: Theme;
  /** Function to update the theme setting */
  setTheme: (theme: Theme) => void;
  /** Resolved theme - always "light" or "dark", never "system" */
  resolvedTheme: "dark" | "light";
}

/**
 * React context for theme state.
 * 
 * Uses undefined as default to enable error-throwing when useTheme is called
 * outside of ThemeProvider (helps catch integration mistakes early).
 */
const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

/** localStorage key for persisting user's theme preference */
const storageKey = "vite-ui-theme";

/**
 * Props for the ThemeProvider component.
 */
interface ThemeProviderProps {
  /** Child components to wrap with theme context */
  children: ReactNode;
  /** Default theme to use before user makes a selection (defaults to "system") */
  defaultTheme?: Theme;
}

/**
 * Theme provider component managing dark/light/system mode.
 * 
 * Features:
 * - Persist user preference to localStorage
 * - Automatically detect and follow OS preference when set to "system"
 * - Listen for OS theme changes and update in real-time
 * - Apply appropriate CSS classes to document root for Tailwind dark mode
 * - Prevents hydration mismatch with server-side rendering
 * 
 * The theme is applied by adding "light" or "dark" class to document.documentElement,
 * which Tailwind uses to toggle dark: variant styles.
 * 
 * @example
 * // In App.tsx - wrap your app
 * <ThemeProvider defaultTheme="system">
 *   <App />
 * </ThemeProvider>
 * 
 * // In a component - access theme
 * const { theme, setTheme, resolvedTheme } = useTheme();
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
}: ThemeProviderProps) {
  // Initialize theme from localStorage or default (handles SSR gracefully)
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return (localStorage.getItem(storageKey) as Theme) || defaultTheme;
  });

  // Initialize resolved theme (actual light/dark value)
  // System preference is resolved immediately on client side
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = localStorage.getItem(storageKey) as Theme;
    const currentTheme = savedTheme || defaultTheme;
    if (currentTheme === "system") {
      // Check OS dark mode preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return currentTheme;
  });

  /**
   * Effect: Apply theme class to document root whenever theme changes.
   * 
   * Removes existing light/dark classes and adds the resolved theme class.
   * Uses Promise.resolve() microtask to batch the resolvedTheme state update
   * and avoid React effect cascade warnings.
   */
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    let resolved: "dark" | "light";
    if (theme === "system") {
      resolved = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      resolved = theme;
    }

    root.classList.add(resolved);
    // Use microtask to avoid setState in effect cascade
    Promise.resolve().then(() => setResolvedTheme(resolved));
  }, [theme]);

  /**
   * Effect: Listen for OS theme preference changes when in "system" mode.
   * 
   * Adds a MediaQueryList listener that updates the theme automatically
   * when the user changes their OS dark/light preference.
   * Only active when theme is set to "system".
   */
  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e: MediaQueryListEvent) => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      const newTheme = e.matches ? "dark" : "light";
      root.classList.add(newTheme);
      setResolvedTheme(newTheme);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, [theme]);

  /**
   * Persist theme preference to localStorage and update state.
   * Called whenever user explicitly changes the theme.
   */
  const setTheme = (newTheme: Theme) => {
    localStorage.setItem(storageKey, newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

/**
 * Hook to access the theme context.
 * 
 * Must be used within a ThemeProvider component. Throws an error if called
 * outside of the provider to help catch integration issues early.
 * 
 * @example
 * const { theme, setTheme, resolvedTheme } = useTheme();
 * 
 * // Toggle dark mode
 * setTheme(resolvedTheme === "dark" ? "light" : "dark");
 * 
 * @returns Theme context with current theme, setter, and resolved theme
 * @throws Error if used outside of ThemeProvider
 */
export function useTheme() {
  const context = useContext(ThemeProviderContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
