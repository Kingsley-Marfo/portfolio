import { siteConfig } from "@/lib/site";

/** Person + WebSite structured data for rich search results. */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
        jobTitle: siteConfig.role,
        description: siteConfig.summary,
        image: `${siteConfig.url}${siteConfig.avatar}`,
        sameAs: [siteConfig.socials.github, siteConfig.socials.linkedin],
        knowsAbout: [
          "Software Engineering",
          "Full-Stack Development",
          "Backend Development",
          "FinTech",
          "TypeScript",
          "Next.js",
          "System Design",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: `${siteConfig.name} — ${siteConfig.role}`,
        description: siteConfig.summary,
        publisher: { "@id": `${siteConfig.url}/#person` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
