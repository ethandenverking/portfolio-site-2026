import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="container">
        <div className="not-found-card">
          <div className="kicker">404</div>
          <h1>Nothing here.</h1>
          <p className="hero-intro">The page you're looking for doesn't exist.</p>
          <Link className="btn btn-primary" to="/">Back home</Link>
        </div>
      </div>
    </section>
  )
}
