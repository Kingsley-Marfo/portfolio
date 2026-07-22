import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { Container, Section } from "@/components/ui/container";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/ui/reveal";
import { CtaSection } from "@/components/sections/cta-section";
import { allProjectsSorted } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "In-depth technical case studies — Flayona (FinTech), OpFix (enterprise), Julli Jets (client) and a full-stack Recipe Management System.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case studies"
        title="Production systems, documented like engineering."
        description="Not screenshots and one-liners — each project is a full case study covering the problem, architecture, database design, implementation decisions, challenges and lessons learned."
      />

      <Section>
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {allProjectsSorted.map((p) => (
              <Reveal key={p.slug}>
                <ProjectCard project={p} featured={p.featured} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection />
    </>
  );
}
