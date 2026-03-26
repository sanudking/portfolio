import { useState } from "react";
import "../styles/projects.css";
import projectsData from "../data/projects";
import ProjectCard from "../components/ProjectCard";

function Projects() {

  const [filter, setFilter] = useState("all");

  const filteredProjects = projectsData.filter((project) => {
    if (filter === "all") return true;
    return project.category === filter;
  });

  return (
    <div style={{ width: "100%" }}>
      <h1>Projects Page</h1>

      <div style={{paddingLeft:"70px"}}>
      <div style={{display: "flex", gap: "10px", padding: "10px"}}>
        <button onClick={() => setFilter("all")}>All projects</button>
        <button onClick={() => setFilter("web")}>Web</button>
        <button onClick={() => setFilter("ml")}>ML</button>
        <button onClick={() => setFilter("systems")}>Systems</button>
      </div><br/></div>

     
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