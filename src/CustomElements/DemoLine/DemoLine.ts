import './DemoLine.css';

import { Engine } from '../../main';
import { DemoBox } from '../DemoBox/DemoBox';
import { DemoDescription } from '../DemoDescription/DemoDescription';
import { CodeSnippet } from '../CodeSnippet/CodeSnippet';
import { ExternalLink } from '../ExternalLink/ExternalLink';

type DemoLineComponents = {
  box: DemoBox<Engine>,
  description: DemoDescription,
} & ({ // code snippet or link, not both
  codeSnippet: CodeSnippet,
} | {
  link: ExternalLink,
})

export class DemoLine extends HTMLElement {
  constructor(demoType: string, {...components}: DemoLineComponents) {
    super();
    
    this.id = `${demoType}DemoLine`;
    this.classList.add('demoLine');
    this.appendChild(components.box);
    this.appendChild(components.description);
    if ('codeSnippet' in components) this.appendChild(components.codeSnippet);
    else if ('link' in components) this.appendChild(components.link);

  }
}

customElements.define('demo-line', DemoLine);