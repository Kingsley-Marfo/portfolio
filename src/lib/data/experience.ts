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
    role: "Freelance Software Developer — Flayona (Client Project)",
    organisation: "Flayona",
    type: "engineering",
    period: "2025 — Present",
    summary:
      "Designed and deployed a production multi-vendor e-commerce and FinTech platform for a commercial client — distributor-specific pricing, variant-level inventory, region-based fulfilment, and a configurable Buy-Now-Pay-Later lending system, in vanilla PHP and MySQL.",
    highlights: [
      "Delivered a configurable BNPL lending system with KYC onboarding, 1–24 month repayment terms, tiered flat-interest pricing (0–22%), automated instalment scheduling and capped, non-compounding late fees.",
      "Integrated Paystack card and Mobile Money payments using HMAC-SHA512 webhook verification, idempotent processing and race-safe transaction reconciliation.",
      "Engineered four secure authentication domains — customers, distributors, administrators and Credit Officers — with TOTP two-factor authentication, account lockout, passwordless OTP and role-based access control.",
      "Implemented secure handling of Ghana Cards, payslips, selfies and KYC information using private storage and ownership-checked, authenticated access.",
    ],
    stack: ["PHP", "MySQL", "Paystack API", "WhatsApp Cloud API", "PWA"],
  },
  {
    role: "Full-Stack Developer — OpFix (Final Year Project)",
    organisation: "OpFix",
    type: "engineering",
    period: "2026",
    summary:
      "Designed and deployed a secure, enterprise-style cloud-based maintenance management platform as my BSc final-year project — six organisational roles, end-to-end maintenance workflows, and a FastAPI + PostgreSQL backend behind a React SPA. Now being prepared for future commercialisation.",
    highlights: [
      "Modelled relational data structures for organisations, users, maintenance jobs, quotes, approvals, attachments and audit history.",
      "Implemented role-based access control, access-level administration, audit logging, and soft deletion with restoration.",
      "Built workflows for immediate (three-hour), 48-hour and one-week approval-based maintenance categories, with responsive dashboards and reporting.",
      "Evaluated the platform across role-specific accounts and improved accessibility to a self-assessed ~97–99 Lighthouse score through iterative testing and remediation.",
    ],
    stack: ["FastAPI", "PostgreSQL", "React", "Vite", "Supabase"],
  },
  {
    role: "Freelance Web Developer — Julli Jets (Client Project)",
    organisation: "Julli Jets",
    type: "engineering",
    period: "Client engagement",
    summary:
      "Worked directly with the client to gather requirements and translate business needs into a responsive commercial website for an aviation charter business, on WordPress and Elementor.",
    highlights: [
      "Designed, developed and deployed a professional customer-facing website with responsive layouts, structured content and enquiry functionality.",
      "Built a custom PHP page-generation layer that composes Elementor sections from reusable widget and design-token helpers, keeping the site's design system consistent across pages.",
      "Supported deployment, content updates, usability improvements and ongoing client requirements.",
    ],
    stack: ["WordPress", "Elementor", "PHP", "JavaScript"],
  },
];

export const leadershipExperience: ExperienceItem[] = [
  {
    role: "Restaurant Manager",
    organisation: "Burger King UK",
    type: "leadership",
    period: "2023 — Present",
    summary:
      "Lead a team of more than 30 employees in a high-volume quick-service restaurant, alongside freelance software development and completing a BSc in Computer Science.",
    highlights: [
      "Manage recruitment, onboarding, training, performance and workforce planning for a 30+ person team.",
      "Own business-critical operational systems and digital reporting, using data to support continuous improvement.",
      "Partner with internal IT teams, engineers and technical suppliers to prioritise and resolve operational incidents.",
      "Maintain Health & Safety and operational compliance while managing stakeholders across Operations, HR, IT and Engineering.",
    ],
  },
  {
    role: "Department Manager",
    organisation: "Moto Hospitality Ltd",
    type: "leadership",
    period: "2022 — 2023",
    summary:
      "Led and trained front-line teams in a busy motorway service environment, managing daily operational performance, digital systems and reporting.",
    highlights: [
      "Maintained compliance standards across a high-throughput service environment.",
      "Supported improvements in customer service, training and operational delivery.",
    ],
  },
  {
    role: "Shift Manager → Assistant Manager → Restaurant Manager",
    organisation: "Burger King UK",
    type: "leadership",
    period: "2016 — 2022",
    summary:
      "Progressed through increasingly senior management roles over six years, from Shift Manager to Restaurant Manager.",
    highlights: [
      "Supervised restaurant operations, employee development, customer service, workforce scheduling and compliance.",
      "Supported recruitment, onboarding, training and performance management.",
      "Worked with regional management and technical support teams to deliver operational targets and resolve business-critical issues.",
    ],
  },
];

export const allExperience = [...engineeringExperience, ...leadershipExperience];
