import {
  Code2,
  Boxes,
  Server,
  Database,
  Cloud,
  ShieldCheck,
  Webhook,
  Wrench,
  Cpu,
} from "lucide-react";
import { skillGroups } from "@/lib/data/skills";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TechBadge } from "@/components/ui/tech-badge";

const iconFor: Record<string, React.ComponentType<{ className?: string }>> = {
  Languages: Code2,
  Frameworks: Boxes,
  Backend: Server,
  Databases: Database,
  "Cloud & DevOps": Cloud,
  Security: ShieldCheck,
  "APIs & Payments": Webhook,
  Tools: Wrench,
  Engineering: Cpu,
};

export function SkillsSection() {
  return (
    <Section id="skills">
      <Container>
        <SectionHeading
          eyebrow="Capabilities"
          title="A full-stack toolkit, backend-leaning"
          description="The languages, frameworks and practices I use to design, build, secure and ship production software."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = iconFor[group.category] ?? Cpu;
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
      </Container>
    </Section>
  );
}
