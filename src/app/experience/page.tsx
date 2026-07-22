import type { Metadata } from "next";
import { Briefcase, Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/timeline";
import { ButtonLink } from "@/components/ui/button";
import {
  engineeringExperience,
  leadershipExperience,
} from "@/lib/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Professional experience — software engineering first, leadership second. FinTech, enterprise platforms and commercial client work.",
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="What I've built, and the teams I've led."
        description="Software engineering leads the way; leadership underpins it. Both are why I take end-to-end ownership of what I ship."
      >
        <ButtonLink href="/projects">Explore the case studies</ButtonLink>
      </PageHeader>

      <Section>
        <Container>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Briefcase className="size-5" />
            </span>
            <div>
              <SectionHeading title="Software Engineering" />
            </div>
          </div>
          <div className="mt-10 max-w-3xl">
            <Timeline items={engineeringExperience} />
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border bg-muted/30">
        <Container>
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Users className="size-5" />
            </span>
            <div>
              <SectionHeading
                title="Leadership"
                description="The experience that shaped how I take ownership and communicate."
              />
            </div>
          </div>
          <div className="mt-10 max-w-3xl">
            <Timeline items={leadershipExperience} />
          </div>
        </Container>
      </Section>
    </>
  );
}
