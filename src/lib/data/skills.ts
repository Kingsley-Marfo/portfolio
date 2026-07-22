export type SkillGroup = {
  category: string;
  description: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    description: "Typed and dynamic languages I ship production code in.",
    skills: ["PHP", "Python", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"],
  },
  {
    category: "Frameworks",
    description: "For building web apps, APIs and interfaces.",
    skills: ["FastAPI", "React", "Next.js", "Vite", "Tailwind CSS", "WordPress / Elementor"],
  },
  {
    category: "Backend",
    description: "Designing services, domain models and business logic.",
    skills: [
      "REST APIs",
      "SQLAlchemy ORM",
      "Alembic migrations",
      "MVC architecture",
      "WebSockets",
      "Cron / scheduled jobs",
    ],
  },
  {
    category: "Databases",
    description: "Relational modelling, migrations and query design.",
    skills: ["MySQL", "PostgreSQL", "Supabase", "Schema design", "Normalisation", "Soft deletes"],
  },
  {
    category: "Cloud & DevOps",
    description: "Shipping and operating software in production.",
    skills: ["Render", "Supabase", "IONOS", "Git & GitHub", "PWA / Service Workers", "CI"],
  },
  {
    category: "Security",
    description: "Protecting users, data and money.",
    skills: [
      "RBAC",
      "JWT & bcrypt",
      "TOTP / 2FA",
      "CSRF protection",
      "KYC & credit scoring",
      "Audit logging",
    ],
  },
  {
    category: "APIs & Payments",
    description: "Integrating third-party platforms reliably.",
    skills: ["Paystack", "Mobile Money (MoMo)", "WhatsApp API", "SMS / OTP", "Webhooks", "Idempotency"],
  },
  {
    category: "Tools",
    description: "The day-to-day engineering toolchain.",
    skills: ["Git", "GitHub", "VS Code", "pytest", "Postman", "Alembic", "Figma"],
  },
  {
    category: "Engineering",
    description: "How I think about building software.",
    skills: [
      "System design",
      "Workflow state machines",
      "Accessibility (WCAG)",
      "Automated testing",
      "Technical writing",
      "Performance",
    ],
  },
];
