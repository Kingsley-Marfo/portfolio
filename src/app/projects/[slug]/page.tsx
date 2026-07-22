import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  Lightbulb,
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

  const idx = allProjectsSorted.findIndex((p) => p.slug === slug);
  const next = allProjectsSorted[(idx + 1) % allProjectsSorted.length];

  const toc = [
    { id: "overview", label: "Overview" },
    { id: "problem", label: "Problem" },
    { id: "requirements", label: "Requirements" },
    ...(project.research ? [{ id: "research", label: "Research" }] : []),
    { id: "solution", label: "Solution" },
    { id: "architecture", label: "Architecture" },
    ...(project.database ? [{ id: "database", label: "Database" }] : []),
    { id: "features", label: "Features" },
    { id: "implementation", label: "Implementation" },
    { id: "challenges", label: "Challenges" },
    ...(project.security ? [{ id: "security", label: "Security" }] : []),
    { id: "screenshots", label: "Screenshots" },
    { id: "results", label: "Results" },
    { id: "lessons", label: "Lessons" },
    { id: "future", label: "Future" },
    { id: "stack", label: "Tech stack" },
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
      <section className="relative overflow-hidden border-b border-border">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_50%_60%_at_50%_0%,#000,transparent)]" />
          <div
            className="absolute left-1/2 top-[-30%] h-[320px] w-[620px] -translate-x-1/2 rounded-full blur-[120px]"
            style={{ background: `${project.accent}22` }}
          />
        </div>
        <Container className="relative py-14 sm:py-20">
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
              <Badge variant={project.status === "Academic" ? "default" : "primary"}>
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

          {/* meta */}
          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            {[
              { k: "Role", v: project.role },
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

          {(project.links.live || project.links.github) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.live ? (
                <ButtonLink href={project.links.live} external>
                  <ExternalLink className="size-4" /> Live demo
                </ButtonLink>
              ) : null}
              {project.links.github ? (
                <ButtonLink href={project.links.github} variant="secondary" external>
                  <GithubIcon className="size-4" /> Source
                </ButtonLink>
              ) : null}
            </div>
          )}
        </Container>
      </section>

      {/* Body with sticky TOC */}
      <Container className="grid gap-12 py-16 lg:grid-cols-[220px_1fr] lg:gap-16">
        <aside className="hidden lg:block">
          <nav className="sticky top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              On this page
            </p>
            <ul className="space-y-1 border-l border-border">
              {toc.map((t) => (
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

        <article className="min-w-0 space-y-16">
          <CaseSection id="overview" eyebrow="01 — Overview" title="Overview">
            <Paragraphs items={project.overview} />
          </CaseSection>

          <CaseSection id="problem" eyebrow="02 — Problem" title="The problem">
            <Paragraphs items={project.problem} />
          </CaseSection>

          <CaseSection id="requirements" eyebrow="03 — Requirements" title="Requirements">
            <CheckList items={project.requirements} />
          </CaseSection>

          {project.research ? (
            <CaseSection id="research" eyebrow="04 — Research" title="Research & planning">
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

          <CaseSection id="solution" eyebrow="05 — Solution" title="The solution">
            <Paragraphs items={project.solution} />
          </CaseSection>

          <CaseSection id="architecture" eyebrow="06 — Architecture" title="System architecture">
            <Paragraphs items={project.architecture.description} />
            <div className="mt-6">
              <Mermaid chart={project.architecture.diagram} caption="High-level system architecture" />
            </div>
          </CaseSection>

          {project.database ? (
            <CaseSection id="database" eyebrow="07 — Data" title="Database design">
              <Paragraphs items={project.database.description} />
              <div className="mt-6">
                <Mermaid chart={project.database.diagram} caption="Entity-relationship model" />
              </div>
            </CaseSection>
          ) : null}

          <CaseSection id="features" eyebrow="08 — Features" title="Key features">
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

          <CaseSection id="implementation" eyebrow="09 — Engineering" title="Implementation decisions">
            <BlockList items={project.implementation} icon={Wrench} />
          </CaseSection>

          <CaseSection id="challenges" eyebrow="10 — Challenges" title="Challenges & how I solved them">
            <BlockList items={project.challenges} icon={Lightbulb} />
          </CaseSection>

          {project.security ? (
            <CaseSection id="security" eyebrow="11 — Security" title="Security & correctness">
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

          <CaseSection id="screenshots" eyebrow="12 — Interface" title="Screenshots">
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

          <CaseSection id="results" eyebrow="13 — Outcome" title="Results">
            <ul className="space-y-3">
              {project.results.map((r) => (
                <li key={r} className="flex gap-3 text-base text-muted-foreground">
                  <Check className="mt-1 size-4 shrink-0 text-success" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </CaseSection>

          <CaseSection id="lessons" eyebrow="14 — Reflection" title="Lessons learned">
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

          <CaseSection id="future" eyebrow="15 — What's next" title="Future improvements">
            <ul className="space-y-3">
              {project.future.map((f) => (
                <li key={f} className="flex gap-3 text-base text-muted-foreground">
                  <Rocket className="mt-1 size-4 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </CaseSection>

          <CaseSection id="stack" eyebrow="16 — Toolchain" title="Technology stack">
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

          {/* Next project */}
          <div className="border-t border-border pt-10">
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
        </article>
      </Container>
    </>
  );
}
