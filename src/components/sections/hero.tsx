"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]" />

      <Container className="relative grid items-center gap-12 pb-16 pt-16 sm:pt-24 lg:grid-cols-[1.35fr_1fr] lg:gap-8 lg:pb-24 lg:pt-28">
        <div>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="relative flex size-2">
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              Available for software engineering roles
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl"
          >
            Software Engineer building secure FinTech, e-commerce and
            enterprise software.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            I&apos;m {siteConfig.name} — a full-stack and backend developer
            specialising in secure authentication, payment systems, APIs,
            scalable web applications and business workflow automation.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="/projects" size="lg">
              View projects <ArrowRight className="size-4" />
            </ButtonLink>
            <ButtonLink href={siteConfig.cvPath} size="lg" variant="secondary" external>
              <Download className="size-4" /> Download CV
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="ghost">
              Contact me
            </ButtonLink>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-4" /> {siteConfig.location}
            </span>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <GithubIcon className="size-4" /> GitHub
            </a>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <LinkedinIcon className="size-4" /> LinkedIn
            </a>
          </motion.div>
        </div>

        {/* portrait */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto w-full max-w-sm lg:mx-0"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-muted">
            <Image
              src={siteConfig.avatar}
              alt={`${siteConfig.name}, Software Engineer`}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 380px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </Container>

      {/* positioning row */}
      <Container className="relative pb-14">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Also
          </span>
          {siteConfig.brand.map((b, i) => (
            <span key={b} className="flex items-center gap-6">
              <span className="text-sm text-muted-foreground">{b}</span>
              {i < siteConfig.brand.length - 1 ? (
                <span className="size-1 rounded-full bg-border" />
              ) : null}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
