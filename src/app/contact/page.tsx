import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Download, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { Container, Section } from "@/components/ui/container";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch about software engineering roles or projects. Email, LinkedIn, GitHub and CV download.",
};

const channels = [
  { icon: Mail, label: "Email", value: siteConfig.email, href: siteConfig.socials.email },
  { icon: LinkedinIcon, label: "LinkedIn", value: "Kingsley Marfo", href: siteConfig.socials.linkedin, external: true },
  { icon: GithubIcon, label: "GitHub", value: "github.com/Kingsley-Marfo", href: siteConfig.socials.github, external: true },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let's talk."
        description="I'm open to Software Engineer, Full-Stack and Backend roles — and interesting projects. The fastest way to reach me is the form or email."
      />

      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left: details */}
          <Reveal className="space-y-8">
            <div className="space-y-3">
              {channels.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
                >
                  <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <c.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">{c.label}</p>
                    <p className="text-sm text-muted-foreground">{c.value}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="size-4 text-primary" /> Based in {siteConfig.location}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Open to remote and on-site opportunities.
              </p>
            </div>

            <div className="rounded-2xl border border-dashed border-border bg-card p-5">
              <div className="flex items-center gap-2 text-sm font-medium">
                <FileText className="size-4 text-primary" /> Curriculum Vitae
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Prefer the full picture? Download my CV.
              </p>
              <a
                href={siteConfig.cvPath}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Download className="size-4" /> Download CV (PDF)
              </a>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={1}>
            <ContactForm />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
