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

/** Vertical rhythm wrapper for full-page sections. */
export function Section({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn("py-16 sm:py-20 lg:py-28", className)}
      {...props}
    />
  );
}
