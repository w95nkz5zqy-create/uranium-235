// Functions Tab Mod v4 - Full UI Forms
// Complete interface for creating functions with dropdowns and inputs

(function() {
    'use strict';
    
    var selectedPixels = [];
    var functionGroups = [];
    var deleteMode = false;
    var creatingFunction = null; // Track which group is creating a function
    
    function waitForSandboxels() {
        if (typeof elements === 'undefined' || typeof pixelMap === 'undefined') {
            setTimeout(waitForSandboxels, 100);
            return;
        }
        init();
    }
    
    function init() {
        // Create Functions button
        var functionsBtn = document.createElement('button');
        functionsBtn.id = 'functions-tab-btn';
        functionsBtn.textContent = 'Functions';
        functionsBtn.style.cssText = 'background-color: #9370DB; color: white; padding: 5px 10px; margin: 2px; border: 2px solid #000; font-weight: bold; cursor: pointer;';
        
        var toolbar = document.getElementById('toolbar');
        if (!toolbar) {
            var buttons = document.querySelectorAll('.toolButton, button');
            if (buttons.length > 0) {
                toolbar = buttons[0].parentElement;
            }
        }
        if (toolbar) {
            toolbar.appendChild(functionsBtn);
        }
        
        // Main Panel
        var panel = document.createElement('div');
        panel.id = 'functions-panel';
        panel.style.cssText = `
            display: none;
            position: fixed;
            top: 5%;
            left: 50%;
            transform: translateX(-50%);
            width: 850px;
            max-height: 90%;
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            border: 3px solid #000;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            z-index: 100000;
            overflow: hidden;
        `;
        
        // Header
        var header = document.createElement('div');
        header.style.cssText = `
            background: linear-gradient(135deg, #1a252f 0%, #2c3e50 100%);
            padding: 12px 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #000;
        `;
        
        var title = document.createElement('div');
        title.textContent = 'Functions Control Panel';
        title.style.cssText = 'color: #fff; font-size: 20px; font-weight: bold;';
        
        var headerButtons = document.createElement('div');
        headerButtons.style.cssText = 'display: flex; gap: 8px;';
        
        var addGroupBtn = document.createElement('button');
        addGroupBtn.innerHTML = '➕';
        addGroupBtn.title = 'Add Function Group';
        addGroupBtn.style.cssText = `
            background: #27ae60;
            color: white;
            border: 2px solid #000;
            padding: 8px 16px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
        `;
        
        var deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.style.cssText = `
            background: #e74c3c;
            color: white;
            border: 2px solid #000;
            padding: 8px 16px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
        `;
        
        var closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✖';
        closeBtn.style.cssText = `
            background: #95a5a6;
            color: white;
            border: 2px solid #000;
            padding: 8px 14px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
        `;
        
        headerButtons.appendChild(addGroupBtn);
        headerButtons.appendChild(deleteBtn);
        headerButtons.appendChild(closeBtn);
        header.appendChild(title);
        header.appendChild(headerButtons);
        
        // Selection Bar
        var selectionBar = document.createElement('div');
        selectionBar.style.cssText = `
            background: rgba(0,0,0,0.4);
            padding: 10px 15px;
            border-bottom: 2px solid #000;
            display: flex;
            gap: 10px;
            align-items: center;
        `;
        
        var selectBtn = document.createElement('button');
        selectBtn.textContent = '🖱️ Select Pixel';
        selectBtn.id = 'select-pixel-btn';
        selectBtn.style.cssText = `
            background: #e67e22;
            color: white;
            border: 2px solid #000;
            padding: 8px 16px;
            font-size: 13px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
        `;
        
        var selectedInfo = document.createElement('div');
        selectedInfo.id = 'selected-info';
        selectedInfo.style.cssText = 'flex: 1; color: white; font-weight: bold; font-size: 13px;';
        selectedInfo.textContent = 'No pixel selected';
        
        var clearBtn = document.createElement('button');
        clearBtn.textContent = 'Clear';
        clearBtn.style.cssText = `
            background: #95a5a6;
            color: white;
            border: 2px solid #000;
            padding: 6px 12px;
            font-size: 12px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
        `;
        
        selectionBar.appendChild(selectBtn);
        selectionBar.appendChild(selectedInfo);
        selectionBar.appendChild(clearBtn);
        
        // Content
        var content = document.createElement('div');
        content.id = 'functions-content';
        content.style.cssText = `
            padding: 15px;
            max-height: 600px;
            overflow-y: auto;
        `;
        
        // Delete confirm area
        var deleteConfirmArea = document.createElement('div');
        deleteConfirmArea.id = 'delete-confirm';
        deleteConfirmArea.style.cssText = 'display: none; padding: 10px; background: #e74c3c; text-align: center; border-bottom: 2px solid #000;';
        
        var deleteConfirmBtn = document.createElement('button');
        deleteConfirmBtn.textContent = 'Delete Selected';
        deleteConfirmBtn.style.cssText = `
            background: #c0392b;
            color: white;
            border: 2px solid #000;
            padding: 8px 20px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
        `;
        
        deleteConfirmArea.appendChild(deleteConfirmBtn);
        
        panel.appendChild(header);
        panel.appendChild(deleteConfirmArea);
        panel.appendChild(selectionBar);
        panel.appendChild(content);
        document.body.appendChild(panel);
        
        // Selection mode
        var selectionMode = false;
        
        selectBtn.onclick = function() {
            selectionMode = !selectionMode;
            selectBtn.style.background = selectionMode ? '#d35400' : '#e67e22';
            selectBtn.textContent = selectionMode ? '🖱️ Click Canvas!' : '🖱️ Select Pixel';
        };
        
        clearBtn.onclick = function() {
            selectedPixels = [];
            selectedInfo.textContent = 'No pixel selected';
            selectionMode = false;
            selectBtn.style.background = '#e67e22';
            selectBtn.textContent = '🖱️ Select Pixel';
        };
        
        // Canvas click
        var canvas = document.getElementById('game');
        if (canvas) {
            canvas.addEventListener('click', function(e) {
                if (selectionMode && panel.style.display === 'block') {
                    var rect = canvas.getBoundingClientRect();
                    var x = Math.floor((e.clientX - rect.left) / pixelSize);
                    var y = Math.floor((e.clientY - rect.top) / pixelSize);
                    
                    if (pixelMap[x] && pixelMap[x][y]) {
                        selectedPixels = [{x: x, y: y, element: pixelMap[x][y].element}];
                        selectedInfo.textContent = `Selected: ${pixelMap[x][y].element} at (${x},${y})`;
                        selectionMode = false;
                        selectBtn.style.background = '#e67e22';
                        selectBtn.textContent = '🖱️ Select Pixel';
                    }
                }
            });
        }
        
        // Toggle panel
        functionsBtn.onclick = function() {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            if (panel.style.display === 'block') {
                renderAll();
            }
        };
        
        closeBtn.onclick = function() {
            panel.style.display = 'none';
        };
        
        // Delete mode
        deleteBtn.onclick = function() {
            deleteMode = !deleteMode;
            deleteBtn.style.background = deleteMode ? '#c0392b' : '#e74c3c';
            deleteConfirmArea.style.display = deleteMode ? 'block' : 'none';
            
            var checkboxes = document.querySelectorAll('.group-checkbox');
            checkboxes.forEach(function(cb) {
                cb.style.display = deleteMode ? 'inline-block' : 'none';
            });
        };
        
        deleteConfirmBtn.onclick = function() {
            var toDelete = [];
            document.querySelectorAll('.group-checkbox:checked').forEach(function(cb) {
                toDelete.push(parseInt(cb.dataset.index));
            });
            
            toDelete.sort(function(a,b) { return b - a; });
            toDelete.forEach(function(idx) {
                functionGroups.splice(idx, 1);
            });
            
            deleteMode = false;
            deleteBtn.style.background = '#e74c3c';
            deleteConfirmArea.style.display = 'none';
            renderAll();
        };
        
        // Add group
        addGroupBtn.onclick = function() {
            var name = prompt('Group Name:');
            if (name) {
                functionGroups.push({
                    name: name,
                    collapsed: false,
                    functions: []
                });
                renderAll();
            }
        };
        
        // Render everything
        function renderAll() {
            content.innerHTML = '';
            creatingFunction = null;
            
            if (functionGroups.length === 0) {
                var msg = document.createElement('div');
                msg.textContent = 'Click ➕ to add a function group';
                msg.style.cssText = 'color: #95a5a6; text-align: center; padding: 40px; font-size: 16px;';
                content.appendChild(msg);
                return;
            }
            
            functionGroups.forEach(function(group, idx) {
                content.appendChild(createGroupUI(group, idx));
            });
        }
        
        // Create group UI
        function createGroupUI(group, idx) {
            var div = document.createElement('div');
            div.style.cssText = `
                margin: 10px 0;
                padding: 12px;
                background: rgba(52, 73, 94, 0.8);
                border: 2px solid #000;
                border-radius: 8px;
            `;
            
            // Header
            var header = document.createElement('div');
            header.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 12px;';
            
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'group-checkbox';
            checkbox.dataset.index = idx;
            checkbox.style.cssText = 'display: none; width: 20px; height: 20px;';
            
            var collapseBtn = document.createElement('button');
            collapseBtn.textContent = group.collapsed ? '▶' : '▼';
            collapseBtn.style.cssText = 'background: #34495e; color: white; border: 2px solid #000; padding: 4px 8px; cursor: pointer; border-radius: 3px; font-weight: bold;';
            collapseBtn.onclick = function() {
                group.collapsed = !group.collapsed;
                renderAll();
            };
            
            var name = document.createElement('div');
            name.textContent = group.name;
            name.style.cssText = 'flex: 1; color: white; font-weight: bold; font-size: 16px;';
            
            var addBtn = document.createElement('button');
            addBtn.textContent = '+ Function';
            addBtn.style.cssText = 'background: #3498db; color: white; border: 2px solid #000; padding: 6px 12px; font-size: 12px; cursor: pointer; border-radius: 5px; font-weight: bold;';
            addBtn.onclick = function() {
                if (selectedPixels.length === 0) {
                    alert('Please select a pixel first!');
                    return;
                }
                creatingFunction = idx;
                renderAll();
            };
            
            header.appendChild(checkbox);
            header.appendChild(collapseBtn);
            header.appendChild(name);
            header.appendChild(addBtn);
            div.appendChild(header);
            
            // Function creation form (if this group is creating)
            if (creatingFunction === idx) {
                div.appendChild(createFunctionForm(group));
            }
            
            // Functions list
            if (!group.collapsed) {
                group.functions.forEach(function(func) {
                    div.appendChild(createFunctionUI(func, group));
                });
            }
            
            return div;
        }
        
        // Create function form (FULL UI, NO PROMPTS)
        function createFunctionForm(group) {
            var form = document.createElement('div');
            form.style.cssText = `
                margin: 10px 0;
                padding: 12px;
                background: rgba(44, 62, 80, 0.95);
                border: 2px solid #3498db;
                border-radius: 5px;
            `;
            
            var title = document.createElement('div');
            title.textContent = 'Create New Function';
            title.style.cssText = 'color: #3498db; font-weight: bold; margin-bottom: 10px; font-size: 14px;';
            form.appendChild(title);
            
            // Name
            var nameLabel = document.createElement('div');
            nameLabel.textContent = 'Function Name:';
            nameLabel.style.cssText = 'color: white; font-size: 12px; margin-bottom: 4px;';
            
            var nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.placeholder = 'e.g., Open Wall';
            nameInput.style.cssText = 'width: 100%; padding: 6px; background: #2c3e50; color: white; border: 2px solid #000; border-radius: 3px; margin-bottom: 10px;';
            
            form.appendChild(nameLabel);
            form.appendChild(nameInput);
            
            // Type
            var typeLabel = document.createElement('div');
            typeLabel.textContent = 'Function Type:';
            typeLabel.style.cssText = 'color: white; font-size: 12px; margin-bottom: 4px;';
            
            var typeSelect = document.createElement('select');
            typeSelect.style.cssText = 'width: 100%; padding: 6px; background: #2c3e50; color: white; border: 2px solid #000; border-radius: 3px; margin-bottom: 10px;';
            typeSelect.innerHTML = `
                <option value="move_up">Move Up</option>
                <option value="move_down">Move Down</option>
                <option value="move_left">Move Left</option>
                <option value="move_right">Move Right</option>
                <option value="extend_up">Extend Up</option>
                <option value="extend_down">Extend Down</option>
                <option value="extend_left">Extend Left</option>
                <option value="extend_right">Extend Right</option>
                <option value="contract_up">Contract Up</option>
                <option value="contract_down">Contract Down</option>
                <option value="contract_left">Contract Left</option>
                <option value="contract_right">Contract Right</option>
                <option value="passable">Toggle Passable</option>
                <option value="conductive">Toggle Conductive</option>
                <option value="temperature">Set Temperature</option>
            `;
            
            form.appendChild(typeLabel);
            form.appendChild(typeSelect);
            
            // Control
            var controlLabel = document.createElement('div');
            controlLabel.textContent = 'Control Type:';
            controlLabel.style.cssText = 'color: white; font-size: 12px; margin-bottom: 4px;';
            
            var controlSelect = document.createElement('select');
            controlSelect.style.cssText = 'width: 100%; padding: 6px; background: #2c3e50; color: white; border: 2px solid #000; border-radius: 3px; margin-bottom: 10px;';
            controlSelect.innerHTML = `
                <option value="toggle">Toggle (ON/OFF)</option>
                <option value="button">Button (Timed)</option>
                <option value="slider">Slider (0-100)</option>
            `;
            
            form.appendChild(controlLabel);
            form.appendChild(controlSelect);
            
            // Buttons
            var btnRow = document.createElement('div');
            btnRow.style.cssText = 'display: flex; gap: 8px;';
            
            var saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save Function';
            saveBtn.style.cssText = 'flex: 1; padding: 8px; background: #27ae60; color: white; border: 2px solid #000; border-radius: 5px; cursor: pointer; font-weight: bold;';
            saveBtn.onclick = function() {
                if (!nameInput.value) {
                    alert('Please enter a name!');
                    return;
                }
                
                group.functions.push({
                    name: nameInput.value,
                    type: typeSelect.value,
                    control: controlSelect.value,
                    pixels: JSON.parse(JSON.stringify(selectedPixels)),
                    active: false,
                    value: 50,
                    extensions: []
                });
                
                creatingFunction = null;
                renderAll();
            };
            
            var cancelBtn = document.createElement('button');
            cancelBtn.textContent = 'Cancel';
            cancelBtn.style.cssText = 'padding: 8px 16px; background: #95a5a6; color: white; border: 2px solid #000; border-radius: 5px; cursor: pointer; font-weight: bold;';
            cancelBtn.onclick = function() {
                creatingFunction = null;
                renderAll();
            };
            
            btnRow.appendChild(saveBtn);
            btnRow.appendChild(cancelBtn);
            form.appendChild(btnRow);
            
            return form;
        }
        
        // Create function UI (same as before)
        function createFunctionUI(func, group) {
            var div = document.createElement('div');
            div.style.cssText = 'margin: 8px 0; padding: 10px; background: rgba(44, 62, 80, 0.9); border: 2px solid #000; border-radius: 5px;';
            
            var info = document.createElement('div');
            info.style.cssText = 'display: flex; justify-content: space-between; margin-bottom: 8px;';
            
            var name = document.createElement('div');
            name.textContent = func.name;
            name.style.cssText = 'color: white; font-weight: bold;';
            
            var type = document.createElement('div');
            type.textContent = func.type.replace(/_/g, ' ');
            type.style.cssText = 'color: #95a5a6; font-size: 12px;';
            
            info.appendChild(name);
            info.appendChild(type);
            div.appendChild(info);
            
            // Control
            var control = document.createElement('div');
            
            if (func.control === 'toggle') {
                var btn = document.createElement('button');
                btn.textContent = func.active ? 'ON' : 'OFF';
                btn.style.cssText = `
                    width: 100%;
                    padding: 10px;
                    background: ${func.active ? '#27ae60' : '#e74c3c'};
                    color: white;
                    border: 2px solid #000;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                `;
                btn.onclick = function() {
                    func.active = !func.active;
                    executeFunction(func);
                    renderAll();
                };
                control.appendChild(btn);
                
            } else if (func.control === 'button') {
                var btn = document.createElement('button');
                btn.textContent = 'ACTIVATE';
                btn.style.cssText = 'flex: 1; padding: 10px; background: #3498db; color: white; border: 2px solid #000; border-radius: 5px; cursor: pointer; font-weight: bold;';
                
                var duration = document.createElement('input');
                duration.type = 'number';
                duration.value = '1';
                duration.min = '0.1';
                duration.step = '0.1';
                duration.style.cssText = 'width: 60px; padding: 6px; background: #2c3e50; color: white; border: 2px solid #000; border-radius: 3px; margin-left: 8px;';
                
                btn.onclick = function() {
                    func.active = true;
                    executeFunction(func);
                    btn.disabled = true;
                    btn.style.background = '#7f8c8d';
                    
                    setTimeout(function() {
                        func.active = false;
                        executeFunction(func);
                        btn.disabled = false;
                        btn.style.background = '#3498db';
                    }, parseFloat(duration.value) * 1000);
                };
                
                control.style.cssText = 'display: flex; align-items: center;';
                control.appendChild(btn);
                control.appendChild(duration);
                
            } else if (func.control === 'slider') {
                var slider = document.createElement('input');
                slider.type = 'range';
                slider.min = '0';
                slider.max = '100';
                slider.value = func.value;
                slider.style.cssText = 'flex: 1;';
                
                var label = document.createElement('span');
                label.textContent = func.value;
                label.style.cssText = 'color: white; font-weight: bold; min-width: 35px; text-align: right; margin-left: 8px;';
                
                slider.oninput = function() {
                    func.value = parseInt(slider.value);
                    label.textContent = func.value;
                    func.active = true;
                    executeFunction(func);
                };
                
                control.style.cssText = 'display: flex; align-items: center;';
                control.appendChild(slider);
                control.appendChild(label);
            }
            
            div.appendChild(control);
            return div;
        }
        
        // Execute function (same as before)
        function executeFunction(func) {
            func.pixels.forEach(function(pCoord) {
                var pixel = pixelMap[pCoord.x] && pixelMap[pCoord.x][pCoord.y];
                if (!pixel) return;
                
                if (func.type.startsWith('move_') && func.active) {
                    var dir = func.type.split('_')[1];
                    var dx = dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
                    var dy = dir === 'up' ? -1 : dir === 'down' ? 1 : 0;
                    
                    if (isEmpty(pixel.x + dx, pixel.y + dy)) {
                        movePixel(pixel, pixel.x + dx, pixel.y + dy);
                    }
                    
                } else if (func.type.startsWith('extend_')) {
                    var dir = func.type.split('_')[1];
                    var dx = dir === 'left' ? -1 : dir === 'right' ? 1 : 0;
                    var dy = dir === 'up' ? -1 : dir === 'down' ? 1 : 0;
                    
                    if (func.active) {
                        var ex = pixel.x + dx;
                        var ey = pixel.y + dy;
                        
                        if (isEmpty(ex, ey)) {
                            var extName = pixel.element + '_extension';
                            
                            if (!elements[extName]) {
                                elements[extName] = {
                                    color: elements[pixel.element].color,
                                    behavior: elements[pixel.element].behavior || behaviors.WALL,
                                    category: elements[pixel.element].category,
                                    state: elements[pixel.element].state,
                                    temp: 20
                                };
                            }
                            
                            createPixel(extName, ex, ey);
                            func.extensions.push({x: ex, y: ey});
                        }
                    } else {
                        func.extensions.forEach(function(ext) {
                            if (pixelMap[ext.x] && pixelMap[ext.x][ext.y]) {
                                deletePixel(ext.x, ext.y);
                            }
                        });
                        func.extensions = [];
                    }
                    
                } else if (func.type === 'passable') {
                    if (elements[pixel.element]) {
                        elements[pixel.element].passable = func.active ? true : undefined;
                    }
                    
                } else if (func.type === 'conductive') {
                    if (elements[pixel.element]) {
                        elements[pixel.element].conduct = func.active ? 1 : 0;
                    }
                    
                } else if (func.type === 'temperature') {
                    pixel.temp = func.value * 50;
                }
            });
        }
        
        console.log('Functions Tab v4 loaded - Full UI forms!');
    }
    
    waitForSandboxels();
})();
