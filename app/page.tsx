import Hero from "./components/hero";
// import About from "./components/about";
import SkillsCards from "./components/skills";
import Projects from "./components/projects";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <About /> */}
      <SkillsCards />
      <Projects />
    </main>
  );
}