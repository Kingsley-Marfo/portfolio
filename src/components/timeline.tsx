import { Briefcase, Users } from "lucide-react";
import type { ExperienceItem } from "@/lib/data/experience";
import { TechBadge } from "@/components/ui/tech-badge";
import { Reveal } from "@/components/ui/reveal";

export function Timeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="relative space-y-8 border-l border-border pl-8">
      {items.map((item, i) => (
        <Reveal as="li" key={`${item.organisation}-${i}`} delay={i} className="relative">
          <span className="absolute -left-[41px] flex size-8 items-center justify-center rounded-full border border-border bg-background text-primary">
            {item.type === "engineering" ? (
              <Briefcase className="size-4" />
            ) : (
              <Users className="size-4" />
            )}
          </span>

          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-base font-semibold sm:text-lg">{item.role}</h3>
              <span className="text-xs font-medium text-muted-foreground">
                {item.period}
              </span>
            </div>
            <p className="mt-0.5 text-sm font-medium text-primary">
              {item.organisation}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {item.summary}
            </p>

            <ul className="mt-4 space-y-2">
              {item.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            {item.stack ? (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.stack.map((t) => (
                  <TechBadge key={t}>{t}</TechBadge>
                ))}
              </div>
            ) : null}
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
