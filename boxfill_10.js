// Sandboxels Box Fill Tool v10 - Better debugging and pixel size adaptation
(function() {
  console.log('Box Fill Tool v10: Starting...');
  console.log('pixelSize:', window.pixelSize);
  console.log('currentPixels:', window.currentPixels);

  let boxFillActive = false;
  let startPos = null;
  let isDrawingBox = false;
  let currentMousePos = null;

  // Create overlay canvas for blue rectangle preview
  const overlayCanvas = document.createElement('canvas');
  overlayCanvas.id = 'boxfill-preview';
  overlayCanvas.style.position = 'fixed';
  overlayCanvas.style.top = '0';
  overlayCanvas.style.left = '0';
  overlayCanvas.style.pointerEvents = 'none';
  overlayCanvas.style.zIndex = '10000';
  document.body.appendChild(overlayCanvas);

  const ctx = overlayCanvas.getContext('2d');
  overlayCanvas.width = window.innerWidth;
  overlayCanvas.height = window.innerHeight;

  function drawPreviewBox() {
    ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
    
    if (isDrawingBox && startPos && currentMousePos) {
      const x = Math.min(startPos.x, currentMousePos.x);
      const y = Math.min(startPos.y, currentMousePos.y);
      const w = Math.abs(currentMousePos.x - startPos.x);
      const h = Math.abs(currentMousePos.y - startPos.y);
      
      // Draw blue rectangle outline
      ctx.strokeStyle = '#0099ff';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);
      
      // Semi-transparent blue fill
      ctx.fillStyle = 'rgba(0, 153, 255, 0.15)';
      ctx.fillRect(x, y, w, h);
    }
  }

  window.addEventListener('resize', () => {
    overlayCanvas.width = window.innerWidth;
    overlayCanvas.height = window.innerHeight;
  });

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
      currentMousePos = { x: e.clientX, y: e.clientY };
      console.log('Box started at screen:', startPos);
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (isDrawingBox && startPos) {
      currentMousePos = { x: e.clientX, y: e.clientY };
      drawPreviewBox();
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (isDrawingBox && startPos) {
      const endPos = { x: e.clientX, y: e.clientY };
      ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      
      console.log('=== BOX FILL DEBUG ===');
      console.log('Screen coords:', startPos, 'to', endPos);
      
      // Find the main canvas
      const gameCanvas = document.querySelector('canvas');
      console.log('Canvas found:', !!gameCanvas);
      
      let canvasOffsetX = 0;
      let canvasOffsetY = 0;
      
      if (gameCanvas) {
        const rect = gameCanvas.getBoundingClientRect();
        canvasOffsetX = rect.left;
        canvasOffsetY = rect.top;
        console.log('Canvas position:', canvasOffsetX, canvasOffsetY);
        console.log('Canvas size:', rect.width, rect.height);
      }
      
      // Convert to canvas coordinates
      const canvasX1 = startPos.x - canvasOffsetX;
      const canvasY1 = startPos.y - canvasOffsetY;
      const canvasX2 = endPos.x - canvasOffsetX;
      const canvasY2 = endPos.y - canvasOffsetY;
      
      console.log('Canvas coords:', canvasX1, canvasY1, 'to', canvasX2, canvasY2);
      
      // Get pixel size
      const pSize = window.pixelSize || 1;
      console.log('Pixel size:', pSize);
      
      // Convert to grid
      const x1 = Math.floor(canvasX1 / pSize);
      const y1 = Math.floor(canvasY1 / pSize);
      const x2 = Math.floor(canvasX2 / pSize);
      const y2 = Math.floor(canvasY2 / pSize);
      
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      
      console.log('Grid coords:', minX, minY, 'to', maxX, maxY);
      console.log('Grid size:', (maxX - minX + 1), 'x', (maxY - minY + 1));
      console.log('Current element:', window.currentElement);
      console.log('createPixel available:', !!window.createPixel);
      
      // Try to fill
      if (window.createPixel && window.currentElement !== undefined) {
        let pixelsCreated = 0;
        let errors = 0;
        
        for (let x = minX; x <= maxX; x++) {
          for (let y = minY; y <= maxY; y++) {
            try {
              window.createPixel(x, y, window.currentElement);
              pixelsCreated++;
            } catch (err) {
              errors++;
              if (errors <= 3) {
                console.log('Error at', x, y, ':', err.message);
              }
            }
          }
        }
        console.log(`Result: ${pixelsCreated} pixels created, ${errors} errors`);
      } else {
        console.error('MISSING createPixel or currentElement!');
        console.log('createPixel:', typeof window.createPixel);
        console.log('currentElement:', window.currentElement);
      }
      console.log('=== END DEBUG ===');
      
      isDrawingBox = false;
      startPos = null;
      currentMousePos = null;
    }
  });

  console.log('Box Fill Tool v10 loaded! Press B to toggle.');
})();
