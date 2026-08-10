import { Link } from 'react-router-dom'
import { StarIcon } from './icons.jsx'

// Placeholder for a project screenshot until real imagery is dropped in.
function ProjectShot({ title }) {
  return (
    <div className="project-shot" aria-hidden="true">
      <svg viewBox="0 0 220 96" width="100%" height="100%">
        <g stroke="var(--color-divider)" strokeWidth="1" fill="none">
          <rect x="14" y="14" width="192" height="16" />
          <rect x="14" y="38" width="90" height="44" />
          <rect x="116" y="38" width="90" height="20" />
          <rect x="116" y="62" width="90" height="20" />
        </g>
      </svg>
      <span className="project-shot-label">{title}</span>
    </div>
  )
}

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="project-card card elev-sm">
      <ProjectShot title={project.title} />
      <div className="project-card-body">
        <div className="card-title-row">
          <h3 className="card-title">{project.title}</h3>
          <span className="card-meta"><StarIcon /> {project.stars}</span>
        </div>
        <p className="card-body">{project.summary}</p>
        <div className="project-card-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag tag-neutral">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
