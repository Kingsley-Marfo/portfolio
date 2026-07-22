"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "next-themes";

/**
 * Renders a Mermaid diagram, re-rendering when the theme changes.
 * Mermaid is dynamically imported so it stays out of the main bundle.
 */
export function Mermaid({ chart, caption }: { chart: string; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  // Defer rendering to the client so the theme is resolved before drawing.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;

    (async () => {
      const mermaid = (await import("mermaid")).default;
      const isDark = resolvedTheme === "dark";
      mermaid.initialize({
        startOnLoad: false,
        theme: "base",
        securityLevel: "strict",
        fontFamily: "var(--font-sans)",
        themeVariables: isDark
          ? {
              background: "transparent",
              primaryColor: "#12203c",
              primaryBorderColor: "#3b82f6",
              primaryTextColor: "#e9edf5",
              lineColor: "#3b82f6",
              secondaryColor: "#0d1424",
              tertiaryColor: "#0d1424",
              mainBkg: "#0d1424",
              nodeBorder: "#2b4a8a",
              clusterBkg: "#0d1424",
              clusterBorder: "#1c2740",
              textColor: "#c6cfdd",
            }
          : {
              background: "transparent",
              primaryColor: "#eff4ff",
              primaryBorderColor: "#2563eb",
              primaryTextColor: "#0b1220",
              lineColor: "#2563eb",
              secondaryColor: "#f4f6fb",
              tertiaryColor: "#f4f6fb",
              mainBkg: "#ffffff",
              nodeBorder: "#93b4ff",
              clusterBkg: "#f8fafc",
              clusterBorder: "#e6e9f0",
              textColor: "#334155",
            },
      });

      try {
        const { svg } = await mermaid.render(`m-${rawId}`, chart.trim());
        if (!cancelled) setSvg(svg);
      } catch {
        if (!cancelled) setSvg("");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [chart, resolvedTheme, mounted, rawId]);

  return (
    <figure className="my-2">
      <div className="scrollbar-thin overflow-x-auto rounded-xl border border-border bg-muted/30 p-4 sm:p-6">
        {svg ? (
          <div
            ref={ref}
            className="mermaid-render flex min-h-30 items-center justify-center [&_svg]:h-auto [&_svg]:max-w-full"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="flex min-h-30 items-center justify-center text-sm text-muted-foreground">
            Loading diagram…
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
