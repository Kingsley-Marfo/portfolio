import { ImageIcon } from "lucide-react";

/**
 * A browser-chrome frame used as a tasteful placeholder for real
 * product screenshots. Drop an <Image> in place of the placeholder body
 * when screenshots are available.
 */
export function ScreenshotFrame({
  alt,
  caption,
  accent = "#3b82f6",
}: {
  alt: string;
  caption?: string;
  accent?: string;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-red-400/70" />
        <span className="size-2.5 rounded-full bg-amber-400/70" />
        <span className="size-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 hidden truncate rounded-md bg-background px-3 py-1 font-mono text-[11px] text-muted-foreground sm:block">
          {alt}
        </span>
      </div>
      <div
        className="relative flex aspect-[16/10] items-center justify-center"
        style={{
          background: `radial-gradient(120% 120% at 50% 0%, ${accent}14, transparent 60%)`,
        }}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <ImageIcon className="size-8" style={{ color: accent }} />
          <span className="max-w-[80%] text-center text-xs">{alt}</span>
        </div>
      </div>
      {caption ? (
        <figcaption className="border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
