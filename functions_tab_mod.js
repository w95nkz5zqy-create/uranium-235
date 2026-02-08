// Functions Tab Mod for Sandboxels
// Adds a "Functions" button to create custom element controls

(function() {
    'use strict';
    
    // Wait for Sandboxels to load
    function waitForSandboxels() {
        if (typeof elements === 'undefined' || typeof pixelMap === 'undefined') {
            setTimeout(waitForSandboxels, 100);
            return;
        }
        init();
    }
    
    function init() {
        // State
        var functionGroups = [];
        var deleteMode = false;
        var isPanelOpen = false;
        
        // Create Functions button in main toolbar
        var functionsBtn = document.createElement('button');
        functionsBtn.id = 'functions-tab-btn';
        functionsBtn.textContent = 'Functions';
        functionsBtn.className = 'toolButton';
        functionsBtn.style.cssText = 'background-color: #9370DB; color: white; padding: 5px 10px; margin: 2px; border: 2px solid #000; font-weight: bold; cursor: pointer; font-family: Arial, sans-serif;';
        
        // Find the toolbar (where Heat, Cool, Erase buttons are)
        var toolbar = document.getElementById('toolbar');
        if (!toolbar) {
            toolbar = document.querySelector('.toolButton').parentElement;
        }
        if (toolbar) {
            toolbar.appendChild(functionsBtn);
        }
        
        // Create the Functions panel
        var panel = document.createElement('div');
        panel.id = 'functions-panel';
        panel.style.cssText = `
            display: none;
            position: fixed;
            top: 10%;
            left: 50%;
            transform: translateX(-50%);
            width: 700px;
            max-height: 80%;
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            border: 3px solid #000;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.5);
            z-index: 100000;
            overflow: hidden;
            font-family: Arial, sans-serif;
        `;
        
        // Panel header
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
        title.textContent = 'Functions';
        title.style.cssText = 'color: #fff; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);';
        
        var headerButtons = document.createElement('div');
        headerButtons.style.cssText = 'display: flex; gap: 8px;';
        
        // Add Group button
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
            box-shadow: 0 3px 0 #1e8449;
        `;
        
        // Delete button (garbage can)
        var deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.title = 'Delete Mode';
        deleteBtn.style.cssText = `
            background: #e74c3c;
            color: white;
            border: 2px solid #000;
            padding: 8px 16px;
            font-size: 18px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
            box-shadow: 0 3px 0 #c0392b;
        `;
        
        // Close button
        var closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✖';
        closeBtn.title = 'Close';
        closeBtn.style.cssText = `
            background: #95a5a6;
            color: white;
            border: 2px solid #000;
            padding: 8px 14px;
            font-size: 16px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
            box-shadow: 0 3px 0 #7f8c8d;
        `;
        
        headerButtons.appendChild(addGroupBtn);
        headerButtons.appendChild(deleteBtn);
        headerButtons.appendChild(closeBtn);
        
        header.appendChild(title);
        header.appendChild(headerButtons);
        
        // Content area
        var content = document.createElement('div');
        content.id = 'functions-content';
        content.style.cssText = `
            padding: 15px;
            max-height: 500px;
            overflow-y: auto;
            overflow-x: hidden;
        `;
        
        // Delete confirm area (hidden by default)
        var deleteConfirmArea = document.createElement('div');
        deleteConfirmArea.id = 'delete-confirm-area';
        deleteConfirmArea.style.cssText = 'display: none; padding: 10px; background: #e74c3c; text-align: center; border-bottom: 2px solid #000;';
        
        var deleteConfirmBtn = document.createElement('button');
        deleteConfirmBtn.textContent = 'Delete Selected';
        deleteConfirmBtn.style.cssText = `
            background: #c0392b;
            color: white;
            border: 2px solid #000;
            padding: 8px 20px;
            font-size: 14px;
            cursor: pointer;
            border-radius: 5px;
            font-weight: bold;
        `;
        
        deleteConfirmArea.appendChild(deleteConfirmBtn);
        
        panel.appendChild(header);
        panel.appendChild(deleteConfirmArea);
        panel.appendChild(content);
        document.body.appendChild(panel);
        
        // Toggle panel
        functionsBtn.onclick = function() {
            isPanelOpen = !isPanelOpen;
            panel.style.display = isPanelOpen ? 'block' : 'none';
        };
        
        closeBtn.onclick = function() {
            isPanelOpen = false;
            panel.style.display = 'none';
        };
        
        // Delete mode toggle
        deleteBtn.onclick = function() {
            deleteMode = !deleteMode;
            deleteBtn.style.background = deleteMode ? '#c0392b' : '#e74c3c';
            deleteConfirmArea.style.display = deleteMode ? 'block' : 'none';
            
            // Toggle checkboxes
            var checkboxes = document.querySelectorAll('.fg-delete-checkbox');
            checkboxes.forEach(function(cb) {
                cb.style.display = deleteMode ? 'inline-block' : 'none';
            });
        };
        
        // Delete selected groups
        deleteConfirmBtn.onclick = function() {
            var checkboxes = document.querySelectorAll('.fg-delete-checkbox:checked');
            checkboxes.forEach(function(cb) {
                var group = cb.closest('.function-group');
                if (group) {
                    group.remove();
                }
            });
            
            deleteMode = false;
            deleteBtn.style.background = '#e74c3c';
            deleteConfirmArea.style.display = 'none';
            
            document.querySelectorAll('.fg-delete-checkbox').forEach(function(cb) {
                cb.style.display = 'none';
                cb.checked = false;
            });
        };
        
        // Create function group
        function createFunctionGroup(parentContainer, depth) {
            depth = depth || 0;
            
            var group = document.createElement('div');
            group.className = 'function-group';
            group.style.cssText = `
                margin: 10px 0 10px ${depth * 25}px;
                padding: 12px;
                background: rgba(52, 73, 94, 0.8);
                border: 2px solid #000;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            `;
            
            // Group header
            var groupHeader = document.createElement('div');
            groupHeader.style.cssText = 'display: flex; align-items: center; margin-bottom: 12px; gap: 8px;';
            
            // Delete checkbox
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'fg-delete-checkbox';
            checkbox.style.cssText = 'display: none; width: 20px; height: 20px; cursor: pointer;';
            
            // Group name
            var nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.placeholder = 'Function Group Name';
            nameInput.style.cssText = `
                flex: 1;
                padding: 8px;
                background: #34495e;
                color: white;
                border: 2px solid #000;
                border-radius: 5px;
                font-size: 14px;
                font-weight: bold;
            `;
            
            // Add Function button
            var addFuncBtn = document.createElement('button');
            addFuncBtn.textContent = '+ Function';
            addFuncBtn.style.cssText = `
                background: #3498db;
                color: white;
                border: 2px solid #000;
                padding: 6px 12px;
                font-size: 12px;
                cursor: pointer;
                border-radius: 5px;
                font-weight: bold;
                box-shadow: 0 2px 0 #2980b9;
            `;
            
            // Add nested Group button
            var addGroupBtn = document.createElement('button');
            addGroupBtn.textContent = '+ Group';
            addGroupBtn.style.cssText = `
                background: #27ae60;
                color: white;
                border: 2px solid #000;
                padding: 6px 12px;
                font-size: 12px;
                cursor: pointer;
                border-radius: 5px;
                font-weight: bold;
                box-shadow: 0 2px 0 #1e8449;
            `;
            
            groupHeader.appendChild(checkbox);
            groupHeader.appendChild(nameInput);
            groupHeader.appendChild(addFuncBtn);
            groupHeader.appendChild(addGroupBtn);
            
            // Functions container
            var funcContainer = document.createElement('div');
            funcContainer.className = 'functions-container';
            
            group.appendChild(groupHeader);
            group.appendChild(funcContainer);
            
            // Button handlers
            addFuncBtn.onclick = function() {
                createFunction(funcContainer);
            };
            
            addGroupBtn.onclick = function() {
                createFunctionGroup(funcContainer, depth + 1);
            };
            
            parentContainer.appendChild(group);
        }
        
        // Create function (toggle, button, or slider)
        function createFunction(container) {
            var func = document.createElement('div');
            func.className = 'function-item';
            func.style.cssText = `
                margin: 8px 0;
                padding: 10px;
                background: rgba(44, 62, 80, 0.9);
                border: 2px solid #000;
                border-radius: 5px;
            `;
            
            // Row 1: Type, Name, Element
            var row1 = document.createElement('div');
            row1.style.cssText = 'display: flex; gap: 8px; margin-bottom: 8px; align-items: center;';
            
            var typeLabel = document.createElement('span');
            typeLabel.textContent = 'Type:';
            typeLabel.style.cssText = 'color: white; font-weight: bold; font-size: 12px;';
            
            var typeSelect = document.createElement('select');
            typeSelect.style.cssText = 'padding: 5px; background: #2c3e50; color: white; border: 2px solid #000; border-radius: 3px; font-size: 12px;';
            typeSelect.innerHTML = `
                <option value="toggle">Toggle</option>
                <option value="button">Button</option>
                <option value="slider">Slider</option>
            `;
            
            var nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.placeholder = 'Function Name';
            nameInput.style.cssText = 'flex: 1; padding: 5px; background: #2c3e50; color: white; border: 2px solid #000; border-radius: 3px; font-size: 12px;';
            
            var elementLabel = document.createElement('span');
            elementLabel.textContent = 'Element:';
            elementLabel.style.cssText = 'color: white; font-weight: bold; font-size: 12px;';
            
            var elementSelect = document.createElement('select');
            elementSelect.style.cssText = 'padding: 5px; background: #2c3e50; color: white; border: 2px solid #000; border-radius: 3px; font-size: 12px; max-width: 150px;';
            
            // Populate elements
            var sortedElements = Object.keys(elements).sort();
            sortedElements.forEach(function(elem) {
                var opt = document.createElement('option');
                opt.value = elem;
                opt.textContent = elem;
                elementSelect.appendChild(opt);
            });
            
            row1.appendChild(typeLabel);
            row1.appendChild(typeSelect);
            row1.appendChild(nameInput);
            row1.appendChild(elementLabel);
            row1.appendChild(elementSelect);
            
            // Row 2: Control
            var row2 = document.createElement('div');
            row2.style.cssText = 'display: flex; gap: 8px; align-items: center;';
            
            func.appendChild(row1);
            func.appendChild(row2);
            
            // Update control based on type
            function updateControl() {
                row2.innerHTML = '';
                var type = typeSelect.value;
                var elem = elementSelect.value;
                
                if (type === 'toggle') {
                    var toggleBtn = document.createElement('button');
                    toggleBtn.textContent = 'OFF';
                    toggleBtn.style.cssText = `
                        background: #e74c3c;
                        color: white;
                        border: 2px solid #000;
                        padding: 8px 20px;
                        font-size: 14px;
                        cursor: pointer;
                        border-radius: 5px;
                        font-weight: bold;
                        box-shadow: 0 3px 0 #c0392b;
                        flex: 1;
                    `;
                    
                    var isOn = false;
                    toggleBtn.onclick = function() {
                        isOn = !isOn;
                        toggleBtn.textContent = isOn ? 'ON' : 'OFF';
                        toggleBtn.style.background = isOn ? '#27ae60' : '#e74c3c';
                        toggleBtn.style.boxShadow = isOn ? '0 3px 0 #1e8449' : '0 3px 0 #c0392b';
                        
                        // Make element passable
                        if (elements[elem]) {
                            if (isOn) {
                                elements[elem].passable = true;
                            } else {
                                delete elements[elem].passable;
                            }
                        }
                    };
                    
                    row2.appendChild(toggleBtn);
                    
                } else if (type === 'button') {
                    var btn = document.createElement('button');
                    btn.textContent = 'Activate';
                    btn.style.cssText = `
                        background: #3498db;
                        color: white;
                        border: 2px solid #000;
                        padding: 8px 20px;
                        font-size: 14px;
                        cursor: pointer;
                        border-radius: 5px;
                        font-weight: bold;
                        box-shadow: 0 3px 0 #2980b9;
                        flex: 1;
                    `;
                    
                    var durationInput = document.createElement('input');
                    durationInput.type = 'number';
                    durationInput.value = '1';
                    durationInput.min = '0.1';
                    durationInput.step = '0.1';
                    durationInput.style.cssText = 'width: 60px; padding: 5px; background: #2c3e50; color: white; border: 2px solid #000; border-radius: 3px; font-size: 12px;';
                    
                    var durationLabel = document.createElement('span');
                    durationLabel.textContent = 's';
                    durationLabel.style.cssText = 'color: white; font-size: 12px;';
                    
                    btn.onclick = function() {
                        var duration = parseFloat(durationInput.value) * 1000 || 1000;
                        
                        if (elements[elem]) {
                            elements[elem].passable = true;
                            btn.disabled = true;
                            btn.style.background = '#7f8c8d';
                            
                            setTimeout(function() {
                                delete elements[elem].passable;
                                btn.disabled = false;
                                btn.style.background = '#3498db';
                            }, duration);
                        }
                    };
                    
                    row2.appendChild(btn);
                    row2.appendChild(durationInput);
                    row2.appendChild(durationLabel);
                    
                } else if (type === 'slider') {
                    var slider = document.createElement('input');
                    slider.type = 'range';
                    slider.min = '0';
                    slider.max = '100';
                    slider.value = '50';
                    slider.style.cssText = 'flex: 1; cursor: pointer;';
                    
                    var valueLabel = document.createElement('span');
                    valueLabel.textContent = '50';
                    valueLabel.style.cssText = 'color: white; font-weight: bold; font-size: 14px; min-width: 40px; text-align: right;';
                    
                    slider.oninput = function() {
                        valueLabel.textContent = slider.value;
                        // Example: control temperature
                        if (elements[elem]) {
                            elements[elem].temp = parseInt(slider.value) * 50;
                        }
                    };
                    
                    row2.appendChild(slider);
                    row2.appendChild(valueLabel);
                }
            }
            
            typeSelect.onchange = updateControl;
            elementSelect.onchange = updateControl;
            updateControl();
            
            container.appendChild(func);
        }
        
        // Add Group button handler
        addGroupBtn.onclick = function() {
            createFunctionGroup(content, 0);
        };
        
        console.log('Functions Tab mod loaded!');
    }
    
    waitForSandboxels();
})();
