import { stats } from "@/lib/data/stats";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export function StatsBand() {
  return (
    <Container>
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i}
            className="flex flex-col items-center justify-center gap-1 bg-card px-4 py-8 text-center"
          >
            <span className="text-3xl font-bold tracking-tight sm:text-4xl">
              <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </span>
            <span className="text-xs text-muted-foreground sm:text-sm">
              {s.label}
            </span>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
