import { useEffect } from 'react'
import { site, projects } from '../data/content.js'
import HeroObject from '../components/HeroObject.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { GithubIcon } from '../components/icons.jsx'

export default function Home() {
  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash)
      if (el) el.scrollIntoView({ block: 'start' })
    }
  }, [])

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="kicker">{site.kicker}</div>
          <h1>{site.headline}</h1>
          <p className="hero-intro">{site.intro}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">Projects</a>
            <a className="btn btn-secondary" href={site.github} target="_blank" rel="noreferrer">
              <GithubIcon /> GitHub
            </a>
          </div>
        </div>
        <div className="hero-object-cell">
          <HeroObject modelUrl="/models/lowest-poly-thinker.stl" />
        </div>
      </section>

      <section id="projects" className="projects-section">
        <div className="section-heading">
          <div className="kicker">Selected projects</div>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  )
}
