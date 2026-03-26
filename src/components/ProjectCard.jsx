function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h3>{project.title}</h3>
      <p>{project.category}</p>

      <div className="project-links">
        <a href="#">GitHub</a>
        <a href="#">Live</a>
      </div>
    </div>
  );
}

export default ProjectCard;