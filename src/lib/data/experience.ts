export type ExperienceItem = {
  role: string;
  organisation: string;
  type: "engineering" | "leadership";
  location?: string;
  period: string;
  summary: string;
  highlights: string[];
  stack?: string[];
};

/** Software engineering experience is presented first, leadership second. */
export const engineeringExperience: ExperienceItem[] = [
  {
    role: "Founder & Full-Stack Engineer",
    organisation: "Flayona",
    type: "engineering",
    period: "2024 — Present",
    summary:
      "Designed and built a Ghana-focused e-commerce and FinTech platform end to end in vanilla PHP and MySQL — Paystack and Mobile Money payments, a Buy-Now-Pay-Later engine with credit scoring, KYC onboarding and four separate role portals.",
    highlights: [
      "Built four distinct authenticated portals — customer, admin/staff, credit officer and distributor — each with its own login, 2FA and password-reset flow.",
      "Engineered a BNPL engine with credit scoring, digital contracts and a cron job that automatically charges instalments.",
      "Integrated Paystack (card) and Mobile Money, with signature-verified webhooks reconciling orders.",
      "Hardened the platform with CSRF protection, TOTP two-factor auth, KYC verification and full audit logging.",
    ],
    stack: ["PHP", "MySQL", "Paystack", "TOTP / 2FA", "PWA"],
  },
  {
    role: "Full-Stack Engineer — OpFix (Dissertation Project)",
    organisation: "Cloud-Based Maintenance Management System",
    type: "engineering",
    period: "2024 — 2025",
    summary:
      "Built OpFix, a cloud-based Maintenance Management System, as my BSc final-year project — a FastAPI + PostgreSQL backend and a React SPA, with role-based access, a multi-stage job workflow and full auditability.",
    highlights: [
      "Modelled a multi-party workflow (store → admin → contractor → engineer → accounts) as an explicit job state machine.",
      "Enforced role-based access (Admin, Engineer, Client and more) with JWT auth, bcrypt hashing and TOTP 2FA.",
      "Added audit logging, file attachments, SLA tracking, KPI dashboards and Excel/PDF exports.",
      "Backed by SQLAlchemy + Alembic migrations, a pytest suite, and deployed on Render with Supabase Postgres.",
    ],
    stack: ["FastAPI", "PostgreSQL", "React", "SQLAlchemy", "Render"],
  },
  {
    role: "Freelance Web Developer",
    organisation: "Julli Jets (Client)",
    type: "engineering",
    period: "2024 — 2025",
    summary:
      "Delivered and maintain a commercial private-charter website (jullijets.co.uk) on WordPress/Elementor, driven by a custom PHP page-generation system I wrote.",
    highlights: [
      "Built a two-layer PHP page builder that programmatically generates Elementor layouts from reusable section helpers.",
      "Developed mu-plugin shortcodes, a global design system and a charter-request booking flow.",
      "Collaborated directly with the client and deployed to IONOS hosting via SSH.",
    ],
    stack: ["WordPress", "Elementor", "PHP", "JavaScript"],
  },
];

export const leadershipExperience: ExperienceItem[] = [
  {
    role: "Restaurant Supervisor / Team Lead",
    organisation: "Hospitality",
    type: "leadership",
    period: "2019 — 2023",
    summary:
      "Led front-of-house teams in a fast-paced, high-pressure environment — the experience that sharpened the ownership, communication and problem-solving I now bring to engineering.",
    highlights: [
      "Coordinated and motivated teams during peak service, keeping standards high under pressure.",
      "Owned rotas, training and issue resolution — end-to-end responsibility for outcomes.",
      "Turned recurring operational pain points into repeatable processes.",
      "Built the customer-first, calm-under-pressure mindset that shapes how I ship software.",
    ],
  },
];

export const allExperience = [...engineeringExperience, ...leadershipExperience];
