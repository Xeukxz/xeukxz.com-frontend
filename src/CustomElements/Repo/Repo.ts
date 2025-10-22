import './Repo.css';

let repoCount = 0;

export class Repo extends HTMLDivElement {
  constructor(private repoName: string, private repoDescription: string, private repoLink: string) {
    super();
    this.classList.add("repo");
    this.render();
  }

  private render() {
    this.innerHTML = `
      <div class="borderSvgEffect" aria-hidden="true">
        <svg preserveAspectRatio="none" class="borderHighlightSvg">
          <defs>
            <mask id="borderMaskRepo${repoCount}" maskUnits="objectBoundingBox" x="-50%" y="-50%" width="200%" height="200%">
              <rect x="0.5" y="0.5" width="calc(100% - 1px)" height="calc(100% - 1px)" rx="0.5em" ry="0.5em" fill="#ff" stroke="#fff" stroke-width="1" clip-path="url(#circleClip)"/>
            </mask>
          </defs>
          <circle class="circleClip" cx="0" cy="0" r="100" stroke="var(--primary)" fill="var(--primary)" mask="url(#borderMaskRepo${repoCount})" filter="url(#f1)">
              <animate attributeName="r" values="50;100;50" dur="8s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
      <div class="content">
        <div class="info">
          <h2 class="projectTitle">
            ${this.repoName}
            <img class="linkIcon" src="github-mark-white.svg" alt="link" height="24" draggable="false" />
          </h2>
          <p>${this.repoDescription}</p>
        </div>
        <a href="${this.repoLink}" target="_blank">
          View Repo
        </a>
      </div>
    `;
    repoCount++;
  }
}

customElements.define('repo-card', Repo, { extends: 'div' });