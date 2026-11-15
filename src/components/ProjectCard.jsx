import { categoryLabels } from "../data/projects";

function ProjectCard({ project }) {
  return (
    <article className="project-card card">
      <div className="badges">
        <span className="badge">
          {categoryLabels[project.category] ?? project.category}
        </span>
        <span className={`badge alt ${project.vc ? "" : "soft"}`}>
          {project.vc ? "Mostly vibecoded" : "Partly vibecoded"}
        </span>
      </div>

      <h3>{project.title}</h3>
      <p className="project-desc">{project.description}</p>

      <ul className="stack" aria-label="Tech stack">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <div className="project-links">
        <a href={project.repo} target="_blank" rel="noopener noreferrer">
          GitHub <span aria-hidden="true">↗</span>
        </a>
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer">
            Live <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
