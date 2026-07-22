# Kingsley Marfo — Portfolio

A premium, production-ready personal portfolio for a Software Engineer. Built to
read as an engineering brand — in-depth technical case studies, not screenshot
galleries.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion ·
Lucide · MDX · Mermaid diagrams · next-themes (dark mode) · deployed on Vercel.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint
```

## Project structure

```
src/
  app/                     # routes (App Router)
    page.tsx               # home
    about/  experience/    # about & experience
    projects/              # projects index
    projects/[slug]/       # dynamic case-study pages
    blog/  blog/[slug]/    # MDX blog index + posts
    contact/               # contact page
    api/contact/           # contact form handler
    opengraph-image.tsx    # dynamic OG image
    sitemap.ts robots.ts manifest.ts  # SEO
  components/
    ui/                    # design-system primitives (button, card, badge, …)
    layout/                # navbar, footer, theme toggle
    sections/              # home-page sections (hero, skills, projects, …)
    mdx.tsx                # MDX component mapping (+ mermaid code fences)
  content/blog/            # blog posts (.mdx with frontmatter)
  lib/
    site.ts                # your name, links, email, domain, CV path
    data/                  # skills, projects, experience, education, stats
    blog.ts                # blog frontmatter reader
```

## Make it yours

Everything is data-driven — no need to touch layout code for content changes.

| Want to change…              | Edit…                                     |
| ---------------------------- | ----------------------------------------- |
| Name, email, socials, domain | `src/lib/site.ts`                         |
| Skills                       | `src/lib/data/skills.ts`                  |
| Projects / case studies      | `src/lib/data/projects.ts`                |
| Experience timeline          | `src/lib/data/experience.ts`              |
| Education & certifications   | `src/lib/data/education.ts`               |
| Home stats                   | `src/lib/data/stats.ts`                   |
| Blog posts                   | add an `.mdx` file to `src/content/blog/` |
| Colours / theme              | `src/app/globals.css` (CSS variables)     |

### Replace the placeholders

- **Portrait** — replace `public/avatar.svg` with your photo (any format).
- **CV** — replace `public/kingsley-marfo-cv.pdf` with your real CV.
- **Screenshots** — case studies use framed placeholders (`ScreenshotFrame`).
  Swap in a `next/image` when you have real screenshots.

### Add a new case study

Append an object to the `projects` array in `src/lib/data/projects.ts`. The
individual page, routing, sitemap entry and card are generated automatically.
Architecture and database diagrams are written as [Mermaid](https://mermaid.js.org/)
strings and rendered live (theme-aware).

### Add a new blog post

Create `src/content/blog/my-post.mdx` with frontmatter:

```
---
title: "My post"
description: "One-line summary."
date: "2025-01-01"
tags: ["Architecture"]
---
```

Write the body in MDX. Fenced ` ```mermaid ` blocks render as diagrams.

## Contact form

`POST /api/contact` validates input, includes a honeypot, and delivers enquiries
to your inbox via **Gmail SMTP** (Nodemailer). Configure it with an App Password:

1. Enable 2-Step Verification on your Google account.
2. Create an App Password at https://myaccount.google.com/apppasswords
3. Copy `.env.example` → `.env.local` and fill in `GMAIL_USER` / `GMAIL_APP_PASSWORD`.
4. On Vercel, add the same variables under Project → Settings → Environment Variables.

Without those variables set, the form still works — it validates and logs the
enquiry server-side (useful in development) instead of emailing.

## Deploy to Vercel

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

Then set your custom domain and update `siteConfig.url` / `domain` in
`src/lib/site.ts`.

## SEO & performance

- Per-page metadata, OpenGraph + Twitter cards, JSON-LD (Person, WebSite,
  CreativeWork, BlogPosting), canonical URLs, `sitemap.xml`, `robots.txt`, PWA manifest.
- Fonts via `next/font`, images via `next/image`, Mermaid dynamically imported,
  motion respects `prefers-reduced-motion`.
