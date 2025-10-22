import { DemoLine } from './CustomElements/DemoLine/DemoLine';
import { DemoBox } from './CustomElements/DemoBox/DemoBox';
import { DemoDescription } from './CustomElements/DemoDescription/DemoDescription';
import { CodeSnippet } from './CustomElements/CodeSnippet/CodeSnippet';
import { ExternalLink } from './CustomElements/ExternalLink/ExternalLink';

import { BezierEngine } from './Demos/BezierDemo/BezierEngine';
import { ParticlesEngine } from './Demos/ParticlesDemo/ParticlesEngine';

import Prism from 'prismjs';
import { Engine } from './main';

const demosElement = document.querySelector('#demos') as HTMLElement;
const addDemoLine = (lineElement: DemoLine) => demosElement.appendChild(lineElement);
addDemoLine(
  new DemoLine("bezier", {
    box: new DemoBox<BezierEngine>("bezier", "Bézier Demo", [
      "Right Click: Add/Remove Point",
      "Drag: Move Point",
      "Tap (Mobile): Add/Remove Point"
    ], BezierEngine) as DemoBox<Engine>,

    description: new DemoDescription(`
      ## Bézier Curve
      The code snippet shown generates a Bézier curve from a set of points for time \`t\` where \`0 <= t <= 1\`.  
      My implementation uses a recursive function to interpolate between points until only one point remains. However, this is not the most efficient execution.
    `),

    codeSnippet: new CodeSnippet(`
      function recursiveLerp(points: Vector2[], t: number) {
        if(points.length === 1) return points[0]
        const newPoints: Vector2[] = []
        for(let i = 0; i < points.length - 1; i++) newPoints.push(points[i].lerp(points[i + 1], t))
        return recursiveLerp(newPoints, t)
      }
      function toBezier(points: Vector2[], step: number) {
        const bezierPoints: Vector2[] = []
        for(let t = 0; t < 1; t+=step) bezierPoints.push(recursiveLerp(points, t))
        return bezierPoints
      }
    `.trim(), Prism.languages.javascript, "javascript")
  }
))

addDemoLine(
  new DemoLine("particles", {
    box: new DemoBox<ParticlesEngine>("particles", "Particles Demo", [
      "Press: Move Particles",
    ], ParticlesEngine) as DemoBox<Engine>,
    
    description: new DemoDescription(`
      ## Particles
      The demo shown demonstrates a surprisingly performant particle simulation.
      
      With 50000 particles being computed each frame, most devices can handle it at 60fps.  
      ​  
      Unfortunately, due to abhorrent optimisation by the Mozilla team, Firefox-based browser performance is abysmal. Chromium-based browsers are recommended for best experience.
    `),

    link: new ExternalLink("./particles", "Try It Out In Fullscreen!", `
      Got a task to procrastinate on?  
      Check out the dedicated page for the particles demo, featuring customisation options such as:
      1. Particle count
      2. Particle colours
      3. Gravity strength
    `)
  }
));