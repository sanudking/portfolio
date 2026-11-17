import { Link } from "react-router-dom";
import { useEffect } from "react";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Education from "../components/Education";
import ScholasticAchievements from "../components/ScholasticAchievements";
import Reading from "../components/Reading";
import FeaturedProjects from "../components/FeaturedProjects";
import Inertial from "../components/Inertial";
import VisitorCounter from "../components/VisitorCounter";

function Home() {
  // Deep links like /#skills or /#education need a manual scroll: the target
  // section only exists after React has rendered the page.
  useEffect(() => {
    const id = window.location.hash.replace("#", "");
    if (!id) return;
    const frame = window.requestAnimationFrame(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="home">
      <Hero />
      <FeaturedProjects />
      <Skills />
      <Education />
      <ScholasticAchievements />
      <Reading />

      <Inertial as="section" className="cta inertial-block" depth={0.7} lag={6}>
        <h2>Let&apos;s build something together</h2>
        <p>
          I&apos;m open to internships, freelance work and side projects. If you
          have an idea, I&apos;d love to hear about it.
        </p>
        <div className="cta-actions">
          <Link className="btn btn-primary" to="/contact">
            Get in touch
          </Link>
          <Link className="btn btn-ghost" to="/projects">
            Browse projects
          </Link>
        </div>
      </Inertial>

      <VisitorCounter />
    </div>
  );
}

export default Home;
