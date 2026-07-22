export type StackGroup = { category: string; items: string[] };
export type Feature = { title: string; description: string };
export type NamedBlock = { title: string; description: string };
export type Screenshot = { alt: string; caption: string; src?: string };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  role: string;
  timeline: string;
  status: "Production" | "Client project" | "Academic" | "Live";
  featured: boolean;
  order: number;
  accent: string; // hex used for subtle per-project theming
  summary: string; // short — used on cards
  metrics: { label: string; value: string }[];
  primaryStack: string[]; // condensed for cards
  links: { live?: string; github?: string };

  // --- Case study body ---
  overview: string[];
  problem: string[];
  requirements: string[];
  research?: string[];
  solution: string[];
  architecture: { description: string[]; diagram: string };
  database?: { description: string[]; diagram: string };
  features: Feature[];
  implementation: NamedBlock[];
  challenges: NamedBlock[];
  security?: string[];
  results: string[];
  lessons: string[];
  future: string[];
  screenshots: Screenshot[];
  stack: StackGroup[];
};

export const projects: Project[] = [
  /* ================================================================ */
  /*  FLAYONA                                                          */
  /* ================================================================ */
  {
    slug: "flayona",
    title: "Flayona",
    tagline:
      "A Ghana-focused e-commerce & BNPL platform in vanilla PHP — Paystack, Mobile Money, KYC and four role portals.",
    category: "FinTech · E-commerce · Full-Stack",
    year: "2024",
    role: "Founder & Full-Stack Engineer",
    timeline: "Ongoing",
    status: "Production",
    featured: true,
    order: 1,
    accent: "#e11d48",
    summary:
      "A production commerce platform for imported goods in Ghana — card and Mobile Money payments, a Buy-Now-Pay-Later engine with credit scoring, KYC onboarding, and four separate authenticated portals, all built in vanilla PHP + MySQL.",
    metrics: [
      { label: "Portals", value: "4 roles" },
      { label: "Payments", value: "Paystack + MoMo" },
      { label: "Credit", value: "BNPL engine" },
    ],
    primaryStack: ["PHP", "MySQL", "Paystack", "Mobile Money", "PWA"],
    links: { live: "https://flayona.com" },
    overview: [
      "Flayona is a Ghana-focused e-commerce marketplace for genuine imported (“abrokyire”) goods, sold at fair local prices, delivered by region and paid for via card or Mobile Money. It is a real, live platform — and because it handles money and extends credit, correctness and security sit at its core.",
      "I built the whole system in deliberately lean technology: vanilla PHP and MySQL, server-rendered, installable as a PWA and fast on low-end Android devices. On top of that foundation sit a Buy-Now-Pay-Later engine, KYC onboarding, and four distinct authenticated portals — customer, admin, credit officer and distributor.",
    ],
    problem: [
      "Shoppers in Ghana want access to genuine imported goods at fair local prices, with payment options that match how people actually pay — Mobile Money as much as cards — and the flexibility to spread the cost.",
      "Delivering that safely is hard. You need reliable payments across two very different rails, a way to extend credit without getting burned, identity verification before credit is granted, and separate, secure workspaces for the different people who run the business — all while staying fast on cheap Android phones on patchy connections.",
    ],
    requirements: [
      "Accept both card payments (Paystack) and Mobile Money.",
      "Offer a Buy-Now-Pay-Later option with credit scoring and instalments.",
      "Verify customer identity (KYC) before credit is extended.",
      "Provide separate secure portals for customers, admins, credit officers and distributors.",
      "Protect every portal with strong authentication and 2FA.",
      "Run fast and installable (PWA) on low-end Android, even offline for browsing.",
    ],
    research: [
      "Studied Paystack's payment and webhook lifecycle to reconcile orders reliably.",
      "Mapped the Mobile Money flow used locally — where the order/PO number becomes the payment reference and is confirmed over WhatsApp.",
      "Reviewed the OWASP Top 10 and applied it to authentication, CSRF, input handling and access control across all four portals.",
    ],
    solution: [
      "The storefront is server-rendered PHP with a shared library of includes for auth, cart, payments, KYC and audit. It ships as a PWA with a service worker for installability and offline read-only browsing.",
      "Pricing is distributor-driven: a master catalogue holds a reference price and the admin's private cost, but the price a customer actually pays is set by the distributor serving their region. Orders carry a kind (standard, pre-order or BNPL) and a fulfilment type (delivery, pickup or rider).",
      "Standard orders take no card online — the customer places the order, receives an invoice with a payment reference (PO number), pays by Mobile Money and confirms on WhatsApp. Pre-order deposits are collected online via Paystack, whose webhook is signature-verified and reconciles the order.",
      "The BNPL engine runs a credit score, generates a digital contract and an instalment schedule, and a scheduled cron job automatically charges instalments as they fall due — all gated behind KYC verification and available to Flayona Plus members.",
      "Each of the four portals has its own authentication guard, TOTP two-factor authentication and password-reset flow, with CSRF protection and an append-only audit log across the platform.",
    ],
    architecture: {
      description: [
        "Flayona is a server-rendered PHP application over MySQL (mysqli). Cross-cutting concerns live in a shared `includes/` layer — authentication guards per role, CSRF, Paystack, BNPL, credit scoring, KYC upload, audit logging, mailer/SMS/WhatsApp and region logic — so each page composes the same vetted building blocks.",
        "Four separate portals sit behind their own auth guards: the customer storefront, the admin back office, the credit-officer portal that reviews BNPL applications, and the distributor portal with its own POS, stock and orders.",
        "Payment is asynchronous by design: standard orders resolve out-of-band via Mobile Money and WhatsApp confirmation, pre-order deposits go through a signature-verified Paystack webhook, and a cron job drives automated BNPL instalment charging independently of any user session.",
      ],
      diagram: `flowchart TB
    C["Customer (PWA)"] --> APP["Server-rendered PHP<br/>+ shared includes/"]
    ADM["Admin"] --> APP
    CO["Credit Officer"] --> APP
    DIST["Distributor (POS)"] --> APP
    APP --> AUTH["Per-role auth guards<br/>+ CSRF + TOTP 2FA"]
    AUTH --> DB[("MySQL")]
    APP --> AUDIT["Audit log"]
    APP --> MOMO["Mobile Money<br/>(PO ref · WhatsApp confirm)"]
    APP --> PAY["Paystack<br/>(pre-order deposits)"]
    PAY --> WH["Signed webhook<br/>reconciles orders"]
    WH --> DB
    DIST --> PRICE["Region pricing + stock"]
    PRICE --> DB
    CRON["Cron: BNPL charging"] --> BNPL["BNPL + credit score"]
    BNPL --> DB`,
    },
    database: {
      description: [
        "The live schema (30+ tables) is organised around commerce and credit. Customers place orders of order items, settled through order payments; a master products table carries a reference price and admin cost, while distributor_products sets the region-specific price and distributor_variant_stock the stock. BNPL orders link to KYC applications, credit scores and instalments.",
        "Roles are separated at the data layer — admins, credit officers and distributors are distinct account types with their own credentials and TOTP secrets — and cross-cutting tables cover regions, promotions, reviews, loyalty points, Flayona Plus subscriptions and an append-only audit log.",
      ],
      diagram: `erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER ||--o| BNPL_KYC_APPLICATION : submits
    CUSTOMER ||--o| CUSTOMER_CREDIT_SCORE : scored_by
    ORDER ||--o{ ORDER_ITEM : contains
    ORDER ||--o{ ORDER_PAYMENT : settled_by
    ORDER ||--o| BNPL_ORDER : may_be
    BNPL_ORDER ||--o{ BNPL_INSTALLMENT : schedules
    PRODUCT ||--o{ ORDER_ITEM : listed_in
    DISTRIBUTOR ||--o{ DISTRIBUTOR_PRODUCT : prices
    PRODUCT ||--o{ DISTRIBUTOR_PRODUCT : priced_as
    REGION ||--o{ DISTRIBUTOR : served_by
    CUSTOMER {
      int id PK
      string phone
      int region_id FK
    }
    ORDER {
      int id PK
      int customer_id FK
      string po_ref
      enum order_kind
      enum fulfilment_type
    }
    ORDER_PAYMENT {
      int id PK
      int order_id FK
      enum method
      enum status
    }
    DISTRIBUTOR_PRODUCT {
      int distributor_id FK
      int product_id FK
      decimal price
    }
    BNPL_INSTALLMENT {
      int id PK
      int bnpl_order_id FK
      date due_date
      enum status
    }`,
    },
    features: [
      { title: "Four role portals", description: "Separate authenticated workspaces for customers, admins, credit officers and distributors — each with its own login, 2FA and reset flow." },
      { title: "Region-based distributor pricing", description: "A master catalogue with reference price and admin cost, where the price a customer pays is set by their region's serving distributor." },
      { title: "Mobile Money checkout", description: "No card taken online for standard orders — an invoice with a PO reference, paid by Mobile Money and confirmed over WhatsApp." },
      { title: "Paystack pre-order deposits", description: "Online deposits for pre-orders via Paystack, with a signature-verified webhook that reconciles the order." },
      { title: "Buy-Now-Pay-Later engine", description: "Credit scoring, a digital BNPL contract and an instalment schedule, all gated behind KYC." },
      { title: "Flayona Plus membership", description: "A paid subscription unlocking BNPL, priority pre-orders and member-only deals." },
      { title: "Automated instalment charging", description: "A cron job charges BNPL instalments as they fall due, independent of any user session." },
      { title: "KYC onboarding", description: "Document upload and verification that gates access to credit." },
      { title: "Distributor POS & stock", description: "Distributors run point-of-sale, manage stock and fulfil orders from their own portal." },
      { title: "Regional delivery", description: "Region-aware delivery pricing and messaging tailored to how goods move from the Accra hub." },
      { title: "Loyalty, reviews & promotions", description: "Customer loyalty, product reviews, professional discounts, preorders and promotional campaigns." },
      { title: "Audit logging & 2FA", description: "TOTP two-factor auth across portals, CSRF protection and an append-only audit trail." },
    ],
    implementation: [
      { title: "Lean, deliberate stack", description: "Vanilla PHP + MySQL with no framework or build step — chosen so the app stays fast and installable on low-end Android WebViews." },
      { title: "Shared includes layer", description: "Auth, CSRF, payments, BNPL, KYC and audit all live in one vetted `includes/` layer that every page composes." },
      { title: "Per-role authentication", description: "Each portal has its own auth guard and TOTP secret, so a customer session can never reach admin or distributor tooling." },
      { title: "Webhook reconciliation", description: "The Paystack webhook is the single point that verifies signatures and reconciles order state against the provider." },
      { title: "Scheduled BNPL charging", description: "Instalments are driven by a cron job, keeping repayment independent of whether the customer is online." },
    ],
    challenges: [
      { title: "Two very different payment rails", description: "Cards and Mobile Money behave nothing alike. I modelled order state so both settle into the same consistent record — webhooks for Paystack, reference-matching plus WhatsApp confirmation for MoMo." },
      { title: "Extending credit safely", description: "BNPL meant building credit scoring, digital contracts and automated charging, and strictly gating all of it behind KYC — encoded as explicit states so the rule can't be bypassed." },
      { title: "Four portals, one codebase", description: "Keeping customer, admin, credit-officer and distributor auth cleanly separated took a disciplined shared-includes design and per-role guards." },
      { title: "Fast on cheap phones", description: "Targeting low-end Android WebViews ruled out heavy frameworks and pushed me toward server rendering, a PWA shell and lightweight progressive enhancement." },
    ],
    security: [
      "TOTP two-factor authentication on every portal (customer, admin, credit officer, distributor).",
      "CSRF protection on state-changing requests across the platform.",
      "KYC verification gates access to credit; identity documents are uploaded and reviewed before approval.",
      "Paystack webhooks are signature-verified before any order state changes.",
      "Passwords are hashed; each portal has its own secure password-reset and login-alert flow.",
      "An append-only audit log records sensitive actions for accountability.",
    ],
    results: [
      "A live e-commerce and FinTech platform (flayona.com) handling real orders, card and Mobile Money payments.",
      "A working BNPL engine with credit scoring, contracts and automated instalment charging.",
      "Four secure, role-separated portals running from a single, maintainable PHP codebase.",
      "The strongest evidence in my portfolio that I can build correctness- and security-critical software end to end.",
    ],
    lessons: [
      "Payment correctness comes from modelling state well — both rails must settle into the same consistent record.",
      "Constraints are clarifying: targeting low-end devices led to a leaner, faster architecture.",
      "Separating roles at both the auth and data layers prevents whole categories of access bugs.",
    ],
    future: [
      "Automated dunning and retries for missed BNPL instalments.",
      "A richer analytics dashboard for revenue, credit performance and defaults.",
      "Expanded automated test coverage around the payment and BNPL flows.",
    ],
    screenshots: [
      {
        alt: "Flayona storefront home delivering by region across Ghana",
        caption: "The mobile-first storefront, delivering by region across Ghana.",
        src: "/screenshots/flayona/storefront-home.png",
      },
      {
        alt: "Flayona checkout with delivery or pickup, paid by Mobile Money",
        caption: "Checkout — delivery or pickup, paid by Mobile Money against a PO reference.",
        src: "/screenshots/flayona/checkout.png",
      },
      {
        alt: "Flayona admin back office dashboard",
        caption: "The admin back office: revenue, profit, orders and MoMo reconciliation.",
        src: "/screenshots/flayona/admin-dashboard.png",
      },
      {
        alt: "Flayona distributor portal dashboard",
        caption: "A distributor's portal — regional pricing, stock and orders to action.",
        src: "/screenshots/flayona/distributor-dashboard.png",
      },
    ],
    stack: [
      { category: "Core", items: ["Vanilla PHP", "MySQL (mysqli)", "Server-rendered", "PWA + Service Worker"] },
      { category: "Payments", items: ["Paystack (card)", "Mobile Money", "Signed webhooks", "BNPL engine"] },
      { category: "Credit & identity", items: ["Credit scoring", "Digital contracts", "KYC upload", "Cron charging"] },
      { category: "Security", items: ["Per-role auth", "TOTP / 2FA", "CSRF", "Audit logging"] },
      { category: "Comms", items: ["WhatsApp API", "SMS / OTP", "Email / mailer"] },
      { category: "Platform", items: ["IONOS hosting", "Regional delivery", "Loyalty & reviews"] },
    ],
  },

  /* ================================================================ */
  /*  OPFIX (Cloud-Based Maintenance Management System)               */
  /* ================================================================ */
  {
    slug: "opfix",
    title: "OpFix",
    tagline:
      "A cloud-based Maintenance Management System — FastAPI, PostgreSQL and React with a multi-stage job workflow.",
    category: "Enterprise · Cloud · Full-Stack",
    year: "2025",
    role: "Full-Stack Engineer — Final-Year Project",
    timeline: "Dissertation project",
    status: "Production",
    featured: true,
    order: 2,
    accent: "#16a34a",
    summary:
      "OpFix is a cloud-based Maintenance Management System built as my BSc final-year project — a FastAPI + PostgreSQL backend and a React SPA, with role-based access, a multi-party job workflow state machine, audit logging, SLA tracking and reporting.",
    metrics: [
      { label: "Backend", value: "FastAPI" },
      { label: "Workflow", value: "State machine" },
      { label: "Deploy", value: "Render + Supabase" },
    ],
    primaryStack: ["FastAPI", "PostgreSQL", "React", "SQLAlchemy", "Render"],
    links: {
      live: "https://opfix.co.uk",
      github: "https://github.com/Kingsley-Marfo/Cloud-Based-MMS",
    },
    overview: [
      "OpFix is a cloud-based Maintenance Management System: stores raise maintenance jobs, admins triage them, contractors and engineers carry out the work, and an accounts office handles invoicing — all tracked through one auditable workflow.",
      "I built it as my BSc Computer Science final-year project and dissertation: a FastAPI backend over PostgreSQL with SQLAlchemy and Alembic, a React + Vite + Tailwind single-page app, JWT authentication with TOTP two-factor, a pytest suite, and a deployment on Render backed by Supabase Postgres.",
    ],
    problem: [
      "Maintenance work in a multi-site business passes through many hands — the store that reports a fault, the admin who approves it, the contractor and engineer who fix it, and the accounts team who get paid. Run that on phone calls and spreadsheets and jobs stall, accountability blurs, and there is no reliable record.",
      "OpFix needed to make the correct path the only path: a single system where every job moves through defined stages, every role sees exactly what it should, and every significant action is logged.",
    ],
    requirements: [
      "Role-based access for admins, engineers, clients/stores, contractors and accounts.",
      "A defined, enforced job workflow from report through completion to payment.",
      "Comments, file attachments and per-job history.",
      "Role-specific dashboards, KPIs and exportable reports.",
      "Secure authentication with JWT, hashed passwords and 2FA.",
      "A complete, tamper-evident audit trail.",
    ],
    research: [
      "Compared RBAC approaches and chose a role + permission model resolved server-side on every request.",
      "Designed the job lifecycle as an explicit state machine before writing endpoints, including the contractor and accounts stages.",
      "Evaluated hosting and settled on Render for compute with Supabase-managed PostgreSQL.",
    ],
    solution: [
      "A FastAPI backend organises the domain into models, Pydantic schemas, routers and a services layer, with dependencies for the database session, the current user and role requirements.",
      "Every maintenance job is driven by an explicit status enum — from NEW → ASSIGNED → IN_PROGRESS → ON_HOLD → COMPLETED/CANCELLED, extended with the full contractor-and-accounts flow (approval, sent-to-contractor, engineer-on-site, confirmed-by-store, sent-to-accounts, queried, paid) and post-completion states like reopened, recalled and reassigned.",
      "Access is governed by roles and permissions checked in FastAPI dependencies, and new users go through an approval step before they can act. Sensitive changes write to an `audit_logs` table.",
      "A React SPA consumes the API, holding the JWT in context and rendering role-specific dashboards, job boards, comments and exports.",
    ],
    architecture: {
      description: [
        "The backend is a FastAPI application factory with CORS and modular routers. Business logic lives in a services layer (auth, jobs, users, audit), data access goes through SQLAlchemy models, and requests are shaped by Pydantic schemas. Alembic manages migrations.",
        "Authentication issues JWTs; a `require_role` dependency resolves the caller's role and permissions on every protected route, and a `get_current_user` dependency loads the account. TOTP provides two-factor auth, and real-time updates are pushed over WebSockets.",
        "The frontend is a React + Vite + Tailwind SPA that keeps the JWT in an auth context and calls the API through typed axios wrappers. The whole system is deployed on Render with Supabase-managed PostgreSQL.",
      ],
      diagram: `flowchart TB
    UI["React + Vite SPA<br/>(JWT in context)"] -->|axios| API["FastAPI app"]
    API --> DEPS["Dependencies<br/>get_current_user · require_role"]
    DEPS --> SVC["Services<br/>(auth · jobs · users · audit)"]
    SVC --> ORM["SQLAlchemy models"]
    ORM --> PG[("PostgreSQL (Supabase)")]
    SVC --> AUDIT["audit_logs"]
    API --> WS["WebSocket notifications"]
    API --> EXP["Exports (Excel · PDF)"]
    ALEMBIC["Alembic migrations"] --> PG`,
    },
    database: {
      description: [
        "A user has a role and belongs to an organisational structure (company, store, contractor department, region) and can report to another user. Maintenance jobs carry a priority and a status, and accumulate assignments, comments, attachments and activity. Audit events reference the acting user and the affected job.",
        "Roles and permissions are first-class tables, so access rules are data rather than scattered conditionals — and jobs, users and most entities support soft deletion for a recoverable history.",
      ],
      diagram: `erDiagram
    ROLE ||--o{ USER : grants
    USER ||--o{ MAINTENANCE_JOB : reports
    USER ||--o{ JOB_ASSIGNMENT : assigned
    MAINTENANCE_JOB ||--o{ JOB_ASSIGNMENT : has
    MAINTENANCE_JOB ||--o{ JOB_COMMENT : has
    MAINTENANCE_JOB ||--o{ ATTACHMENT : has
    USER ||--o{ AUDIT_LOG : performs
    MAINTENANCE_JOB ||--o{ AUDIT_LOG : concerns
    ROLE {
      int id PK
      string name
    }
    USER {
      int id PK
      int role_id FK
      int reports_to_user_id FK
      bool is_approved
      bool totp_enabled
    }
    MAINTENANCE_JOB {
      int id PK
      int reported_by FK
      enum priority
      enum status
    }
    JOB_ASSIGNMENT {
      int id PK
      int job_id FK
      int engineer_id FK
    }`,
    },
    features: [
      { title: "Role-based access control", description: "Admin, Engineer, Client/store, contractor and accounts roles, enforced server-side via FastAPI dependencies." },
      { title: "Multi-stage job workflow", description: "An explicit state machine spanning report, approval, contractor, engineer, store confirmation and accounts." },
      { title: "Priorities & SLAs", description: "Jobs carry LOW/MEDIUM/HIGH/CRITICAL priority with SLA configuration and tracking." },
      { title: "Comments & attachments", description: "Per-job comments and file uploads (JPEG/PNG/PDF/DOCX, up to 5 MB), with internal engineer notes." },
      { title: "Dashboards & KPIs", description: "Role-specific dashboards with totals, status breakdowns and per-engineer performance." },
      { title: "Audit logging", description: "Every significant action is recorded in an append-only audit_logs table." },
      { title: "JWT auth + 2FA", description: "Token-based auth with bcrypt hashing, TOTP two-factor, and a user-approval step before access." },
      { title: "Exports & reporting", description: "Excel and PDF exports plus scheduled reports for management." },
      { title: "Real-time notifications", description: "WebSocket-pushed updates so job changes surface immediately." },
    ],
    implementation: [
      { title: "Explicit state machine", description: "The job status enum encodes every valid stage — including the contractor and accounts flow and recall/reopen — so invalid transitions can't happen." },
      { title: "Permissions as data", description: "Roles and permissions are database tables resolved in a require_role dependency, not conditionals sprinkled through routes." },
      { title: "Layered FastAPI structure", description: "Models, Pydantic schemas, routers and a services layer keep business logic testable and separate from transport." },
      { title: "Migrations & tests", description: "Alembic manages schema evolution and a pytest suite covers the core auth and job logic." },
      { title: "Managed cloud deploy", description: "Deployed on Render with Supabase-managed PostgreSQL for a low-ops production setup." },
    ],
    challenges: [
      { title: "Modelling a multi-party workflow", description: "The real process crosses stores, admins, contractors, engineers and accounts. Encoding it as one explicit status enum — with a query-and-resubmit loop for invoices — turned a tangle of edge cases into defined transitions." },
      { title: "Getting RBAC right", description: "With several roles and an org hierarchy, I moved permission checks into FastAPI dependencies backed by role/permission tables, so authorisation is consistent and central." },
      { title: "Auditability without clutter", description: "Writing audit events on the same path as the changes they describe kept the trail complete without scattering logging calls everywhere." },
    ],
    security: [
      "JWT authentication with bcrypt-hashed passwords and TOTP two-factor.",
      "A user-approval workflow so new accounts can't act until approved.",
      "Server-side role and permission checks on every protected route.",
      "Append-only audit logging of significant actions.",
      "File uploads constrained by type and size (JPEG/PNG/PDF/DOCX, 5 MB).",
      "Soft deletes to preserve a recoverable, tamper-evident history.",
    ],
    results: [
      "A complete, deployed Maintenance Management System delivered as a final-year dissertation project.",
      "A rigorous RBAC model and an explicit multi-party job workflow that eliminates invalid states.",
      "A production cloud deployment on Render + Supabase, backed by migrations and an automated test suite.",
      "Open source on GitHub as a demonstrable, end-to-end full-stack build.",
    ],
    lessons: [
      "An explicit state machine is the single highest-leverage decision in a workflow system.",
      "Treating permissions as data keeps authorisation consistent as roles multiply.",
      "A layered backend (models · schemas · services · routers) pays off the moment you start testing.",
    ],
    future: [
      "A configurable workflow builder so admins can adjust stages without code.",
      "Deeper analytics and SLA-breach alerting on top of the activity history.",
      "Mobile-optimised engineer views for on-site updates.",
    ],
    screenshots: [
      {
        alt: "OpFix regional manager reporting dashboard",
        caption: "Regional-manager reporting: jobs by priority, store breakdown and contractor completion rates.",
        src: "/screenshots/opfix/reporting-dashboard.png",
      },
      {
        alt: "OpFix store manager job detail with recall workflow",
        caption: "A store-manager job detail — converted from a quote, with purchase order and post-completion recall.",
        src: "/screenshots/opfix/job-detail.png",
      },
      {
        alt: "OpFix two-factor authentication settings",
        caption: "TOTP two-factor authentication in the security settings — one layer of the auth model.",
        src: "/screenshots/opfix/two-factor-auth.png",
      },
      {
        alt: "OpFix accounts finance reports with CSV, Excel and PDF export",
        caption: "The accounts office finance reports, with CSV / Excel / PDF export.",
        src: "/screenshots/opfix/finance-reports.png",
      },
    ],
    stack: [
      { category: "Backend", items: ["FastAPI", "SQLAlchemy", "Alembic", "Pydantic", "python-jose (JWT)"] },
      { category: "Frontend", items: ["React", "Vite", "Tailwind CSS", "Axios", "Auth context"] },
      { category: "Data", items: ["PostgreSQL", "Supabase", "Migrations", "Soft deletes"] },
      { category: "Security", items: ["JWT + bcrypt", "TOTP / 2FA", "RBAC", "Audit logging"] },
      { category: "Quality", items: ["pytest", "Excel/PDF exports", "WebSocket notifications"] },
      { category: "Platform", items: ["Render", "CI", "Git / GitHub"] },
    ],
  },

  /* ================================================================ */
  /*  JULLI JETS                                                       */
  /* ================================================================ */
  {
    slug: "julli-jets",
    title: "Julli Jets",
    tagline:
      "A commercial private-charter website on WordPress/Elementor, built with a custom PHP page-generation engine.",
    category: "Client · WordPress · Web",
    year: "2024",
    role: "Freelance Web Developer",
    timeline: "Ongoing",
    status: "Client project",
    featured: true,
    order: 3,
    accent: "#ca8a04",
    summary:
      "A live, commercial private jet, helicopter and yacht charter website (jullijets.co.uk) — built and maintained on WordPress/Elementor through a custom two-layer PHP system that generates the page layouts programmatically.",
    metrics: [
      { label: "Client", value: "Live site" },
      { label: "Platform", value: "WordPress" },
      { label: "Approach", value: "Code-gen builder" },
    ],
    primaryStack: ["WordPress", "Elementor", "PHP", "JavaScript"],
    links: { live: "https://jullijets.co.uk" },
    overview: [
      "Julli Jets is a commercial charter company offering private jets, helicopters and yachts. I built and maintain their website (jullijets.co.uk) on WordPress and Elementor — but not by clicking around a page builder.",
      "Instead I wrote a custom two-layer PHP system that generates the Elementor page layouts programmatically. Every page is composed from reusable section and widget builders, which makes the design consistent, versionable and fast to rebuild.",
    ],
    problem: [
      "A charter brand needs a site that feels premium and loads well, with many pages (jets, helicopter, yacht, empty legs, charter request, contact, FAQs and more) that share a consistent design language.",
      "Editing that many pages by hand in a visual builder is slow and drifts out of sync. The client also needed real functionality — an empty-legs listing and a charter-request booking flow — not just brochure pages.",
    ],
    requirements: [
      "A premium, responsive design across a large set of pages.",
      "A consistent, maintainable design system rather than hand-tweaked pages.",
      "An empty-legs listing and a charter-request booking form.",
      "Deployment to the client's managed hosting.",
    ],
    solution: [
      "I built a PHP library of design tokens, widget builders (containers, headings, buttons, images) and section builders (hero, feature rows, stats strips, service and destination cards, CTA banners). Page scripts compose these into a layout and write it to Elementor as validated JSON.",
      "Shared chrome — the fixed header, drawer navigation, footer and global CSS — lives in a must-use plugin, and a custom booking engine provides the empty-legs post type and the charter-request form.",
      "The result is a site whose look is defined in code: change a design token and every page inherits it, then re-run the generator.",
    ],
    architecture: {
      description: [
        "Everything routes through a shared PHP library that exposes design tokens as constants and a set of composable widget and section builders returning the exact element shape Elementor expects. Page scripts stay flat: look up the page, build an array of sections, and save.",
        "Global chrome and CSS live in a must-use plugin loaded on every request, and a separate custom plugin provides the empty-legs content type and the booking form. The generated pages reference that shared design system.",
        "Deployment is to IONOS-style managed hosting — scripts are uploaded over SSH and run on the server, which bootstraps WordPress and writes the page data.",
      ],
      diagram: `flowchart LR
    LIB["PHP builder library<br/>(tokens · widgets · sections)"] --> GEN["Page scripts"]
    GEN -->|validated JSON| WP[("WordPress DB<br/>_elementor_data")]
    MU["mu-plugin<br/>(header · footer · global CSS)"] --> SITE["Rendered site"]
    BOOK["Booking engine plugin<br/>(empty legs · charter form)"] --> SITE
    WP --> SITE
    V["Visitor"] --> SITE`,
    },
    features: [
      { title: "Programmatic page builder", description: "Reusable PHP section and widget builders generate Elementor layouts as validated JSON." },
      { title: "Code-defined design system", description: "Design tokens as constants keep colour, type and spacing consistent across every page." },
      { title: "Empty-legs listing", description: "A custom post type surfaces discounted empty-leg flights." },
      { title: "Charter-request booking", description: "A booking form captures charter enquiries directly from the site." },
      { title: "Premium responsive design", description: "A polished, mobile-friendly layout fitting a luxury charter brand." },
    ],
    implementation: [
      { title: "Builders over hand-editing", description: "Pages are composed from vetted helper functions, so the fragile Elementor JSON structure is generated correctly every time." },
      { title: "Single source for design", description: "Colours and styles are defined once as tokens and referenced everywhere, preventing drift." },
      { title: "Separation of chrome and content", description: "Header, footer and global CSS live in a must-use plugin, independent of the generated page content." },
      { title: "Server-side deployment", description: "Scripts are uploaded and executed on the host, bootstrapping WordPress to write page data and flush caches." },
    ],
    challenges: [
      { title: "Taming Elementor's data model", description: "Elementor pages are deeply nested JSON that breaks silently on a missing id or unescaped character. Wrapping saves in a validated helper made generation reliable." },
      { title: "Keeping design in sync", description: "With many pages, hand-editing caused drift. Moving the design into code-level tokens and builders made the whole site consistent and quick to update." },
      { title: "Working within managed hosting", description: "No modern deploy pipeline — just SSH and the server's own WordPress. I built the workflow around uploading and running scripts, then flushing Elementor caches." },
    ],
    results: [
      "A live, premium charter website the client uses as their primary presence.",
      "A maintainable, code-defined design system that makes site-wide changes fast.",
      "Real functionality — empty-legs listings and charter requests — beyond static pages.",
    ],
    lessons: [
      "Generating a design system in code beats hand-editing a visual builder at scale.",
      "A luxury brand lives or dies on consistency — tokens enforce it.",
      "Even constrained hosting can support a disciplined, repeatable workflow.",
    ],
    future: [
      "A lightweight editing layer so the client can tweak copy without touching scripts.",
      "Expanded booking and payment integration for direct charter requests.",
    ],
    screenshots: [
      { alt: "Julli Jets homepage hero", caption: "The charter homepage on desktop." },
      { alt: "Julli Jets empty legs listing", caption: "The empty-legs listing." },
      { alt: "Julli Jets charter request form", caption: "The charter-request booking flow." },
    ],
    stack: [
      { category: "Platform", items: ["WordPress", "Elementor", "mu-plugins", "Custom booking plugin"] },
      { category: "Engineering", items: ["PHP page generator", "Design tokens", "Section builders", "Vanilla JS"] },
      { category: "Delivery", items: ["IONOS hosting", "SSH deploy", "Responsive design"] },
    ],
  },

  /* ================================================================ */
  /*  RECIPE MANAGEMENT SYSTEM                                         */
  /* ================================================================ */
  {
    slug: "recipe-management-system",
    title: "Recipe Management System",
    tagline:
      "“Jollof” — a Ghanaian recipe web app in PHP & MySQL, with a public site, a secure admin CRUD area and AJAX live-search.",
    category: "Full-Stack · Academic",
    year: "2025",
    role: "Software Engineer",
    timeline: "University module",
    status: "Academic",
    featured: false,
    order: 4,
    accent: "#ea580c",
    summary:
      "A full-stack recipe web app (“Jollof”) celebrating traditional Ghanaian dishes — a public browsing site plus a secure admin area with full CRUD, AJAX live-search, image uploads and soft deletes, built in vanilla PHP and MySQL with prepared statements throughout.",
    metrics: [
      { label: "Stack", value: "PHP · MySQL" },
      { label: "Search", value: "AJAX live" },
      { label: "Security", value: "Prepared stmts" },
    ],
    primaryStack: ["PHP", "MySQL", "JavaScript", "AJAX"],
    links: { live: "https://stu140757.webhosting.arden.ac.uk/COM6011D/index.php" },
    overview: [
      "“Jollof” is a full-stack web app celebrating traditional Ghanaian food — from Jollof rice to Kelewele — built in vanilla PHP and MySQL for Arden University's Web Application Development module.",
      "It pairs a clean public site (home, recipes, search, about) with a secure administrative area behind a login. The admin can create, read, update and delete recipes with full CRUD, and it's where I focused on doing the fundamentals properly: prepared statements everywhere, validated inputs and uploads, soft deletes, and an AJAX live-search that filters without a page reload.",
    ],
    problem: [
      "The brief was to build a database-backed web application with a public interface and a secured admin interface offering full CRUD — and to do it with genuine attention to security and code quality, not just a working demo.",
      "The content itself needed a clear model: recipes with a category, a description, step-by-step instructions, prep and cook times, a difficulty and an image.",
    ],
    requirements: [
      "A public site to browse, view and search recipes.",
      "A secure, authenticated admin area with full CRUD.",
      "A relational MySQL schema behind it.",
      "Safe data handling — prepared statements, input validation, safe uploads.",
      "A responsive, accessible interface.",
    ],
    solution: [
      "The public site presents a featured dish, category browsing and search over a catalogue of Ghanaian recipes. The admin area, gated by a hashed-password login, provides the full create/read/update/delete lifecycle over recipes.",
      "Every database interaction uses prepared statements to separate SQL from user input, inputs are validated and sanitised, and uploaded images are checked for type and size before being stored. Deletes are soft — recipes move to a Trash and can be restored — and the edit form shows a live preview as you type.",
      "The standout admin feature is an asynchronous live-search in “Manage Recipes”: JavaScript + AJAX call the PHP backend to filter the table dynamically, with no full page reload.",
    ],
    architecture: {
      description: [
        "A server-rendered PHP application over MySQL. Shared includes handle configuration, the admin session/auth guard, and image upload; page scripts render the public pages and the admin CRUD flows. The live-search endpoint returns filtered results to the browser over AJAX.",
        "Security is applied at the data boundary — prepared statements for every query, validation and sanitisation on input, and type/size checks on uploads — rather than bolted on afterwards.",
      ],
      diagram: `flowchart LR
    V["Visitor"] --> PUB["Public site<br/>(home · recipes · search)"]
    A["Admin"] --> AUTH["Login guard"]
    AUTH --> ADMIN["Admin CRUD<br/>(add · edit · trash)"]
    ADMIN -->|AJAX live-search| SEARCH["search endpoint"]
    PUB --> DB[("MySQL<br/>prepared statements")]
    ADMIN --> DB
    SEARCH --> DB
    ADMIN --> UP["Image upload<br/>(type + size checks)"]`,
    },
    database: {
      description: [
        "A recipe belongs to a category and carries a title, short description, instructions, prep and cook times, a difficulty and an image path. A soft-delete timestamp preserves removed recipes for restore, and admin users authenticate against a hashed password. Ingredients are modelled relationally through a junction table.",
      ],
      diagram: `erDiagram
    CATEGORY ||--o{ RECIPE : groups
    RECIPE ||--o{ RECIPE_INGREDIENT : uses
    INGREDIENT ||--o{ RECIPE_INGREDIENT : in
    ADMIN_USER {
      int id PK
      string username
      string password_hash
    }
    CATEGORY {
      int id PK
      string name
    }
    RECIPE {
      int id PK
      int category_id FK
      string title
      int prep_time
      int cook_time
      string difficulty
      datetime deleted_at
    }
    RECIPE_INGREDIENT {
      int recipe_id FK
      int ingredient_id FK
      string quantity
    }`,
    },
    features: [
      { title: "Public recipe site", description: "Home, category browsing, search and recipe detail for traditional Ghanaian dishes." },
      { title: "Secure admin CRUD", description: "A hashed-password login gates full create, read, update and delete over recipes." },
      { title: "AJAX live-search", description: "The admin's Manage Recipes list filters dynamically via JavaScript + AJAX, with no page reload." },
      { title: "Prepared statements", description: "Every query uses prepared statements, separating SQL logic from user input to prevent injection." },
      { title: "Safe image uploads", description: "Uploaded images are validated for file type and size before being stored." },
      { title: "Soft deletes & trash", description: "Removed recipes move to a Trash and can be restored, rather than being destroyed." },
      { title: "Live preview on edit", description: "The edit form previews the recipe card live as fields change." },
    ],
    implementation: [
      { title: "Prepared statements everywhere", description: "All database access is parameterised, keeping SQL logic separate from user input." },
      { title: "AJAX over the PHP backend", description: "The live-search fetches filtered results asynchronously, demonstrating JS + AJAX + PHP working together." },
      { title: "Soft delete over hard delete", description: "Deleting sets a timestamp and moves the recipe to Trash, so it stays recoverable." },
      { title: "Validated uploads", description: "Image uploads are checked for type and size before being written to the server." },
    ],
    challenges: [
      { title: "Building the live-search", description: "Wiring JavaScript, AJAX and the PHP backend so the table filters smoothly without a reload took careful handling of requests and rendering." },
      { title: "Safe input and uploads", description: "Applying prepared statements, validation/sanitisation and upload checks consistently was the security discipline the module rewarded." },
    ],
    results: [
      "A working, deployed recipe web app with a polished public site and a full admin CRUD area.",
      "Security fundamentals applied properly — prepared statements, validation and safe uploads throughout.",
      "A demonstrable grasp of JavaScript, AJAX and PHP working together in the live-search.",
    ],
    lessons: [
      "Prepared statements and input validation are the baseline for any database-backed app — not an afterthought.",
      "A small async touch like live-search noticeably improves how responsive an admin tool feels.",
    ],
    future: [
      "Tagging and richer public search and filtering.",
      "User accounts so visitors can save favourite recipes.",
    ],
    screenshots: [
      {
        alt: "Jollof recipe app public home page",
        caption: "The public home — “Taste the Best of Ghana”, with search and a featured dish.",
        src: "/screenshots/recipe/home.png",
      },
      {
        alt: "Admin Manage Recipes CRUD table with live-search",
        caption: "The admin Manage Recipes area — CRUD table with AJAX live-search.",
        src: "/screenshots/recipe/admin-manage.png",
      },
      {
        alt: "Admin edit recipe form with live preview",
        caption: "The edit form, with a live preview and validated image upload.",
        src: "/screenshots/recipe/edit-recipe.png",
      },
    ],
    stack: [
      { category: "Core", items: ["Vanilla PHP", "MySQL", "Server-rendered"] },
      { category: "Frontend", items: ["JavaScript", "AJAX live-search", "Responsive UI"] },
      { category: "Data", items: ["Normalised schema", "Soft deletes", "Image paths"] },
      { category: "Security", items: ["Prepared statements", "Input validation", "Safe uploads", "Admin auth"] },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects
  .filter((p) => p.featured)
  .sort((a, b) => a.order - b.order);

export const allProjectsSorted = [...projects].sort((a, b) => a.order - b.order);
