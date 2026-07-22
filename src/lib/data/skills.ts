export type SkillGroup = {
  category: string;
  description: string;
  skills: string[];
};

/**
 * Every skill here is directly verified against the CV's Technical Skills
 * section or confirmed in source code for a real project. Tools/frameworks
 * used only to build this portfolio site (Next.js, TypeScript) are
 * intentionally excluded from professional-work claims — see the About page
 * for that distinction.
 */
export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    description: "Core languages used across production and academic work.",
    skills: ["PHP", "Python", "Java", "JavaScript", "SQL", "HTML5", "CSS3"],
  },
  {
    category: "Frontend",
    description: "Building responsive, installable interfaces.",
    skills: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Responsive web design",
      "Progressive Web Apps",
      "Service workers",
      "WordPress",
    ],
  },
  {
    category: "Backend",
    description: "Services, APIs and business logic.",
    skills: [
      "FastAPI",
      "REST API development",
      "Authentication & authorisation",
      "Session management",
      "Background processing",
      "Webhook processing",
      "SMTP / transactional messaging",
    ],
  },
  {
    category: "Databases",
    description: "Relational modelling and data integrity.",
    skills: [
      "MySQL",
      "PostgreSQL",
      "Entity-relationship modelling",
      "Schema design",
      "Prepared statements",
      "Database migrations",
    ],
  },
  {
    category: "APIs & Integrations",
    description: "Third-party platforms integrated into production systems.",
    skills: [
      "Paystack API",
      "WhatsApp Cloud API",
      "SMS gateways",
      "Mobile Money payments",
      "Card payments",
      "Webhooks",
    ],
  },
  {
    category: "Security",
    description: "Protecting users, data and money end to end.",
    skills: [
      "Role-based access control",
      "JWT authentication",
      "TOTP two-factor authentication",
      "bcrypt password hashing",
      "CSRF protection",
      "Rate limiting",
      "Account lockout",
      "Audit logging",
      "HMAC-SHA512 signature verification",
      "Idempotent payment processing",
      "OWASP-aware development",
      "Passwordless OTP verification",
    ],
  },
  {
    category: "Cloud & Deployment",
    description: "Shipping and operating software in production.",
    skills: [
      "Apache",
      "Linux hosting",
      "IONOS hosting",
      "HTTPS / SSL/TLS / HSTS",
      "DNS configuration",
      "SFTP deployment",
      "Scheduled background jobs",
    ],
  },
  {
    category: "Tools & Practices",
    description: "How I plan, build and ship.",
    skills: [
      "Git & GitHub",
      "VS Code",
      "Postman",
      "Requirements gathering",
      "Software architecture",
      "Technical documentation",
      "Client communication",
      "Production debugging",
    ],
  },
];
