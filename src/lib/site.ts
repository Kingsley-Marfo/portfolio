/**
 * Central site configuration & personal brand constants.
 * Update contact links / domain here — everything else reads from this.
 */
export const siteConfig = {
  name: "Kingsley Marfo",
  role: "Software Engineer",
  // A tight, recruiter-facing positioning line.
  tagline:
    "Software Engineer building secure, scalable web applications, FinTech platforms and enterprise software.",
  summary:
    "Full-stack and backend engineer specialising in production systems — payments, BNPL, authentication, KYC and role-based enterprise platforms. I turn real business problems into reliable, well-architected software.",
  url: "https://kingsleymarfo.opfix.co.uk",
  domain: "kingsleymarfo.opfix.co.uk",
  location: "United Kingdom",
  email: "Kingsley.Marfo@opfix.co.uk",
  cvPath: "/kingsley-marfo-cv.pdf",
  avatar: "/profile.png",
  ogImage: "/opengraph-image",
  socials: {
    github: "https://github.com/Kingsley-Marfo",
    linkedin: "https://www.linkedin.com/in/kingsley-a-marfo-kwesi",
    email: "mailto:Kingsley.Marfo@opfix.co.uk",
  },
  // Recruiter-facing one-word brand pillars.
  brand: [
    "Software Engineer",
    "Full-Stack Developer",
    "Backend Developer",
    "FinTech Engineer",
    "Enterprise Software Engineer",
  ],
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
