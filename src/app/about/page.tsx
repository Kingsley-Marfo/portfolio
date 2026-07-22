import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, Compass, Target, Users2 } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Timeline } from "@/components/timeline";
import { allExperience } from "@/lib/data/experience";
import { education } from "@/lib/data/education";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software Engineer and BSc Computer Science graduate who also manages a 30+ person team as a Restaurant Manager — how that leadership experience shapes engineering judgement.",
};

const transfer = [
  {
    icon: Target,
    title: "Ownership",
    body: "Running daily operations for a 30+ person team means outcomes are mine regardless of who's on shift. I bring that same standard to code I ship — I own it in production, not just at merge.",
  },
  {
    icon: Compass,
    title: "Decision making under pressure",
    body: "Quick-service management is constant triage: limited time, incomplete information, real consequences. That's close to debugging a production incident — stay calm, gather signal fast, decide.",
  },
  {
    icon: Users2,
    title: "Communication across audiences",
    body: "Managing stakeholders across Operations, HR, IT and Engineering means translating technical constraints for non-technical people daily. That's the same skill a good engineer uses writing a case study or a PR description.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Software Engineer, currently also managing a 30+ person team."
        description="I work full-time as a Restaurant Manager while delivering client software contracts and completing a BSc in Computer Science. Here's how those two tracks connect."
      />

      {/* Bio + portrait */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              I&apos;m {siteConfig.name}, a Software Engineer based in{" "}
              {siteConfig.location}. I specialise in full-stack and backend
              development, with a particular focus on systems where correctness
              matters — payments, identity and access.
            </p>
            <p>
              I didn&apos;t come into engineering the standard way. I&apos;ve spent
              a decade in restaurant management — starting as a Shift Manager at{" "}
              <span className="font-medium text-foreground">Burger King UK</span>{" "}
              in 2016, progressing to Restaurant Manager by 2022, a spell as
              Department Manager at{" "}
              <span className="font-medium text-foreground">
                Moto Hospitality Ltd
              </span>
              , and back to Burger King UK as Restaurant Manager since 2023,
              where I currently lead a team of more than 30. That&apos;s not a
              closed chapter before software — it&apos;s a demanding job I still
              hold today, alongside client development work and finishing my
              degree.
            </p>
            <p>
              During my{" "}
              <span className="font-medium text-foreground">
                BSc Computer Science
              </span>{" "}
              at Arden University, I didn&apos;t want to just pass modules — I
              wanted to build real things. That drive led to client work on{" "}
              <span className="font-medium text-foreground">Flayona</span>, a
              FinTech e-commerce platform with BNPL lending and secure
              authentication, and to{" "}
              <span className="font-medium text-foreground">OpFix</span>, my
              final-year project — an enterprise maintenance management platform
              now being prepared for future commercialisation.
            </p>
            <p>
              What excites me most is turning a messy business problem into
              software that&apos;s reliable, secure and genuinely usable. I care
              about the schema as much as the screen, and the operational
              discipline of managing a team under pressure carries directly into
              how I build.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="primary">Software Engineer</Badge>
              {siteConfig.brand.map((b) => (
                <Badge key={b} variant="primary">
                  {b}
                </Badge>
              ))}
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="sticky top-24 space-y-4">
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-border">
                <Image
                  src={siteConfig.avatar}
                  alt={`${siteConfig.name}, Software Engineer`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 360px"
                  className="object-cover"
                />
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <p className="text-sm font-medium">Currently</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Open to Software Engineer, Full-Stack and Backend roles.
                </p>
                <ButtonLink href="/contact" size="sm" className="mt-4 w-full">
                  Get in touch
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* What transfers */}
      <Section className="border-y border-border bg-muted/30">
        <Container>
          <SectionHeading
            eyebrow="What transfers"
            title="Leadership and engineering aren't separate tracks"
            description="Specific ways a decade of operational management shapes how I approach software."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {transfer.map((t, i) => (
              <Reveal
                key={t.title}
                delay={i}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <t.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Experience timeline */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Experience"
            title="Engineering and leadership, side by side"
            description="Software engineering is listed first; leadership experience is concurrent, not historical."
          />
          <div className="mt-12 max-w-3xl">
            <Timeline items={allExperience} />
          </div>
        </Container>
      </Section>

      {/* Education */}
      <Section className="border-t border-border bg-muted/30">
        <Container>
          <SectionHeading eyebrow="Education" title="Computer Science" />
          <div className="mt-12 space-y-6">
            {education.map((ed) => (
              <Reveal
                key={ed.qualification}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <GraduationCap className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{ed.qualification}</h3>
                      <p className="text-sm text-muted-foreground">
                        {ed.institution}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {ed.period}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {ed.summary}
                </p>

                {ed.finalYearProject ? (
                  <div className="mt-5 rounded-xl border border-border bg-muted/40 p-5">
                    <p className="text-sm font-semibold text-primary">
                      {ed.finalYearProject.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {ed.finalYearProject.description}
                    </p>
                  </div>
                ) : null}

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Relevant modules
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {ed.modules.map((m) => (
                      <span
                        key={m}
                        className="rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
