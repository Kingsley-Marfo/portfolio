import Link from "next/link";
import { ArrowRight, Briefcase, Users } from "lucide-react";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { engineeringExperience, leadershipExperience } from "@/lib/data/experience";

/**
 * Compact homepage summary — current engineering work + current leadership
 * role only. The full timeline lives on /experience; this keeps the
 * homepage from repeating it in full.
 */
export function ExperienceSummary() {
  const currentEngineering = engineeringExperience[0];
  const currentLeadership = leadershipExperience[0];

  return (
    <Section className="border-t border-border">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Professional Experience"
            title="What I'm doing right now"
          />
          <Reveal>
            <Link
              href="/experience"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              Full experience <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Reveal className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Briefcase className="size-4" />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Engineering
                </p>
                <p className="text-sm font-semibold">{currentEngineering.period}</p>
              </div>
            </div>
            <h3 className="mt-4 font-semibold">{currentEngineering.role}</h3>
            <p className="text-sm text-primary">{currentEngineering.organisation}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {currentEngineering.summary}
            </p>
          </Reveal>

          <Reveal delay={1} className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Users className="size-4" />
              </span>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Leadership
                </p>
                <p className="text-sm font-semibold">{currentLeadership.period}</p>
              </div>
            </div>
            <h3 className="mt-4 font-semibold">{currentLeadership.role}</h3>
            <p className="text-sm text-primary">{currentLeadership.organisation}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {currentLeadership.summary}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
