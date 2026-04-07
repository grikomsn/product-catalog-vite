import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function for conditionally merging Tailwind CSS classes.
 * 
 * Combines `clsx` (for conditional class joining) with `tailwind-merge`
 * (for resolving conflicting Tailwind classes). This is the standard
 * pattern used throughout shadcn/ui components.
 * 
 * @example
 * // Basic usage
 * cn("px-4 py-2", "bg-blue-500") // "px-4 py-2 bg-blue-500"
 * 
 * // With conditionals
 * cn("px-4", isActive && "bg-blue-500") // "px-4 bg-blue-500" or "px-4"
 * 
 * // Resolves conflicting classes (later wins)
 * cn("px-2", "px-4") // "px-4"
 * 
 * @param inputs - Any number of class values (strings, objects, arrays, falsy values)
 * @returns A merged string of Tailwind classes with conflicts resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
