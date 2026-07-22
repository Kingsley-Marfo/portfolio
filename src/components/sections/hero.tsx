"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_40%,transparent_100%)]" />
        <div className="absolute left-1/2 top-[-10%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-primary/15 blur-[130px]" />
      </div>

      <Container className="relative grid items-center gap-12 pb-16 pt-16 sm:pt-24 lg:grid-cols-[1.35fr_1fr] lg:gap-8 lg:pb-24 lg:pt-28">
        <div>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
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
            className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="text-gradient">Software Engineer</span> building
            secure, scalable web applications, FinTech platforms &amp;
            enterprise software.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            I&apos;m {siteConfig.name} — a full-stack and backend engineer who
            designs and ships production software: payments, BNPL, authentication,
            KYC and role-based enterprise platforms.
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
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:mx-0"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-muted to-card">
            <Image
              src={siteConfig.avatar}
              alt={`${siteConfig.name}, Software Engineer`}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 380px"
              className="object-cover"
            />
            {/* graceful placeholder shown under the image if it is missing */}
            <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center gap-3 text-muted-foreground">
              <Sparkles className="size-8 text-primary" />
              <span className="text-sm">Professional portrait</span>
            </div>
          </div>

          {/* floating tech chip */}
          <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-lg backdrop-blur sm:block">
            <p className="font-mono text-xs text-muted-foreground">$ shipping</p>
            <p className="text-sm font-semibold">production software</p>
          </div>
        </motion.div>
      </Container>

      {/* brand marquee-ish row */}
      <Container className="relative pb-14">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          {siteConfig.brand.map((b, i) => (
            <span key={b} className="flex items-center gap-6">
              <span className="text-sm font-medium text-muted-foreground">{b}</span>
              {i < siteConfig.brand.length - 1 ? (
                <span className="hidden size-1 rounded-full bg-border sm:inline-block" />
              ) : null}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
