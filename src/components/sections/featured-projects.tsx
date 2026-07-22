import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/lib/data/projects";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/ui/reveal";

export function FeaturedProjects() {
  return (
    <Section id="projects" className="border-y border-border bg-muted/30">
      <Container>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Selected Work"
            title="Client work, a final-year project, and open coursework"
            description="Each card links to a full case study covering the business problem, my engineering contribution and the technologies used."
          />
          <Reveal>
            <Link
              href="/projects"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              All projects <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {featuredProjects.map((p) => (
            <Reveal key={p.slug} className="lg:first:col-span-1">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
