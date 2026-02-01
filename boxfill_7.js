// Sandboxels Box Fill Tool v7 - Actually fills pixels!
(function() {
  console.log('Box Fill Tool v7: Starting...');

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
      console.log('Box started at:', startPos);
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (isDrawingBox && startPos) {
      const endPos = { x: e.clientX, y: e.clientY };
      console.log('Box released. Filling from', startPos, 'to', endPos);
      
      // Convert screen coordinates to game grid coordinates
      const pSize = window.pixelSize || 1;
      const x1 = Math.floor(startPos.x / pSize);
      const y1 = Math.floor(startPos.y / pSize);
      const x2 = Math.floor(endPos.x / pSize);
      const y2 = Math.floor(endPos.y / pSize);
      
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      
      console.log(`Filling box from (${minX}, ${minY}) to (${maxX}, ${maxY})`);
      
      // Fill the box with currently selected element
      if (window.createPixel && window.currentElement) {
        let pixelsCreated = 0;
        for (let x = minX; x <= maxX; x++) {
          for (let y = minY; y <= maxY; y++) {
            try {
              window.createPixel(x, y, window.currentElement);
              pixelsCreated++;
            } catch (err) {
              // Silently skip errors
            }
          }
        }
        console.log(`Created ${pixelsCreated} pixels`);
      } else {
        console.error('Missing: createPixel or currentElement');
      }
      
      isDrawingBox = false;
      startPos = null;
    }
  });

  console.log('Box Fill Tool v7 loaded! Press B to toggle. Click and drag to fill.');
})();
