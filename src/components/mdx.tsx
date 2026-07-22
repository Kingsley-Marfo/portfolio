import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Mermaid } from "@/components/ui/mermaid";

/** Extract the raw text out of a code block's children. */
function textOf(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    // @ts-expect-error runtime shape from MDX
    return textOf(node.props.children);
  }
  return "";
}

export const mdxComponents = {
  h1: (p: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="mt-10 scroll-mt-24 text-3xl font-bold tracking-tight" {...p} />
  ),
  h2: (p: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-12 scroll-mt-24 border-b border-border pb-2 text-2xl font-bold tracking-tight" {...p} />
  ),
  h3: (p: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 scroll-mt-24 text-xl font-semibold tracking-tight" {...p} />
  ),
  p: (p: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-5 leading-relaxed text-muted-foreground" {...p} />
  ),
  a: ({ href = "#", ...p }: ComponentPropsWithoutRef<"a">) => (
    <Link
      href={href}
      className="font-medium text-primary underline-offset-4 hover:underline"
      {...p}
    />
  ),
  ul: (p: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-5 space-y-2 pl-1 [&>li]:relative [&>li]:pl-6" {...p} />
  ),
  ol: (p: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-5 list-decimal space-y-2 pl-6 marker:text-muted-foreground" {...p} />
  ),
  li: (p: ComponentPropsWithoutRef<"li">) => (
    <li
      className="leading-relaxed text-muted-foreground before:absolute before:left-0 before:text-primary before:content-['▹']"
      {...p}
    />
  ),
  blockquote: (p: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-6 border-l-2 border-primary/50 bg-muted/40 py-2 pl-5 pr-4 text-sm italic text-muted-foreground"
      {...p}
    />
  ),
  strong: (p: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-foreground" {...p} />
  ),
  hr: () => <hr className="my-10 border-border" />,
  code: (p: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
      {...p}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => {
    // Detect a fenced ```mermaid block and render it as a diagram.
    const child = props.children as
      | { props?: { className?: string; children?: ReactNode } }
      | undefined;
    const className = child?.props?.className ?? "";
    const raw = textOf(child?.props?.children);

    if (className.includes("language-mermaid")) {
      return <Mermaid chart={raw} />;
    }

    return (
      <pre className="scrollbar-thin mt-6 overflow-x-auto rounded-xl border border-border bg-navy-soft p-4 font-mono text-sm leading-relaxed text-foreground [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0">
        {props.children}
      </pre>
    );
  },
};
