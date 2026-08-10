export const site = {
  name: 'A. Developer',
  initials: 'A.D.',
  kicker: 'Frontend engineer, 2 yrs',
  headline: 'I write the interface layer.',
  intro:
    'Two years in, four things shipped — small teams, real users, front-of-stack work from layout to state.',
  email: 'a.dev@mail.com',
  github: 'https://github.com/',
  linkedin: 'https://www.linkedin.com/',
}

export const projects = [
  {
    slug: 'transit-tracker',
    title: 'Transit tracker',
    stars: 84,
    summary: 'Live delay predictions for a city bus network, built on public GTFS-RT feeds.',
    description:
      'A real-time dashboard that ingests GTFS-RT transit feeds and predicts delays per route. Started as a personal itch — the local bus app was unreliable — and grew into a tool a few hundred riders check every morning.',
    tags: ['React', 'WebSockets'],
    role: 'Solo project',
    links: { repo: 'https://github.com/', demo: 'https://example.com/' },
  },
  {
    slug: 'offline-notes',
    title: 'Offline notes',
    stars: 212,
    summary: 'A markdown notes app that works fully offline and syncs when it can.',
    description:
      'Markdown-first notes with an offline-first storage layer (IndexedDB) and a background sync queue for when connectivity returns. Focused on feeling instant — every keystroke commits locally before anything touches the network.',
    tags: ['TypeScript', 'IndexedDB', 'PWA'],
    role: 'Solo project',
    links: { repo: 'https://github.com/', demo: 'https://example.com/' },
  },
  {
    slug: 'token-diff-cli',
    title: 'Token diff CLI',
    stars: 47,
    summary: 'A command-line tool that diffs design-token JSON between releases.',
    description:
      'Design systems change tokens constantly; this CLI diffs two token JSON trees and prints a readable changelog, flagging removed or renamed keys that would break consuming components.',
    tags: ['Node.js', 'CLI'],
    role: 'Solo project',
    links: { repo: 'https://github.com/', demo: null },
  },
  {
    slug: 'bracket-pool',
    title: 'Bracket pool',
    stars: 19,
    summary: 'A weekend build for running an office tournament bracket pool.',
    description:
      'Built in a weekend for a coworker running an office bracket pool — bracket entry, live scoring and a leaderboard. Small scope, but shipped end-to-end including auth and deployment.',
    tags: ['Next.js', 'Postgres'],
    role: 'Solo project',
    links: { repo: 'https://github.com/', demo: 'https://example.com/' },
  },
]
