import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/content.js'
import { StarIcon, ArrowIcon } from '../components/icons.jsx'
import NotFound from './NotFound.jsx'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) return <NotFound />

  return (
    <section className="project-detail">
      <Link to="/#projects" className="btn-ghost btn back-link">
        <ArrowIcon style={{ transform: 'rotate(225deg)' }} /> Back to projects
      </Link>

      <div className="project-detail-header">
        <h1>{project.title}</h1>
        <span className="card-meta"><StarIcon /> {project.stars} stars</span>
      </div>

      <div className="project-detail-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag tag-accent">{tag}</span>
        ))}
        <span className="tag tag-outline">{project.role}</span>
      </div>

      <p className="project-detail-description">{project.description}</p>

      <div className="hero-actions">
        <a className="btn btn-primary" href={project.links.repo} target="_blank" rel="noreferrer">
          View repo
        </a>
        {project.links.demo && (
          <a className="btn btn-secondary" href={project.links.demo} target="_blank" rel="noreferrer">
            Live demo
          </a>
        )}
      </div>
    </section>
  )
}
