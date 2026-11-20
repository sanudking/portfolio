import { Link } from "react-router-dom";
import { categoryLabels } from "../data/projects";

const COMPACT_STACK_LIMIT = 3;

function ProjectCard({ project, compact = false, href, anchorId }) {
  const stack = compact
    ? project.stack.slice(0, COMPACT_STACK_LIMIT)
    : project.stack;

  const className = [
    "project-card",
    "card",
    compact && "project-card--compact",
    href && "project-card--linked",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className={className} id={anchorId}>
      {project.image && (
        <div className="project-media">
          <picture>
            {project.imageWebp && (
              <source srcSet={project.imageWebp} type="image/webp" />
            )}
            <img
              src={project.image}
              alt={project.imageAlt ?? ""}
              width="1400"
              height="875"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      )}

      <div className="badges">
        {project.categories.map((category) => (
          <span className="badge" key={category}>
            {categoryLabels[category] ?? category}
          </span>
        ))}
        {project.period && <span className="badge soft">{project.period}</span>}
      </div>

      <h3>
        {href ? (
          <Link className="project-title-link" to={href}>
            {project.title}
          </Link>
        ) : (
          project.title
        )}
      </h3>
      <p className="project-desc">{project.description}</p>

      {!compact && project.highlights && (
        <ul className="project-highlights">
          {project.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      )}

      <ul className="stack" aria-label="Tech stack">
        {stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <div className="project-links">
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noopener noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
        )}
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

