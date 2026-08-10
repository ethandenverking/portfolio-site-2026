// The hero object: a rotating cube-in-cube wireframe, per the design's note.
export default function HeroObject() {
  return (
    <svg className="hero-object" viewBox="0 0 160 200" width="100%">
      <g fill="none" stroke="var(--color-accent)" strokeWidth="1">
        <rect x="36" y="60" width="66" height="66" />
        <rect x="58" y="76" width="66" height="66" />
        <path d="M36,60 L58,76 M102,60 L124,76 M36,126 L58,142 M102,126 L124,142" />
      </g>
      <g fill="none" stroke="var(--color-divider)" strokeWidth="1">
        <ellipse cx="80" cy="101" rx="60" ry="22" />
        <path d="M80,20 L80,182" />
      </g>
    </svg>
  )
}
