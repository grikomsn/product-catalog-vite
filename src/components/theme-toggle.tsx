import { Button } from "@/components/ui/button";
import { useTheme } from "./theme-provider";
import { Sun, Moon, Monitor } from "lucide-react";
import { useSyncExternalStore } from "react";

// Simple store for mounted state
const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="shrink-0">
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

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
