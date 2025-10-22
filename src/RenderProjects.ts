import { ExternalLink } from './CustomElements/ExternalLink/ExternalLink';

const projectsLinksElement = document.querySelector('#projects .links') as HTMLElement;
const addProject = (...constructorArguments: ConstructorParameters<typeof ExternalLink>) => projectsLinksElement.appendChild(new ExternalLink(...constructorArguments));

addProject(
  "./game",
  "Game",
  "A simple game with funky controls."
);

addProject(
  "./typestreak",
  "TypeStreak",
  `Practice your accuracy by typing words correctly, consecutively.`
)

addProject(
  "./particles",
  "Particles",
  `A dedicated version of the particles demo, with customization options.`
);

addProject(
  "./bsl-feed",
  "BSL Feed",
  `A TikTok-style feed for learning British Sign Language.`
);