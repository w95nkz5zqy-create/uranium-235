// Sandboxels Box Fill Tool
// Click and drag to draw a rectangle, release to fill with selected element

if (typeof drawer !== 'undefined') {
  let boxFillActive = false;
  let startPos = null;
  let isDrawingBox = false;

  // Override the drawing behavior
  const originalDraw = drawer.draw;
  drawer.draw = function(mouseX, mouseY) {
    // Call original draw
    if (originalDraw) originalDraw.call(this, mouseX, mouseY);
  };

  // Listen for box fill mode
  document.addEventListener('keydown', (e) => {
    if (e.key === 'b' || e.key === 'B') {
      boxFillActive = !boxFillActive;
      console.log('Box Fill Tool: ' + (boxFillActive ? 'ENABLED' : 'DISABLED'));
    }
  });

  // Mouse events for box drawing
  document.addEventListener('mousedown', (e) => {
    if (boxFillActive && e.button === 0) {
      isDrawingBox = true;
      startPos = { x: e.clientX, y: e.clientY };
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (isDrawingBox && drawer) {
      // Visual feedback - you can add canvas drawing here later
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (isDrawingBox && startPos && drawer) {
      const endPos = { x: e.clientX, y: e.clientY };
      
      // Convert screen coords to game grid coords
      const x1 = Math.floor(startPos.x / pixelSize);
      const y1 = Math.floor(startPos.y / pixelSize);
      const x2 = Math.floor(endPos.x / pixelSize);
      const y2 = Math.floor(endPos.y / pixelSize);
      
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      
      // Fill the box with the currently selected element
      if (elements[currentElement]) {
        for (let x = minX; x <= maxX; x++) {
          for (let y = minY; y <= maxY; y++) {
            changePixel(x, y, currentElement);
          }
        }
      }
      
      isDrawingBox = false;
      startPos = null;
    }
  });

  console.log('Box Fill Tool loaded! Press B to toggle. Click and drag to fill.');
} else {
  console.error('Box Fill Tool: Could not load - drawer not found');
}
