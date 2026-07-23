import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project, ProjectStatus } from "@/lib/data/projects";
import { Badge } from "@/components/ui/badge";
import { TechBadge } from "@/components/ui/tech-badge";
import { cn } from "@/lib/utils";

/** Shorter labels for the compact card — full status shows on the case study page. */
const shortStatus: Record<ProjectStatus, string> = {
  "Client Project": "Client Project",
  "Commercial Development Planned": "Pre-Commercial",
  "Public Engineering Showcase": "Public Showcase",
};

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_20px_60px_-24px] hover:shadow-primary/25 sm:p-8",
        featured && "lg:p-9"
      )}
    >
      {/* accent wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(60% 100% at 50% 0%, ${project.accent}22, transparent)`,
        }}
      />

      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="flex size-11 items-center justify-center rounded-xl text-base font-bold text-white shadow-sm"
            style={{ backgroundColor: project.accent }}
          >
            {project.title.charAt(0)}
          </span>
          <div>
            <p className="text-xs font-medium text-muted-foreground">
              {project.category}
            </p>
            <p className="text-xs text-muted-foreground/70">{project.year}</p>
          </div>
        </div>
        <Badge
          variant={project.status === "Public Engineering Showcase" ? "primary" : "default"}
          className="shrink-0 whitespace-nowrap"
        >
          {project.cardLabel ?? shortStatus[project.status]}
        </Badge>
      </div>

      <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
        {project.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {project.summary}
      </p>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.primaryStack.map((t) => (
          <TechBadge key={t}>{t}</TechBadge>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-1 text-sm font-medium text-primary">
        Read case study
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
