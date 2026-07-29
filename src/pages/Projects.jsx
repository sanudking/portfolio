import { useState } from "react";
import "../styles/projects.css";
import projectsData from "../data/projects";
import ProjectCard from "../components/ProjectCard";


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

  const isCategoryActive = (category) => filter === category;
  const isVcActive = (value) => vcFilters.includes(value);



  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = filter === "all" || project.category === filter;
    const matchesVc = vcFilters.length === 0 || vcFilters.includes(project.vc);

    return matchesCategory && matchesVc;
  });
  return (
    <div style={{ width: "100%" }}>
      <h1>Projects Page</h1>

      <div style={{paddingLeft:"70px"}}>
      <div style={{display: "flex", gap: "10px", padding: "10px"}}>
        <button
          className={filter === "all" ? "filter-button active" : "filter-button"}
          onClick={() => setFilter("all")}
        >
          All projects
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={isCategoryActive(category) ? "filter-button active" : "filter-button"}
            onClick={() => setFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div><br/>
      <div style={{display: "flex", gap: "10px", padding: "10px"}}>
        <button
          className={isVcActive(0) ? "filter-button active" : "filter-button"}
          onClick={() => toggleVcFilter(0)}
          aria-pressed={vcFilters.includes(0)}
        >
          Partially Vibe coded
        </button>
        <button
          className={isVcActive(1) ? "filter-button active" : "filter-button"}
          onClick={() => toggleVcFilter(1)}
          aria-pressed={vcFilters.includes(1)}
        >
          Mostly Vibecoded
        </button>

      </div>
      
      
      </div>
      <div className="projects-container">
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

    </div>
  );
}
export default Projects;