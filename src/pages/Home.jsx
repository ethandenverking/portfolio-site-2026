import { useEffect, useRef } from 'react'
import { site, projects } from '../data/content.js'
import HeroObject from '../components/HeroObject.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import { GithubIcon } from '../components/icons.jsx'

const TILTS = ['-1.6deg', '1.4deg', '1.1deg', '-1.3deg']
const SHOTS = ['10% 20%', '70% 40%', '30% 75%', '85% 15%']

export default function Home() {
  const scrapARef = useRef(null)
  const scrapBRef = useRef(null)

  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash)
      if (el) el.scrollIntoView({ block: 'start' })
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      if (scrapARef.current) scrapARef.current.style.transform = `rotate(${-7 + y * 0.006}deg) translateY(${y * 0.12}px)`
      if (scrapBRef.current) scrapBRef.current.style.transform = `translate(-18%, 22%) rotate(${5 - y * 0.004}deg) translateY(${-y * 0.08}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy-wrap">
            <div ref={scrapBRef} className="scrap scrap-b" aria-hidden="true" />
            <div className="hero-copy-card">
              <span className="pill-badge">{site.kicker}</span>
              <h1>{site.headline}</h1>
              <p className="hero-intro">{site.intro}</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#work">Selected work</a>
                <a className="btn btn-secondary" href={site.github} target="_blank" rel="noreferrer">
                  <GithubIcon /> GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div ref={scrapARef} className="scrap scrap-a" aria-hidden="true" />
            <div className="hero-visual-frame">
              <div className="hero-image-card">
                <div className="hero-object-cell">
                  <HeroObject modelUrl="/models/lowest-poly-thinker.stl" />
                </div>
                <span className="hero-caption"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="projects-section">
        <div className="container">
          <div className="section-heading">
            <span className="pill-badge pill-badge-dark">
              Selected work / {String(projects.length).padStart(2, '0')}
            </span>
          </div>
          <div className="project-grid">
            {projects.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i + 1}
                tilt={TILTS[i % 4]}
                shot={SHOTS[i % 4]}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
