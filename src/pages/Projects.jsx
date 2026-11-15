import { useState } from "react";
import projectsData, { categoryLabels } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import "../styles/projects.css";

const VC_FILTERS = [
  { value: 0, label: "Partly vibecoded" },
  { value: 1, label: "Mostly vibecoded" },
];

function Projects() {
  const [filter, setFilter] = useState("all");
  const [vcFilters, setVcFilters] = useState([]);

  const categories = [...new Set(projectsData.map((project) => project.category))];

  const toggleVcFilter = (value) => {
    setVcFilters((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  };

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = filter === "all" || project.category === filter;
    const matchesVc = vcFilters.length === 0 || vcFilters.includes(project.vc);

    return matchesCategory && matchesVc;
  });

  return (
    <div>
      <header className="page-head">
        <span className="eyebrow">Work</span>
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">
          Experiments, coursework and things built for fun. Some shipped, some
          still growing — filter by category or by how much of them came from a
          prompt.
        </p>
      </header>

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

        <div className="filter-row">
          <span className="filter-label">Origin</span>
          {VC_FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={
                vcFilters.includes(option.value)
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() => toggleVcFilter(option.value)}
              aria-pressed={vcFilters.includes(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="results-bar">
        <span>
          {filteredProjects.length}{" "}
          {filteredProjects.length === 1 ? "project" : "projects"}
        </span>
        {(filter !== "all" || vcFilters.length > 0) && (
          <button
            type="button"
            className="clear-filters"
            onClick={() => {
              setFilter("all");
              setVcFilters([]);
            }}
          >
            Clear filters ✕
          </button>
        )}
      </div>

      {filteredProjects.length > 0 ? (
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
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
