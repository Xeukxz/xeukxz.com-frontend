import { Chip } from './CustomElements/chip/chip';

const isMobile = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent) || window.matchMedia('(pointer: coarse)').matches;

const chip = new Chip("");
document.querySelector('#chipZone')?.appendChild(chip);

let lastX = 0;
let lastY = 0;
let targetX = 0;
let targetY = 0;
let isMoving = false;
let forceInactive = false;

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

const animate = () => {
  if (!isMoving) return;
  // console.log(isMoving)

  // ease global pointer towards mouse target
  lastX += (targetX - lastX) * 0.1;
  lastY += (targetY - lastY) * 0.1;

  document.querySelectorAll('.chip').forEach((p) => {
    const panel = p as Chip;
    const rect = panel.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const isActive = panel.matches(':hover') && !forceInactive;

    // per-panel hover factor (0..1) stored in dataset for smooth easing
    const prevHF = parseFloat((panel as HTMLElement).dataset.hoverFactor || '0');
    const targetHF = isActive ? 1 : 0;
    const hoverFactor = prevHF + (targetHF - prevHF) * 0.15;
    (panel as HTMLElement).dataset.hoverFactor = String(hoverFactor);

    // per-panel Z (translateZ) smoothing stored in dataset
    const prevPz = parseFloat((panel as HTMLElement).dataset.pz || '0');
    const targetPz = isActive ? 100 : 0;
    const pz = prevPz + (targetPz - prevPz) * 0.15;
    (panel as HTMLElement).dataset.pz = String(pz);

    // decide which position to use:
    // - if hovered, follow the (smoothed) mouse position (lastX/lastY)
    // - if not hovered, don't follow mouse: use the panel center so rotation returns to 0
    // const posX = isActive ? lastX : rect.left + centerX;
    // const posY = isActive ? lastY : rect.top + centerY;

    const posX = lastX;
    const posY = lastY;

    const x = posX - rect.left; // x position within the element.
    const y = posY - rect.top;  // y position within the element.

    // normalized deltas in range [-1, 1]
    const rawDeltaX = (x - centerX) / centerX;
    const rawDeltaY = (y - centerY) / centerY;
    const deltaX = clamp(rawDeltaX, -1, 1);
    const deltaY = clamp(rawDeltaY, -1, 1);

    const maxTilt = 10; // degrees
    // apply hoverFactor so rotation eases to 0 when not hovered
    const rotateX = deltaY * maxTilt * hoverFactor; // positive -> tilt down
    const rotateY = deltaX * maxTilt * hoverFactor; // positive -> tilt right

    if(Math.abs(rotateX) < 0.01 && Math.abs(rotateY) < 0.01 && pz < 0.5) {
      // if very close to neutral, just set to neutral and stop animating
      (panel as HTMLElement).style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0px)`;
      isMoving = false;
      return;
    }

    // console.log('rotateX', rotateX, 'rotateY', rotateY, 'pz', pz, 'hoverFactor', hoverFactor, 'deltaX', deltaX, 'deltaY', deltaY,);

    (panel as HTMLElement).style.transform = `rotateX(${ -rotateX }deg) rotateY(${ rotateY }deg) translateZ(${ pz }px)`;

    // (optional) shadow calculations left unchanged but scaled by hoverFactor if desired
    const maxShadowOffsetEm = 1.2;
    const offsetX = clamp(-deltaX * maxShadowOffsetEm, -maxShadowOffsetEm, maxShadowOffsetEm) * hoverFactor;
    const offsetY = clamp(deltaY * maxShadowOffsetEm, -maxShadowOffsetEm, maxShadowOffsetEm) * hoverFactor;
    // chip.setText(`${chip.matches(':hover') && !forceInactive}, ${chip.dataset.hoverFactor}`)
  });

  requestAnimationFrame(animate);
}

chip.addEventListener('mousemove', (event) => {
  (chip.querySelector('.content') as HTMLElement).style.transform = 'translateZ(100px)';
  (chip.querySelector('.borderSvgEffect') as HTMLElement).style.transform = 'translateZ(300px)';
  forceInactive = false;
  targetX = event.clientX;
  targetY = event.clientY;
  if (!isMoving && document.querySelector('.chip:hover')) {
    isMoving = true;
    animate();
  }
})

chip.addEventListener('mouseleave', (event) => {
  (chip.querySelector('.content') as HTMLElement).style.transform = 'translateZ(0px)';
  (chip.querySelector('.borderSvgEffect') as HTMLElement).style.transform = 'translateZ(0px)';
  forceInactive = true;
});

chip.addEventListener('touchmove', (event) => {
  (chip.querySelector('.content') as HTMLElement).style.transform = 'translateZ(100px)';
  (chip.querySelector('.borderSvgEffect') as HTMLElement).style.transform = 'translateZ(300px)';
  forceInactive = false;
  event.preventDefault();
  if (event.touches.length > 0) {
    targetX = event.touches[0].clientX;
    targetY = event.touches[0].clientY;
    if (!isMoving && document.querySelector('.chip:hover')) {
      isMoving = true;
      animate();
    }
  }
})

document.addEventListener('touchmove', (event) => {
  
  chip.querySelectorAll('.circleClip').forEach((element) => {
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
        clip.setAttribute('cx', `${(event.touches[0].clientX - bounds.left) * scaleX + vbX}`);
        clip.setAttribute('cy', `${(event.touches[0].clientY - bounds.top) * scaleY + vbY}`);
      } else {
        clip.setAttribute('cx', `${event.touches[0].clientX - bounds.left}`);
        clip.setAttribute('cy', `${event.touches[0].clientY - bounds.top}`);
      }
    }
  })
});

chip.addEventListener('touchend', (event) => {
  // targetX = 10000;
  // targetY = 10000;
  // if (event.touches.length == 0) {
  //   isMoving = false;
  // } else {
  //   targetX = event.touches[0].clientX;
  //   targetY = event.touches[0].clientY;
  // }
  // isMoving = false;
  // force disable :hover state on touchend
  forceInactive = true;
  (chip.querySelector('.content') as HTMLElement).style.transform = 'translateZ(0px)';
  (chip.querySelector('.borderSvgEffect') as HTMLElement).style.transform = 'translateZ(0px)';

});

chip.addEventListener('touchcancel', (event) => {
  forceInactive = true;
  (chip.querySelector('.content') as HTMLElement).style.transform = 'translateZ(0px)';
  (chip.querySelector('.borderSvgEffect') as HTMLElement).style.transform = 'translateZ(0px)';
});

chip.addEventListener('click', (event) => {
  if(!isMobile) return;
  // only trigger if not moving
  if (isMoving) {
    forceInactive = true;
    (chip.querySelector('.content') as HTMLElement).style.transform = 'translateZ(0px)';
    (chip.querySelector('.borderSvgEffect') as HTMLElement).style.transform = 'translateZ(0px)';
  }
});