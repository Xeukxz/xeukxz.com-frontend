import './DemoDescription.css';
import { marked } from 'marked'

export class DemoDescription extends HTMLElement {
  constructor(public text: string) {
    super();
    this.classList.add("demoDescription");
    this.classList.add("markdown");

    // remove the minimum indentation from each line and render the markdown
    this.innerHTML = marked(text.stripIndent()) as string;
  }
}

customElements.define('demo-description', DemoDescription/* , { extends: 'div' } */);