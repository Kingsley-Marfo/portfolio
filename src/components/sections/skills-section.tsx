import {
  Code2,
  Boxes,
  Server,
  Database,
  Webhook,
  ShieldCheck,
  Cloud,
  Wrench,
} from "lucide-react";
import { skillGroups } from "@/lib/data/skills";
import { currentLearning } from "@/lib/data/education";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TechBadge } from "@/components/ui/tech-badge";

const iconFor: Record<string, React.ComponentType<{ className?: string }>> = {
  Languages: Code2,
  Frontend: Boxes,
  Backend: Server,
  Databases: Database,
  "APIs & Integrations": Webhook,
  Security: ShieldCheck,
  "Cloud & Deployment": Cloud,
  "Tools & Practices": Wrench,
};

export function SkillsSection() {
  return (
    <Section id="skills">
      <Container>
        <SectionHeading
          eyebrow="Technical Expertise"
          title="Languages, frameworks and practices"
          description="Every item here is verified against production work or my CV — nothing aspirational is listed as a current skill."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = iconFor[group.category] ?? Code2;
            return (
              <Reveal
                key={group.category}
                delay={i % 3}
                className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="font-semibold">{group.category}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {group.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {group.skills.map((s) => (
                    <TechBadge key={s}>{s}</TechBadge>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-6 flex flex-wrap items-center gap-2 rounded-2xl border border-dashed border-border p-5">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Currently learning
          </span>
          {currentLearning.map((item) => (
            <TechBadge key={item}>{item}</TechBadge>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}
