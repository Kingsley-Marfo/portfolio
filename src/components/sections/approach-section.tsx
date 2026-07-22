import { ShieldCheck, GitBranch, Gauge, Accessibility } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const principles = [
  {
    icon: ShieldCheck,
    title: "Security & correctness first",
    body: "When software touches money or identity, correctness isn't optional. I design around invariants, validation and auditability from day one.",
  },
  {
    icon: GitBranch,
    title: "Clear architecture",
    body: "Explicit boundaries, state machines over boolean flags, and business logic in one place — code that's easy to reason about and change.",
  },
  {
    icon: Gauge,
    title: "Performance that ships",
    body: "Fast by default: sensible rendering, optimised assets and a real eye on Core Web Vitals and Lighthouse.",
  },
  {
    icon: Accessibility,
    title: "Accessible by default",
    body: "Semantic markup, keyboard support and WCAG compliance — because software should work for everyone.",
  },
];

export function ApproachSection() {
  return (
    <Section>
      <Container>
        <SectionHeading
          eyebrow="How I work"
          title="An engineering mindset"
          description="I don't just make things work — I make them correct, maintainable and fast. Here's what that looks like in practice."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i % 2}
              className="flex gap-4 rounded-2xl border border-border bg-card p-6"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <p.icon className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
