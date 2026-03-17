import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { LatestPosts } from "@/components/home/LatestPosts";
import { SkillsOverview } from "@/components/home/SkillsOverview";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <LatestPosts />
      <SkillsOverview />
    </>
  );
}
