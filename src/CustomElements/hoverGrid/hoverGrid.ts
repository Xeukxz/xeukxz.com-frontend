import './hoverGrid.css'

export class HoverGrid extends HTMLDivElement {
  svg: SVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  path: SVGPathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  defs: SVGDefsElement = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
  mask: SVGMaskElement = document.createElementNS('http://www.w3.org/2000/svg', 'mask')
  
  circle: SVGCircleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circleAnim: SVGAnimateElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
  // smoothAnimX: SVGAnimateElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate')
  // smoothAnimY: SVGAnimateElement = document.createElementNS('http://www.w3.org/2000/svg', 'animate')

  dotGroup: SVGGElement = document.createElementNS('http://www.w3.org/2000/svg', 'g');

  constructor(public color: string = 'rgba(255, 255, 255, 0.1)', public effectRadius: number = 400) {
    super();
    this.className = 'hoverGrid';

    this.path.setAttribute('fill', 'none');
    this.path.setAttribute('stroke', color);
    this.path.setAttribute('stroke-width', '1');
    this.path.setAttribute('shape-rendering', 'crispEdges');
    this.path.setAttribute('vector-effect', 'non-scaling-stroke');

    this.mask.setAttribute('id', 'grid-mask');
    this.mask.setAttribute('maskUnits', 'userSpaceOnUse');
    this.mask.setAttribute('x', '0');
    this.mask.setAttribute('y', '0');

    this.defs.innerHTML += `
      <radialGradient id="gradient">
        <stop offset="0%" stop-color="rgba(78, 175, 255, 0.5)" />
        <stop offset="100%" stop-color="transparent" />
      </radialGradient>
      `;

    this.mask.appendChild(this.path);
    this.defs.appendChild(this.mask);
    this.svg.appendChild(this.defs);
    this.svg.appendChild(this.dotGroup);
    this.svg.setAttribute('aria-hidden', 'true');

    this.circle.setAttribute('r', this.effectRadius.toString());
    this.circle.setAttribute('cx', '50%');
    this.circle.setAttribute('cy', '50%');
    this.circle.setAttribute('fill', 'url(#gradient)');
    this.circle.setAttribute('mask', 'url(#grid-mask)');

    this.circleAnim.setAttribute('attributeName', 'r');
    this.circleAnim.setAttribute('dur', '8s');
    this.circleAnim.setAttribute('repeatCount', 'indefinite');
    this.circleAnim.setAttribute('values', `${this.effectRadius/5};${this.effectRadius};${this.effectRadius/5}`);

    this.circle.appendChild(this.circleAnim);
    // this.circle.appendChild(this.smoothAnimX);
    // this.circle.appendChild(this.smoothAnimY);

    this.svg.appendChild(this.circle);
    this.appendChild(this.svg);
  }

  drawGrid(dotSquareSize: number, lineSquareSize: number = dotSquareSize * 2) {
    
    this.svg.setAttribute('width', window.innerWidth.toString())
    this.svg.setAttribute('height', window.innerHeight.toString())
    // this.svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`)

    // build a single path containing all vertical and horizontal grid lines
    const dParts: string[] = []
    for (let x = Math.floor((window.innerWidth % lineSquareSize) / 2); x < window.innerWidth; x += lineSquareSize) {
      const xx = x + 0.5 // offset to hit pixel grid
      dParts.push(`M ${xx} 0.5 L ${xx} ${window.innerHeight}`)
    }
    for (let y = Math.floor((window.innerHeight % lineSquareSize) / 2); y < window.innerHeight; y += lineSquareSize) {
      const yy = y + 0.5
      dParts.push(`M 0.5 ${yy} L ${window.innerWidth} ${yy}`)
    }

    this.path.setAttribute('d', dParts.join(' '))
    this.mask.setAttribute('width', window.innerWidth.toString())
    this.mask.setAttribute('height', window.innerHeight.toString())

    // clear out old dots
    while (this.dotGroup.firstChild) {
      this.dotGroup.removeChild(this.dotGroup.firstChild);
    }

    // put 2r circles onn each intersection
    for (let x = Math.floor((window.innerWidth % dotSquareSize) / 2); x < window.innerWidth; x += dotSquareSize) {
      for (let y = Math.floor((window.innerHeight % dotSquareSize) / 2); y < window.innerHeight; y += dotSquareSize) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', (x + 0.5).toString());
        circle.setAttribute('cy', (y + 0.5).toString());
        circle.setAttribute('r', '1');
        circle.setAttribute('fill', '#ffffff0F');
        this.dotGroup.appendChild(circle);
      }
    }
  }

  setCirclePosition(x: number, y: number, smoothDuration?: number) {
    this.circle.setAttribute('cx', x.toString());
    this.circle.setAttribute('cy', y.toString());

    // cet radius based on distance to center
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
    const radius = this.effectRadius * (1-((distance / maxDistance)/2));
    // console.log('distance', distance, 'maxDistance', maxDistance, 'radius', radius, 1-((distance / maxDistance)/2));
    // this.circle.setAttribute('r', radius.toString());
    this.circleAnim.setAttribute('values', `${radius/5};${radius};${radius/5}`);
  }
}

customElements.define('hover-grid', HoverGrid, { extends: 'div' });