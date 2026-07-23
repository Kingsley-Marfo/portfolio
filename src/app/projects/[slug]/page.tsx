import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  ExternalLink,
  Lightbulb,
  Lock,
  ShieldCheck,
  Sparkles,
  Target,
  Wrench,
  Rocket,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import {
  projects,
  getProject,
  allProjectsSorted,
  type NamedBlock,
} from "@/lib/data/projects";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { TechBadge } from "@/components/ui/tech-badge";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Mermaid } from "@/components/ui/mermaid";
import { ScreenshotFrame } from "@/components/screenshot-frame";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — Case study`,
      description: project.tagline,
    },
  };
}

/* --- small building blocks --------------------------------------- */

function CaseSection({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <Reveal>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          {title}
        </h2>
      </Reveal>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
      {items.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm"
        >
          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function BlockList({
  items,
  icon: Icon,
}: {
  items: NamedBlock[];
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map((b) => (
        <div key={b.title} className="rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2.5">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="size-4" />
            </span>
            <h3 className="text-sm font-semibold">{b.title}</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {b.description}
          </p>
        </div>
      ))}
    </div>
  );
}

/* --- page --------------------------------------------------------- */

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const isConfidential = project.status !== "Public Engineering Showcase";

  const idx = allProjectsSorted.findIndex((p) => p.slug === slug);
  const next = allProjectsSorted[(idx + 1) % allProjectsSorted.length];

  const deepDiveToc = [
    { id: "requirements", label: "Requirements" },
    ...(project.research ? [{ id: "research", label: "Research" }] : []),
    { id: "solution", label: "Solution" },
    { id: "architecture", label: "Architecture" },
    ...(project.database ? [{ id: "database", label: "Database" }] : []),
    { id: "features", label: "Features" },
    { id: "implementation", label: "Engineering decisions" },
    ...(project.security ? [{ id: "security", label: "Security" }] : []),
    { id: "screenshots", label: "Screenshots" },
    { id: "lessons", label: "Lessons learned" },
    { id: "future", label: "Future roadmap" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    abstract: project.tagline,
    author: { "@type": "Person", name: siteConfig.name },
    url: `${siteConfig.url}/projects/${project.slug}`,
    keywords: project.primaryStack.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="border-b border-border">
        <Container className="py-14 sm:py-20">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> All projects
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span
              className="flex size-12 items-center justify-center rounded-2xl text-lg font-bold text-white"
              style={{ backgroundColor: project.accent }}
            >
              {project.title.charAt(0)}
            </span>
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                {project.category}
              </p>
              <Badge variant={project.status === "Public Engineering Showcase" ? "primary" : "default"}>
                {project.status}
              </Badge>
            </div>
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {project.tagline}
          </p>

          {isConfidential ? (
            <p className="mt-4 flex max-w-2xl items-start gap-2 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              <Lock className="mt-0.5 size-4 shrink-0" />
              {project.status === "Client Project"
                ? "Client-confidential project — source code and internal implementation are not published. This case study covers my engineering contribution, the problem solved and the technologies used."
                : "Private repository — this project is being prepared for future commercialisation, so internal implementation details are not published here."}
            </p>
          ) : null}

          {/* meta — Role / Timeline / Status live here, not as separate sections below */}
          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {[
              { k: "My Role", v: project.role },
              { k: "Timeline", v: project.timeline },
              { k: "Year", v: project.year },
              { k: "Status", v: project.status },
            ].map((m) => (
              <div key={m.k}>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {m.k}
                </dt>
                <dd className="mt-1 text-sm font-medium">{m.v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-1.5">
            {project.primaryStack.map((t) => (
              <TechBadge key={t}>{t}</TechBadge>
            ))}
          </div>

          {project.links.live ? (
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={project.links.live} external>
                <ExternalLink className="size-4" /> Live site
              </ButtonLink>
              {project.links.github ? (
                <ButtonLink href={project.links.github} variant="secondary" external>
                  <GithubIcon className="size-4" /> Source
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
        </Container>
      </section>

      {/* Recruiter-first summary: Proof points, Overview, Problem, Achievements, Challenges, Stack */}
      <Container className="max-w-3xl py-16">
        <div className="space-y-16">
          <Reveal>
            <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
              {[
                { label: "Role", value: project.proofPoints.role },
                { label: "Scope", value: project.proofPoints.scope },
                { label: "Engineering depth", value: project.proofPoints.depth },
              ].map((p) => (
                <div key={p.label} className="bg-card p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {p.label}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {p.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <CaseSection id="overview" title="Overview">
            <Paragraphs items={project.overview} />
          </CaseSection>

          <CaseSection id="problem" title="Business problem">
            <Paragraphs items={project.problem} />
          </CaseSection>

          <CaseSection id="achievements" title="Key achievements">
            <ul className="space-y-3">
              {project.results.map((r) => (
                <li key={r} className="flex gap-3 text-base text-muted-foreground">
                  <Check className="mt-1 size-4 shrink-0 text-success" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </CaseSection>

          <CaseSection id="challenges" title="Engineering challenges">
            <BlockList items={project.challenges} icon={Lightbulb} />
          </CaseSection>

          <CaseSection id="stack" title="Technology stack">
            <div className="grid gap-4 sm:grid-cols-2">
              {project.stack.map((group) => (
                <div key={group.category} className="rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-sm font-semibold">{group.category}</h3>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {group.items.map((s) => (
                      <TechBadge key={s}>{s}</TechBadge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CaseSection>
        </div>
      </Container>

      {/* Deep technical dive — collapsed by default, native <details> (no JS needed) */}
      <Container className="grid gap-12 pb-20 lg:grid-cols-[220px_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <nav className="sticky top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Technical deep dive
            </p>
            <ul className="space-y-1 border-l border-border">
              {deepDiveToc.map((t) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="-ml-px block border-l border-transparent py-1 pl-4 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <details className="group min-w-0" open>
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-xl border border-border bg-card px-5 py-4 text-sm font-semibold marker:content-none">
            <ChevronDown className="size-4 shrink-0 text-primary transition-transform group-open:rotate-180" />
            Technical deep dive — architecture, database, engineering decisions
            <span className="ml-auto text-xs font-normal text-muted-foreground">
              For technical reviewers
            </span>
          </summary>

          <article className="mt-10 space-y-16">
            <CaseSection id="requirements" eyebrow="Requirements" title="Requirements">
              <CheckList items={project.requirements} />
            </CaseSection>

            {project.research ? (
              <CaseSection id="research" eyebrow="Research" title="Research & planning">
                <ul className="space-y-3">
                  {project.research.map((r) => (
                    <li key={r} className="flex gap-3 text-base text-muted-foreground">
                      <Target className="mt-1 size-4 shrink-0 text-primary" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </CaseSection>
            ) : null}

            <CaseSection id="solution" eyebrow="Solution" title="The solution">
              <Paragraphs items={project.solution} />
            </CaseSection>

            <CaseSection id="architecture" eyebrow="Architecture" title="System architecture">
              <Paragraphs items={project.architecture.description} />
              <div className="mt-6">
                <Mermaid chart={project.architecture.diagram} caption="High-level system architecture" />
              </div>
            </CaseSection>

            {project.database ? (
              <CaseSection id="database" eyebrow="Data" title="Database design">
                <Paragraphs items={project.database.description} />
                <div className="mt-6">
                  <Mermaid chart={project.database.diagram} caption="Entity-relationship model" />
                </div>
              </CaseSection>
            ) : null}

            <CaseSection id="features" eyebrow="Features" title="Key features">
              <div className="grid gap-4 sm:grid-cols-2">
                {project.features.map((f) => (
                  <div key={f.title} className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Sparkles className="size-4" />
                      </span>
                      <h3 className="text-sm font-semibold">{f.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                  </div>
                ))}
              </div>
            </CaseSection>

            <CaseSection id="implementation" eyebrow="Engineering" title="Engineering decisions">
              <BlockList items={project.implementation} icon={Wrench} />
            </CaseSection>

            {project.security ? (
              <CaseSection id="security" eyebrow="Security" title="Security & correctness">
                <ul className="grid gap-3 sm:grid-cols-2">
                  {project.security.map((s) => (
                    <li
                      key={s}
                      className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm"
                    >
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
                      <span className="text-muted-foreground">{s}</span>
                    </li>
                  ))}
                </ul>
              </CaseSection>
            ) : null}

            <CaseSection id="screenshots" eyebrow="Interface" title="Screenshots">
              <div className="grid gap-5 sm:grid-cols-2">
                {project.screenshots.map((s) =>
                  s.src ? (
                    <figure
                      key={s.alt}
                      className="overflow-hidden rounded-xl border border-border bg-card"
                    >
                      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-2.5">
                        <span className="size-2.5 rounded-full bg-red-400/70" />
                        <span className="size-2.5 rounded-full bg-amber-400/70" />
                        <span className="size-2.5 rounded-full bg-green-400/70" />
                      </div>
                      <Image
                        src={s.src}
                        alt={s.alt}
                        width={1440}
                        height={810}
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="h-auto w-full"
                      />
                      <figcaption className="border-t border-border px-4 py-2.5 text-xs text-muted-foreground">
                        {s.caption}
                      </figcaption>
                    </figure>
                  ) : (
                    <ScreenshotFrame
                      key={s.alt}
                      alt={s.alt}
                      caption={s.caption}
                      accent={project.accent}
                    />
                  )
                )}
              </div>
            </CaseSection>

            <CaseSection id="lessons" eyebrow="Reflection" title="Lessons learned">
              <div className="space-y-3">
                {project.lessons.map((l, i) => (
                  <div
                    key={l}
                    className="flex gap-4 rounded-2xl border border-border bg-card p-5"
                  >
                    <span className="font-mono text-sm text-primary">0{i + 1}</span>
                    <p className="text-sm leading-relaxed text-muted-foreground">{l}</p>
                  </div>
                ))}
              </div>
            </CaseSection>

            <CaseSection id="future" eyebrow="What's next" title="Future roadmap">
              <ul className="space-y-3">
                {project.future.map((f) => (
                  <li key={f} className="flex gap-3 text-base text-muted-foreground">
                    <Rocket className="mt-1 size-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </CaseSection>
          </article>
        </details>

        {/* Next project */}
        <div className="border-t border-border pt-10 lg:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Next case study
          </p>
          <Link
            href={`/projects/${next.slug}`}
            className="group mt-3 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
          >
            <div>
              <h3 className="text-lg font-semibold">{next.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{next.tagline}</p>
            </div>
            <ArrowRight className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Container>
    </>
  );
}
