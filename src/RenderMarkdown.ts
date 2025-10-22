import { marked } from 'marked'

document.getElementById("gamesProjectDescription")!.innerHTML = marked(`
  Its a game.
`.offsetIndent(2)) as string

document.getElementById("typestreakProjectDescription")!.innerHTML = marked(`
  A "game" about typing words correctly consecutively.
`.offsetIndent(2)) as string

document.getElementById("particlesProjectDescription")!.innerHTML = marked(`
  A dedicated version of the particles demo, with customisation options.
`.offsetIndent(2)) as string

document.getElementById("particlesProjectDescriptionInline")!.innerHTML = marked(`
  Got a task to procrastinate on?  
  Check out the dedicated page for the particles demo, featuring customisation options such as:
  1. Particle count
  2. Particle colours
  3. Gravity strength
`.offsetIndent(2)) as string

document.getElementById("bslFeedProjectDescription")!.innerHTML = marked(`
  A TikTok-style feed for learning British Sign Language.
  `.offsetIndent(2)
) as string