import './chip.css';

export class Chip extends HTMLDivElement {
  constructor(text: string = '') {
    super();

    this.classList.add('chip');
    this.setAttribute('aria-hidden', 'true');

    this.innerHTML += `
      
      <div class="borderSvgEffect">
        <svg preserveAspectRatio="none" class="borderHighlightSvg" aria-hidden="true">
          <defs>
            <mask id="borderMask" maskUnits="objectBoundingBox" x="-50%" y="-50%" width="200%" height="200%">
              <rect x="0.5" y="0.5" width="calc(100% - 1px)" height="calc(100% - 1px)" rx="0.5em" ry="0.5em" fill="#ff" stroke="#fff" stroke-width="1" clip-path="url(#circleClip)"/>
            </mask>
          </defs>
          <g mask="url(#borderMask)" viewBox="0 0 100 100">
            <circle class="circleClipAnim" cx="50%" cy="50%" r="100" stroke="#4eafff" fill="#4eafff" mask="url(#borderMask)" filter="url(#f1)">
              <animate attributeName="r" values="20%;100%;20%" dur="8s" repeatCount="indefinite" />
            </circle>
            <circle class="circleClip" cx="1000" cy="1000" r="100" stroke="#4eafff" fill="#4eafff" mask="url(#borderMask)" filter="url(#f1)" />
          </g>
        </svg>
      </div>
      <div class="content">
        <h2>${text}</h2>
      </div>
      <svg class="wires" style="filter: drop-shadow(0 0 1px currentColor) drop-shadow(0 0 3px currentColor)" viewBox="0 0 400 400" preserveAspectRatio="none"  x="-50%" y="-50%" width="200%" height="200%" aria-hidden="true">
        <defs>
          <mask id="wiresMask" color="white" maskUnits="objectBoundingBox" x="-100%" y="-100%" width="400%" height="400%">
            ${paths}
          </mask>
        </defs>
        <g mask="url(#wiresMask)">
          <circle class="circleClipAnim" cx="200" cy="200" r="100" stroke="#4eafff" fill="#4eafff" filter="url(#f1)">
            <animate attributeName="r" values="40;200;40" dur="8s" repeatCount="indefinite" />
          </circle>
          <circle class="circleClip" cx="1000" cy="1000" r="50" stroke="#4eafff" fill="#4eafff" filter="url(#f2)" />
        </g>
      </svg>
    `
  }

  setText(text: string) {
    const h2 = this.querySelector('h2');
    if (h2) {
      h2.textContent = text;
    }
  }
}
/* 

      <svg class="wires"viewBox="0 0 400 400" preserveAspectRatio="none"  x="-50%" y="-50%" width="200%" height="200%">
        <g mask="url(#wiresMask)">
          <rect x="0" y="0" width="400" height="400" fill="rgba(78, 175, 255, 0.1)" />
        </g>
      </svg>
*/

customElements.define('panel-3', Chip, { extends: 'div' });

const paths = `
<circle class="wireCircle" cx="90" cy="90" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="45" cy="45" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="20" cy="20" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="125" cy="35" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="150" cy="20" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="175" cy="35" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="175" cy="70" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="270" cy="20" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="250" cy="40" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="270" cy="60" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="270" cy="80" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="290" cy="40" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="310" cy="20" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="325" cy="60" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="340" cy="20" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="380" cy="20" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="340" cy="125" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="380" cy="60" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="380" cy="140" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="380" cy="182.5" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="340" cy="182.5" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="320" cy="200" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="360" cy="182.5" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="320" cy="240" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="350" cy="260" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="340" cy="240" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="360" cy="225" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="320" cy="320" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="360" cy="300" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="380" cy="340" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="380" cy="380" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="240" cy="360" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="380" cy="360" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="240" cy="340" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="270" cy="320" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="250" cy="320" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="240" cy="380" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="120" cy="360" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="190" cy="330" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="170" cy="345" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="150" cy="330" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="120" cy="320" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="120" cy="340" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="40" cy="360" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="80" cy="340" r="7" stroke-width="2" stroke="currentColor" fill="none" /> 
<circle class="wireCircle" cx="80" cy="320" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="60" cy="320" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="65" cy="255" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="180" cy="380" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="20" cy="220" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="20" cy="190" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="20" cy="160" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="20" cy="120" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="60" cy="160" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="20" cy="70" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="45" cy="70" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="70" cy="70" r="7" stroke-width="2" stroke="currentColor" fill="none" />

<path class="wireLine" d="
  M 95 95 l 55 55
  M 52 45 l 20 0 l 40 40 l 0 20 l 45 45
  M 27 20 l 50 0 l 50 50 l 0 43 l 37 37
  M 130 40 l 8.5 8.5 l 0 69 l 32 32
  M 150 27 l 0 95 l 28 28
  M 170 40 l -8.5 8.5 l 0 78 l 23 23
  M 180 75 l 10 10 l 0 65
  M 263 20 l -40 0 l -20 20 l 0 110
  M 243 40 l -10 0 l -20 20 l 0 90
  M 263 60 l -20 0 l -20 20 l 0 70
  M 263 80 l -20 0 l -10 10 l 0 60
  M 290 47 l 0 56 l -47 47
  M 310 27 l 0 63 l -60 60
  M 325 67 l 0 27.5 l -20 20 l -12 0 l -43 43
  M 340 27 l 0 70 l -30 30 l -22 0 l -38 38
  M 375 25 l -15 15 l 0 65 l -15 15
  M 380 67 l 0 45 l -30 30 l -69 0 l -31 31
  M 375 145 l -10 10 l -89 0 l -26 26
  M 375 177.5 l -10 -10 l -94 0 l -21 21
  M 333 182.5 l -70 0 l -13 13
  M 313 200 l -63 0
  M 360 189.5 l 0 12.5 l -15 15 l -95 0
  M 313 240 l -52 0 l -11 -11
  M 343 260 l -69 0 l -24 -24
  M 347 240 l 10 0 l 10 10 l 0 20 l -10 10 l -70 0 l -37 -37
  M 365 230 l 15 15 l 0 65 l -10 10 l -42.5 0
  M 353 300 l -53 0 l -50 -50
  M 373 340 l -65 0 l -25 -25 l 0 -25 l -40 -40
  M 373 380 l -80 0 l -20 -20 l -25 0
  M 373 360 l -70 0 l -20 -20 l -35 0
  M 270 313 l 0 -29 l -34 -34
  M 245 315 l -5 -5 l 0 -49 l -11 -11
  M 235 375 l -10 -10 l 0 -115
  M 127 360 l 70 0 l 10 -10 l 0 -100
  M 185 325 l -7.5 -7.5 l 0 -30 l 15 -15 l 0 -22
  M 170 338 l 0 -53 l 15 -15 l 0 -20
  M 155 325 l 7.5 -7.5 l 0 -35 l 15 -15 l 0 -18
  M 125 335 l 10 -10 l 0 -46 l 29 -29
  M 120 313 l 0 -26 l 37 -37
  M 47 360 l 40 0 l 10 -10 l 0 -47 l 53 -53
  M 80 313 l 0 -20 l 10 -10 l 20 0 l 40 -40
  M 60 313 l 0 -25 l 20 -20 l 38 0 l 32 -32
  M 72 255 l 52 0 l 26 -26
  M 73 340 l -23 0 l -10 -10 l 0 -75 l 20 -20 l 77 0 l 13 -13
  M 173 380 l -143 0 l -10 -10 l 0 -125 l 30 -30 l 100 0
  M 25 215 l 15 -15 l 110 0
  M 27 190 l 123 0
  M 25 165 l 15 15 l 110 0
  M 25 125 l 30 30
  M 20 77 l 0 20 l 60 60 l 56 0 l 14 14
  M 45 77 l 0 20 l 40 40 l 38 0 l 27 27
  M 70 77 l 0 20 l 20 20 l 20 0 l 40 40
" stroke-width="2" stroke="currentColor" fill="none" />

<rect x="150" y="150" width="100" height="100" stroke-width="2" stroke="currentColor" fill="none" />
<rect x="155" y="155" width="90" height="90" stroke-width="2" stroke="currentColor" fill="none" />

<text x="200" y="205" text-anchor="middle" font-size="20" fill="currentColor" font-family="Eras Bold ITC, system-ui, Avenir, Helvetica, Arial, sans-serif">Xeukxz</text>
`;

/* 
Original SVG Paths:

<circle class="wireCircle" cx="90" cy="90" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 95 95 l 20 20" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="45" cy="45" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 52 45 l 20 0 l 40 40 l 0 30" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="20" cy="20" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 27 20 l 50 0 l 50 50 l 0 50" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="125" cy="35" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 130 40 l 8.5 8.5 l 0 70" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="150" cy="20" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 150 27 l 0 90 " stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="175" cy="35" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 170 40 l -8.5 8.5 l 0 70" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="175" cy="70" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 180 75 l 10 10 l 0 30" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="270" cy="20" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 263 20 l -40 0 l -20 20 l 0 80" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="250" cy="40" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 243 40 l -10 0 l -20 20 l 0 60" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="270" cy="60" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 263 60 l -20 0 l -20 20 l 0 40" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="270" cy="85" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 263 85 l -10 0 l -10 10 l 0 20" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="290" cy="40" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 290 47 l 0 70" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="310" cy="20" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 310 27 l 0 63 l -30 30" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="325" cy="60" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 325 67 l 0 27.5 l -20 20 l -15 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="340" cy="20" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 340 27 l 0 70 l -30 30 l -30 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="380" cy="20" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 375 25 l -15 15 l 0 65 l -15 15" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="340" cy="125" r="7" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="380" cy="60" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 380 67 l 0 45 l -30 30 l -70 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="380" cy="140" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 375 145 l -10 10 l -70 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="380" cy="182.5" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 375 177.5 l -10 -10 l -70 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="340" cy="182.5" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 333 182.5 l -40 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="320" cy="200" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 313 200 l -20 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="360" cy="182.5" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 360 189.5 l 0 12.5 l -15 15 l -60 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="320" cy="240" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 313 240 l -20 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="350" cy="260" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 343 260 l -60 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="340" cy="240" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 347 240 l 10 0 l 10 10 l 0 20 l -10 10 l -60 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="360" cy="225" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 365 230 l 15 15 l 0 65 l -10 10 l -42.2 0" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="320" cy="320" r="7" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="360" cy="300" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 353 300 l -53 0 l -10 -10" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="380" cy="340" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 373 340 l -65 0 l -25 -25 l 0 -20" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="380" cy="380" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 373 380 l -80 0 l -20 -20 l -25 0" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="240" cy="360" r="7" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="380" cy="360" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 373 360 l -70 0 l -20 -20 l -35 0" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="240" cy="340" r="7" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="270" cy="320" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 270 313 l 0 -20" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="250" cy="320" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 245 315 l -5 -5 l 0 -10" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="240" cy="380" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 235 375 l -10 -10 l 0 -65" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="120" cy="360" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 127 360 l 70 0 l 10 -10 l 0 -60" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="190" cy="330" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 185 325 l -7.5 -7.5 l 0 -50" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="170" cy="345" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 170 338 l 0 -50" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="150" cy="330" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 155 325 l 7.5 -7.5 l 0 -50" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="120" cy="320" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 120 313 l 0 -30" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="120" cy="340" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 125 335 l 10 -10 l 0 -40" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="40" cy="360" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 47 360 l 40 0 l 10 -10 l 0 -47 l 10 -10" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="80" cy="340" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 73 340 l -23 0 l -10 -10 l 0 -75 l 20 -20 l 50 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="80" cy="320" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 80 313 l 0 -20 l 10 -10 l 20 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="60" cy="320" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 60 313 l 0 -25 l 20 -20 l 30 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="65" cy="255" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 72 255 l 40 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="180" cy="380" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 173 380 l -143 0 l -10 -10 l 0 -125 l 30 -30 l 60 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="20" cy="220" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 25 215 l 15 -15 l 70 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="20" cy="190" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 27 190 l 80 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="20" cy="160" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 25 165 l 15 15 l 70 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="20" cy="120" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 25 125 l 30 30" stroke-width="2" stroke="currentColor" fill="none" />
<circle class="wireCircle" cx="60" cy="160" r="7" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="20" cy="70" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 20 77 l 0 20 l 60 60 l 30 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="45" cy="70" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 45 77 l 0 20 l 40 40 l 30 0" stroke-width="2" stroke="currentColor" fill="none" />

<circle class="wireCircle" cx="70" cy="70" r="7" stroke-width="2" stroke="currentColor" fill="none" />
<path class="wireLine" d="M 70 77 l 0 20 l 20 20 l 20 0" stroke-width="2" stroke="currentColor" fill="none" />

*/