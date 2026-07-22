import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_50%_60%_at_50%_0%,#000,transparent)]" />
        <div className="absolute left-1/2 top-[-30%] h-[300px] w-[560px] -translate-x-1/2 rounded-full bg-primary/10 blur-[110px]" />
      </div>
      <Container className="relative py-16 sm:py-20">
        <Reveal className="max-w-3xl">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </Reveal>
      </Container>
    </section>
  );
}
