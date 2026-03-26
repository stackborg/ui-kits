import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with conflict resolution.
 * Combination of clsx (conditional classes) + tailwind-merge (conflict removal).
 *
 * Usage:
 *   cn("px-4 py-2", isActive && "bg-primary", className)
 *   // Consumer's className always wins over default classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
