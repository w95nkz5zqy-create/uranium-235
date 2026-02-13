// Functions Tab v6 - Simplified and Working Version

(function() {
    'use strict';
    
    if (typeof elements === 'undefined') {
        console.error('Sandboxels not loaded yet');
        return;
    }
    
    var selectedPixels = [];
    var functionGroups = [];
    
    console.log('Functions Tab v6 starting...');
    
    // Create button
    var btn = document.createElement('button');
    btn.textContent = 'Functions';
    btn.style.cssText = 'background: #9370DB; color: white; padding: 5px 10px; margin: 2px; border: 2px solid black; font-weight: bold; cursor: pointer;';
    
    // Find where to add it
    setTimeout(function() {
        var heatBtn = document.querySelector('button');
        if (heatBtn && heatBtn.parentNode) {
            heatBtn.parentNode.appendChild(btn);
            console.log('Functions button added');
        } else {
            document.body.appendChild(btn);
        }
    }, 500);
    
    // Create panel
    var panel = document.createElement('div');
    panel.style.cssText = 'display: none; position: fixed; top: 10%; left: 50%; transform: translateX(-50%); width: 700px; max-height: 80%; background: #2c3e50; border: 3px solid black; border-radius: 10px; z-index: 999999; overflow: auto; padding: 20px; color: white;';
    document.body.appendChild(panel);
    
    btn.onclick = function() {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        render();
    };
    
    function render() {
        panel.innerHTML = '<h2>Functions</h2>';
        
        // Add group button
        var addBtn = document.createElement('button');
        addBtn.textContent = '+ Add Group';
        addBtn.style.cssText = 'background: #27ae60; color: white; padding: 10px; border: 2px solid black; cursor: pointer; margin: 10px 0; width: 100%;';
        addBtn.onclick = function() {
            var name = prompt('Group name:');
            if (name) {
                functionGroups.push({name: name, functions: []});
                render();
            }
        };
        panel.appendChild(addBtn);
        
        // Show groups
        functionGroups.forEach(function(group, i) {
            var groupDiv = document.createElement('div');
            groupDiv.style.cssText = 'background: #34495e; padding: 15px; margin: 10px 0; border-radius: 5px;';
            
            var title = document.createElement('h3');
            title.textContent = group.name;
            groupDiv.appendChild(title);
            
            // Add function to this group
            var addFuncBtn = document.createElement('button');
            addFuncBtn.textContent = '+ Add Function';
            addFuncBtn.style.cssText = 'background: #3498db; color: white; padding: 8px; border: 2px solid black; cursor: pointer; margin: 5px 0;';
            addFuncBtn.onclick = function() {
                showForm(group, groupDiv);
            };
            groupDiv.appendChild(addFuncBtn);
            
            // Show functions
            group.functions.forEach(function(func) {
                var funcDiv = document.createElement('div');
                funcDiv.style.cssText = 'background: #2c3e50; padding: 10px; margin: 5px 0; border-radius: 3px;';
                funcDiv.innerHTML = '<strong>' + func.name + '</strong> (' + func.type + ')';
                
                var toggleBtn = document.createElement('button');
                toggleBtn.textContent = func.active ? 'ON' : 'OFF';
                toggleBtn.style.cssText = 'background: ' + (func.active ? '#27ae60' : '#e74c3c') + '; color: white; padding: 5px 15px; border: 2px solid black; cursor: pointer; margin-top: 5px;';
                toggleBtn.onclick = function() {
                    func.active = !func.active;
                    executeFunc(func);
                    render();
                };
                
                funcDiv.appendChild(toggleBtn);
                groupDiv.appendChild(funcDiv);
            });
            
            panel.appendChild(groupDiv);
        });
    }
    
    function showForm(group, groupDiv) {
        var form = document.createElement('div');
        form.style.cssText = 'background: #1a252f; padding: 15px; margin: 10px 0; border: 2px solid #3498db; border-radius: 5px;';
        
        form.innerHTML = '<h4>New Function</h4>';
        
        // Select pixel button
        var selectBtn = document.createElement('button');
        selectBtn.textContent = 'Select Pixel';
        selectBtn.style.cssText = 'background: #e67e22; color: white; padding: 8px; border: 2px solid black; cursor: pointer; width: 100%; margin: 5px 0;';
        
        var selectedText = document.createElement('div');
        selectedText.textContent = 'No pixel selected';
        selectedText.style.cssText = 'margin: 5px 0; color: #3498db;';
        
        var selecting = false;
        selectBtn.onclick = function() {
            selecting = true;
            selectBtn.textContent = 'Click a pixel on canvas...';
            selectBtn.style.background = '#d35400';
        };
        
        var canvas = document.getElementById('game');
        if (canvas) {
            canvas.addEventListener('click', function handler(e) {
                if (!selecting) return;
                
                var rect = canvas.getBoundingClientRect();
                var x = Math.floor((e.clientX - rect.left) / pixelSize);
                var y = Math.floor((e.clientY - rect.top) / pixelSize);
                
                if (pixelMap[x] && pixelMap[x][y]) {
                    selectedPixels = [{x: x, y: y, element: pixelMap[x][y].element}];
                    selectedText.textContent = 'Selected: ' + pixelMap[x][y].element + ' at (' + x + ',' + y + ')';
                    selecting = false;
                    selectBtn.textContent = 'Select Pixel';
                    selectBtn.style.background = '#e67e22';
                }
            });
        }
        
        // Name input
        var nameInput = document.createElement('input');
        nameInput.placeholder = 'Function name';
        nameInput.style.cssText = 'width: 100%; padding: 8px; margin: 5px 0; background: #34495e; color: white; border: 2px solid black;';
        
        // Type select
        var typeSelect = document.createElement('select');
        typeSelect.style.cssText = 'width: 100%; padding: 8px; margin: 5px 0; background: #34495e; color: white; border: 2px solid black;';
        typeSelect.innerHTML = `
            <option value="passable">Toggle Passable</option>
            <option value="move_up">Move Up</option>
            <option value="move_down">Move Down</option>
            <option value="move_left">Move Left</option>
            <option value="move_right">Move Right</option>
        `;
        
        // Save button
        var saveBtn = document.createElement('button');
        saveBtn.textContent = 'Create';
        saveBtn.style.cssText = 'background: #27ae60; color: white; padding: 10px; border: 2px solid black; cursor: pointer; width: 100%; margin: 5px 0;';
        saveBtn.onclick = function() {
            if (!nameInput.value || selectedPixels.length === 0) {
                alert('Need name and pixel!');
                return;
            }
            
            group.functions.push({
                name: nameInput.value,
                type: typeSelect.value,
                pixels: JSON.parse(JSON.stringify(selectedPixels)),
                active: false
            });
            
            render();
        };
        
        form.appendChild(selectBtn);
        form.appendChild(selectedText);
        form.appendChild(nameInput);
        form.appendChild(typeSelect);
        form.appendChild(saveBtn);
        
        groupDiv.appendChild(form);
    }
    
    function executeFunc(func) {
        func.pixels.forEach(function(p) {
            var pixel = pixelMap[p.x] && pixelMap[p.x][p.y];
            if (!pixel) return;
            
            if (func.type === 'passable') {
                if (elements[pixel.element]) {
                    if (func.active) {
                        elements[pixel.element].passable = true;
                    } else {
                        delete elements[pixel.element].passable;
                    }
                }
            } else if (func.type.startsWith('move_') && func.active) {
                var dir = func.type.split('_')[1];
                var dx = dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
                var dy = dir === 'up' ? -1 : dir === 'down' ? 1 : 0;
                if (isEmpty(pixel.x + dx, pixel.y + dy)) {
                    movePixel(pixel, pixel.x + dx, pixel.y + dy);
                }
            }
        });
    }
    
    console.log('Functions Tab v6 loaded!');
})();
