import './CodeSnippet.css';
import Prism from 'prismjs'

export class CodeSnippet extends HTMLElement {
  constructor(public code: string, grammar: Prism.Grammar, language: string = 'javascript') {
    super();
    this.classList.add("codeSnippet");
    this.innerHTML = `<pre tabindex="-1"><code class="language-${language}">${Prism.highlight(code.stripIndent(), grammar, language)}</code></pre>`
    // this.innerHTML =  as string;
  }
}

customElements.define('code-snippet', CodeSnippet/* , { extends: 'div' } */);