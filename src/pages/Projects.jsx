import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import projectsData, { categoryLabels, projectSlug } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import Inertial, { FocusInertial } from "../components/Inertial";
import "../styles/projects.css";

const categories = Object.keys(categoryLabels);

function Projects() {
  const [filter, setFilter] = useState("all");
  const { hash } = useLocation();
  const anchor = hash.replace("#", "");

  // Deep link from the home page (/projects#jobmatch): the target card must be
  // rendered before we can scroll to it, so never let a filter hide it.
  const anchorProject = anchor
    ? projectsData.find((project) => projectSlug(project) === anchor)
    : null;

  useEffect(() => {
    if (!anchorProject) return;
    const frame = window.requestAnimationFrame(() => {
      document
        .getElementById(anchor)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [anchor, anchorProject]);

  const filteredProjects = projectsData.filter(
    (project) =>
      filter === "all" ||
      project.categories.includes(filter) ||
      project === anchorProject
  );

  return (
    <div>
      <Inertial as="header" className="page-head inertial-block" depth={0.8} lag={5}>
        <span className="eyebrow">Work</span>
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">
          Experiments, coursework and things built for fun. Some shipped, some
          still growing — filter by category.
        </p>
      </Inertial>

      <div className="filters">
        <div className="filter-row">
          <span className="filter-label">Category</span>
          <button
            type="button"
            className={filter === "all" ? "filter-button active" : "filter-button"}
            onClick={() => setFilter("all")}
            aria-pressed={filter === "all"}
          >
            All projects
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={
                filter === category ? "filter-button active" : "filter-button"
              }
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
            >
              {categoryLabels[category] ?? category}
            </button>
          ))}
        </div>
      </div>

      <div className="results-bar">
        <span>
          {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
        </span>
        {filter !== "all" && (
          <button
            type="button"
            className="clear-filters"
            onClick={() => setFilter("all")}
          >
            Clear filters ✕
          </button>
        )}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <FocusInertial key={project.id} depth={1} lag={9} tilt={1.2}>
              <ProjectCard project={project} anchorId={projectSlug(project)} />
            </FocusInertial>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No projects match those filters</h2>
          <p>Try a different category or clear the filters.</p>
        </div>
      )}
    </div>
  );
}

export default Projects;
