// Functions Tab Mod for Sandboxels v2
// Simpler, more compatible version

var functionsModLoaded = false;

function initFunctionsMod() {
    if (functionsModLoaded) return;
    if (typeof elements === 'undefined') {
        setTimeout(initFunctionsMod, 500);
        return;
    }
    
    functionsModLoaded = true;
    
    // State
    var deleteMode = false;
    
    // Create Functions button
    var functionsBtn = document.createElement('button');
    functionsBtn.textContent = 'Functions';
    functionsBtn.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        z-index: 99999;
        background: #9370DB;
        color: white;
        padding: 8px 16px;
        border: 2px solid #000;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        font-family: Arial, sans-serif;
        font-size: 14px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(functionsBtn);
    
    // Create panel
    var panel = document.createElement('div');
    panel.style.cssText = `
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 700px;
        max-height: 600px;
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
        border: 3px solid #000;
        border-radius: 10px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.7);
        z-index: 100000;
        font-family: Arial, sans-serif;
    `;
    
    // Header
    var header = document.createElement('div');
    header.style.cssText = `
        background: linear-gradient(135deg, #1a252f 0%, #2c3e50 100%);
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #000;
        border-radius: 7px 7px 0 0;
    `;
    
    var title = document.createElement('div');
    title.textContent = 'Functions';
    title.style.cssText = 'color: #fff; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);';
    
    var headerBtns = document.createElement('div');
    headerBtns.style.cssText = 'display: flex; gap: 8px;';
    
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
    
    // Delete button
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
    
    headerBtns.appendChild(addGroupBtn);
    headerBtns.appendChild(deleteBtn);
    headerBtns.appendChild(closeBtn);
    header.appendChild(title);
    header.appendChild(headerBtns);
    
    // Delete confirm area
    var deleteConfirm = document.createElement('div');
    deleteConfirm.style.cssText = 'display: none; padding: 10px; background: #e74c3c; text-align: center; border-bottom: 2px solid #000;';
    
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
    deleteConfirm.appendChild(deleteConfirmBtn);
    
    // Content
    var content = document.createElement('div');
    content.style.cssText = `
        padding: 15px;
        max-height: 450px;
        overflow-y: auto;
        overflow-x: hidden;
    `;
    
    panel.appendChild(header);
    panel.appendChild(deleteConfirm);
    panel.appendChild(content);
    document.body.appendChild(panel);
    
    // Toggle panel
    functionsBtn.onclick = function() {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    };
    
    closeBtn.onclick = function() {
        panel.style.display = 'none';
    };
    
    // Delete mode
    deleteBtn.onclick = function() {
        deleteMode = !deleteMode;
        deleteBtn.style.background = deleteMode ? '#c0392b' : '#e74c3c';
        deleteConfirm.style.display = deleteMode ? 'block' : 'none';
        
        var checkboxes = document.querySelectorAll('.fg-delete-cb');
        checkboxes.forEach(function(cb) {
            cb.style.display = deleteMode ? 'inline-block' : 'none';
        });
    };
    
    // Delete selected
    deleteConfirmBtn.onclick = function() {
        var checkboxes = document.querySelectorAll('.fg-delete-cb:checked');
        checkboxes.forEach(function(cb) {
            var group = cb.closest('.fg-group');
            if (group) group.remove();
        });
        
        deleteMode = false;
        deleteBtn.style.background = '#e74c3c';
        deleteConfirm.style.display = 'none';
        
        document.querySelectorAll('.fg-delete-cb').forEach(function(cb) {
            cb.style.display = 'none';
            cb.checked = false;
        });
    };
    
    // Create function group
    function createGroup(parent, depth) {
        depth = depth || 0;
        
        var group = document.createElement('div');
        group.className = 'fg-group';
        group.style.cssText = `
            margin: 10px 0 10px ${depth * 25}px;
            padding: 12px;
            background: rgba(52, 73, 94, 0.8);
            border: 2px solid #000;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        `;
        
        var groupHeader = document.createElement('div');
        groupHeader.style.cssText = 'display: flex; align-items: center; margin-bottom: 12px; gap: 8px;';
        
        var cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.className = 'fg-delete-cb';
        cb.style.cssText = 'display: none; width: 20px; height: 20px; cursor: pointer;';
        
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
        
        var addGroupBtn2 = document.createElement('button');
        addGroupBtn2.textContent = '+ Group';
        addGroupBtn2.style.cssText = `
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
        
        groupHeader.appendChild(cb);
        groupHeader.appendChild(nameInput);
        groupHeader.appendChild(addFuncBtn);
        groupHeader.appendChild(addGroupBtn2);
        
        var funcContainer = document.createElement('div');
        
        group.appendChild(groupHeader);
        group.appendChild(funcContainer);
        
        addFuncBtn.onclick = function() {
            createFunc(funcContainer);
        };
        
        addGroupBtn2.onclick = function() {
            createGroup(funcContainer, depth + 1);
        };
        
        parent.appendChild(group);
    }
    
    // Create function
    function createFunc(container) {
        var func = document.createElement('div');
        func.style.cssText = `
            margin: 8px 0;
            padding: 10px;
            background: rgba(44, 62, 80, 0.9);
            border: 2px solid #000;
            border-radius: 5px;
        `;
        
        var row1 = document.createElement('div');
        row1.style.cssText = 'display: flex; gap: 8px; margin-bottom: 8px; align-items: center; flex-wrap: wrap;';
        
        var typeLabel = document.createElement('span');
        typeLabel.textContent = 'Type:';
        typeLabel.style.cssText = 'color: white; font-weight: bold; font-size: 12px;';
        
        var typeSelect = document.createElement('select');
        typeSelect.style.cssText = 'padding: 5px; background: #2c3e50; color: white; border: 2px solid #000; border-radius: 3px; font-size: 12px;';
        typeSelect.innerHTML = '<option value="toggle">Toggle</option><option value="button">Button</option><option value="slider">Slider</option>';
        
        var nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.placeholder = 'Function Name';
        nameInput.style.cssText = 'padding: 5px; background: #2c3e50; color: white; border: 2px solid #000; border-radius: 3px; font-size: 12px; width: 120px;';
        
        var elemLabel = document.createElement('span');
        elemLabel.textContent = 'Element:';
        elemLabel.style.cssText = 'color: white; font-weight: bold; font-size: 12px;';
        
        var elemSelect = document.createElement('select');
        elemSelect.style.cssText = 'padding: 5px; background: #2c3e50; color: white; border: 2px solid #000; border-radius: 3px; font-size: 12px;';
        
        var sortedElems = Object.keys(elements).sort();
        sortedElems.forEach(function(elem) {
            var opt = document.createElement('option');
            opt.value = elem;
            opt.textContent = elem;
            elemSelect.appendChild(opt);
        });
        
        row1.appendChild(typeLabel);
        row1.appendChild(typeSelect);
        row1.appendChild(nameInput);
        row1.appendChild(elemLabel);
        row1.appendChild(elemSelect);
        
        var row2 = document.createElement('div');
        row2.style.cssText = 'display: flex; gap: 8px; align-items: center;';
        
        func.appendChild(row1);
        func.appendChild(row2);
        
        function updateControl() {
            row2.innerHTML = '';
            var type = typeSelect.value;
            var elem = elemSelect.value;
            
            if (type === 'toggle') {
                var btn = document.createElement('button');
                btn.textContent = 'OFF';
                btn.style.cssText = `
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
                btn.onclick = function() {
                    isOn = !isOn;
                    btn.textContent = isOn ? 'ON' : 'OFF';
                    btn.style.background = isOn ? '#27ae60' : '#e74c3c';
                    btn.style.boxShadow = isOn ? '0 3px 0 #1e8449' : '0 3px 0 #c0392b';
                    
                    if (elements[elem]) {
                        if (isOn) {
                            elements[elem].passable = true;
                        } else {
                            delete elements[elem].passable;
                        }
                    }
                };
                
                row2.appendChild(btn);
                
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
                `;
                
                var durInput = document.createElement('input');
                durInput.type = 'number';
                durInput.value = '1';
                durInput.min = '0.1';
                durInput.step = '0.1';
                durInput.style.cssText = 'width: 60px; padding: 5px; background: #2c3e50; color: white; border: 2px solid #000; border-radius: 3px; font-size: 12px; margin-left: 8px;';
                
                var durLabel = document.createElement('span');
                durLabel.textContent = 's';
                durLabel.style.cssText = 'color: white; font-size: 12px; margin-left: 4px;';
                
                btn.onclick = function() {
                    var dur = parseFloat(durInput.value) * 1000 || 1000;
                    
                    if (elements[elem]) {
                        elements[elem].passable = true;
                        btn.disabled = true;
                        btn.style.background = '#7f8c8d';
                        
                        setTimeout(function() {
                            delete elements[elem].passable;
                            btn.disabled = false;
                            btn.style.background = '#3498db';
                        }, dur);
                    }
                };
                
                row2.appendChild(btn);
                row2.appendChild(durInput);
                row2.appendChild(durLabel);
                
            } else if (type === 'slider') {
                var slider = document.createElement('input');
                slider.type = 'range';
                slider.min = '0';
                slider.max = '100';
                slider.value = '50';
                slider.style.cssText = 'flex: 1; cursor: pointer;';
                
                var valLabel = document.createElement('span');
                valLabel.textContent = '50';
                valLabel.style.cssText = 'color: white; font-weight: bold; font-size: 14px; min-width: 40px; text-align: right;';
                
                slider.oninput = function() {
                    valLabel.textContent = slider.value;
                    if (elements[elem]) {
                        elements[elem].temp = parseInt(slider.value) * 50;
                    }
                };
                
                row2.appendChild(slider);
                row2.appendChild(valLabel);
            }
        }
        
        typeSelect.onchange = updateControl;
        elemSelect.onchange = updateControl;
        updateControl();
        
        container.appendChild(func);
    }
    
    addGroupBtn.onclick = function() {
        createGroup(content, 0);
    };
    
    console.log('Functions Tab Mod v2 loaded successfully!');
}

// Try to initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFunctionsMod);
} else {
    initFunctionsMod();
}
