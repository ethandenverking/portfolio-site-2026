import { site } from '../data/content.js'

export default function Nav() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <div className="brand-card tilt-l">
          <p className="nav-brand">{site.name}</p>
          <div className="brand-tagline">{site.tagline}</div>
        </div>
        <nav className="nav-pill">
          <a href="/#work">Work</a>
          <a href="/#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}
