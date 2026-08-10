import { Link } from 'react-router-dom'
import { site } from '../data/content.js'

export default function Nav() {
  return (
    <header className="site-nav nav">
      <Link to="/" className="nav-brand">{site.initials}</Link>
      <nav className="site-nav-links">
        <a href="/#projects">Projects</a>
        <a href="/#contact" className="is-accent">Contact</a>
      </nav>
    </header>
  )
}
