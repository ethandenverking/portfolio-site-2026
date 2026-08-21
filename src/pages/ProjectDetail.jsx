import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/content.js'
import { ArrowIcon } from '../components/icons.jsx'
import NotFound from './NotFound.jsx'

export default function ProjectDetail() {
  const { slug } = useParams()
  const scrapARef = useRef(null)
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (scrapARef.current) scrapARef.current.style.transform = `rotate(${-7 + y * 0.006}deg) translateY(${y * 0.12}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!project) return <NotFound />

  return (
    <section className="project-detail">
      <div ref={scrapARef} className="scrap scrap-a" aria-hidden="true" />
      <div className="scrap scrap-b" aria-hidden="true" />
      <div className="container">
        <Link to="/#work" className="back-link">
          <ArrowIcon style={{ transform: 'rotate(225deg)' }} /> All work
        </Link>

        <div className="project-detail-image">
          {project.links.video ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${project.links.video}`}
              title={`${project.title} demo video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : project.links.image ? (
            <img src={project.links.image} alt={`${project.title} preview`} />
          ) : (
            <div className="shot" />
          )}
        </div>

        <div className="project-detail-grid">
          <div className="project-detail-card">
            <div className="project-detail-index">Project {String(index + 1).padStart(2, '0')}</div>
            <h1>{project.title}</h1>
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
          </div>

          <div className="project-detail-side">
            <div className="project-detail-sidebar">
              <div>
                <div className="field-label">Role</div>
                <div className="field-value">{project.role}</div>
              </div>
              <div>
                <div className="field-label">Stack</div>
                <div className="tag-row">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag tag-outline">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
