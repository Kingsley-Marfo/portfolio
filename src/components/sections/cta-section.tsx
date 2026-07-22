import { ArrowRight, Download } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Container, Section } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function CtaSection() {
  return (
    <Section>
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-navy px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,#000,transparent)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-[640px] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let&apos;s build something reliable.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70">
              I&apos;m looking for a software engineering role where I can design
              and ship production systems. If that sounds like your team, I&apos;d
              love to talk.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/contact" size="lg">
                Get in touch <ArrowRight className="size-4" />
              </ButtonLink>
              <ButtonLink
                href={siteConfig.cvPath}
                size="lg"
                variant="outline"
                external
                className="border-white/20 text-white hover:bg-white/10"
              >
                <Download className="size-4" /> Download CV
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
