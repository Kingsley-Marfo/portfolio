import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, BadgeCheck, Utensils, Rocket } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { PageHeader } from "@/components/page-header";
import { Container, Section } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";
import { Timeline } from "@/components/timeline";
import { allExperience } from "@/lib/data/experience";
import { education, certifications } from "@/lib/data/education";
import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software Engineer with a Computer Science degree and a background in restaurant leadership — now building production FinTech and enterprise software.",
};

const journey = [
  {
    icon: Utensils,
    title: "Leadership in hospitality",
    body: "Years leading front-of-house teams under pressure taught me ownership, communication and calm problem-solving — the human side of engineering.",
  },
  {
    icon: GraduationCap,
    title: "Computer Science degree",
    body: "A rigorous grounding in software engineering, algorithms, databases and systems — applied throughout in real, deployed projects.",
  },
  {
    icon: Rocket,
    title: "Building production software",
    body: "Now designing and shipping FinTech and enterprise systems: payments, BNPL, KYC, authentication and role-based platforms.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Engineer first — with a leadership backstory."
        description="I design and build production software, and I bring the ownership mindset of someone who has led teams in the real world."
      />

      {/* Bio + portrait */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              I&apos;m {siteConfig.name}, a Software Engineer based in the{" "}
              {siteConfig.location}. I specialise in full-stack and backend
              development, with a particular focus on systems where correctness
              matters — payments, identity and access.
            </p>
            <p>
              My route into engineering wasn&apos;t the standard one, and I think
              that&apos;s a strength. Before software, I spent years in{" "}
              <span className="font-medium text-foreground">
                restaurant leadership
              </span>
              , supervising teams in a fast-paced, high-pressure environment.
              That&apos;s where I learned to take ownership of outcomes, stay calm
              when things break, and communicate clearly with people who
              don&apos;t share my jargon — all of which I use every day as an
              engineer.
            </p>
            <p>
              During my{" "}
              <span className="font-medium text-foreground">
                Computer Science degree
              </span>{" "}
              I didn&apos;t want to just pass modules — I wanted to build real
              things. That drive led to{" "}
              <span className="font-medium text-foreground">Flayona</span>, a
              FinTech commerce platform with payments, Buy-Now-Pay-Later, KYC and
              audit logging, and to{" "}
              <span className="font-medium text-foreground">OpFix</span>, an
              enterprise operations platform built around role-based access and
              a strict workflow engine.
            </p>
            <p>
              What excites me most is turning a messy business problem into
              software that&apos;s reliable, secure and genuinely usable. I care
              about the schema as much as the screen, and about the person on the
              other end of the keyboard as much as the code.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {siteConfig.brand.map((b) => (
                <Badge key={b} variant="primary">
                  {b}
                </Badge>
              ))}
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="sticky top-24 space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
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
                  Open to Software Engineer / Full-Stack / Backend roles.
                </p>
                <ButtonLink href="/contact" size="sm" className="mt-4 w-full">
                  Get in touch
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Journey */}
      <Section className="border-y border-border bg-muted/30">
        <Container>
          <SectionHeading
            eyebrow="The journey"
            title="From leading teams to shipping systems"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {journey.map((j, i) => (
              <Reveal
                key={j.title}
                delay={i}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <j.icon className="size-5" />
                </span>
                <h3 className="mt-4 font-semibold">{j.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {j.body}
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
            title="Where I've applied it"
            description="Software engineering first, leadership second — both shape how I build."
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

      {/* Certifications */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Certifications"
            title="Continuous learning"
            description="A placeholder for certifications — these will be filled in as they're earned."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i % 3}
                className="flex items-start gap-3 rounded-2xl border border-dashed border-border bg-card p-6"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <BadgeCheck className="size-5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{c.title}</h3>
                  <p className="text-xs text-muted-foreground">{c.issuer}</p>
                  <Badge className="mt-2 capitalize">{c.status}</Badge>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
