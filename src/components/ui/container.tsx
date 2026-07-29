import * as React from "react";
import { cn } from "@/lib/utils";

/** Consistent max-width page gutter used across every section. */
export function Container({
  className,
  as: Tag = "div",
  ...props
}: React.HTMLAttributes<HTMLElement> & { as?: React.ElementType }) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}

/**
 * Vertical rhythm wrapper for full-page sections.
 * Mobile padding is deliberately tighter than desktop: two adjacent
 * <Section>s each contribute top+bottom padding, so on a ~375px-wide
 * screen the combined gap at a boundary is 2x this value — py-16 (64px)
 * compounded to ~128px of dead space, which read as a visible empty gap
 * between sections. py-10 keeps ~80px combined, still a clear break
 * without the empty band.
 */
export function Section({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("py-10 sm:py-20 lg:py-28", className)}
      {...props}
    />
  );
}
