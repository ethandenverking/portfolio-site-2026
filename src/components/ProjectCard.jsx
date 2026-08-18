import { Link } from 'react-router-dom'
import { StarIcon } from './icons.jsx'

export default function ProjectCard({ project, index, tilt, shot }) {
  return (
    <Link to={`/projects/${project.slug}`} className="project-card" style={{ '--tilt': tilt }}>
      <div className="project-card-media">
        <div className="shot" style={{ '--shot': shot }} />
        <span className="project-card-index">{String(index).padStart(2, '0')}</span>
      </div>
      <div className="project-card-body">
        <div className="card-title-row">
          <h3 className="card-title">{project.title}</h3>
          <span className="card-meta"><StarIcon /> {project.stars}</span>
        </div>
        <p className="card-body">{project.summary}</p>
        <div className="project-card-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag tag-outline">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
