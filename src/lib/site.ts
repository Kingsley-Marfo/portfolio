/**
 * Central site configuration & personal brand constants.
 * Update contact links / domain here — everything else reads from this.
 */
export const siteConfig = {
  name: "Kingsley Marfo",
  role: "Software Engineer",
  // A tight, recruiter-facing positioning line.
  tagline: "Software Engineer building secure FinTech, e-commerce and enterprise software.",
  summary:
    "Full-stack and backend developer specialising in secure authentication, payment systems, APIs, scalable web applications and business workflow automation.",
  url: "https://portfolio.opfix.co.uk",
  domain: "portfolio.opfix.co.uk",
  location: "Dunstable, United Kingdom",
  email: "Kingsley.Marfo@opfix.co.uk",
  cvPath: "/kingsley-marfo-cv.pdf",
  avatar: "/profile.png",
  ogImage: "/opengraph-image",
  socials: {
    github: "https://github.com/Kingsley-Marfo",
    linkedin: "https://www.linkedin.com/in/kingsley-a-marfo-kwesi",
    email: "mailto:Kingsley.Marfo@opfix.co.uk",
  },
  // Kept deliberately short — see audit: 5 near-duplicate labels read as
  // keyword-stuffing. Two is enough to position without repeating the H1.
  brand: ["Full-Stack Developer", "Backend Engineer"],
} as const;

export type NavItem = { title: string; href: string };

export const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Projects", href: "/projects" },
  { title: "Experience", href: "/experience" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];
