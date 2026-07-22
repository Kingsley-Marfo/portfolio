import { Hero } from "@/components/sections/hero";
import { StatsBand } from "@/components/sections/stats-band";
import { ApproachSection } from "@/components/sections/approach-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { CtaSection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <FeaturedProjects />
      <ApproachSection />
      <SkillsSection />
      <CtaSection />
    </>
  );
}
