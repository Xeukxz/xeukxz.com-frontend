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
          <div class="info">
            <img class="infoIcon" src="/info.svg" alt="info" height="16" draggable="false" />
            <div class="infoTooltip">
            ${this.infoTips.map(tip => `<p>${tip}</p>`).join('')}
            </div>
          </div>
          <img class="reloadIcon" src="/reload.svg" alt="reload" height="16" draggable="false" />
        </div>
        <img class="collapseIcon" src="/collapse.svg" alt="collapse" height="24" draggable="false" tabindex="0" />
      </div>
      
      <div class="content">
        <canvas id="${this.demoId}Canvas"></canvas>
      </div>
    `;
    this.classList.add("demoBox");

    this.headerBar = this.querySelector(".headerBar")!;
    this.reloadButton = this.headerBar.querySelector(".reloadIcon")!;
    this.collapseButton = this.headerBar.querySelector(".collapseIcon")!;
    this.contentElement = this.querySelector(".content")!;

    
    this.collapseButton.addEventListener("click", () => {
      const headerBar = this.collapseButton.parentElement as HTMLElement;
      const demoBox = headerBar.parentElement as HTMLElement;
      this.collapsed = !this.collapsed;
      demoBox.classList.toggle("collapsed");
      this.collapseButton.classList.toggle("rotated");
    });

    this.collapseButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        this.collapseButton.click();
      }
    });

  }

  // initialize the engine once the element is connected to the DOM
  connectedCallback() {
      this.engine = new this.engineClass(this, new CanvasManager(document.querySelector(`#${this.demoId}Canvas`)!));
      this.engine?.run();
  }
}

customElements.define('demo-box', DemoBox/* , { extends: 'div' } */);