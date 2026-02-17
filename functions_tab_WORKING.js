// Functions Tab - ACTUALLY WORKING VERSION

(function() {
    console.log('Functions Tab - WORKING VERSION loading...');
    
    var groups = [];
    var selectedPixel = null;
    
    setTimeout(function() {
        // Create button
        var btn = document.createElement('button');
        btn.textContent = 'Functions';
        btn.style.cssText = 'background: #9370DB; color: white; padding: 5px 10px; margin: 2px; border: 2px solid black; font-weight: bold; cursor: pointer;';
        
        var toolbar = document.querySelector('#toolbar') || document.querySelector('button').parentElement;
        if (toolbar) toolbar.appendChild(btn);
        
        // Create panel
        var panel = document.createElement('div');
        panel.style.cssText = 'display: none; position: fixed; top: 10%; left: 50%; transform: translateX(-50%); width: 700px; max-height: 80%; background: #2c3e50; border: 3px solid black; border-radius: 10px; z-index: 999999; padding: 20px; color: white; overflow-y: auto;';
        document.body.appendChild(panel);
        
        btn.onclick = function() {
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            render();
        };
        
        function render() {
            panel.innerHTML = '<h2>Functions</h2>';
            
            // Create group section
            var input = document.createElement('input');
            input.placeholder = 'Group name';
            input.style.cssText = 'width: 70%; padding: 10px; background: #34495e; color: white; border: 2px solid black; margin-right: 10px;';
            
            var createBtn = document.createElement('button');
            createBtn.textContent = 'Create Group';
            createBtn.style.cssText = 'padding: 10px 20px; background: #27ae60; color: white; border: 2px solid black; cursor: pointer;';
            createBtn.onclick = function() {
                if (input.value) {
                    groups.push({ name: input.value, funcs: [] });
                    render();
                }
            };
            
            panel.appendChild(input);
            panel.appendChild(createBtn);
            panel.appendChild(document.createElement('hr'));
            
            // Show groups
            groups.forEach(function(group) {
                var groupDiv = document.createElement('div');
                groupDiv.style.cssText = 'background: #34495e; padding: 15px; margin: 10px 0; border-radius: 5px;';
                
                var title = document.createElement('h3');
                title.textContent = group.name;
                groupDiv.appendChild(title);
                
                // Add function button
                var addBtn = document.createElement('button');
                addBtn.textContent = '+ Add Function';
                addBtn.style.cssText = 'background: #3498db; color: white; padding: 8px; border: 2px solid black; cursor: pointer; margin: 5px 0;';
                addBtn.onclick = function() {
                    showForm(group, groupDiv);
                };
                groupDiv.appendChild(addBtn);
                
                // Show functions
                group.funcs.forEach(function(func) {
                    var funcDiv = document.createElement('div');
                    funcDiv.style.cssText = 'background: #2c3e50; padding: 10px; margin: 5px 0; border-radius: 3px;';
                    funcDiv.innerHTML = '<strong>' + func.name + '</strong> (' + func.type + ')';
                    
                    var toggle = document.createElement('button');
                    toggle.textContent = func.active ? 'ON' : 'OFF';
                    toggle.style.cssText = 'width: 100%; padding: 8px; background: ' + (func.active ? '#27ae60' : '#e74c3c') + '; color: white; border: 2px solid black; cursor: pointer; margin-top: 5px;';
                    toggle.onclick = function() {
                        func.active = !func.active;
                        runFunction(func);
                        render();
                    };
                    
                    funcDiv.appendChild(toggle);
                    groupDiv.appendChild(funcDiv);
                });
                
                panel.appendChild(groupDiv);
            });
        }
        
        function showForm(group, groupDiv) {
            var form = groupDiv.querySelector('.form');
            if (form) {
                form.remove();
                return;
            }
            
            var formDiv = document.createElement('div');
            formDiv.className = 'form';
            formDiv.style.cssText = 'background: #1a252f; padding: 15px; margin: 10px 0; border: 2px solid #3498db; border-radius: 5px;';
            
            // Select pixel
            var selectBtn = document.createElement('button');
            selectBtn.textContent = 'Select Pixel';
            selectBtn.style.cssText = 'width: 100%; background: #e67e22; color: white; padding: 8px; border: 2px solid black; cursor: pointer; margin-bottom: 10px;';
            
            var info = document.createElement('div');
            info.textContent = 'No pixel selected';
            info.style.cssText = 'margin-bottom: 10px; color: #3498db;';
            
            var selecting = false;
            selectBtn.onclick = function() {
                selecting = true;
                selectBtn.textContent = 'Click canvas...';
                selectBtn.style.background = '#d35400';
            };
            
            document.getElementById('game').addEventListener('click', function handler(e) {
                if (!selecting) return;
                
                var rect = this.getBoundingClientRect();
                var x = Math.floor((e.clientX - rect.left) / pixelSize);
                var y = Math.floor((e.clientY - rect.top) / pixelSize);
                
                if (pixelMap[x] && pixelMap[x][y]) {
                    selectedPixel = {x: x, y: y, elem: pixelMap[x][y].element};
                    info.textContent = 'Selected: ' + selectedPixel.elem + ' at ' + x + ',' + y;
                    selecting = false;
                    selectBtn.textContent = 'Select Pixel';
                    selectBtn.style.background = '#e67e22';
                }
            });
            
            // Name
            var nameIn = document.createElement('input');
            nameIn.placeholder = 'Function name';
            nameIn.style.cssText = 'width: 100%; padding: 8px; background: #34495e; color: white; border: 2px solid black; margin-bottom: 10px;';
            
            // Type
            var typeSelect = document.createElement('select');
            typeSelect.style.cssText = 'width: 100%; padding: 8px; background: #34495e; color: white; border: 2px solid black; margin-bottom: 10px;';
            typeSelect.innerHTML = `
                <option value="passable">Passable</option>
                <option value="move_up">Move Up</option>
                <option value="move_down">Move Down</option>
                <option value="move_left">Move Left</option>
                <option value="move_right">Move Right</option>
            `;
            
            // Create
            var createFuncBtn = document.createElement('button');
            createFuncBtn.textContent = 'Create';
            createFuncBtn.style.cssText = 'width: 100%; background: #27ae60; color: white; padding: 10px; border: 2px solid black; cursor: pointer;';
            createFuncBtn.onclick = function() {
                if (nameIn.value && selectedPixel) {
                    group.funcs.push({
                        name: nameIn.value,
                        type: typeSelect.value,
                        pixel: selectedPixel,
                        active: false
                    });
                    render();
                } else {
                    alert('Need name and pixel!');
                }
            };
            
            formDiv.appendChild(selectBtn);
            formDiv.appendChild(info);
            formDiv.appendChild(nameIn);
            formDiv.appendChild(typeSelect);
            formDiv.appendChild(createFuncBtn);
            groupDiv.appendChild(formDiv);
        }
        
        function runFunction(func) {
            console.log('Running function:', func.name, func.active);
            
            var p = pixelMap[func.pixel.x] && pixelMap[func.pixel.x][func.pixel.y];
            if (!p) {
                console.log('Pixel not found!');
                return;
            }
            
            if (func.type === 'passable') {
                if (elements[p.element]) {
                    if (func.active) {
                        elements[p.element].passable = true;
                        console.log('Set passable ON for', p.element);
                    } else {
                        delete elements[p.element].passable;
                        console.log('Set passable OFF for', p.element);
                    }
                }
            } else if (func.type.startsWith('move_')) {
                if (!func.active) return;
                
                var dir = func.type.split('_')[1];
                var dx = 0, dy = 0;
                if (dir === 'up') dy = -1;
                if (dir === 'down') dy = 1;
                if (dir === 'left') dx = -1;
                if (dir === 'right') dx = 1;
                
                console.log('Moving pixel', dir, 'dx=', dx, 'dy=', dy);
                
                if (isEmpty(p.x + dx, p.y + dy)) {
                    movePixel(p, p.x + dx, p.y + dy);
                    func.pixel.x = p.x + dx;
                    func.pixel.y = p.y + dy;
                    console.log('Moved to', func.pixel.x, func.pixel.y);
                }
            }
        }
        
        console.log('Functions Tab WORKING VERSION loaded!');
    }, 1000);
})();
