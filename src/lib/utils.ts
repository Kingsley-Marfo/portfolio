import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with conflict resolution.
 * Shared helper used by every UI primitive (shadcn/ui convention).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format an ISO date string as e.g. "March 2024". */
export function formatDate(date: string, opts?: Intl.DateTimeFormatOptions) {
  return new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    ...opts,
  });
}
