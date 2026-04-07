import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Monitor } from "lucide-react";
import { useSyncExternalStore } from "react";

/**
 * Simple no-op store for tracking hydration state.
 * 
 * Returns true on client (indicating mounted) and false on server.
 * This prevents hydration mismatch when server-rendered HTML doesn't match
 * the initial client render (since we don't know the theme on server).
 */
const subscribe = () => () => {}; // No actual subscription needed
const getSnapshot = () => true;    // Always true after hydration
const getServerSnapshot = () => false; // Always false during SSR

/**
 * Theme toggle button component.
 * 
 * Cycles through three theme modes on click:
 * light → dark → system → light
 * 
 * Displays different icons based on current state:
 * - System mode: Monitor icon (indicates following OS preference)
 * - Dark mode: Moon icon
 * - Light mode: Sun icon
 * 
 * Uses useSyncExternalStore to prevent hydration mismatch by rendering
 * a placeholder button during SSR that gets replaced after hydration.
 * 
 * @example
 * // In Navbar or Header
 * <ThemeToggle />
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  // Track if component has mounted (hydrated) to prevent SSR mismatch
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Render placeholder during SSR to avoid hydration mismatch
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="shrink-0">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  /**
   * Cycles to the next theme in the sequence:
   * light → dark → system → light
   */
  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  /**
   * Returns the appropriate icon based on current theme mode.
   * 
   * - "system" mode shows Monitor (indicates auto-switching)
   * - Resolved "dark" shows Moon
   * - Resolved "light" shows Sun
   */
  const getIcon = () => {
    if (theme === "system") {
      return <Monitor className="h-[1.2rem] w-[1.2rem]" />;
    }
    return resolvedTheme === "dark" ? (
      <Moon className="h-[1.2rem] w-[1.2rem]" />
    ) : (
      <Sun className="h-[1.2rem] w-[1.2rem]" />
    );
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={cycleTheme}
      className="shrink-0"
      title={`Theme: ${theme} (${resolvedTheme})`}
    >
      {getIcon()}
      <span className="sr-only">Toggle theme (current: {theme})</span>
    </Button>
  );
}
