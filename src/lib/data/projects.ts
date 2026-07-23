export type StackGroup = { category: string; items: string[] };
export type Feature = { title: string; description: string };
export type NamedBlock = { title: string; description: string };
export type Screenshot = { alt: string; caption: string; src?: string };

/** Concrete, scannable proof of contribution — shown prominently on every case study. */
export type ProofPoints = {
  role: string; // what I actually was on this project
  scope: string; // what I built, concretely
  depth: string; // the engineering depth involved
};

/**
 * Classification drives what's shown for each project:
 *  - "Client Project"                — commercial work for a client. Never
 *    link source code; only features, technologies and engineering
 *    contribution are shown.
 *  - "Commercial Development Planned" — a project (currently OpFix) intended
 *    for future commercialisation. No public source link.
 *  - "Public Engineering Showcase"    — the one project where a public
 *    repository is appropriate once it exists.
 */
export type ProjectStatus =
  | "Client Project"
  | "Commercial Development Planned"
  | "Public Engineering Showcase";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  role: string;
  timeline: string;
  status: ProjectStatus;
  cardLabel?: string; // shorter status label for the compact card, if different
  featured: boolean;
  order: number;
  accent: string;
  summary: string;
  proofPoints: ProofPoints;
  metrics: { label: string; value: string }[];
  primaryStack: string[];
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
  /*  FLAYONA — Client Project (confidential), flagship case study     */
  /* ================================================================ */
  {
    slug: "flayona",
    title: "Flayona",
    tagline:
      "Marketplace backend, payment integration and BNPL lending for a commercial e-commerce client — distributor pricing, Paystack, Mobile Money, KYC.",
    category: "FinTech · E-commerce · Client Project",
    year: "2025",
    role: "Freelance Software Developer (Contract)",
    timeline: "2025 — Present",
    status: "Client Project",
    featured: true,
    order: 1,
    accent: "#e11d48",
    summary:
      "Built the marketplace backend, payment integration, inventory model and admin workflows for a commercial e-commerce client. Designed distributor-specific pricing, variant-level stock tracking, Paystack payment flows, Mobile Money and WhatsApp notifications, and KYC-backed BNPL lending — delivered end to end under contract.",
    proofPoints: {
      role: "Engaged directly by the client as the backend-focused full-stack developer; I own the platform's architecture, data model and production deployment.",
      scope: "Built the distributor-pricing engine, the BNPL lending system (KYC → credit decision → instalments), Paystack + Mobile Money payment flows, and four separate authenticated portals (customer, admin, credit officer, distributor).",
      depth: "Auth (RBAC, TOTP 2FA, account lockout), payment webhooks (Paystack HMAC-SHA512, idempotent reconciliation), relational schema design (30+ tables), audit logging, and a PWA build tuned for low-end Android on patchy connections.",
    },
    metrics: [
      { label: "Portals", value: "4 authenticated roles" },
      { label: "Payments", value: "Paystack + Mobile Money" },
      { label: "Lending", value: "BNPL, 1–24 month terms" },
    ],
    primaryStack: ["PHP", "MySQL", "Paystack API", "WhatsApp Cloud API"],
    links: { live: "https://flayona.com" },
    overview: [
      "Flayona is a multi-vendor e-commerce and FinTech platform I built under contract for a commercial client — a retail marketplace offering everyday products, imported goods and wholesale deals, sold at region-specific prices and paid for via card or Mobile Money. Because it handles real money and extends real credit, correctness and security were the design constraint from day one, not an afterthought.",
      "This is client-confidential work: source code and internal business logic aren't published, but the architecture and database shape below reflect the real system at a level appropriate to share publicly — what follows is my engineering contribution, not a marketing description.",
    ],
    problem: [
      "The client needed a platform where independent distributors could sell the same catalogue at different, region-specific prices, accept payment the way customers actually pay locally (Mobile Money as much as cards), and extend short-term credit without taking on undue default risk.",
      "That meant solving three hard problems at once: payment reconciliation that never double-counts across two very different payment rails, an identity-verified lending flow that doesn't gate honest customers unnecessarily, and account security robust enough for four different types of user — customers, distributors, admin staff and credit officers — sharing one platform.",
    ],
    requirements: [
      "Distributor-specific pricing and variant-level inventory per region.",
      "Card payments (Paystack) and Mobile Money, reconciled reliably under retry.",
      "A configurable Buy-Now-Pay-Later lending product with KYC-gated approval.",
      "Four separate, securely authenticated user types with no privilege overlap.",
      "Secure handling of identity documents submitted for KYC.",
      "Fast, installable performance on low-end Android over patchy connections.",
    ],
    research: [
      "Studied Paystack's payment and webhook lifecycle to design reconciliation that survives retries and out-of-order delivery.",
      "Mapped the Mobile Money flow used locally, where the order/PO number becomes the payment reference and is confirmed over WhatsApp.",
      "Applied the OWASP Top 10 directly to authentication, CSRF and access control across all four portals rather than as a generic checklist.",
    ],
    solution: [
      "I designed and deployed the platform in vanilla PHP and MySQL, delivering the full lifecycle from requirements gathering and database modelling through architecture, production deployment, scheduled processing and post-launch support — a deliberate tradeoff: no framework, no build step, chosen so the client's own team could host and maintain it cheaply on standard shared hosting, at the cost of writing more plumbing by hand.",
      "Pricing is distributor-driven: a master catalogue holds a reference price and the admin's private cost, while the price a customer actually pays is set by the distributor serving their region — so the same SKU can be priced differently across the country without duplicating the catalogue.",
      "The BNPL engine runs an internal credit score, generates a digital contract and an instalment schedule (1–24 months, 0–22% flat interest, capped non-compounding late fees), and a scheduled cron job charges instalments automatically as they fall due — all gated behind KYC verification.",
      "Paystack card payments and Mobile Money are both integrated. Standard orders settle out-of-band via Mobile Money and WhatsApp confirmation; pre-order deposits go through a Paystack webhook verified with HMAC-SHA512 and processed idempotently, so a retried or duplicate event can never double-apply.",
      "Four secure authentication domains — customers, distributors, administrators and Credit Officers — each carry TOTP two-factor authentication, account lockout, passwordless OTP and role-based access control, so a compromised customer session can never reach admin or distributor tooling.",
    ],
    architecture: {
      description: [
        "Flayona is a server-rendered PHP application over MySQL (mysqli), installed as a PWA. Cross-cutting concerns — authentication guards per role, CSRF, payments, KYC upload, credit logic and audit logging — live in a shared library so every page composes the same vetted building blocks rather than reimplementing security per route.",
        "Four separate portals sit behind their own auth guards: the customer storefront, the admin back office, the credit-officer portal that reviews BNPL applications, and the distributor portal with its own point-of-sale, stock and orders.",
        "Payment is asynchronous by design: standard orders resolve out-of-band via Mobile Money and WhatsApp confirmation, pre-order deposits go through a signature-verified Paystack webhook, and a cron job drives automated BNPL instalment charging independently of any user session — so a customer closing their browser mid-checkout can never leave the order in an ambiguous state.",
      ],
      diagram: `flowchart TB
    C["Customer (PWA)"] --> APP["Server-rendered PHP<br/>+ shared auth/security layer"]
    ADM["Admin"] --> APP
    CO["Credit Officer"] --> APP
    DIST["Distributor (POS)"] --> APP
    APP --> AUTH["Per-role auth guards<br/>+ CSRF + TOTP 2FA"]
    AUTH --> DB[("MySQL")]
    APP --> AUDIT["Audit log"]
    APP --> MOMO["Mobile Money<br/>(PO ref · WhatsApp confirm)"]
    APP --> PAY["Paystack<br/>(pre-order deposits)"]
    PAY --> WH["HMAC-SHA512 verified webhook<br/>idempotent reconciliation"]
    WH --> DB
    DIST --> PRICE["Region pricing + stock"]
    PRICE --> DB
    CRON["Cron: BNPL charging"] --> BNPL["BNPL + credit score"]
    BNPL --> DB`,
    },
    database: {
      description: [
        "The schema (30+ tables in production) is organised around commerce and credit. A master products table carries a reference price and the admin's private cost, while a distributor_products table sets the region-specific price and distributor_variant_stock tracks stock per distributor — the mechanism that makes distributor-specific pricing possible without duplicating the catalogue.",
        "Orders link to order_payments (card or Mobile Money), and BNPL orders additionally link to a KYC application, a credit score and a schedule of instalments. Roles are separated at the data layer too — admins, credit officers and distributors are distinct account types with their own credentials and TOTP secrets.",
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
      { title: "Distributor-specific pricing", description: "Region-based fulfilment with per-distributor pricing and variant-level inventory, so the same catalogue is priced differently by region without duplication." },
      { title: "Configurable BNPL lending", description: "1–24 month terms, tiered flat-interest pricing (0–22%), automated instalments, capped non-compounding late fees, gated behind KYC." },
      { title: "Paystack + Mobile Money", description: "Card and Mobile Money payments; card flows reconciled via HMAC-SHA512-verified, idempotent webhooks." },
      { title: "Four secure authentication domains", description: "Customers, distributors, admins and Credit Officers — each with TOTP 2FA, account lockout and passwordless OTP." },
      { title: "KYC document handling", description: "Identity documents stored privately behind ownership-checked, authenticated access." },
      { title: "Distributor POS & stock", description: "Distributors run point-of-sale, manage stock and fulfil orders from their own portal." },
      { title: "Loyalty, promotions & internal credit scoring", description: "Configurable loyalty, membership, pre-order, professional-discount and internal credit-scoring capabilities." },
      { title: "Audit logging across every portal", description: "An append-only audit trail records sensitive actions across all four authentication domains." },
    ],
    implementation: [
      { title: "Framework-free by deliberate tradeoff", description: "Vanilla PHP and MySQL with no framework or build step — a conscious choice prioritising the client's ability to host and maintain the platform cheaply over developer convenience." },
      { title: "Full lifecycle ownership", description: "Requirements gathering, database modelling, architecture, production deployment, scheduled processing and post-launch support, delivered end to end for the client." },
      { title: "Idempotent, race-safe payments", description: "Webhook processing keys off signature verification and idempotency so retries and concurrent events can't double-apply." },
      { title: "KYC-gated credit", description: "BNPL approval is strictly gated behind identity verification, encoded so the rule can't be bypassed by any code path." },
    ],
    challenges: [
      { title: "Reconciling two payment rails", description: "Card and Mobile Money behave differently under retry and failure. HMAC-verified, idempotent webhook handling for Paystack, and PO-reference matching plus WhatsApp confirmation for Mobile Money, keep both settling into one consistent order record." },
      { title: "Securing four account types on one platform", description: "Customers, distributors, admins and credit officers each needed strong, independent authentication — TOTP 2FA, lockout and OTP applied consistently across all four, so a bug in one portal's auth can't leak into another's." },
      { title: "Hosting constraints vs. engineering ambition", description: "The client's budget ruled out managed cloud infrastructure. Choosing vanilla PHP over a framework, and MySQL over a managed Postgres service, was a direct tradeoff to fit that constraint without compromising on security fundamentals." },
    ],
    security: [
      "TOTP two-factor authentication and account lockout across all four authentication domains.",
      "HMAC-SHA512 webhook signature verification before any payment state changes.",
      "Idempotent, race-safe transaction reconciliation.",
      "Private, ownership-checked storage for KYC documents.",
      "CSRF protection and role-based access control throughout.",
    ],
    results: [
      "A production platform deployed and operating for a commercial client, handling real payments across two rails.",
      "A working BNPL product with configurable terms, automated instalments and KYC-gated approval, running unattended via scheduled processing.",
      "Four independently secured account types running from one maintained codebase with no privilege leakage between roles.",
    ],
    lessons: [
      "Payment correctness comes from modelling state precisely — idempotency and signature verification aren't optional extras once real money is involved.",
      "Separating auth domains cleanly at the start avoids cross-role access bugs later; retrofitting that separation is much harder.",
      "A client's hosting budget is a real design constraint, not a footnote — it shapes stack choices as much as functional requirements do.",
    ],
    future: [
      "This is ongoing client work; further features are scoped directly with the client as the platform grows.",
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
        caption: "The admin back office: revenue, profit, orders and payment reconciliation.",
        src: "/screenshots/flayona/admin-dashboard.png",
      },
      {
        alt: "Flayona distributor portal dashboard",
        caption: "A distributor's portal — regional pricing, stock and orders to action.",
        src: "/screenshots/flayona/distributor-dashboard.png",
      },
    ],
    stack: [
      { category: "Core", items: ["PHP", "MySQL", "mysqli", "Prepared statements", "PWA"] },
      { category: "Payments", items: ["Paystack API", "Mobile Money", "HMAC-SHA512 webhooks", "Idempotent processing"] },
      { category: "Security", items: ["TOTP 2FA", "Account lockout", "Passwordless OTP", "RBAC", "CSRF"] },
      { category: "Comms", items: ["WhatsApp Cloud API", "SMS", "SMTP"] },
      { category: "Hosting", items: ["Apache", "IONOS hosting", "HTTPS / SSL/TLS"] },
    ],
  },

  /* ================================================================ */
  /*  OPFIX — Commercial Development Planned                           */
  /* ================================================================ */
  {
    slug: "opfix",
    title: "OpFix",
    tagline:
      "A secure enterprise maintenance management platform — originally my BSc Final Year Project, now being prepared for future commercialisation.",
    category: "Enterprise · Final Year Project",
    year: "2026",
    role: "Full-Stack Developer — Final Year Project",
    timeline: "Final year, BSc Computer Science (2023–2026)",
    status: "Commercial Development Planned",
    cardLabel: "Final Year Project",
    featured: true,
    order: 2,
    accent: "#16a34a",
    summary:
      "Built solo, end to end, as my BSc Computer Science final-year project: a secure enterprise maintenance management platform with six organisational roles, a three-tier approval workflow, and a FastAPI + PostgreSQL backend behind a React SPA. Now being prepared for future commercialisation.",
    proofPoints: {
      role: "Sole developer — designed, built, tested and deployed the entire platform independently as my final-year project.",
      scope: "Built six-role access control, a three-tier priority approval workflow (immediate/48-hour/one-week), relational modelling for organisations/jobs/quotes/approvals, and role-specific dashboards and reporting.",
      depth: "FastAPI + PostgreSQL backend with role-based access control, audit logging with soft-delete/restore, and an accessibility remediation pass reaching a self-assessed ~97–99 Lighthouse score across every role.",
    },
    metrics: [
      { label: "Status", value: "Commercial development planned" },
      { label: "Roles", value: "6 organisational" },
      { label: "Accessibility", value: "~97–99 Lighthouse*" },
    ],
    primaryStack: ["FastAPI", "PostgreSQL", "React", "Vite", "Supabase"],
    links: { live: "https://opfix.co.uk" },
    overview: [
      "OpFix started as my BSc Computer Science Final Year Project: a secure enterprise maintenance management platform where stores raise maintenance jobs, regional managers and admins triage and approve them, engineers and contractors carry out the work, and accounts handle payment — all tracked through one auditable system. It's now being prepared for future commercialisation.",
      "Because commercialisation is planned, the source repository is private. This case study describes the engineering decisions and verified outcomes at the level appropriate for a public write-up, rather than internal implementation details.",
    ],
    problem: [
      "Maintenance work across multiple sites and stakeholders — stores, regional managers, contractors, engineers, accounts — is hard to track reliably on phone calls and spreadsheets. Jobs stall, accountability blurs, and there's no dependable record of what happened.",
      "The brief I set myself was to design a single system where every job moves through a defined approval workflow, every one of six organisational roles sees exactly what it should, and every significant action is auditable — built solo, to production standard, within a final-year project timeline.",
    ],
    requirements: [
      "Role-based access across six organisational roles.",
      "A defined maintenance workflow with priority-based approval categories.",
      "Relational modelling for organisations, users, jobs, quotes and approvals.",
      "Audit logging, soft deletion and restoration.",
      "Responsive dashboards and reporting per role.",
      "Strong accessibility across every role-specific view.",
    ],
    research: [
      "Modelled the job lifecycle as an explicit workflow before writing any endpoints, including the three priority-based approval categories the workflow actually needed.",
      "Iteratively tested and remediated the interface against Lighthouse accessibility scoring across role-specific accounts.",
    ],
    solution: [
      "OpFix models organisations, users, maintenance jobs, quotes, approvals, attachments and audit history as first-class relational entities. Six organisational roles — including regional manager, store manager, engineer, accounts and system admin — are enforced through role-based access control and access-level administration.",
      "Maintenance requests are categorised by urgency into immediate (three-hour), 48-hour and one-week approval-based workflows, each with its own dashboard and reporting view per role — a tradeoff choosing explicit named tiers over a generic priority field, so the workflow logic matches how urgency is actually communicated in a maintenance operation.",
      "Every significant action — creation, approval, deletion, restoration — writes to an audit log. Soft deletion with restoration means nothing is destroyed by mistake, even by an admin.",
      "I evaluated the platform across every role-specific account and iteratively remediated accessibility issues, reaching a self-assessed Lighthouse accessibility score of approximately 97–99.",
    ],
    architecture: {
      description: [
        "A FastAPI backend over PostgreSQL (hosted on Supabase), consumed by a React + Vite single-page application. Role-based access control is enforced server-side on every protected route, resolving each of the six organisational roles to its permitted actions.",
        "As this project is being prepared for commercialisation, internal implementation details (data models, business rules, authentication internals) are intentionally not published here — the diagram below reflects the shape of the system, not the proprietary implementation.",
      ],
      diagram: `flowchart TB
    UI["React + Vite SPA"] --> API["FastAPI backend"]
    API --> RBAC["Role-based access control<br/>(six organisational roles)"]
    RBAC --> DB[("PostgreSQL — Supabase")]
    API --> WF["Approval workflow<br/>3hr · 48hr · 1-week categories"]
    WF --> DB
    API --> AUDIT["Audit log +<br/>soft delete / restore"]`,
    },
    features: [
      { title: "Six organisational roles", description: "Including regional manager, store manager, engineer, accounts and system admin, each with distinct permissions." },
      { title: "Priority-based approval workflow", description: "Immediate (three-hour), 48-hour and one-week maintenance categories, each with its own approval path." },
      { title: "Relational job lifecycle", description: "Organisations, users, jobs, quotes, approvals, attachments and audit history modelled as first-class entities." },
      { title: "Audit logging & soft delete", description: "Every significant action is logged; deletions are soft and restorable." },
      { title: "Role-specific dashboards & reporting", description: "Responsive dashboards tailored to what each of the six roles needs to see." },
      { title: "Accessibility-driven development", description: "Iteratively tested and remediated across role accounts to a self-assessed ~97–99 Lighthouse accessibility score." },
    ],
    implementation: [
      { title: "Explicit approval categories", description: "Three named urgency tiers (3-hour / 48-hour / 1-week) rather than a single generic priority field, matching how urgency is actually triaged." },
      { title: "Access-level administration", description: "Permissions are administered per role rather than hard-coded per page, keeping access control centralised and auditable." },
      { title: "Soft delete as a first-class pattern", description: "Deletion and restoration are both explicit, logged operations — nothing disappears silently." },
      { title: "Solo scope management", description: "Built independently within a fixed final-year timeline — a deliberate tradeoff scoping six roles and a full workflow deeply, rather than more roles shallowly." },
    ],
    challenges: [
      { title: "Modelling six distinct roles cleanly", description: "With six organisational roles spanning stores, regions, contractors and accounts, keeping access control centralised (rather than scattered per-page checks) took deliberate up-front design." },
      { title: "Reaching consistent accessibility across every role", description: "Each role has its own dashboard; reaching a consistent ~97–99 Lighthouse accessibility score meant testing and remediating every one individually, not just the primary view." },
      { title: "Building solo to a production standard", description: "With no team to split the workload, prioritisation was constant — I chose to go deep on access control, workflow correctness and accessibility rather than spread effort thinly across more surface area." },
    ],
    results: [
      "A complete, deployed maintenance management platform delivered as a BSc final-year project.",
      "Six-role access control and a three-tier approval workflow implemented and evaluated end to end.",
      "Self-assessed Lighthouse accessibility scores of approximately 97–99 across role-specific accounts.",
      "Now being prepared for future commercialisation.",
    ],
    lessons: [
      "Designing the approval workflow around real urgency tiers, rather than a generic status field, made the whole system easier to reason about.",
      "Accessibility work compounds — testing role-by-role surfaced issues a single-account pass would have missed entirely.",
      "Scoping deeply on fewer things beats spreading thin when building solo under a deadline.",
    ],
    future: [
      "Commercial development is planned; further roadmap details will follow as that work progresses.",
    ],
    screenshots: [
      {
        alt: "OpFix regional manager reporting dashboard",
        caption: "Regional-manager reporting: jobs by priority, store breakdown and contractor completion rates.",
        src: "/screenshots/opfix/reporting-dashboard.png",
      },
      {
        alt: "OpFix store manager job detail with recall workflow",
        caption: "A store-manager job detail view, with purchase order and post-completion recall.",
        src: "/screenshots/opfix/job-detail.png",
      },
      {
        alt: "OpFix two-factor authentication settings",
        caption: "Two-factor authentication in the security settings.",
        src: "/screenshots/opfix/two-factor-auth.png",
      },
      {
        alt: "OpFix accounts finance reports with CSV, Excel and PDF export",
        caption: "The accounts finance reports, with CSV / Excel / PDF export.",
        src: "/screenshots/opfix/finance-reports.png",
      },
    ],
    stack: [
      { category: "Backend", items: ["FastAPI", "PostgreSQL", "Supabase"] },
      { category: "Frontend", items: ["React", "Vite", "Tailwind CSS"] },
      { category: "Access & audit", items: ["RBAC (6 roles)", "Audit logging", "Soft delete / restore"] },
      { category: "Quality", items: ["Accessibility remediation", "Responsive dashboards"] },
    ],
  },

  /* ================================================================ */
  /*  JULLI JETS — Client Project (confidential)                       */
  /* ================================================================ */
  {
    slug: "julli-jets",
    title: "Julli Jets",
    tagline:
      "A commercial private-charter website built for a client on WordPress and Elementor, with a custom PHP page-generation layer I wrote.",
    category: "Client · WordPress · Web",
    year: "Client engagement",
    role: "Freelance Web Developer",
    timeline: "Ongoing client relationship",
    status: "Client Project",
    featured: true,
    order: 3,
    accent: "#ca8a04",
    summary:
      "Built and maintain a commercial charter company's customer-facing website — private jets, helicopters and yachts — for the client on WordPress and Elementor, via a custom PHP layer that generates page layouts programmatically instead of hand-editing each one.",
    proofPoints: {
      role: "Freelance developer engaged directly by the client for design, build and ongoing support — sole developer on the engagement.",
      scope: "Delivered the full site (homepage, aircraft/yacht pages, empty legs, charter enquiry flow) and built the tooling that generates it.",
      depth: "A custom PHP library of design-token constants and section/widget builders that compose Elementor layouts programmatically, keeping a growing page set visually consistent without manual per-page editing.",
    },
    metrics: [
      { label: "Engagement", value: "Client contract" },
      { label: "Platform", value: "WordPress" },
      { label: "Delivery", value: "Requirements → deploy" },
    ],
    primaryStack: ["WordPress", "Elementor", "PHP", "JavaScript"],
    links: { live: "https://jullijets.co.uk" },
    overview: [
      "Julli Jets is a commercial charter company offering private jets, helicopters and yachts. I worked directly with the client to gather requirements and translate their business needs into a responsive, professional customer-facing website on WordPress and Elementor.",
      "This is client-confidential work — the case study focuses on the business objective, my engineering contribution and the technologies used, rather than internal source or proprietary content.",
    ],
    problem: [
      "A charter brand needed a site that felt premium, loaded well, and gave customers a clear route to enquire — across a large set of pages (aircraft types, empty legs, charter requests, contact) that needed to share a consistent design language.",
      "As a client engagement, the work also had to fit real constraints: a defined scope, ongoing content updates, and a non-technical stakeholder who needed to see progress clearly.",
    ],
    requirements: [
      "A premium, responsive design across a large set of pages.",
      "Structured content and clear enquiry functionality.",
      "A maintainable way to keep the design consistent as pages were added.",
      "Ongoing support for deployment, content and usability changes.",
    ],
    solution: [
      "I gathered requirements directly with the client, then designed, developed and deployed a professional, responsive site with structured content and enquiry functionality on WordPress/Elementor.",
      "To keep the growing page set consistent — and given the client's ongoing content-update needs rather than a one-off build — I made a deliberate tradeoff: invest upfront in a PHP layer of reusable design-token constants and section/widget builders that compose Elementor layouts programmatically, rather than hand-editing each page. That upfront cost pays back every time the design changes or a page is added.",
      "I've continued supporting the client with deployment, content updates and usability improvements as requirements evolve.",
    ],
    architecture: {
      description: [
        "A WordPress/Elementor site whose visual design is defined in a shared PHP library (design tokens, widget builders, section builders) rather than hand-tuned per page. Shared chrome (header, footer, global CSS) and a custom booking flow live outside the generated page content. Deployment is via SFTP/SSH to the client's managed hosting.",
      ],
      diagram: `flowchart LR
    LIB["PHP builder library<br/>(tokens · widgets · sections)"] --> GEN["Page scripts"]
    GEN -->|generates| WP[("WordPress site")]
    MU["Shared chrome<br/>(header · footer · global CSS)"] --> SITE["Rendered site"]
    BOOK["Charter enquiry &amp; booking flow"] --> SITE
    WP --> SITE
    V["Visitor"] --> SITE`,
    },
    features: [
      { title: "Responsive, premium design", description: "A polished, mobile-friendly layout matching a luxury charter brand." },
      { title: "Consistent design system", description: "Design tokens and reusable builders keep colour, type and spacing consistent as pages are added." },
      { title: "Enquiry & booking functionality", description: "Structured content with a clear charter-request enquiry flow." },
      { title: "Ongoing client support", description: "Continued deployment, content updates and usability improvements." },
    ],
    implementation: [
      { title: "Direct client requirements work", description: "Translated business needs into a responsive site through direct client collaboration." },
      { title: "Reusable builders over hand-editing", description: "A shared PHP library of section/widget builders keeps the growing page set visually consistent — an upfront investment traded against faster one-off page edits." },
      { title: "Managed hosting deployment", description: "Deployed and maintained on the client's managed WordPress hosting." },
    ],
    challenges: [
      { title: "Keeping many pages visually consistent", description: "As the page count grew, hand-editing invited drift. Moving the design into reusable, code-level builders kept every page consistent and fast to update." },
      { title: "Translating a non-technical brief into a build", description: "Regular direct communication with the client turned an informal brief into a concrete, professional site." },
    ],
    results: [
      "A live, professional charter website the client uses as their primary customer-facing presence.",
      "A maintainable design system that makes site-wide changes fast rather than page-by-page.",
      "An ongoing client relationship spanning deployment, content and usability work.",
    ],
    lessons: [
      "Direct, regular client communication matters as much as the code for a commercial engagement.",
      "Investing in a small design-system layer pays for itself the moment a site grows past a handful of pages.",
    ],
    future: [
      "Continued support for the client's evolving content and feature requirements.",
    ],
    screenshots: [
      { alt: "Julli Jets homepage hero", caption: "The charter homepage on desktop." },
      { alt: "Julli Jets empty legs listing", caption: "The empty-legs listing." },
      { alt: "Julli Jets charter request form", caption: "The charter-request enquiry flow." },
    ],
    stack: [
      { category: "Platform", items: ["WordPress", "Elementor"] },
      { category: "Engineering", items: ["PHP page-generation layer", "Design tokens", "JavaScript"] },
      { category: "Delivery", items: ["Managed hosting", "SFTP/SSH deploy", "Responsive design"] },
    ],
  },

  /* ================================================================ */
  /*  RECIPE MANAGEMENT SYSTEM — Public Engineering Showcase           */
  /* ================================================================ */
  {
    slug: "recipe-management-system",
    title: "Recipe Management System",
    tagline:
      "“Jollof” — a Ghanaian recipe web app in PHP & MySQL, with a public site, a secure admin CRUD area and AJAX live-search.",
    category: "Full-Stack · Public Engineering Showcase",
    year: "2026",
    role: "Full-Stack Developer",
    timeline: "BSc coursework — Web Application Development module",
    status: "Public Engineering Showcase",
    featured: false,
    order: 4,
    accent: "#ea580c",
    summary:
      "A full-stack recipe web app (“Jollof”) celebrating traditional Ghanaian dishes — public browsing plus a secure admin area with full CRUD, image upload and preview, AJAX live-search, and soft delete with restore. Built applying Nielsen usability heuristics and WCAG accessibility considerations, in vanilla PHP and MySQL.",
    proofPoints: {
      role: "Sole developer — independent coursework, built end to end without a team.",
      scope: "Built the public site, the secure admin CRUD area, AJAX live-search, image upload with preview, and soft delete with restore.",
      depth: "Prepared-statement MySQL access throughout, Nielsen usability heuristics and WCAG accessibility considerations applied to a responsive interface, and vanilla JavaScript + AJAX integrated with the PHP backend for live search.",
    },
    metrics: [
      { label: "Stack", value: "PHP · MySQL" },
      { label: "Search", value: "AJAX live" },
      { label: "Usability", value: "Nielsen heuristics" },
    ],
    primaryStack: ["PHP", "MySQL", "JavaScript", "AJAX"],
    links: { live: "https://stu140757.webhosting.arden.ac.uk/COM6011D/index.php" },
    overview: [
      "“Jollof” is a full-stack web app celebrating traditional Ghanaian food — from Jollof rice to Kelewele — built in vanilla PHP and MySQL for Arden University's Web Application Development module.",
      "It pairs a clean public site (home, recipes, search, about) with a secure administrative area behind a login, offering full CRUD, image upload with preview, live search and soft delete with restore. Nielsen usability heuristics and WCAG accessibility considerations were applied throughout the responsive interface.",
    ],
    problem: [
      "The brief was to build a database-backed web application with a public interface and a secured admin interface offering full CRUD — with genuine attention to usability and security, not just a working demo.",
      "The content itself needed a clear model: recipes with a category, description, step-by-step instructions, prep and cook times, difficulty and an image.",
    ],
    requirements: [
      "A public site to browse, view and search recipes.",
      "A secure, authenticated admin area with full CRUD.",
      "Image upload with preview.",
      "Live search without a full page reload.",
      "Soft delete with restore.",
      "Usability and accessibility applied to a responsive interface.",
    ],
    solution: [
      "The public site presents a featured dish, category browsing and search over a catalogue of Ghanaian recipes. The admin area, gated by a login, provides the full create/read/update/delete lifecycle over recipes, with a live image preview as fields change.",
      "The standout admin feature is an asynchronous live-search in “Manage Recipes”: JavaScript and AJAX call the PHP backend to filter the table dynamically, with no full page reload. Deletes are soft — recipes move to a Trash and can be restored.",
      "Nielsen's usability heuristics (visibility of system status, user control and error prevention, among others) and WCAG accessibility considerations were applied to the responsive interface throughout — not retrofitted at the end.",
    ],
    architecture: {
      description: [
        "A server-rendered PHP application over MySQL. Shared includes handle configuration, the admin session/auth guard, and image upload; page scripts render the public pages and the admin CRUD flows. The live-search endpoint returns filtered results to the browser over AJAX.",
      ],
      diagram: `flowchart LR
    V["Visitor"] --> PUB["Public site<br/>(home · recipes · search)"]
    A["Admin"] --> AUTH["Login guard"]
    AUTH --> ADMIN["Admin CRUD<br/>(add · edit · trash)"]
    ADMIN -->|AJAX live-search| SEARCH["search endpoint"]
    PUB --> DB[("MySQL")]
    ADMIN --> DB
    SEARCH --> DB
    ADMIN --> UP["Image upload + preview"]`,
    },
    database: {
      description: [
        "A recipe belongs to a category and carries a title, short description, instructions, prep and cook times, a difficulty and an image path. A soft-delete timestamp preserves removed recipes for restore, and admin users authenticate against a hashed password.",
      ],
      diagram: `erDiagram
    CATEGORY ||--o{ RECIPE : groups
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
    }`,
    },
    features: [
      { title: "Public recipe site", description: "Home, category browsing, search and recipe detail for traditional Ghanaian dishes." },
      { title: "Secure admin CRUD", description: "A login gates full create, read, update and delete over recipes." },
      { title: "AJAX live-search", description: "The admin's Manage Recipes list filters dynamically via JavaScript + AJAX, with no page reload." },
      { title: "Image upload & preview", description: "Uploaded images are validated and previewed live as the form is edited." },
      { title: "Soft delete & restore", description: "Removed recipes move to a Trash and can be restored, rather than being destroyed." },
      { title: "Usability & accessibility by design", description: "Nielsen usability heuristics and WCAG accessibility considerations applied to a responsive interface." },
    ],
    implementation: [
      { title: "AJAX over the PHP backend", description: "The live-search fetches filtered results asynchronously, demonstrating JS + AJAX + PHP working together." },
      { title: "Soft delete over hard delete", description: "Deleting sets a timestamp and moves the recipe to Trash, so it stays recoverable." },
      { title: "Usability heuristics applied deliberately", description: "Nielsen's heuristics informed concrete decisions — visible system status on save/delete, clear error prevention on required fields." },
    ],
    challenges: [
      { title: "Building the live-search", description: "Wiring JavaScript, AJAX and the PHP backend so the table filters smoothly without a reload took careful handling of requests and rendering." },
      { title: "Applying usability heuristics concretely", description: "Turning Nielsen's heuristics into specific interface decisions, rather than a checklist, shaped the create/edit flow and its feedback states." },
    ],
    results: [
      "A working, deployed recipe web app with a polished public site and a full admin CRUD area.",
      "Usability and accessibility applied deliberately, not retrofitted, per Nielsen heuristics and WCAG considerations.",
      "A demonstrable grasp of JavaScript, AJAX and PHP working together in the live-search.",
    ],
    lessons: [
      "Applying usability heuristics during design — not after — changes which decisions you even consider.",
      "A small async touch like live-search noticeably improves how responsive an admin tool feels.",
    ],
    future: [
      "Push the source to a public repository as the flagship open code example on this portfolio.",
      "Tagging and richer public search and filtering.",
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
        caption: "The edit form, with a live preview and image upload.",
        src: "/screenshots/recipe/edit-recipe.png",
      },
    ],
    stack: [
      { category: "Core", items: ["PHP", "MySQL", "Server-rendered"] },
      { category: "Frontend", items: ["JavaScript", "AJAX", "Responsive UI"] },
      { category: "Quality", items: ["Nielsen heuristics", "WCAG considerations", "Soft delete"] },
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
