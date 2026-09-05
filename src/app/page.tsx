import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import StatStrip from "@/components/StatStrip";
import SkillsTicker from "@/components/SkillsTicker";
import About from "@/components/About";
import Competencies from "@/components/Competencies";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Recognition from "@/components/Recognition";
import AskNaga from "@/components/AskNaga";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatStrip />
        <SkillsTicker />
        <About />
        <Competencies />
        <Projects />
        <Timeline />
        <Recognition />
        <AskNaga />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
