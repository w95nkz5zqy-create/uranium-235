// Sandboxels Box Fill Tool - Simple Version
console.log('Box Fill Tool: Starting...');

let boxFillActive = false;
let startPos = null;
let isDrawingBox = false;

document.addEventListener('keydown', (e) => {
  if (e.key === 'b' || e.key === 'B') {
    boxFillActive = !boxFillActive;
    console.log('Box Fill Tool: ' + (boxFillActive ? 'ENABLED' : 'DISABLED'));
  }
});

document.addEventListener('mousedown', (e) => {
  if (boxFillActive && e.button === 0) {
    isDrawingBox = true;
    startPos = { x: e.clientX, y: e.clientY };
    console.log('Started box at:', startPos);
  }
});

document.addEventListener('mouseup', (e) => {
  if (isDrawingBox && startPos) {
    const endPos = { x: e.clientX, y: e.clientY };
    isDrawingBox = false;
    console.log('Box fill released:', startPos, 'to', endPos);
    startPos = null;
  }
});

console.log('Box Fill Tool loaded! Press B to toggle.');
