import Link from "next/link";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { navItems, siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/container";

const projectLinks = [
  { title: "Flayona", href: "/projects/flayona" },
  { title: "OpFix", href: "/projects/opfix" },
  { title: "Julli Jets", href: "/projects/julli-jets" },
  { title: "Recipe Management System", href: "/projects/recipe-management-system" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 font-semibold">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                KM
              </span>
              {siteConfig.name}
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline}
            </p>
            <div className="flex items-center gap-2">
              {[
                { href: siteConfig.socials.github, icon: GithubIcon, label: "GitHub" },
                { href: siteConfig.socials.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
                { href: siteConfig.socials.email, icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
                >
                  <Icon className="size-[1.1rem]" />
                </Link>
              ))}
            </div>
          </div>

          <FooterCol title="Navigate" links={navItems} />
          <FooterCol title="Case studies" links={projectLinks} />

          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold">Get in touch</p>
            <Link
              href={siteConfig.socials.email}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {siteConfig.email}
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-fit items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Start a conversation <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js,
            TypeScript &amp; Tailwind CSS.
          </p>
          <p>{siteConfig.domain}</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { title: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-semibold">{title}</p>
      <ul className="flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
