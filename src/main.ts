/**
 * Ideas
 * - project demos
 * - terminal
 * 
 * TODO: Fix pausing issues when switching tab
 * TODO: Pause particles when not interacting
 * 
 */
import './GlobalCss/style.css';
import './GlobalCss/prism-vsc-dark-plus.css';
import './GlobalCss/prism-material-light.css';
import './GlobalCss/markdownPatches.css';


import './utils' // to add custom methods to prototypes

import { BezierEngine } from './Demos/BezierDemo/BezierEngine';
import { ParticlesEngine } from './Demos/ParticlesDemo/ParticlesEngine';
export type Engine = BezierEngine | ParticlesEngine

import { HoverGrid } from './CustomElements/hoverGrid/hoverGrid';

import './RenderIntro'
import './RenderDemos'
import './RenderProjects'
import './handleChip'


const hoverGrid = new HoverGrid('rgba(78, 175, 255, 1)', 400);
document.body.appendChild(hoverGrid);
hoverGrid.drawGrid(70, 70);

// initial visibility check
checkVisibility();

// on hover of any .info, show the .info-content
document.addEventListener("mouseover", (event) => {
  if (!(event.target instanceof HTMLElement)) return;
  if (!event.target.classList.contains("info")) return;
  event.target.querySelector(".info-content")?.classList.add("show");
});

const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent) || window.matchMedia('(pointer: coarse)').matches;

if (!isMobile) {
  document.addEventListener('mousemove', (event) => {
    hoverGrid.setCirclePosition(event.clientX, event.clientY);
    // console.log(document.querySelectorAll('.visible .circleClip'));
    document.querySelectorAll('.visible .circleClip').forEach((element) => {
      // set ::before element's position to mouse position
      // const rect = panel.getBoundingClientRect();
      const clip = element as SVGCircleElement
      if (clip) {
        // console.log('Before Element:', clip);
        // console.log(clip.parentElement?.tagName)
        const bounds = (clip.parentElement?.tagName == "g" ? clip.parentElement.parentElement : clip.parentElement)!.getBoundingClientRect();
        // const bounds = clip.parentElement!.getBoundingClientRect();
        // console.log('Bounds:', bounds);
        const viewBoxData = (clip.parentElement?.tagName == "g" ? clip.parentElement.parentElement : clip.parentElement)!.getAttribute('viewBox')?.split(' ').map(v => parseFloat(v));
        if(viewBoxData) {
          const vbX = viewBoxData[0];
          const vbY = viewBoxData[1];
          const vbWidth = viewBoxData[2];
          const vbHeight = viewBoxData[3];
          // console.log('ViewBox:', vbX, vbY, vbWidth, vbHeight);
          const scaleX = vbWidth / bounds.width;
          const scaleY = vbHeight / bounds.height;
          clip.setAttribute('cx', `${(event.clientX - bounds.left) * scaleX + vbX}`);
          clip.setAttribute('cy', `${(event.clientY - bounds.top) * scaleY + vbY}`);
        } else {
          clip.setAttribute('cx', `${event.clientX - bounds.left}`);
          clip.setAttribute('cy', `${event.clientY - bounds.top}`);
        }
      }
    })
  });

  window.addEventListener('mouseout', (event) => {
    if((event.target as HTMLElement).tagName === 'BODY') hoverGrid.setCirclePosition(window.innerWidth / 2, window.innerHeight / 2, 1000);
  });
}

function checkVisibility() {
  document.querySelectorAll('.demoBox, .externalLink, .chip, .repo').forEach((element) => {
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    element.classList.toggle('visible', isVisible);
    element.classList.toggle('notVisible', !isVisible);

    if(element.classList.contains('demoBox')) {
      const demoBox = element as HTMLElement;
      const engine = (demoBox as any).engine as Engine | undefined;
      if(!engine) return;
      if(isVisible) {
        engine.unpause();
      } else {
        engine.pause();
      }
    }
  });
}

document.addEventListener('scroll', (event) => {
  checkVisibility();
});

// set --viewWidthPx CSS variable
document.documentElement.style.setProperty('--viewWidthPx', `${window.innerWidth}`);
window.addEventListener('resize', () => {
  document.documentElement.style.setProperty('--viewWidthPx', `${window.innerWidth}`);
});