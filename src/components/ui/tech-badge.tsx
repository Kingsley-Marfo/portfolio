import { cn } from "@/lib/utils";

/** Small monospace pill for a technology name. */
export function TechBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-muted/60 px-2.5 py-1 font-mono text-xs text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}
