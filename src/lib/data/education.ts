export type EducationItem = {
  qualification: string;
  institution: string;
  period: string;
  summary: string;
  modules: string[];
  finalYearProject?: {
    title: string;
    description: string;
  };
};

export const education: EducationItem[] = [
  {
    qualification: "BSc (Hons) Computer Science",
    institution: "Arden University",
    period: "2023 — 2025",
    summary:
      "A Computer Science degree grounded in software engineering, algorithms, databases, security and systems — applied throughout in real, deployed projects rather than throwaway exercises.",
    modules: [
      "Software Engineering",
      "Data Structures & Algorithms",
      "Database Systems",
      "Web Development",
      "Object-Oriented Programming",
      "Computer Security",
      "Cloud Computing",
      "Systems Analysis & Design",
    ],
    finalYearProject: {
      title: "Final Year Project — OpFix: Cloud-Based Maintenance Management System",
      description:
        "Researched, designed and built a cloud-based Maintenance Management System (FastAPI, PostgreSQL/Supabase and React) featuring role-based access control, a multi-stage job workflow state machine, audit logging, SLA tracking and reporting. The dissertation covered requirements analysis, system design, implementation decisions, a pytest testing strategy and a critical evaluation against the original objectives.",
    },
  },
];

export type Certification = {
  title: string;
  issuer: string;
  status: "planned" | "in-progress" | "completed";
};

/** Placeholder — real certifications will be added here as they are earned. */
export const certifications: Certification[] = [
  { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", status: "planned" },
  { title: "Meta Back-End Developer", issuer: "Meta", status: "planned" },
  { title: "Stripe Certified Developer", issuer: "Stripe", status: "planned" },
];
