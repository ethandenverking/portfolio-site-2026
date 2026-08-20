import { Link } from 'react-router-dom'
import { StarIcon, PlayIcon } from './icons.jsx'

export default function ProjectCard({ project, index, tilt, shot }) {
  const thumbnail = project.links.video
    ? `https://img.youtube.com/vi/${project.links.video}/hqdefault.jpg`
    : project.links.image

  return (
    <Link to={`/projects/${project.slug}`} className="project-card" style={{ '--tilt': tilt }}>
      <div className="project-card-media">
        {thumbnail ? (
          <img src={thumbnail} alt={`${project.title} preview`} />
        ) : (
          <div className="shot" style={{ '--shot': shot }} />
        )}
        {project.links.video && (
          <span className="project-card-play" aria-hidden="true"><PlayIcon /></span>
        )}
        <span className="project-card-index">{String(index).padStart(2, '0')}</span>
      </div>
      <div className="project-card-body">
        <div className="card-title-row">
          <h3 className="card-title">{project.title}</h3>
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
