"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { navItems, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { ButtonLink } from "@/components/ui/button";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-semibold tracking-tight"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground shadow-sm">
            KM
          </span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hidden size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
          >
            <GithubIcon className="size-[1.15rem]" />
          </Link>
          <Link
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hidden size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:inline-flex"
          >
            <LinkedinIcon className="size-[1.15rem]" />
          </Link>
          <ThemeToggle />
          <ButtonLink
            href="/contact"
            size="sm"
            className="hidden md:inline-flex"
          >
            Get in touch
          </ButtonLink>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-foreground md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.title}
              </Link>
            ))}
            <ButtonLink href="/contact" className="mt-2 w-full">
              Get in touch
            </ButtonLink>
          </div>
        </div>
      )}
    </header>
  );
}
