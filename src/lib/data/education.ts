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
    institution: "Arden University, UK",
    period: "2023 — 2026",
    summary:
      "A Computer Science degree grounded in software engineering, databases, security and systems design — applied throughout in real, deployed projects rather than throwaway exercises.",
    modules: [
      "Software Engineering",
      "Web Application Development",
      "Object-Oriented Programming",
      "Database Systems and Advanced Databases",
      "Cloud and Distributed Computing",
      "Information Security",
      "Systems Analysis and Design",
      "Human Computer Interaction",
    ],
    finalYearProject: {
      title: "Final Year Project — Design and Implementation of a Secure Cloud-Based Maintenance Management System",
      description:
        "Designed and built OpFix, a secure enterprise-style maintenance management platform with six organisational roles, role-based access control and end-to-end approval workflows. The dissertation covered requirements analysis, system design, implementation, testing and a critical evaluation against the original objectives — later reworked into a public case study now being prepared for future commercialisation.",
    },
  },
];

/**
 * No certifications are currently held. Rather than list placeholder /
 * "planned" certifications, this reflects verified, ongoing self-directed
 * learning (per CV: "Professional development (ongoing)").
 */
export const currentLearning: string[] = [
  "Docker",
  "Automated testing",
  "CI/CD",
  "AWS",
  "Azure",
  "System design",
];
