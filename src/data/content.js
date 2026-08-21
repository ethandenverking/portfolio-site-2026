export const site = {
  name: 'Ethan King',
  initials: 'E.K.',
  tagline: 'Software Engineer',
  kicker: 'Portfolio',
  headline: 'Solving hard problems',
  intro:
    "I've been writing software on and off since I was 10 years old, and most of what I know I picked up by building something, taking it apart, and figuring it out.",
  email: 'ethandenverking@gmail.com',
  github: 'https://github.com/ethandenverking',
  linkedin: 'https://www.linkedin.com/in/ethankingdev/',
}

export const projects = [
  {
    slug: '8x8-edh-assistant',
    title: '8x8 EDH Assistant',
    stars: 84,
    summary: 'An assistant for new deckbuilders of Magic: the Gathering EDH decks using the 8x8 deckbuilding formula.',
    description:
      'MTG Deck Assistant is a full-stack web application that helps Magic: The Gathering players new to deckbuilding create Commander (EDH) decks. Users can search for cards via a Scryfall-powered lookup, get AI-generated card tags and thematic categorizations through Google Gemini, and receive machine-learning-driven card recommendations from the CardMystic API. The app aggregates data from multiple external sources: Scryfall, Gemini, CardMystic, and EDHREC, through a Node.js/Express backend presented through a React/TypeScript frontend with interactive deck-building screens.',
    tags: ['React + TS', 'Node + Express', 'AI'],
    role: 'Solo project',
    links: { repo: 'https://github.com/ethandenverking/MTG_Deck_Assistant', demo: 'https://edh-8x8-assistant.com/', image: '/8x8screenshot.png' },
  },
  {
    slug: 'cooked',
    title: 'Cooked',
    stars: 212,
    summary: 'An all-in-one cooking companion that simplifies all facets of cooking for users of all skill levels.',
    description:
      'An all-in-one cooking companion that simplifies recipe discovery, grocery shopping, and skill development for cooks of all levels. Unlike existing recipe apps and cooking websites, Cooked integrates a variety of features, including a personalized recipe feed, interactive skill-building tools, and practical shopping assistance, into a single, intuitive platform. ',
    tags: ['React Native + TS', 'Expo', 'Firebase'],
    role: 'Senior Capstone Project Member',
    links: { repo: 'https://github.com/', demo: 'https://example.com/', image: null, video: 'diSFjm0U0NE' },
  },
  {
    slug: 'as-jobboard-generator',
    title: 'AS Job Board Generator',
    stars: 47,
    summary: 'Generates a static HTML file to be used with ApplicantStack',
    description:
      'Generates a static HTML file to be used with ApplicantStack by taking in an HTML file and outputting a job board with the correct formatting. This was built to help streamline my processes at work, as I am part of my responsibilities are creating front end sites to mimic client sites. This cut down my work time on these projects by about 95%.',
    tags: ['React + TS', 'AI'],
    role: 'Solo project',
    links: { repo: 'https://github.com/ethandenverking/ApplicantStack-JobBoardSkin-Generator', demo: "https://as-jobboard-generator.netlify.app/", image: '/asgeneratorthumbnail.png' },
  },
]
