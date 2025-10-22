import './ExternalLink.css';
import { marked } from 'marked';

let linkCount = 0;

export class ExternalLink extends HTMLAnchorElement {
  constructor(public href: string, public title: string, text: string) {
    super();
    this.classList.add("externalLink");
    this.href = href;
    this.target = "_blank";
    // this.innerHTML = `
    // <div class="holder">
    //   <div class="borderHighlight"></div>
    //     <div class="content">
    //       <h2 class="projectTitle">
    //         ${title}
    //         <img class="linkIcon" src="externalLink.svg" alt="link" height="24" draggable="false" />
    //       </h2>
    //       <div class="projectDescription markdown" id="particlesProjectDescriptionInline">${marked(text.stripIndent())}</div>
    //     </div>
    //   </div>
    // `;
    this.innerHTML = `
      <div class="borderSvgEffect">
        <svg preserveAspectRatio="none" class="borderHighlightSvg">
          <defs>
            <mask id="borderMask${linkCount}" maskUnits="objectBoundingBox" x="-50%" y="-50%" width="200%" height="200%">
              <rect x="0.5" y="0.5" width="calc(100% - 1px)" height="calc(100% - 1px)" rx="0.5em" ry="0.5em" fill="#ff" stroke="#fff" stroke-width="1" clip-path="url(#circleClip)"/>
            </mask>
          </defs>
          <circle class="circleClip" cx="0" cy="0" r="100" stroke="var(--primary)" fill="var(--primary)" mask="url(#borderMask${linkCount})" filter="url(#f1)">
              <animate attributeName="r" values="50;100;50" dur="8s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      <div class="content">
        <h2 class="projectTitle">
          ${title}
          <img class="linkIcon" src="externalLink.svg" alt="link" height="24" draggable="false" />
        </h2>
        <div class="projectDescription markdown" id="particlesProjectDescriptionInline">${marked(text.stripIndent())}</div>
      </div>
      `
      linkCount++;
  }
}

customElements.define('external-link', ExternalLink, { extends: 'a' });