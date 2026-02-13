// Functions Tab v8 - Using text input instead of prompt

(function() {
    'use strict';
    
    var selectedPixels = [];
    var functionGroups = [];
    
    console.log('Functions Tab v8 starting...');
    
    setTimeout(function() {
        if (typeof elements === 'undefined') {
            console.error('Elements not loaded');
            return;
        }
        
        console.log('Initializing Functions Tab v8...');
        
        // Create button
        var btn = document.createElement('button');
        btn.textContent = 'Functions';
        btn.style.cssText = 'background: #9370DB; color: white; padding: 5px 10px; margin: 2px; border: 2px solid black; font-weight: bold; cursor: pointer;';
        
        var toolbar = document.querySelector('#toolbar');
        if (!toolbar) {
            var buttons = document.querySelectorAll('button');
            for (var i = 0; i < buttons.length; i++) {
                if (buttons[i].textContent === 'Heat' || buttons[i].textContent === 'Cool') {
                    toolbar = buttons[i].parentElement;
                    break;
                }
            }
        }
        
        if (toolbar) {
            toolbar.appendChild(btn);
            console.log('Functions button added');
        }
        
        // Create panel
        var panel = document.createElement('div');
        panel.style.cssText = 'display: none; position: fixed; top: 10%; left: 50%; transform: translateX(-50%); width: 700px; max-height: 80%; background: #2c3e50; border: 3px solid black; border-radius: 10px; z-index: 999999; overflow: auto; padding: 20px; color: white; font-family: Arial;';
        document.body.appendChild(panel);
        
        var isOpen = false;
        
        btn.onclick = function() {
            isOpen = !isOpen;
            panel.style.display = isOpen ? 'block' : 'none';
            if (isOpen) render();
        };
        
        function render() {
            panel.innerHTML = '';
            
            var title = document.createElement('h2');
            title.textContent = 'Functions Control';
            panel.appendChild(title);
            
            // Show create group form or button
            var createGroupSection = document.createElement('div');
            createGroupSection.id = 'create-group-section';
            createGroupSection.style.cssText = 'margin-bottom: 20px; padding: 15px; background: #34495e; border-radius: 5px;';
            
            var groupNameInput = document.createElement('input');
            groupNameInput.type = 'text';
            groupNameInput.placeholder = 'Enter new group name...';
            groupNameInput.style.cssText = 'width: 100%; padding: 10px; margin-bottom: 10px; background: #2c3e50; color: white; border: 2px solid black; border-radius: 3px; box-sizing: border-box; font-size: 14px;';
            
            var createGroupBtn = document.createElement('button');
            createGroupBtn.textContent = '+ Create Function Group';
            createGroupBtn.style.cssText = 'width: 100%; background: #27ae60; color: white; padding: 12px; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 5px; font-size: 14px;';
            
            createGroupBtn.onclick = function() {
                var name = groupNameInput.value.trim();
                if (name) {
                    functionGroups.push({
                        name: name,
                        functions: []
                    });
                    console.log('Group created:', name);
                    render();
                } else {
                    alert('Please enter a group name!');
                }
            };
            
            createGroupSection.appendChild(groupNameInput);
            createGroupSection.appendChild(createGroupBtn);
            panel.appendChild(createGroupSection);
            
            // Display groups
            if (functionGroups.length === 0) {
                var emptyMsg = document.createElement('div');
                emptyMsg.textContent = 'No function groups yet. Enter a name above and click Create.';
                emptyMsg.style.cssText = 'color: #95a5a6; text-align: center; padding: 40px;';
                panel.appendChild(emptyMsg);
            } else {
                functionGroups.forEach(function(group, index) {
                    var groupDiv = createGroupElement(group, index);
                    panel.appendChild(groupDiv);
                });
            }
        }
        
        function createGroupElement(group, index) {
            var groupDiv = document.createElement('div');
            groupDiv.style.cssText = 'background: #34495e; padding: 15px; margin: 10px 0; border-radius: 8px; border: 2px solid #000;';
            
            var groupHeader = document.createElement('div');
            groupHeader.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;';
            
            var groupName = document.createElement('h3');
            groupName.textContent = group.name;
            groupName.style.cssText = 'margin: 0;';
            
            var addFuncBtn = document.createElement('button');
            addFuncBtn.textContent = '+ Add Function';
            addFuncBtn.style.cssText = 'background: #3498db; color: white; padding: 8px 16px; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 5px;';
            addFuncBtn.onclick = function() {
                showFunctionForm(group, groupDiv);
            };
            
            groupHeader.appendChild(groupName);
            groupHeader.appendChild(addFuncBtn);
            groupDiv.appendChild(groupHeader);
            
            // Display functions
            group.functions.forEach(function(func) {
                var funcElement = createFunctionElement(func);
                groupDiv.appendChild(funcElement);
            });
            
            return groupDiv;
        }
        
        function showFunctionForm(group, groupDiv) {
            var existingForm = groupDiv.querySelector('.func-form');
            if (existingForm) {
                existingForm.remove();
                return;
            }
            
            var form = document.createElement('div');
            form.className = 'func-form';
            form.style.cssText = 'background: #2c3e50; padding: 15px; margin: 10px 0; border: 2px solid #3498db; border-radius: 5px;';
            
            var formTitle = document.createElement('h4');
            formTitle.textContent = 'New Function';
            formTitle.style.cssText = 'margin: 0 0 10px 0;';
            form.appendChild(formTitle);
            
            // Select pixel button
            var selectBtn = document.createElement('button');
            selectBtn.textContent = '🖱️ Select Pixel';
            selectBtn.style.cssText = 'width: 100%; background: #e67e22; color: white; padding: 8px; border: 2px solid black; cursor: pointer; margin-bottom: 5px; border-radius: 5px; font-weight: bold;';
            
            var selectedInfo = document.createElement('div');
            selectedInfo.style.cssText = 'background: #1a252f; padding: 8px; margin-bottom: 10px; border-radius: 3px; font-size: 12px;';
            selectedInfo.textContent = 'No pixel selected';
            
            var isSelecting = false;
            selectBtn.onclick = function() {
                isSelecting = !isSelecting;
                selectBtn.style.background = isSelecting ? '#d35400' : '#e67e22';
                selectBtn.textContent = isSelecting ? '🖱️ Click canvas now...' : '🖱️ Select Pixel';
            };
            
            var canvas = document.getElementById('game');
            var clickHandler = function(e) {
                if (!isSelecting) return;
                
                var rect = canvas.getBoundingClientRect();
                var x = Math.floor((e.clientX - rect.left) / pixelSize);
                var y = Math.floor((e.clientY - rect.top) / pixelSize);
                
                if (pixelMap[x] && pixelMap[x][y]) {
                    selectedPixels = [{x: x, y: y, element: pixelMap[x][y].element}];
                    selectedInfo.textContent = '✓ Selected: ' + pixelMap[x][y].element + ' at (' + x + ', ' + y + ')';
                    isSelecting = false;
                    selectBtn.style.background = '#e67e22';
                    selectBtn.textContent = '🖱️ Select Pixel';
                }
            };
            
            if (canvas) {
                canvas.addEventListener('click', clickHandler);
            }
            
            // Name input
            var nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.placeholder = 'Function name';
            nameInput.style.cssText = 'width: 100%; padding: 8px; margin-bottom: 10px; background: #34495e; color: white; border: 2px solid black; border-radius: 3px; box-sizing: border-box;';
            
            // Type select
            var typeSelect = document.createElement('select');
            typeSelect.style.cssText = 'width: 100%; padding: 8px; margin-bottom: 10px; background: #34495e; color: white; border: 2px solid black; border-radius: 3px;';
            typeSelect.innerHTML = `
                <option value="">-- Select Type --</option>
                <option value="passable">Toggle Passable</option>
                <option value="conductive">Toggle Conductive</option>
                <option value="move_up">Move Up</option>
                <option value="move_down">Move Down</option>
                <option value="move_left">Move Left</option>
                <option value="move_right">Move Right</option>
            `;
            
            // Buttons
            var btnRow = document.createElement('div');
            btnRow.style.cssText = 'display: flex; gap: 10px;';
            
            var createBtn = document.createElement('button');
            createBtn.textContent = 'Create';
            createBtn.style.cssText = 'flex: 1; background: #27ae60; color: white; padding: 10px; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 5px;';
            createBtn.onclick = function() {
                if (!nameInput.value || !typeSelect.value || selectedPixels.length === 0) {
                    alert('Fill all fields and select a pixel!');
                    return;
                }
                
                group.functions.push({
                    name: nameInput.value,
                    type: typeSelect.value,
                    pixels: JSON.parse(JSON.stringify(selectedPixels)),
                    active: false
                });
                
                canvas.removeEventListener('click', clickHandler);
                render();
            };
            
            var cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.style.cssText = 'background: #95a5a6; color: white; padding: 10px 20px; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 5px;';
            cancelBtn.onclick = function() {
                canvas.removeEventListener('click', clickHandler);
                form.remove();
            };
            
            btnRow.appendChild(createBtn);
            btnRow.appendChild(cancelBtn);
            
            form.appendChild(selectBtn);
            form.appendChild(selectedInfo);
            form.appendChild(nameInput);
            form.appendChild(typeSelect);
            form.appendChild(btnRow);
            
            groupDiv.appendChild(form);
        }
        
        function createFunctionElement(func) {
            var funcDiv = document.createElement('div');
            funcDiv.style.cssText = 'background: #2c3e50; padding: 12px; margin: 8px 0; border-radius: 5px; border: 2px solid #000;';
            
            var funcName = document.createElement('div');
            funcName.textContent = func.name;
            funcName.style.cssText = 'font-weight: bold; margin-bottom: 8px;';
            
            var toggleBtn = document.createElement('button');
            toggleBtn.textContent = func.active ? 'ON' : 'OFF';
            toggleBtn.style.cssText = 'width: 100%; padding: 10px; background: ' + (func.active ? '#27ae60' : '#e74c3c') + '; color: white; border: 2px solid black; cursor: pointer; font-weight: bold; border-radius: 5px;';
            toggleBtn.onclick = function() {
                func.active = !func.active;
                executeFunction(func);
                render();
            };
            
            funcDiv.appendChild(funcName);
            funcDiv.appendChild(toggleBtn);
            return funcDiv;
        }
        
        function executeFunction(func) {
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
                } else if (func.type === 'conductive') {
                    if (elements[pixel.element]) {
                        elements[pixel.element].conduct = func.active ? 1 : 0;
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
        
        console.log('Functions Tab v8 loaded!');
    }, 1500);
})();
