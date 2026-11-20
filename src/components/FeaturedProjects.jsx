import { Link } from "react-router-dom";
import projectsData, { projectSlug } from "../data/projects";
import ProjectCard from "./ProjectCard";
import Inertial, { FocusInertial } from "./Inertial";
import "../styles/featured.css";

const FEATURED_TITLES = [
  "Distributed LLM Inference",
  "JobMatch",
  "Physics Simulator",
  "Portfolio Website",
];

const featuredProjects = FEATURED_TITLES.map((title) =>
  projectsData.find((project) => project.title === title)
).filter(Boolean);

function FeaturedProjects() {
  return (
    <section className="section featured-section">
      <Inertial className="inertial-block" depth={0.8} lag={5}>
        <div className="section-head">
          <span className="eyebrow">Selected work</span>
          <h2 className="section-title">Featured projects</h2>
          <p className="section-sub">
            Four things I&apos;m proud of — the rest live on the projects page.
          </p>
        </div>
      </Inertial>

      <div className="featured-grid">
        {featuredProjects.map((project) => (
          <FocusInertial key={project.id} depth={1} lag={9} tilt={1.2}>
            <ProjectCard
              project={project}
              compact
              href={`/projects#${projectSlug(project)}`}
            />
          </FocusInertial>
        ))}
      </div>

      <div className="featured-more">
        <Link className="btn btn-ghost btn-sm" to="/projects">
          See all projects <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProjects;
