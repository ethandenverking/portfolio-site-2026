import { site } from '../data/content.js'
import { GithubIcon, LinkedinIcon } from './icons.jsx'

export default function Footer() {
  return (
    <footer id="contact" className="site-footer">
      <div className="container site-footer-inner">
        <div className="footer-card">
          <div className="kicker">Hiring?</div>
          <a className="site-footer-email" href={`mailto:${site.email}`}>{site.email}</a>
        </div>
        <div className="site-footer-links">
          <a className="btn btn-icon btn-secondary" href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a className="btn btn-icon btn-secondary" href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedinIcon />
          </a>
        </div>
      </div>
      <div className="site-footer-bottom">
        <span>&copy; {new Date().getFullYear()} {site.name}</span>
      </div>
    </footer>
  )
}
