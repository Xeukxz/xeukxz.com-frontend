import { ExternalLink } from './CustomElements/ExternalLink/ExternalLink';
import { Repo } from './CustomElements/Repo/Repo';

const projectsLinksElement = document.querySelector('#links .content') as HTMLElement;
const projectsReposElement = document.querySelector('#repos .content') as HTMLElement;
const addProject = (...constructorArguments: ConstructorParameters<typeof ExternalLink>) => projectsLinksElement.appendChild(new ExternalLink(...constructorArguments));
const addRepo = (...constructorArguments: ConstructorParameters<typeof Repo>) => projectsReposElement.appendChild(new Repo(...constructorArguments));

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

addRepo(
  "Twitter-Selfbot-Library",
  "A TypeScript library for automating a Twitter/X user account.",
  "https://github.com/Xeukxz/Twitter-Selfbot-Library"
);

addRepo(
  "Lua-Interpreter",
  `A Lua interpreter written in TypeScript.<br>Not much purpose, its just cool.`,
  "https://github.com/Xeukxz/LuaInterpreter"
);