// Neutron Types v11 - React with uranium/plutonium but stay as fast/slow neutrons!

(function() {
    console.log('Neutron Types v11 loading...');
    
    setTimeout(function() {
        if (typeof elements === 'undefined') {
            console.error('Elements not loaded');
            return;
        }
        
        console.log('Creating neutron types v11...');
        
        // Fast Neutron - Yellow, flies straight, bounces
        // Reacts with uranium/plutonium to make MORE fast neutrons!
        elements.fast_neutron = {
            color: "#ffff00",
            behavior: [
                "XX|CR:fast_neutron|XX",
                "CR:fast_neutron|XX|CR:fast_neutron",
                "XX|CR:fast_neutron|XX"
            ],
            reactions: {
                // When hitting uranium_235, create more fast_neutrons
                "uranium_235": { "elem1": "uranium_235", "elem2": "fast_neutron", "chance": 0.8 },
                // When hitting plutonium_239, create more fast_neutrons
                "plutonium_239": { "elem1": "plutonium_239", "elem2": "fast_neutron", "chance": 0.85 }
            },
            category: "energy",
            state: "gas",
            density: 0,
            temp: 20
        };
        
        // Slow Neutron - Orange, flies slower, bounces
        // Better reaction chance with uranium/plutonium!
        elements.slow_neutron = {
            color: "#ff9900",
            behavior: [
                "XX|CR:slow_neutron%50|XX",
                "CR:slow_neutron%50|XX|CR:slow_neutron%50",
                "XX|CR:slow_neutron%50|XX"
            ],
            reactions: {
                // Slow neutrons are better at causing fission!
                "uranium_235": { "elem1": "uranium_235", "elem2": "fast_neutron", "chance": 0.95 },
                "plutonium_239": { "elem1": "plutonium_239", "elem2": "fast_neutron", "chance": 0.98 }
            },
            category: "energy",
            state: "gas",
            density: 0,
            temp: 20
        };
        
        // Moderator - Light grey, converts fast neutrons to slow neutrons
        elements.moderator = {
            color: ["#d3d3d3", "#c8c8c8", "#dedede", "#c0c0c0"],
            behavior: behaviors.WALL,
            reactions: {
                "neutron": { "elem1": "moderator", "elem2": "slow_neutron" },
                "fast_neutron": { "elem1": "moderator", "elem2": "slow_neutron" }
            },
            category: "solids",
            state: "solid",
            density: 1850,
            hardness: 0.6,
            temp: 20,
            tempHigh: 3000,
            stateHigh: "molten_moderator",
            immobile: true
        };
        
        elements.molten_moderator = {
            color: ["#ff6600", "#ff7700", "#ff5500"],
            behavior: behaviors.MOLTEN,
            category: "solids",
            state: "liquid",
            density: 1700,
            temp: 3100,
            tempLow: 3000,
            stateLow: "moderator"
        };
        
        // Now modify uranium_235 to work with our neutrons properly
        // Make it release FAST neutrons when hit
        if (elements.uranium_235) {
            console.log('Modifying uranium_235 to release fast_neutrons...');
            
            // Modify the tick function to create fast_neutrons instead
            var originalTick = elements.uranium_235.tick;
            
            elements.uranium_235.tick = function(pixel) {
                // Check adjacent pixels for ANY type of neutron
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        var nx = pixel.x + dx;
                        var ny = pixel.y + dy;
                        
                        if (pixelMap[nx] && pixelMap[nx][ny]) {
                            var nearPixel = pixelMap[nx][ny];
                            
                            // Check for ANY neutron type
                            if (nearPixel && (nearPixel.element === "neutron" || 
                                             nearPixel.element === "fast_neutron" || 
                                             nearPixel.element === "slow_neutron")) {
                                // Delete the neutron
                                deletePixel(nx, ny);
                                
                                // Create 3 FAST neutrons
                                for (var i = 0; i < 3; i++) {
                                    var angle = Math.random() * Math.PI * 2;
                                    var dist = 2 + Math.random() * 2;
                                    var spawnX = Math.round(pixel.x + Math.cos(angle) * dist);
                                    var spawnY = Math.round(pixel.y + Math.sin(angle) * dist);
                                    
                                    if (isEmpty(spawnX, spawnY)) {
                                        createPixel("fast_neutron", spawnX, spawnY);
                                    }
                                }
                                
                                pixel.temp += 300;
                                return;
                            }
                        }
                    }
                }
            };
        }
        
        // Modify plutonium_239 too
        if (elements.plutonium_239) {
            console.log('Modifying plutonium_239 to release fast_neutrons...');
            
            elements.plutonium_239.tick = function(pixel) {
                for (var dx = -1; dx <= 1; dx++) {
                    for (var dy = -1; dy <= 1; dy++) {
                        if (dx === 0 && dy === 0) continue;
                        var nx = pixel.x + dx;
                        var ny = pixel.y + dy;
                        
                        if (pixelMap[nx] && pixelMap[nx][ny]) {
                            var nearPixel = pixelMap[nx][ny];
                            
                            if (nearPixel && (nearPixel.element === "neutron" || 
                                             nearPixel.element === "fast_neutron" || 
                                             nearPixel.element === "slow_neutron")) {
                                deletePixel(nx, ny);
                                
                                for (var i = 0; i < 3; i++) {
                                    var angle = Math.random() * Math.PI * 2;
                                    var dist = 2 + Math.random() * 2;
                                    var spawnX = Math.round(pixel.x + Math.cos(angle) * dist);
                                    var spawnY = Math.round(pixel.y + Math.sin(angle) * dist);
                                    
                                    if (isEmpty(spawnX, spawnY)) {
                                        createPixel("fast_neutron", spawnX, spawnY);
                                    }
                                }
                                
                                pixel.temp += 300;
                                return;
                            }
                        }
                    }
                }
            };
        }
        
        console.log('Neutron Types v11 loaded!');
        console.log('- Fast neutrons react with uranium/plutonium');
        console.log('- Slow neutrons have better reaction rates');
        console.log('- Uranium_235 and plutonium_239 now release FAST neutrons!');
    }, 1500);
})();
