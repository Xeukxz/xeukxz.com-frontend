import './DemoBox.css';

import { Engine } from '../../main';
import { CanvasManager } from '../../CanvasManager';

export class DemoBox<T extends Engine> extends HTMLElement {
  headerBar: HTMLDivElement;
  reloadButton: HTMLDivElement;
  collapseButton: HTMLDivElement;
  contentElement: HTMLDivElement;
  engine?: T;
  collapsed: boolean = false;
  constructor(public demoId: string, public title: string = "Demo", public infoTips: string[] = [], public engineClass: new (demoBox: DemoBox<T>, canvas: CanvasManager) => T) {
    super();
    
    this.innerHTML = `
      <div class="headerBar">
        <div class="title">
          ${this.title}
          <div class="info" tabindex="0" role="button" aria-label="Show demo information" aria-describedby="tooltip-${this.demoId}">
            <img class="infoIcon" src="/info.svg" alt="info" height="16" draggable="false" title="Info" />
            <div class="infoTooltip" id="tooltip-${this.demoId}" role="tooltip">
            ${this.infoTips.map(tip => `<p>${tip}</p>`).join('')}
            </div>
          </div>
          <img class="reloadIcon" src="/reload.svg" alt="reload" height="16" draggable="false" title="Reload Demo" tabindex="0" role="button" aria-label="Reload Demo" />
        </div>
        <img class="collapseIcon" src="/collapse.svg" alt="collapse" height="24" draggable="false" tabindex="0" title="Collapse Demo" role="button" aria-label="Collapse Demo" />
      </div>
      
      <div class="content">
        <canvas id="${this.demoId}Canvas" role="img" aria-label="Interactive ${this.title} demo"></canvas>
      </div>
    `;
    this.classList.add("demoBox");

    this.headerBar = this.querySelector(".headerBar")!;
    this.reloadButton = this.headerBar.querySelector(".reloadIcon")!;
    this.collapseButton = this.headerBar.querySelector(".collapseIcon")!;
    this.contentElement = this.querySelector(".content")!;

    // Add keyboard support for info tooltip
    const infoElement = this.headerBar.querySelector(".info")! as HTMLElement;
    infoElement.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") event.preventDefault();
      else if (event.key === "Escape") infoElement.blur(); // Hide tooltip
    });

    const toggleCollapse = () => {
      const headerBar = this.collapseButton.parentElement as HTMLElement;
      const demoBox = headerBar.parentElement as HTMLElement;
      this.collapsed = !this.collapsed;
      demoBox.classList.toggle("collapsed");
      this.collapseButton.classList.toggle("rotated");
      if(headerBar.parentElement!.classList.contains("collapsed")) this.engine?.pause();
      else this.engine?.unpause(250);
    }

    this.reloadButton.addEventListener("click", () => this.engine?.reload());
    this.reloadButton.addEventListener("keydown", (event) => {
      if(event.repeat) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        (event.target as HTMLElement).classList.add("active");
      } else if (event.key === "Escape") (event.target as HTMLElement).blur();
    });
    this.reloadButton.addEventListener("keyup", (event) => {
      if (event.key === "Enter" || event.key === " ") (event.target as HTMLElement).classList.remove("active"), this.reloadButton.click();
    });

    this.collapseButton.addEventListener("click", () => toggleCollapse());
    this.collapseButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") event.preventDefault(), this.collapseButton.click();
      else if (event.key === "Escape") (event.target as HTMLElement).blur();
    });

  }

  // initialize the engine once the element is connected to the DOM
  connectedCallback() {
    this.engine = new this.engineClass(this, new CanvasManager(document.querySelector(`#${this.demoId}Canvas`)!));
    this.engine?.run();
  }
}

customElements.define('demo-box', DemoBox/* , { extends: 'div' } */);