// Sandboxels Box Fill Tool v13 - ACTUALLY FILLS
(function() {
  let boxFillActive = false;
  let startPos = null;
  let isDrawingBox = false;
  let currentMousePos = null;

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
      
      ctx.strokeStyle = '#0099ff';
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, w, h);
      
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
      console.log('Box Fill: ' + (boxFillActive ? 'ON' : 'OFF'));
    }
  });

  document.addEventListener('mousedown', (e) => {
    if (boxFillActive && e.button === 0) {
      isDrawingBox = true;
      startPos = { x: e.clientX, y: e.clientY };
      currentMousePos = { x: e.clientX, y: e.clientY };
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
      
      const gameCanvas = document.querySelector('canvas');
      let canvasOffsetX = 0;
      let canvasOffsetY = 0;
      
      if (gameCanvas) {
        const rect = gameCanvas.getBoundingClientRect();
        canvasOffsetX = rect.left;
        canvasOffsetY = rect.top;
      }
      
      const canvasX1 = startPos.x - canvasOffsetX;
      const canvasY1 = startPos.y - canvasOffsetY;
      const canvasX2 = endPos.x - canvasOffsetX;
      const canvasY2 = endPos.y - canvasOffsetY;
      
      const pSize = window.pixelSize || 1;
      
      const x1 = Math.floor(canvasX1 / pSize);
      const y1 = Math.floor(canvasY1 / pSize);
      const x2 = Math.floor(canvasX2 / pSize);
      const y2 = Math.floor(canvasY2 / pSize);
      
      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);
      
      const element = window.currentElement;
      
      // Try all available functions that might work
      if (window.createPixel) {
        for (let x = minX; x <= maxX; x++) {
          for (let y = minY; y <= maxY; y++) {
            window.createPixel(x, y, element);
          }
        }
      } else if (window.changePixel) {
        for (let x = minX; x <= maxX; x++) {
          for (let y = minY; y <= maxY; y++) {
            window.changePixel(x, y, element);
          }
        }
      }
      
      isDrawingBox = false;
      startPos = null;
      currentMousePos = null;
    }
  });

  console.log('Box Fill loaded! Press B');
})();
